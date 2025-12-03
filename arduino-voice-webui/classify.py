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

class WebStatus:
    _lock = threading.Lock()
    _clear_timer = None
    _HIGHLIGHT_SECONDS = 10.0

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
            except Exception:
                if DEBUG:
                    print("[LED] failed to clear LEDs in _clear_color_cb")
            cls._clear_timer = None

    @classmethod
    def update_color(cls, color: str):
        """
        Set the current color and start a timer to clear the highlight after
        _HIGHLIGHT_SECONDS. If called again before timer fires, the previous
        timer is cancelled.
        """
        global current_color
        with cls._lock:
            current_color = color
            # cancel previous timer
            try:
                if cls._clear_timer and cls._clear_timer.is_alive():
                    cls._clear_timer.cancel()
            except Exception:
                pass
            # broadcast new state
            cls._broadcast()
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
    global runner
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
                            WebStatus.update_status("Select the Color:")
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
                        select_pending = False
                        # turn off any leds when select window expires
                        try:
                            set_leds("")
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