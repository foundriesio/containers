#!/bin/sh
#
# Copyright (C) 2021 Foundries.IO
#
# SPDX-License-Identifier: MIT
#

#
# directory paths for setup and notifying
#
APP_NAME="$(dirname $0)/compose-apps/aklite-callback"
TOML="/etc/sota/conf.d/z-99-aklite-callback.toml"

#
# Logging function: reports date/time to docker log
#
function log()
{
    echo "$(date +"%b %e %T") aklite-callback(host): $*"
}

# delay seconds between retries (this is 5 times total)
RETRY_TIMEOUTS="1 5 10 30 60"
# wait time for a callback response (not counting retries)
INOTIFY_TIMEOUT=900

# First make sure this app is still installed:
# aktualizr-lite "uninstalls" a compose-app by basically running:
#   docker-compose stop; rm -rf /var/sota/compose-apps/<APP_NAME>
# we can detect we were deleted by looking for that directory:
if [ ! -d "${APP_NAME}" ] ; then
    if [ -f "${TOML}" ] ; then
        log "Container appears to be removed. disabling callback"
        rm "${TOML}"
    fi

    # this gets tricky: we need to restart aklite. We don't want to do
    # it when aklite is performing an update. To be safe we just exit
    # now and eventually aklite will restart and stop calling us.
    exit 0
fi

data="${MESSAGE},${CURRENT_TARGET}"
if [ -n "$RESULT" ] ; then
    data="${data},${RESULT}"
fi

for i in 1 2 4 8 16 ; do
    if wget --quiet --post-data="${data}" http://localhost:8000/ ; then
        exit 0
    fi
    log "Callback failure, retrying in $i seconds"
    sleep $i
done

log "Unable to notify callback"
exit 1
