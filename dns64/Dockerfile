# Copyright (c) 2019 Foundries.io
#
# SPDX-License-Identifier: BSD-3-Clause
#

FROM alpine:3.10

LABEL maintainer="Michael Scott <mike@foundries.io>"

RUN apk add --no-cache bind

COPY named.conf.template /etc/bind/named.conf.template
COPY db.rpz.template /etc/bind/db.rpz.template
COPY start.sh start.sh

EXPOSE 53/udp

WORKDIR /var/bind

ENTRYPOINT ["/start.sh"]
