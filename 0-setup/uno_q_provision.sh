\
#!/usr/bin/env bash
set -euo pipefail

# UNO Q Workshop Provisioning via ADB
# - Sets user password (first boot)
# - Connects to Wi-Fi
# - Enables SSH (generates host keys)
# - Optional: set static IP or DHCP
# - Optional: configure /etc/hosts + Docker registry mirror + restart docker
#
# Usage examples:
#   ./uno_q_provision.sh --ssid FoundriesWorkshop --wifi-pass '@FoundriesWorkshop123'
#   ./uno_q_provision.sh --serial 1710162692 --ssid FoundriesWorkshop --wifi-pass '@FoundriesWorkshop123' --password arduino
#   ./uno_q_provision.sh --ssid FoundriesWorkshop --wifi-pass '@FoundriesWorkshop123' --static-ip 192.168.20.20 --gateway 192.168.20.1 --dns 8.8.8.8
#   ./uno_q_provision.sh --ssid FoundriesWorkshop --wifi-pass '@FoundriesWorkshop123' --configure-mirror --server-ip 192.168.20.10 --mirror-host rauls-server

############################
# Defaults (override via args)
############################
SERIAL=""                         # If empty, uses the first "device" from adb devices
PASSWORD="arduino"                # Password to set for user (and used for sudo -S)
SSID="FoundriesWorkshop"
WIFI_PASS="@FoundriesWorkshop123"

# Network (optional)
USE_DHCP=1                        # default: DHCP
STATIC_IP=""                      # e.g., 192.168.20.20
GATEWAY="192.168.20.1"
DNS="8.8.8.8"

# Docker mirror (optional)
CONFIGURE_MIRROR=0
MIRROR_HOST="rauls-server"
SERVER_IP="192.168.20.10"         # server IP for /etc/hosts entry
MIRROR_PORT="5000"

# Safety toggles
DOCKER_RESTART=1                  # restart docker after daemon.json change

########################################
# Helpers
########################################
die() { echo "ERROR: $*" >&2; exit 1; }

usage() {
  cat <<EOF
UNO Q provisioning via ADB

Options:
  --serial <id>            ADB device serial (from: adb devices)
  --password <pass>        Password to set for 'arduino' user and used for sudo -S (default: $PASSWORD)

  --ssid <ssid>            Wi-Fi SSID (default: $SSID)
  --wifi-pass <pass>       Wi-Fi password (default: hidden)

  --static-ip <ip>         Configure static IPv4 (enables static mode)
  --gateway <ip>           Gateway for static IP (default: $GATEWAY)
  --dns <ip>               DNS for static IP (default: $DNS)
  --dhcp                  Force DHCP (default)

  --configure-mirror        Configure Docker registry mirror + /etc/hosts
  --server-ip <ip>          Server IP for /etc/hosts (default: $SERVER_IP)
  --mirror-host <name>      Hostname to map in /etc/hosts (default: $MIRROR_HOST)
  --mirror-port <port>      Mirror port (default: $MIRROR_PORT)
  --no-docker-restart       Do not restart docker (if you want to do it manually)

Examples:
  ./uno_q_provision.sh --ssid FoundriesWorkshop --wifi-pass '@FoundriesWorkshop123'
  ./uno_q_provision.sh --serial 1710162692 --ssid FoundriesWorkshop --wifi-pass '@FoundriesWorkshop123' --password arduino
  ./uno_q_provision.sh --ssid FoundriesWorkshop --wifi-pass '@FoundriesWorkshop123' --static-ip 192.168.20.20 --gateway 192.168.20.1 --dns 8.8.8.8
  ./uno_q_provision.sh --ssid FoundriesWorkshop --wifi-pass '@FoundriesWorkshop123' --configure-mirror --server-ip 192.168.20.10 --mirror-host rauls-server

EOF
}

pick_serial_if_needed() {
  if [[ -n "$SERIAL" ]]; then return 0; fi
  local first
  first="$(adb devices | awk 'NR>1 && $2=="device" {print $1; exit}')"
  [[ -n "$first" ]] || die "No ADB devices found. Check USB and run: adb devices"
  SERIAL="$first"
}

adbsh() {
  adb -s "$SERIAL" shell "$@"
}

sudo_sh() {
  local cmd="$1"
  adbsh "echo '$PASSWORD' | sudo -S sh -c \"$cmd\""
}

########################################
# Arg parsing
########################################
while [[ $# -gt 0 ]]; do
  case "$1" in
    --serial) SERIAL="${2:-}"; shift 2 ;;
    --password) PASSWORD="${2:-}"; shift 2 ;;
    --ssid) SSID="${2:-}"; shift 2 ;;
    --wifi-pass) WIFI_PASS="${2:-}"; shift 2 ;;

    --static-ip) STATIC_IP="${2:-}"; USE_DHCP=0; shift 2 ;;
    --gateway) GATEWAY="${2:-}"; shift 2 ;;
    --dns) DNS="${2:-}"; shift 2 ;;
    --dhcp) USE_DHCP=1; STATIC_IP=""; shift 1 ;;

    --configure-mirror) CONFIGURE_MIRROR=1; shift 1 ;;
    --server-ip) SERVER_IP="${2:-}"; shift 2 ;;
    --mirror-host) MIRROR_HOST="${2:-}"; shift 2 ;;
    --mirror-port) MIRROR_PORT="${2:-}"; shift 2 ;;
    --no-docker-restart) DOCKER_RESTART=0; shift 1 ;;

    -h|--help) usage; exit 0 ;;
    *) die "Unknown option: $1 (use --help)" ;;
  esac
done

pick_serial_if_needed

echo "==> Using ADB serial: $SERIAL"
echo "==> SSID: $SSID"
echo "==> DHCP: $USE_DHCP"
[[ -n "$STATIC_IP" ]] && echo "==> Static IP: $STATIC_IP  Gateway: $GATEWAY  DNS: $DNS"
[[ "$CONFIGURE_MIRROR" -eq 1 ]] && echo "==> Docker mirror: http://${MIRROR_HOST}:${MIRROR_PORT} (hosts: ${SERVER_IP} -> ${MIRROR_HOST})"

########################################
# 1) Set password (first boot)
########################################
echo "==> Setting password for 'arduino' user (value hidden)"
adbsh "printf '%s\n%s\n' '$PASSWORD' '$PASSWORD' | passwd" >/dev/null || die "passwd failed"

########################################
# 2) Connect Wi-Fi
########################################
echo "==> Connecting to Wi-Fi..."
adbsh "nmcli dev wifi connect '$SSID' password '$WIFI_PASS'" || die "nmcli wifi connect failed"

echo "==> IP info (wlan0):"
adbsh "ip -4 addr show wlan0 | grep inet || true"

########################################
# 3) Enable SSH (host keys + service)
########################################
echo "==> Ensuring SSH host keys exist..."
sudo_sh "ssh-keygen -A" >/dev/null || die "ssh-keygen -A failed"

echo "==> Enabling + starting SSH..."
sudo_sh "systemctl enable ssh >/dev/null 2>&1 || true"
sudo_sh "systemctl restart ssh" || die "systemctl restart ssh failed"

echo "==> SSH status:"
sudo_sh "systemctl status ssh --no-pager | sed -n '1,12p'" || true
adbsh "ss -ltnp | grep ':22' || true"

########################################
# 4) Optional: network static/DHCP
########################################
CONN="$SSID"

if [[ "$USE_DHCP" -eq 1 ]]; then
  echo "==> Setting IPv4 method: DHCP (auto) on connection '$CONN'"
  sudo_sh "nmcli connection modify '$CONN' ipv4.method auto" || true
else
  [[ -n "$STATIC_IP" ]] || die "Static mode selected but --static-ip is empty"
  echo "==> Setting IPv4 method: manual on connection '$CONN'"
  sudo_sh "nmcli connection modify '$CONN' ipv4.method manual ipv4.addresses '${STATIC_IP}/24' ipv4.gateway '$GATEWAY' ipv4.dns '$DNS'" || die "nmcli static IP config failed"
fi

echo "==> Cycling Wi-Fi connection..."
sudo_sh "nmcli connection down '$CONN' || true"
sudo_sh "nmcli connection up '$CONN'" || true

echo "==> Current IP (wlan0):"
adbsh "ip -4 addr show wlan0 | grep inet || true"

########################################
# 5) Optional: Docker mirror config
########################################
if [[ "$CONFIGURE_MIRROR" -eq 1 ]]; then
  echo "==> Adding /etc/hosts entry for mirror host (if missing)..."
  sudo_sh "grep -q '$MIRROR_HOST' /etc/hosts || echo '$SERVER_IP   $MIRROR_HOST' >> /etc/hosts"

  echo "==> Writing /etc/docker/daemon.json (logs + mirror + insecure registries)..."
  sudo_sh "cat > /etc/docker/daemon.json <<'EOF'
{
  \"log-driver\": \"json-file\",
  \"log-opts\": {
    \"max-size\": \"10m\",
    \"max-file\": \"2\"
  },
  \"registry-mirrors\": [\"http://${MIRROR_HOST}:${MIRROR_PORT}\"],
  \"insecure-registries\": [\"${MIRROR_HOST}:${MIRROR_PORT}\"]
}
EOF"

  echo "==> Validating docker config..."
  sudo_sh "dockerd --validate --config-file /etc/docker/daemon.json" || die "dockerd config validation failed"

  if [[ "$DOCKER_RESTART" -eq 1 ]]; then
    echo "==> Restarting docker..."
    sudo_sh "systemctl restart docker" || die "docker restart failed"
    echo "==> Docker mirror check:"
    sudo_sh "docker info 2>/dev/null | grep -i mirror -A2 || true" || true
  else
    echo "==> Skipping docker restart (--no-docker-restart)."
  fi
fi

echo "==> DONE."
echo "Next:"
echo "  - SSH: ssh arduino@<BOARD_IP>   (password: $PASSWORD)"
echo "  - If using mirror: try docker pull debian:trixie-slim on the board and watch mirror logs on the server."
