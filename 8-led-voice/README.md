# Lab 8 — Voice Controlled LED (8-led-voice)

## Goal

Run the trained Edge Impulse model locally on the device and use voice commands to control hardware.

---

## Why this matters

This lab connects AI inference with real-world hardware control.

It demonstrates:

- running ML inference directly on an Embedded Linux® device
- integrating AI models inside containerized applications
- bridging voice recognition with physical device behavior

This is where proof-of-concept becomes product behavior.

---

## What you will build

A containerized application that:

- loads the exported `.eim` model
- listens to microphone input
- performs local inference
- toggles LEDs based on recognized voice commands.

---

## Steps

# LED + Voice

In this lab we use the model exported from Edge Impulse and execute inference locally.

> [!NOTE]
> The `deployment.eim` file is not distributed due to licensing. Use `deployment.eim.example` as a placeholder and add your own `deployment.eim` in this folder.

Create and enter a directory:

```sh
device:~$ cd 8-led-voice
```

Copy the deployment model into this folder:

```sh
device:~$ cp /path/to/deployment.eim .
```

Create the application file:

```sh
vim led-voice.py
```

[led-voice.py](led-voice.py)

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
device:~$ docker build --tag led-voice:latest .
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
device:~$ docker logs -f led-voice
```

Speak the trained commands (example: "green", "blue") near the microphone.

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

When a trained keyword is spoken:

- the model performs inference locally
- the corresponding LED action is triggered
- logs show classification confidence values

---

## Transition to next lab

Next we integrate voice recognition into a full web application, combining UI, MCU control, and AI inference into one embedded system.