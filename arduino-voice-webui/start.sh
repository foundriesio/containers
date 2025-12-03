#!/usr/bin/env bash
#
# Copyright (c) 2025 Foundries.io
#
# SPDX-License-Identifier: BSD-3-Clause
#

set -euo pipefail

# Paths and defaults
ASSETS_DIR="${ASSETS_DIR:-/var/local/assets}"
MODEL_NAME="${MODEL_NAME:-deployment.eim}"

PY_BIN="/opt/venv/bin/python3"
APP_PY="/app/classify.py"

DEFAULT_MODEL="/app/${MODEL_NAME}"              # Ex.: /app/deployment.eim
ASSET_MODEL="${ASSETS_DIR}/${MODEL_NAME}"       # Ex.: /var/local/assets/deployment.eim

# Model selection:
# 1) If exists in /var/local/assets -> use that one
# 2) Otherwise, use the default from container (/MODEL_NAME)
MODEL_PATH="$DEFAULT_MODEL"
if [[ -f "$ASSET_MODEL" && -r "$ASSET_MODEL" ]]; then
  MODEL_PATH="$ASSET_MODEL"
elif [[ ! -f "$DEFAULT_MODEL" || ! -r "$DEFAULT_MODEL" ]]; then
  echo "ERROR: model not found in '$ASSET_MODEL' or '$DEFAULT_MODEL'." >&2
  exit 1
fi

echo "Using model: $MODEL_PATH"

# Debug: check if OpenCV is installed
echo "=== Debug: Checking OpenCV installation ==="
"$PY_BIN" -c "import cv2; print(f'OpenCV installed: {cv2.__version__}')" || echo "ERROR: OpenCV not found!"
echo "============================================"

chmod +x "$MODEL_PATH"

"$PY_BIN" "$APP_PY" "$MODEL_PATH"