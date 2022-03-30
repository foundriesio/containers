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
# docker build --tag hub.foundries.io/lmp/0chromium-imx-aarch64:latest .

FROM debian:bullseye-20220316-slim AS build

LABEL maintainer="Raul Munoz <raul@foundries.io>"

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update -y && \
    apt-get install -y vim curl wget \
                       libwayland-client0 libwayland-server0 \
                       xcompmgr x11-utils uuid-dev subversion ruby \
                       rpm python-setuptools \
                       python-dev \
                       python pkg-config p7zip openbox mesa-common-dev \
                       libxtst6 libxtst-dev libxt-dev libxss-dev libxslt1-dev \
                       libxshmfence-dev libxrender1 libxrandr2 libxkbcommon-dev \
                       libxinerama1 libxi6 libxfixes3 libxdamage1 libxcursor1 \
                       libxcomposite1 libx11-xcb1 libwww-perl \
                       libwayland-egl1-mesa libvulkan1 libvulkan-dev libva-dev \
                       libudev-dev libssl-dev libsqlite3-dev libspeechd2 \
                       libspeechd-dev libsctp-dev libpulse0 libpulse-dev \
                       libpng16-16 libpixman-1-0 libpci3 libpci-dev \
                       libpango-1.0-0 libnss3-dev libnss3 libnspr4-dev \
                       libnspr4 libkrb5-dev libjpeg-dev libinput10 libinput-dev \
                       libgtk-3-dev libgtk-3-0 libglu1-mesa-dev libglib2.0-dev \
                       libglib2.0-0 libgbm1 libgbm-dev libfreetype6 \
                       libfontconfig1 libffi-dev libevdev2 libevdev-dev \
                       libelf-dev libdrm2 libdrm-dev libcurl4-gnutls-dev \
                       libcups2-dev libcups2 libcap2 libcap-dev libcairo2-dev \
                       libcairo2 libc6-dev libbz2-dev libbrlapi-dev \
                       libbluetooth-dev libatspi2.0-dev libatspi2.0-0 \
                       libatk1.0-0 libasound2-dev libasound2 \
                       gperf flex \
                       fakeroot elfutils devscripts dbus-x11 cdbs bison \
                       binutils-arm-linux-gnueabihf binutils-aarch64-linux-gnu \
                       apache2-bin libflac-dev flac lsb-release wget \
                       software-properties-common dirmngr apt-transport-https ca-certificates \
    && apt-get clean && apt-get autoremove && rm -rf /var/lib/apt/lists/*

COPY setup_12.x /
RUN bash /setup_12.x
RUN apt-get --purge remove -y gcc g++ cpp

RUN apt-get update -y && \
    apt-get install -y gcc-10 g++-10 nodejs && \
    rm -rf /var/lib/apt/lists/*

COPY llvm.sh /
RUN bash /llvm.sh

COPY create-links.sh /
RUN bash /create-links.sh

# Install Chromium

RUN git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git && cd depot_tools && git checkout 8dd74d4f85a739ff883831960c665b0a3a24ec36
ENV PATH="/depot_tools:${PATH}"

RUN mkdir /chromium
WORKDIR /chromium
RUN wget -q https://commondatastorage.googleapis.com/chromium-browser-official/chromium-96.0.4664.110.tar.xz 
RUN tar xf chromium-96.0.4664.110.tar.xz

WORKDIR /root

ENV CXX=g++
RUN git clone https://github.com/ninja-build/ninja.git -b v1.8.2 && cd ninja && git checkout 41156cd9c97a4e49473c473b7952f8cb7c43c56c
RUN cd ninja && ./configure.py --bootstrap
ENV PATH="/root/ninja:${PATH}"

RUN \
    rm -rf /chromium/chromium-96.0.4664.110/third_party/depot_tools/ninja \
    /chromium/chromium-96.0.4664.110/third_party/depot_tools/ninja-linux64 \
    /depot_tools/ninja \
    /depot_tools/ninja-linux64

RUN ln -s /root/ninja/ninja /chromium/chromium-96.0.4664.110/third_party/depot_tools/ninja
RUN ln -s /root/ninja/ninja-linux64 /chromium/chromium-96.0.4664.110/third_party/depot_tools/ninja-linux64
RUN ln -s /root/ninja/ninja /depot_tools/ninja
RUN ln -s /root/ninja/ninja-linux64 /depot_tools/ninja-linux64

WORKDIR /chromium/chromium-96.0.4664.110/

RUN python3 build/linux/unbundle/replace_gn_files.py --system-libraries flac libjpeg libxslt

RUN python3 tools/gn/bootstrap/bootstrap.py --skip-generate-buildfiles | grep 194

RUN cp out/Release/gn /chromium/chromium-96.0.4664.110/buildtools/linux64/gn

RUN build/linux/sysroot_scripts/install-sysroot.py --arch=arm64

RUN mkdir -p third_party/node/linux/node-linux-x64/bin/

RUN ln -s /usr/bin/node third_party/node/linux/node-linux-x64/bin/node

RUN git init
RUN gn gen --args='use_cups=false ffmpeg_branding="Chrome" proprietary_codecs=true use_vaapi=false use_gnome_keyring=false use_kerberos=false use_pulseaudio=false use_system_libjpeg=true use_system_freetype=false enable_js_type_check=false is_debug=false is_official_build=true use_lld=true use_gold=false symbol_level=0 enable_remoting=false enable_nacl=false use_sysroot=false treat_warnings_as_errors=false is_cfi=false disable_fieldtrial_testing_config=true chrome_pgo_phase=0 google_api_key="invalid-api-key" google_default_client_id="invalid-client-id" google_default_client_secret="invalid-client-secret" gold_path="" is_clang=true clang_base_path="/usr" clang_use_chrome_plugins=false target_cpu="arm64" max_jobs_per_link="16" use_cups=false ffmpeg_branding="Chrome" proprietary_codecs=true use_vaapi=false use_ozone=true ozone_auto_platforms=false ozone_platform_headless=true ozone_platform_wayland=true ozone_platform_x11=false use_system_wayland_scanner=true use_xkbcommon=true use_system_libwayland=true use_system_minigbm=true use_system_libdrm=true use_gtk=false use_wayland_gbm=false' out/Default/

COPY patches/6e12c13c0165c94615928ca3d9692e91cf0619c4.patch .
RUN patch -f -p1 < 6e12c13c0165c94615928ca3d9692e91cf0619c4.patch 

# chromium-wayland: https://github.com/OSSystems/meta-browser/tree/master/meta-chromium/recipes-browser/chromium/files/chromium-wayland
COPY patches/0001-ozone-add-va-api-support-to-wayland.patch .
COPY patches/0001-ozone-wayland-fix-re-initialization-of-WBMG.patch .
COPY patches/0001-ozone-wayland-fixed-terminate-caused-by-binding-to-wrong-version.patch .

RUN patch -f -p1 < 0001-ozone-add-va-api-support-to-wayland.patch
RUN patch -f -p1 < 0001-ozone-wayland-fix-re-initialization-of-WBMG.patch
RUN patch -f -p1 < 0001-ozone-wayland-fixed-terminate-caused-by-binding-to-wrong-version.patch

#https://github.com/OSSystems/meta-browser/tree/master/meta-chromium/recipes-browser/chromium/files
COPY patches/0007-Delete-compiler-options-not-available-in-release-ver.patch .
COPY patches/0014-ozone-wayland-don-t-build-xcb-for-pure-wayland-build.patch .
COPY patches/0015-IWYU-add-memory-for-std-unique_ptr-in-base-CommandLi.patch .

RUN patch -f -p1 < 0007-Delete-compiler-options-not-available-in-release-ver.patch
RUN patch -f -p1 < 0014-ozone-wayland-don-t-build-xcb-for-pure-wayland-build.patch
RUN patch -f -p1 < 0015-IWYU-add-memory-for-std-unique_ptr-in-base-CommandLi.patch

RUN autoninja -C out/Default/ chrome

CMD ["/bin/bash"]