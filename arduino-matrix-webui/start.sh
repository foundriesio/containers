#!/bin/bash
#
# Copyright (c) 2025 Foundries.io
#
# SPDX-License-Identifier: BSD-3-Clause
#

set -e

SKETCH_DIR="/app/sketch"

echo ">>> Compiling sketch..."
arduino-cli compile -b arduino:zephyr:unoq --output-dir "$SKETCH_DIR" "$SKETCH_DIR"

echo ">>> Flashing..."
BIN_FILE=$(ls "$SKETCH_DIR"/*.elf-zsk.bin | head -n 1)
if [ -z "$BIN_FILE" ]; then
    echo "ERROR: No .elf-zsk.bin found"
    exit 1
fi

/opt/openocd/bin/arduino-flash.sh "$BIN_FILE"

echo ">>> Activating virtualenv"
source /opt/venv/bin/activate

echo ">>> Running Python App..."
python /app/main.py