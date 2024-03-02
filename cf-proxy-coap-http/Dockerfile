# Copyright (c) 2019 Foundries.io
#
# SPDX-License-Identifier: BSD-3-Clause
#

# STAGE 1
FROM alpine:3.10 as cf-proxy-dev

LABEL maintainer="Michael Scott <mike@foundries.io>"

# Install build tools
RUN apk add --no-cache openjdk8 maven git

RUN mkdir -p ~/src

# Copy patches
COPY 0001-FIO-fromlist-Allowing-for-custom-executor-service-in.patch /root/src/
COPY 0002-FIO-fromlist-Made-cf-proxy-more-operational-still-ne.patch /root/src/
COPY 0003-FIO-fromlist-californium-proxy-fixes.patch /root/src/
COPY 0004-FIO-temphack-disable-RequestTest-which-breaks-build.patch /root/src/

# make cf-proxy and skip running the tests (which break in some arch/containers)
ENV CF_BRANCH=2.0.x
ENV CF_COMMIT_SHA=3f8a25f4462057b45c6b68e8f08429cd9bd0f59e
RUN cd ~/src && \
	git clone https://github.com/eclipse/californium -b ${CF_BRANCH} && \
	cd californium && \
	git reset --hard ${CF_COMMIT_SHA} && \
	git apply ../*.patch && \
	mvn clean install -DskipTests

# STAGE 2
# HACK: We are reverting to an older JRE version to avoid crash.  Alpine doesn't
#       let you control the JRE version which is installed so instead get it
#       directly from openjdk.
# TODO: Move back to alpine:latest and 8u212
FROM openjdk:8u201-jre-alpine

LABEL maintainer="Michael Scott <mike@foundries.io>"

# Californium version
ENV CF_VER=2.0.0

RUN apk add --no-cache openjdk8-jre-base

RUN mkdir -p /opt/cf-proxy
COPY Californium.properties /opt/cf-proxy
COPY ProxyMapping.properties /opt/cf-proxy
COPY Proxy.properties /opt/cf-proxy
COPY --from=cf-proxy-dev /root/src/californium/demo-apps/run/cf-proxy-${CF_VER}-SNAPSHOT.jar /opt/cf-proxy
COPY test.sh /test.sh

EXPOSE 5682/udp

CMD cd /opt/cf-proxy && java -jar cf-proxy-${CF_VER}-SNAPSHOT.jar
