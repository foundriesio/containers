#!/bin/sh
#
# Copyright (C) 2021 Foundries.IO
#
# SPDX-License-Identifier: MIT
#

#
# directory paths for setup and notifying
#
CBFILE=${CALLBACK_SCRIPT:-"/var/sota/aklite-callback.sh"}
TOML=${TOML_FILE:-"/etc/sota/conf.d/z-99-aklite-callback.toml"}

#
# Logging function: reports date/time to docker log
#
function log()
{
    echo "$(date +"%b %e %T") aklite-callback(docker): $*"
}

#
# Setup function for activating the callback mechanism
# with aktualizr-lite
#
function setup()
{
    #
    # Make sure callback file has not changed, otherwise change it
    #
    old="$(md5sum ${CBFILE} 2> /dev/null | cut -d ' ' -f 1)"
    new="$(md5sum $(basename ${CBFILE}) | cut -d ' ' -f 1)"
    if [[ ! -e $CBFILE ]] || [[ ! -e $TOML ]] || [[ "$old" != "$new" ]]
    then
        cp `basename ${CBFILE}` ${CBFILE}
        chmod 755 ${CBFILE}
        echo -e "[pacman]\ncallback_program = ${CBFILE}" > ${TOML}
    fi
}

###################################################################
#
# Start of process
#
###################################################################

log "Starting handling of aktualizr-lite callbacks"
setup

# start Python service
python3 /service.py
