#!/bin/sh

secret=/var/lib/rancher/k3s/.cluster-secret
if [ ! -f $secret ] ; then
	echo Generating random cluster secret
	cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1 > $secret
fi

# Copy to persistent directory so host can run commands
cp /bin/kubectl /var/lib/rancher/k3s/

export K3S_CLUSTER_SECRET=$(cat $secret)

exec k3s server --no-deploy traefik
