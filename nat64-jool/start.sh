#!/bin/sh
#
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
