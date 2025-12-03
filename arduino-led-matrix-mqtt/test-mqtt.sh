#!/bin/bash
#
# Copyright (c) 2025 Foundries.io
#
# SPDX-License-Identifier: BSD-3-Clause
#
# Test script for Arduino LED + Matrix MQTT Controller
#

MQTT_HOST="${MQTT_HOST:-127.0.0.1}"
MQTT_PORT="${MQTT_PORT:-1883}"
MQTT_USER="${MQTT_USER:-foundries.io}"
MQTT_PASS="${MQTT_PASS:-foundries.io}"

echo "============================================================"
echo "  Arduino LED + Matrix MQTT Test Script"
echo "============================================================"
echo ""
echo "MQTT Broker: $MQTT_HOST:$MQTT_PORT"
echo "Credentials: $MQTT_USER / $MQTT_PASS"
echo ""
echo "Available Commands:"
echo ""
echo "  LED Commands:"
echo "    mosquitto_pub -h $MQTT_HOST -u $MQTT_USER -P $MQTT_PASS -t arduino/led/command -m 'color:red'"
echo "    mosquitto_pub -h $MQTT_HOST -u $MQTT_USER -P $MQTT_PASS -t arduino/led/command -m 'color:green'"
echo "    mosquitto_pub -h $MQTT_HOST -u $MQTT_USER -P $MQTT_PASS -t arduino/led/command -m 'color:blue'"
echo "    mosquitto_pub -h $MQTT_HOST -u $MQTT_USER -P $MQTT_PASS -t arduino/led/command -m 'blink:red'"
echo "    mosquitto_pub -h $MQTT_HOST -u $MQTT_USER -P $MQTT_PASS -t arduino/led/command -m 'off'"
echo ""
echo "  Matrix Commands:"
echo "    mosquitto_pub -h $MQTT_HOST -u $MQTT_USER -P $MQTT_PASS -t arduino/matrix/command -m 'microphone'"
echo "    mosquitto_pub -h $MQTT_HOST -u $MQTT_USER -P $MQTT_PASS -t arduino/matrix/command -m 'select'"
echo "    mosquitto_pub -h $MQTT_HOST -u $MQTT_USER -P $MQTT_PASS -t arduino/matrix/command -m 'color'"
echo "    mosquitto_pub -h $MQTT_HOST -u $MQTT_USER -P $MQTT_PASS -t arduino/matrix/command -m 'clear'"
echo ""
echo "  Voice Integration:"
echo "    mosquitto_pub -h $MQTT_HOST -u $MQTT_USER -P $MQTT_PASS -t arduino/voice/status -m 'listening'"
echo "    mosquitto_pub -h $MQTT_HOST -u $MQTT_USER -P $MQTT_PASS -t arduino/voice/status -m 'processing'"
echo "    mosquitto_pub -h $MQTT_HOST -u $MQTT_USER -P $MQTT_PASS -t arduino/voice/status -m 'select'"
echo ""
echo "  Red Alert (Both LED + Matrix):"
echo "    mosquitto_pub -h $MQTT_HOST -u $MQTT_USER -P $MQTT_PASS -t arduino/alert/red -m 'start'"
echo "    mosquitto_pub -h $MQTT_HOST -u $MQTT_USER -P $MQTT_PASS -t arduino/alert/red -m 'stop'"
echo ""
echo "  Monitor Status:"
echo "    mosquitto_sub -h $MQTT_HOST -u $MQTT_USER -P $MQTT_PASS -t arduino/led/status -t arduino/matrix/status"
echo ""
echo "============================================================"
echo ""

# Interactive menu
PS3='Choose action: '
options=(
    "LED: Red"
    "LED: Green"
    "LED: Blue"
    "LED: Blink Red"
    "LED: Off"
    "Matrix: Microphone"
    "Matrix: Select"
    "Matrix: Color Animation"
    "Matrix: Clear"
    "Voice: Listening"
    "Voice: Processing"
    "Voice: Select"
    "Red Alert: START"
    "Red Alert: STOP"
    "Monitor All Status"
    "Quit"
)

select opt in "${options[@]}"
do
    case $opt in
        "LED: Red")
            mosquitto_pub -h "$MQTT_HOST" -u "$MQTT_USER" -P "$MQTT_PASS" -t arduino/led/command -m 'color:red'
            ;;
        "LED: Green")
            mosquitto_pub -h "$MQTT_HOST" -u "$MQTT_USER" -P "$MQTT_PASS" -t arduino/led/command -m 'color:green'
            ;;
        "LED: Blue")
            mosquitto_pub -h "$MQTT_HOST" -u "$MQTT_USER" -P "$MQTT_PASS" -t arduino/led/command -m 'color:blue'
            ;;
        "LED: Blink Red")
            mosquitto_pub -h "$MQTT_HOST" -u "$MQTT_USER" -P "$MQTT_PASS" -t arduino/led/command -m 'blink:red'
            ;;
        "LED: Off")
            mosquitto_pub -h "$MQTT_HOST" -u "$MQTT_USER" -P "$MQTT_PASS" -t arduino/led/command -m 'off'
            ;;
        "Matrix: Microphone")
            mosquitto_pub -h "$MQTT_HOST" -u "$MQTT_USER" -P "$MQTT_PASS" -t arduino/matrix/command -m 'microphone'
            ;;
        "Matrix: Select")
            mosquitto_pub -h "$MQTT_HOST" -u "$MQTT_USER" -P "$MQTT_PASS" -t arduino/matrix/command -m 'select'
            ;;
        "Matrix: Color Animation")
            mosquitto_pub -h "$MQTT_HOST" -u "$MQTT_USER" -P "$MQTT_PASS" -t arduino/matrix/command -m 'color'
            ;;
        "Matrix: Clear")
            mosquitto_pub -h "$MQTT_HOST" -u "$MQTT_USER" -P "$MQTT_PASS" -t arduino/matrix/command -m 'clear'
            ;;
        "Voice: Listening")
            mosquitto_pub -h "$MQTT_HOST" -u "$MQTT_USER" -P "$MQTT_PASS" -t arduino/voice/status -m 'listening'
            ;;
        "Voice: Processing")
            mosquitto_pub -h "$MQTT_HOST" -u "$MQTT_USER" -P "$MQTT_PASS" -t arduino/voice/status -m 'processing'
            ;;
        "Voice: Select")
            mosquitto_pub -h "$MQTT_HOST" -u "$MQTT_USER" -P "$MQTT_PASS" -t arduino/voice/status -m 'select'
            ;;
        "Red Alert: START")
            mosquitto_pub -h "$MQTT_HOST" -u "$MQTT_USER" -P "$MQTT_PASS" -t arduino/alert/red -m 'start'
            ;;
        "Red Alert: STOP")
            mosquitto_pub -h "$MQTT_HOST" -u "$MQTT_USER" -P "$MQTT_PASS" -t arduino/alert/red -m 'stop'
            ;;
        "Monitor All Status")
            echo "Monitoring status topics (Ctrl+C to stop)..."
            mosquitto_sub -h "$MQTT_HOST" -u "$MQTT_USER" -P "$MQTT_PASS" -t arduino/led/status -t arduino/matrix/status
            ;;
        "Quit")
            echo "Exiting..."
            break
            ;;
        *) echo "Invalid option $REPLY";;
    esac
done
