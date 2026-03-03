# 10 - FoundriesFactory™: From Prototype to Production

Up to this point in the workshop, we have:

- Built and run Docker containers on an embedded Linux® device
- Learned about container isolation and multi-stage builds
- Interacted with hardware from inside containers
- Trained and exported AI models using Edge Impulse
- Integrated AI inference into real applications running on the device

Now comes the real challenge:

👉 **How do we take this project to production?**

Building a working demo is one thing.  
Maintaining, securing, and scaling thousands of devices in the field is another.

---

## The Production Challenge

When moving from prototype to production, we must think about:

- Security hardening
- Secure Boot
- Device identity
- CVE monitoring and patching
- SBOM (Software Bill of Materials)
- OTA (Over-The-Air) updates
- Fleet management
- Continuous integration and testing
- Long-term maintenance
- Manufacturing provisioning
- Key management and update signing

Manually managing these aspects does not scale.

This is where **FoundriesFactory™** comes in.

---

## What is FoundriesFactory™?

FoundriesFactory™ is a cloud-based platform designed to manage the full lifecycle of embedded Linux® devices.

It provides:

- Secure Embedded Linux® (Yocto-based)
- Automated CI/CD pipelines
- CVE scanning and patch management
- SBOM generation
- Secure Boot integration
- TUF-based secure OTA updates
- Device identity and provisioning
- Fleet monitoring and management
- Scalable product development infrastructure

Instead of treating Linux®, containers, updates, and security as separate problems, FoundriesFactory™ integrates them into a unified workflow.

---

## Why This Matters

In real-world IoT and edge AI deployments:

- Devices must remain secure for years
- Vulnerabilities must be patched quickly
- Updates must be cryptographically signed
- Devices must have unique identities
- Teams must manage fleets remotely
- CI/CD must validate builds automatically

Without automation and infrastructure, maintaining a fleet becomes risky and expensive.

FoundriesFactory™ solves this by combining:

- Yocto-based secure Linux® foundations
- Containerized application workflows
- Cloud-based CI/CD
- Secure update frameworks (TUF)
- Built-in device management

---

## Intermediate Step: Fioup

Before using the full FoundriesFactory™ OTA system, we will introduce **Fioup**.

Fioup is a lightweight tool that enables container-based device management and updates.

It allows:

- Device registration to a Factory
- Container update management
- Remote application deployment
- Simplified fleet control

This is a practical intermediate step to demonstrate fleet management using containers.

---

## Installing Fioup

Reference: https://github.com/foundriesio/fioup/blob/main/docs/install.md

On your device, install fioup:

1. Update the `apt` package index and install packages needed to use the fioup `apt` repository:

	```bash
	sudo apt update
	sudo apt install -y apt-transport-https ca-certificates curl gnupg
	```

1. Download the public signing key for the package repositories:

	```bash
	curl -L https://fioup.foundries.io/pkg/deb/dists/stable/Release.gpg | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/fioup-stable.gpg
	```

1. Add the appropriate `apt` repository:

	```bash
	echo 'deb [signed-by=/etc/apt/trusted.gpg.d/fioup-stable.gpg] https://fioup.foundries.io/pkg/deb stable main' | sudo tee /etc/apt/sources.list.d/fioup.list
	```

1. Install fioup:

	```bash
	sudo apt update
	sudo apt install fioup
	```

1. Verify it is available:

```bash
fioup --version
```

---

## Registering the Device

Each device must be registered to the Factory.

Follow:

https://github.com/foundriesio/fioup/blob/main/docs/register-device.md

### As Non-Root User (Advanced)

Provide the user (`$USER`) with read/write access to the directory used by `fioup` to store configuration files, metadata, and Compose App blobs:

```bash
sudo mkdir -p /var/sota
sudo chown -R $USER /var/sota
```

Add the user to the Docker group so that `fioup` —when invoked by this user—can load app container images into the Docker Engine storage (requires access to the Docker Unix socket at `/var/run/docker.sock`).
You need to logout and log back in to apply this change.

```bash
sudo usermod -aG docker $USER
```

The host/device is now ready for registration with your Factory:

```bash
sudo fioup register --api-token <TOKEN> --factory <FACTORY_NAME> --name <DEVICE_IP> --apps pingpong-webui
```

After registration, your device should appear online in the FoundriesFactory™ dashboard.

---

## Updating Devices

Once devices are registered, you can:

- Push container updates
- Trigger updates remotely
- Monitor update status

Guide:

https://github.com/foundriesio/fioup/blob/main/docs/update-device.md

Check for available updates:

```bash
sudo fioup check
```

Output example:

```text
1 [arm64-linux-1]

2 [arm64-linux-2]
    arduino-asteroids-webuihub.foundries.io/demo-2026-arduino/arduino-asteroids-webui@sha256:054c24506450088959389ac3ac450de84dd7dac59015e69ecea378536e6368c9
    arduino-minesweeper-webuihub.foundries.io/demo-2026-arduino/arduino-minesweeper-webui@sha256:8f2b56a332374a598c679108a63876a0a08c75a315137335676d64d3244f81ea
    arduino-pingpong-webuihub.foundries.io/demo-2026-arduino/arduino-pingpong-webui@sha256:d929211e32ea0f140e443e7d36cc5a3b0ffd800544e1d8d648e87c818b8228ee

19 [arm64-linux-19]
    home-ai-webui       hub.foundries.io/demo-2026-arduino/home-ai-webui@sha256:859a3b39137ad9cf4e2b06bdb660a9e897c2af4e5ada94035fbaa847173c30db
    minesweeper-webui   hub.foundries.io/demo-2026-arduino/minesweeper-webui@sha256:2110242a6f5ce2f06bd215e45f12a53cb66d7a958a8c74c97357337d45b4331d
    pingpong-webui      hub.foundries.io/demo-2026-arduino/pingpong-webui@sha256:028fca09e4deccca8e1e7976197834cfc41784c58ab23a0be2ec5c924a9b2718
    asteroids-webui     hub.foundries.io/demo-2026-arduino/asteroids-webui@sha256:a8278a5982bd5f8974b70a3ecf565bead812b0874b1b082ad63756c32fb0beec

Current version: -1
Latest version:  19
Status:          Update available
```

Apply the update:

```bash
sudo fioup update
```

Output example:

```text
[1/6] Checking ... new update from -1 [] to 19 [pingpong-webui]
[2/6] Initializing ... fetch size: 248.9 MiB, 21 blobs; add: [pingpong-webui], remove: [], sync: [], update: []
[3/6] Fetching ... 
         100%  [=========================]  248.9 MiB / 248.9 MiB | 20/21 blobs | Cur:       0 B/s | Avg: 5.925 MiB/s | Time: 42s | ETA: 03:31:18 (done)

[4/6] Stopping ... done
[5/6] Installing ... 
        Installing app hub.foundries.io/demo-2026-arduino/pingpong-webui@sha256:028fca09e4deccca8e1e7976197834cfc41784c58ab23a0be2ec5c924a9b2718
        Loading image hub.foundries.io/demo-2026-arduino/pingpong-webui@sha256:620cb75955b597b1fb511bff1f3e549ec8a24fb15ebb3ec943884b17af80f64d
        	3ea0095  100%  [=========================]
        	478c658  100%  [=========================]
        	fc86965  100%  [=========================]
        	b13c373  100%  [=========================]
        	37adfe4  100%  [=========================]
        	0290d6c  100%  [=========================]
        	01d0684  100%  [=========================]
        	1c7a088  100%  [=========================]
        	2021373  100%  [=========================]
        	90d1a52  100%  [=========================]
        	35c38dc  100%  [=========================]
        	4f4fb70  100%  [=========================]
        	ce4576a  100%  [=========================]
        	46df292  100%  [=========================]
        Image loaded: hub.foundries.io/demo-2026-arduino/pingpong-webui@sha256:620cb75955b597b1fb511bff1f3e549ec8a24fb15ebb3ec943884b17af80f64d
      Done
[6/6] Starting ... 
	starting pingpong-webui --> hub.foundries.io/demo-2026-arduino/pingpong-webui@sha256:028fca09e4deccca8e1e7976197834cfc41784c58ab23a0be2ec5c924a9b2718 ... done
      Done
```

---

## Live Demonstration

At this stage:

- All devices should appear online in the Factory
- We will deploy a containerized application to all devices simultaneously
- The update will propagate through the fleet
- Devices will update securely and consistently

This demonstrates:

- Fleet-wide deployment
- Remote device management
- Secure update distribution
- Production-ready infrastructure

---

## Key Takeaway

What we built during this workshop is not just a demo.

By combining:

- AI model training (Edge Impulse)
- Containerized applications
- Secure Embedded Linux®
- CI/CD pipelines
- OTA infrastructure
- Device identity management

We now have a complete workflow:

**From vision to production-ready embedded AI devices.**

This is how modern embedded Linux® products are built at scale.