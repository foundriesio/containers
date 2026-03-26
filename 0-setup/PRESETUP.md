

# Arduino UNO Q -- Workshop Master Setup Guide

This document consolidates all validated working steps used during
provisioning and workshop preparation.

------------------------------------------------------------------------

# 🔁 Reflash Debian Image

Official guide:

https://docs.arduino.cc/tutorials/uno-q/update-image/

Reflash the board before starting the setup to ensure a clean state.

```sh
cd ~/Downloads/arduino-flasher-cli-0.5.0-linux-amd64/
./arduino-flasher-cli flash arduino-unoq-debian-image-20251229-457.tar.zst
```

------------------------------------------------------------------------

# 🧰 Initial Setup via ADB

## 1️⃣ First Boot -- Mandatory Password Setup

After flashing, the board requires setting a password.

Set it to `arduino` (workshop default):

``` bash
adb shell "printf '%s\n%s\n' 'arduino' 'arduino' | passwd"
```

------------------------------------------------------------------------

## 2️⃣ Connect to Wi-Fi

``` bash
adb shell "nmcli dev wifi connect 'SSID' password 'PASSWORD'"
```

Verify:

``` bash
adb shell "ip addr show wlan0"
```

------------------------------------------------------------------------

# 🔐 Enable SSH (CRITICAL STEP)

After fresh flash, SSH service fails because host keys are missing.

Generate host keys:

``` bash
adb shell "echo 'arduino' | sudo -S ssh-keygen -A"
```

Enable and start SSH:

``` bash
adb shell "echo 'arduino' | sudo -S systemctl enable ssh"
adb shell "echo 'arduino' | sudo -S systemctl start ssh"
```

Verify:

``` bash
adb shell "echo 'arduino' | sudo -S systemctl status ssh --no-pager"
adb shell "ss -ltnp | grep ':22' || true"
```

Expected:

    Server listening on 0.0.0.0 port 22.

------------------------------------------------------------------------

## 3️⃣ Test SSH

From your computer:

``` bash
ssh arduino@<BOARD_IP>
```

Password:

    arduino

------------------------------------------------------------------------

# 🖥 Prevent Screen Sleep

Adb Command:

```sh
adb shell "echo 'arduino' | sudo -S sh -c 'mkdir -p /etc/X11/xorg.conf.d && cat > /etc/X11/xorg.conf.d/10-monitor.conf <<\"EOF\"
Section \"Monitor\"
    Identifier \"Monitor0\"
    Option \"DPMS\" \"false\"
EndSection

Section \"ServerFlags\"
    Option \"StandbyTime\" \"0\"
    Option \"SuspendTime\" \"0\"
    Option \"OffTime\" \"0\"
    Option \"BlankTime\" \"0\"
EndSection
EOF'"
```

------------------------------------------------------------------------

# Fioup


```sh
sudo apt update
sudo apt install -y apt-transport-https ca-certificates curl gnupg


curl -L https://fioup.foundries.io/pkg/deb/dists/stable/Release.gpg | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/fioup-stable.gpg

echo 'deb [signed-by=/etc/apt/trusted.gpg.d/fioup-stable.gpg] https://fioup.foundries.io/pkg/deb stable main' | sudo tee /etc/apt/sources.list.d/fioup.list


sudo apt update
sudo apt install -y fioup

sudo mkdir -p /var/sota
sudo chown -R $USER /var/sota

sudo usermod -aG docker $USER

sudo fioup register --api-token <TOKEN> --factory <FACTORY_NAME> --name <DEVICE_IP> --apps pingpong-webui

sudo -S sed -i '/^\[uptane\]/a polling_seconds = \"10\"' /var/sota/sota.toml

sudo grep -A3 '^\[uptane\]' /var/sota/sota.toml

sudo -S systemctl enable fioup
sudo -S systemctl start fioup

```


## Desktop icon (Chromium fullscreen)

Creates a desktop shortcut that launches Chromium in kiosk mode.

```sh
adb shell "mkdir -p /home/arduino/Desktop"

adb shell "cat << 'EOF' > /home/arduino/Desktop/App.desktop
[Desktop Entry]
Version=1.0
Type=Application
Name=App
Comment=
Exec=chromium --kiosk http://localhost:8000
Icon=audio-input-microphone
Path=
Terminal=false
StartupNotify=false
EOF"

adb shell "chmod 644 /home/arduino/Desktop/App.desktop"
adb shell "chown arduino:arduino /home/arduino/Desktop/App.desktop"
``` 

## Auto Start

Starts Chromium automatically in fullscreen kiosk mode after login.

```sh
adb shell "echo 'arduino' | sudo -S sh -c 'cat > /etc/xdg/autostart/kiosk.desktop <<\"EOF\"
[Desktop Entry]
Type=Application
Name=Kiosk
Exec=chromium --kiosk http://localhost:8000
X-GNOME-Autostart-enabled=true
EOF'"
```

## DISABLE APPLABS

```sh
adb shell "echo 'arduino' | sudo -S rm /etc/xdg/autostart/ArduinoAppLab.desktop"
```

## Auto Login

Enables automatic login for user `arduino` at boot.

```sh
adb shell "echo 'arduino' | sudo -S mkdir -p /etc/lightdm/lightdm.conf.d"

adb shell "echo 'arduino' | sudo -S sh -c 'cat > /etc/lightdm/lightdm.conf.d/50-autologin.conf <<\"EOF\"
[Seat:*]
autologin-user=arduino
autologin-user-timeout=0
EOF'"

adb shell "echo 'arduino' | sudo -S reboot"
```

------------------------------------------------------------------------

# 🐳 Docker Registry Mirror -- Workshop Setup (Optional)

## 1️⃣ Server Setup (Laptop)

``` bash
mkdir registry-mirror
cd registry-mirror
```

### config.yml

``` yaml
version: 0.1

log:
  level: info

http:
  addr: 0.0.0.0:5000

storage:
  filesystem:
    rootdirectory: /var/lib/registry

proxy:
  remoteurl: https://registry-1.docker.io
```

### docker-compose.yml

``` yaml
services:
  registry-mirror:
    image: registry:2
    container_name: registry-mirror
    restart: always
    ports:
      - "5000:5000"
    volumes:
      - ./config.yml:/etc/docker/registry/config.yml:ro
      - registry-data:/var/lib/registry

volumes:
  registry-data:
```

Start:

``` bash
docker compose up -d
```

Verify:

``` bash
curl http://localhost:5000/v2/
```

Expected:

    {}

------------------------------------------------------------------------

## 2️⃣ Configure Clients

Use your own mirror hostname and server IP in place of `pc-server` and `192.168.20.10`.

Add to `/etc/hosts`:
``` sh
echo "192.168.20.10   pc-server" | sudo tee -a /etc/hosts >/dev/null
```

Edit `/etc/docker/daemon.json`:

``` sh
sudo tee /etc/docker/daemon.json >/dev/null <<'EOF'
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "2"
  },
  "registry-mirrors": ["http://pc-server:5000"],
  "insecure-registries": ["pc-server:5000"]
}
EOF
```

Restart Docker:

``` bash
sudo systemctl restart docker
```

------------------------------------------------------------------------

## 3️⃣ Validate Mirror

On one board:

``` bash
docker pull debian:trixie-slim
```

On server:

``` bash
docker logs -f registry-mirror
```

------------------------------------------------------------------------

## 4️⃣ Pre-Warm Cache (Before Workshop)

``` bash
docker pull debian:trixie-slim
docker pull registry:2
docker pull python:3
```
------------------------------------------------------------------------

# 🌐 Static IP Configuration (Optional)

Set static IP example:

``` bash
adb shell "echo 'arduino' | sudo -S nmcli connection modify 'FoundriesWorkshop' ipv4.method manual ipv4.addresses 192.168.20.20/24 ipv4.gateway 192.168.20.1 ipv4.dns 8.8.8.8"
```

Restart connection:

``` bash
adb shell "echo 'arduino' | sudo -S nmcli connection down 'FoundriesWorkshop'"
adb shell "echo 'arduino' | sudo -S nmcli connection up 'FoundriesWorkshop'"
```

------------------------------------------------------------------------

## Revert Back to DHCP

``` bash
adb shell "echo 'arduino' | sudo -S nmcli connection modify 'FoundriesWorkshop' ipv4.method auto"
adb shell "echo 'arduino' | sudo -S nmcli connection down 'FoundriesWorkshop'"
adb shell "echo 'arduino' | sudo -S nmcli connection up 'FoundriesWorkshop'"
```