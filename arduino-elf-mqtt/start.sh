#!/usr/bin/env bash
#
# Copyright (c) 2025 Foundries.io
#
# SPDX-License-Identifier: BSD-3-Clause
#

set -euo pipefail

# Paths and defaults
ASSETS_DIR="${ASSETS_DIR:-/var/local/assets}"
MODEL_NAME="${MODEL_NAME:-model.eim}"

PY_BIN="/opt/venv/bin/python3"
APP_PY="/app/main.py"

DEFAULT_MODEL="/app/${MODEL_NAME}"
ASSET_MODEL="${ASSETS_DIR}/${MODEL_NAME}"

# Model selection:
# 1) If exists in /var/local/assets -> use that one
# 2) Otherwise, use the default from container
MODEL_PATH="$DEFAULT_MODEL"
if [[ -f "$ASSET_MODEL" && -r "$ASSET_MODEL" ]]; then
  MODEL_PATH="$ASSET_MODEL"
  echo "Using model from assets: $MODEL_PATH"
elif [[ -f "$DEFAULT_MODEL" && -r "$DEFAULT_MODEL" ]]; then
  echo "Using default model: $MODEL_PATH"
else
  echo "WARNING: No model found in '$ASSET_MODEL' or '$DEFAULT_MODEL'." >&2
  echo "Starting server without model - detection disabled." >&2
fi

# Debug: check if OpenCV is installed
if [[ "${DEBUG:-0}" == "1" ]]; then
  echo "=== Debug: Checking OpenCV installation ==="
  "$PY_BIN" -c "import cv2; print(f'OpenCV installed: {cv2.__version__}')" || echo "ERROR: OpenCV not found!"
  echo "=== Debug: Checking Edge Impulse SDK ==="
  "$PY_BIN" -c "import edge_impulse_linux; print('Edge Impulse SDK installed')" || echo "ERROR: Edge Impulse not found!"
  echo "============================================"
fi

# Make model executable if it exists
if [[ -f "$MODEL_PATH" ]]; then
  chmod +x "$MODEL_PATH"
fi

# Run the Flask application
if [[ -f "$MODEL_PATH" ]]; then
  "$PY_BIN" "$APP_PY" --model "$MODEL_PATH" --port 8001
else
  "$PY_BIN" "$APP_PY" --port 8001
fi
