Eclipse Californium is a Java implementation of RFC7252 - Constrained
Application Protocol for IoT Cloud services. Thus, the focus is on scalability
and usability instead of resource-efficiency like for embedded devices.
Yet Californium is also suitable for embedded JVMs.

More information can be found at http://www.eclipse.org/californium/ and http://coap.technology/.

NOTE: There are 4 patches applied to the Californium cf-proxy project which do the following:

  * Concurrent CoAP resources
  * Additional CoAP proxy functionality provided by Matthias Kovatsch
  * Fixes to CoAP proxy provided by Matthias Kovatsch
  * Disable the RequestTest which breaks the build

## How to use this image

```
docker run -p 5682:5682/udp hub.foundries.io/cf-proxy-coap-http
```
