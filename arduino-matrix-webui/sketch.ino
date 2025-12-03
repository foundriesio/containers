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

void setup() {
  matrixBegin();
  
  // Clear the matrix
  clearMatrix();
  
  // Start the Bridge and register functions
  Bridge.begin();
  Bridge.provide("set_led", set_led);
  Bridge.provide("clear_matrix", clear_matrix_bridge);
  Bridge.provide("get_matrix", get_matrix);
}

void loop() {
  // No animation in this version - just static control
  delay(100);
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

