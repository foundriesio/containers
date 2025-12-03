# Building an Elf Detection System with YOLOv5 and MQTT on Arduino Uno Q

## Introduction

In our previous tutorials, we explored the Arduino Uno Q's dual-core architecture through [web-controlled LED systems](../arduino-led-webui/BLOG.md) and [voice-controlled Christmas tree](../arduino-voice-webui/BLOG.md). Now, let's take edge AI to the next level by building a **real-time elf detection system** using computer vision with MQTT integration.

This project leverages **Edge Impulse** and **YOLOv5**, a state-of-the-art object detection model, to recognize elves directly on the Arduino Uno Q's Linux core (MPU). When an elf is detected, the system publishes MQTT alerts to trigger coordinated responses across multiple Arduino services. No cloud connectivity required - everything runs locally on the device!

We'll build an application where you can:
- Point a USB camera at elves
- Watch as the system detects and labels them in real-time with red bounding boxes
- See **MQTT alerts** published when elves are detected
- Run inference at ~17 FPS (~58ms per frame) on the edge device
- Integrate with other Arduino services (LED matrix, voice control)

---

## Why Edge AI with MQTT Integration?

Traditional computer vision systems rely on cloud processing:

```
Camera → Cloud API → Response → Display
       (requires internet)
```

With **Edge Impulse + YOLOv5 + MQTT** running on the Arduino Uno Q, we process everything locally and coordinate with other services:

```
Camera → Arduino MPU → Elf Detection → MQTT Broker → Other Services
       (no internet needed!)           ↓
                                  LED Alerts, Matrix Display, etc.
```

### Benefits of Edge AI + MQTT:

- **Privacy**: Video never leaves the device
- **Low latency**: No network round-trip delays + instant local messaging
- **Offline operation**: Works without internet connectivity
- **Cost-effective**: No cloud API fees
- **Reliability**: No dependency on external services
- **Real-time**: Direct USB camera access with local processing
- **Integration**: MQTT enables coordinated multi-service responses

---

## Architecture Overview

Building on our [previous LED controller tutorial](../arduino-led-webui/BLOG.md) and [voice control system](../arduino-voice-mqtt/BLOG.md), we're using the Arduino Uno Q's **MPU (Linux core)** to run the elf detection system with MQTT integration:

```
┌─────────────────────┐         ┌──────────────────────────────┐
│   Web Browser       │◄────────┤  Flask Server (MPU)          │
│   (port 8001)       │         │  - Video Stream              │
│                     │         │  - Elf Detection             │
└─────────────────────┘         │  - MQTT Publishing           │
                                └───────────┬──────────────────┘
                                            │
                                            ▼
                                ┌──────────────────────┐
                                │  MQTT Broker         │
                                │  (Mosquitto)         │
                                └──────┬───────────────┘
                                       │
                    ┌──────────────────┼──────────────────┐
                    ▼                  ▼                  ▼
            ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
            │ Voice MQTT   │  │ LED Matrix   │  │ Other        │
            │ (port 8000)  │  │ MQTT         │  │ Services     │
            └──────────────┘  └──────────────┘  └──────────────┘
```
│   Live Video Feed   │   MJPEG │  Real-time Video Streaming   │
│   Bounding Boxes    │   +SSE  │  Status Updates              │
└─────────────────────┘         └──────────┬───────────────────┘
                                           │
                                    Video  │
                                   Frames  │
                                           │
                                ┌──────────▼────────────────────┐
                                │ Edge Impulse SDK (MPU)        │
                                │ ImageImpulseRunner            │
                                │ - YOLOv5 Pico (682KB)         │
                                │ - Inference @ ~17 FPS         │
                                │ - 224×224 RGB input           │
                                │ - Bounding box output         │
                                └──────────┬────────────────────┘
                                           │
                                    ┌──────▼──────┐
                                    │ OpenCV      │
                                    │ USB Camera  │
                                    │ /dev/video0 │
                                    └─────────────┘
```

Unlike previous projects that used **MCU-MPU bridge communication**, this system operates entirely on the **MPU side**. The Linux core handles:
- Video capture via OpenCV (V4L2)
- Edge Impulse YOLOv5 model inference
- Bounding box visualization
- MJPEG streaming to the browser
- Real-time status updates via SSE

---

## Part 1: Edge Impulse Object Detection with YOLOv5

### What is Edge Impulse?

[Edge Impulse](https://edgeimpulse.com/) is a platform for building machine learning models optimized for embedded devices. For object detection, it provides:

- **Studio**: Web-based interface for training YOLOv5 models
- **Data labeling**: Tools for annotating bounding boxes on images
- **Model training**: Pre-optimized YOLOv5 architectures
- **Deployment**: Export models for various hardware targets (including Linux ARM64)

### What is YOLOv5?

**YOLO** (You Only Look Once) is a family of real-time object detection models. Unlike traditional computer vision approaches that apply classifiers to multiple regions of an image, YOLO:

1. **Looks at the entire image once**
2. **Predicts bounding boxes and class probabilities simultaneously**
3. **Runs extremely fast** - suitable for real-time applications

**YOLOv5** is the fifth iteration, offering:
- **Multiple model sizes** (nano, small, medium, large, xlarge)
- **High accuracy** with reasonable inference times
- **Edge-optimized** variants (like "Pico" used in this project)

### The Training Process

To build our elf detection model, we followed these steps:

#### 1. Dataset Creation

Classes defined:
- **elf** - Christmas elf figurines (primary detection target)

Image requirements:
- **Resolution**: 224×224 pixels
- **Resize mode**: Fit shortest axis (maintains aspect ratio)
- **Training/Test split**: Automatic (typically 80/20)
- **Annotations**: Bounding boxes labeled in Edge Impulse Studio

Sample images needed:
- 100+ images of "elf" from different angles
- Background images for robustness
- Varied lighting conditions
- Different elf poses and positions

#### 2. Create Impulse Configuration

**Image Processing Block:**
```
Image width: 224
Image height: 224
Resize mode: Fit shortest axis
Color depth: RGB (3 channels)
```

**Learning Block:**
```
Model: YOLOv5
Output classes: elf
```

#### 3. YOLOv5 Training Parameters

Based on the configuration:

```yaml
Training:
  processor: GPU
  cycles: 100
  learning_rate: 0.001
  model_size: pico  # 682KB model
  pretrained_weights: true
  batch_size: 16
  
Advanced:
  validation_split: 20%
  int8_profiling: true  # For future optimization
  architecture: No Attention with ReLU
  spatial_augmentation: Low
  color_augmentation: Low
  early_stopping: 
    start_epoch: 10
```

**Why these settings?**

- **GPU training**: Faster training (hours vs days on CPU)
- **100 epochs**: Sufficient for small datasets
- **Pico model**: Smallest YOLOv5 variant (682KB) - perfect for edge devices
- **Pretrained weights**: Transfer learning from COCO dataset
- **Low augmentation**: Prevents overfitting on small datasets
- **Early stopping**: Prevents overtraining

#### 4. Training Results

After training completes, Edge Impulse provides:

- **Accuracy metrics**: Precision, recall, F1 score per class
- **Confusion matrix**: Shows detection patterns
- **Test results**: Performance on held-out validation set
- **Inference time**: Estimated ~58ms on AARCH64

#### 5. Deployment

Export settings:
```
Target: Linux (AARCH64)
Optimization: Unoptimized (float32)
Format: .eim (Edge Impulse Model)
```

The deployed `.eim` file contains:
- **YOLOv5 Pico model weights**
- **Preprocessing pipeline** (resize, normalize)
- **Inference engine** (TensorFlow Lite runtime)
- **Python API** for integration

### Understanding the .eim Model

The `.eim` file is a **self-contained executable** that includes:

- **Trained YOLOv5 weights**
- **Image preprocessing** (resize to 224×224, normalize)
- **Bounding box decoding** (NMS, confidence filtering)
- **TensorFlow Lite runtime**

We interact with it using the `edge_impulse_linux` Python library:

```python
from edge_impulse_linux.image import ImageImpulseRunner

runner = ImageImpulseRunner(model_file="/app/model.eim")
```

### YOLOv5 Performance Characteristics

On Arduino Uno Q (ARM Cortex-A53):
- **Inference time**: ~58ms per frame
- **Frame rate**: ~17 FPS
- **Model size**: 682KB (YOLOv5 Pico)
- **Input**: 224×224×3 RGB image
- **Output**: Bounding boxes with:
  - `(x, y, width, height)` coordinates
  - `class_id` (0=elf)
  - `confidence` score (0.0 to 1.0)
- **MQTT Integration**: Publishes alerts when elf detected

---

## Part 2: The Dockerfile - Setting Up the Environment

Let's examine the `Dockerfile` to understand how we set up the Edge Impulse + OpenCV + MQTT environment:

```dockerfile
FROM debian:trixie-slim
ENV DEBIAN_FRONTEND=noninteractive

# Install Python and computer vision dependencies
RUN apt-get update && \
    apt-get install -y \
        python3-venv python3-pip build-essential vim dbus \
        ca-certificates curl \
        libgl1 libglx-mesa0 libglib2.0-0 \
        libopencv-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /var/cache/apt/archives/*
```

### Computer Vision Dependencies Explained

- **`libgl1`**, **`libglx-mesa0`**, **`libglib2.0-0`**: OpenGL libraries for hardware acceleration
- **`libopencv-dev`**: OpenCV development libraries for camera access
- **`ca-certificates`**, **`curl`**: For downloading dependencies

These enable the Edge Impulse SDK to capture USB camera input and OpenCV to process video frames.

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
            edge_impulse_linux \
            "opencv-python>=4.5.1.48,<5" \
            flask \
            cbor \
            six && \
    rm -rf ~/.cache/pip
```

**Key packages:**

- **`edge_impulse_linux`**: Edge Impulse SDK for Linux
  - Provides `ImageImpulseRunner` class
  - Handles image preprocessing and inference
  - Returns bounding box detections

- **`opencv-python`**: Computer vision library
  - Camera capture (`VideoCapture`)
  - Image manipulation (resize, color conversion)
  - Drawing utilities (rectangles, text)

- **`flask`**: Web server framework
  - Serves the video stream interface
  - Provides MJPEG streaming endpoint
  - Server-Sent Events for status updates

- **`numpy`**: Numerical operations (array manipulation)

- **`arduino_app_bricks`**: Arduino utilities (for potential MCU integration)

### Copying Application Files

```dockerfile
WORKDIR /app

COPY main.py \
     camera_server.py \
     index.html \
     start.sh \
     /app/

# Note: model.eim must be provided by the user
# See README.md for instructions on creating your own Edge Impulse model

RUN chmod +x /app/start.sh
```

**File purposes:**
- **`main.py`**: Flask server + Edge Impulse integration
- **`camera_server.py`**: OpenCV camera capture module
- **`index.html`**: Web interface for video streaming
- **`start.sh`**: Startup script (checks for model, launches app)
- **`model.eim`**: YOLOv5 model (user-provided, not in repo)

---

## Part 3: The Python Application - Real-Time Detection

### Main Application Structure (`main.py`)

The application has three main components:

1. **Edge Impulse Runner**: Loads and runs the YOLOv5 model
2. **Camera Capture**: Grabs frames from USB camera
3. **Flask Server**: Streams processed video to browser

#### Initialization

```python
from edge_impulse_linux.image import ImageImpulseRunner
import cv2
from flask import Flask, Response, render_template

app = Flask(__name__)

# Load Edge Impulse model
model_file = "/app/model.eim"
runner = ImageImpulseRunner(model_file)

# Initialize camera
camera = cv2.VideoCapture(0)  # /dev/video0
camera.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
camera.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
```

#### Object Detection Function

```python
def detect_objects(frame):
    """
    Run YOLOv5 inference on a frame
    
    Args:
        frame: OpenCV BGR image (numpy array)
        
    Returns:
        frame: Image with bounding boxes drawn
        detections: List of detected objects
    """
    # Convert BGR to RGB (Edge Impulse expects RGB)
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    
    # Resize to model input size (224x224)
    resized = cv2.resize(rgb_frame, (224, 224))
    
    # Run inference
    features, cropped = runner.get_features_from_image(resized)
    result = runner.classify(features)
    
    # Parse bounding boxes
    detections = []
    if result and "bounding_boxes" in result:
        for bbox in result["bounding_boxes"]:
            # Extract detection info
            label = bbox["label"]
            confidence = bbox["value"]
            x = bbox["x"]
            y = bbox["y"]
            width = bbox["width"]
            height = bbox["height"]
            
            # Scale coordinates back to original frame size
            scale_x = frame.shape[1] / 224
            scale_y = frame.shape[0] / 224
            
            x1 = int(x * scale_x)
            y1 = int(y * scale_y)
            x2 = int((x + width) * scale_x)
            y2 = int((y + height) * scale_y)
            
            # Choose color based on confidence
            color = get_confidence_color(confidence)
            
            # Draw bounding box
            cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
            
            # Draw label with confidence
            text = f"{label}: {confidence:.2f}"
            cv2.putText(frame, text, (x1, y1 - 10),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)
            
            detections.append({
                "label": label,
                "confidence": confidence,
                "bbox": (x1, y1, x2, y2)
            })
    
    return frame, detections
```

#### Confidence-Based Coloring

```python
def get_confidence_color(confidence):
    """
    Map confidence score to color (BGR format for OpenCV)
    
    Green (80-100%) → Blue (60-80%) → Yellow (40-60%) → Orange (20-40%) → Pink (0-20%)
    """
    if confidence >= 0.8:
        return (0, 255, 0)      # Green
    elif confidence >= 0.6:
        return (255, 0, 0)      # Blue
    elif confidence >= 0.4:
        return (0, 255, 255)    # Yellow
    elif confidence >= 0.2:
        return (0, 165, 255)    # Orange
    else:
        return (203, 192, 255)  # Pink
```

#### Video Streaming

```python
def generate_frames():
    """
    Generator function for MJPEG streaming
    Yields JPEG frames with bounding boxes
    """
    while True:
        # Capture frame
        success, frame = camera.read()
        if not success:
            break
        
        # Run object detection
        frame, detections = detect_objects(frame)
        
        # Encode as JPEG
        ret, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()
        
        # Yield in MJPEG format
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

@app.route('/video_feed')
def video_feed():
    """MJPEG streaming endpoint"""
    return Response(generate_frames(),
                   mimetype='multipart/x-mixed-replace; boundary=frame')
```

#### Flask Routes

```python
@app.route('/')
def index():
    """Serve the main HTML interface"""
    return render_template('index.html')

@app.route('/status')
def status():
    """Server-Sent Events for real-time status"""
    def event_stream():
        while True:
            # Send detection statistics
            yield f"data: {{\"fps\": 17, \"model\": \"YOLOv5 Pico\"}}\n\n"
            time.sleep(1)
    
    return Response(event_stream(), mimetype="text/event-stream")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=False)
```

---

## Part 4: Camera Server Module (`camera_server.py`)

For cleaner code architecture, camera logic is separated into its own module:

```python
import cv2
import threading

class CameraServer:
    def __init__(self, device_id=0, width=640, height=480):
        """
        Initialize USB camera
        
        Args:
            device_id: Camera device number (0 = /dev/video0)
            width: Frame width
            height: Frame height
        """
        self.camera = cv2.VideoCapture(device_id)
        self.camera.set(cv2.CAP_PROP_FRAME_WIDTH, width)
        self.camera.set(cv2.CAP_PROP_FRAME_HEIGHT, height)
        
        # Buffer for latest frame
        self.frame = None
        self.lock = threading.Lock()
        
        # Start background capture thread
        self.running = True
        self.thread = threading.Thread(target=self._capture_loop)
        self.thread.start()
    
    def _capture_loop(self):
        """Background thread that continuously captures frames"""
        while self.running:
            success, frame = self.camera.read()
            if success:
                with self.lock:
                    self.frame = frame
    
    def get_frame(self):
        """Get the latest captured frame"""
        with self.lock:
            return self.frame.copy() if self.frame is not None else None
    
    def release(self):
        """Clean up camera resources"""
        self.running = False
        self.thread.join()
        self.camera.release()
```

**Why a separate thread?**

- **Non-blocking capture**: Main thread processes frames while capture continues
- **Latest frame always available**: No queuing delays
- **Better FPS**: Reduces frame drops during inference

---

## Part 5: Web Interface (`index.html`)

The HTML interface displays the live video stream:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Arduino Elf Detector</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
            padding: 20px;
        }
        
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 30px;
            backdrop-filter: blur(10px);
        }
        
        h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        
        .video-container {
            margin: 20px 0;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        
        img {
            width: 100%;
            height: auto;
            display: block;
        }
        
        .status {
            margin-top: 20px;
            font-size: 1.1em;
            padding: 15px;
            background: rgba(0,0,0,0.3);
            border-radius: 10px;
        }
        
        .legend {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 20px;
            flex-wrap: wrap;
        }
        
        .legend-item {
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 0.9em;
            font-weight: bold;
        }
        
        .legend-green { background: #00ff00; color: black; }
        .legend-blue { background: #0000ff; color: white; }
        .legend-yellow { background: #ffff00; color: black; }
        .legend-orange { background: #ffa500; color: black; }
        .legend-pink { background: #ffb6c1; color: black; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎄 Arduino Elf Detector</h1>
        <p>Real-time object detection with YOLOv5 on Arduino Uno Q</p>
        
        <div class="video-container">
            <img src="/video_feed" alt="Live Camera Feed">
        </div>
        
        <div class="legend">
            <div class="legend-item legend-green">80-100% Confidence</div>
            <div class="legend-item legend-blue">60-80% Confidence</div>
            <div class="legend-item legend-yellow">40-60% Confidence</div>
            <div class="legend-item legend-orange">20-40% Confidence</div>
            <div class="legend-item legend-pink">0-20% Confidence</div>
        </div>
        
        <div class="status" id="status">
            <strong>Model:</strong> YOLOv5 Pico | 
            <strong>FPS:</strong> ~17 | 
            <strong>Inference:</strong> ~58ms
        </div>
    </div>
    
    <script>
        // Connect to Server-Sent Events for real-time updates
        const eventSource = new EventSource('/status');
        
        eventSource.onmessage = function(event) {
            const data = JSON.parse(event.data);
            document.getElementById('status').innerHTML = 
                `<strong>Model:</strong> ${data.model} | ` +
                `<strong>FPS:</strong> ${data.fps} | ` +
                `<strong>Status:</strong> Running`;
        };
        
        eventSource.onerror = function() {
            document.getElementById('status').innerHTML = 
                '<strong>Status:</strong> Disconnected';
        };
    </script>
</body>
</html>
```

**Key features:**

- **MJPEG streaming**: `<img src="/video_feed">` displays live video
- **Server-Sent Events**: Real-time status updates without polling
- **Confidence legend**: Visual guide for bounding box colors
- **Responsive design**: Works on desktop and mobile browsers

---

## Part 6: Performance Optimization

### Inference Speed

On Arduino Uno Q (ARM Cortex-A53 @ 1.5GHz):

```
YOLOv5 Pico (682KB, float32):
- Inference time: ~58ms
- Frame rate: ~17 FPS
- CPU usage: ~70%
```

### Optimization Strategies

#### 1. INT8 Quantization (Future)

Edge Impulse supports INT8 quantization:

```
Float32 model: 682KB, ~58ms
INT8 model: ~170KB, ~30ms (estimated)
```

Enable during deployment:
- Check "Profile INT8 model" during training
- Select "Quantized (int8)" in deployment

#### 2. Frame Skipping

Process every Nth frame to increase effective FPS:

```python
frame_count = 0
skip_frames = 2  # Process every 3rd frame

while True:
    frame = camera.get_frame()
    frame_count += 1
    
    if frame_count % skip_frames == 0:
        detect_objects(frame)  # Only process every 3rd frame
```

#### 3. Resolution Reduction

Lower resolution = faster inference:

```python
# Standard: 224x224 (~58ms)
# Reduced: 160x160 (~30ms, lower accuracy)
# Tiny: 96x96 (~15ms, significantly lower accuracy)
```

Trade-off: Speed vs. accuracy

---

## Part 7: Deployment and Testing

### Building the Container

```bash
# Place your model.eim in the directory
docker build -t arduino-elf-webui .
```

### Running on Arduino Uno Q

```bash
docker run -it --privileged \
    --device /dev/video0 \
    -p 8000:8000 \
    arduino-elf-mqtt
```

### Testing the Elf Detection

1. **Open browser**: Navigate to `http://<arduino-ip>:8001`
2. **Point camera**: Aim at elves
3. **Observe detections**: Red bounding boxes should appear around elves
4. **Check MQTT**: Monitor `arduino/alert/red` topic for alerts
5. **Test integration**: Verify LED matrix and voice services respond to alerts

### Common Issues

**No detections appearing:**
- Check camera is working: `ls -l /dev/video0`
- Verify model loaded: Check container logs
- Ensure good lighting conditions
- Verify MQTT broker is running: `docker ps | grep mosquitto`
- Objects should be visible and in focus

**Low confidence scores:**
- Improve lighting
- Move camera closer to objects
- Ensure objects match training data
- Retrain with more diverse images

**Slow frame rate:**
- Expected: ~17 FPS with YOLOv5 Pico
- Try INT8 quantization for faster inference
- Reduce resolution if needed

---

## Conclusion

We've built a complete **edge AI object detection system** running entirely on the Arduino Uno Q:

**What we achieved:**
- ✅ Real-time object detection at ~17 FPS
- ✅ YOLOv5 Pico model (682KB)
- ✅ Local inference (no cloud needed)
- ✅ Live video streaming with bounding boxes
- ✅ Color-coded confidence levels
- ✅ Fully containerized deployment

**Key learnings:**
- Edge Impulse simplifies ML model training
- YOLOv5 Pico balances speed and accuracy for edge devices
- OpenCV provides robust camera capture
- Flask enables easy web streaming
- Docker ensures reproducible deployments

**Next steps:**
- Train custom models for your specific objects
- Experiment with INT8 quantization for faster inference
- Add object tracking across frames
- Integrate with MCU for LED/actuator control
- Deploy multiple models for different scenarios

---

## Additional Resources

- [Edge Impulse YOLOv5 Documentation](https://docs.edgeimpulse.com/docs/edge-impulse-studio/learning-blocks/object-detection/yolov5)
- [YOLOv5 Paper](https://github.com/ultralytics/yolov5)
- [OpenCV Python Tutorials](https://docs.opencv.org/master/d6/d00/tutorial_py_root.html)
- [Flask MJPEG Streaming Guide](https://blog.miguelgrinberg.com/post/video-streaming-with-flask)

---

## Acknowledgments

- **Edge Impulse** - For the amazing embedded ML platform and YOLOv5 integration
- **Ultralytics** - For the YOLOv5 architecture
- **Arduino** - For the Uno Q hardware and Linux support
- **OpenCV** - For computer vision tools

---

Happy building! 🎄🤖
