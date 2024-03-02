#!/bin/sh
#
# Copyright (c) 2019 Foundries.io
#
# SPDX-License-Identifier: BSD-3-Clause
#

BIND_CONF_TEMPLATE="/etc/bind/named.conf.template"
BIND_CONF_USE="/var/bind/named.conf"

RPZ_ZONE_TEMPLATE="/etc/bind/db.rpz.template"
RPZ_ZONE_USE="/var/bind/db.rpz"

NAT64_PREFIX="64:ff9b::"
NAT64_MASK=96

function parse_args()
{
    while [ $# -gt 0 ]
    do
        case $1 in
        --nat64-prefix)
            NAT64_PREFIX=$2
            shift
            shift
            ;;
        --nat64-mask)
            NAT64_MASK=$2
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

# Create working copy of named.conf.template
cp ${BIND_CONF_TEMPLATE} ${BIND_CONF_USE}
sed -i -e "s/%NAT64_PREFIX%/${NAT64_PREFIX}\/${NAT64_MASK}/g" ${BIND_CONF_USE}

# Create an RPZ zone from db.rpz.template
cp ${RPZ_ZONE_TEMPLATE} ${RPZ_ZONE_USE}

# Use --add-host entries in /etc/hosts for DNS overrides
start_adding=0
while IFS= read -r line
do
	# HACK: detect the last line of a "normal" overridden /etc/hosts file
	if [[ "${line}" == "ff02::2	ip6-allrouters" ]]; then
		start_adding=1
		continue
	fi

	# Lines after the last normal line are added to the RPZ
	if [ ${start_adding} -eq 1 ]; then
		echo "${line}" | awk '{print $2 " A " $1}' >> ${RPZ_ZONE_USE}
	fi
done < "/etc/hosts"

# Run BIND on port 5354 so that we don't abort due to port 53 usage errors
/usr/sbin/named -c ${BIND_CONF_USE} -f -g -p 5354
