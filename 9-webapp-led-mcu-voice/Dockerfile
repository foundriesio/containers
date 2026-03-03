#
# Copyright (c) 2025 Foundries.io
#
# SPDX-License-Identifier: BSD-3-Clause
#

FROM debian:trixie-slim AS builder
ENV DEBIAN_FRONTEND=noninteractive

COPY assets/arduino.asc /etc/apt/keyrings/arduino.asc
COPY assets/arduino.list /etc/apt/sources.list.d/arduino.list

RUN chmod 644 /etc/apt/keyrings/arduino.asc

RUN apt-get update && \
    apt-get install -y apt-transport-https ca-certificates

RUN apt-get update && \
    apt-get install -y \
        arduino-cli \
        build-essential gcc && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

RUN arduino-cli core install arduino:zephyr -v

RUN mkdir -p /app/sketch
COPY assets/sketch.yaml assets/sketch.ino /app/sketch/

RUN arduino-cli compile -b arduino:zephyr:unoq --output-dir "/app/sketch" "/app/sketch"

FROM debian:trixie-slim
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y \
        ca-certificates \
        alsa-utils \
        libgl1 \
        libglib2.0-0 \
        portaudio19-dev \
        sox \
        libasound2 \
        libasound2-dev \
        libgpiod3 \
        python3-pyaudio \
        python3 python3-venv python3-dev python3-pip \
        libgpiod3 bash && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

ENV VENV=/opt/venv
RUN python3 -m venv $VENV
ENV PATH="$VENV/bin:$PATH"

RUN pip install --upgrade pip setuptools wheel && \
    pip install --no-cache-dir \
        cbor \
        edge_impulse_linux \
        "opencv-python>=4.5.1.48,<5" \
        pyaudio \
        six \
        pyalsaaudio \
        sounddevice \
        numpy \
        watchdog \
        flask && \
    pip install https://github.com/arduino/app-bricks-py/releases/download/release%2F0.5.0/arduino_app_bricks-0.5.0-py3-none-any.whl && \
    rm -rf ~/.cache/pip

RUN mkdir -p /app/
RUN mkdir -p /app/sketch

# Copy compiled sketch from builder stage
COPY --from=builder /app/sketch/*.elf-zsk.bin /app/sketch/
COPY --from=builder /app/sketch/*.elf /app/sketch/

# Copy application files
COPY assets/openocd /opt/openocd

COPY webapp-led-mcu-voice.py /app/
COPY index.html /app/index.html
COPY assets/arduino.png assets/edgeimpulse.png assets/foundries.png assets/qualcomm.png /app/assets/

# Note: deployment.eim must be provided by the user
# See README.md for instructions on creating your own Edge Impulse model
#
# To include your model in the container, uncomment the following line:
# COPY deployment.eim /app/
# RUN chmod +x /app/deployment.eim

COPY start.sh /app/
RUN chmod +x /app/start.sh
WORKDIR /app

CMD ["/app/start.sh"]
