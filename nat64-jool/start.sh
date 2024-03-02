#!/bin/sh
#
# Copyright (c) 2019 Foundries.io
#
# SPDX-License-Identifier: BSD-3-Clause
#

JOOL_NAT64_PREFIX="64:ff9b::/96"

function parse_args()
{
    while [ $# -gt 0 ]
    do
        case $1 in
        --nat64-prefix)
            JOOL_NAT64_PREFIX=$2
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

# Unload existing module
if [ ! -z "$(lsmod | grep jool)" ]; then
    echo "Removing installed jool.ko"
    rmmod jool.ko
fi

# Turn on forwarding
sysctl -w net.ipv6.conf.all.disable_ipv6=0
sysctl -w net.ipv6.conf.all.forwarding=1
sysctl -w net.ipv4.ip_forward=1

# Load Jool kernel module
echo "Installing jool module"
modprobe jool

echo "Setting up default pool"
jool instance add "default" --netfilter --pool6 ${JOOL_NAT64_PREFIX}

# Wait till cancel
while true; do sleep 60; done
