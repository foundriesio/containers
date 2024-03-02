# Copyright (c) 2021 Foundries.io
#
# SPDX-License-Identifier: BSD-3-Clause
#

# For testing in the LmP
# docker build --tag hub.foundries.io/lmp/0flutter-imx8-aarch64:latest .
FROM debian:bullseye-20220316-slim AS build

LABEL maintainer="Raul Munoz <raul@foundries.io>"

ENV DEBIAN_FRONTEND noninteractive

COPY [ \
      "build-flutter.sh", \
      "/root/"]

RUN apt-get update -y && \
    apt-get install -y libwayland-client0 \
                       libwayland-server0 \
                       libwayland-cursor0 \
                       libwayland-egl1 \
                       libwayland-dev \
                       git \
                       wget \
                       clang \
                       build-essential \
                       libxkbcommon-dev \
                       wayland-protocols \
                       unzip \
                       pkg-config \
                       ninja-build \
                       libegl1-mesa-dev \
                       ca-certificates \
                       curl \
                       libgtk-3-dev && \
    apt-get clean && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/* && \
    bash /root/build-flutter.sh

CMD ["/bin/bash"]
