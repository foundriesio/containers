# Lab 9 — Web App + LED + MCU + Voice AI (9-webapp-led-mcu-voice)

## Goal

Combine all previous concepts into a single embedded system:

- containerized web application
- MCU communication
- LED control
- local AI voice inference

This lab represents a realistic embedded Linux® product architecture.

---

## Why this matters

Modern embedded products integrate multiple layers:

- UI (web interface)
- application logic (containerized services)
- AI inference running locally
- hardware control via Linux® and MCU interaction

Understanding how these pieces connect is key to moving from prototype to production.

---

## What you will build

A full-stack embedded application where:

- a web interface runs inside a container
- voice commands are processed locally using an Edge Impulse model
- LEDs and MCU behavior are controlled based on AI decisions.

---

## Steps

# WebApp + LED + MCU + Voice

In this lab we combine all previous work into a single system.

> [!NOTE]
> The `deployment.eim` file is not distributed due to licensing. Use `deployment.eim.example` as a placeholder and add your own `deployment.eim` in this folder.

Create and enter directory:

```sh
device:~$ cd 9-webapp-led-mcu-voice
```

Copy model file:

```sh
device:~$ cp /path/to/deployment.eim .
```

Create main application:

```sh
vim webapp-led-mcu-voice.py
```

[webapp-led-mcu-voice.py](webapp-led-mcu-voice.py)

Create web interface:

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

Build container:

```sh
device:~$ docker build --tag webapp-led-mcu-voice:latest .
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
device:~$ docker logs webapp-led-mcu-voice
```

Open web interface in browser:

http://DEVICE_IP:PORT

Speak trained commands into microphone and observe:

- voice inference running locally
- web UI updates
- LED / MCU actions triggered

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

The system should:

- serve a web interface
- run local AI voice inference
- trigger hardware actions
- demonstrate complete embedded device workflow.

---

## Transition to next lab

Next step: connect devices to FoundriesFactory™ to manage deployment, updates, and lifecycle at scale.