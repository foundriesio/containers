# Lab 1 — Hello World (C) in a Container (1-hello-c)

## Goal

In this lab you will:

- build your first Docker image on an Embedded Linux® device
- compile a C program inside the container (not on the host)
- run the container and inspect it with basic Docker commands.

This lab sets the foundation for the rest of the workshop.

---

## Why this matters

Embedded Linux® distributions are often optimized and minimal.
They typically do NOT include compilers (like GCC) or full developer toolchains.

If the device supports Docker, you can keep the base OS clean and still:

- compile and run applications
- keep builds reproducible
- separate the OS lifecycle from the application lifecycle.

---

## What you will build

A simple `helloworld.c` program compiled into a container image and executed by the container entrypoint.

---

## Steps

> [!NOTE]
> Run all commands on the device.

### 1) Create and enter a working directory

```sh
device:~$ cd hello-c
```

> [!WARNING]
> Spaces and formatting are important when copying file contents.
> Prefer copying from GitHub (or downloading the reference example) to avoid hidden characters.

### 2) Create helloworld.c

> [!NOTE]
> If you are not familiar with vim:
> - press ESC to ensure you are in command mode
> - press i (or a) to insert/append
> - press ESC again, then type :wq to save and quit

```sh
vim helloworld.c
```

Copy the contents from:

[helloworld.c](helloworld.c)

### 3) Create start.sh

Unlike a normal distribution, a container usually runs a single application per container.
This script will be executed when the container starts.

```sh
vim start.sh
```

Copy:

[start.sh](start.sh)

### 4) Create Dockerfile

The Dockerfile defines how the image is built (packages, files copied, build steps, and the final entrypoint).

```sh
vim Dockerfile
```

Copy:

[Dockerfile](Dockerfile)

---

## Dockerfile quick explanation

- FROM: start from a Debian slim base image
- RUN apt-get ...: install build tools (via build-essential)
- COPY: copy helloworld.c and start.sh into the image
- WORKDIR: set working directory
- RUN gcc ...: compile helloworld.c into an executable
- ENTRYPOINT: command executed when the container starts

---

## Build and run

### Build the image

```sh
device:~$ docker build --tag hello-c:latest .
```

### List images

```sh
device:~$ docker image ls
```

### Run the container

```sh
device:~$ docker run -it --rm hello-c:latest
```

---

## Expected result

You should see:

```text
hello, world!
hello, world!
```

---

## Docker Compose (optional)

Create the Compose file:

```sh
vim docker-compose.yml
```

Copy:

[docker-compose.yml](docker-compose.yml)

Run:

```sh
device:~$ docker compose up -d
```

Check running containers:

```sh
device:~$ docker ps
```

Read logs:

```sh
device:~$ docker logs hello-c
```

---

## Accessing a running container shell (docker exec)

```sh
device:~$ docker exec -it hello-c /bin/bash
```

Inside the container:

```sh
docker:~$ ls -l
docker:~$ type gcc
```

---

## Cleanup

```sh
device:~$ docker compose down
device:~$ cd ..
```

---

## Transition to next lab

In the next lab we introduce multi-stage builds to reduce image size and separate build/runtime environments.