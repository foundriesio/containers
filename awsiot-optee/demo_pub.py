#!/usr/bin/python3
import json
import os
import subprocess
from time import time, sleep
from uuid import uuid4

from awscrt import mqtt
from awscrt import io
from awsiot import mqtt_connection_builder
from awscrt.exceptions import AwsCrtError

PIN = os.environ.get("PKCS11_PIN", "87654321")
LIB = os.environ.get("PKCS11_LIB", "/usr/lib/libckteec.so.0")
TOPIC = os.environ.get("TOPIC", "se050/demo")
AWS_CA =  os.environ.get("AWS_CA", "/etc/aws-ca.chained")
TOKEN_LABEL = os.environ.get("TOKEN_LABEL", "aktualizr")

# The slot 5 and pkey label are set by:
# https://github.com/foundriesio/meta-lmp/pull/750/
CERT_SLOT = os.environ.get("CERT_SLOT", "05")
PKEY_LABEL = os.environ.get("PKEY_LABEL", "SE_83000044")

ENDPOINT = os.environ["AWS_ENDPOINT"]
pkcs11_lib = None


def load_cert() -> bytes:
    p = subprocess.run(
        ["pkcs11-tool", f"--module={LIB}", "--read-object", "--type=cert", f"--id={CERT_SLOT}"],
        capture_output=True
    )
    if p.returncode:
        pem = open("/var/sota/client.chained", "rb").read()
    else:
        pem = subprocess.check_output(["openssl", "x509", "-inform", "der"], input=p.stdout)
    return pem


def build_pkcs11_mqtt_connection(on_interrupted, on_resumed):
    print("Loading client cert...")
    cert_bytes = load_cert()

    global pkcs11_lib
    if not pkcs11_lib:
        print(f"Loading PKCS#11 library '{LIB}'...")
        pkcs11_lib = io.Pkcs11Lib(
            file=LIB, behavior=io.Pkcs11Lib.InitializeFinalizeBehavior.STRICT
        )

    mqtt_connection = mqtt_connection_builder.mtls_with_pkcs11(
        pkcs11_lib=pkcs11_lib,
        user_pin=PIN,
        private_key_label=PKEY_LABEL,
        token_label=TOKEN_LABEL,
        cert_bytes=cert_bytes,
        endpoint=ENDPOINT,
        on_connection_interrupted=on_interrupted,
        on_connection_resumed=on_resumed,
        client_id=str(uuid4()),
        clean_session=False,
        keep_alive_secs=30,
        ca_filepath=AWS_CA,
    )
    return mqtt_connection


# Callback when connection is accidentally lost.
def on_connection_interrupted(connection, error, **kwargs):
    print("Connection interrupted. error: {}".format(error))


# Callback when an interrupted connection is re-established.
def on_connection_resumed(connection, return_code, session_present, **kwargs):
    print(
        "Connection resumed. return_code: {} session_present: {}".format(
            return_code, session_present
        )
    )


if __name__ == "__main__":
    print(f"Connecting to {ENDPOINT}...")

    try:
        mqtt_connection = build_pkcs11_mqtt_connection(
            on_connection_interrupted, on_connection_resumed
        )
        connect_future = mqtt_connection.connect()
        connect_future.result()
        print("Connected!")
    except AwsCrtError as e:
        print(f"Error code: {e.code}")
        print(f"Error name: {e.name}")
        print(f"Error message: {e.message}")
        if e.name == "AWS_ERROR_MQTT_UNEXPECTED_HANGUP":
            # ignore error during 1st connection
            # this is AWS issue. Wait for 5 sec to avoid HANGUP again
            sleep(5)
            mqtt_connection = build_pkcs11_mqtt_connection(
                on_connection_interrupted, on_connection_resumed
            )
            connect_future = mqtt_connection.connect()
            connect_future.result()
            print("Connected!")
        else:
            raise e

    payload = json.dumps({"time": time()})
    mqtt_connection.publish(topic=TOPIC, payload=payload, qos=mqtt.QoS.AT_LEAST_ONCE)

    # Disconnect
    print("Disconnecting...")
    disconnect_future = mqtt_connection.disconnect()
    disconnect_future.result()
    print("Disconnected!")
