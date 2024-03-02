# Copyright (c) 2023 Foundries.io
#
# SPDX-License-Identifier: BSD-3-Clause
#

FROM alpine:3.16

ENV OPTEE_CLIENT_VER=3.18.0
ENV OPTEE_FIOVB_VER=4a353dec862f6dcad47e455c3074f3a4cb512f36

RUN apk --no-cache add git build-base linux-headers autoconf automake cmake

# build TEE client and headers
RUN git clone https://github.com/OP-TEE/optee_client.git && \
    cd optee_client && git checkout ${OPTEE_CLIENT_VER} && \
    make -C libteec/ && \
    cp -a out/libteec/libteec.* /usr/lib/ && \
    make -C libckteec/ && \
    cp -a out/libckteec/libckteec.* /usr/lib/ && \
    cp public/*.h /usr/include/ && cd ..

# build fiovb_printenv
RUN git clone https://github.com/foundriesio/optee-fiovb.git && \
    cd optee-fiovb && git checkout ${OPTEE_FIOVB_VER} && \
    cmake . && make -C fiovb/host/ && make install && \
    cp fiovb_printenv /usr/bin

COPY entrypoint.sh /

ENTRYPOINT ["/entrypoint.sh"]
