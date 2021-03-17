#
# Copyright (C) 2021 Foundries.IO
#
# SPDX-License-Identifier: MIT
#

FROM alpine:3.13.2

LABEL maintainer="Michael Scott <mike@foundries.io>"

RUN apk add --no-cache python3

COPY aklite-callback.sh /
COPY start.sh /
COPY service.py /

ENTRYPOINT ["/start.sh"]
