#
# Copyright (c) 2025 Foundries.io
#
# SPDX-License-Identifier: BSD-3-Clause
#

FROM debian:trixie-slim
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y \
        ca-certificates \
        alsa-utils \
        libgl1 \
        libglib2.0-0 \
        portaudio19-dev \
        python3-pyaudio \
        sox \
        libasound2 \
        libasound2-dev \
        python3 python3-venv python3-dev python3-pip \
        bash && \
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
        numpy && \
    rm -rf ~/.cache/pip

RUN mkdir -p /app/

COPY led-voice.py /app/

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
