#!/usr/bin/env python3
#
# Copyright (c) 2025 Foundries.io
#
# SPDX-License-Identifier: BSD-3-Clause
#

"""
Edge Impulse Elf Detection MQTT
Real-time elf detection using Edge Impulse on Arduino Uno Q
Sends MQTT alert when elf is detected
"""

import sys
import threading
import time
import os
import io
import base64
import argparse
from queue import Queue
from weakref import WeakSet
from flask import Flask, Response, send_file, jsonify, request
from PIL import Image, ImageDraw, ImageFont
import numpy as np
import paho.mqtt.client as mqtt

# Import Edge Impulse runner
try:
    from edge_impulse_linux.image import ImageImpulseRunner
    EDGE_IMPULSE_AVAILABLE = True
except ImportError:
    EDGE_IMPULSE_AVAILABLE = False
    print("[WARNING] Edge Impulse SDK not installed")

# Import camera support
try:
    import cv2
    CAMERA_AVAILABLE = True
except ImportError:
    CAMERA_AVAILABLE = False
    print("[WARNING] OpenCV not installed - camera mode disabled")

# MQTT Configuration
MQTT_HOST = os.getenv("MQTT_HOST", "127.0.0.1")
MQTT_PORT = int(os.getenv("MQTT_PORT", "1883"))
MQTT_USER = os.getenv("MQTT_USER", "foundries.io")
MQTT_PASS = os.getenv("MQTT_PASS", "foundries.io")

# MQTT Topics
TOPIC_ALERT_RED = "arduino/alert/red"
TOPIC_ELF_STATUS = "arduino/elf/status"

# Global MQTT client
mqtt_client = None

# Elf detection state
elf_detected = False
last_elf_time = 0
ELF_COOLDOWN = 2.0  # Cooldown between alerts in seconds

def mqtt_publish(topic, message):
    """Publish MQTT message"""
    global mqtt_client
    if mqtt_client:
        try:
            mqtt_client.publish(topic, message, qos=1)
            print(f"[MQTT] {topic} -> {message}")
        except Exception as e:
            print(f"[MQTT ERROR] {e}")

def on_mqtt_connect(client, userdata, flags, rc):
    """MQTT connection callback"""
    if rc == 0:
        print(f"[MQTT] Connected to {MQTT_HOST}:{MQTT_PORT}")
    else:
        print(f"[MQTT] Connection failed with code {rc}")

def on_mqtt_disconnect(client, userdata, rc):
    """MQTT disconnect callback"""
    if rc != 0:
        print(f"[MQTT] Unexpected disconnection. Reconnecting...")

# Flask app
app = Flask(__name__)

# Status management for Server-Sent Events
status_connections = WeakSet()
current_status = "Ready"
detection_count = 0
last_detection_time = 0
elf_count = 0  # Count of elf detections

class WebStatus:
    _lock = threading.Lock()

    @classmethod
    def _broadcast(cls):
        """Broadcast current status to all connected clients"""
        global detection_count, last_detection_time, elf_count
        for q in status_connections:
            try:
                q.put({
                    "status": current_status,
                    "detections": detection_count,
                    "elfs": elf_count,
                    "fps": f"{1000 / (time.time() * 1000 - last_detection_time):.1f}" if last_detection_time > 0 else "0"
                })
            except:
                pass

    @classmethod
    def update_status(cls, status: str, count: int = 0):
        """Update status and broadcast to all clients"""
        global current_status, detection_count, last_detection_time
        with cls._lock:
            current_status = status
            detection_count = count
            last_detection_time = time.time() * 1000
            cls._broadcast()

# Edge Impulse model
edge_impulse_runner = None
model_lock = threading.Lock()
MODEL_PATH = None

# Camera state
camera = None
camera_lock = threading.Lock()
camera_running = False

# Color mapping based on confidence
CONFIDENCE_MAP = {
    (0, 20): "#FF0976",    # Pink
    (21, 40): "#FF8131",   # Orange
    (41, 60): "#FFFC00",   # Yellow
    (61, 80): "#00DED7",   # Light blue
    (81, 100): "#1EFF00",  # Green
}

def get_box_color(confidence):
    """Get color based on confidence value."""
    for (low, high), color in CONFIDENCE_MAP.items():
        if low <= confidence <= high:
            return color
    return "#1EFF00"

def load_model(model_path):
    """Load Edge Impulse model from specified path."""
    global edge_impulse_runner
    
    if not EDGE_IMPULSE_AVAILABLE:
        print("[ERROR] Edge Impulse SDK not available")
        return False
    
    if not os.path.exists(model_path):
        print(f"[ERROR] Model file not found: {model_path}")
        return False
    
    try:
        print(f"[MODEL] Loading Edge Impulse model: {model_path}")
        edge_impulse_runner = ImageImpulseRunner(model_path)
        
        # Initialize the runner
        model_info = edge_impulse_runner.init()
        
        print(f"[OK] Model loaded successfully!")
        print(f"   Model: {model_info.get('project', {}).get('name', 'Unknown')}")
        print(f"   Labels: {model_info.get('model_parameters', {}).get('labels', [])}")
        return True
    except Exception as e:
        print(f"[ERROR] Failed to load Edge Impulse model: {e}")
        edge_impulse_runner = None
        return False

def draw_bounding_boxes(image, detections):
    """Draw bounding boxes on image using PIL - ONLY for 'elf' class."""
    if not detections or "detection" not in detections:
        return image
    
    draw = ImageDraw.Draw(image)
    detection_list = detections["detection"]
    box_thickness = 3
    
    for obj_det in detection_list:
        if "class_name" not in obj_det or "bounding_box_xyxy" not in obj_det or "confidence" not in obj_det:
            continue
        
        class_name = obj_det["class_name"]
        
        # ONLY draw bounding box for "elf" class - skip all others
        if class_name.lower() != 'elf':
            continue
        
        box = obj_det["bounding_box_xyxy"]
        confidence = float(obj_det["confidence"])
        
        x1, y1, x2, y2 = map(int, box)
        box_color = get_box_color(confidence)
        
        # Draw bounding box
        draw.rectangle((x1, y1, x2, y2), outline=box_color, width=box_thickness)
        
        # Draw label
        text = f"{class_name} {confidence:.0f}%"
        draw.text((x1 + 5, y1 - 15 if y1 > 20 else y1 + 5), text, fill=box_color)
    
    return image

def run_object_detection(image, confidence_threshold=0.1):
    """Run object detection on image using Edge Impulse model."""
    global edge_impulse_runner
    
    if not edge_impulse_runner:
        print("[WARNING] No Edge Impulse model loaded")
        return {"detection": []}
    
    with model_lock:
        try:
            # Convert PIL Image to numpy array
            img_array = np.array(image)
            
            print(f"[DETECT] Image size: {image.size}, Array shape: {img_array.shape}")
            
            # Get features from image
            features, cropped = edge_impulse_runner.get_features_from_image_auto_studio_settings(img_array)
            
            # Convert features to numpy array if it's a list
            if isinstance(features, list):
                features = np.array(features)
            
            # Convert cropped to numpy array if it's a list
            if isinstance(cropped, list):
                cropped = np.array(cropped)
            
            print(f"[DETECT] Features type: {type(features)}, Cropped type: {type(cropped)}")
            
            # Run inference
            res = edge_impulse_runner.classify(features)
            
            print(f"[DETECT] Raw result keys: {res.keys() if isinstance(res, dict) else 'not a dict'}")
            
            # Extract bounding boxes
            detections = []
            
            if 'result' in res and 'bounding_boxes' in res['result']:
                bbox_list = res['result']['bounding_boxes']
                orig_width, orig_height = image.size
                
                print(f"[DETECT] Found {len(bbox_list)} bounding boxes")
                
                for bbox in bbox_list:
                    confidence = bbox.get('value', 0)
                    
                    print(f"[DETECT] Box: {bbox.get('label')} confidence={confidence:.2f}, threshold={confidence_threshold}")
                    
                    if confidence < confidence_threshold:
                        print(f"[DETECT] Skipping (below threshold)")
                        continue
                    
                    # Scale coordinates - handle if cropped is still a list
                    if isinstance(cropped, np.ndarray):
                        if len(cropped.shape) >= 2:
                            cropped_height, cropped_width = cropped.shape[:2]
                        else:
                            # Fallback to original dimensions
                            cropped_height, cropped_width = orig_height, orig_width
                    else:
                        # If cropped is not an array, use original dimensions
                        cropped_height, cropped_width = orig_height, orig_width
                    
                    x = int(bbox.get('x', 0) * orig_width / cropped_width)
                    y = int(bbox.get('y', 0) * orig_height / cropped_height)
                    width = int(bbox.get('width', 0) * orig_width / cropped_width)
                    height = int(bbox.get('height', 0) * orig_height / cropped_height)
                    
                    detections.append({
                        "class_name": bbox.get('label', 'unknown'),
                        "confidence": confidence * 100,
                        "bounding_box_xyxy": [x, y, x + width, y + height]
                    })
                
                # Check for elf detections and send MQTT alert
                elf_found = False
                for detection in detections:
                    if detection['class_name'].lower() == 'elf':
                        elf_found = True
                        break
                
                if elf_found:
                    global elf_detected, last_elf_time, elf_count
                    current_time = time.time()
                    
                    # Only send alert if cooldown period has passed
                    if not elf_detected or (current_time - last_elf_time) > ELF_COOLDOWN:
                        print(f"[ELF ALERT] Elf detected! Sending MQTT alarm...")
                        mqtt_publish(TOPIC_ALERT_RED, "start")
                        mqtt_publish(TOPIC_ELF_STATUS, "elf_detected")
                        elf_detected = True
                        last_elf_time = current_time
                        elf_count += 1
                else:
                    # No elf detected - just update internal state (no MQTT stop)
                    if elf_detected:
                        print(f"[ELF ALERT] Elf no longer detected (no alarm sent)")
                        elf_detected = False
                
                if detections:
                    print(f"[DETECT] {len(detections)} object(s): {', '.join([f'{d['class_name']} {d['confidence']:.0f}%' for d in detections])}")
            
            return {"detection": detections}
            
        except Exception as e:
            print(f"[ERROR] Detection error: {e}")
            return {"detection": []}

# Routes
@app.route('/')
def index():
    """Serve the main HTML page"""
    return send_file('index.html')

@app.route('/status')
def status_stream():
    """Server-Sent Events endpoint for real-time status updates"""
    def event_stream():
        q = Queue()
        status_connections.add(q)
        try:
            # Send initial status
            yield f"data: {{\"status\": \"{current_status}\", \"detections\": {detection_count}, \"fps\": \"0\"}}\n\n"
            
            # Stream updates
            while True:
                data = q.get()
                yield f"data: {{\"status\": \"{data.get('status', '')}\", \"detections\": {data.get('detections', 0)}, \"fps\": \"{data.get('fps', '0')}\"}}\n\n"
        except GeneratorExit:
            status_connections.discard(q)
    
    return Response(event_stream(), mimetype='text/event-stream')

@app.route('/detect', methods=['POST'])
def detect():
    """Handle image upload and detection"""
    try:
        data = request.get_json()
        
        if not data or 'image' not in data:
            return jsonify({'success': False, 'error': 'No image data provided'}), 400
        
        # Decode base64 image
        image_data = data['image']
        confidence = data.get('confidence', 0.5)
        
        image_bytes = base64.b64decode(image_data)
        pil_image = Image.open(io.BytesIO(image_bytes))
        
        # Run detection
        start_time = time.time() * 1000
        results = run_object_detection(pil_image, confidence)
        processing_time = time.time() * 1000 - start_time
        
        # Draw bounding boxes
        img_with_boxes = draw_bounding_boxes(pil_image, results)
        
        # Convert to base64
        img_buffer = io.BytesIO()
        img_with_boxes.save(img_buffer, format="JPEG", quality=80)
        img_buffer.seek(0)
        b64_result = base64.b64encode(img_buffer.getvalue()).decode("utf-8")
        
        # Update status
        det_count = len(results.get("detection", []))
        WebStatus.update_status(f"{det_count} object(s) detected", det_count)
        
        return jsonify({
            'success': True,
            'result_image': b64_result,
            'detection_count': det_count,
            'processing_time': f"{processing_time:.2f} ms",
            'detections': results.get("detection", [])
        })
        
    except Exception as e:
        print(f"[ERROR] Detection failed: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

def generate_camera_frames():
    """Generator for camera stream with object detection"""
    global camera, camera_running
    
    frame_counter = 0
    last_detections = None
    
    while camera_running:
        if not CAMERA_AVAILABLE or camera is None:
            time.sleep(0.1)
            continue
        
        ret, frame = camera.read()
        
        if not ret:
            time.sleep(0.033)
            continue
        
        # Detect every 50th frame (less frequent = faster stream)
        frame_counter += 1
        if frame_counter % 50 == 0:
            # Convert to PIL for detection only
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            pil_image = Image.fromarray(rgb_frame)
            
            results = run_object_detection(pil_image, confidence_threshold=0.1)
            
            if results and "detection" in results:
                last_detections = results["detection"]
                det_count = len(last_detections)
                WebStatus.update_status(f"{det_count} object(s) detected", det_count)
            else:
                last_detections = None
        
        # Draw bounding boxes directly on OpenCV frame (much faster than PIL)
        # ONLY draw for 'elf' class - skip all others
        display_frame = frame.copy()
        if last_detections:
            for obj_det in last_detections:
                if "class_name" not in obj_det or "bounding_box_xyxy" not in obj_det or "confidence" not in obj_det:
                    continue
                
                class_name = obj_det["class_name"]
                
                # ONLY draw bounding box for "elf" class - skip person and others
                if class_name.lower() != 'elf':
                    continue
                
                box = obj_det["bounding_box_xyxy"]
                confidence = float(obj_det["confidence"])
                
                x1, y1, x2, y2 = map(int, box)
                
                # Draw rectangle (red for elf alert!)
                cv2.rectangle(display_frame, (x1, y1), (x2, y2), (0, 0, 255), 3)
                
                # Draw label with background
                label = f"{class_name} {confidence:.0f}%"
                (label_w, label_h), _ = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.6, 2)
                cv2.rectangle(display_frame, (x1, y1 - label_h - 10), (x1 + label_w, y1), (0, 0, 255), -1)
                cv2.putText(display_frame, label, (x1, y1 - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
        
        # Encode directly with OpenCV (faster than PIL)
        ret, buffer = cv2.imencode('.jpg', display_frame, [cv2.IMWRITE_JPEG_QUALITY, 55])
        if not ret:
            continue
        
        frame_bytes = buffer.tobytes()
        
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')
        
        time.sleep(0.033)  # ~30 FPS (matches camera)

@app.route('/video_feed')
def video_feed():
    """Video streaming route"""
    return Response(generate_camera_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/camera/start', methods=['POST'])
def start_camera():
    """Start camera capture"""
    global camera, camera_running
    
    if not CAMERA_AVAILABLE:
        return jsonify({'success': False, 'error': 'OpenCV not installed'}), 400
    
    with camera_lock:
        if camera_running:
            return jsonify({'success': True, 'message': 'Camera already running'})
        
        camera = cv2.VideoCapture(0)
        if not camera.isOpened():
            return jsonify({'success': False, 'error': 'Failed to open camera'}), 500
        
        camera_running = True
        WebStatus.update_status("Camera started", 0)
        print("[CAMERA] Camera started")
        
        return jsonify({'success': True})

@app.route('/camera/stop', methods=['POST'])
def stop_camera():
    """Stop camera capture"""
    global camera, camera_running
    
    with camera_lock:
        if camera and camera_running:
            camera_running = False
            camera.release()
            camera = None
            WebStatus.update_status("Camera stopped", 0)
            print("[CAMERA] Camera stopped")
        
        return jsonify({'success': True})

if __name__ == '__main__':
    # Parse command line arguments
    parser = argparse.ArgumentParser(description='Elf Detection Server with Edge Impulse and MQTT')
    parser.add_argument(
        '--model',
        type=str,
        default=None,
        help='Path to Edge Impulse model file (.eim)'
    )
    parser.add_argument(
        '--port',
        type=int,
        default=8001,
        help='Port to run the server on (default: 8001)'
    )
    
    args = parser.parse_args()
    
    # Initialize MQTT client
    print("[MQTT] Initializing MQTT client...")
    mqtt_client = mqtt.Client()
    mqtt_client.on_connect = on_mqtt_connect
    mqtt_client.on_disconnect = on_mqtt_disconnect
    
    if MQTT_PASS:
        mqtt_client.username_pw_set(MQTT_USER, MQTT_PASS)
    
    try:
        mqtt_client.connect(MQTT_HOST, MQTT_PORT, 60)
        mqtt_client.loop_start()  # Start MQTT loop in background
        print(f"[MQTT] Connected to {MQTT_HOST}:{MQTT_PORT}")
    except Exception as e:
        print(f"[MQTT] Failed to connect: {e}")
        print("[MQTT] Continuing without MQTT...")
    
    # Get script directory to find model file
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Auto-detect .eim model file if not specified
    if args.model:
        # If relative path, make it relative to script directory
        if not os.path.isabs(args.model):
            MODEL_PATH = os.path.join(script_dir, args.model)
        else:
            MODEL_PATH = args.model
    else:
        # Search for .eim file in script directory
        import glob
        eim_files = glob.glob(os.path.join(script_dir, '*.eim'))
        if eim_files:
            MODEL_PATH = eim_files[0]
            print(f"[AUTO] Found model: {os.path.basename(MODEL_PATH)}")
        else:
            MODEL_PATH = None
            print("[WARNING] No .eim model found in script directory")
    
    print("=" * 60)
    print("Edge Impulse Elf Detection Server (MQTT Enabled)")
    print("=" * 60)
    print(f"Model: {os.path.basename(MODEL_PATH) if MODEL_PATH else 'Not found'}")
    print(f"Port: {args.port}")
    print(f"MQTT: {MQTT_HOST}:{MQTT_PORT}")
    print(f"Alert Topic: {TOPIC_ALERT_RED}")
    
    # Load model if available
    if MODEL_PATH:
        load_model(MODEL_PATH)
    else:
        print("[WARNING] Running without Edge Impulse model - detection disabled")
    
    print(f"\n[SERVER] Running on http://0.0.0.0:{args.port}")
    print("=" * 60 + "\n")
    
    try:
        app.run(host='0.0.0.0', port=args.port, threaded=True)
    finally:
        # Cleanup
        if camera and camera_running:
            camera.release()
        if edge_impulse_runner:
            try:
                edge_impulse_runner.stop()
            except:
                pass
        if mqtt_client:
            mqtt_client.disconnect()
            mqtt_client.loop_stop()
