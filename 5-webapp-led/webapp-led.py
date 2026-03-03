#!/usr/bin/env python3
#
# Copyright (c) 2025 Foundries.io
#
# SPDX-License-Identifier: BSD-3-Clause
#
import json
import os
from queue import Queue
from weakref import WeakSet
from flask import Flask, Response, request, send_file, send_from_directory, jsonify

APP_TAG = "[APP]"

def _env_bool(name: str, default: bool = False) -> bool:
    v = os.getenv(name)
    if v is None:
        return default
    return str(v).strip().lower() in {"1", "true", "yes", "on"}

DEBUG = _env_bool("DEBUG", True)

app = Flask(__name__)

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

status_connections = WeakSet()
current_status = "Click a color to start"
current_color = ""

def log(msg: str):
    print(f"{APP_TAG} {msg}")

def _write_led(path: str, on: bool):
    try:
        with open(path, "w") as f:
            f.write("1" if on else "0")
        if DEBUG:
            log(f"LED write {path} -> {1 if on else 0}")
    except Exception as e:
        if DEBUG:
            log(f"LED write failed {path}: {e}")

def set_system_leds(color: str):
    mapping = {
        "blue": {"blue"},
        "green": {"green"},
        "red": {"red"},
        "yellow": {"green", "red"},
        "purple": {"blue", "red"},
        "off": set(),
    }
    wanted = mapping.get((color or "").lower(), set())
    for name in LED_NAMES:
        _write_led(LED_SET_1.get(name, ""), name in wanted)
        _write_led(LED_SET_2.get(name, ""), name in wanted)

def set_led_color(color: str):
    if color is None:
        return
    color = (color or "").lower()
    if color not in {"blue", "green", "red", "yellow", "purple", "off"}:
        return
    set_system_leds(color)

def apply_color(requested_color: str) -> str:
    global current_color
    requested_color = (requested_color or "").lower()
    if requested_color == current_color and requested_color != "":
        requested_color = "off"
    set_led_color(requested_color)
    current_color = "" if requested_color == "off" else requested_color
    return requested_color

def _broadcast():
    payload = {
        "status": current_status,
        "color": current_color,
    }
    for q in list(status_connections):
        try:
            q.put(payload)
        except Exception:
            pass

def _set_status(status: str, color: str):
    global current_status, current_color
    current_status = status
    current_color = color
    _broadcast()

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        data = request.get_json(silent=True) or {}
        color = (data.get("color") or request.form.get("color") or request.args.get("color") or "").lower()
        if DEBUG:
            log(f"/ POST payload={data} color='{color}'")
        if color in {"blue", "green", "red", "yellow", "purple", "off"}:
            applied = apply_color(color)
            label = "Off" if applied == "off" else applied.capitalize()
            _set_status(f"Color set: {label}", "" if applied == "off" else applied)
            return jsonify({"status": current_status, "color": current_color})
        return jsonify({"error": "invalid color"}), 400

    base_dir = os.path.dirname(os.path.abspath(__file__))
    return send_file(os.path.join(base_dir, "index.html"))

@app.route('/assets/<path:filename>')
def serve_assets(filename):
    base_dir = os.path.dirname(os.path.abspath(__file__))
    assets_dir = os.path.join(base_dir, "assets")
    candidate = os.path.join(assets_dir, filename)
    if os.path.exists(candidate):
        return send_from_directory(assets_dir, filename)

    sibling_dir = os.path.abspath(os.path.join(base_dir, "..", "class-voice-led-webui"))
    return send_from_directory(sibling_dir, filename)

@app.route('/<path:filename>')
def serve_static(filename):
    allowed = {"arduino.png", "edgeimpulse.png", "foundries.png", "qualcomm.png", "favicon.ico"}
    if filename in allowed:
        base_dir = os.path.dirname(os.path.abspath(__file__))
        return send_from_directory(os.path.join(base_dir, "assets"), filename)
    return ("Not Found", 404)
@app.route('/status')
def status_stream():
    def event_stream():
        q = Queue()
        status_connections.add(q)
        try:
            _broadcast()
            while True:
                data = q.get()
                yield f"data: {json.dumps(data)}\n\n"
        except GeneratorExit:
            status_connections.discard(q)

    return Response(event_stream(), mimetype="text/event-stream")

@app.route('/api/color', methods=['POST'])
def api_color():
    data = request.get_json(silent=True) or {}
    color = (
        data.get("color")
        or data.get("data-color")
        or request.form.get("color")
        or request.args.get("color")
        or ""
    ).lower()
    if DEBUG:
        log(f"/api/color payload={data} color='{color}'")
    if color not in {"blue", "green", "red", "yellow", "purple", "off"}:
        return jsonify({"error": "invalid color"}), 400
    applied = apply_color(color)
    label = "Off" if applied == "off" else applied.capitalize()
    _set_status(f"Color set: {label}", "" if applied == "off" else applied)
    return jsonify({"status": current_status, "color": current_color})

if __name__ == '__main__':
    log("WebApp LED")
    set_led_color("off")
    app.run(debug=False, host='0.0.0.0', port=8000, threaded=True)
