# Building a Web-Controlled LED System with Arduino Uno Q: MPU-MCU Communication

## Introduction

The [Arduino Uno Q](https://docs.arduino.cc/hardware/uno-q/) is a unique board that features **two processing cores**: a **Microprocessor (MPU)** running Linux and a **Microcontroller (MCU)** for real-time hardware control. This dual-core architecture opens up powerful possibilities for IoT applications, allowing you to combine the flexibility of Linux with the precision of bare-metal firmware.

In this tutorial, we'll build a **web-based LED controller** that demonstrates inter-core communication. The MPU will run a Flask web server accessible from any browser, while the MCU will control the physical LEDs. We'll use [Arduino App Bricks](https://docs.arduino.cc/software/app-lab/tutorials/bricks/) to enable seamless communication between the two cores via the **Arduino Bridge**.

## 🎥 Demo Video

Watch the project in action:

[![Arduino LED Web Controller Demo](https://img.shields.io/badge/▶️-Watch%20Demo-red?style=for-the-badge)](https://photos.app.goo.gl/cVVhZjy9v6azrm4y6)

**[Click here to see the video demonstration](https://photos.app.goo.gl/cVVhZjy9v6azrm4y6)**

The video shows:
- Web interface with LED control buttons
- Real-time LED toggling on the Arduino board
- Blink animations with start/stop controls
- Server-Sent Events updating status in real-time

---

## Architecture Overview

![Architecture Diagram]
```
┌─────────────────────┐         ┌──────────────────────┐
│   Web Browser       │◄────────┤  Flask Server (MPU)  │
│   (Client)          │  HTTP   │  Python + App Bricks │
└─────────────────────┘         └──────────┬───────────┘
                                           │
                                    Bridge │ IPC
                                           │
                                ┌──────────▼───────────┐
                                │   Sketch.ino (MCU)   │
                                │   Zephyr RTOS        │
                                └──────────┬───────────┘
                                           │
                                    ┌──────▼──────┐
                                    │  Hardware   │
                                    │  6 RGB LEDs │
                                    └─────────────┘
```

---

## Understanding the Arduino Uno Q Architecture

### Dual-Core Design

The Arduino Uno Q contains:

1. **MPU (Microprocessor)** - Runs a full Linux system
   - Handles networking, file I/O, and complex applications
   - Runs Python, Node.js, and other high-level languages
   - Perfect for web servers, APIs, and cloud connectivity

2. **MCU (Microcontroller)** - STM32U5 running Zephyr RTOS
   - Real-time hardware control
   - Direct GPIO access for LEDs, sensors, motors
   - Deterministic timing for precise operations

### The Bridge: Inter-Core Communication

The **Arduino Bridge** provides a simple IPC (Inter-Process Communication) mechanism:
- The MPU can **call functions** defined in the MCU firmware
- The MCU can **publish data** to the MPU
- Communication happens over a Unix socket (`/var/run/arduino-router.sock`)

This architecture is ideal for our LED controller:
- **MCU**: Controls LEDs with precise timing (blink animations)
- **MPU**: Provides web interface and user interaction
- **Bridge**: Connects the two worlds seamlessly

---

## Project Overview: Web-Controlled LED System

We'll build a complete system with:

- **6 RGB LEDs** (LED3_R/G/B and LED4_R/G/B)
- **Web interface** with buttons to toggle each LED
- **Blink animations** with start/stop controls
- **Real-time status** via Server-Sent Events (SSE)

---

## Part 1: The Dockerfile - Building the Environment

Let's start by examining the `Dockerfile`, which sets up our complete development environment:

```dockerfile
FROM debian:trixie-slim
ENV DEBIAN_FRONTEND=noninteractive

COPY arduino.asc /etc/apt/keyrings/arduino.asc
COPY arduino.conf /etc/apt/auth.conf.d/arduino.conf
COPY arduino.list /etc/apt/sources.list.d/arduino.list

RUN chmod 644 /etc/apt/keyrings/arduino.asc && \
    chmod 600 /etc/apt/auth.conf.d/arduino.conf

RUN apt-get update && \
    apt-get install -y apt-transport-https ca-certificates

RUN apt-get update && \
    apt-get install -y \
        arduino-cli python3 python3-venv python3-dev python3-pip \
        build-essential gcc \
        libasound2 libasound2-dev \
        libgpiod3 bash git curl && \
    apt-get clean && rm -rf /var/lib/apt/lists/*
```

### Base Image

We use **`debian:trixie-slim`** as our base image:
- Smaller footprint (~70-80MB vs ~120MB for full Debian)
- Contains only essential packages
- Perfect for containerized applications

### Arduino CLI Repository Setup

Before installing `arduino-cli`, we configure the Arduino package repository:

```dockerfile
COPY arduino.asc /etc/apt/keyrings/arduino.asc
COPY arduino.conf /etc/apt/auth.conf.d/arduino.conf
COPY arduino.list /etc/apt/sources.list.d/arduino.list

RUN chmod 644 /etc/apt/keyrings/arduino.asc && \
    chmod 600 /etc/apt/auth.conf.d/arduino.conf
```

These files provide:
- **`arduino.asc`**: GPG key for package verification
- **`arduino.conf`**: Authentication configuration
- **`arduino.list`**: Package repository source list

### Installing Dependencies

```dockerfile
RUN apt-get update && \
    apt-get install -y apt-transport-https ca-certificates
```

First, we install HTTPS transport support for secure package downloads.

```dockerfile
RUN apt-get update && \
    apt-get install -y \
        arduino-cli python3 python3-venv python3-dev python3-pip \
        build-essential gcc \
        libasound2 libasound2-dev \
        libgpiod3 bash git curl && \
    apt-get clean && rm -rf /var/lib/apt/lists/*
```

**What's Being Installed:**

1. **`arduino-cli`** - Command-line tool to compile Arduino sketches
   - Provides the build toolchain for Zephyr RTOS
   - Compiles `.ino` files into firmware binaries
   - Manages board definitions and libraries

2. **Python environment** - For the MPU application
   - `python3-venv` - Virtual environment isolation
   - `python3-pip` - Package management
   - `python3-dev` - Development headers for native extensions

3. **Build tools** - Compilers and libraries
   - `gcc`, `build-essential` - C/C++ compilation
   - `libgpiod3` - GPIO access for flashing
   - `libasound2`, `libasound2-dev` - Audio libraries (required by some dependencies)

4. **Utilities**
   - `bash`, `git`, `curl` - Shell and download tools
   - `apt-transport-https`, `ca-certificates` - Secure package downloads

**Note:** The final `apt-get clean && rm -rf /var/lib/apt/lists/*` reduces image size by removing package cache.

### Installing the Arduino Core

```dockerfile
RUN arduino-cli core install arduino:zephyr -v
```

This installs the **Arduino Zephyr Core**, which provides:
- Zephyr RTOS for the STM32U5 MCU
- Board definitions for `arduino:zephyr:unoq`
- Compilation toolchain

### Setting Up Python Dependencies

```dockerfile
ENV VENV=/opt/venv
RUN python3 -m venv $VENV
ENV PATH="$VENV/bin:$PATH"

RUN pip install --upgrade pip setuptools wheel && \
    pip install https://github.com/arduino/app-bricks-py/releases/download/release%2F0.5.0/arduino_app_bricks-0.5.0-py3-none-any.whl && \
    pip install numpy watchdog pyalsaaudio flask
```

**Key Python packages:**

- **`arduino_app_bricks`** - The star of the show! Provides the Bridge API
- **`flask`** - Web server framework
- **`numpy`**, `watchdog`, `pyalsaaudio` - Supporting libraries

### OpenOCD: The Flashing Tool

```dockerfile
COPY openocd /opt/openocd
```

**OpenOCD (Open On-Chip Debugger)** is used to flash firmware to the MCU:
- Supports SWD (Serial Wire Debug) protocol
- Configured for the STM32U5 microcontroller
- Uses Linux GPIO pins for communication

### Copying Application Files

```dockerfile
RUN mkdir -p /app/
COPY openocd /opt/openocd
COPY main.py start.sh index.html /app/
COPY sketch.yaml sketch.ino /app/sketch/
RUN chmod +x /app/start.sh
WORKDIR /app

CMD ["/app/start.sh"]
```

This copies:
- **`openocd/`** - Custom OpenOCD bundle to `/opt/openocd` for flashing
- **`main.py`** - MPU application (Flask server) to `/app/`
- **`start.sh`** - Build and run script to `/app/`
- **`index.html`** - Web interface to `/app/`
- **`sketch.ino`** - MCU firmware (runs on STM32U5) to `/app/sketch/`
- **`sketch.yaml`** - Sketch configuration to `/app/sketch/`

The container starts in `/app` and automatically runs `/app/start.sh` on startup.

---

## Part 2: The start.sh Script - Build, Flash, Run

The `start.sh` script orchestrates the entire workflow:

```bash
#!/bin/bash
set -e

SKETCH_DIR="/app/sketch"

echo ">>> Compiling sketch..."
arduino-cli compile -b arduino:zephyr:unoq --output-dir "$SKETCH_DIR" "$SKETCH_DIR"

echo ">>> Flashing..."
BIN_FILE=$(ls "$SKETCH_DIR"/*.elf-zsk.bin | head -n 1)
if [ -z "$BIN_FILE" ]; then
    echo "ERROR: No .elf-zsk.bin found"
    exit 1
fi

/opt/openocd/bin/arduino-flash.sh "$BIN_FILE"

echo ">>> Activating virtualenv"
source /opt/venv/bin/activate

echo ">>> Running Python App..."
python /app/main.py
```

### Step 1: Compiling the MCU Firmware

```bash
arduino-cli compile -b arduino:zephyr:unoq --output-dir "$SKETCH_DIR" "$SKETCH_DIR"
```

**What happens here:**

1. **Target board**: `arduino:zephyr:unoq` (Arduino Uno Q with Zephyr)
2. **Input**: `sketch.ino` and `sketch.yaml` in `/app/sketch/`
3. **Output**: `sketch.ino.elf-zsk.bin` (compiled firmware)

The compilation process:
- Parses the Arduino sketch
- Links against Zephyr RTOS libraries
- Includes the Bridge communication layer
- Produces a binary ready for the STM32U5 MCU

### Step 2: Flashing the Firmware

```bash
/opt/openocd/bin/arduino-flash.sh "$BIN_FILE"
```

**What happens here:**

1. OpenOCD connects to the MCU via SWD (using GPIO pins)
2. Erases the existing firmware
3. Writes the new binary to flash memory
4. Resets the MCU to start execution

**Why this works:** The Arduino Uno Q's MPU has direct access to the MCU's debug interface, allowing seamless firmware updates without external programmers.

### Step 3: Running the Python Application

```bash
python /app/main.py
```

This starts the Flask web server on the MPU, which:
- Listens on port 8000
- Serves the web interface
- Handles LED toggle requests
- Communicates with the MCU via Bridge

---

## Part 3: The sketch.ino - MCU Firmware

Now let's dive into the MCU firmware that controls the LEDs.

### Including the Bridge Library

```cpp
#include <Arduino_RouterBridge.h>
```

This header provides the Bridge API for MCU-to-MPU communication.

### State Management

```cpp
// LED states: false = OFF, true = ON
bool led3_r_state = false;
bool led3_g_state = false;
bool led3_b_state = false;
bool led4_r_state = false;
bool led4_g_state = false;
bool led4_b_state = false;

// Blink animation flags
bool blinking_led3_r = false;
bool blinking_led3_g = false;
bool blinking_led3_b = false;
bool blinking_led4_r = false;
bool blinking_led4_g = false;
bool blinking_led4_b = false;
```

We track:
- **Static state** - Is the LED on or off?
- **Animation state** - Is the LED blinking?

### Setup: Registering Bridge Functions

```cpp
void setup() {
  // Initialize LED pins
  pinMode(LED_BUILTIN, OUTPUT);      // LED3_R
  pinMode(LED_BUILTIN + 1, OUTPUT);  // LED3_G
  pinMode(LED_BUILTIN + 2, OUTPUT);  // LED3_B
  pinMode(LED_BUILTIN + 3, OUTPUT);  // LED4_R
  pinMode(LED_BUILTIN + 4, OUTPUT);  // LED4_G
  pinMode(LED_BUILTIN + 5, OUTPUT);  // LED4_B
  
  // Start the Bridge
  Bridge.begin();
  
  // Register functions for toggle
  Bridge.provide("toggle_led3_r", toggle_led3_r);
  Bridge.provide("toggle_led3_g", toggle_led3_g);
  // ... more registrations
  
  // Register functions for blink control
  Bridge.provide("start_blink_led3_r", start_blink_led3_r);
  Bridge.provide("stop_blink_led3_r", stop_blink_led3_r);
  // ... more registrations
}
```

**Understanding `Bridge.provide()`:**

```cpp
Bridge.provide("stop_blink_led4_b", stop_blink_led4_b);
```

This line does two things:

1. **Registers the function name** - "stop_blink_led4_b" becomes callable from the MPU
2. **Links to the C++ function** - `stop_blink_led4_b()` will execute when called

When the MPU calls `Bridge.call("stop_blink_led4_b")`, the MCU will execute the `stop_blink_led4_b()` function.

### The Loop: Animation Engine

```cpp
void loop() {
  // Check if any LED is blinking
  bool anyBlinking = blinking_led3_r || blinking_led3_g || blinking_led3_b ||
                     blinking_led4_r || blinking_led4_g || blinking_led4_b;
  
  if (anyBlinking) {
    unsigned long currentMillis = millis();
    
    // Toggle blink state every second
    if (currentMillis - previousMillis >= blinkInterval) {
      previousMillis = currentMillis;
      blinkState = !blinkState;
      
      // Apply blink state to all blinking LEDs
      if (blinking_led3_r) {
        digitalWrite(LED_BUILTIN, blinkState ? LOW : HIGH);
      }
      // ... repeat for other LEDs
    }
  } else {
    delay(100);  // Small delay when not blinking
  }
}
```

**Why the loop is important:**

- The `loop()` function runs continuously on the MCU
- Provides **non-blocking timing** using `millis()`
- Handles animations without freezing the system
- Allows the MCU to respond to Bridge calls while animating

**Note:** LEDs on the Arduino Uno Q are **active-LOW**, meaning:
- `digitalWrite(pin, LOW)` → LED **ON**
- `digitalWrite(pin, HIGH)` → LED **OFF**

### Control Functions

```cpp
void toggle_led3_r() {
  led3_r_state = !led3_r_state;
  digitalWrite(LED_BUILTIN, led3_r_state ? LOW : HIGH);
}

void start_blink_led3_r() {
  blinking_led3_r = true;
}

void stop_blink_led3_r() {
  blinking_led3_r = false;
  digitalWrite(LED_BUILTIN, HIGH);  // Turn off LED
}
```

These functions are **called by the MPU via Bridge** to:
- Toggle LED states
- Start/stop blink animations
- Provide direct hardware control

---

## Part 4: The main.py - MPU Application

Now let's look at the Python application running on the MPU.

### Importing the Bridge

```python
from arduino.app_utils import *
```

This import provides:
- **`Bridge`** class - For calling MCU functions
- Utility functions for Arduino app development

### Flask Web Server Setup

```python
from flask import Flask, Response, send_file, jsonify, request

app = Flask(__name__)
```

Flask provides:
- HTTP routing (`@app.route()`)
- JSON responses (`jsonify()`)
- Server-Sent Events (`Response()`)

### Calling MCU Functions via Bridge

```python
@app.route('/start_blink/<led>', methods=['POST'])
def start_blink(led):
    """Start LED blink animation"""
    try:
        if led not in blink_states:
            return jsonify({'success': False, 'error': 'Invalid LED'}), 400
        
        # Call Arduino Bridge
        Bridge.call(f"start_blink_{led}")
        
        # Update state
        blink_states[led] = True
        
        # Update status
        status_msg = f"{led.upper()} blink STARTED"
        WebStatus.update_status(status_msg)
        
        print(f"[BLINK] Started {led}")
        
        return jsonify({
            'success': True,
            'led': led,
            'blinking': True
        })
    except Exception as e:
        print(f"[ERROR] Start blink {led}: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500
```

**Understanding `Bridge.call()`:**

```python
Bridge.call(f"start_blink_{led}")
```

This line:

1. **Sends a message** from the MPU to the MCU
2. **Crosses the core boundary** via the Arduino Router socket
3. **Invokes the registered function** on the MCU side
4. **Returns immediately** (non-blocking call)

For example, `Bridge.call("start_blink_led3_r")` will:
- Send the message "start_blink_led3_r" to the MCU
- The MCU receives it and calls `start_blink_led3_r()`
- The function sets `blinking_led3_r = true`
- The `loop()` starts animating the LED

### Server-Sent Events for Real-Time Updates

```python
@app.route('/status')
def status_stream():
    """Server-Sent Events endpoint for real-time status updates"""
    def event_stream():
        q = Queue()
        status_connections.add(q)
        try:
            yield f"data: {{\"status\": \"{current_status}\"}}\n\n"
            while True:
                data = q.get()
                yield f"data: {{'status': '{data['status']}'}}\n\n"
        except GeneratorExit:
            status_connections.discard(q)
    
    return Response(event_stream(), mimetype='text/event-stream')
```

SSE provides:
- **Push updates** to all connected browsers
- **Real-time status** without polling
- **Simple implementation** compared to WebSockets

---

## Part 5: The Web Interface - index.html

The web interface provides a clean, modern UI for LED control.

### Button Structure

```html
<button class="btn btn-red" onclick="toggleLED('led3_r')" id="btn-led3-r">
    <span>🔴</span> Red
</button>
<button class="btn btn-blink" onclick="toggleBlink('led3_r')" id="blink-led3-r">
    <span>✨</span> Blink Red
</button>
```

### JavaScript: Toggle LED

```javascript
async function toggleLED(led) {
    try {
        const response = await fetch(`/toggle/${led}`, { method: 'POST' });
        const data = await response.json();
        
        if (data.success) {
            ledStates[led] = data.state;
            const btn = document.getElementById(`btn-${led.replace('_', '-')}`);
            if (data.state) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
            updateStatus(`${led.toUpperCase()}: ${data.state ? 'ON' : 'OFF'}`);
        }
    } catch (error) {
        console.error('Error toggling LED:', error);
        updateStatus('Error: Could not toggle LED');
    }
}
```

### JavaScript: Toggle Blink

```javascript
async function toggleBlink(led) {
    try {
        const isBlinking = blinkStates[led];
        const endpoint = isBlinking ? 'stop_blink' : 'start_blink';
        
        const response = await fetch(`/${endpoint}/${led}`, { method: 'POST' });
        const data = await response.json();
        
        if (data.success) {
            blinkStates[led] = data.blinking;
            const btn = document.getElementById(`blink-${led.replace('_', '-')}`);
            if (data.blinking) {
                btn.classList.add('blinking');
                btn.innerHTML = '<span>⏹️</span> Stop Blink';
            } else {
                btn.classList.remove('blinking');
                const color = led.split('_')[1].toUpperCase();
                btn.innerHTML = `<span>✨</span> Blink ${color === 'R' ? 'Red' : color === 'G' ? 'Green' : 'Blue'}`;
            }
            updateStatus(`${led.toUpperCase()} blink: ${data.blinking ? 'STARTED' : 'STOPPED'}`);
        }
    } catch (error) {
        console.error('Error toggling blink:', error);
        updateStatus('Error: Could not toggle blink');
    }
}
```

### JavaScript: Server-Sent Events

```javascript
const eventSource = new EventSource('/status');

eventSource.onmessage = function(event) {
    const data = JSON.parse(event.data);
    document.getElementById('status').textContent = data.status;
};
```

---

## The Complete Flow: Clicking a Button

Let's trace what happens when you click "Toggle Red LED":

1. **Browser** → Sends `POST /toggle/led3_r` to Flask server (MPU)

2. **Flask (MPU)** → Receives request in `toggle_led()` function
   ```python
   Bridge.call("toggle_led3_r")
   ```

3. **Bridge** → Sends message across cores via Unix socket

4. **Arduino Router** → Routes message to MCU

5. **MCU (sketch.ino)** → Receives message, calls registered function:
   ```cpp
   void toggle_led3_r() {
       led3_r_state = !led3_r_state;
       digitalWrite(LED_BUILTIN, led3_r_state ? LOW : HIGH);
   }
   ```

6. **Hardware** → LED turns on/off

7. **Flask (MPU)** → Broadcasts status via SSE

8. **Browser** → Updates UI in real-time

**Total latency:** < 50ms for complete round trip!

---

## Running the Project

### Build the Container

```bash
export FACTORY=<My-Factory-Name>
docker build -t hub.foundries.io/${FACTORY}/arduino-led-webui:latest .
```

### Run the Container

#### Using Docker Run

Run the container with the necessary GPIO devices and socket mount:

```bash
docker run -it --privileged \
    --device /dev/gpiochip0 \
    --device /dev/gpiochip1 \
    --device /dev/gpiochip2 \
    -v /var/run/arduino-router.sock:/var/run/arduino-router.sock \
    hub.foundries.io/${FACTORY}/arduino-led-webui:latest
```

#### Using Docker Compose

Alternatively, use docker-compose for easier management:

```bash
docker compose up
```

**Note:** Docker Compose will automatically use `hub.foundries.io/${FACTORY}/arduino-led-webui:latest` as defined in `docker-compose.yml`.

The container will:

1. Compile the sketch in `/app/sketch`
2. Flash it to the board using OpenOCD
3. Run the Python Flask application on port 8000

### Access the Web Interface

Open your browser to **http://localhost:8000**

You'll see:
- 12 buttons (6 LEDs × 2 controls each)
- Real-time status updates
- Visual feedback on LED states

---

## Key Takeaways

### Architecture Benefits

1. **Separation of Concerns**
   - MPU: Complex logic, networking, UI
   - MCU: Real-time control, precise timing

2. **Best of Both Worlds**
   - Linux flexibility (web server, APIs)
   - Bare-metal performance (LED control)

3. **Simple Communication**
   - Bridge abstracts complexity
   - Function calls feel natural
   - No low-level protocol knowledge needed

### When to Use This Pattern

This MPU-MCU architecture is ideal for:

- **IoT dashboards** - Web UI controlling sensors/actuators
- **Data logging** - MCU samples data, MPU stores to cloud
- **Remote monitoring** - MCU runs experiments, MPU sends alerts
- **Industrial control** - MCU handles safety-critical tasks, MPU provides HMI

### Further Exploration

Try extending this project:

- **Add more LEDs** - Control external RGB strips
- **PWM control** - Adjust LED brightness
- **Patterns** - Create complex light sequences
- **Voice control** - Integrate with speech recognition
- **MQTT** - Connect to smart home systems

---

## Conclusion

The Arduino Uno Q's dual-core architecture unlocks powerful possibilities. By combining the MPU's Linux capabilities with the MCU's real-time control, you can build sophisticated IoT applications with simple, elegant code.

The Bridge makes inter-core communication feel natural - just call functions! No need to worry about sockets, protocols, or synchronization.

This LED controller is just the beginning. What will you build next?

---

## Resources

- [Arduino Uno Q Documentation](https://docs.arduino.cc/hardware/uno-q/)
- [Arduino App Bricks Tutorial](https://docs.arduino.cc/software/app-lab/tutorials/bricks/)
- [Arduino CLI Documentation](https://arduino.github.io/arduino-cli/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Zephyr RTOS](https://www.zephyrproject.org/)

---

**Happy Making! 🚀**
