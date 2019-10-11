Interface Monitor container to support addition of IP address information
for dynamic interfaces (they may or may no be present all the time).

## How to use this image

```
docker run --privileged -v /var/run/dbus:/var/dbus --network=host hub.foundries.io/iface-monitor
```

The following parameters can be added to the docker run command line for
IPv6 prefix customization:

- --interface: network interface to monitor
  default: bt0
- --dyn-ip: IP address to add dynamically when interface comes up
  default: fd11:11::1/64

Example:
```
docker run --privileged -v /var/run/dbus:/var/dbus --network=host hub.foundries.io/iface-monitor \
    --interface lowpan0 --dyn-ip "fd11:33::1/64"
```
