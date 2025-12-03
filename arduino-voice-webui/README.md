# Arduino Voice-Controlled Christmas Tree

**📖 [Read the full blog post: Building a Voice-Controlled Christmas Tree with Edge Impulse](./BLOG.md)**

This project demonstrates **voice-controlled Christmas tree visualization** on the Arduino Uno Q. Using Edge Impulse's audio classification model, the system recognizes voice commands and displays a corresponding colored Christmas tree on a web interface. Say "select" to open the control window, then speak a color name to light up the tree!

This is a fully self-contained Docker environment for running **Edge Impulse audio classification** on the **Arduino Uno Q (MPU)**.

It includes:

- **Edge Impulse Linux SDK** for real-time audio classification
- **Pre-trained audio model** (`deployment.eim`) for voice command recognition
- **Flask web server** with real-time updates via Server-Sent Events
- **Interactive Christmas tree interface** with color animations
- **Auto-reset timer** (10 seconds) for automatic state cleanup
- **Python environment** with audio processing libraries

This allows you to run voice recognition **directly on the Arduino Uno Q's Linux core (MPU)** without external cloud services or internet connectivity.

---

## 🚀 Features

- **Voice command recognition** using Edge Impulse
- Recognized commands:
  - **select** - Opens the control window
  - **blue** - Displays blue Christmas tree
  - **green** - Displays green Christmas tree
  - **purple** - Displays purple Christmas tree
  - **red** - Displays red Christmas tree
  - **yellow** - Displays yellow Christmas tree
- **Real-time web interface** with animated Christmas tree
- **Automatic state reset** after 10 seconds of inactivity
- **Server-Sent Events (SSE)** for live status updates
- **Edge Impulse integration** for on-device audio classification
- Dockerized environment with:
  - Flask web server on port 8000
  - Audio input via ALSA
  - Real-time classification at ~10Hz
  - Physical LED indicators on the board
- Isolated environment with reproducible builds
- No internet required for inference (model runs locally)

---

## 📦 Requirements

- Docker
- Arduino Uno Q with audio input capability
- Microphone connected to ALSA audio device
- Linux host (recommended for audio device access)
- **Edge Impulse Model**: You must provide your own `deployment.eim` file (see below)

---

## � Edge Impulse Model Setup

This project requires an Edge Impulse audio classification model. The model file is **not included** in this repository.

### Creating Your Own Model

1. **Create an Edge Impulse Account**: https://edgeimpulse.com/
2. **Create a New Project** for audio classification (Time series data, audio input, 16kHz)
3. **Collect Audio Samples**: Record samples for your voice commands (e.g., "blue", "green", "red", "yellow", "select")
4. **Configure Processing**: Use Audio MFE (MFCC features) with appropriate parameters
5. **Train Your Model**: Use Transfer Learning (Keyword Spotting) - see `deployment.eim.example` for detailed settings
6. **Download the Model**:
   - Go to "Deployment" tab
   - Select **"Linux AARCH64"** (ARM64 architecture)
   - Select "Unoptimized (float32)"
   - Download the `.eim` file
7. **Place the Model**: 
   - Rename it to `deployment.eim`
   - Place it in the `arduino-voice-webui/` directory

See `deployment.eim.example` for complete configuration details.

---

## �🧱 Building the Docker Image

**Important**: Place your `deployment.eim` file in this directory before building!

```sh
docker build -t arduino-voice-webui .
```

---

## ▶️ Running the Container

### Using Docker Run

Run the container with audio device access:

```sh
docker run -it --rm \
    --device /dev/snd \
    -p 8000:8000 \
    arduino-voice-webui
```

### Using Docker Compose

Alternatively, use docker-compose for easier management:

```sh
docker compose up
```

The container will:

1. Load the Edge Impulse model:

```sh
/opt/venv/bin/python3 /app/classify.py /app/deployment.eim
```

2. Start audio classification (continuous inference at ~10Hz)

3. Launch Flask web server on port 8000

4. Serve the Christmas tree interface at `http://<arduino-ip>:8000`

---

## 🎄 How It Works

### Voice Recognition Workflow

The system uses a **two-step process** for voice control:

1. **"Select" Command**: User says "select" to activate a 10-second listening window
2. **Color Command**: Within that window, user says a color name
3. **Tree Display**: The corresponding colored Christmas tree appears on screen
4. **LED Feedback**: Physical LEDs on the Arduino Uno Q light up in that color
5. **Auto-Reset**: After 10 seconds, the tree and LEDs return to the "off" state

This two-step approach prevents accidental color changes and ensures intentional control.

### Christmas Tree Interface

The web interface displays different Christmas tree images based on voice commands:

- **off.png** - Default state (dark tree)
- **blue.png** - Blue illuminated tree
- **green.png** - Green illuminated tree
- **purple.png** - Purple illuminated tree
- **red.png** - Red illuminated tree
- **yellow.png** - Yellow illuminated tree

Each color change includes a smooth animation with a glowing aura effect.

### Edge Impulse Audio Classification

The system uses Edge Impulse's `AudioImpulseRunner` to perform real-time audio classification:

- **Sampling Rate**: 16 kHz
- **Window Size**: ~1 second
- **Inference Frequency**: ~10 Hz (10 predictions per second)
- **Labels**: 6 voice commands (blue, green, purple, red, yellow, select)
- **Model Format**: `.eim` (Edge Impulse Model) compiled for Linux

**Two-Step Voice Control:**

1. **Say "select"** - Arms the system and opens a 10-second window
2. **Say a color** - Within that window, triggers the tree change
3. **Cooldown** - 5-second cooldown prevents repeated "select" detections
4. **Window expiry** - If no color is said within 10 seconds, the system resets

When a voice command is recognized with sufficient confidence (>80% by default), the system:
1. Broadcasts the classification result via Server-Sent Events
2. Updates the web interface to display the corresponding tree image
3. Lights up physical LEDs on the Arduino Uno Q board (blue, green, red)
   - **Yellow** = green + red LEDs
   - **Purple** = blue + red LEDs
4. Starts a 10-second timer to automatically reset to the "off" state

---

## 🌐 Web Interface

Access the interface by navigating to:

```
http://<arduino-ip>:8000
```

Replace `<arduino-ip>` with your Arduino Uno Q's IP address.

The interface includes:
- Real-time status display showing the last recognized command
- Animated Christmas tree that changes color based on voice input
- Glowing aura effect synchronized with tree state
- Audio wave animation when listening for color commands
- Automatic refresh via Server-Sent Events

**Usage:**
1. Say **"select"** - Activates listening mode (wave animation appears)
2. Say a **color name** (blue, green, purple, red, yellow)
3. Watch the tree and physical LEDs change color
4. Wait 10 seconds for automatic reset to dark tree

---

## 🎨 Customization

### Changing Detection Threshold

Edit `classify.py` or set environment variables:

```python
THRESH = 0.80  # Confidence threshold (0-1). Default: 0.80 (80%)
DEBOUNCE_SECONDS = 2.0  # Cooldown between detections (seconds)
SELECT_SUPPRESS_SECONDS = 10.0  # Window to say color after "select"
SELECT_COOLDOWN_SECONDS = 5.0  # Prevent rapid "select" re-triggers
```

Run with custom environment variables:

```sh
docker run -it --rm \
    --device /dev/snd \
    -p 8000:8000 \
    -e THRESH=0.75 \
    -e DEBOUNCE_SECONDS=1.5 \
    arduino-voice-webui
```

### Changing the Auto-Reset Timer

Edit `classify.py` and modify the `_HIGHLIGHT_SECONDS` constant:

```python
class WebStatus:
    _HIGHLIGHT_SECONDS = 10.0  # Change to desired timeout in seconds
```

### Using a Custom Edge Impulse Model

1. Train your model on [Edge Impulse](https://edgeimpulse.com/)
2. Download the `.eim` Linux model file
3. Replace `deployment.eim` in the container:

```sh
docker run -it --rm \
    --device /dev/snd \
    -p 8000:8000 \
    -v /path/to/your-model.eim:/app/deployment.eim \
    arduino-voice-webui
```

Or mount via the assets directory:

```sh
docker run -it --rm \
    --device /dev/snd \
    -p 8000:8000 \
    -v /path/to/models:/var/local/assets \
    -e MODEL_NAME=your-model.eim \
    arduino-voice-webui
```

### Adding New Colors

To add new voice commands and tree colors:

1. Train the model with additional labels in Edge Impulse
2. Add new tree images (e.g., `orange.png`, `pink.png`)
3. Update `classify.py`:
   ```python
   LABELS = {"blue", "green", "purple", "red", "yellow", "select", "orange", "pink"}
   COLOR = {"blue", "green", "purple", "red", "yellow", "orange", "pink"}
   ```
4. Add images to `Dockerfile` COPY command and allowed static files list
5. Rebuild the container

---

## 🔧 Troubleshooting

### No audio input detected

Check that your microphone is connected and recognized by ALSA:

```sh
arecord -l
```

You should see your audio device listed.

### Model not found error

Ensure the `.eim` file is in the correct location:

```sh
ls -lh /app/deployment.eim
```

The file should be executable (`chmod +x deployment.eim` is applied automatically).

### Web interface not loading

Verify the Flask server is running:

```sh
docker logs <container-id>
```

You should see:
```
 * Running on http://0.0.0.0:8000
```

### Classification not working

Check the Edge Impulse runner output for errors:

```sh
docker logs -f <container-id>
```

Look for inference results like:
```
Scores (98 ms): blue:0.02   green:0.01   purple:0.00   red:0.01   select:0.95   yellow:0.00
```

### Physical LEDs not working

The application controls three physical LEDs on the Arduino Uno Q:
- Blue LED: `/sys/class/leds/blue:user/brightness`
- Green LED: `/sys/class/leds/green:user/brightness`  
- Red LED: `/sys/class/leds/red:user/brightness`

If LEDs don't light up, check permissions:

```sh
ls -l /sys/class/leds/*/brightness
```

Set `DEBUG=1` environment variable to see LED control errors:

```sh
docker run -it --rm \
    --device /dev/snd \
    -p 8000:8000 \
    -e DEBUG=1 \
    arduino-voice-webui
```

---

## 📚 Learn More

- [Edge Impulse Documentation](https://docs.edgeimpulse.com/)
- [Arduino Uno Q User Manual](https://docs.arduino.cc/tutorials/uno-q/user-manual/)
- [Building a Web-Controlled LED System](../arduino-led-webui/BLOG.md) - Introduction to MPU-MCU architecture
- [Interactive LED Matrix Drawing](../arduino-matrix-webui/BLOG.md) - Web-based LED matrix control

---

## 🎥 Demo

Watch the voice-controlled Christmas tree in action:

**[Video Demonstration](https://photos.app.goo.gl/CMTWXqAB3K7QK5ZSA)**

---

## 📄 License

This project is provided as-is for educational purposes.

---

## 🤝 Credits

- **Edge Impulse** - Audio classification platform
- **Arduino** - Uno Q hardware
- **Flask** - Python web framework
- **Foundries.io** - Linux environment for Arduino Uno Q
