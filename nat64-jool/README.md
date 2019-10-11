Jool is an Open Source SIIT and NAT64 for Linux.
For more information: [visit Jool website](https://www.jool.mx/en/index.html).

Specifically, this container sets up Jool kernel module for NAT64.

## How to use this image

```
docker run --privileged --network=host -v /lib/modules:/lib/modules:ro \
    hub.foundries.io/nat64-jool
```

The following parameter can be passed into the container at the end of the
above command:

- --nat64-prefix: destination IPv6 prefix denoting IPv4 NAT traffic
  (default: 64:ff9b::/96)

Example:
```
docker run --privileged --network=host -v /lib/modules:/lib/modules:ro \
    hub.foundries.io/nat64-jool --nat64-prefix "64:ff9b::/96"
```
