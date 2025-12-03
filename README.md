# Arduino UNO Q Demo Projects

This repository contains comprehensive demonstration projects for the **Arduino UNO Q** board, showcasing dual-core architecture, Edge AI, MQTT integration, and real-time sensor processing using containerized microservices deployed via FoundriesFactory.

## 📚 Tutorial Series

This repository includes a complete **5-part tutorial series** (see `Part 1` through `Part 5` text files) that walks through:
- Part 1: Blinking an LED (dual-core Bridge API basics)
- Part 2: LED Matrix Drawing (interactive hardware control)
- Part 3: Voice-Controlled Christmas Tree (Edge AI audio classification)
- Part 4: Real-Time Object Detection (Edge AI computer vision with YOLOv5)
- Part 5: Integrated Holiday Monitoring System (MQTT microservices architecture)

## 📁 Projects

### 💡 [arduino-led-webui](./arduino-led-webui)
A simple LED control demo with web interface, demonstrating the Arduino UNO Q's dual-core architecture (Qualcomm MPU + STM32U5 MCU).

**Features:**
- Web interface for LED control via Flask
- Bridge API communication between MPU and MCU
- RGB LED control (led3_r/g/b, led4_r/g/b)
- Real-time status updates via Server-Sent Events
- Deployed via FoundriesFactory OTA

**Tutorial:** Part 1 - Blinking an LED

---

### 🎨 [arduino-matrix-webui](./arduino-matrix-webui)
Interactive LED matrix drawing application with clickable 13×8 grid interface.

**Features:**
- 13×8 LED matrix control (104 individual LEDs)
- Click-to-toggle pixel drawing
- Real-time synchronization between web UI and physical matrix
- Clear all functionality
- Packed binary format handling

**Tutorial:** Part 2 - LED Matrix Drawing

---

### 🎄 [arduino-voice-webui](./arduino-voice-webui)
Voice-controlled Christmas tree using Edge Impulse audio classification for on-device voice recognition.

**Features:**
- Edge Impulse audio classification model (deployment.eim included)
- Recognizes 6 voice commands: select, blue, green, purple, red, yellow
- Animated Christmas tree interface with color transitions
- Server-Sent Events for real-time status updates
- ~10Hz audio inference, <200ms response latency
- 100% local processing (no cloud required)

**Tutorial:** Part 3 - Voice-Controlled Christmas Tree

---

### 📹 [arduino-elf-webui](./arduino-elf-webui)
Real-time object detection using Edge Impulse YOLOv5 for detecting Christmas elves through USB camera.

**Features:**
- YOLOv5 Pico model for object detection (model.eim - you provide your own)
- Detects "elf" and "person" classes
- ~17 FPS inference (~58ms per frame)
- Confidence-based bounding box colors (green=high, blue=good, yellow=medium)
- MJPEG video streaming to browser
- OpenCV video processing

**Tutorial:** Part 4 - Real-Time Object Detection

**Note:** Requires custom-trained model.eim file (see Part 4 tutorial for Edge Impulse training instructions)

---

### 🎄📹🎤 Integrated MQTT System (Parts 5)

The following three projects work together as a coordinated microservices system using MQTT:

#### 📹 [arduino-elf-mqtt](./arduino-elf-mqtt)
Elf detection with MQTT alerts - publishes when elf is detected on camera.

**Features:**
- YOLOv5 object detection (elf-only mode)
- MQTT publishing on elf detection
- Red bounding boxes around detected elves
- No automatic "stop" - one-way alert system
- Port 8001 (to avoid conflict with voice service)

**MQTT Topics (Published):**
- `arduino/alert/red` → "start" (when elf detected)
- `arduino/elf/status` → "elf_detected" (status update)

---

#### � [arduino-voice-mqtt](./arduino-voice-mqtt)
Voice-controlled Christmas tree with MQTT integration - receives elf alerts and animates red blinking.

**Features:**
- All features from arduino-voice-webui
- MQTT subscription to elf detection alerts
- Red alert animation (blinks red/off every 500ms)
- "select" command stops alert and opens color selection
- Publishes voice status and LED commands via MQTT
- Port 8000

**MQTT Topics (Published):**
- `arduino/voice/status` → "listening" | "processing" | "select"
- `arduino/led/command` → "color:blue" | "color:red" | "blink:red" | "stop" | "off"

**MQTT Topics (Subscribed):**
- `arduino/alert/red` → Triggers red blinking animation

---

#### 🎨 [arduino-led-matrix-mqtt](./arduino-led-matrix-mqtt)
LED matrix and RGB LED controller with MQTT integration - responds to voice commands and alerts.

**Features:**
- Bridge API for MCU firmware control
- LED matrix animations (microphone, wave, red alert)
- RGB LED color control (blue, green, purple, red, yellow, off)
- MQTT subscription to voice status and LED commands
- Synchronized animations with voice service

**MQTT Topics (Subscribed):**
- `arduino/voice/status` → Changes matrix animation
- `arduino/led/command` → Controls LED colors and blinking
- `arduino/alert/red` → Triggers red LED blink + matrix flash

---

### � [mosquitto](./mosquitto)
MQTT broker container for inter-service messaging in the integrated system (Part 5).

**Features:**
- Eclipse Mosquitto MQTT broker v2.x
- Containerized deployment via FoundriesFactory
- Port 1883 exposed for MQTT TCP connections
- Restart policy: unless-stopped (high availability)
- Required for arduino-elf-mqtt, arduino-voice-mqtt, and arduino-led-matrix-mqtt coordination

**MQTT Broker Configuration:**
- Listen port: 1883
- Protocol: MQTT TCP
- Authentication: Configured via environment variables in MQTT client containers
- Topics namespace: `arduino/*`

**Tutorial:** Part 5 - Integrated Holiday Monitoring System

---

### �🫀 [arduino-heart](./arduino-heart)
Heart animation demo with event-driven beating animation (legacy project).

**Features:**
- Static heart display on startup
- 8-frame beating heart animation
- Event-driven animation triggers
- Python-Arduino bridge communication

---

### 🎨 [arduino-matrix](./arduino-matrix)
Interactive LED matrix menu controller with 30+ images and animations (legacy project).

**Features:**
- 30+ different images across multiple categories
- Built-in animations (Signal and Microphone sequences)
- Interactive Python menu for real-time control
- Display management (clear, start/stop animations)

## 🚀 Technology Stack

**Hardware:**
- **Arduino UNO Q** with dual-core architecture:
  - Qualcomm Dragonwing (MPU) - Linux core for AI, web services, MQTT
  - STM32U5 (MCU) - Real-time core for LED matrix and GPIO control
- **13×8 LED Matrix** (104 red LEDs)
- **6 RGB LEDs** (led3_r/g/b, led4_r/g/b)
- **USB Camera** (for object detection projects)
- **USB Microphone** (for voice recognition projects)

**Software:**
- **Edge Impulse SDK** - On-device AI inference (audio + vision)
  - Audio classification models (~10Hz)
  - YOLOv5 Pico object detection (~17 FPS)
- **FoundriesFactory** - OTA deployment and CI/CD
- **Docker** - Containerized microservices
- **MQTT (Mosquitto)** - Inter-service messaging
- **Flask** - Web interfaces and Server-Sent Events
- **OpenCV** - Video processing
- **Arduino Bridge API** - MPU ↔ MCU communication
- **OpenOCD** - MCU firmware flashing via SWD
- **Python 3** - Application logic and AI inference

## 🧱 Getting Started

### Prerequisites

**For FoundriesFactory Deployment (Recommended):**
- Arduino UNO Q device powered and connected
- FoundriesFactory account with a created Factory
- `fioup` daemon configured for automatic OTA updates
- Git configured with Factory repository cloned
- USB camera at `/dev/video0` (for vision projects)
- USB microphone (ALSA device) (for voice projects)

**Note:** For MQTT projects (Part 5), deploy the `mosquitto` container first before deploying the MQTT-enabled applications.

**For Local Development:**
- Docker and Docker Compose installed
- Linux host (required for GPIO-based SWD flashing)
- Access to GPIO chip devices (`/dev/gpiochip0`, `/dev/gpiochip1`, `/dev/gpiochip2`)
- USB camera at `/dev/video0` (for vision projects)
- USB microphone (ALSA device) (for voice projects)

### Quick Start with FoundriesFactory

1. **Add this repository as a remote:**
```bash
cd /path/to/your/containers.git
git remote add arduino-demo https://github.com/munoz0raul/arduino-demo
git remote update
```

2. **Checkout desired application:**
```bash
# Example: Deploy voice-controlled tree
git checkout remotes/arduino-demo/main -- arduino-voice-webui
```

3. **Commit and push:**
```bash
git add arduino-voice-webui
git commit -m "Adding voice-controlled Christmas tree"
git push
```

4. **Enable via Factory UI:**
- Navigate to: `https://app.foundries.io/factories/<FACTORY-NAME>/devices/`
- Select your device
- Click "Update tags & apps"
- Move application from Available to Enabled
- Click "Update"

5. **Wait for automatic deployment** (2-5 minutes)

6. **Access the application:**
```bash
# Voice/LED projects: http://<device-ip>:8000
# Elf detection: http://<device-ip>:8001
```

### Quick Start with Local Docker

Navigate to any project directory and run:

```bash
# Build the Docker image
docker build -t <project-name> .

# Run with Docker Compose
docker compose up
```

Or use Docker directly:

```bash
docker run -it --privileged \
    --device /dev/gpiochip0 \
    --device /dev/gpiochip1 \
    --device /dev/gpiochip2 \
    --device /dev/video0 \
    -v /var/run/arduino-router.sock:/var/run/arduino-router.sock \
    -p 8000:8000 \
    <project-name>
```

### Setting Up the Integrated MQTT System (Part 5)

To run the complete integrated system with MQTT messaging:

1. **Deploy the MQTT broker container:**
```bash
git checkout remotes/arduino-demo/main -- mosquitto
git add mosquitto
git commit -m "Deploy Mosquitto MQTT broker"
git push
```

2. **Enable mosquitto via Factory UI:**
- Navigate to: `https://app.foundries.io/factories/<FACTORY-NAME>/devices/`
- Select your device
- Click "Update tags & apps"
- Move **mosquitto** from Available to Enabled
- Click "Update"
- Wait for deployment (~1-2 minutes)

3. **Deploy all three MQTT-enabled applications:**
```bash
git checkout remotes/arduino-demo/main -- arduino-elf-mqtt
git checkout remotes/arduino-demo/main -- arduino-voice-mqtt
git checkout remotes/arduino-demo/main -- arduino-led-matrix-mqtt
git add arduino-elf-mqtt arduino-voice-mqtt arduino-led-matrix-mqtt
git commit -m "Deploy integrated MQTT system"
git push
```

4. **Enable all three via Factory UI** (move arduino-elf-mqtt, arduino-voice-mqtt, and arduino-led-matrix-mqtt to Enabled)

5. **Verify MQTT broker is running:**
```bash
ssh arduino@<device-ip>
docker ps | grep mosquitto
# Should show mosquitto container with port 1883 exposed
```

6. **Test the integration:**
- Show elf to camera → Tree blinks red, LEDs flash
- Say "select" → Animation stops, wave appears on matrix
- Say "blue" → Tree turns blue, LEDs turn blue

## 📖 Documentation

**Tutorial Series** (included as .txt files):
- `Part 1_ Blinking an LED.txt` - Introduction to dual-core Bridge API
- `Part 2_ LED Matrix Drawing.txt` - Complex hardware control
- `Part 3_ Voice-Controlled Christmas Tree.txt` - Edge AI audio classification
- `Part 4_ Real-Time Object Detection.txt` - Edge AI computer vision
- `Part 5_ Integrated Holiday Monitoring System.txt` - MQTT microservices

**Individual Projects:**
Each project directory contains its own README.md with:
- Build instructions
- Configuration options
- Code explanations
- Usage examples
- Troubleshooting guides

## 🎯 Purpose

These projects serve as:
- **Complete tutorials** for Arduino UNO Q development (Part 0-5)
- **Learning resources** for dual-core embedded Linux + MCU architecture
- **Edge AI examples** with audio classification and object detection
- **Microservices templates** using MQTT for IoT coordination
- **FoundriesFactory demos** for OTA deployment and CI/CD
- **Templates** for Dockerized Arduino development
- **Reference implementations** for Python-Arduino bridge communication

## 🏗️ Architecture Highlights

**Dual-Core Design:**
```
┌─────────────────────────────────────────┐
│         Arduino UNO Q                   │
│                                         │
│  ┌─────────────────┐  ┌──────────────┐ │
│  │ Qualcomm MPU    │  │ STM32U5 MCU  │ │
│  │ (Linux)         │←→│ (Real-time)  │ │
│  │                 │  │              │ │
│  │ - Flask Web     │  │ - LED Matrix │ │
│  │ - Edge AI       │  │ - GPIO LEDs  │ │
│  │ - MQTT Client   │  │ - Hardware   │ │
│  │ - Video/Audio   │  │   Control    │ │
│  └─────────────────┘  └──────────────┘ │
│         Bridge API (arduino-router)     │
└─────────────────────────────────────────┘
```

**MQTT Microservices (Part 5):**
```
                    ┌─────────────────────────────────────┐
                    │      Docker Containers on UNO Q     │
                    │                                     │
┌─────────┐         │  ┌──────────────────┐              │
│ Camera  │────────────│ arduino-elf-mqtt │              │
└─────────┘         │  │ (Port 8001)      │              │
                    │  └────────┬─────────┘              │
                    │           │ Publish                │
                    │           ▼                        │
                    │  ┌──────────────────┐              │
                    │  │   mosquitto      │              │
                    │  │   MQTT Broker    │              │
                    │  │   (Port 1883)    │              │
                    │  └────┬─────────┬───┘              │
                    │       │         │                  │
                    │       │Subscribe│                  │
      ┌─────────┐   │  ┌────▼──────┐  │                 │
      │Microphone│──────│arduino-   │  │                 │
      └─────────┘   │  │voice-mqtt │  │                 │
                    │  │(Port 8000)│  │                 │
                    │  └───────────┘  │                 │
                    │       │         │                 │
                    │       │Publish  │Subscribe        │
                    │       ▼         ▼                 │
                    │  ┌──────────────────┐              │
                    │  │ arduino-led-     │              │
                    │  │ matrix-mqtt      │              │
                    │  │ (Bridge to MCU)  │              │
                    │  └────────┬─────────┘              │
                    │           │                        │
                    └───────────┼────────────────────────┘
                                │
                                ▼
                    ┌──────────────────┐
                    │ STM32U5 MCU      │
                    │ - LED Matrix     │
                    │ - RGB LEDs       │
                    └──────────────────┘

MQTT Topics:
  arduino/alert/red    - Elf detection alerts
  arduino/elf/status   - Elf detection status
  arduino/voice/status - Voice command state
  arduino/led/command  - LED control commands
```

## 📊 Performance Metrics

**Edge AI Inference:**
- Audio classification: ~100ms latency, ~10Hz
- YOLOv5 object detection: ~58ms latency, ~17 FPS
- Both run 100% locally (no cloud required)

**MQTT Latency:**
- Publish → Subscribe: ~2-5ms (local broker)
- End-to-end elf detection → UI alert: ~75ms

**Resource Usage:**
- mosquitto: ~10 MB RAM, <1% CPU
- arduino-elf-mqtt: ~300 MB RAM, 60-80% CPU
- arduino-voice-mqtt: ~250 MB RAM, 40-60% CPU
- arduino-led-matrix-mqtt: ~150 MB RAM, 10-20% CPU

## 🔒 Privacy & Security

All projects prioritize **privacy-by-design**:
- ✅ Video processing: 100% local (never uploaded)
- ✅ Audio processing: 100% local (never uploaded)
- ✅ AI inference: 100% on-device
- ✅ MQTT messaging: Local broker only (127.0.0.1)
- ✅ No external API calls
- ✅ No telemetry or tracking

Perfect for sensitive applications: home monitoring, healthcare, education, industrial.

## 🛠️ Troubleshooting

**Camera not detected:**
```bash
ls -l /dev/video*  # Should show /dev/video0
```

**Microphone not detected:**
```bash
arecord -l  # Should list USB microphone
```

**MQTT broker not running:**
```bash
# Check if mosquitto container is running
docker ps | grep mosquitto

# Check mosquitto logs
docker logs mosquitto-1

# Test MQTT connectivity from device
docker exec -it mosquitto-1 mosquitto_pub -h 127.0.0.1 -t "test" -m "hello"
```

**MQTT connection issues in applications:**
```bash
# Check MQTT client logs
docker logs arduino-voice-mqtt-1 | grep MQTT
docker logs arduino-elf-mqtt-1 | grep MQTT
docker logs arduino-led-matrix-mqtt-1 | grep MQTT

# Should show: [MQTT] Connected to 127.0.0.1:1883
# If not connected, verify mosquitto container is running first
```

**Container not starting:**
```bash
docker logs <container-name>
journalctl -f -u fioup  # On device
```

## 🤝 Contributing

This is a demonstration repository. For issues or questions about:
- Arduino UNO Q hardware: [Arduino Support](https://support.arduino.cc/)
- FoundriesFactory: [Foundries.io Docs](https://docs.foundries.io/)
- Edge Impulse: [Edge Impulse Forum](https://forum.edgeimpulse.com/)

## 📝 License

Check individual project directories for license information.

---

**Built with ❤️ for the Arduino UNO Q community**

Showcasing the power of dual-core embedded Linux + MCU architecture with Edge AI, MQTT microservices, and OTA deployment! 🚀

