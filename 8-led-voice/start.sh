#!/bin/bash
#
# Copyright (c) 2025 Foundries.io
#
# SPDX-License-Identifier: BSD-3-Clause
#
set -e

echo ">>> Activating virtualenv"
source /opt/venv/bin/activate

echo ">>> Running Audio Classifier..."
python /app/led-voice.py