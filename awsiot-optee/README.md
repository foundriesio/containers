This container and example Python script demonstrates how to use OP-TEE
and the awsiotsdk together so that a device with a secure element like
the SE05X can communicate with the AWS IOT MQTT service.

You can use the [AWS IOT JITP](https://foundries.io/insights/blog/aws-iot-jitp/)
blog as a guide for setting this up.

Run container on LmP:
    docker run -it -e AWS_ENDPOINT=<YOUR AWS ENDPOINT>.amazonaws.com -e SLOT_ID=0 --device=/dev/tee0:/dev/tee0 hub.foundries.io/lmp/awsiot-optee:postmerge

Note: change SLOT_ID if EL2GO agent uses a different one
