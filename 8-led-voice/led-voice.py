#!/usr/bin/env python3
#
# Copyright (c) 2025 Foundries.io
#
# SPDX-License-Identifier: BSD-3-Clause
#

import os
import sys
import getopt
import signal
from edge_impulse_linux.audio import AudioImpulseRunner

APP_TAG = "[APP]"

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

COLORS = {"blue", "green", "red", "yellow", "purple"}

runner = None
current_color = ""

def log(msg: str):
    print(f"{APP_TAG} {msg}")

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

def _write_led(path: str, on: bool):
    if not path:
        return
    try:
        with open(path, "w") as f:
            f.write("1" if on else "0")
    except Exception as e:
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
    color = (color or "").lower()
    if color not in {"blue", "green", "red", "yellow", "purple", "off"}:
        return
    set_system_leds(color)

def signal_handler(sig, frame):
    log("Interrupted")
    try:
        set_led_color("off")
    except Exception:
        pass
    if runner:
        runner.stop()
    sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)

def help_text():
    print("python led-voice.py <path_to_model.eim> <audio_device_ID, optional>")

def _resolve_model_path(model: str) -> str:
    if os.path.isabs(model):
        return model
    base_dir = os.path.dirname(os.path.realpath(__file__))
    return os.path.join(base_dir, model)

def _print_scores(labels, scores, total_ms: int):
    print(f"Result ({total_ms} ms.) ", end="")
    for label in labels:
        if label not in COLORS:
            continue
        score = scores.get(label, 0.0)
        print(f"{label}: {score:.2f}\t", end="")
    print("", flush=True)

def main(argv):
    global runner, current_color

    try:
        opts, args = getopt.getopt(argv, "h", ["--help"])
    except getopt.GetoptError:
        help_text()
        sys.exit(2)

    for opt, _ in opts:
        if opt in ("-h", "--help"):
            help_text()
            sys.exit(0)

    if len(args) == 0:
        model = os.getenv("VOICE_MODEL_PATH", "/app/deployment.eim")
    else:
        model = args[0]

    model_path = _resolve_model_path(model)

    selected_device_id = None
    if len(args) >= 2:
        try:
            selected_device_id = int(args[1])
            log(f"Audio device ID: {selected_device_id}")
        except ValueError:
            log(f"Invalid audio device ID: {args[1]}")
    else:
        env_device = _env_int("PA_ALSA_DEVICE")
        if env_device is not None:
            selected_device_id = env_device
            log(f"Audio device ID (env): {selected_device_id}")

    with AudioImpulseRunner(model_path) as runner:
        model_info = runner.init()
        labels = model_info["model_parameters"]["labels"]
        log('Loaded runner for "' + model_info["project"]["owner"] + ' / ' + model_info["project"]["name"] + '"')

        for res, audio in runner.classifier(device_id=selected_device_id):
            if "classification" in res["result"].keys():
                total_ms = res["timing"]["dsp"] + res["timing"]["classification"]
                scores = res["result"]["classification"]
                _print_scores(labels, scores, total_ms)

                if scores:
                    best_label = max(scores, key=lambda l: scores.get(l, -1.0))
                    best_score = scores.get(best_label, 0.0)
                    if best_label in COLORS and best_score >= THRESH and best_label != current_color:
                        set_led_color(best_label)
                        current_color = best_label
            elif "freeform" in res["result"].keys():
                total_ms = res["timing"]["dsp"] + res["timing"]["classification"]
                print(f"Result ({total_ms} ms.)")
                for i in range(0, len(res["result"]["freeform"])):
                    values = ", ".join(f"{x:.4f}" for x in res["result"]["freeform"][i])
                    print(f"    Freeform output {i}: {values}")
            else:
                total_ms = res["timing"]["dsp"] + res["timing"]["classification"]
                print(f"Result ({total_ms} ms.)")
                print(res["result"])

if __name__ == "__main__":
    main(sys.argv[1:])

