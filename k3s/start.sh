#!/bin/sh

secret=/var/lib/rancher/k3s/.cluster-secretj
if [ ! -f $secret ] ; then
	echo Generating random cluster secret
	openssl rand -base64 16 > $secret
fi

export K3S_CLUSTER_SECRET=$(cat $secret)

exec server --no-deploy traefik
