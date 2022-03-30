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
# docker build --tag hub.foundries.io/lmp/0debian-base-imx-aarch64:latest .
# docker run -it --rm --device-cgroup-rule='c 199:* rmw' --device-cgroup-rule='c 226:* rmw' -v /run/user/63:/run/user/63 -v /dev/dri:/dev/dri -v /dev/galcore:/dev/galcore --entrypoint /bin/bash hub.foundries.io/lmp/0debian-base-imx-aarch64:latest
# or
# docker run -it --rm --device-cgroup-rule='c 199:* rmw' --device-cgroup-rule='c 226:* rmw' -v /run/user/63:/run/user/63 -v /dev/dri:/dev/dri -v /dev/galcore:/dev/galcore hub.foundries.io/lmp/0debian-base-imx-aarch64:latest

FROM debian:bullseye-20220316-slim

LABEL maintainer="Raul Munoz <raul@foundries.io>"

ENV DEBIAN_FRONTEND noninteractive

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
    apt-get clean && apt-get autoremove && rm -rf /var/lib/apt/lists/*

#Installing libdrm-imx
WORKDIR /root
RUN git clone -b libdrm-imx-2.4.102 http://source.codeaurora.org/external/imx/libdrm-imx.git && \
        cd /root/libdrm-imx/ && \
        git checkout 40ea53973b99b7df07f472318918a8c2b310e4a7
WORKDIR /root/libdrm-imx/

COPY patches/0001-meson-add-libdrm-vivante-to-the-meson-meta-data.patch .
RUN patch -f -p1 < 0001-meson-add-libdrm-vivante-to-the-meson-meta-data.patch
RUN meson --prefix /usr --buildtype plain -Damdgpu=true -Dcairo-tests=false -Detnaviv=true -Dexynos=false -Dfreedreno=true -Dfreedreno-kgsl=false -Dinstall-test-programs=true -Dintel=true -Dlibkms=true -Dman-pages=false -Dnouveau=true -Domap=true -Dradeon=true -Dtegra=false -Dudev=false -Dvalgrind=false -Dvc4=true -Dvivante=true -Dvmwgfx=true build/
RUN ninja -C build/ install
WORKDIR /root

#Installing imx-gpu-viv
RUN wget https://www.nxp.com/lgfiles/NMG/MAD/YOCTO/imx-gpu-viv-6.4.3.p1.4-aarch64.bin
RUN sh /root/imx-gpu-viv-6.4.3.p1.4-aarch64.bin --auto-accept --force

RUN cp -ra /root/imx-gpu-viv-6.4.3.p1.4-aarch64/gpu-core/etc/* /etc/
RUN cp -ra /root/imx-gpu-viv-6.4.3.p1.4-aarch64/gpu-core/usr/lib/*.so* /usr/lib/aarch64-linux-gnu/
RUN cp -ra /root/imx-gpu-viv-6.4.3.p1.4-aarch64/gpu-core/usr/lib/wayland/* /usr/lib/aarch64-linux-gnu/
RUN cp -ra /root/imx-gpu-viv-6.4.3.p1.4-aarch64/gpu-core/usr/include/* /usr/include/

#Installing imx-gpu-g2d
RUN wget https://www.nxp.com/lgfiles/NMG/MAD/YOCTO/imx-gpu-g2d-6.4.3.p1.4-aarch64.bin
RUN sh /root/imx-gpu-g2d-6.4.3.p1.4-aarch64.bin --auto-accept --force

RUN cp -ra /root/imx-gpu-g2d-6.4.3.p1.4-aarch64/g2d/usr/include/* /usr/include/
RUN cp -ra /root/imx-gpu-g2d-6.4.3.p1.4-aarch64/g2d/usr/lib/* /usr/lib/aarch64-linux-gnu/

WORKDIR /root

RUN apt-get remove -y \
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
                       rm -rf /root/libdrm-imx* && \
                       rm -rf /root/imx-gpu-g2d-6.4.3.p1.4-aarch64* && \
                       rm -rf /root/imx-gpu-viv-6.4.3.p1.4-aarch64*

COPY wayland-config.sh /root/

CMD ["/bin/bash"]
