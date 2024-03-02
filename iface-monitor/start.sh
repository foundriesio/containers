#!/bin/sh
#
# Copyright (c) 2019 Foundries.io
#
# SPDX-License-Identifier: BSD-3-Clause
#

MON_INTERFACE="bt0"
MON_DYN_IP="fd11:11::1/64"
MON_SECONDS_DELAY="0"

function parse_args()
{
    while [ $# -gt 0 ]
    do
        case $1 in
        --interface)
            MON_INTERFACE=$2
            shift
            shift
            ;;
        --ip)
            MON_DYN_IP=$2
            shift
            shift
            ;;
        --seconds-delay)
            MON_SECONDS_DELAY=$2
            shift
            shift
            ;;
        *)
            shift
            ;;
        esac
    done
}

parse_args "$@"

# Make dbus symlink
rm -rf /run/dbus/
ln -s /var/dbus /run/dbus

# Run interface monitor
python2 /interface-monitor.py -i ${MON_INTERFACE} -d ${MON_DYN_IP} -s ${MON_SECONDS_DELAY}
