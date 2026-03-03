#
# Copyright (c) 2025 Foundries.io
#
# SPDX-License-Identifier: BSD-3-Clause
#

FROM debian:trixie-slim

# ALL System Dependencies Combined (UNIVERSAL)
RUN apt-get update && \
    apt-get install -y --no-install-recommends build-essential && \
    rm -rf /var/lib/apt/lists/*

# Application Files
RUN mkdir -p /app/

COPY helloworld.c /app/
COPY start.sh /app/
RUN chmod +x /app/start.sh

WORKDIR /app/

RUN gcc helloworld.c -o helloworld

ENTRYPOINT ["/app/start.sh"]

