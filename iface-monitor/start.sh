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
