# Arduino LED Toggle – Simple LED Control Demo

**📖 [Read the full blog post: Building a Web-Controlled LED System with Arduino Uno Q](./BLOG.md)**

This project demonstrates **basic LED control on the Arduino Uno Q**. It's a minimal example showing how to toggle the built-in LED on and off using Python-Arduino bridge communication.

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

- **Simple LED toggle control**
- Press any key to toggle the built-in LED (LED3_R)
- Minimal code - perfect for learning the basics
- Python-Arduino bridge communication
- Dockerized environment with:
  - Automatic compilation with `arduino-cli`
  - Flashing to STM32U5 using OpenOCD
  - Interactive Python interface
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
docker build -t hub.foundries.io/${FACTORY}/arduino-led-webui:latest .
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
    hub.foundries.io/${FACTORY}/arduino-led-webui:latest
```

### Using Docker Compose

Alternatively, use docker-compose for easier management:

```sh
docker compose up
```

**Note:** Docker Compose will automatically use `hub.foundries.io/${FACTORY}/arduino-led-webui:latest` as defined in `docker-compose.yml`.

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

The Python app provides a simple interface where you can press any key + ENTER to toggle the LED on/off.

---

## � How It Works

### Arduino Sketch (`sketch.ino`)
The Arduino sketch is extremely simple:
- Initializes the built-in LED pins (LED3_R, LED3_G, LED3_B)
- Turns off all LEDs initially
- Registers a `toggle_led` function with the Arduino Bridge
- When called, toggles the LED state between ON and OFF
- Uses LED3_R (red LED) for the toggle

**Note:** The Arduino Uno Q's built-in LEDs are **active LOW**, meaning:
- `LOW` = LED ON
- `HIGH` = LED OFF

### Python Application (`main.py`)
The Python application:
- Provides a simple interactive interface
- Waits for user input (any key + ENTER)
- Calls the `toggle_led` function via the Arduino Bridge
- Tracks and displays the current LED state (ON/OFF)
- Press 'q' + ENTER to quit

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
