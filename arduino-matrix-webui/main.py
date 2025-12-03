#!/usr/bin/env python3
#
# Copyright (c) 2025 Foundries.io
#
# SPDX-License-Identifier: BSD-3-Clause
#

import sys
import threading
import json
import time
from queue import Queue
from weakref import WeakSet
from flask import Flask, Response, send_file, jsonify, request
from arduino.app_utils import *

# Flask app
app = Flask(__name__)

# Status management for Server-Sent Events
status_connections = WeakSet()
current_status = "Ready"

class WebStatus:
    _lock = threading.Lock()

    @classmethod
    def _broadcast(cls):
        """Broadcast current status to all connected clients"""
        for q in status_connections:
            try:
                q.put({"status": current_status})
            except:
                pass

    @classmethod
    def update_status(cls, status: str):
        """Update status and broadcast to all clients"""
        global current_status
        with cls._lock:
            current_status = status
            cls._broadcast()

# Matrix state tracking (13x8 = 104 LEDs)
MATRIX_COLS = 13
MATRIX_ROWS = 8
MATRIX_SIZE = 104

# Initialize matrix state (all LEDs off)
matrix_state = [[0 for _ in range(MATRIX_COLS)] for _ in range(MATRIX_ROWS)]

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
            yield f"data: {{\"status\": \"{current_status}\"}}\n\n"
            
            # Stream updates
            while True:
                data = q.get()
                yield f"data: {{'status': '{data['status']}'}}\n\n"
        except GeneratorExit:
            status_connections.discard(q)
    
    return Response(event_stream(), mimetype='text/event-stream')

@app.route('/matrix/toggle', methods=['POST'])
def toggle_led():
    """Toggle individual LED on/off"""
    try:
        data = request.get_json()
        x = int(data.get('x'))
        y = int(data.get('y'))
        
        if x < 0 or x >= MATRIX_COLS or y < 0 or y >= MATRIX_ROWS:
            return jsonify({'success': False, 'error': 'Invalid coordinates'}), 400
        
        # Toggle state
        matrix_state[y][x] = 1 if matrix_state[y][x] == 0 else 0
        new_state = matrix_state[y][x]
        
        # Call Arduino Bridge
        Bridge.call("set_led", x, y, new_state)
        
        # Update status
        status_msg = f"LED ({x},{y}): {'ON' if new_state else 'OFF'}"
        WebStatus.update_status(status_msg)
        
        print(f"[MATRIX] Toggled LED ({x},{y}) -> {new_state}")
        
        return jsonify({
            'success': True,
            'x': x,
            'y': y,
            'state': new_state
        })
    except Exception as e:
        print(f"[ERROR] Toggle LED: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/matrix/clear', methods=['POST'])
def clear_matrix():
    """Clear entire matrix"""
    try:
        # Clear local state
        for y in range(MATRIX_ROWS):
            for x in range(MATRIX_COLS):
                matrix_state[y][x] = 0
        
        # Call Arduino Bridge
        Bridge.call("clear_matrix")
        
        # Update status
        WebStatus.update_status("Matrix cleared")
        
        print("[MATRIX] Cleared entire matrix")
        
        return jsonify({'success': True})
    except Exception as e:
        print(f"[ERROR] Clear matrix: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/matrix/get', methods=['GET'])
def get_matrix():
    """Get current matrix state"""
    try:
        return jsonify({
            'success': True,
            'matrix': matrix_state,
            'cols': MATRIX_COLS,
            'rows': MATRIX_ROWS
        })
    except Exception as e:
        print(f"[ERROR] Get matrix: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

def main():
    print("=" * 60)
    print("LED Matrix Web Controller - Arduino UNO Q")
    print("=" * 60)
    print(f"\n🌐 Starting web server on http://0.0.0.0:8000")
    print(f"� Matrix size: {MATRIX_COLS}x{MATRIX_ROWS} = {MATRIX_SIZE} LEDs")
    print("\n" + "=" * 60)
    print()
    
    try:
        # Start Flask server
        app.run(host='0.0.0.0', port=8000, debug=False, threaded=True)
    except KeyboardInterrupt:
        print("\n\nShutting down...")
        sys.exit(0)

if __name__ == "__main__":
    main()

