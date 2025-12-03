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

RUN mkdir -p /app/
COPY main.py \
     camera_server.py \
     index.html \
     start.sh \
     /app/

# Note: model.eim must be provided by the user
# See README.md for instructions on creating your own Edge Impulse model
# To include your model in the container, uncomment the following line:
# COPY model.eim /app/
# RUN chmod +x /app/model.eim

RUN chmod +x /app/start.sh
WORKDIR /app

CMD ["/app/start.sh"]
