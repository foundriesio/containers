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

OT_CONF_FILE=/var/run/wpantund.conf

# Zephyr-compatible defaults for OpenThread network
CHANNEL=11
CHANMASK=2048
PANID="0xABCD"
EXTPANID="DEAD00BEEF00CAFE"
KEY="00112233445566778899aabbccddeeff"
NETWORK_NAME="ot_zephyr"
AGENT_PASSPHRASE="123456"
BORDER_PREFIX_IPV6="fd11:22::"
BORDER_PREFIX_MASK=64

# wpantund defaults
NCP_PATH="/dev/ttyACM0"
TUN_INTERFACE_NAME="wpan0"
AUTO_PREFIX_ROUTE=true
AUTO_PREFIX_SLAAC=true

function parse_args()
{
    while [ $# -gt 0 ]
    do
        case $1 in
	# wpantund settings
        --ncp-path)
            NCP_PATH=$2
            shift
            shift
            ;;
        --interface|-I)
            TUN_INTERFACE_NAME=$2
            shift
            shift
            ;;
        --disable-default-prefix-route)
            AUTO_PREFIX_ROUTE=false
            shift
            ;;
        --disable-default-prefix-slaac)
            AUTO_PREFIX_SLAAC=false
            shift
            ;;

	# OpenThread Network Settings
        --channel)
            CHANNEL=$2
            shift
            shift
            ;;
        --chanmask)
            CHANMASK=$2
            shift
            shift
            ;;
        --panid)
            PANID=$2
            shift
            shift
            ;;
        --extpanid)
            EXTPANID=$2
            shift
            shift
            ;;
        --key)
            KEY=$2
            shift
            shift
            ;;
        --network-name)
            NETWORK_NAME=$2
            shift
            shift
            ;;
        --agent-passphrase)
            AGENT_PASSPHRASE=$2
            shift
            shift
            ;;
        --border-prefix-ipv6)
            BORDER_PREFIX_IPV6=$2
            shift
            shift
            ;;
        --border-prefix-mask)
            BORDER_PREFIX_MASK=$2
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

# Manually start dbus
mkdir -p /var/run/dbus && /usr/bin/dbus-daemon --system

# Generate wpantund.conf
echo "Config:NCP:SocketPath \"${NCP_PATH}\"" > ${OT_CONF_FILE}
echo "Config:TUN:InterfaceName ${TUN_INTERFACE_NAME} " >> ${OT_CONF_FILE}
echo "Daemon:SetDefaultRouteForAutoAddedPrefix ${AUTO_PREFIX_ROUTE}" >> ${OT_CONF_FILE}
echo "IPv6:SetSLAACForAutoAddedPrefix ${AUTO_PREFIX_SLAAC}" >> ${OT_CONF_FILE}

start-stop-daemon --start --background --quiet --exe /usr/local/sbin/wpantund -- -c ${OT_CONF_FILE}

# HACK: Wait for 5 seconds
sleep 5

# Clean up any previous mesh settings
wpanctl leave
sleep 1
wpanctl dataset erase
sleep 1
wpanctl reset
sleep 1

# Establish commissioner data
wpanctl setprop Network:PSKc --data $(pskc ${AGENT_PASSPHRASE} ${EXTPANID} ${NETWORK_NAME})
# Start mesh
wpanctl form -T router -p ${PANID} -x ${EXTPANID} -c ${CHANNEL} -m ${CHANMASK} -k ${KEY} ${NETWORK_NAME}
sleep 2

# Add border route prefix
wpanctl add-prefix -l ${BORDER_PREFIX_MASK} -r -s -f -a -o -P 1 ${BORDER_PREFIX_IPV6}

tail -F /dev/null

# Execute all the rest
exec "$@"
