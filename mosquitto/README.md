# Mosquitto MQTT Broker

MQTT broker for Arduino Uno Q demo projects communication.

## Overview

This container runs an Eclipse Mosquitto MQTT broker that enables message-based communication between the Arduino demo projects (voice, LED, matrix, and object detection).

## Features

- **MQTT TCP**: Port 1883 for standard MQTT communication
- **WebSocket**: Port 9001 for browser-based MQTT clients
- **Authentication**: Password-protected access
- **Persistence**: Messages and subscriptions are persisted to disk
- **Logging**: Comprehensive logging to `/mosquitto/log/mosquitto.log`

## Configuration

### mosquitto.conf

The broker is configured with:
- Message persistence enabled
- Authentication required (no anonymous access)
- TCP listener on port 1883
- WebSocket listener on port 9001
- Detailed logging (error, warning, notice, information)

### Authentication

Default credentials:
- **Username**: `foundries.io`
- **Password**: Contact your administrator for the password

To add or modify users, update the `config/passwords` file using `mosquitto_passwd`:

```bash
# Generate new password file
mosquitto_passwd -c config/passwords username

# Add another user
mosquitto_passwd config/passwords another_user
```

## Building

```bash
docker build -t mosquitto .
```

Or using FoundriesFactory:

```bash
# The image will be built and pushed automatically by FoundriesFactory
```

## Running

Using Docker Compose:

```bash
docker-compose up -d
```

Using Docker:

```bash
docker run -d \
  --name mosquitto \
  -p 1883:1883 \
  -p 9001:9001 \
  mosquitto
```

## Usage

### Publishing Messages

```bash
mosquitto_pub -h localhost -p 1883 -u foundries.io -P <password> -t "test/topic" -m "Hello MQTT"
```

### Subscribing to Topics

```bash
mosquitto_sub -h localhost -p 1883 -u foundries.io -P <password> -t "test/topic"
```

### Python Client Example

```python
import paho.mqtt.client as mqtt

client = mqtt.Client()
client.username_pw_set("foundries.io", "<password>")
client.connect("localhost", 1883, 60)

# Subscribe
client.subscribe("test/topic")

# Publish
client.publish("test/topic", "Hello from Python")
```

## Topics Used by Arduino Demos

The Arduino demo projects use the following MQTT topics:

- `arduino/voice/command` - Voice commands (red, green, blue, rainbow, select)
- `arduino/voice/status` - Voice recognition status (listening, processing)
- `arduino/led/color` - LED color changes
- `arduino/matrix/display` - Matrix display commands (microphone, animation)
- `arduino/elf/detected` - Object detection alerts (elf detected)
- `arduino/alert/red` - Emergency red alert (blink all devices)

## Ports

- **1883**: MQTT TCP protocol
- **9001**: MQTT WebSocket protocol

## Volumes

- `/mosquitto/data` - Persistent message storage
- `/mosquitto/log` - Log files
- `/mosquitto/config` - Configuration files

## Troubleshooting

### Check Logs

```bash
docker logs mosquitto
```

Or view the log file directly:

```bash
docker exec mosquitto cat /mosquitto/log/mosquitto.log
```

### Test Connection

```bash
# Test TCP connection
mosquitto_pub -h localhost -p 1883 -u foundries.io -P <password> -t "test" -m "test"

# Test WebSocket connection
# Use a browser-based MQTT client like http://www.hivemq.com/demos/websocket-client/
```

### Permission Issues

If you encounter permission errors:

```bash
docker exec mosquitto chown -R mosquitto:mosquitto /mosquitto
```

## License

SPDX-License-Identifier: BSD-3-Clause  
Copyright (c) 2025, Foundries.io

See LICENSE file in the repository root for details.
