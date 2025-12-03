# Arduino LED Matrix Drawing Controller

**📖 [Read the full blog post: Interactive LED Matrix Drawing with Arduino Uno Q](./BLOG.md)**

This project provides an **interactive web-based drawing interface** for the Arduino Uno Q's built-in 13×8 LED matrix display. Click on squares in your browser to draw pixel art that appears instantly on the physical LED matrix!

This is a fully self-contained Docker environment for **building and flashing Zephyr-based sketches** to the **Arduino Uno Q (STM32U5)** board.

It includes:

- **arduino-cli**
- **Arduino Zephyr Core (`arduino:zephyr`)**
- **OpenOCD with Arduino-specific configuration** (`/opt/openocd`)
- A generic **build + flash script** (`start.sh`)
- **Python environment** with Arduino app utilities
- Support for flashing via **linuxgpiod SWD** (Uno R4 uses SWD pins internally)

This allows you to compile, flash sketches, and run Python applications **from any machine** without installing the Arduino IDE, Zephyr SDK, or OpenOCD locally.

---

## 🚀 Features

- **Interactive web-based drawing interface**
- **13×8 LED matrix** (104 individually controllable LEDs)
- **Click-to-toggle** - Click any square to light up the corresponding LED
- **Real-time synchronization** - Browser updates instantly reflect on physical hardware
- **Clear all** - One-click to reset the entire display
- **Coordinate tooltips** - Hover to see (x, y) position of each LED
- **Server-Sent Events** - Real-time status updates
- Dockerized environment with:
  - Automatic compilation with `arduino-cli`
  - Flashing to STM32U5 using OpenOCD
  - Flask web server with Python-Arduino bridge
- Isolated environment with reproducible builds
- Compatible with Uno Q Minima and Uno Q WiFi (same MCU)

---

## 📦 Requirements

- Docker
- Access to the board's GPIO chip devices (required for SWD)
- `/opt/openocd` directory on host (provided by Arduino Uno Q rootfs)
- Linux host (Windows/macOS not compatible with gpiod flashing)

---

## 🧱 Building the Docker Image

```sh
export FACTORY=<My-Factory-Name>
docker build -t hub.foundries.io/${FACTORY}/arduino-matrix-webui:latest .
```

---

## ▶️ Running the Container

### Using Docker Run

Run the container with the necessary GPIO devices and socket mount:

```sh
docker run -it --privileged \
    --device /dev/gpiochip0 \
    --device /dev/gpiochip1 \
    --device /dev/gpiochip2 \
    -v /var/run/arduino-router.sock:/var/run/arduino-router.sock \
    -p 8000:8000 \
    hub.foundries.io/${FACTORY}/arduino-matrix-webui:latest
```

### Using Docker Compose

Alternatively, use docker-compose for easier management:

```sh
docker compose up
```

**Note:** Docker Compose will automatically use `hub.foundries.io/${FACTORY}/arduino-matrix-webui:latest` as defined in `docker-compose.yml`.

The container will:

1. Compile the sketch in `/app/sketch`:

```sh
arduino-cli compile -b arduino:zephyr:unoq --output-dir /app/sketch /app/sketch
```

2. Flash it to the board:

```sh
/opt/openocd/bin/arduino-flash.sh sketch.ino.elf-zsk.bin
```

3. Run the Python application:

```sh
python /app/main.py
```

The web application will start on port 8000.

---

## 🌐 Using the Web Interface

1. **Access the interface**: Open your browser to **http://localhost:8000** (or `http://<device-IP>:8000` from another computer on the same network)

2. **Draw on the matrix**:
   - Click any square to toggle the corresponding LED
   - The LED on the physical board lights up instantly
   - Click again to turn it off

3. **Clear the display**: Click the "Clear All" button to reset all LEDs

4. **View coordinates**: Hover over any square to see its (x, y) position

**Try drawing:**
- A smiley face
- Your initials  
- Hearts and patterns
- Anything you can imagine in 13×8 resolution!

---

## 🎯 How It Works

The Arduino sketch (`sketch.ino`):
- Initializes the LED matrix hardware via `matrixBegin()`
- Maintains a 104-byte array representing all LED states
- Registers Bridge functions: `set_led`, `clear_matrix`, `get_matrix`
- Converts the byte array to packed binary format (4 × uint32_t)
- Calls `matrixWrite()` to update the physical matrix

The Python application (`main.py`):
- Runs a Flask web server on port 8000
- Maintains a 2D array (13×8) of LED states
- Handles HTTP requests from the web interface
- Calls Arduino Bridge functions to control the hardware
- Broadcasts status updates via Server-Sent Events (SSE)

The web interface (`index.html`):
- Displays a 13×8 clickable grid matching the physical matrix
- Sends POST requests to `/matrix/toggle` when squares are clicked
- Updates the UI with visual feedback (glowing effect for ON LEDs)
- Shows coordinate tooltips on hover
- Receives real-time status updates via SSE

**Communication flow:**
1. User clicks square (5, 3) in browser
2. JavaScript sends `POST /matrix/toggle` with `{x:5, y:3}`
3. Flask toggles `matrix_state[3][5]` and calls `Bridge.call("set_led", 5, 3, 1)`
4. MCU firmware updates `matrixState[44]` (3×13+5=44)
5. MCU calls `updateDisplay()` to convert to packed format
6. MCU calls `matrixWrite()` to light up the physical LED
7. Flask returns JSON success response
8. Browser updates UI with glowing LED effect

Total latency: < 30ms for complete round trip!

---

## 🛠 Troubleshooting

### OpenOCD cannot access GPIO
Make sure you passed the `--device /dev/gpiochip*` arguments.

### Permission denied on gpiochip
Run as root or adjust udev rules.

### Sketch fails to compile
Make sure your sketch contains:

- A valid Zephyr-based Arduino project
- Board set to `arduino:zephyr:unoq`