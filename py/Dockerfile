FROM ghcr.io/arduino/app-bricks/python-apps-base:0.6.2

USER root
RUN chown -R arduino:arduino /app

COPY install.sh /install.sh
USER arduino

# Copy App's source code
COPY app-lab /app/

# Install dependencies
RUN /install.sh
