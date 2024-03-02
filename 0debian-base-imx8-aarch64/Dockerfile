# Copyright (c) 2021 Foundries.io
#
# SPDX-License-Identifier: BSD-3-Clause
#

# For testing in the LmP
# docker build --tag hub.foundries.io/lmp/0debian-base-imx8-aarch64:latest .
# docker run -it --rm --device-cgroup-rule='c 199:* rmw' --device-cgroup-rule='c 226:* rmw' -v /run/user/63:/run/user/63 -v /dev/dri:/dev/dri -v /dev/galcore:/dev/galcore --entrypoint /bin/bash hub.foundries.io/lmp/0debian-base-imx8-aarch64:latest
# or
# docker run -it --rm --device-cgroup-rule='c 199:* rmw' --device-cgroup-rule='c 226:* rmw' -v /run/user/63:/run/user/63 -v /dev/dri:/dev/dri -v /dev/galcore:/dev/galcore hub.foundries.io/lmp/0debian-base-imx8-aarch64:latest
FROM debian:bullseye-20220316-slim

LABEL maintainer="Raul Munoz <raul@foundries.io>"
ENV DEBIAN_FRONTEND noninteractive

COPY [ \
      "imx8-libs.sh", \
      "patches/0001-meson-add-libdrm-vivante-to-the-meson-meta-data.patch", \
      "/root/"]

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
                       git \
                       pkg-config \
                       meson \
                       build-essential \
                       autoconf \
                       automake \
                       ca-certificates \
                       wget \
                       patch \
                       libpciaccess-dev && \
    apt-get clean && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/* && \
    bash /root/imx8-libs.sh && \
    apt-get remove -y \
                       git \
                       pkg-config \
                       meson \
                       build-essential \
                       autoconf \
                       automake \
                       ca-certificates \
                       wget \
                       patch \
                       libpciaccess-dev

CMD ["/bin/bash"]
