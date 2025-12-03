#!/usr/bin/env python3
#
# Copyright (c) 2025 Foundries.io
#
# SPDX-License-Identifier: BSD-3-Clause
#

"""
Camera capture server - captures from server's camera and streams to clients
"""

import cv2
import base64
import threading
import time
from io import BytesIO
from PIL import Image

class CameraServer:
    """Handles camera capture on the server side"""
    
    def __init__(self, camera_id=0):
        self.camera_id = camera_id
        self.camera = None
        self.is_running = False
        self.current_frame = None
        self.frame_lock = threading.Lock()
        self.capture_thread = None
        
    def start(self):
        """Start capturing from camera"""
        if self.is_running:
            print("[WARNING]  Camera already running")
            return False
            
        print(f"[CAMERA] Starting camera {self.camera_id}...")
        self.camera = cv2.VideoCapture(self.camera_id)
        
        if not self.camera.isOpened():
            print(f"[ERROR] Failed to open camera {self.camera_id}")
            return False
        
        # Set camera properties for balanced performance
        # Lower resolution for faster Edge Impulse processing
        self.camera.set(cv2.CAP_PROP_FRAME_WIDTH, 320)   # Reduced for speed
        self.camera.set(cv2.CAP_PROP_FRAME_HEIGHT, 240)  # Reduced for speed
        self.camera.set(cv2.CAP_PROP_FPS, 25)            # Slightly higher FPS
        
        self.is_running = True
        self.capture_thread = threading.Thread(target=self._capture_loop, daemon=True)
        self.capture_thread.start()
        
        print("[OK] Camera started")
        print(f"   {int(self.camera.get(cv2.CAP_PROP_FRAME_WIDTH))}x{int(self.camera.get(cv2.CAP_PROP_FRAME_HEIGHT))} @ {int(self.camera.get(cv2.CAP_PROP_FPS))} FPS")
        
        return True
    
    def stop(self):
        """Stop capturing from camera"""
        print("[STOP] Stopping camera...")
        self.is_running = False
        
        if self.capture_thread:
            self.capture_thread.join(timeout=2)
        
        if self.camera:
            self.camera.release()
            self.camera = None
        
        print("[OK] Camera stopped")
    
    def _capture_loop(self):
        """Background thread that continuously captures frames"""
        while self.is_running:
            ret, frame = self.camera.read()
            
            if ret:
                with self.frame_lock:
                    self.current_frame = frame
            else:
                print("[WARNING]  Failed to read frame from camera")
                time.sleep(0.1)
    
    def get_frame(self):
        """Get the current frame as numpy array (OpenCV format)"""
        with self.frame_lock:
            if self.current_frame is not None:
                return self.current_frame.copy()
        return None
    
    def get_frame_as_pil(self):
        """Get the current frame as PIL Image"""
        frame = self.get_frame()
        if frame is not None:
            # Convert BGR to RGB
            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            return Image.fromarray(frame_rgb)
        return None
    
    def get_frame_as_base64(self, quality=80):
        """Get the current frame as base64 encoded JPEG"""
        frame = self.get_frame()
        if frame is not None:
            # Encode to JPEG
            encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), quality]
            _, buffer = cv2.imencode('.jpg', frame, encode_param)
            
            # Convert to base64
            jpg_as_text = base64.b64encode(buffer).decode('utf-8')
            return jpg_as_text
        return None
    
    def is_available(self):
        """Check if camera is running and has frames"""
        return self.is_running and self.current_frame is not None

# Test function
if __name__ == '__main__':
    print("Testing camera server...")
    
    cam = CameraServer(0)
    
    if cam.start():
        print("\n Capturing frames for 5 seconds...")
        
        for i in range(50):
            frame = cam.get_frame()
            if frame is not None:
                print(f"Frame {i+1}: {frame.shape}")
            time.sleep(0.1)
        
        cam.stop()
        print("\n[OK] Test completed!")
    else:
        print("[ERROR] Failed to start camera")
