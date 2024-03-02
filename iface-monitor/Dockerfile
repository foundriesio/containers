# Copyright (c) 2019 Foundries.io
#
# SPDX-License-Identifier: BSD-3-Clause
#

FROM alpine:3.10

LABEL maintainer="Michael Scott <mike@foundries.io>"

RUN apk add --no-cache dbus python2 py-dbus py-gobject3

COPY interface-monitor.py interface-monitor.py
COPY start.sh start.sh
RUN chmod +x /interface-monitor.py start.sh

# Make a dbus dir for volume mount / symlink
RUN mkdir -p /var/dbus

ENTRYPOINT ["/start.sh"]
