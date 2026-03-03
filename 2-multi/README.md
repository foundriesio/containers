# Lab 2 — Multi-stage Container (2-multi)

## Goal

Learn how multi-stage builds reduce image size and separate build/runtime environments while keeping the build process reproducible for Embedded Linux®.

---

## Why this matters

Embedded systems benefit from:

- smaller runtime images
- faster deployment
- reduced storage footprint
- improved security (build tools are removed from runtime)

Multi-stage builds allow separating build tooling from runtime artifacts.

---

## What you will build

A multi-stage Docker image that compiles and runs the `helloworld` application, keeping the final runtime image minimal.

---

## Steps

# Multi-stage Container [Project files](.)

A multi-stage container is a powerful Docker feature that enables you to build smaller, more efficient, and more secure container images.

Here's a simple explanation of why multi-stage containers are interesting and why they matter:

A multi-stage container utilizes multiple stages (or steps) in a single Dockerfile to:

- Build the application (e.g., compile code, install dependencies).
- Copy only the necessary files (e.g., the compiled binary or runtime files) to the final image.
- Discard the rest (e.g., build tools, intermediate files).

This results in a smaller and cleaner final image.

> [!NOTE]
> Run the following commands on the device

Create and enter a directory called `multi`:

```sh
device:~$ cd multi
```

You can also create each file by following the instructions below or use the following instructions to learn each file function.

To build a multi-stage image, you need a `helloworld.c` file:

```sh
vim helloworld.c
```

[helloworld.c](helloworld.c)

Unlike a normal distribution, a Docker container usually runs one app per container.

The file `start.sh` will be the shell script executed when running the Docker image:

```sh
vim start.sh
```

[start.sh](start.sh)

A quick explanation of this Dockerfile:

- `FROM AS builder`: starts from a Debian distro in the first stage and names it `builder`
- Everything included in this distribution version will be available
- `RUN echo "Final Stage"` is the last command in the first stage
- `FROM AS final-stage`: starts a new Debian image for runtime
- `apt-get update` is executed **without** installing build-essential
- `COPY --from=builder /app/helloworld /app/` copies the compiled binary from the first stage

Create the Dockerfile:

```sh
vim Dockerfile
```

[Dockerfile](Dockerfile)

With all the files in the same folder, build the container and add the tag `multi-stage:latest`.
Make sure to include the dot (`.`) at the end.

> [!NOTE]
> Docker commands must be executed from inside the `multi` folder.

```sh
device:~$ docker build --tag multi-stage:latest .
```

List Docker images:

```sh
device:~$ docker image ls
```

Launch the container with `-d` to detach it and `--name` to specify a name:

```sh
device:~$ docker run -it --rm --name multi-stage -d multi-stage
```

Check for the running container:

```sh
device:~$ docker ps
```

Jump inside the container:

```sh
device:~$ docker exec -it multi-stage /bin/bash
```

Inside the container, check installed files:

```sh
docker:~$ ls -l
```

Check if `gcc` is installed:

```sh
docker:~$ type gcc
```

Exit the container:

```sh
docker:~$ exit
```

Return one folder:

```sh
device:~$ cd ..
```

---

## Expected result

The application runs successfully and the final container image does **not** contain build tools like `gcc`.

---

## Transition to next lab

Next we move from software-only containers into interacting with real hardware (LED control).