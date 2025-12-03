#!/usr/bin/env python3
#
# Copyright (c) 2025 Foundries.io
#
# SPDX-License-Identifier: BSD-3-Clause
#

import os, sys, getopt, signal, json, time, itertools, subprocess, threading
from contextlib import contextmanager
from typing import Optional
from edge_impulse_linux.audio import AudioImpulseRunner
from flask import Flask, Response, send_from_directory, abort
from queue import Queue
from weakref import WeakSet
import paho.mqtt.client as mqtt

# =============================
# MQTT Configuration
# =============================
MQTT_HOST = os.getenv("MQTT_HOST", "127.0.0.1")
MQTT_PORT = int(os.getenv("MQTT_PORT", "1883"))
MQTT_USER = os.getenv("MQTT_USER", "foundries.io")
MQTT_PASS = os.getenv("MQTT_PASS", "foundries.io")

# MQTT Topics
TOPIC_VOICE_STATUS = "arduino/voice/status"
TOPIC_LED_COMMAND = "arduino/led/command"
TOPIC_ALERT_RED = "arduino/alert/red"

# Global MQTT client
mqtt_client = None

# Alert animation state
alert_active = False
alert_blink_state = False
alert_timer = None

def mqtt_publish(topic, message):
    """Publish MQTT message"""
    global mqtt_client
    if mqtt_client:
        try:
            mqtt_client.publish(topic, message, qos=1)
            print(f"[MQTT] {topic} -> {message}")
        except Exception as e:
            print(f"[MQTT ERROR] {e}")

def on_mqtt_connect(client, userdata, flags, reason_code, properties):
    """MQTT connection callback (API v2)"""
    print(f"[MQTT DEBUG] on_mqtt_connect called with reason_code={reason_code}")
    if reason_code == 0:
        print(f"[MQTT] Connected to {MQTT_HOST}:{MQTT_PORT}")
        # Subscribe to alert topic
        result, mid = client.subscribe(TOPIC_ALERT_RED, qos=1)
        print(f"[MQTT] Subscribed to {TOPIC_ALERT_RED} (result={result}, mid={mid})")
    else:
        print(f"[MQTT] Connection failed with code {reason_code}")

def on_mqtt_disconnect(client, userdata, flags, reason_code, properties):
    """MQTT disconnect callback (API v2)"""
    if reason_code != 0:
        print(f"[MQTT] Unexpected disconnection (reason_code={reason_code}). Reconnecting...")

def on_mqtt_message(client, userdata, msg):
    """MQTT message callback (API v2)"""
    global alert_active
    try:
        topic = msg.topic
        payload = msg.payload.decode('utf-8')
        print(f"[MQTT] <<< Received: {topic} -> {payload}")
        
        if topic == TOPIC_ALERT_RED:
            if payload == "start":
                print("[ALERT] Red alert started - animating tree")
                alert_active = True
                WebStatus.start_alert_animation()
            elif payload == "stop":
                print("[ALERT] Red alert stopped")
                alert_active = False
                WebStatus.stop_alert_animation()
        else:
            print(f"[MQTT] Ignoring message from topic: {topic}")
    except Exception as e:
        print(f"[MQTT] Error processing message: {e}")
        import traceback
        traceback.print_exc()

# =============================
# Global Variables
# =============================
runner = None   # Edge Impulse model runner

# --- Hotplug flags ---
shutdown_event = threading.Event()

# =============================
# Detection Parameters
# =============================
def _env_float(name: str, default: float) -> float:
    v = os.getenv(name)
    if v is None:
        return default
    try:
        return float(v)
    except ValueError:
        print(f"[WARN] ENV {name}='{v}' invalid; using default {default}")
        return default

# Recognized labels (colors + special keyword)
LABELS = {
    "blue", "green", "purple", "red", "yellow", "select"
}
COLOR = {
    "blue", "green", "purple", "red", "yellow"
}

THRESH = _env_float("THRESH", 0.80)
DEBUG = _env_float("DEBUG", 0)
DEBOUNCE_SECONDS = _env_float("DEBOUNCE_SECONDS", 2.0)
# Window (in seconds) after "select" to accept the next color command
SELECT_SUPPRESS_SECONDS = _env_float("SELECT_SUPPRESS_SECONDS", 10.0)
# Cooldown to prevent repeated "select" triggers in a short time
SELECT_COOLDOWN_SECONDS = _env_float("SELECT_COOLDOWN_SECONDS", 5.0)

# =============================
# Temporarily suppress STDERR (to hide ALSA warnings)
# =============================
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

# =============================
# Minimal Hotplug Helpers
# =============================
def _usb_card_present_proc() -> bool:
    """Returns True if /proc/asound/cards contains any card with 'USB'."""
    try:
        with open('/proc/asound/cards', 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read().lower()
        return 'usb' in content
    except Exception:
        return False

def _hotplug_watchdog(runner_ref_fn):
    """Monitors USB presence via /proc/asound/cards and stops runner when it disappears."""
    last_present = _usb_card_present_proc()
    print(f"[AUDIO] Watchdog: USB present? {last_present}")
    while not shutdown_event.is_set():
        time.sleep(1.0)
        present = _usb_card_present_proc()
        if last_present and not present:
            print("[AUDIO] USB (alsa) disappeared. Stopping runner for restart...")
            try:
                r = runner_ref_fn()
                if r:
                    print("[AUDIO] Watchdog: calling runner.stop()")
                    r.stop()
            except Exception as e:
                print(f"[AUDIO] Watchdog: error stopping runner: {e}")
        elif (not last_present) and present:
            print("[AUDIO] USB (alsa) returned. Restarting process (exit) for docker-compose restart...")
            try:
                sys.stdout.flush(); sys.stderr.flush()
            except Exception:
                pass
            os._exit(0)
        last_present = present

# =============================
# LED control helpers
# =============================
LED_NAMES = ("blue", "green", "red")

# LED device mappings: using only user LEDs to avoid conflicts
LED_SET_1 = {
    "blue": "/sys/class/leds/blue:user/brightness",
    "green": "/sys/class/leds/green:user/brightness",
    "red": "/sys/class/leds/red:user/brightness",
}

def _write_led(name: str, on: bool):
    """Write 1/0 to LED_SET_1 for the given color. Ignore failures (e.g., not present)."""
    path = LED_SET_1.get(name)
    
    if not path:
        return
    
    try:
        with open(path, 'w') as f:
            f.write('1' if on else '0')
    except Exception as e:
        if DEBUG:
            print(f"[LED] could not set {path} -> {on}: {e}")

def set_leds(color: str):
    """Set device LEDs for given color. Supported: blue, green, red, yellow, purple.

    yellow = green+red, purple = blue+red. Any unknown/empty color turns all off.
    """
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

# =============================
# Signal Handler (Ctrl+C)
# =============================
def signal_handler(sig, frame):
    """Cleanly terminates execution upon receiving interrupt signal."""
    global runner
    print('Interrupted')
    shutdown_event.set()
    try:
        if runner:
            runner.stop()
    finally:
        pass
    sys.exit(0)

# Register handler
signal.signal(signal.SIGINT, signal_handler)

# =============================
# CLI Help Function
# =============================
def help():
    """Displays usage instructions for the script."""
    print('python classify.py <path_to_model.eim> <audio_device_ID, optional>')

# =============================
# Automatic USB Microphone Selection
# =============================
def auto_pick_usb_device_id():
    """
    Selects only the first input device whose name contains 'USB'.
    If none found, returns None (loop waits for hotplug).
    """
    try:
        import sounddevice as sd
    except Exception as e:
        print(f"[AUDIO] 'sounddevice' unavailable ({e}). Keeping SDK default selection.")
        return None

    try:
        devices = sd.query_devices()
        for idx, dev in enumerate(devices):
            name = (dev.get('name') or '')
            if dev.get('max_input_channels', 0) > 0 and 'usb' in name.lower():
                print(f"[AUDIO] Automatically selected (USB): id={idx} -> {name}")
                return idx
    except Exception as e:
        print(f"[AUDIO] Failed to enumerate devices with 'sounddevice': {e}")
    return None

# =============================
# Web Status Management
# =============================
status_connections = WeakSet()
current_status = "Say Select to start"
current_color = ""
alert_animating = False

class WebStatus:
    _lock = threading.Lock()
    _clear_timer = None
    _alert_timer = None
    _HIGHLIGHT_SECONDS = 10.0
    _ALERT_BLINK_SECONDS = 0.5  # Blink speed for red alert

    @classmethod
    def _broadcast(cls):
        for q in status_connections:
            q.put({"status": current_status, "color": current_color})

    @classmethod
    def update_status(cls, status: str):
        global current_status
        with cls._lock:
            current_status = status
            cls._broadcast()
            
            # Send MQTT updates based on status
            if "Select" in status or "start" in status.lower():
                # Listening state - show microphone
                mqtt_publish(TOPIC_VOICE_STATUS, "listening")

    @classmethod
    def _clear_color_cb(cls):
        global current_color
        with cls._lock:
            # clear only if still set (avoid clobbering later selection)
            current_color = ""
            cls._broadcast()
            # Turn off leds when UI clears the highlight
            try:
                set_leds("")
                # Send MQTT to turn off LED on led-matrix-mqtt
                mqtt_publish("arduino/led/command", "color:off")
            except Exception:
                if DEBUG:
                    print("[LED] failed to clear LEDs in _clear_color_cb")
            cls._clear_timer = None

    @classmethod
    def _alert_blink_cb(cls):
        """Blink between red and off for alert animation"""
        global current_color, alert_animating
        with cls._lock:
            if not alert_animating:
                return
            
            # Toggle between red and empty (off)
            if current_color == "red":
                current_color = ""
            else:
                current_color = "red"
            
            cls._broadcast()
            
            # Schedule next blink
            cls._alert_timer = threading.Timer(cls._ALERT_BLINK_SECONDS, cls._alert_blink_cb)
            cls._alert_timer.daemon = True
            cls._alert_timer.start()

    @classmethod
    def start_alert_animation(cls):
        """Start red alert blinking animation"""
        global current_color, alert_animating
        with cls._lock:
            # Cancel any existing color clear timer
            try:
                if cls._clear_timer and cls._clear_timer.is_alive():
                    cls._clear_timer.cancel()
                cls._clear_timer = None
            except Exception:
                pass
            
            # Start alert animation
            alert_animating = True
            current_color = "red"
            cls._broadcast()
            
            # Start blink timer
            cls._alert_timer = threading.Timer(cls._ALERT_BLINK_SECONDS, cls._alert_blink_cb)
            cls._alert_timer.daemon = True
            cls._alert_timer.start()

    @classmethod
    def stop_alert_animation(cls):
        """Stop red alert blinking animation"""
        global current_color, alert_animating
        with cls._lock:
            alert_animating = False
            
            # Cancel alert timer
            try:
                if cls._alert_timer and cls._alert_timer.is_alive():
                    cls._alert_timer.cancel()
                cls._alert_timer = None
            except Exception:
                pass
            
            # Clear color
            current_color = ""
            cls._broadcast()

    @classmethod
    def update_color(cls, color: str):
        """
        Set the current color and start a timer to clear the highlight after
        _HIGHLIGHT_SECONDS. If called again before timer fires, the previous
        timer is cancelled.
        """
        global current_color, alert_animating
        with cls._lock:
            # Note: Alert animation is only stopped by "select" command, not by color changes
            
            current_color = color
            # cancel previous timer
            try:
                if cls._clear_timer and cls._clear_timer.is_alive():
                    cls._clear_timer.cancel()
            except Exception:
                pass
            # broadcast new state
            cls._broadcast()
            
            # Send MQTT command to LED when color is recognized
            if color:
                mqtt_publish(TOPIC_LED_COMMAND, f"color:{color}")
            
            # start timer to clear highlight
            if color:
                cls._clear_timer = threading.Timer(cls._HIGHLIGHT_SECONDS, cls._clear_color_cb)
                cls._clear_timer.daemon = True
                cls._clear_timer.start()
            else:
                cls._clear_timer = None

# =============================
# Flask App Setup
# =============================
app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.realpath(__file__))

@app.route("/")
def home():
    try:
        with open("index.html", "r") as f:
            content = f.read()
        return Response(content, mimetype='text/html')
    except Exception as e:
        print(f"[ERROR] Failed to serve index.html: {e}")
        return "Error loading page. Check if index.html exists in the same directory as classify.py"

@app.route("/stream")
def stream():
    def eventStream():
        q = Queue()
        try:
            status_connections.add(q)
            # Send initial state
            q.put({"status": current_status, "color": current_color})
            
            while True:
                data = q.get()
                if data:
                    yield f"data: {json.dumps(data)}\n\n"
        except Exception as e:
            print(f"[ERROR] Stream error: {e}")
            
    return Response(eventStream(), mimetype="text/event-stream")

@app.route('/<path:filename>')
def serve_static(filename):
    allowed = {
        'off.png', 'blue.png', 'green.png', 'purple.png', 'red.png', 'yellow.png',
        'favicon.ico'
    }
    if filename in allowed:
        p = os.path.join(BASE_DIR, filename)
        if os.path.exists(p):
            return send_from_directory(BASE_DIR, filename)
    abort(404)

# =============================
# Main Function
# =============================
def main(argv):
    global runner, mqtt_client
    
    # Initialize MQTT client
    print("[MQTT] Initializing MQTT client...")
    mqtt_client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
    mqtt_client.on_connect = on_mqtt_connect
    mqtt_client.on_disconnect = on_mqtt_disconnect
    mqtt_client.on_message = on_mqtt_message
    print(f"[MQTT DEBUG] Callbacks registered: connect={mqtt_client.on_connect}, message={mqtt_client.on_message}")
    
    if MQTT_PASS:
        mqtt_client.username_pw_set(MQTT_USER, MQTT_PASS)
    
    try:
        print(f"[MQTT] Connecting to {MQTT_HOST}:{MQTT_PORT}...")
        mqtt_client.connect(MQTT_HOST, MQTT_PORT, 60)
        mqtt_client.loop_start()  # Start MQTT loop in background
        print(f"[MQTT] Loop started in background")
        # Give it time to connect
        import time
        time.sleep(1)
        # Send initial listening state
        mqtt_publish(TOPIC_VOICE_STATUS, "listening")
    except Exception as e:
        print(f"[MQTT] Failed to connect: {e}")
        print("[MQTT] Continuing without MQTT...")
    
    try:
        opts, args = getopt.getopt(argv, "h", ["--help"])
    except getopt.GetoptError:
        help(); sys.exit(2)

    for opt, arg in opts:
        if opt in ('-h', '--help'):
            help(); sys.exit()

    if len(args) == 0:
        help(); sys.exit(2)

    model = args[0]
    print(f"[CFG] THRESH={THRESH:.2f} (source={'ENV' if os.getenv('THRESH') else 'default'})")
    print(f"[CFG] DEBUG={DEBUG:.2f} (source={'ENV' if os.getenv('DEBUG') else 'default'})")
    print(f"[CFG] DEBOUNCE_SECONDS={DEBOUNCE_SECONDS:.2f} (source={'ENV' if os.getenv('DEBOUNCE_SECONDS') else 'default'})")

    # Device ID selection
    selected_device_id = None
    if len(args) >= 2:
        selected_device_id = int(args[1])
        print("Device ID " + str(selected_device_id) + " has been provided as an argument.")
    else:
        # No argument → try automatically selecting first USB
        selected_device_id = auto_pick_usb_device_id()
        if selected_device_id is not None:
            print(f"[AUDIO] Device ID chosen automatically: {selected_device_id}")
        else:
            print("[AUDIO] No USB auto-selected; SDK may choose/ask.")

    # Resolve model path relative to script directory
    dir_path = os.path.dirname(os.path.realpath(__file__))
    modelfile = os.path.join(dir_path, model)

    # --- Hotplug Loop ---
    shutdown_event.clear()
    runner_holder = {"runner": None}
    wd = threading.Thread(target=_hotplug_watchdog, args=(lambda: runner_holder.get("runner"),), daemon=True)
    wd.start()
    print("[AUDIO] Hotplug watchdog started (scanning every 1s)")

    while not shutdown_event.is_set():
        # Re-select first USB if no argument was passed; maintain if user provided one
        if len(args) < 2:
            selected_device_id = auto_pick_usb_device_id()
            if selected_device_id is None:
                print("[AUDIO] No USB microphone found. Waiting for connection...")
                time.sleep(1.0)
                continue

        with AudioImpulseRunner(modelfile) as runner:
            runner_holder["runner"] = runner
            try:
                # Initialize runner
                model_info = runner.init()
                print('Loaded runner for "' + model_info['project']['owner'] + ' / ' + model_info['project']['name'] + '"')

                # Debounce control
                last_send_ts = 0.0
                next_ready_ts = 0.0
                ready_announced = True
                # Window for the next color command after "select"
                select_window_until = 0.0
                # Cooldown to block repeated "select" detections
                select_block_until = 0.0
                # Flag armed by "select" to allow processing the next color
                select_pending = False

                # ========= Main Classification Loop (with stderr suppressed in 1st iteration) =========
                _iter = runner.classifier(device_id=selected_device_id)

                # Suppress ALSA warnings only until first iteration (noisy moment)
                with _suppress_stderr():
                    try:
                        first_item = next(_iter)
                    except StopIteration:
                        return  # Nothing to classify

                # Process normally from already obtained first item
                for res, audio in itertools.chain([first_item], _iter):
                    now = time.time()

                    # Announce when debounce window ends
                    if not ready_announced and now >= next_ready_ts:
                        print(f"[READY] Debounce window elapsed ({DEBOUNCE_SECONDS}s). Listening/publishing re-enabled.")
                        ready_announced = True

                    # Total processing time (ms)
                    total_ms = res['timing']['dsp'] + res['timing']['classification']
                    scores = res['result']['classification']

                    if DEBUG:
                        # --- DEBUG: dump all label scores before best_label selection ---
                        print(f"Scores ({total_ms} ms): ", end="")
                        for lbl, sc in sorted(scores.items(), key=lambda kv: kv[0]):  # alphabetical for stability
                            print(f"{lbl}:{sc:.2f}\t", end="")
                        print("", flush=True)
                        # Optional quick checks:
                        print(f" top={max(scores, key=scores.get)}:{scores[max(scores, key=scores.get)]:.2f}  has_select={ 'select' in scores }", flush=True)
                        # --- end DEBUG ---

                    # Best label among those we care about
                    candidates = [l for l in LABELS if l in scores]
                    best_label = max(candidates, key=lambda l: scores.get(l, -1.0)) if candidates else None
                    best_score = scores.get(best_label, 0.0) if best_label else 0.0

                    # Publish/print only outside debounce window
                    if (now - last_send_ts) >= DEBOUNCE_SECONDS and best_label and best_score >= THRESH:
                        # 1) Detecting 'select' → arm flag and start window for next color
                        if best_label == "select":
                            # If still under cooldown, ignore this select
                            if now < select_block_until:
                                print("select_cooldown")
                                last_send_ts = now
                                next_ready_ts = now + DEBOUNCE_SECONDS
                                ready_announced = False
                                continue
                            
                            # Stop alert animation when select is detected
                            WebStatus.stop_alert_animation()
                            
                            WebStatus.update_status("Select the Color:")
                            # Send MQTT: processing animation
                            mqtt_publish(TOPIC_VOICE_STATUS, "processing")
                            select_pending = True
                            # start capture window for next color
                            select_window_until = now + SELECT_SUPPRESS_SECONDS
                            # start cooldown to avoid repeated select
                            select_block_until = now + SELECT_COOLDOWN_SECONDS
                            print("\n" + "="*52)
                            print(f"  SELECT ARMED  score={best_score:.2f}  (window until {select_window_until:.0f})")
                            print("="*52 + "\n", flush=True)
                            continue
                        # 2) It's a COLOR — only if select_pending is True and within the window
                        if best_label in COLOR:
                            if select_pending and now <= select_window_until:
                                print(f"Result ({total_ms} ms.) {best_label}: {best_score:.2f}", flush=True)
                                WebStatus.update_status("Say \"Select\" to start")
                                WebStatus.update_color(best_label)
                                # Update device LEDs to reflect recognized color
                                try:
                                    set_leds(best_label)
                                except Exception:
                                    # Don't let LED errors affect main flow
                                    if DEBUG:
                                        print(f"[LED] set_leds failed for {best_label}")

                                # In any color case, consume the armed flag and apply debounce
                                select_pending = False
                                last_send_ts = now
                                next_ready_ts = now + DEBOUNCE_SECONDS
                                ready_announced = False
                                continue
                    # Always check for select window expiry even if no label passed threshold
                    if select_pending and now > select_window_until:
                        print("select_window_expired", flush=True)
                        WebStatus.update_status("Say \"Select\" to start")
                        # Send MQTT: back to listening
                        mqtt_publish(TOPIC_VOICE_STATUS, "listening")
                        select_pending = False
                        # turn off any leds when select window expires
                        try:
                            set_leds("")
                            # Send MQTT to turn off LED on led-matrix-mqtt
                            mqtt_publish("arduino/led/command", "color:off")
                        except Exception:
                            if DEBUG:
                                print("[LED] failed to clear LEDs on select_window_expired")
                    # fall through without publishing

            finally:
                try:
                    runner.stop()
                except Exception:
                    pass

            runner_holder["runner"] = None

        time.sleep(0.5)

# =============================
# Entry Point
# =============================

if __name__ == '__main__':
    # Start Flask in a separate thread with logging
    web_thread = threading.Thread(target=lambda: app.run(
        host="0.0.0.0", 
        port=8000, 
        debug=False,
        use_reloader=False
    ))
    web_thread.daemon = True
    web_thread.start()
    print(f"[WEB] Server started at http://0.0.0.0:8000")
    
    # Initialize starting status
    WebStatus.update_status("Say \"Select\" to start")
    
    # Your existing main() call
    main(sys.argv[1:])