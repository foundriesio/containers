# STAGE 1
FROM alpine:latest as jool-dev

LABEL maintainer="Michael Scott <mike@foundries.io>"

ENV \
	JOOL_VERSION=4.0.4

RUN apk add --no-cache \
	bash git libc-dev make automake autoconf gcc libnl3-dev iptables-dev \
	libtool argp-standalone file

RUN \
	git clone https://github.com/NICMx/Jool -b v${JOOL_VERSION} && \
	cd Jool/ && \
	# Fix "struct option" related errors during build
	sed -i "s/#include <errno.h>/#include <errno.h>\n#include <getopt.h>/g" src/usr/argp/main.c && \
	./autogen.sh && \
	# We want a static binary for stage 2 (and this avoids linker issues with argp)
	./configure LDFLAGS="-static" && \
	cd src/usr/ && \
	make && \
	make install

# STAGE 2
FROM alpine:latest

LABEL maintainer="Michael Scott <mike@foundries.io>"

RUN apk add --no-cache libstdc++ libgcc libnl3 iptables

COPY --from=jool-dev /usr/lib/xtables/libxt_JOOL.so /usr/lib/xtables/
COPY --from=jool-dev /usr/local/bin/jool /usr/local/bin/
COPY --from=jool-dev /usr/local/share/man/man8/jool.8 /usr/share/man/man8/

COPY start.sh start.sh

ENTRYPOINT ["/start.sh"]
