# Lab 6 — Web App + LED + MCU Integration (6-webapp-led-mcu)

## Goal

Extend the web-controlled LED application to communicate with an external MCU,
demonstrating how Embedded Linux® acts as a bridge between user interfaces and
low-level hardware control.

---

## Why this matters

Real embedded products rarely control hardware directly from a single layer.

Instead:

- Linux® acts as orchestration layer
- Containers run application logic
- MCUs handle realtime hardware tasks

Understanding this architecture is critical for scalable embedded system design.

---

## What you will build

A containerized web application capable of:

- serving a web interface
- controlling LEDs
- communicating with an MCU from inside the container.

---

## Steps

# WebApp + LED + MCU

In this lab we expand the previous example by integrating MCU communication.

> [!NOTE]
> Run the following commands on the device

Create and enter a directory:

```sh
device:~$ cd 6-webapp-led-mcu
```

Create the application file:

```sh
vim webapp-led-mcu.py
```

[webapp-led-mcu.py](webapp-led-mcu.py)

Create the HTML interface:

```sh
vim index.html
```

[index.html](index.html)

Create start script:

```sh
vim start.sh
```

[start.sh](start.sh)

Create Dockerfile:

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
device:~$ docker build --tag webapp-led-mcu:latest .
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
device:~$ docker logs webapp-led-mcu
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

The web interface should successfully control LEDs while communicating with the MCU backend.

---

## Transition to next lab

Next we introduce Edge Impulse and begin working with AI models on embedded devices.