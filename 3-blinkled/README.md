# Lab 3 — BlinkLED (3-blinkled)

## Goal

Learn how to access hardware from inside a container and understand basic debugging when hardware permissions are missing.

---

## Why this matters

In embedded Linux® systems, applications frequently need access to hardware interfaces. Containers add isolation, which means hardware access sometimes requires additional configuration such as privileged mode.

---

## What you will build

A containerized application that toggles device LEDs using filesystem interfaces.

---

## Steps

# BlinkLED

Since this training focuses on Docker for embedded systems, we couldn’t miss a blinkLED example.

The Portenta X8 has two LEDs already configured in the file system.

```sh
USER_LED_PATHS=( "/sys/class/leds/blue:user/brightness" 
                 "/sys/class/leds/green:user/brightness"
                "/sys/class/leds/red:user/brightness" )

ALT_LED_PATHS=( "/sys/class/leds/blue:bt/brightness" 
                "/sys/class/leds/green:wlan/brightness"
                "/sys/class/leds/red:panic/brightness" )
```


During this example, we are going to start see the way of debugging problems that could happen when creating your Docker Apps.

Getting Started

Create and Enter a Directory

> [!NOTE]
> Run the following commands on the device

```sh
device:~$ cd blinkled
```

Build the blinkLed App

Start with the `blinkled.sh` file:

```sh
vim blinkled.sh
```

[blinkled.sh](blinkled.sh)

Create Your Dockerfile

```sh
vim Dockerfile
```

[Dockerfile](Dockerfile)

Build and Run the Container

With all the files in the same folder, build the container and add the tag `blinkled:latest` to it.

```sh
device:~$ docker build --tag blinkled:latest .
```

Listing all Docker Images

```sh
device:~$ docker image ls
```

Launch the Container

Launch the container with `-d` to detach it and `--name` to specify a name.

```sh
device:~$ docker run -it --rm --name blinkled -d blinkled:latest
```

Example output:

```
d948ce65d5d7ffe6a214211e946ba939db7f05994191763bde82e4f5e0ad4a8a
```

Debugging

At this point, you may wonder why the LEDs are not blinking.

Let’s debug:

Check the Running Images

```sh
device:~$ docker ps
```

Check the Logs of the Running Image

```sh
device:~$ docker logs blinkled
```

Example output:

```
blink = 1
blink = 0
blink = 1
blink = 0
blink = 1
```

The code is running, but the access to the gpio is not happening.

Stop the Running Container

```sh
device:~$ docker stop blinkled
```

Add Privilege to the Container

```sh
device:~$ docker run -it --rm -d --name blinkled --privileged blinkled:latest
```

Example output:

```
c08fe3dd70ab9c41d6f9d3c85bdc106af39c2d05d670088323f186fb485dbdb3
```

Recheck the Logs

```sh
device:~$ docker logs blinkled
```

Example output:

```
blink = 0
blink = 1
blink = 0
blink = 1
blink = 0
```

Remove the running docker:

```sh
docker:~$ docker rm -f blinkled
```

Return One Folder Up

```sh
device:~$ cd ..
```

For further details, refer to the Foundries.io lab4 hello-c README.

---

## Expected result

LEDs should begin blinking after running the container with the `--privileged` flag.

---

## Transition to next lab

Next we introduce a web interface to interact with containerized applications.