# Lab 5 — Web UI Controlling LED (5-webapp-led)

## Goal

Combine a web interface with hardware control, allowing LED interaction through HTTP requests inside a containerized application.

---

## Why this matters

Modern embedded systems often expose user interfaces through web dashboards.  
Bridging web services with hardware control demonstrates how Linux® acts as an orchestration layer between UI and physical devices.

---

## What you will build

A web application running inside a container that can toggle LEDs on the device.

---

## Steps

# WebApp + LED

In this lab we extend the previous web application by integrating LED control.

> [!NOTE]
> Run the following commands on the device

Create and enter a directory:

```sh
device:~$ cd 5-webapp-led
```

Create the main application file:

```sh
vim webapp-led.py
```

[webapp-led.py](webapp-led.py)

Create the HTML interface:

```sh
vim index.html
```

[index.html](index.html)

Create the Dockerfile:

```sh
vim Dockerfile
```

[Dockerfile](Dockerfile)

Create docker-compose file:

```sh
vim docker-compose.yml
```

[docker-compose.yml](docker-compose.yml)

Build the container:

```sh
device:~$ docker build --tag webapp-led:latest .
```

List Docker images:

```sh
device:~$ docker image ls
```

Run using Docker Compose:

```sh
device:~$ docker compose up -d
```

Check running containers:

```sh
device:~$ docker ps
```

Check logs:

```sh
device:~$ docker logs webapp-led
```

Access the web interface from your browser:

http://DEVICE_IP:PORT

Stop container:

```sh
device:~$ docker compose down
```

Return one folder:

```sh
device:~$ cd ..
```

---

## Expected result

The web interface should allow toggling LEDs on and off directly from the browser.

---

## Transition to next lab

Next we extend hardware control by introducing MCU communication through a router interface.