#!/usr/bin/env python3
#
# Copyright (c) 2025 Foundries.io
#
# SPDX-License-Identifier: BSD-3-Clause
#

import sys
import os
import threading
import json
import time
import itertools
import socket
from contextlib import contextmanager
from queue import Queue
from weakref import WeakSet
from flask import Flask, Response, send_file, send_from_directory
import logging
from edge_impulse_linux.audio import AudioImpulseRunner

APP_TAG = "[APP]"

def log(msg: str):
    print(f"{APP_TAG} {msg}")

def log_debug(msg: str):
    if DEBUG:
        print(f"{APP_TAG} {msg}")

# Try to import Device Bridge, fallback to mock for testing
try:
    from arduino.app_utils import *
    USE_REAL_BRIDGE = True
    log("Using real Arduino Bridge")
except ImportError:
    USE_REAL_BRIDGE = False
    log("Using mock Bridge for testing")

    class MockBridge:
        @staticmethod
        def call(function_name, *args):
            log_debug(f"[MOCK] Bridge.call('{function_name}', {', '.join(map(str, args))})")
            return True

    Bridge = MockBridge()

# Wrapper for async Bridge calls
def bridge_call_async(function_name, *args):
    """Call Bridge asynchronously to avoid blocking the UI thread"""
    def _call():
        try:
            Bridge.call(function_name, *args)
        except Exception as e:
            log(f"Bridge call failed: {e}")

    thread = threading.Thread(target=_call, daemon=True)
    thread.start()

# LED states tracking (RGB LEDs)
led_states = {
    'led3_r': False, 'led3_g': False, 'led3_b': False,
    'led4_r': False, 'led4_g': False, 'led4_b': False
}

# System LED mappings (sysfs)
LED_NAMES = ("blue", "green", "red")
LED_SET_1 = {
    "blue": "/sys/class/leds/blue:user/brightness",
    "green": "/sys/class/leds/green:user/brightness",
    "red": "/sys/class/leds/red:user/brightness",
}
LED_SET_2 = {
    "blue": "/sys/class/leds/blue:bt/brightness",
    "green": "/sys/class/leds/green:wlan/brightness",
    "red": "/sys/class/leds/red:panic/brightness",
}

def _write_led(name: str, on: bool):
    paths = [LED_SET_1.get(name), LED_SET_2.get(name)]
    for path in paths:
        if not path:
            continue
        try:
            with open(path, 'w') as f:
                f.write('1' if on else '0')
        except Exception as e:
            if DEBUG:
                log_debug(f"[LED] could not set {path} -> {on}: {e}")

def set_system_leds(color: str):
    """Set system LEDs for given color (blue, green, red, yellow, purple, off)."""
    mapping = {
        'blue': {'blue'},
        'green': {'green'},
        'red': {'red'},
        'yellow': {'green', 'red'},
        'purple': {'blue', 'red'},
    }
    wanted = mapping.get((color or '').lower(), set())
    for n in LED_NAMES:
        _write_led(n, n in wanted)

def set_led_color(color: str):
    """Set LED color (blue, green, red, yellow, purple, off)."""
    try:
        set_system_leds(color)
        color = (color or "").lower()
        color_map = {
            'blue': ['led3_b', 'led4_b'],
            'green': ['led3_g', 'led4_g'],
            'red': ['led3_r', 'led4_r'],
            'yellow': ['led3_r', 'led3_g', 'led4_r', 'led4_g'],
            'purple': ['led3_r', 'led3_b', 'led4_r', 'led4_b'],
            'off': []
        }

        if color not in color_map:
            log(f"Unknown LED color: {color}")
            return

        target_leds = set(color_map[color])
        for led in list(led_states.keys()):
            if led_states[led] and led not in target_leds:
                bridge_call_async(f"toggle_{led}")
                led_states[led] = False

        for led in color_map[color]:
            if not led_states[led]:
                bridge_call_async(f"toggle_{led}")
                led_states[led] = True
    except Exception as e:
        log(f"Set LED color {color} failed: {e}")

# Flask app
app = Flask(__name__)

# Status management for Server-Sent Events
status_connections = WeakSet()
current_status = "Ready"
current_color = ""

# Voice recognition configuration
VOICE_MODEL_PATH = os.getenv("VOICE_MODEL_PATH", "/app/deployment.eim")
PA_ALSA_DEVICE = os.getenv("PA_ALSA_DEVICE")
VOICE_ENABLED = os.getenv("VOICE_ENABLED", "1") != "0"

LABELS = {
    "blue", "green", "purple", "red", "yellow", "select"
}
COLOR = {
    "blue", "green", "purple", "red", "yellow"
}

def _env_float(name: str, default: float) -> float:
    v = os.getenv(name)
    if v is None:
        return default
    try:
        return float(v)
    except ValueError:
        log(f"ENV {name}='{v}' invalid; using default {default}")
        return default

def _env_int(name: str) -> int | None:
    v = os.getenv(name)
    if v is None or v == "":
        return None
    try:
        return int(v)
    except ValueError:
        log(f"ENV {name}='{v}' invalid; ignoring")
        return None

THRESH = _env_float("THRESH", 0.80)
DEBUG = _env_float("DEBUG", 0)
DEBOUNCE_SECONDS = _env_float("DEBOUNCE_SECONDS", 2.0)
SELECT_SUPPRESS_SECONDS = _env_float("SELECT_SUPPRESS_SECONDS", 10.0)
SELECT_COOLDOWN_SECONDS = _env_float("SELECT_COOLDOWN_SECONDS", 5.0)

voice_shutdown_event = threading.Event()
voice_thread = None
voice_started = False
last_audio_ts = 0.0

# Watchdog configuration
WATCHDOG_POLL_SECONDS = _env_float("WATCHDOG_POLL_SECONDS", 2.0)
AUDIO_WATCHDOG_SECONDS = _env_float("AUDIO_WATCHDOG_SECONDS", 15.0)
AUDIO_RESTART_MIN_SECONDS = _env_float("AUDIO_RESTART_MIN_SECONDS", 20.0)

watchdog_stop_event = threading.Event()
watchdog_thread = None
watchdog_lock = threading.Lock()
last_audio_restart_ts = 0.0

# Matrix state tracking (13x8 = 104 LEDs)
MATRIX_COLS = 13
MATRIX_ROWS = 8
MATRIX_SIZE = 104

# Matrix microphone frame + select animation frames
FRAME_MICROPHONE = [
    [0,0,0,0,0,1,1,0,0,0,0,0,0],
    [0,0,0,0,1,1,1,1,0,0,0,0,0],
    [0,0,0,0,1,1,1,1,0,0,0,0,0],
    [0,0,0,0,1,1,1,1,0,0,0,0,0],
    [0,0,0,0,1,1,1,1,0,0,0,0,0],
    [0,0,1,0,0,1,1,0,0,1,0,0,0],
    [0,0,0,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,1,1,0,0,0,0,0,0]
]

ANIMATION_COLOR_FRAMES = [
    [[0,0,0,0,0,0,0,0,1,0,0,0,0],
     [0,0,0,0,1,0,0,0,1,0,0,0,0],
     [0,0,0,1,1,1,0,0,1,0,0,1,0],
     [0,1,0,1,1,1,0,1,1,1,0,1,0],
     [1,1,1,1,1,1,1,1,1,1,1,1,1],
     [0,1,0,1,1,1,0,1,1,1,0,1,0],
     [0,0,0,1,1,1,0,0,1,0,0,0,0],
     [0,0,0,0,1,0,0,0,1,0,0,0,0]],
    [[0,0,0,0,0,0,0,0,0,1,0,0,0],
     [0,0,0,0,0,1,0,0,0,1,0,0,0],
     [0,0,0,0,1,1,1,0,0,1,0,0,1],
     [0,0,1,0,1,1,1,0,1,1,1,0,1],
     [1,1,1,1,1,1,1,1,1,1,1,1,1],
     [0,0,1,0,1,1,1,0,1,1,1,0,1],
     [0,0,0,0,1,1,1,0,0,1,0,0,0],
     [0,0,0,0,0,1,0,0,0,1,0,0,0]],
    [[0,0,0,0,0,0,0,0,0,0,1,0,0],
     [0,0,0,0,0,0,1,0,0,0,1,0,0],
     [1,0,0,0,0,1,1,1,0,0,1,0,0],
     [1,0,0,1,0,1,1,1,0,1,1,1,0],
     [1,1,1,1,1,1,1,1,1,1,1,1,1],
     [1,0,0,1,0,1,1,1,0,1,1,1,0],
     [0,0,0,0,0,1,1,1,0,0,1,0,0],
     [0,0,0,0,0,0,1,0,0,0,1,0,0]],
    [[0,0,0,0,0,0,0,0,0,0,0,1,0],
     [0,0,0,0,0,0,0,1,0,0,0,1,0],
     [0,1,0,0,0,0,1,1,1,0,0,1,0],
     [0,1,0,0,1,0,1,1,1,0,1,1,1],
     [1,1,1,1,1,1,1,1,1,1,1,1,1],
     [0,1,0,0,1,0,1,1,1,0,1,1,1],
     [0,0,0,0,0,0,1,1,1,0,0,1,0],
     [0,0,0,0,0,0,0,1,0,0,0,1,0]],
    [[0,0,0,0,0,0,0,0,0,0,0,0,1],
     [0,0,0,0,0,0,0,0,1,0,0,0,1],
     [0,0,1,0,0,0,0,1,1,1,0,0,1],
     [1,0,1,0,0,1,0,1,1,1,0,1,1],
     [1,1,1,1,1,1,1,1,1,1,1,1,1],
     [1,0,1,0,0,1,0,1,1,1,0,1,1],
     [0,0,0,0,0,0,0,1,1,1,0,0,1],
     [0,0,0,0,0,0,0,0,1,0,0,0,1]],
    [[1,0,0,0,0,0,0,0,0,0,0,0,0],
     [1,0,0,0,0,0,0,0,0,1,0,0,0],
     [1,0,0,1,0,0,0,0,1,1,1,0,0],
     [1,1,0,1,0,0,1,0,1,1,1,0,1],
     [1,1,1,1,1,1,1,1,1,1,1,1,1],
     [1,1,0,1,0,0,1,0,1,1,1,0,1],
     [1,0,0,0,0,0,0,0,1,1,1,0,0],
     [1,0,0,0,0,0,0,0,0,1,0,0,0]],
    [[0,1,0,0,0,0,0,0,0,0,0,0,0],
     [0,1,0,0,0,0,0,0,0,0,1,0,0],
     [0,1,0,0,1,0,0,0,0,1,1,1,0],
     [1,1,1,0,1,0,0,1,0,1,1,1,0],
     [1,1,1,1,1,1,1,1,1,1,1,1,1],
     [1,1,1,0,1,0,0,1,0,1,1,1,0],
     [0,1,0,0,0,0,0,0,0,1,1,1,0],
     [0,1,0,0,0,0,0,0,0,0,1,0,0]],
    [[0,0,1,0,0,0,0,0,0,0,0,0,0],
     [0,0,1,0,0,0,0,0,0,0,0,1,0],
     [0,0,1,0,0,1,0,0,0,0,1,1,1],
     [0,1,1,1,0,1,0,0,1,0,1,1,1],
     [1,1,1,1,1,1,1,1,1,1,1,1,1],
     [0,1,1,1,0,1,0,0,1,0,1,1,1],
     [0,0,1,0,0,0,0,0,0,0,1,1,1],
     [0,0,1,0,0,0,0,0,0,0,0,1,0]],
    [[0,0,0,1,0,0,0,0,0,0,0,0,0],
     [0,0,0,1,0,0,0,0,0,0,0,0,1],
     [1,0,0,1,0,0,1,0,0,0,0,1,1],
     [1,0,1,1,1,0,1,0,0,1,0,1,1],
     [1,1,1,1,1,1,1,1,1,1,1,1,1],
     [1,0,1,1,1,0,1,0,0,1,0,1,1],
     [1,0,0,1,0,0,0,0,0,0,0,1,1],
     [0,0,0,1,0,0,0,0,0,0,0,0,1]],
    [[0,0,0,0,1,0,0,0,0,0,0,0,0],
     [1,0,0,0,1,0,0,0,0,0,0,0,0],
     [1,1,0,0,1,0,0,1,0,0,0,0,1],
     [1,1,0,1,1,1,0,1,0,0,1,0,1],
     [1,1,1,1,1,1,1,1,1,1,1,1,1],
     [1,1,0,1,1,1,0,1,0,0,1,0,1],
     [1,1,0,0,1,0,0,0,0,0,0,0,1],
     [1,0,0,0,1,0,0,0,0,0,0,0,0]],
    [[0,0,0,0,0,1,0,0,0,0,0,0,0],
     [0,1,0,0,0,1,0,0,0,0,0,0,0],
     [1,1,1,0,0,1,0,0,1,0,0,0,0],
     [1,1,1,0,1,1,1,0,1,0,0,1,0],
     [1,1,1,1,1,1,1,1,1,1,1,1,1],
     [1,1,1,0,1,1,1,0,1,0,0,1,0],
     [1,1,1,0,0,1,0,0,0,0,0,0,0],
     [0,1,0,0,0,1,0,0,0,0,0,0,0]],
    [[0,0,0,0,0,0,1,0,0,0,0,0,0],
     [0,0,1,0,0,0,1,0,0,0,0,0,0],
     [0,1,1,1,0,0,1,0,0,1,0,0,0],
     [0,1,1,1,0,1,1,1,0,1,0,0,1],
     [1,1,1,1,1,1,1,1,1,1,1,1,1],
     [0,1,1,1,0,1,1,1,0,1,0,0,1],
     [0,1,1,1,0,0,1,0,0,0,0,0,0],
     [0,0,1,0,0,0,1,0,0,0,0,0,0]],
    [[0,0,0,0,0,0,0,1,0,0,0,0,0],
     [0,0,0,1,0,0,0,1,0,0,0,0,0],
     [0,0,1,1,1,0,0,1,0,0,1,0,0],
     [1,0,1,1,1,0,1,1,1,0,1,0,0],
     [1,1,1,1,1,1,1,1,1,1,1,1,1],
     [1,0,1,1,1,0,1,1,1,0,1,0,0],
     [0,0,0,1,1,0,0,1,0,0,0,0,0],
     [0,0,0,1,0,0,0,1,0,0,0,0,0]]
]

# Initialize matrix state (all LEDs off)
matrix_state = [[0 for _ in range(MATRIX_COLS)] for _ in range(MATRIX_ROWS)]
current_matrix_animation = None
matrix_animation_thread = None
stop_matrix_animation_flag = threading.Event()

class WebStatus:
    _lock = threading.Lock()

    @classmethod
    def _broadcast(cls):
        payload = {
            "status": current_status,
            "matrix": [cell for row in matrix_state for cell in row],
            "color": current_color
        }
        for q in status_connections:
            try:
                q.put(payload)
            except Exception:
                pass

    @classmethod
    def update_status(cls, status: str):
        global current_status
        with cls._lock:
            current_status = status
            cls._broadcast()

    @classmethod
    def update_color(cls, color: str):
        global current_color
        with cls._lock:
            current_color = color
            cls._broadcast()

@contextmanager
def _suppress_stderr():
    """Temporarily silences stderr (e.g., ALSA warnings during initialization)."""
    try:
        fd = sys.stderr.fileno()
        old = os.dup(fd)
        with open(os.devnull, 'w') as devnull:
            os.dup2(devnull.fileno(), fd)
        yield
    finally:
        try:
            os.dup2(old, fd)
            os.close(old)
        except Exception:
            pass

def _restart_voice_recognition(reason: str = ""):
    global voice_thread, voice_started, last_audio_ts, last_audio_restart_ts
    if not VOICE_ENABLED:
        return
    now = time.time()
    if (now - last_audio_restart_ts) < AUDIO_RESTART_MIN_SECONDS:
        return
    last_audio_restart_ts = now
    if DEBUG:
        print(f"[VOICE] Restarting voice runner ({reason})")
    try:
        voice_shutdown_event.set()
        if voice_thread and voice_thread.is_alive():
            voice_thread.join(timeout=2.0)
    except Exception:
        pass
    voice_thread = None
    voice_started = False
    voice_shutdown_event.clear()
    voice_thread = threading.Thread(target=_voice_recognition_loop, daemon=True)
    voice_thread.start()
    voice_started = True
    last_audio_ts = time.time()

def _voice_recognition_loop():
    global last_audio_ts
    if not VOICE_ENABLED:
        log("Voice recognition disabled (VOICE_ENABLED=0)")
        clear_matrix_display()
        return

    if not os.path.exists(VOICE_MODEL_PATH):
        log(f"Voice model not found: {VOICE_MODEL_PATH}")
        WebStatus.update_status("Voice model not found")
        return

    log(f"Voice model: {VOICE_MODEL_PATH}")
    log(f"THRESH={THRESH:.2f} DEBOUNCE={DEBOUNCE_SECONDS:.2f}")

    last_audio_ts = time.time()
    while not voice_shutdown_event.is_set():
        # Device ID selection (from environment)
        selected_device_id = _env_int("PA_ALSA_DEVICE")
        if selected_device_id is not None:
            log(f"Audio device (ALSA): {selected_device_id}")

        try:
            with AudioImpulseRunner(VOICE_MODEL_PATH) as runner:
                model_info = runner.init()
                log('Runner: ' + model_info['project']['owner'] + ' / ' + model_info['project']['name'])

                last_send_ts = 0.0
                next_ready_ts = 0.0
                ready_announced = True
                select_window_until = 0.0
                select_block_until = 0.0
                select_pending = False

                _iter = runner.classifier(device_id=selected_device_id)
                with _suppress_stderr():
                    try:
                        first_item = next(_iter)
                    except StopIteration:
                        return

                for res, audio in itertools.chain([first_item], _iter):
                    if voice_shutdown_event.is_set():
                        break

                    last_audio_ts = time.time()

                    now = time.time()
                    if not ready_announced and now >= next_ready_ts:
                        log(f"Listening (debounce {DEBOUNCE_SECONDS}s)")
                        ready_announced = True

                    total_ms = res['timing']['dsp'] + res['timing']['classification']
                    scores = res['result']['classification']

                    if DEBUG:
                        log_debug(f"Scores ({total_ms} ms): {scores}")

                    candidates = [l for l in LABELS if l in scores]
                    best_label = max(candidates, key=lambda l: scores.get(l, -1.0)) if candidates else None
                    best_score = scores.get(best_label, 0.0) if best_label else 0.0

                    if (now - last_send_ts) >= DEBOUNCE_SECONDS and best_label and best_score >= THRESH:
                        if best_label == "select":
                            if now < select_block_until:
                                last_send_ts = now
                                next_ready_ts = now + DEBOUNCE_SECONDS
                                ready_announced = False
                                continue

                            WebStatus.update_status("Select the Color")
                            start_color_animation()
                            select_pending = True
                            select_window_until = now + SELECT_SUPPRESS_SECONDS
                            select_block_until = now + SELECT_COOLDOWN_SECONDS
                            continue

                        if best_label in COLOR:
                            if select_pending and now <= select_window_until:
                                log(f"Result: {best_label} ({best_score:.2f})")
                                WebStatus.update_status("Say 'Select' to start")
                                WebStatus.update_color(best_label)
                                show_microphone_icon()
                                try:
                                    set_led_color(best_label)
                                except Exception:
                                    if DEBUG:
                                        log_debug(f"[LED] set_led_color failed for {best_label}")

                                select_pending = False
                                last_send_ts = now
                                next_ready_ts = now + DEBOUNCE_SECONDS
                                ready_announced = False
                                continue

                    if select_pending and now > select_window_until:
                        WebStatus.update_status("Say 'Select' to start")
                        WebStatus.update_color("")
                        show_microphone_icon()
                        try:
                            set_led_color("off")
                        except Exception:
                            if DEBUG:
                                log_debug("[LED] set_led_color failed on window expiry")
                        select_pending = False

        except Exception as e:
            log(f"Voice runner error: {e}")
            time.sleep(1.0)

def start_voice_recognition():
    global voice_thread, voice_started, last_audio_ts
    if voice_thread and voice_thread.is_alive():
        return voice_thread
    voice_shutdown_event.clear()
    voice_thread = threading.Thread(target=_voice_recognition_loop, daemon=True)
    voice_thread.start()
    voice_started = True
    last_audio_ts = time.time()
    show_microphone_icon()
    return voice_thread

def display_frame(frame):
    for y in range(MATRIX_ROWS):
        for x in range(MATRIX_COLS):
            matrix_state[y][x] = frame[y][x]
    matrix_flat = []
    for y in range(MATRIX_ROWS):
        for x in range(MATRIX_COLS):
            matrix_flat.append(str(frame[y][x]))
    bridge_call_async("set_matrix", ','.join(matrix_flat))
    WebStatus._broadcast()

def clear_matrix_display():
    for y in range(MATRIX_ROWS):
        for x in range(MATRIX_COLS):
            matrix_state[y][x] = 0
    try:
        Bridge.call("clear_matrix")
    except Exception:
        pass
    WebStatus._broadcast()

def show_microphone_icon():
    stop_matrix_animation()
    try:
        display_frame(FRAME_MICROPHONE)
    except Exception as e:
        if DEBUG:
            log_debug(f"[MATRIX] Show microphone failed: {e}")

def matrix_animation_loop(frames, delay=0.08):
    while not stop_matrix_animation_flag.is_set():
        for frame in frames:
            if stop_matrix_animation_flag.is_set():
                break
            try:
                display_frame(frame)
            except Exception as e:
                if DEBUG:
                    log_debug(f"[MATRIX] Animation frame error: {e}")
            time.sleep(delay)

def start_color_animation():
    global current_matrix_animation, matrix_animation_thread
    stop_matrix_animation()
    current_matrix_animation = "color"
    stop_matrix_animation_flag.clear()
    matrix_animation_thread = threading.Thread(
        target=matrix_animation_loop,
        args=(ANIMATION_COLOR_FRAMES, 0.08),
        daemon=True
    )
    matrix_animation_thread.start()

def stop_matrix_animation():
    global current_matrix_animation, matrix_animation_thread
    if matrix_animation_thread and matrix_animation_thread.is_alive():
        stop_matrix_animation_flag.set()
        matrix_animation_thread.join(timeout=1.0)
    current_matrix_animation = None
    stop_matrix_animation_flag.clear()

def watchdog_loop():
    while not watchdog_stop_event.is_set():
        now = time.time()

        try:
            if VOICE_ENABLED and voice_started and last_audio_ts > 0:
                if (now - last_audio_ts) > AUDIO_WATCHDOG_SECONDS:
                    with watchdog_lock:
                        _restart_voice_recognition("stale audio")
        except Exception as e:
            if DEBUG:
                log_debug(f"[WATCHDOG] error: {e}")

        time.sleep(max(0.2, WATCHDOG_POLL_SECONDS))

def start_watchdog():
    global watchdog_thread
    if watchdog_thread and watchdog_thread.is_alive():
        return
    watchdog_stop_event.clear()
    watchdog_thread = threading.Thread(target=watchdog_loop, daemon=True)
    watchdog_thread.start()

def _get_local_ips() -> list[str]:
    ips = set()
    try:
        for info in socket.getaddrinfo(socket.gethostname(), None):
            addr = info[4][0]
            if addr and ":" not in addr:
                ips.add(addr)
    except Exception:
        pass

    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ips.add(s.getsockname()[0])
        s.close()
    except Exception:
        pass

    ips.discard("127.0.0.1")
    ips.discard("0.0.0.0")
    return sorted(ips)

# Routes
@app.route('/')
def index():
    """Serve the main HTML page"""
    base_dir = os.path.dirname(os.path.abspath(__file__))
    index_path = os.path.join(base_dir, 'index.html')
    return send_file(index_path)

@app.route('/status')
def status_stream():
    """Server-Sent Events endpoint for real-time status updates"""
    def event_stream():
        q = Queue()
        status_connections.add(q)
        try:
            WebStatus._broadcast()
            while True:
                data = q.get()
                yield f"data: {json.dumps(data)}\n\n"
        except GeneratorExit:
            status_connections.discard(q)

    return Response(event_stream(), mimetype='text/event-stream')

@app.route('/assets/<path:filename>')
def serve_assets(filename):
    base_dir = os.path.dirname(os.path.abspath(__file__))
    assets_dir = os.path.join(base_dir, "assets")
    return send_from_directory(assets_dir, filename)

@app.route('/<path:filename>')
def serve_static(filename):
    allowed = {'arduino.png', 'edgeimpulse.png', 'foundries.png', 'qualcomm.png', 'favicon.ico'}
    if filename in allowed:
        base_dir = os.path.dirname(os.path.abspath(__file__))
        return send_from_directory(os.path.join(base_dir, "assets"), filename)
    return ("Not Found", 404)

def main():
    log("Class Voice LED")
    log("Web server: http://0.0.0.0:8000")
    log("Web server: http://127.0.0.1:8000")
    for ip in _get_local_ips():
        log(f"Web server: http://{ip}:8000")
    log(f"Matrix: {MATRIX_COLS}x{MATRIX_ROWS} = {MATRIX_SIZE} LEDs")

    try:
        logging.getLogger('werkzeug').setLevel(logging.WARNING)
        set_led_color('blue')
        start_voice_recognition()
        start_watchdog()
        app.run(host='0.0.0.0', port=8000, debug=False, threaded=True)
    except KeyboardInterrupt:
        print("\n\nShutting down...")
        sys.exit(0)

if __name__ == "__main__":
    main()

