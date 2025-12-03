#!/bin/bash
#
# Copyright (c) 2025 Foundries.io
#
# SPDX-License-Identifier: BSD-3-Clause
#

# MQTT Configuration
MQTT_HOST="127.0.0.1"
MQTT_PORT="1883"
MQTT_USER="foundries.io"
MQTT_PASS="foundries.io"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo "=========================================="
echo "Arduino Voice MQTT Monitor"
echo "=========================================="
echo ""
echo "MQTT Broker: ${MQTT_HOST}:${MQTT_PORT}"
echo "Username: ${MQTT_USER}"
echo ""
echo "=========================================="
echo ""

# Function to show menu
show_menu() {
    echo ""
    echo "=========================================="
    echo "Monitoring Options:"
    echo "=========================================="
    echo "1)  Subscribe to Voice Status"
    echo "2)  Subscribe to LED Commands"
    echo "3)  Subscribe to All Voice Topics"
    echo "4)  Subscribe to All Arduino Topics"
    echo ""
    echo "Test Commands (simulate voice detection):"
    echo "5)  Simulate: Listening"
    echo "6)  Simulate: Processing (select detected)"
    echo "7)  Simulate: Color Red"
    echo "8)  Simulate: Color Green"
    echo "9)  Simulate: Color Blue"
    echo ""
    echo "0)  Exit"
    echo "=========================================="
    echo -n "Select option: "
}

# Main loop
while true; do
    show_menu
    read -r option
    
    case $option in
        1)
            echo -e "${BLUE}Subscribing to Voice Status (Ctrl+C to stop)...${NC}"
            mosquitto_sub -h ${MQTT_HOST} -p ${MQTT_PORT} -u ${MQTT_USER} -P ${MQTT_PASS} -t "arduino/voice/status" -v
            ;;
        2)
            echo -e "${BLUE}Subscribing to LED Commands (Ctrl+C to stop)...${NC}"
            mosquitto_sub -h ${MQTT_HOST} -p ${MQTT_PORT} -u ${MQTT_USER} -P ${MQTT_PASS} -t "arduino/led/command" -v
            ;;
        3)
            echo -e "${BLUE}Subscribing to all Voice topics (Ctrl+C to stop)...${NC}"
            mosquitto_sub -h ${MQTT_HOST} -p ${MQTT_PORT} -u ${MQTT_USER} -P ${MQTT_PASS} -t "arduino/voice/#" -v
            ;;
        4)
            echo -e "${BLUE}Subscribing to all Arduino topics (Ctrl+C to stop)...${NC}"
            mosquitto_sub -h ${MQTT_HOST} -p ${MQTT_PORT} -u ${MQTT_USER} -P ${MQTT_PASS} -t "arduino/#" -v
            ;;
        5)
            echo -e "${CYAN}Simulating: LISTENING${NC}"
            mosquitto_pub -h ${MQTT_HOST} -p ${MQTT_PORT} -u ${MQTT_USER} -P ${MQTT_PASS} -t "arduino/voice/status" -m "listening"
            ;;
        6)
            echo -e "${MAGENTA}Simulating: PROCESSING (select detected)${NC}"
            mosquitto_pub -h ${MQTT_HOST} -p ${MQTT_PORT} -u ${MQTT_USER} -P ${MQTT_PASS} -t "arduino/voice/status" -m "processing"
            ;;
        7)
            echo -e "${RED}Simulating: Color RED${NC}"
            mosquitto_pub -h ${MQTT_HOST} -p ${MQTT_PORT} -u ${MQTT_USER} -P ${MQTT_PASS} -t "arduino/led/command" -m "color:red"
            ;;
        8)
            echo -e "${GREEN}Simulating: Color GREEN${NC}"
            mosquitto_pub -h ${MQTT_HOST} -p ${MQTT_PORT} -u ${MQTT_USER} -P ${MQTT_PASS} -t "arduino/led/command" -m "color:green"
            ;;
        9)
            echo -e "${BLUE}Simulating: Color BLUE${NC}"
            mosquitto_pub -h ${MQTT_HOST} -p ${MQTT_PORT} -u ${MQTT_USER} -P ${MQTT_PASS} -t "arduino/led/command" -m "color:blue"
            ;;
        0)
            echo -e "${GREEN}Exiting...${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}Invalid option!${NC}"
            ;;
    esac
done
