#
# Copyright (c) 2025 Foundries.io
#
# SPDX-License-Identifier: BSD-3-Clause
#
FROM debian:trixie-slim

#Install packages
RUN apt-get update && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir -p /app/

COPY blinkled.sh /app/
RUN chmod +x /app/blinkled.sh

WORKDIR /app/

ENTRYPOINT ["/app/blinkled.sh"]
