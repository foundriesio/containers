#!/usr/bin/env python3

import json
import os
import subprocess
import argparse
from tempfile import TemporaryDirectory
from time import sleep


# You must change the value(s) to match the location of your local PKI files
factory_cas = [
    ("<PATH_TO_PKI_DIR>/local-ca.pem", "<PATH_TO_PKI_DIR>/local-ca.key"),
]

# You can change these
iot_policy_name = "fio-blog"
iot_role_name = "fio-blog"

# You might want to update these
IOT_IAM_POLICIES = (
    "arn:aws:iam::aws:policy/service-role/AWSIoTThingsRegistration",
    "arn:aws:iam::aws:policy/service-role/AWSIoTLogging",
    "arn:aws:iam::aws:policy/service-role/AWSIoTRuleActions",
)

# This rule in particular is something you'll probably want to make more
# restrictive
IOT_POLICY = {
    "Version": "2012-10-17",
    "Statement": [{"Effect": "Allow", "Action": ["iot:*"], "Resource": ["*"]}],
}


def setup_iot_role(name: str, role_exists: bool) -> str:
    if role_exists:
        print("= Using pre-existing IOT Role", name)
        out = subprocess.check_output(["aws", "iam", "get-role", "--role-name", name])
    else:
        print("= Creating IOT Role", name)
        out = subprocess.check_output([
            "aws", "iam", "create-role",
            "--role-name", name,
            "--assume-role-policy-document",
            '{"Version": "2012-10-17","Statement": [{ "Effect": "Allow", "Principal": {"Service": "iot.amazonaws.com"}, "Action": "sts:AssumeRole"}]}',
        ])

    data = json.loads(out.decode())
    arn = data["Role"]["Arn"]

    for p in IOT_IAM_POLICIES:
        print("= Attaching policy", p)
        subprocess.check_output(
            ["aws", "iam", "attach-role-policy", "--role-name", name, "--policy-arn", p]
        )
    return arn


def create_iot_policy(name: str):
    print("= Creating IOT Policy", name)
    subprocess.check_output([
        "aws", "iot", "create-policy",
        "--policy-name", name,
        "--policy-document", json.dumps(IOT_POLICY),
    ])


def get_endpoint(type: str) -> str:
    out = subprocess.check_output(["aws", "iot", "describe-endpoint", "--endpoint-type", type])
    return json.loads(out.decode())["endpointAddress"]


def get_registration_config(provision_role_arn: str, policy_name: str) -> str:
    template_data = {
        "Parameters": {
            "AWS::IoT::Certificate::Id": {"Type": "String"},
            "AWS::IoT::Certificate::CommonName": {"Type": "String"},
            "AWS::IoT::Certificate::SerialNumber": {"Type": "String"},
        },
        "Resources": {
            "thing": {
                "Type": "AWS::IoT::Thing",
                "Properties": {
                    "ThingName": {"Ref": "AWS::IoT::Certificate::CommonName"},
                    "AttributePayload": {
                        "SerialNumber": {"Ref": "AWS::IoT::Certificate::SerialNumber"}
                    },
                },
            },
            "certificate": {
                "Type": "AWS::IoT::Certificate",
                "Properties": {
                    "CertificateId": {"Ref": "AWS::IoT::Certificate::Id"},
                    "Status": "ACTIVE",
                },
            },
            "policy": {
                "Type": "AWS::IoT::Policy",
                "Properties": {"PolicyName": policy_name},
            },
        },
    }
    return json.dumps({
        "templateBody": json.dumps(template_data),
        "roleArn": provision_role_arn,
    })


def register_ca(ca_cert: str, ca_key: str, reg_conf: str):
    print("= Getting CA registration code")
    out = subprocess.check_output(["aws", "iot", "get-registration-code"])
    code = json.loads(out.decode())["registrationCode"]

    with TemporaryDirectory() as tmpdir:
        ver_key = os.path.join(tmpdir, "ver.key")
        ver_csr = os.path.join(tmpdir, "ver.csr")
        ver_pem = os.path.join(tmpdir, "ver.pem")

        with open(ver_key, "wb") as f:
            subprocess.check_call(
                ["openssl", "ecparam", "-genkey", "-name", "prime256v1"],
                stdout=f,
            )

        ca_cnf = os.path.join(tmpdir, "ca.cnf")
        with open(ca_cnf, "w") as f:
            f.write(
                f"""[req]
prompt = no
distinguished_name = dn

[dn]
CN = {code}"""
            )

        subprocess.check_call([
            "openssl", "req", "-new", "-key", ver_key, "-out", "ver.csr", "-config", ca_cnf
        ])

        subprocess.check_call([
            "openssl", "x509", "-req", "-in", "ver.csr",
            "-CA", ca_cert,
            "-CAkey", ca_key,
            "-CAcreateserial",
            "-out", ver_pem,
            "-days", "1",
            "-sha256",
        ])

        subprocess.check_output([
            "aws", "iot", "register-ca-certificate",
            f"--ca-certificate=file://{ca_cert}",
            f"--verification-cert=file://{ver_pem}",
            "--set-as-active",
            "--allow-auto-registration",
            f"--registration-config={reg_conf}",
        ])

def get_el2g_registration_config(provision_role_arn: str, policy_name: str) -> str:
    template_data = {
        "Parameters": {
            "AWS::IoT::Certificate::Id": {"Type": "String"},
            "AWS::IoT::Certificate::CommonName": {"Type": "String"},
            "AWS::IoT::Certificate::SerialNumber": {"Type": "String"},
        },
        "Resources": {
            "thing": {
                "Type": "AWS::IoT::Thing",
                "Properties": {
                    "ThingName": {"Ref": "AWS::IoT::Certificate::CommonName"},
                    "AttributePayload": {
                        "SerialNumber": {"Ref": "AWS::IoT::Certificate::SerialNumber"}
                    },
                },
            },
            "certificate": {
                "Type": "AWS::IoT::Certificate",
                "Properties": {
                    "CertificateId": {"Ref": "AWS::IoT::Certificate::Id"},
                    "Status": "ACTIVE",
                },
            },
            "policy": {
                "Type": "AWS::IoT::Policy",
                "Properties": {"PolicyName": policy_name},
            },
        },
    }
    return json.dumps({
        "templateBody": json.dumps(template_data),
        "roleArn": provision_role_arn,
    })

def update_el2g_ca(ca_id: str, reg_conf: str):
    print(f"= CA ID is {ca_id}")
    print(f"= Attaching policy to CA")
    subprocess.check_output([
        "aws", "iot", "update-ca-certificate",
        f"--certificate-id={ca_id}",
        "--new-auto-registration-status",
        "ENABLE",
        f"--registration-config={reg_conf}",
        ])

if __name__ == "__main__":

    parser = argparse.ArgumentParser()
    parser.add_argument("--role-exists",
        help="Use this to specify that the IOT role is already created (default: %(default)s)",
        action="store_true")
    parser.add_argument("--policy-exists",
        help="Use this to specify that the IOT policy is already created (default: %(default)s)",
        action="store_true")
    parser.add_argument("-r", "--role-name", default=iot_role_name,
        help="AWS IOT role name (default: %(default)s)")
    parser.add_argument("-p", "--policy-name", default=iot_policy_name,
        help="AWS IOT policy name (default: %(default)s)")
    parser.add_argument("-c", "--factory-ca", nargs=2, action="append",
        help="Pair of paths pointing to factory CA certificate and private key, in this order. May be specified multiple times.")
    parser.add_argument("--update-el2g-ca",
        help="Update the EL2GO generated AWS IOT CA created with \"fioctl el2g config-aws-iot\" configuration with required IOT role and policy")
    args = parser.parse_args()

    iot_role_name = args.role_name
    iot_policy_name = args.policy_name

    if args.factory_ca:
        factory_cas = []
        for entry in args.factory_ca:
            factory_cas.append((entry[0], entry[1]))

    if not args.policy_exists:
        create_iot_policy(iot_policy_name)

    role_arn = setup_iot_role(iot_role_name, args.role_exists)

    print("= Sleeping a few seconds for IAM to sync")
    sleep(4)

    if args.update_el2g_ca:
        reg_conf = get_el2g_registration_config(role_arn, iot_policy_name)
        update_el2g_ca(args.update_el2g_ca, reg_conf)
    else:
        reg_conf = get_registration_config(role_arn, iot_policy_name)

        for cert, key in factory_cas:
            register_ca(cert, key, reg_conf)

    endpoint_verisign = get_endpoint("iot:Data")
    endpoint_ats = get_endpoint("iot:Data-ATS")
    print(f"= Factory devices can connect to endpoint VeriSign: {endpoint_verisign} or endpoint ATS: {endpoint_ats} using mTLS!")
