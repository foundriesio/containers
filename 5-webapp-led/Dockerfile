#
# Copyright (c) 2025 Foundries.io
#
# SPDX-License-Identifier: BSD-3-Clause
#

FROM debian:trixie-slim

#Install packages
RUN apt-get update && \
        apt-get install -y --no-install-recommends python3-pip && \
        rm -rf /var/lib/apt/lists/*

RUN pip install --break-system-packages flask flask_restful

RUN mkdir -p /app/
RUN mkdir -p /app/assets

COPY webapp-led.py /app/
COPY index.html /app/index.html
COPY assets/arduino.png assets/edgeimpulse.png assets/foundries.png assets/qualcomm.png /app/assets/

WORKDIR /app/

CMD ["python3", "webapp-led.py"]
