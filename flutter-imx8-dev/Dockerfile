# Copyright (c) 2021 Foundries.io
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

# For testing in the LmP
# docker build --tag hub.foundries.io/lmp/xkiosk-imx8:latest .
# docker run -it --rm --device-cgroup-rule='c 199:* rmw' --device-cgroup-rule='c 226:* rmw' -v /run/user/63:/run/user/63 -v /dev/dri:/dev/dri -v /dev/galcore:/dev/galcore --entrypoint /bin/bash hub.foundries.io/lmp/xkiosk-imx8:latest
# /start.sh
# or
# docker run -it --rm --device-cgroup-rule='c 199:* rmw' --device-cgroup-rule='c 226:* rmw' -v /run/user/63:/run/user/63 -v /dev/dri:/dev/dri -v /dev/galcore:/dev/galcore hub.foundries.io/lmp/xkiosk-imx8:latest
FROM 0flutter-imx8-aarch64:1.0 AS build

LABEL maintainer="Raul Munoz <raul@foundries.io>"
ENV DEBIAN_FRONTEND noninteractive

COPY [ \
      "imx8-libs.sh", \
      "patches/0001-meson-add-libdrm-vivante-to-the-meson-meta-data.patch", \
      "/root/"]

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
                       meson \
                       autoconf \
                       patch \
                       libpciaccess-dev \
                       libxkbcommon0 \
                       automake && \
    apt-get clean && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/* && \
    bash /root/imx8-libs.sh

ENV WAYLAND_USER="weston"
ENV XDG_RUNTIME_DIR="/run/user/63"
ENV WAYLAND_DISPLAY="wayland-0"

ENV FIO_HOME /home/weston
ENV FIO_USERID 63
ENV FIO_USERNAME weston

ENV LD_LIBRARY_PATH=/opt/flutter-elinux/flutter/bin/cache/artifacts/engine/elinux-arm64-debug/
ENV LC_ALL="en_US.UTF-8"
ENV PATH="/opt/flutter-elinux/bin:${PATH}"

RUN groupadd -g 61 render && \
    if [ ! "${FIO_USERID}" = "0" ]; then \
        groupadd -g ${FIO_USERID} ${FIO_USERNAME}; \
        useradd -d ${FIO_HOME} -s /bin/bash -m ${FIO_USERNAME} -u ${FIO_USERID} -g ${FIO_USERID} -G video,render; \
    fi

RUN cp /opt/flutter-elinux/flutter/bin/cache/artifacts/engine/elinux-arm64-debug/libflutter_engine.so /root/flutter-embedded-linux/build/
COPY --chown=${FIO_USERNAME} start.sh /

#USER ${FIO_USERNAME}
WORKDIR /root

ENTRYPOINT ["/start.sh"]
