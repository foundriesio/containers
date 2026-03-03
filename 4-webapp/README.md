# Lab 4 — Web Application Container (4-webapp)

## Goal

Learn how to run a simple web application inside a container and expose services through networking on an Embedded Linux® device.

---

## Why this matters

Embedded devices increasingly expose services through web interfaces. Running web services inside containers allows:

- easier deployment
- isolated application lifecycle
- reproducible environments across devices

---

## What you will build

A containerized Python web application accessible from your browser.

---

## Steps

# Web Application

In this lab we move from CLI applications to a network-accessible web service.

> [!NOTE]
> Run the following commands on the device

Create and enter a directory:

```sh
device:~$ cd 4-webapp
```

Create the web application file:

```sh
vim webapp.py
```

[webapp.py](webapp.py)

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
device:~$ docker build --tag webapp:latest .
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
device:~$ docker logs webapp
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

A web page served from inside the container should be accessible via browser.

---

## Transition to next lab

Next we will connect the web interface to real hardware (LED control).