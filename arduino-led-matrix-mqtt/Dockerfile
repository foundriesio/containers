#
# Copyright (c) 2025 Foundries.io
#
# SPDX-License-Identifier: BSD-3-Clause
#

FROM debian:trixie-slim
ENV DEBIAN_FRONTEND=noninteractive

# APT Transport (UNIVERSAL)
RUN apt-get update && apt-get install -y apt-transport-https

# ALL System Dependencies Combined (UNIVERSAL)
RUN apt-get update && \
    apt-get install -y \
        curl \
        ca-certificates \
        alsa-utils \
        bash \
        build-essential \
        ca-certificates \
        curl \
        dbus \
        gcc \
        git \
        libasound2 \
        libasound2-dev \
        libgl1 \
        libglib2.0-0 \
        libglx-mesa0 \
        libgomp1 \
        libgpiod3 \
        mosquitto-clients \
        portaudio19-dev \
        python3 \
        python3-dev \
        python3-pip \
        python3-pyaudio \
        python3-venv \
        sox \
        vim && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Python Virtual Environment (UNIVERSAL)
ENV VENV=/opt/venv
RUN python3 -m venv $VENV
ENV PATH="$VENV/bin:$PATH"

# ALL Python Dependencies Combined (UNIVERSAL)
RUN pip install --upgrade pip setuptools wheel && \
    pip install --no-cache-dir \
        cbor \
        edge_impulse_linux \
        flask \
        numpy \
        "opencv-python>=4.8.0,<5" \
        paho-mqtt \
        Pillow>=10.0.0 \
        pyalsaaudio \
        pyaudio \
        six \
        sounddevice \
        watchdog && \
    rm -rf ~/.cache/pip

# Arduino APT Configuration
RUN curl -fsSL https://raw.githubusercontent.com/arduino/arduino-deb-images/arduino/debos-recipes/overlays/arduino-unoq-releases/etc/apt/keyrings/arduino.asc \
    -o /etc/apt/keyrings/arduino.asc && \
    curl -fsSL https://raw.githubusercontent.com/arduino/arduino-deb-images/arduino/debos-recipes/overlays/arduino-unoq-releases/etc/apt/auth.conf.d/arduino.conf \
    -o /etc/apt/auth.conf.d/arduino.conf && \
    curl -fsSL https://raw.githubusercontent.com/arduino/arduino-deb-images/arduino/debos-recipes/overlays/arduino-unoq-releases/etc/apt/sources.list.d/arduino.list \
    -o /etc/apt/sources.list.d/arduino.list && \
    chmod 644 /etc/apt/keyrings/arduino.asc && \
    chmod 600 /etc/apt/auth.conf.d/arduino.conf

RUN apt-get update && apt-get install -y arduino-cli && \
    apt-get clean

RUN pip install https://github.com/arduino/app-bricks-py/releases/download/release%2F0.5.0/arduino_app_bricks-0.5.0-py3-none-any.whl

# Arduino Core Installation
RUN arduino-cli core install arduino:zephyr -v

# Application Files
RUN mkdir -p /app/
COPY main.py start.sh /app/
COPY sketch.yaml sketch.ino /app/sketch/
RUN chmod +x /app/start.sh
WORKDIR /app

CMD ["/app/start.sh"]
