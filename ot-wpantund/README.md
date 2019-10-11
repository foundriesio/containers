OpenThread user-space network interface driver/daemon that provides a native
IPv6 network interface to a low-power wireless Network Co-Processor (or NCP)
based on the OpenThread Border Router Docker implementation

For more information: [https://github.com/openthread/wpantund](https://github.com/openthread/wpantund).

This container is not designed for production use as the master network key
and commissioning secret are kept in clear text as docker parameters!

NOTE: The default settings are compatible with Zephyr RTOS OpenThread
implementation defaults.  If you are using for production or with a different
RTOS, change these settings as needed!

## How to use this image

```
docker run --privileged --network=host hub.foundries.io/ot-wpantund
```

Several parameters can be passed into the container at the end of the above
command:

- --ncp-path: path to NCP device node
  default: /dev/ttyACM0
- --interface: wpantund interface name
  default: wpan0
- --disable-default-prefix-route
  default: not disabled
- --disable-default-prefix-slaac
  default: not disabled
- --channel: 802.15.4 channel
  default: 11
- --chanmask: channel mask of available alternate channels
  default: 2048 (channel 11 is the only available channel)
- --panid: 802.15.4 network PAN id
  default: 0xABCD
- --extpanid: OpenThread Extended PAN id
  default: DEAD00BEEF00CAFE
- --key: Master network key
  default: 00112233445566778899aabbccddeeff
- --network-name: OpenThread network name
  default: ot_zephyr
- --agent-passphrase: External commissioning secret
  default: 123456
- --border-prefix-ipv6: IPv6 prefix used for border router
  default: fd11:22::
- --border-prefix-mask: IPv6 prefix mask used for border router
  default: 64

Example:
```
docker run --privileged --network=host hub.foundries.io/ot-wpantund \
    --ncp-path "/dev/ttyACM0" --interface wpan0 ---disable-default-prefix-route \
    --disable-default-prefix-slaac --channel 11 --chanmask 2048 \
    --panid "0xABCD" --extpanid "DEAD00BEEF00CAFE" \
    --key "00112233445566778899aabbccddeeff" \
    --network-name "ot_zephyr" --agent-passphrase "123456" \
    --border-prefix-ipv6 "fd11:22::" --border-prefix-mask 64
```
