This project is a small collections of containers and Docker App definitions
that the Linux microPlatform can be configured to use.

## shellhttpd
This is a minimal container that runs a dumb web server. Its useful for quick
sanity checks of platform functionality.

## x-kiosk
Runs the chromium browser inside a container and displays a website.

## k3s
Runs a minimal kubernetes installation using Rancher's k3s project. 

## aklite-callback-example
This is a minimal container that demonstrates how to get aktualizr-lite callbacks
into a container in an asynchronous way.

*NOTE: you may wish to review [Rancher's k3s minimum hardware requirements](https://rancher.com/docs/k3s/latest/en/installation/node-requirements/#hardware) to ensure you your device has memory to spare*
