# Copyright (c) 2019 Foundries.io
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

# STAGE 1
FROM alpine:latest as wpantund-dev

# Based on work by Marcin K Szczodrak
LABEL maintainer="Michael Scott <mike@foundries.io>"

# Install build tools
RUN apk add --no-cache \
	libc-dev git make autoconf automake \
	dbus-dev libtool gcc g++ boost-dev readline-dev ctags \
	avahi-dev jsoncpp-dev

# Build autoconf-archive 2018.03.13
ENV AA_PKGNAME autoconf-archive
ENV AA_PKGVER 2018.03.13
ENV AA_FILE_MD5=46b13a5936372297b6d49980327a3c35

RUN mkdir -p ~/src && \
	cd ~/src/ && \
	wget https://ftpmirror.gnu.org/${AA_PKGNAME}/${AA_PKGNAME}-${AA_PKGVER}.tar.xz

RUN [ "$(md5sum ~/src/${AA_PKGNAME}-${AA_PKGVER}.tar.xz | cut -d ' ' -f1)" == "${AA_FILE_MD5}" ]

RUN cd ~/src/ && \
	tar -xvJf ${AA_PKGNAME}-${AA_PKGVER}.tar.xz && \
	cd ${AA_PKGNAME}-${AA_PKGVER} && \
	./configure  --prefix=/usr --sysconfdir=/etc --mandir=/usr/share/man --localstatedir=/var && \
	make && \
	make install

# Create symlink for jsoncpp includes
RUN ln -s /usr/include/ /usr/include/jsoncpp

# make wpantund
RUN cd ~/src && \
	git clone --recursive https://github.com/openthread/wpantund && \
	cd wpantund && \
	git reset --hard 8e6a5cf46dc58586e8d4f51881454657f473734c && \
	./bootstrap.sh && \
	./configure --sysconfdir=/etc --disable-ncp-dummy --enable-static-link-ncp-plugin=spinel && \
	make && \
	make install

ENV CXXFLAGS="-Wno-error"
# make border router / pskc tool
RUN cd ~/ && \
	cd ~/src && \
	git clone --recursive https://github.com/openthread/borderrouter && \
	cd borderrouter && \
	git reset --hard f42c113f3bce40b7b0066af405b99fcf09f7c98c && \
	./bootstrap && \
	./configure && \
	make && \
	cp tools/pskc /usr/local/sbin/

# STAGE 2
FROM alpine:latest

LABEL maintainer="Michael Scott <mike@foundries.io>"

RUN apk add --no-cache libstdc++ libgcc dbus readline net-tools openrc

RUN mkdir -p /dev/net && \
    mknod -m 600 /dev/net/tun c 10 200

COPY --from=wpantund-dev /usr/local/share/man/man1/wpanctl.1 /usr/local/share/man/man1/wpanctl.1
COPY --from=wpantund-dev /usr/local/share/man/man1/wpantund.1 /usr/local/share/man/man1/wpantund.1
COPY --from=wpantund-dev /usr/local/share/wpantund /usr/local/share/wpantund
COPY --from=wpantund-dev /usr/local/include/wpantund /usr/local/include/wpantund
COPY --from=wpantund-dev /usr/local/bin/wpanctl /usr/local/bin/wpanctl
COPY --from=wpantund-dev /usr/local/sbin/wpantund /usr/local/sbin/wpantund
COPY --from=wpantund-dev /etc/dbus-1/system.d/wpantund.conf /etc/dbus-1/system.d/wpantund.conf
COPY --from=wpantund-dev /usr/local/sbin/pskc /usr/local/sbin/pskc

COPY start.sh start.sh

ENTRYPOINT ["/start.sh"]
