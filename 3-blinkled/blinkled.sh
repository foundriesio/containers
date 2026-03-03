#!/bin/bash
#
# Copyright (c) 2025 Foundries.io
#
# SPDX-License-Identifier: BSD-3-Clause
#

USER_LED_PATHS=(
  "/sys/class/leds/blue:user/brightness"
  "/sys/class/leds/green:user/brightness"
  "/sys/class/leds/red:user/brightness"
)

ALT_LED_PATHS=(
  "/sys/class/leds/blue:bt/brightness"
  "/sys/class/leds/green:wlan/brightness"
  "/sys/class/leds/red:panic/brightness"
)

write_all() {
  local value="$1"
  for path in "${USER_LED_PATHS[@]}" "${ALT_LED_PATHS[@]}"; do
    if [ -w "$path" ]; then
      echo "$value" > "$path"
    fi
  done
}

blink=1

while true; do
  echo "blink = $blink"
  if [ $blink -eq 1 ]; then
    blink=0
    write_all 1
  else
    blink=1
    write_all 0
  fi
  sleep 1 & wait
done