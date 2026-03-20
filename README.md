# Video Generic Object Detection ComposeApp

This repository serves as an example of how to bundle the
[Video Generic Object Detection](https://github.com/arduino/app-bricks-examples/tree/0.6.3/examples/video-generic-object-detection)
example application as a FoundriesFactory ComposeApp.

It can be added to your Factory by cloning your Factory's containers.git
and adding this as a submodule with:
```
 # from root of containers.git
 $ git submodule add -b unoq-video-generic-object-detection https://github.com/foundriesio/containers video-generic-object-detection
```

This example makes use of the [video object detection](https://github.com/arduino/app-bricks-py/blob/release/0.6.4/src/arduino/app_bricks/video_objectdetection)
brick to power the python application logic.

## How It Works

### Anatomy of an Application

All the demos included in Arduino App Lab are located in the
[app-bricks-example](https://github.com/arduino/app-bricks-examples/tree/0.6.3/examples)
GitHub repository.

Each application includes an [app.yaml](https://github.com/arduino/app-bricks-examples/blob/0.6.3/examples/video-generic-object-detection/app.yaml)
file that describes things the example needs. Namely, the "bricks"
required for the example to work.

Details about each brick are maintained in the
[app-bricks-py](https://github.com/arduino/app-bricks-py/tree/release/0.6.4/src/arduino/app_bricks)
repository on GitHub. Each brick includes a [brick_config.yaml](https://github.com/arduino/app-bricks-py/blob/release/0.6.4/src/arduino/app_bricks/web_ui/brick_config.yaml)
that describes things like port numbers and environment variables
used by the brick. Additionally, some bricks include overrides
for [Docker Compose](https://github.com/arduino/app-bricks-py/blob/release/0.6.4/src/arduino/app_bricks/video_objectdetection/brick_compose.yaml).

### Project Layout

 * `app-lab` - Source code for an apps-bricks-example
 * `py` - Logic to build the python Docker container image for the app.
   It includes a `docker-build.conf` file that instructs the Foundries
   CI system to use the root directory of the repository as the Docker
   build context so that it can access the app-lab sources.
 * `.ci-search-dirs` - A file that tells the Foundries CI system to look
   one level of directories down to find Dockerfiles to build. In this case, it will find the `py` directory and build a container, `unoq-video-generic-object-detection-py`.
 * `.composeappignores` - Tells the [composectl publish](https://github.com/foundriesio/composeapp)
   tool what files to include in the bundle. For App Lab demos, we only
   need a single `docker-compose.yml` file included.
 * `install.sh` - based on the `run.sh` script from the Arduino Python
   container image, this script installs the required Python
   dependencies used by your application.
 * `docker-compose.yml` - This is the base compose file used for App Lab
   demos merged with fields from the `brick_compose.yaml` files required
   by the application.
