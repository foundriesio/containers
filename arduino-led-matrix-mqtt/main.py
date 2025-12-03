#!/usr/bin/env python3
#
# Copyright (c) 2025 Foundries.io
#
# SPDX-License-Identifier: BSD-3-Clause
#

import sys
import time
import os
import threading
import paho.mqtt.client as mqtt
from arduino.app_utils import *

# MQTT Configuration
MQTT_HOST = os.getenv("MQTT_HOST", "127.0.0.1")
MQTT_PORT = int(os.getenv("MQTT_PORT", "1883"))
MQTT_USER = os.getenv("MQTT_USER", "foundries.io")
MQTT_PASS = os.getenv("MQTT_PASS", "foundries.io")

# MQTT Topics
TOPIC_LED_COMMAND = "arduino/led/command"
TOPIC_LED_STATUS = "arduino/led/status"
TOPIC_MATRIX_COMMAND = "arduino/matrix/command"
TOPIC_MATRIX_STATUS = "arduino/matrix/status"
TOPIC_VOICE_STATUS = "arduino/voice/status"
TOPIC_ALERT_RED = "arduino/alert/red"

# Matrix configuration
MATRIX_COLS = 13
MATRIX_ROWS = 8
MATRIX_SIZE = 104

# LED states tracking
led_states = {
    'led3_r': False, 'led3_g': False, 'led3_b': False,
    'led4_r': False, 'led4_g': False, 'led4_b': False
}

blink_states = {
    'led3_r': False, 'led3_g': False, 'led3_b': False,
    'led4_r': False, 'led4_g': False, 'led4_b': False
}

# Animation control
current_animation = None
animation_thread = None
stop_animation_flag = threading.Event()

# Global MQTT client
mqtt_client = None

# ============================================================================
# MATRIX FRAMES AND ANIMATIONS
# ============================================================================

FRAME_MICROPHONE = [
	[0,0,0,0,0,1,1,0,0,0,0,0,0],
	[0,0,0,0,1,1,1,1,0,0,0,0,0],
	[0,0,0,0,1,1,1,1,0,0,0,0,0],
	[0,0,0,0,1,1,1,1,0,0,0,0,0],
	[0,0,0,0,1,1,1,1,0,0,0,0,0],
	[0,0,1,0,0,1,1,0,0,1,0,0,0],
	[0,0,0,1,1,1,1,1,1,0,0,0,0],
	[0,0,0,0,0,1,1,0,0,0,0,0,0]
]

FRAME_SELECT = [
 	[0,0,0,0,0,0,0,0,1,0,0,0,0],
	[0,0,0,0,1,0,0,0,1,0,0,0,0],
	[0,0,0,1,1,1,0,0,1,0,0,1,0],
	[0,1,0,1,1,1,0,1,1,1,0,1,0],
	[1,1,1,1,1,1,1,1,1,1,1,1,1],
	[0,1,0,1,1,1,0,1,1,1,0,1,0],
	[0,0,0,1,1,1,0,0,1,0,0,0,0],
	[0,0,0,0,1,0,0,0,1,0,0,0,0]
]

ANIMATION_COLOR_FRAMES = [
    # Frame 0: Original position
    [[0,0,0,0,0,0,0,0,1,0,0,0,0],
     [0,0,0,0,1,0,0,0,1,0,0,0,0],
     [0,0,0,1,1,1,0,0,1,0,0,1,0],
     [0,1,0,1,1,1,0,1,1,1,0,1,0],
     [1,1,1,1,1,1,1,1,1,1,1,1,1],
     [0,1,0,1,1,1,0,1,1,1,0,1,0],
     [0,0,0,1,1,1,0,0,1,0,0,0,0],
     [0,0,0,0,1,0,0,0,1,0,0,0,0]],
    
    # Frame 1: Shift right by 1
    [[0,0,0,0,0,0,0,0,0,1,0,0,0],
     [0,0,0,0,0,1,0,0,0,1,0,0,0],
     [0,0,0,0,1,1,1,0,0,1,0,0,1],
     [0,0,1,0,1,1,1,0,1,1,1,0,1],
     [1,1,1,1,1,1,1,1,1,1,1,1,1],
     [0,0,1,0,1,1,1,0,1,1,1,0,1],
     [0,0,0,0,1,1,1,0,0,1,0,0,0],
     [0,0,0,0,0,1,0,0,0,1,0,0,0]],
    
    # Frame 2: Shift right by 2
    [[0,0,0,0,0,0,0,0,0,0,1,0,0],
     [0,0,0,0,0,0,1,0,0,0,1,0,0],
     [1,0,0,0,0,1,1,1,0,0,1,0,0],
     [1,0,0,1,0,1,1,1,0,1,1,1,0],
     [1,1,1,1,1,1,1,1,1,1,1,1,1],
     [1,0,0,1,0,1,1,1,0,1,1,1,0],
     [0,0,0,0,0,1,1,1,0,0,1,0,0],
     [0,0,0,0,0,0,1,0,0,0,1,0,0]],
    
    # Frame 3: Shift right by 3
    [[0,0,0,0,0,0,0,0,0,0,0,1,0],
     [0,0,0,0,0,0,0,1,0,0,0,1,0],
     [0,1,0,0,0,0,1,1,1,0,0,1,0],
     [0,1,0,0,1,0,1,1,1,0,1,1,1],
     [1,1,1,1,1,1,1,1,1,1,1,1,1],
     [0,1,0,0,1,0,1,1,1,0,1,1,1],
     [0,0,0,0,0,0,1,1,1,0,0,1,0],
     [0,0,0,0,0,0,0,1,0,0,0,1,0]],
    
    # Frame 4: Shift right by 4
    [[0,0,0,0,0,0,0,0,0,0,0,0,1],
     [0,0,0,0,0,0,0,0,1,0,0,0,1],
     [0,0,1,0,0,0,0,1,1,1,0,0,1],
     [1,0,1,0,0,1,0,1,1,1,0,1,1],
     [1,1,1,1,1,1,1,1,1,1,1,1,1],
     [1,0,1,0,0,1,0,1,1,1,0,1,1],
     [0,0,0,0,0,0,0,1,1,1,0,0,1],
     [0,0,0,0,0,0,0,0,1,0,0,0,1]],
    
    # Frame 5: Shift right by 5
    [[1,0,0,0,0,0,0,0,0,0,0,0,0],
     [1,0,0,0,0,0,0,0,0,1,0,0,0],
     [1,0,0,1,0,0,0,0,1,1,1,0,0],
     [1,1,0,1,0,0,1,0,1,1,1,0,1],
     [1,1,1,1,1,1,1,1,1,1,1,1,1],
     [1,1,0,1,0,0,1,0,1,1,1,0,1],
     [1,0,0,0,0,0,0,0,1,1,1,0,0],
     [1,0,0,0,0,0,0,0,0,1,0,0,0]],
    
    # Frame 6: Shift right by 6
    [[0,1,0,0,0,0,0,0,0,0,0,0,0],
     [0,1,0,0,0,0,0,0,0,0,1,0,0],
     [0,1,0,0,1,0,0,0,0,1,1,1,0],
     [1,1,1,0,1,0,0,1,0,1,1,1,0],
     [1,1,1,1,1,1,1,1,1,1,1,1,1],
     [1,1,1,0,1,0,0,1,0,1,1,1,0],
     [0,1,0,0,0,0,0,0,0,1,1,1,0],
     [0,1,0,0,0,0,0,0,0,0,1,0,0]],
    
    # Frame 7: Shift right by 7
    [[0,0,1,0,0,0,0,0,0,0,0,0,0],
     [0,0,1,0,0,0,0,0,0,0,0,1,0],
     [0,0,1,0,0,1,0,0,0,0,1,1,1],
     [0,1,1,1,0,1,0,0,1,0,1,1,1],
     [1,1,1,1,1,1,1,1,1,1,1,1,1],
     [0,1,1,1,0,1,0,0,1,0,1,1,1],
     [0,0,1,0,0,0,0,0,0,0,1,1,1],
     [0,0,1,0,0,0,0,0,0,0,0,1,0]],
    
    # Frame 8: Shift right by 8
    [[0,0,0,1,0,0,0,0,0,0,0,0,0],
     [0,0,0,1,0,0,0,0,0,0,0,0,1],
     [1,0,0,1,0,0,1,0,0,0,0,1,1],
     [1,0,1,1,1,0,1,0,0,1,0,1,1],
     [1,1,1,1,1,1,1,1,1,1,1,1,1],
     [1,0,1,1,1,0,1,0,0,1,0,1,1],
     [1,0,0,1,0,0,0,0,0,0,0,1,1],
     [0,0,0,1,0,0,0,0,0,0,0,0,1]],
    
    # Frame 9: Shift right by 9
    [[0,0,0,0,1,0,0,0,0,0,0,0,0],
     [1,0,0,0,1,0,0,0,0,0,0,0,0],
     [1,1,0,0,1,0,0,1,0,0,0,0,1],
     [1,1,0,1,1,1,0,1,0,0,1,0,1],
     [1,1,1,1,1,1,1,1,1,1,1,1,1],
     [1,1,0,1,1,1,0,1,0,0,1,0,1],
     [1,1,0,0,1,0,0,0,0,0,0,0,1],
     [1,0,0,0,1,0,0,0,0,0,0,0,0]],
    
    # Frame 10: Shift right by 10
    [[0,0,0,0,0,1,0,0,0,0,0,0,0],
     [0,1,0,0,0,1,0,0,0,0,0,0,0],
     [1,1,1,0,0,1,0,0,1,0,0,0,0],
     [1,1,1,0,1,1,1,0,1,0,0,1,0],
     [1,1,1,1,1,1,1,1,1,1,1,1,1],
     [1,1,1,0,1,1,1,0,1,0,0,1,0],
     [1,1,1,0,0,1,0,0,0,0,0,0,0],
     [0,1,0,0,0,1,0,0,0,0,0,0,0]],
    
    # Frame 11: Shift right by 11
    [[0,0,0,0,0,0,1,0,0,0,0,0,0],
     [0,0,1,0,0,0,1,0,0,0,0,0,0],
     [0,1,1,1,0,0,1,0,0,1,0,0,0],
     [0,1,1,1,0,1,1,1,0,1,0,0,1],
     [1,1,1,1,1,1,1,1,1,1,1,1,1],
     [0,1,1,1,0,1,1,1,0,1,0,0,1],
     [0,1,1,1,0,0,1,0,0,0,0,0,0],
     [0,0,1,0,0,0,1,0,0,0,0,0,0]],
    
    # Frame 12: Shift right by 12 (wrap around)
    [[0,0,0,0,0,0,0,1,0,0,0,0,0],
     [0,0,0,1,0,0,0,1,0,0,0,0,0],
     [0,0,1,1,1,0,0,1,0,0,1,0,0],
     [1,0,1,1,1,0,1,1,1,0,1,0,0],
     [1,1,1,1,1,1,1,1,1,1,1,1,1],
     [1,0,1,1,1,0,1,1,1,0,1,0,0],
     [0,0,0,1,1,0,0,1,0,0,0,0,0],
     [0,0,0,1,0,0,0,1,0,0,0,0,0]]
]

ANIMATION_RED_ALERT_FRAMES = [
    [[1,1,1,1,1,1,1,1,1,1,1,1,1],
     [1,1,1,1,1,1,1,1,1,1,1,1,1],
     [1,1,1,1,1,1,1,1,1,1,1,1,1],
     [1,1,1,1,1,1,1,1,1,1,1,1,1],
     [1,1,1,1,1,1,1,1,1,1,1,1,1],
     [1,1,1,1,1,1,1,1,1,1,1,1,1],
     [1,1,1,1,1,1,1,1,1,1,1,1,1],
     [1,1,1,1,1,1,1,1,1,1,1,1,1]],
    [[0,0,0,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,0,0,0,0]]
]

# ============================================================================
# LED FUNCTIONS
# ============================================================================

def publish_led_status(message):
    """Publish LED status update to MQTT"""
    if mqtt_client:
        mqtt_client.publish(TOPIC_LED_STATUS, message, qos=1)
        print(f"[LED STATUS] {message}")

def set_led_color(color):
    """Set LED color (blue, green, purple, red, yellow, off)"""
    try:
        # Stop all blinking first
        for led in blink_states.keys():
            if blink_states[led]:
                Bridge.call(f"stop_blink_{led}")
                blink_states[led] = False
        
        color = color.lower()
        
        # Define color mappings - matching arduino-voice-mqtt colors
        # blue, green, red, yellow = green+red, purple = blue+red
        color_map = {
            'blue': ['led3_b', 'led4_b'],
            'green': ['led3_g', 'led4_g'],
            'red': ['led3_r', 'led4_r'],
            'yellow': ['led3_r', 'led3_g', 'led4_r', 'led4_g'],  # green + red
            'purple': ['led3_r', 'led3_b', 'led4_r', 'led4_b'],  # blue + red
            'off': []
        }
        
        if color not in color_map:
            print(f"[ERROR] Unknown color: {color}")
            publish_led_status(f"Error: Unknown color {color}")
            return
        
        # Turn off all LEDs first
        for led in led_states.keys():
            if led_states[led]:
                Bridge.call(f"toggle_{led}")
                led_states[led] = False
        
        # Turn on selected LEDs
        for led in color_map[color]:
            if not led_states[led]:
                Bridge.call(f"toggle_{led}")
                led_states[led] = True
        
        publish_led_status(f"Color set to {color.upper()}")
        print(f"[LED] Color set to {color}")
        
    except Exception as e:
        print(f"[ERROR] Set color {color}: {e}")
        publish_led_status(f"Error: {str(e)}")

def start_blink_all(color='red'):
    """Start all LEDs blinking in specified color"""
    try:
        color = color.lower()
        
        # Color mappings - matching arduino-voice-mqtt colors
        color_map = {
            'blue': ['led3_b', 'led4_b'],
            'green': ['led3_g', 'led4_g'],
            'red': ['led3_r', 'led4_r'],
            'yellow': ['led3_r', 'led3_g', 'led4_r', 'led4_g'],  # green + red
            'purple': ['led3_r', 'led3_b', 'led4_r', 'led4_b']   # blue + red
        }
        
        if color not in color_map:
            print(f"[ERROR] Unknown blink color: {color}")
            return
        
        # Start blinking selected LEDs
        for led in color_map[color]:
            if not blink_states[led]:
                Bridge.call(f"start_blink_{led}")
                blink_states[led] = True
        
        publish_led_status(f"Blinking {color.upper()}")
        print(f"[LED BLINK] Started blinking {color}")
        
    except Exception as e:
        print(f"[ERROR] Start blink: {e}")

def stop_blink_all():
    """Stop all LED blinking"""
    try:
        for led in blink_states.keys():
            if blink_states[led]:
                Bridge.call(f"stop_blink_{led}")
                blink_states[led] = False
        
        publish_led_status("Blinking stopped")
        print(f"[LED BLINK] Stopped all blinking")
        
    except Exception as e:
        print(f"[ERROR] Stop blink: {e}")

# ============================================================================
# MATRIX FUNCTIONS
# ============================================================================

def publish_matrix_status(message):
    """Publish matrix status update to MQTT"""
    if mqtt_client:
        mqtt_client.publish(TOPIC_MATRIX_STATUS, message, qos=1)
        print(f"[MATRIX STATUS] {message}")

def display_frame(frame):
    """Display a single frame on the matrix"""
    try:
        for y in range(MATRIX_ROWS):
            for x in range(MATRIX_COLS):
                Bridge.call("set_led", x, y, frame[y][x])
    except Exception as e:
        print(f"[ERROR] Display frame: {e}")

def clear_matrix():
    """Clear the entire matrix"""
    try:
        Bridge.call("clear_matrix")
        print("[MATRIX] Cleared")
    except Exception as e:
        print(f"[ERROR] Clear matrix: {e}")

def show_static_icon(icon_name):
    """Show a static icon on the matrix"""
    global current_animation
    
    # Stop any running animation
    stop_animation()
    
    try:
        if icon_name == "microphone":
            display_frame(FRAME_MICROPHONE)
            current_animation = "microphone"
            publish_matrix_status("Showing microphone icon")
            print("[MATRIX] Showing microphone icon")
        elif icon_name == "select":
            display_frame(FRAME_SELECT)
            current_animation = "select"
            publish_matrix_status("Showing select icon")
            print("[MATRIX] Showing select icon")
        else:
            print(f"[ERROR] Unknown icon: {icon_name}")
    except Exception as e:
        print(f"[ERROR] Show icon {icon_name}: {e}")

def animation_loop(frames, delay=0.3):
    """Run animation loop in thread"""
    global stop_animation_flag
    
    print(f"[ANIMATION] Starting with {len(frames)} frames")
    
    while not stop_animation_flag.is_set():
        for frame in frames:
            if stop_animation_flag.is_set():
                break
            display_frame(frame)
            time.sleep(delay)

def start_animation(animation_name):
    """Start an animation"""
    global current_animation, animation_thread, stop_animation_flag
    
    # Stop any running animation
    stop_animation()
    
    try:
        if animation_name == "color":
            current_animation = "color"
            stop_animation_flag.clear()
            animation_thread = threading.Thread(
                target=animation_loop,
                args=(ANIMATION_COLOR_FRAMES, 0.08),  # Faster: 80ms per frame
                daemon=True
            )
            animation_thread.start()
            publish_matrix_status("Color animation started")
            print("[ANIMATION] Color animation started")
            
        elif animation_name == "red_alert":
            current_animation = "red_alert"
            stop_animation_flag.clear()
            animation_thread = threading.Thread(
                target=animation_loop,
                args=(ANIMATION_RED_ALERT_FRAMES, 0.3),
                daemon=True
            )
            animation_thread.start()
            publish_matrix_status("Red alert animation started")
            print("[ANIMATION] Red alert animation started")
            
        else:
            print(f"[ERROR] Unknown animation: {animation_name}")
    except Exception as e:
        print(f"[ERROR] Start animation {animation_name}: {e}")

def stop_animation():
    """Stop current animation"""
    global current_animation, animation_thread, stop_animation_flag
    
    if animation_thread and animation_thread.is_alive():
        stop_animation_flag.set()
        animation_thread.join(timeout=1.0)
        print("[ANIMATION] Stopped")
    
    current_animation = None
    clear_matrix()

# ============================================================================
# MQTT CALLBACKS
# ============================================================================

def on_connect(client, userdata, flags, rc):
    """MQTT connection callback"""
    if rc == 0:
        print(f"[MQTT] Connected to broker {MQTT_HOST}:{MQTT_PORT}")
        
        # Subscribe to all topics
        client.subscribe(TOPIC_LED_COMMAND, qos=1)
        client.subscribe(TOPIC_MATRIX_COMMAND, qos=1)
        client.subscribe(TOPIC_VOICE_STATUS, qos=1)
        client.subscribe(TOPIC_ALERT_RED, qos=1)
        
        print(f"[MQTT] Subscribed to {TOPIC_LED_COMMAND}")
        print(f"[MQTT] Subscribed to {TOPIC_MATRIX_COMMAND}")
        print(f"[MQTT] Subscribed to {TOPIC_VOICE_STATUS}")
        print(f"[MQTT] Subscribed to {TOPIC_ALERT_RED}")
        
        # Publish initial status
        publish_led_status("LED+Matrix MQTT Controller Ready")
        publish_matrix_status("LED+Matrix MQTT Controller Ready")
    else:
        print(f"[MQTT] Connection failed with code {rc}")

def on_message(client, userdata, msg):
    """MQTT message callback"""
    topic = msg.topic
    payload = msg.payload.decode('utf-8').strip()
    
    print(f"[MQTT] Received: {topic} -> {payload}")
    
    if topic == TOPIC_LED_COMMAND:
        # LED command format: "color:red", "blink:green", "stop", "off"
        if ':' in payload:
            command, value = payload.split(':', 1)
            command = command.lower()
            
            if command == 'color':
                set_led_color(value)
            elif command == 'blink':
                start_blink_all(value)
        else:
            command = payload.lower()
            
            if command == 'stop':
                stop_blink_all()
            elif command == 'off':
                set_led_color('off')
            else:
                # Assume it's a color name
                set_led_color(command)
    
    elif topic == TOPIC_MATRIX_COMMAND:
        # Matrix commands: "select", "color", "clear"
        command = payload.lower()
        
        if command == "select":
            show_static_icon("select")
        elif command == "color":
            start_animation("color")
        elif command == "microphone":
            show_static_icon("microphone")
        elif command == "clear":
            stop_animation()
        else:
            print(f"[ERROR] Unknown matrix command: {command}")
    
    elif topic == TOPIC_VOICE_STATUS:
        # Voice status: "listening" -> show microphone, "processing" -> animation
        status = payload.lower()
        
        if status == "listening":
            show_static_icon("microphone")
        elif status == "processing":
            start_animation("color")
        elif status == "select":
            show_static_icon("select")
    
    elif topic == TOPIC_ALERT_RED:
        # Red alert - blink red LEDs AND matrix
        if payload.lower() == "start":
            start_blink_all('red')
            start_animation("red_alert")
        elif payload.lower() == "stop":
            stop_blink_all()
            stop_animation()

def on_disconnect(client, userdata, rc):
    """MQTT disconnect callback"""
    if rc != 0:
        print(f"[MQTT] Unexpected disconnection. Reconnecting...")

# ============================================================================
# MAIN
# ============================================================================

def main():
    global mqtt_client
    
    print("=" * 60)
    print("Arduino LED + Matrix MQTT Controller")
    print("=" * 60)
    print(f"\n MQTT Broker: {MQTT_HOST}:{MQTT_PORT}")
    print(f" Username: {MQTT_USER}")
    print(f" Matrix: {MATRIX_COLS}x{MATRIX_ROWS} = {MATRIX_SIZE} LEDs")
    print(f" RGB LEDs: 2x LEDs (LED3 + LED4)")
    print(f"\n Subscribed Topics:")
    print(f"   {TOPIC_LED_COMMAND}")
    print(f"   {TOPIC_MATRIX_COMMAND}")
    print(f"   {TOPIC_VOICE_STATUS}")
    print(f"   {TOPIC_ALERT_RED}")
    print(f"\n Publishing Status:")
    print(f"   {TOPIC_LED_STATUS}")
    print(f"   {TOPIC_MATRIX_STATUS}")
    print("\n" + "=" * 60)
    print("\n LED Commands:")
    print("   arduino/led/command -> color:red|green|blue|yellow|cyan|magenta|white|off")
    print("   arduino/led/command -> blink:red|green|blue")
    print("   arduino/led/command -> stop")
    print("\n Matrix Commands:")
    print("   arduino/matrix/command -> select|color|microphone|clear")
    print("   arduino/voice/status -> listening|processing|select")
    print("\n Global Commands:")
    print("   arduino/alert/red -> start|stop (LED blink + Matrix flash)")
    print("=" * 60 + "\n")
    
    # Create MQTT client
    mqtt_client = mqtt.Client()
    mqtt_client.on_connect = on_connect
    mqtt_client.on_message = on_message
    mqtt_client.on_disconnect = on_disconnect
    
    # Set credentials if password is provided
    if MQTT_PASS:
        mqtt_client.username_pw_set(MQTT_USER, MQTT_PASS)
    
    # Connect to broker
    try:
        mqtt_client.connect(MQTT_HOST, MQTT_PORT, 60)
    except Exception as e:
        print(f"[ERROR] Failed to connect to MQTT broker: {e}")
        print(f"[ERROR] Make sure mosquitto container is running")
        sys.exit(1)
    
    # Start MQTT loop
    try:
        mqtt_client.loop_forever()
    except KeyboardInterrupt:
        print("\n\nShutting down...")
        stop_animation()
        mqtt_client.disconnect()
    except Exception as e:
        print(f"\n[ERROR] MQTT error: {e}")

if __name__ == '__main__':
    main()
