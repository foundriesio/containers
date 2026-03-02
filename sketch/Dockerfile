FROM debian:trixie AS compile

RUN \
	apt update && \
	apt install -y wget

ARG CLI_VERSION=1.4.1
RUN \
	wget https://downloads.arduino.cc/arduino-cli/arduino-cli_${CLI_VERSION}_Linux_ARM64.tar.gz && \
	tar -xzf arduino-cli_${CLI_VERSION}_Linux_ARM64.tar.gz

RUN \
	./arduino-cli core install arduino:zephyr

COPY app-lab/sketch /sketch/

RUN \
	./arduino-cli compile -b arduino:zephyr:unoq --output-dir /sketch /sketch

FROM debian:trixie

RUN echo bump

# install libgpiod3 and slim down image
RUN \
        apt update && \
        apt install -y libgpiod3 && \
        rm -rf /var/cache/apt/archives /var/lib/apt/lists/ && \
        mkdir /tmp/bin && \
        mv /bin/readlink /tmp/bin/ && \
        mv /bin/dirname /tmp/bin/ && \
        mv /bin/bash /tmp/bin && \
        mv /bin/mv /tmp/bin && \
        rm -rf /bin/* && \
        /tmp/bin/mv /tmp/bin/* /bin/

COPY --from=compile /sketch/sketch.ino.elf-zsk.bin /
