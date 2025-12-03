# Arduino LED + Matrix MQTT Controller

Unified firmware and Python controller for both RGB LEDs and 13x8 LED Matrix via MQTT.

## Features

- **RGB LED Control**: Control 2x RGB LEDs (LED3, LED4) with colors and blinking
- **Matrix Display**: Control 13x8 LED Matrix (104 LEDs) with icons and animations
- **MQTT Integration**: Full MQTT communication for voice integration
- **Single Firmware**: One unified Arduino sketch for both LED and Matrix
- **Threaded Animations**: Non-blocking matrix animations

## MQTT Topics

### LED Control
- `arduino/led/command` - LED commands (subscribe)
- `arduino/led/status` - LED status updates (publish)

### Matrix Control
- `arduino/matrix/command` - Matrix commands (subscribe)
- `arduino/matrix/status` - Matrix status updates (publish)

### Voice Integration
- `arduino/voice/status` - Voice recognition status (subscribe)

### Global
- `arduino/alert/red` - Red alert (both LED blink + Matrix flash)

## LED Commands

```bash
# Set color
mosquitto_pub -t arduino/led/command -m 'color:red'
mosquitto_pub -t arduino/led/command -m 'color:green'
mosquitto_pub -t arduino/led/command -m 'color:blue'
mosquitto_pub -t arduino/led/command -m 'color:yellow'
mosquitto_pub -t arduino/led/command -m 'color:cyan'
mosquitto_pub -t arduino/led/command -m 'color:magenta'
mosquitto_pub -t arduino/led/command -m 'color:white'
mosquitto_pub -t arduino/led/command -m 'color:off'

# Blink
mosquitto_pub -t arduino/led/command -m 'blink:red'
mosquitto_pub -t arduino/led/command -m 'stop'
```

## Matrix Commands

```bash
# Static icons
mosquitto_pub -t arduino/matrix/command -m 'microphone'
mosquitto_pub -t arduino/matrix/command -m 'select'

# Animations
mosquitto_pub -t arduino/matrix/command -m 'color'

# Clear
mosquitto_pub -t arduino/matrix/command -m 'clear'
```

## Voice Integration

```bash
# Voice sends status
mosquitto_pub -t arduino/voice/status -m 'listening'   # Matrix shows microphone
mosquitto_pub -t arduino/voice/status -m 'processing'  # Matrix animates
mosquitto_pub -t arduino/voice/status -m 'select'      # Matrix shows select icon
```

## Red Alert

```bash
# Start red alert (LED blinks red + Matrix flashes)
mosquitto_pub -t arduino/alert/red -m 'start'

# Stop red alert
mosquitto_pub -t arduino/alert/red -m 'stop'
```

## Testing

Use the included test script:

```bash
./test-mqtt.sh
```

## Building

```bash
docker-compose build
docker-compose up
```

## Architecture

### Firmware (sketch.ino)
- **Matrix Functions**: `set_led()`, `clear_matrix()`, `get_matrix()`
- **LED Functions**: `toggle_led3_r()`, `start_blink_led3_r()`, etc.
- Registers all functions via Arduino RouterBridge

### Python Controller (main.py)
- **LED Control**: Color mapping, blinking control
- **Matrix Control**: Frame display, animations with threading
- **MQTT**: Subscribes to commands, publishes status

## Integration Flow

1. **Voice Detection** → arduino/voice/status: "listening"
2. **Matrix** → Shows microphone icon
3. **Voice "Select"** → arduino/voice/status: "processing"  
4. **Matrix** → Color animation
5. **Voice "Red"** → arduino/led/command: "color:red"
6. **LED** → Turns red
7. **Voice Timeout** → Back to "listening"

## License

BSD-3-Clause - Copyright (c) 2025 Foundries.io
