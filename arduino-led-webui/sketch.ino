// SPDX-FileCopyrightText: Copyright (C) 2025 ARDUINO SA <http://www.arduino.cc>
//
// SPDX-License-Identifier: MPL-2.0

#include <Arduino_RouterBridge.h>

// LED states: false = OFF, true = ON
bool led3_r_state = false;
bool led3_g_state = false;
bool led3_b_state = false;
bool led4_r_state = false;
bool led4_g_state = false;
bool led4_b_state = false;

// Blink animation flags
bool blinking_led3_r = false;
bool blinking_led3_g = false;
bool blinking_led3_b = false;
bool blinking_led4_r = false;
bool blinking_led4_g = false;
bool blinking_led4_b = false;

// Timing for blink (1 second ON, 1 second OFF)
unsigned long previousMillis = 0;
const long blinkInterval = 1000;  // 1 second
bool blinkState = false;

void setup() {
  // Initialize all LED pins
  pinMode(LED_BUILTIN, OUTPUT);      // LED3_R
  pinMode(LED_BUILTIN + 1, OUTPUT);  // LED3_G
  pinMode(LED_BUILTIN + 2, OUTPUT);  // LED3_B
  pinMode(LED_BUILTIN + 3, OUTPUT);  // LED4_R
  pinMode(LED_BUILTIN + 4, OUTPUT);  // LED4_G
  pinMode(LED_BUILTIN + 5, OUTPUT);  // LED4_B
  
  // Turn off all LEDs initially (LEDs are active LOW)
  digitalWrite(LED_BUILTIN, HIGH);      // LED3_R OFF
  digitalWrite(LED_BUILTIN + 1, HIGH);  // LED3_G OFF
  digitalWrite(LED_BUILTIN + 2, HIGH);  // LED3_B OFF
  digitalWrite(LED_BUILTIN + 3, HIGH);  // LED4_R OFF
  digitalWrite(LED_BUILTIN + 4, HIGH);  // LED4_G OFF
  digitalWrite(LED_BUILTIN + 5, HIGH);  // LED4_B OFF
  
  // Start the Bridge and register functions
  Bridge.begin();
  
  // Toggle functions
  Bridge.provide("toggle_led3_r", toggle_led3_r);
  Bridge.provide("toggle_led3_g", toggle_led3_g);
  Bridge.provide("toggle_led3_b", toggle_led3_b);
  Bridge.provide("toggle_led4_r", toggle_led4_r);
  Bridge.provide("toggle_led4_g", toggle_led4_g);
  Bridge.provide("toggle_led4_b", toggle_led4_b);
  
  // Blink start functions
  Bridge.provide("start_blink_led3_r", start_blink_led3_r);
  Bridge.provide("start_blink_led3_g", start_blink_led3_g);
  Bridge.provide("start_blink_led3_b", start_blink_led3_b);
  Bridge.provide("start_blink_led4_r", start_blink_led4_r);
  Bridge.provide("start_blink_led4_g", start_blink_led4_g);
  Bridge.provide("start_blink_led4_b", start_blink_led4_b);
  
  // Blink stop functions
  Bridge.provide("stop_blink_led3_r", stop_blink_led3_r);
  Bridge.provide("stop_blink_led3_g", stop_blink_led3_g);
  Bridge.provide("stop_blink_led3_b", stop_blink_led3_b);
  Bridge.provide("stop_blink_led4_r", stop_blink_led4_r);
  Bridge.provide("stop_blink_led4_g", stop_blink_led4_g);
  Bridge.provide("stop_blink_led4_b", stop_blink_led4_b);
}

void loop() {
  // Check if any LED is blinking
  bool anyBlinking = blinking_led3_r || blinking_led3_g || blinking_led3_b ||
                     blinking_led4_r || blinking_led4_g || blinking_led4_b;
  
  if (anyBlinking) {
    unsigned long currentMillis = millis();
    
    // Toggle blink state every second
    if (currentMillis - previousMillis >= blinkInterval) {
      previousMillis = currentMillis;
      blinkState = !blinkState;
      
      // Apply blink state to all blinking LEDs
      if (blinking_led3_r) {
        digitalWrite(LED_BUILTIN, blinkState ? LOW : HIGH);
      }
      if (blinking_led3_g) {
        digitalWrite(LED_BUILTIN + 1, blinkState ? LOW : HIGH);
      }
      if (blinking_led3_b) {
        digitalWrite(LED_BUILTIN + 2, blinkState ? LOW : HIGH);
      }
      if (blinking_led4_r) {
        digitalWrite(LED_BUILTIN + 3, blinkState ? LOW : HIGH);
      }
      if (blinking_led4_g) {
        digitalWrite(LED_BUILTIN + 4, blinkState ? LOW : HIGH);
      }
      if (blinking_led4_b) {
        digitalWrite(LED_BUILTIN + 5, blinkState ? LOW : HIGH);
      }
    }
  } else {
    delay(100);  // Small delay when not blinking to avoid consuming CPU
  }
}

// Toggle functions for each LED
// Note: LEDs are active LOW, so LOW = ON, HIGH = OFF

void toggle_led3_r() {
  led3_r_state = !led3_r_state;
  digitalWrite(LED_BUILTIN, led3_r_state ? LOW : HIGH);
}

void toggle_led3_g() {
  led3_g_state = !led3_g_state;
  digitalWrite(LED_BUILTIN + 1, led3_g_state ? LOW : HIGH);
}

void toggle_led3_b() {
  led3_b_state = !led3_b_state;
  digitalWrite(LED_BUILTIN + 2, led3_b_state ? LOW : HIGH);
}

void toggle_led4_r() {
  led4_r_state = !led4_r_state;
  digitalWrite(LED_BUILTIN + 3, led4_r_state ? LOW : HIGH);
}

void toggle_led4_g() {
  led4_g_state = !led4_g_state;
  digitalWrite(LED_BUILTIN + 4, led4_g_state ? LOW : HIGH);
}

void toggle_led4_b() {
  led4_b_state = !led4_b_state;
  digitalWrite(LED_BUILTIN + 5, led4_b_state ? LOW : HIGH);
}

// Blink start functions
void start_blink_led3_r() {
  blinking_led3_r = true;
}

void start_blink_led3_g() {
  blinking_led3_g = true;
}

void start_blink_led3_b() {
  blinking_led3_b = true;
}

void start_blink_led4_r() {
  blinking_led4_r = true;
}

void start_blink_led4_g() {
  blinking_led4_g = true;
}

void start_blink_led4_b() {
  blinking_led4_b = true;
}

// Blink stop functions
void stop_blink_led3_r() {
  blinking_led3_r = false;
  digitalWrite(LED_BUILTIN, HIGH);  // Turn off LED
}

void stop_blink_led3_g() {
  blinking_led3_g = false;
  digitalWrite(LED_BUILTIN + 1, HIGH);  // Turn off LED
}

void stop_blink_led3_b() {
  blinking_led3_b = false;
  digitalWrite(LED_BUILTIN + 2, HIGH);  // Turn off LED
}

void stop_blink_led4_r() {
  blinking_led4_r = false;
  digitalWrite(LED_BUILTIN + 3, HIGH);  // Turn off LED
}

void stop_blink_led4_g() {
  blinking_led4_g = false;
  digitalWrite(LED_BUILTIN + 4, HIGH);  // Turn off LED
}

void stop_blink_led4_b() {
  blinking_led4_b = false;
  digitalWrite(LED_BUILTIN + 5, HIGH);  // Turn off LED
}
