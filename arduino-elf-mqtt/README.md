# Arduino Elf Detector – Real-time Object Detection with Edge Impulse & MQTT

**📖 [Read the full blog post: Building an Object Detection System with YOLOv5 on Arduino Uno Q](./BLOG.md)**

This project demonstrates **real-time object detection** on the Arduino Uno Q using Edge Impulse's YOLOv5 model. The system captures live video from a USB camera, runs AI inference to detect elves, and sends MQTT alerts when detected. It displays bounding boxes with confidence scores on a web interface.

This is a fully self-contained Docker environment for running **Edge Impulse object detection** on the **Arduino Uno Q (MPU)** with **MQTT integration**.

It includes:

- **Edge Impulse Linux SDK** for real-time object detection
- **YOLOv5 model** (`model.eim`) for detecting custom objects
- **Flask web server** with live MJPEG video streaming
- **MQTT client** for publishing elf detection alerts
- **OpenCV** for camera capture and video processing
- **Real-time bounding boxes** for elf detections only
- **Python environment** with computer vision libraries

This allows you to run AI-powered object detection **directly on the Arduino Uno Q's Linux core (MPU)** without external cloud services or internet connectivity.

---

## 🚀 Features

- **Real-time elf detection** using Edge Impulse YOLOv5
- Detected objects:
  - **elf** - Detects Christmas elves (triggers MQTT alerts and displays red bounding boxes)
- **MQTT alerts** when elf is detected:
  - Publishes to `arduino/alert/red` topic with "start" message
  - Integrates with other Arduino services for coordinated responses
- **Live video streaming** with MJPEG format on port 8001
- **Red bounding boxes** drawn only around detected elves
- **Server-Sent Events (SSE)** for real-time status updates
- Dockerized environment with:
  - Flask web server on port 8001
  - MQTT client (paho-mqtt)
  - USB camera access via `/dev/video0`
  - YOLOv5 inference at ~17 FPS (~58ms per frame)
  - Automatic camera initialization
- Isolated environment with reproducible builds
- No internet required for inference (model runs locally)

---

## 📦 Requirements

- Docker
- Arduino Uno Q (or compatible Linux ARM64 device)
- USB camera connected to `/dev/video0`
- MQTT broker (Mosquitto) running on localhost:1883
- Access to GPIO chip devices (for board integration)
- Linux host (recommended)
- **Edge Impulse Model**: You must provide your own `model.eim` file (see below)

---

## 🔌 MQTT Integration

The elf detector publishes alerts to the following MQTT topics:

- **`arduino/alert/red`**: Sends "start" when elf is detected (with cooldown to prevent spam)
- **`arduino/elf/status`**: Sends "elf_detected" or "clear" status updates

### MQTT Configuration

Environment variables:
- `MQTT_HOST`: MQTT broker hostname (default: 127.0.0.1)
- `MQTT_PORT`: MQTT broker port (default: 1883)
- `MQTT_USER`: MQTT username (default: foundries.io)
- `MQTT_PASS`: MQTT password (default: foundries.io)

---

## 📡 Edge Impulse Model Setup

This project requires an Edge Impulse object detection model. The model file is **not included** in this repository.

### Creating Your Own Model

1. **Create an Edge Impulse Account**: https://edgeimpulse.com/
2. **Create a New Project** for object detection (Image data, 224x224)
3. **Collect Image Samples**: Upload or capture images with elves to detect
4. **Configure Processing**: Use Image block with RGB color depth
5. **Train Your Model**: Use YOLOv5 (Pico model) - see `model.eim.example` for detailed settings
6. **Download the Model**:
   - Go to "Deployment" tab
   - Select **"Linux AARCH64"** (ARM64 architecture)
   - Download the `.eim` file
7. **Place the Model**: 
   - Rename it to `model.eim`
   - Place it in the `arduino-elf-webui/` directory

See `model.eim.example` for complete YOLOv5 configuration details.

---

## �🧱 Building the Docker Image

**Important**: Place your `model.eim` file in this directory before building!

```sh
export FACTORY=<My-Factory-Name>
docker build -t hub.foundries.io/${FACTORY}/arduino-elf-webui:latest .
```

---

## ▶️ Running the Container

### Using Docker Run

Run the container with the necessary devices:

```sh
docker run -it --privileged \
    --device /dev/video0 \
    -p 8001:8001 \
    hub.foundries.io/${FACTORY}/arduino-elf-mqtt:latest
```

### Using Docker Compose

Alternatively, use docker-compose for easier management:

```sh
docker compose up
```

**Note:** Docker Compose will automatically use `hub.foundries.io/${FACTORY}/arduino-elf-webui:latest` as defined in `docker-compose.yml`.

The container will:

1. Load the Edge Impulse model:

```sh
/opt/venv/bin/python3 /app/main.py /app/model.eim
```

2. Initialize USB camera (`/dev/video0`)

3. Start object detection (continuous inference at ~17 FPS)

4. Launch Flask web server on port 8001

5. Serve the video stream interface at `http://<arduino-ip>:8001`

6. Connect to MQTT broker and subscribe to topics

---

## 🌐 Web Interface

Access the interface by navigating to:

```
http://<arduino-ip>:8001
```

Replace `<arduino-ip>` with your Arduino Uno Q's IP address.

The interface includes:
- **Live video stream** with real-time object detection
- **Bounding boxes** around detected objects
- **Confidence scores** displayed on each detection
- **Color-coded boxes** for easy confidence assessment
- **Status updates** via Server-Sent Events
- **FPS counter** showing inference performance

**Detection Visualization:**
- Green box = High confidence (80-100%)
- Blue box = Good confidence (60-80%)
- Yellow box = Medium confidence (40-60%)
- Orange box = Low confidence (20-40%)
- Pink box = Very low confidence (0-20%)

---

## 🎯 How It Works

### Object Detection Workflow

The system uses **YOLOv5** for real-time object detection:

1. **Camera Capture**: USB camera captures frames at 224x224 resolution
2. **Preprocessing**: Frames are converted to RGB and resized
3. **AI Inference**: YOLOv5 model detects objects (~58ms per frame)
4. **Bounding Boxes**: Results are drawn on the frame with confidence scores
5. **Video Streaming**: Processed frames are streamed via MJPEG to the browser
6. **Real-time Updates**: SSE provides status information to the web interface

### Edge Impulse YOLOv5 Object Detection

The system uses Edge Impulse's `ImageImpulseRunner` to perform real-time object detection:

- **Input Resolution**: 224×224 RGB
- **Model Architecture**: YOLOv5 Pico (682KB model size)
- **Inference Time**: ~58ms per frame (float32)
- **Frame Rate**: ~17 FPS
- **Classes**: Custom objects (primary: "elf")
- **Model Format**: `.eim` (Edge Impulse Model) compiled for Linux AARCH64

### Detection Process:

1. **Frame Capture** - Reads frame from USB camera
2. **Preprocessing** - Converts BGR→RGB, resizes to 224×224
3. **Inference** - YOLOv5 detects objects and returns bounding boxes
4. **Post-processing** - Filters detections by confidence threshold and class ("elf" only)
5. **MQTT Publishing** - Sends alert when elf is detected
6. **Visualization** - Draws red bounding boxes around detected elves
7. **Streaming** - Encodes frame as JPEG and streams to browser

When an object is detected with sufficient confidence (>20% by default), the system:
1. Draws a bounding box around the object
2. Labels it with class name and confidence percentage
3. Color-codes the box based on confidence level
4. Updates the web interface via MJPEG stream

---

## 🔧 Configuration

### Environment Variables

You can customize the behavior using environment variables:

- **`MODEL_NAME`**: Model filename (default: `model.eim`)
- **`ASSETS_DIR`**: Directory for external assets (default: `/var/local/assets`)
- **`CAMERA_DEVICE`**: Camera device path (default: `/dev/video0`)
- **`CONFIDENCE_THRESHOLD`**: Minimum confidence for detections (default: `0.2`)

Example:

```sh
docker run -it --privileged \
    --device /dev/video0 \
    -p 8001:8001 \
    -e CONFIDENCE_THRESHOLD=0.5 \
    -e MQTT_HOST=127.0.0.1 \
    arduino-elf-mqtt
```

### Model Override

To use a custom model from the assets directory:

```sh
# Place your model in /var/local/assets/my-model.eim on the host
docker run -it --privileged \
    --device /dev/video0 \
    -p 8001:8001 \
    -v /var/local/assets:/var/local/assets \
    -e MODEL_NAME=my-model.eim \
    arduino-elf-webui
```

The startup script checks:
1. `/var/local/assets/${MODEL_NAME}` (if mounted)
2. `/app/${MODEL_NAME}` (default location)

---

## 🐛 Troubleshooting

### No Camera Detected

If the camera is not found:

```sh
# Check if camera is connected
ls -l /dev/video*

# Test camera with v4l2
v4l2-ctl --list-devices
```

Make sure the container has access to `/dev/video0`.

### Low FPS / Slow Inference

- YOLOv5 Pico model runs at ~58ms per frame (~17 FPS)
- For faster inference, consider:
  - Using INT8 quantization in Edge Impulse deployment
  - Reducing input resolution (e.g., 160x160 instead of 224x224)
  - Using a smaller model architecture

### Model Not Loading

Ensure:
1. `model.eim` file is in the correct directory
2. Model is built for **Linux AARCH64** architecture
3. Model file has execute permissions (`chmod +x model.eim`)

---

## � Technical Details

### YOLOv5 Model Configuration

From `model.eim.example`, the recommended settings:

- **Image size**: 224×224 (fit shortest axis)
- **Model**: YOLOv5 Pico (smallest variant, 682KB)
- **Training**: 100 epochs, 0.001 learning rate, GPU
- **Augmentation**: Low spatial and color augmentation
- **INT8 profiling**: Enabled for potential optimization
- **Validation split**: 20%
- **Architecture**: No attention with ReLU
- **Batch size**: 16

### Performance Metrics

On Arduino Uno Q (ARM Cortex-A53):
- **Inference time**: ~58ms (float32)
- **Frame rate**: ~17 FPS
- **Model size**: 682KB (YOLOv5 Pico)
- **Memory usage**: ~300MB Docker container

### Camera Settings

- **Resolution**: 640×480 (resized to 224×224 for inference)
- **Format**: MJPEG streaming to browser
- **Device**: `/dev/video0` (USB camera)
- **Backend**: OpenCV VideoCapture with V4L2

---

## 🎓 Learning Resources

- [Edge Impulse Documentation](https://docs.edgeimpulse.com/)
- [YOLOv5 Object Detection Guide](https://docs.edgeimpulse.com/docs/tutorials/object-detection)
- [Arduino Uno Q Documentation](https://docs.arduino.cc/hardware/uno-r4-wifi/)
- [OpenCV Python Tutorials](https://docs.opencv.org/master/d6/d00/tutorial_py_root.html)

---

## 📄 License

This project is licensed under the BSD-3-Clause License. See the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 🔒 Security

For security concerns, see [SECURITY.md](SECURITY.md).

---

## � Acknowledgments

- **Edge Impulse** - For the amazing embedded ML platform
- **Arduino** - For the Uno Q hardware and app-bricks-py library
- **Ultralytics** - For the YOLOv5 architecture

---

## 📖 Related Projects

- [Arduino LED Web UI](../arduino-led-webui/) - Web-controlled LED system
- [Arduino Matrix Web UI](../arduino-matrix-webui/) - Interactive 8×8 LED matrix
- [Arduino Voice Web UI](../arduino-voice-webui/) - Voice-controlled Christmas tree
