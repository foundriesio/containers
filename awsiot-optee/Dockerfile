FROM alpine:3.15 as p11

# A bit ahead of 3.17.0, to include support for secure element control (used by SE05X)
ENV OPTEE_CLIENT_VER "9a337049c52495e5e16b4a94decaa3e58fce793e"

WORKDIR /src

# build TEE client and headers
RUN apk add --virtual build-deps git build-base linux-headers
RUN \
	git clone https://github.com/OP-TEE/optee_client.git && \
	cd optee_client && git checkout ${OPTEE_CLIENT_VER} && \
	wget https://raw.githubusercontent.com/foundriesio/meta-lmp/mp-87/meta-lmp-base/recipes-security/optee/optee-client/0001-FIO-extras-pkcs11-change-UUID-to-avoid-conflict-with.patch && \
	patch -p1 < 0001-FIO-extras-pkcs11-change-UUID-to-avoid-conflict-with.patch && \
	make -C libteec/ && \
	make -C libseteec && \
	make -C libckteec

# build libp11
WORKDIR /src
RUN apk add openssl-dev cjson-dev util-linux-dev
RUN \
	wget https://github.com/OpenSC/libp11/releases/download/libp11-0.4.11/libp11-0.4.11.tar.gz && \
	tar xvzf libp11-0.4.11.tar.gz && \
	cd libp11-0.4.11 && \
	./configure && \
	make && \
	make install

FROM alpine:3.15 as aws
# build mosquitto with pkcs11
RUN apk add --virtual build-deps build-base cmake git linux-headers python3 python3-dev py3-pip
RUN pip3 install awsiotsdk==1.11.3

FROM alpine:3.15
RUN apk --no-cache add opensc openssl python3
ADD ["https://www.websecurity.digicert.com/content/dam/websitesecurity/digitalassets/desktop/pdfs/roots/VeriSign-Class 3-Public-Primary-Certification-Authority-G5.pem", "/etc/aws-ca.pem"]
ADD ["https://www.amazontrust.com/repository/AmazonRootCA3.pem", "https://www.amazontrust.com/repository/G2-RootCA3.pem", "https://www.amazontrust.com/repository/SFSRootCAG2.pem", "/etc/"]
RUN cat /etc/AmazonRootCA3.pem /etc/G2-RootCA3.pem /etc/SFSRootCAG2.pem > /etc/aws-ca.chained

COPY --from=p11 /src/optee_client/out/libteec/libteec.so* /usr/lib/
COPY --from=p11 /src/optee_client/out/libseteec/libseteec.so* /usr/lib/
COPY --from=p11 /src/optee_client/out/libckteec/libckteec.so* /usr/lib/
COPY --from=aws /usr/lib/python3.9/site-packages /usr/lib/python3.9/site-packages

COPY demo_pub.py /
CMD "/demo_pub.py"
