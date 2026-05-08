# Base image used by Arduino Apps to run Python application logic.
# See: https://github.com/arduino/app-bricks-py/blob/release/0.9.0/containers/python-apps-base/Dockerfile
FROM ghcr.io/arduino/app-bricks/python-apps-base:0.9.0

USER root
# Ensure the application directory is owned by the 'arduino' user
RUN chown -R arduino:arduino /app

# Install script derived from the base image's run.sh (without the runtime execution part).
# See: https://github.com/arduino/app-bricks-py/blob/release/0.9.0/containers/python-apps-base/run.sh
COPY install.sh /install.sh

USER arduino

# Copy application source code into the container
ARG ARDUINO_APP=./app
COPY ${ARDUINO_APP}/ /app/

# Install application dependencies into the virtual environment
RUN /install.sh
