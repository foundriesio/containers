#!/bin/bash

INSTALL_PATH=$(dirname "$(readlink -f $0)")/..
SKETCH_BIN="/app/sketch/sketch.ino.elf-zsk.bin"
FLASH_ADDR="0x80F0000"

# Quick verification: compare binary against flash memory
# Exit code 0 = firmware matches (already flashed)
# Exit code 1 = firmware differs or not flashed
CMDS="init; reset; halt; verify_image ${SKETCH_BIN} ${FLASH_ADDR} bin; shutdown"

echo ">>> Verifying firmware at ${FLASH_ADDR}..."
OUTPUT=$($INSTALL_PATH/bin/openocd -s ${INSTALL_PATH} -f openocd_gpiod.cfg -c "$CMDS" 2>&1)
RESULT=$?

if echo "$OUTPUT" | grep -q "checksum mismatch\|diff.*address"; then
    echo "❌ Firmware NOT flashed or differs"
    exit 1
elif [ $RESULT -eq 0 ]; then
    echo "✅ Firmware already flashed and verified"
    exit 0
else
    echo "⚠️  Verification inconclusive (exit code: $RESULT)"
    exit 2
fi
