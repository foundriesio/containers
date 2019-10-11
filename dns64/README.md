DNS64 container based on [BIND project](https://gitlab.isc.org/isc-projects/bind9)
via Alpine Linux [BIND package](https://pkgs.alpinelinux.org/packages?name=bind).

This container acts like a normal DNS server, but when queried returns the
6-to-4 representation of an IPv4 address so that it can be used with NAT64.

Example:
```
$ nslookup -type=aaaa leshan.eclipse.org localhost
Server:         localhost
Address:        127.0.0.1:53

Non-authoritative answer:
Name:   leshan.eclipse.org
Address: 64:ff9b::527:53ce
```

## How to use this image

```
docker run --read-only --tmpfs=/var/bind --network=host hub.foundries.io/dns64
```

The following parameters can be added to the docker run command line:

- --forwarder-list: DNS forwarder IPv4 addresses separated by semi-colons
  default: 8.8.8.8; 8.8.8.4 (Google DNS servers)
- --nat64-prefix: NAT64 IPv6 prefix used to denote 6-to-4 transation
  default: 64:ff9b::
- --nat64-mask: NAT64 IPv6 prefix mask
  default: 96

Example:
```
docker run --read-only --tmpfs=/var/bind --network=host hub.foundries.io/dns64 \
    --forwarder-list "8.8.8.8; 8.8.8.4" --nat64-prefix "64:ff9b::" --nat64-mask 96
```
