# Copyright (c) 2021 Foundries.io
#
# SPDX-License-Identifier: BSD-3-Clause
#

# For testing in the LmP
# docker build --tag hub.foundries.io/lmp/x-kiosk:latest .
# docker run -it --user 63:63 --rm -v /tmp/.X11-unix:/tmp/.X11-unix hub.foundries.io/lmp/x-kiosk:latest www.foundries.io

FROM debian:bullseye-20211011-slim

LABEL maintainer="Michael Scott <mike@foundries.io>"

ENV DEBIAN_FRONTEND noninteractive
ENV DISPLAY :0
ENV XDG_CACHE_HOME /tmp/.cache
ENV XDG_CONFIG_HOME /tmp/.config

# Install Chromium
RUN apt-get update && \
    apt-get install -y --no-install-recommends chromium && \
    rm -rf /var/lib/apt/lists/*

COPY start.sh /

ENTRYPOINT ["/start.sh"]
