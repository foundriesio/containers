#!/usr/bin/env python3
#
# Copyright (c) 2025 Foundries.io
#
# SPDX-License-Identifier: BSD-3-Clause
#

import sys
import threading
import time
from queue import Queue
from weakref import WeakSet
from flask import Flask, Response, send_file, jsonify
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
            q.put({"status": current_status})

    @classmethod
    def update_status(cls, status: str):
        """Update status and broadcast to all clients"""
        global current_status
        with cls._lock:
            current_status = status
            cls._broadcast()

# LED states tracking
led_states = {
    'led3_r': False, 'led3_g': False, 'led3_b': False,
    'led4_r': False, 'led4_g': False, 'led4_b': False
}

blink_states = {
    'led3_r': False, 'led3_g': False, 'led3_b': False,
    'led4_r': False, 'led4_g': False, 'led4_b': False
}

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

@app.route('/toggle/<led>', methods=['POST'])
def toggle_led(led):
    """Toggle LED on/off"""
    try:
        if led not in led_states:
            return jsonify({'success': False, 'error': 'Invalid LED'}), 400
        
        # Call Arduino Bridge
        Bridge.call(f"toggle_{led}")
        
        # Update state
        led_states[led] = not led_states[led]
        
        # Update status
        status_msg = f"{led.upper()}: {'ON' if led_states[led] else 'OFF'}"
        WebStatus.update_status(status_msg)
        
        print(f"[LED] Toggled {led} -> {led_states[led]}")
        
        return jsonify({
            'success': True,
            'led': led,
            'state': led_states[led]
        })
    except Exception as e:
        print(f"[ERROR] Toggle {led}: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

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

@app.route('/stop_blink/<led>', methods=['POST'])
def stop_blink(led):
    """Stop LED blink animation"""
    try:
        if led not in blink_states:
            return jsonify({'success': False, 'error': 'Invalid LED'}), 400
        
        # Call Arduino Bridge
        Bridge.call(f"stop_blink_{led}")
        
        # Update state
        blink_states[led] = False
        
        # Update status
        status_msg = f"{led.upper()} blink STOPPED"
        WebStatus.update_status(status_msg)
        
        print(f"[BLINK] Stopped {led}")
        
        return jsonify({
            'success': True,
            'led': led,
            'blinking': False
        })
    except Exception as e:
        print(f"[ERROR] Stop blink {led}: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

def main():
    print("=" * 60)
    print("Arduino LED Web Control - Starting Server")
    print("=" * 60)
    print("\n Access the web interface at:")
    print("   http://0.0.0.0:8000")
    print("\n" + "=" * 60)
    
    # Start Flask server
    try:
        app.run(
            host="0.0.0.0",
            port=8000,
            debug=False,
            use_reloader=False
        )
    except KeyboardInterrupt:
        print("\n\nShutting down...")
    except Exception as e:
        print(f"\n[ERROR] Server error: {e}")

if __name__ == '__main__':
    main()



