# Building a Voice-Controlled Christmas Tree with Edge Impulse on Arduino Uno Q

## Introduction

In our previous tutorials, we explored the Arduino Uno Q's dual-core architecture through [web-controlled LED systems](../arduino-led-webui/BLOG.md) and [interactive LED matrix drawing](../arduino-matrix-webui/BLOG.md). Now, let's venture into the world of **edge AI** by building a **voice-controlled Christmas tree** using audio classification.

This project leverages **Edge Impulse**, a machine learning platform for embedded devices, to recognize voice commands directly on the Arduino Uno Q's Linux core (MPU). No cloud connectivity required - everything runs locally on the device!

We'll build a festive application where you can:
- Say **"select"** to activate the control window
- Speak a color name (**blue**, **green**, **purple**, **red**, **yellow**)
- Watch as a Christmas tree on your screen illuminates in that color
- Automatically reset to a dark tree after 10 seconds

## 🎥 Demo Video

Watch the voice-controlled Christmas tree in action:

[![Arduino Voice Christmas Tree Demo](https://img.shields.io/badge/▶️-Watch%20Demo-red?style=for-the-badge)](https://photos.app.goo.gl/CMTWXqAB3K7QK5ZSA)

**[Click here to see the video demonstration](https://photos.app.goo.gl/CMTWXqAB3K7QK5ZSA)**

The video demonstrates:
- Real-time voice command recognition
- Christmas tree changing colors based on spoken commands
- Smooth animations with glowing aura effects
- Automatic reset after 10 seconds
- Server-Sent Events updating the interface in real-time

---

## Why Edge AI for Voice Control?

Traditional voice assistants (Alexa, Google Assistant, Siri) rely on cloud processing:

```
Microphone → Cloud API → Response → Action
           (requires internet)
```

With **Edge Impulse** running on the Arduino Uno Q, we process everything locally:

```
Microphone → Arduino MPU → Audio Classification → Immediate Action
           (no internet needed!)
```

### Benefits of Edge AI:

- **Privacy**: Audio never leaves the device
- **Low latency**: No network round-trip delays
- **Offline operation**: Works without internet connectivity
- **Cost-effective**: No cloud API fees
- **Reliability**: No dependency on external services

---

## Architecture Overview

Building on our [previous LED controller tutorial](../arduino-led-webui/BLOG.md), we're using the Arduino Uno Q's **MPU (Linux core)** to run the voice recognition system:

```
┌─────────────────────┐         ┌──────────────────────────┐
│   Web Browser       │◄────────┤  Flask Server (MPU)      │
│   Christmas Tree UI │   SSE   │  Real-time Status Updates│
└─────────────────────┘         └──────────┬───────────────┘
                                           │
                                    Audio  │
                                    Stream │
                                           │
                                ┌──────────▼────────────────┐
                                │ Edge Impulse SDK (MPU)    │
                                │ AudioImpulseRunner        │
                                │ - Samples audio @ 16kHz   │
                                │ - Inference @ ~10Hz       │
                                │ - 6 voice labels          │
                                └──────────┬────────────────┘
                                           │
                                    ┌──────▼──────┐
                                    │ ALSA Audio  │
                                    │ Microphone  │
                                    └─────────────┘
```

Unlike previous projects that used **MCU-MPU bridge communication**, this system operates entirely on the **MPU side**. The Linux core handles:
- Audio capture via ALSA
- Edge Impulse model inference
- Web server with real-time updates
- Timer-based state management

---

## Part 1: Edge Impulse Audio Classification

### What is Edge Impulse?

[Edge Impulse](https://edgeimpulse.com/) is a platform for building machine learning models optimized for embedded devices. It provides:

- **Studio**: Web-based interface for training models
- **Data acquisition**: Tools for collecting audio samples
- **Neural network training**: Pre-built architectures for audio classification
- **Deployment**: Export models for various hardware targets (including Linux)

### The Training Process

To build our voice command model, we followed these steps:

1. **Data Collection**: Record audio samples for each command
   - 50+ samples of "select"
   - 50+ samples of "blue"
   - 50+ samples of "green"
   - 50+ samples of "purple"
   - 50+ samples of "red"
   - 50+ samples of "yellow"
   - Background noise samples for robustness

2. **Feature Extraction**: Edge Impulse converts audio to spectrograms
   - Uses **MFE (Mel-Frequency Energy)** features
   - Captures frequency patterns in human speech
   - Window size: 1 second
   - Sampling rate: 16 kHz

3. **Neural Network**: Train a classification model
   - Input: MFE features (time-frequency representation)
   - Hidden layers: 2D convolutional layers
   - Output: 6 classes (5 colors + select command)
   - Trained on Edge Impulse's cloud infrastructure

4. **Deployment**: Export the model as `.eim` (Edge Impulse Model)
   - Optimized for Linux ARM64 (Arduino Uno Q architecture)
   - Includes runtime libraries and inference engine
   - Single executable file: `deployment.eim`

### Understanding the .eim Model

The `.eim` file is a **self-contained executable** that includes:

- **Trained neural network weights**
- **Feature extraction pipeline** (audio → MFE features)
- **Inference engine** (TensorFlow Lite runtime)
- **Python API** for integration

We interact with it using the `edge_impulse_linux` Python library:

```python
from edge_impulse_linux.audio import AudioImpulseRunner

runner = AudioImpulseRunner(model_file="/app/deployment.eim")
```

---

## Part 2: The Dockerfile - Setting Up the Environment

Let's examine the `Dockerfile` to understand how we set up the Edge Impulse environment:

```dockerfile
FROM debian:trixie-slim
ENV DEBIAN_FRONTEND=noninteractive

# Install Python and audio dependencies
RUN apt-get update && \
    apt-get install -y \
        python3-venv python3-pip build-essential vim dbus \
        portaudio19-dev python3-pyaudio sox python3-dev \
        alsa-utils ca-certificates libgl1 libglx-mesa0 \
        libglib2.0-0 curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /var/cache/apt/archives/*
```

### Audio Dependencies Explained

- **`portaudio19-dev`**, **`python3-pyaudio`**: PortAudio libraries for cross-platform audio I/O
- **`alsa-utils`**: ALSA (Advanced Linux Sound Architecture) tools for audio device management
- **`sox`**: Sound processing utilities

These enable the Edge Impulse SDK to capture microphone input.

### OpenCV Dependency (Hidden Requirement)

```dockerfile
RUN apt-get install -y libgl1 libglx-mesa0 libglib2.0-0
```

Interestingly, the Edge Impulse SDK requires **OpenCV** even for audio-only models. This is because the SDK's internal preprocessing uses OpenCV for:
- Image manipulation in the Studio interface
- Video capture support (for camera-based models)
- General matrix operations

Even though we're only doing audio classification, we need `libglib2.0-0` to satisfy OpenCV's runtime dependencies.

### Python Dependencies

```dockerfile
ENV VENV=/opt/venv
RUN python3 -m venv $VENV
ENV PATH="$VENV/bin:$PATH"

RUN pip install --upgrade pip setuptools wheel && \
    pip install https://github.com/arduino/app-bricks-py/releases/download/release%2F0.5.0/arduino_app_bricks-0.5.0-py3-none-any.whl && \
    pip install --no-cache-dir \
            numpy \
            watchdog \
            pyalsaaudio \
            edge_impulse_linux \
            pyaudio \
            "opencv-python>=4.5.1.48,<5" \
            sounddevice \
            flask \
            six && \
    rm -rf ~/.cache/pip
```

**Key packages:**

- **`edge_impulse_linux`**: Edge Impulse SDK for Linux
  - Provides `AudioImpulseRunner` class
  - Handles audio buffering and inference
  - Returns classification results with confidence scores

- **`pyalsaaudio`**, **`sounddevice`**, **`pyaudio`**: Audio capture libraries
  - Multiple options for different use cases
  - Edge Impulse SDK uses `sounddevice` internally

- **`flask`**: Web server framework
  - Serves the Christmas tree interface
  - Provides Server-Sent Events endpoint for real-time updates

- **`opencv-python`**: Required by Edge Impulse SDK (even for audio-only models)

- **`arduino_app_bricks`**: Arduino utilities (for potential MCU integration)

### Copying Application Files

```dockerfile
WORKDIR /app

COPY deployment.eim \
     classify.py \
     index.html \
     off.png \
     blue.png \
     green.png \
     purple.png \
     red.png \
     yellow.png \
     start.sh \
     /app/

RUN chmod +x /app/deployment.eim /app/start.sh

CMD ["/app/start.sh"]
```

Notice the **Christmas tree images**:
- `off.png`: Default dark tree
- `blue.png`, `green.png`, `purple.png`, `red.png`, `yellow.png`: Illuminated trees

These are served as static assets by Flask.

The `start.sh` script launches both the Edge Impulse classification and Flask server in background.

---

## Part 3: The Python Application - classify.py

### Application Structure

```python
from edge_impulse_linux.audio import AudioImpulseRunner
from flask import Flask, Response, request, send_from_directory
import threading

app = Flask(__name__)

LABELS = {"blue", "green", "purple", "red", "yellow", "select"}
COLOR = {"blue", "green", "purple", "red", "yellow"}

# Detection thresholds and timing
THRESH = 0.80  # Confidence threshold (80%)
DEBOUNCE_SECONDS = 2.0  # Cooldown between detections
SELECT_SUPPRESS_SECONDS = 10.0  # Window to say color after "select"
SELECT_COOLDOWN_SECONDS = 5.0  # Prevent rapid "select" re-triggers
```

### Voice Command Labels

We define two sets:
- **`LABELS`**: All recognized commands (5 colors + select)
- **`COLOR`**: Only the color commands

**The SELECT workflow:**
1. User says **"select"** → Arms the system for 10 seconds
2. User says a **color** → Only accepted within that 10-second window
3. **Cooldown** → 5-second cooldown prevents accidental re-triggering of "select"

This two-step approach prevents accidental color changes from background noise.

### WebStatus Class: State Management

```python
# LED device mappings: physical LEDs on Arduino Uno Q
LED_SET_1 = {
    "blue": "/sys/class/leds/blue:user/brightness",
    "green": "/sys/class/leds/green:user/brightness",
    "red": "/sys/class/leds/red:user/brightness",
}

def set_leds(color: str):
    """Set physical device LEDs for given color.
    
    Supported: blue, green, red, yellow, purple.
    - yellow = green + red
    - purple = blue + red
    Any unknown/empty color turns all off.
    """
    mapping = {
        'blue': {'blue'},
        'green': {'green'},
        'red': {'red'},
        'yellow': {'green', 'red'},
        'purple': {'blue', 'red'},
    }
    wanted = mapping.get((color or '').lower(), set())
    for name in ("blue", "green", "red"):
        path = LED_SET_1.get(name)
        try:
            with open(path, 'w') as f:
                f.write('1' if name in wanted else '0')
        except Exception:
            pass  # Ignore LED errors

class WebStatus:
    _last_result = None
    _lock = threading.Lock()
    _current_color = None
    _clear_timer = None
    _HIGHLIGHT_SECONDS = 10.0  # Auto-reset after 10 seconds

    @classmethod
    def update_color(cls, color: str):
        with cls._lock:
            # Cancel existing timer if any
            if cls._clear_timer and cls._clear_timer.is_alive():
                cls._clear_timer.cancel()
            
            cls._current_color = color
            
            # Update physical LEDs
            set_leds(color)
            
            # Start new 10-second timer
            cls._clear_timer = threading.Timer(
                cls._HIGHLIGHT_SECONDS, 
                cls._clear_color_cb
            )
            cls._clear_timer.start()
    
    @classmethod
    def _clear_color_cb(cls):
        with cls._lock:
            cls._current_color = None
            set_leds("")  # Turn off physical LEDs
```

This class manages:
- **Thread-safe state** with `threading.Lock()`
- **Auto-reset timer** using `threading.Timer`
- **Current color** for the Christmas tree
- **Physical LED control** on the Arduino Uno Q board

### How the Timer Works

1. User says "select" → recognized by Edge Impulse
2. System arms for next color detection (10-second window)
3. User says "blue" → recognized by Edge Impulse
4. `update_color("blue")` called
5. Cancel any existing timer (if user said another color within 10s)
6. Set `_current_color = "blue"`
7. Call `set_leds("blue")` → physical LEDs light up
8. Start new `threading.Timer(10.0, _clear_color_cb)`
9. After 10 seconds: `_clear_color_cb()` sets `_current_color = None` and turns off LEDs
10. Web interface receives `None` via SSE → displays `off.png`

### Audio Classification Loop with SELECT Logic

```python
def main(model_path: str):
    with AudioImpulseRunner(model_path) as runner:
        model_info = runner.init()
        print(f"Model: {model_info['project']['name']}")
        print(f"Labels: {model_info['model_parameters']['labels']}")
        
        # Timing control
        last_send_ts = 0.0
        next_ready_ts = 0.0
        select_window_until = 0.0  # Window for next color after "select"
        select_block_until = 0.0   # Cooldown to block repeated "select"
        select_pending = False     # Flag armed by "select"
        
        for res, audio in runner.classifier(freq=16000):
            now = time.time()
            
            if "classification" in res["result"]:
                predictions = res["result"]["classification"]
                
                # Find highest confidence prediction
                top_label = None
                top_score = 0.0
                for label, score in predictions.items():
                    if score > top_score:
                        top_score = score
                        top_label = label
                
                # Threshold: only accept if confidence > THRESH (0.80)
                if top_score > THRESH and top_label in LABELS:
                    # Check if we're in debounce period
                    if (now - last_send_ts) < DEBOUNCE_SECONDS:
                        continue
                    
                    # 1) Detecting 'select' → arm flag and start window
                    if top_label == "select":
                        # If still under cooldown, ignore
                        if now < select_block_until:
                            print("select_cooldown")
                            last_send_ts = now
                            continue
                        
                        WebStatus.update_status("Select the Color:")
                        select_pending = True
                        select_window_until = now + SELECT_SUPPRESS_SECONDS
                        select_block_until = now + SELECT_COOLDOWN_SECONDS
                        print(f"SELECT ARMED (window until {select_window_until:.0f})")
                        continue
                    
                    # 2) It's a COLOR — only if select_pending and within window
                    if top_label in COLOR:
                        if select_pending and now <= select_window_until:
                            print(f"Result: {top_label} ({top_score:.2f})")
                            WebStatus.update_status("Say \"Select\" to start")
                            WebStatus.update_color(top_label)  # Also sets physical LEDs
                            
                            # Consume the armed flag and apply debounce
                            select_pending = False
                            last_send_ts = now
                            next_ready_ts = now + DEBOUNCE_SECONDS
                            continue
            
            # Check for select window expiry
            if select_pending and now > select_window_until:
                print("select_window_expired")
                WebStatus.update_status("Say \"Select\" to start")
                select_pending = False
                set_leds("")  # Turn off LEDs
```

### Inference Flow with Two-Step Detection

1. **`runner.classifier(freq=16000)`**: Generator that yields audio + classification results
   - Samples audio continuously at 16 kHz
   - Performs inference ~10 times per second
   - Returns predictions for all 6 labels

2. **Confidence Thresholding**: Only accept predictions > THRESH (80%)
   - Reduces false positives
   - Ensures clear voice commands

3. **SELECT Detection**: When "select" is recognized:
   - Set `select_pending = True` (arms the system)
   - Start 10-second window: `select_window_until = now + 10.0`
   - Start 5-second cooldown: `select_block_until = now + 5.0`
   - Broadcast "Select the Color:" status

4. **COLOR Detection**: When a color is recognized:
   - **Only process if** `select_pending == True` **AND** within window
   - Call `update_color(label)` to start the 10-second timer and set LEDs
   - Reset `select_pending = False`
   - Broadcast result via Server-Sent Events

5. **Window Expiry**: If 10 seconds pass without color detection:
   - Reset `select_pending = False`
   - Turn off LEDs
   - Return to idle state

### Flask Routes

```python
@app.route('/')
def home():
    with open("index.html", "r") as f:
        return Response(f.read(), mimetype='text/html')

@app.route('/<path:filename>')
def serve_static(filename):
    allowed = {
        'off.png', 'blue.png', 'green.png', 'purple.png', 'red.png', 'yellow.png',
        'favicon.ico'
    }
    if filename in allowed:
        return send_from_directory(BASE_DIR, filename)
    abort(404)

@app.route('/stream')
def stream():
    def eventStream():
        q = Queue()
        status_connections.add(q)
        # Send initial state
        q.put({"status": current_status, "color": current_color})
        
        while True:
            data = q.get()
            if data:
                yield f"data: {json.dumps(data)}\n\n"
    
    return Response(eventStream(), mimetype="text/event-stream")
```

### Server-Sent Events (SSE)

The `/stream` endpoint provides **real-time updates** to the web interface:

- **Browser connects** to `/stream`
- **Server streams** current color state and status
- **Format**: `data: {"status": "Say Select to start", "color": "blue"}\n\n`
- **JavaScript** receives events and updates the tree image + status text

This creates a **push-based** update mechanism - no polling required!

Note the endpoint is `/stream` (not `/events` as in some earlier examples).

---

## Part 4: The Christmas Tree Interface - index.html

### HTML Structure

```html
<div class="tree-wrap">
  <div id="aura" class="aura"></div>
  <div class="tree-container">
    <img id="treeImage" class="tree-image" src="off.png" alt="Christmas Tree" />
  </div>
</div>
```

Simple structure:
- **`aura`**: Glowing effect behind the tree
- **`treeImage`**: The Christmas tree itself

### CSS Animations

```css
.tree-image {
  transition: transform 0.3s ease, filter 0.3s ease;
}

.tree-image.active {
  transform: scale(1.05);
  filter: brightness(1.2) drop-shadow(0 0 30px currentColor);
}

.aura {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle, var(--aura-color) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.5s ease;
}

.aura.active {
  opacity: 0.6;
}
```

When a color is recognized:
- Tree scales up slightly (`transform: scale(1.05)`)
- Brightness increases
- Aura glows with the color
- Smooth transitions create a magical effect

### JavaScript: SSE Integration

```javascript
const eventSource = new EventSource('/stream');
const treeImage = document.getElementById('treeImage');
const aura = document.getElementById('aura');
const statusTextEl = document.getElementById('statusText');
const chipEl = document.getElementById('chip');
const micEl = document.getElementById('mic');

eventSource.onmessage = function(event) {
  const data = JSON.parse(event.data);
  
  // Update status text
  if (data.status) {
    statusTextEl.textContent = data.status;
    
    // Show/hide listening indicator
    const listening = data.status.toLowerCase().includes('select the color');
    chipEl.style.display = listening ? 'inline-flex' : 'none';
    micEl.classList.toggle('pulse', listening);
  }
  
  // Update tree color
  const color = data.color;
  if (color) {
    highlightColor(color);
  } else {
    clearTree();
  }
};

function highlightColor(color) {
  // Update tree image
  treeImage.src = `${color}.png`;
  treeImage.classList.add('active');
  
  // Update aura color
  const colorMap = {
    'blue': '#1e90ff',
    'green': '#2dd4bf',
    'purple': '#9b7bff',
    'red': '#ff5c6c',
    'yellow': '#ffd166'
  };
  const c = colorMap[color] || '#7cc7ff';
  aura.style.background = `radial-gradient(520px 280px at 50% 40%, ${c}33 0%, transparent 55%)`;
  aura.style.opacity = '.35';
}

function clearTree() {
  treeImage.src = 'off.png';
  treeImage.classList.remove('active');
  aura.style.opacity = '.22';
}
```

### Real-Time Update Flow

1. **SSE connection** established to `/stream`
2. **Server sends** `{"status": "Select the Color:", "color": "blue"}` when voice command recognized
3. **JavaScript** updates status text to "Select the Color:"
4. **JavaScript** shows wave animation (listening indicator)
5. **JavaScript** calls `highlightColor("blue")`
6. **Tree image** changes to `blue.png` with animation
7. **Aura** glows blue
8. **Physical LEDs** on the board light up blue
9. **After 10 seconds**, server sends `{"status": "Say Select to start", "color": ""}`
10. **JavaScript** calls `clearTree()`
11. **Tree returns** to `off.png` with fade-out animation
12. **Physical LEDs** turn off

---

## Part 5: Use Cases and Extensions

### Smart Home Integration

Extend the system to control real smart home devices:

```python
def update_color(cls, color: str):
    # ... existing timer logic ...
    
    # Control Philips Hue lights
    if color == "blue":
        hue_api.set_light(1, color=(0, 0, 255))
    elif color == "red":
        hue_api.set_light(1, color=(255, 0, 0))
```

### Multi-Room Voice Control

Deploy multiple Arduino Uno Q boards:
- Living room: "select blue" → blue ambient lighting
- Bedroom: "select red" → warm red night light
- Kitchen: "select green" → green task lighting

### Accessibility Applications

Voice commands can help users with limited mobility:
- "select blue" → turn on air conditioner
- "select red" → turn on heating
- "select yellow" → call for assistance

### Educational Demonstrations

This project is excellent for teaching:
- **Edge AI concepts**: On-device machine learning
- **Real-time systems**: Audio processing at 16 kHz
- **Web technologies**: Server-Sent Events, Flask
- **State machines**: Timer-based auto-reset logic

### Extending the Model

Add new voice commands:
- **Numbers**: "one", "two", "three" for scene selection
- **Actions**: "on", "off", "dim", "bright"
- **Phrases**: "good morning", "goodnight"

Train a new Edge Impulse model with these labels and update the Python code accordingly.

---

## Part 6: Performance Considerations

### Inference Speed

The Edge Impulse SDK achieves **~10 inferences per second** on the Arduino Uno Q:

- **Audio window**: 1 second
- **Inference time**: ~50-100ms
- **Overhead**: Audio buffering, feature extraction

This is fast enough for real-time voice control!

**Two-Step Workflow Latency:**
1. Say "select" → Detection (~100ms) + Window opens
2. Say "blue" → Detection (~100ms) + LED update (~10ms) + UI update (~20ms)
3. **Total**: ~230ms from voice to visual feedback

The SELECT-then-COLOR approach adds ~100ms but significantly reduces false positives from background noise.

### Memory Usage

The `.eim` model file size:
- Neural network weights: ~20-30MB
- TensorFlow Lite runtime: ~15MB
- Feature extraction pipeline: ~5MB
- **Total deployment.eim**: ~50MB

Additional runtime memory:
- Edge Impulse SDK: ~20MB
- Flask server: ~30MB
- Audio buffers: ~5MB
- **Total container memory**: ~200-250MB

Ensure sufficient storage on the Arduino Uno Q.

### Audio Latency

Total latency from speech to tree update (including physical LED):

```
Speech → Audio capture (50ms)
      → Feature extraction (20ms)
      → Neural network inference (100ms)
      → Python processing + LED control (20ms)
      → SSE broadcast (10ms)
      → Browser update (20ms)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total: ~220ms (sub-second response!)
```

**SELECT workflow adds:**
- First detection: ~220ms (SELECT command)
- Window opens: 10-second listening period
- Second detection: ~220ms (COLOR command)
- **Total interaction time**: ~440ms + user speaking time

### Timer Precision

The SELECT workflow uses `threading.Timer` for time windows:

```python
# 10-second listening window after SELECT
threading.Timer(SELECT_SUPPRESS_SECONDS, self._clear_color_cb)

# 5-second cooldown after color expires
threading.Timer(SELECT_COOLDOWN_SECONDS, self._select_cooldown_cb)
```

This is **not real-time precise** - expect variations of ±50-100ms. For voice control, this is perfectly acceptable since human reaction time is ~200ms.

---

## Comparing with Previous Projects

| Feature | LED Controller | LED Matrix | Voice Christmas Tree |
|---------|---------------|------------|---------------------|
| **Input Method** | Web buttons | Web canvas (click to draw) | Voice commands (SELECT + COLOR) |
| **Output** | 6 RGB LEDs | 13×8 LED matrix | Web UI + Physical LEDs (3) |
| **Processing** | MPU + MCU (Bridge) | MPU + MCU (Bridge) | MPU only (Edge AI) |
| **Real-time Updates** | SSE | SSE | SSE |
| **Complexity** | Low | Medium | High (ML model + two-step workflow) |
| **Use Case** | Basic LED toggle | Pixel art display | Voice-controlled UI with intentional commands |

The voice-controlled Christmas tree builds on concepts from previous projects (SSE, Flask, Docker) while introducing **edge machine learning** and **two-step voice workflows** as new dimensions.

---

## Physical LED Feedback

Unlike the previous projects that controlled external LEDs, this demo uses the **three built-in LEDs on the Arduino Uno Q board** for status feedback:

- **Blue LED** (`/sys/class/leds/blue:user/brightness`)
- **Green LED** (`/sys/class/leds/green:user/brightness`)
- **Red LED** (`/sys/class/leds/red:user/brightness`)

### LED Color Mapping

Colors are created by combining LEDs:

```python
LED_SET_1 = {
    "blue":   {"blue": True,  "green": False, "red": False},
    "green":  {"blue": False, "green": True,  "red": False},
    "purple": {"blue": True,  "green": False, "red": True},
    "red":    {"blue": False, "green": False, "red": True},
    "yellow": {"blue": False, "green": True,  "red": True},
    "off":    {"blue": False, "green": False, "red": False}
}
```

**Color combinations:**
- **Purple** = Blue + Red
- **Yellow** = Green + Red

This provides visual feedback directly on the board, independent of the web interface.

### Debugging LEDs

Enable detailed LED debugging:

```bash
docker run -e DEBUG=1 ...
```

This shows LED state changes in the logs:

```
[DEBUG] Setting LEDs: blue=1 green=0 red=0
[DEBUG] /sys/class/leds/blue:user/brightness = 1
[DEBUG] /sys/class/leds/green:user/brightness = 0
[DEBUG] /sys/class/leds/red:user/brightness = 0
```

---

## Conclusion

In this tutorial, we've built a complete **voice-controlled Christmas tree** system using:

- **Edge Impulse** for audio classification
- **Arduino Uno Q's MPU** for inference and web serving
- **Flask** with Server-Sent Events for real-time updates
- **Threading timers** for automatic state reset
- **CSS animations** for smooth visual transitions

This project demonstrates the power of **edge AI** - running machine learning models directly on embedded devices without cloud dependencies. The same principles can be applied to:

- Smart home automation
- Industrial voice control systems
- Accessibility tools
- Educational demonstrations

The Arduino Uno Q's Linux core (MPU) provides the perfect platform for these applications, offering the flexibility of high-level languages (Python) combined with the compactness of embedded hardware.

### What's Next?

Explore further:
- Train custom Edge Impulse models with your own voice
- Add more colors and commands
- Integrate with smart home APIs (Hue, MQTT, Home Assistant)
- Build gesture recognition using accelerometer data
- Create multi-modal interfaces (voice + touch + motion)

The possibilities are endless!

---

## 📚 Resources

- [Edge Impulse Documentation](https://docs.edgeimpulse.com/)
- [Building a Web-Controlled LED System](../arduino-led-webui/BLOG.md)
- [Interactive LED Matrix Drawing](../arduino-matrix-webui/BLOG.md)
- [Arduino Uno Q User Manual](https://docs.arduino.cc/tutorials/uno-q/user-manual/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Server-Sent Events Specification](https://html.spec.whatwg.org/multipage/server-sent-events.html)

---

Happy voice hacking! 🎄🎤✨
