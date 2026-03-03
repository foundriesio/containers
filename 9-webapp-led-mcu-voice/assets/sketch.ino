// SPDX-FileCopyrightText: Copyright (C) 2025 ARDUINO SA <http://www.arduino.cc>
//
// SPDX-License-Identifier: MPL-2.0

#include <Arduino_RouterBridge.h>

// Matrix dimensions
#define MATRIX_COLS 13
#define MATRIX_ROWS 8
#define MATRIX_SIZE 104  // 13 x 8

// TODO: those will go into an header file.
extern "C" void matrixWrite(const uint32_t* buf);
extern "C" void matrixBegin();

// Current matrix state (13x8 = 104 LEDs)
uint8_t matrixState[MATRIX_SIZE] = {0};

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
  matrixBegin();
  
  // Clear the matrix
  clearMatrix();

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
  Bridge.provide("set_led", set_led);
  Bridge.provide("set_matrix", set_matrix);
  Bridge.provide("clear_matrix", clear_matrix_bridge);
  Bridge.provide("get_matrix", get_matrix);

  // LED Toggle functions
  Bridge.provide("toggle_led3_r", toggle_led3_r);
  Bridge.provide("toggle_led3_g", toggle_led3_g);
  Bridge.provide("toggle_led3_b", toggle_led3_b);
  Bridge.provide("toggle_led4_r", toggle_led4_r);
  Bridge.provide("toggle_led4_g", toggle_led4_g);
  Bridge.provide("toggle_led4_b", toggle_led4_b);

  // LED Blink start functions
  Bridge.provide("start_blink_led3_r", start_blink_led3_r);
  Bridge.provide("start_blink_led3_g", start_blink_led3_g);
  Bridge.provide("start_blink_led3_b", start_blink_led3_b);
  Bridge.provide("start_blink_led4_r", start_blink_led4_r);
  Bridge.provide("start_blink_led4_g", start_blink_led4_g);
  Bridge.provide("start_blink_led4_b", start_blink_led4_b);

  // LED Blink stop functions
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
    delay(100);  // Small delay when not blinking
  }
}

/**
 * Set individual LED state
 * Parameters: x (0-12), y (0-7), state (0 or 1)
 */
void set_led(int x, int y, int state) {
  if (x < 0 || x >= MATRIX_COLS || y < 0 || y >= MATRIX_ROWS) {
    return;  // Invalid coordinates
  }
  
  // Calculate linear index (row-major order)
  int index = y * MATRIX_COLS + x;
  
  // Update state
  matrixState[index] = (state != 0) ? 1 : 0;
  
  // Update display
  updateDisplay();
}

/**
 * Set entire matrix at once (13x8 = 104 values)
 * Parameters: matrix string with 104 comma-separated values "0,1,0,1,..."
 * Much faster than calling set_led 104 times!
 */
void set_matrix(String matrix_data) {
  int index = 0;
  int value = 0;
  String current = "";
  
  // Parse comma-separated values
  for (unsigned int i = 0; i < matrix_data.length() && index < MATRIX_SIZE; i++) {
    char c = matrix_data.charAt(i);
    if (c == ',') {
      matrixState[index++] = current.toInt();
      current = "";
    } else {
      current += c;
    }
  }
  // Last value (no trailing comma)
  if (current.length() > 0 && index < MATRIX_SIZE) {
    matrixState[index] = current.toInt();
  }
  
  // Update display once with all changes
  updateDisplay();
}

/**
 * Clear the entire matrix
 */
void clear_matrix_bridge() {
  clearMatrix();
}

/**
 * Get matrix state as string
 * Returns: JSON-like string with all 104 LED states
 */
String get_matrix() {
  String result = "[";
  for (int i = 0; i < MATRIX_SIZE; i++) {
    result += String(matrixState[i]);
    if (i < MATRIX_SIZE - 1) {
      result += ",";
    }
  }
  result += "]";
  return result;
}

/**
 * Clear matrix state and display
 */
void clearMatrix() {
  for (int i = 0; i < MATRIX_SIZE; i++) {
    matrixState[i] = 0;
  }
  updateDisplay();
}

/**
 * Convert uint8_t array to uint32_t buffer and write to matrix
 */
void updateDisplay() {
  uint32_t buffer[4] = {0, 0, 0, 0};
  
  for (int i = 0; i < MATRIX_SIZE; i++) {
    if (matrixState[i]) {
      int uint32_index = i / 32;        // Which uint32_t (0-3)
      int bit_position = i % 32;        // Bit position (0-31)
      buffer[uint32_index] |= (1UL << bit_position);
    }
  }
  
  matrixWrite(buffer);
}

// ============================================================================
// LED CONTROL FUNCTIONS
// ============================================================================

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

