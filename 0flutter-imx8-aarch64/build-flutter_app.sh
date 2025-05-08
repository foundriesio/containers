#!/bin/bash
# Build Flutter
set -ex

export PATH=/opt/flutter-elinux/bin:$PATH
echo "export PATH=$PATH" > /etc/environment
export LD_LIBRARY_PATH=/opt/flutter-elinux/flutter/bin/cache/artifacts/engine/elinux-arm64-debug/

cd /root
git clone https://github.com/flutter/gallery 
cd /root/gallery
git checkout 1dfcd617a260e4468f0883d7dfbfdfe3d021f7b3
flutter-elinux config --enable-linux-desktop
flutter-elinux build linux --debug

