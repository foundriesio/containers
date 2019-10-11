# Copyright (C) 2019 Foundries.io
#
# SPDX-License-Identifier: Apache-2.0

import signal
import argparse
import dbus
import dbus.mainloop.glib
import subprocess
import os.path
import time
try:
    from gi.repository import GObject
except ImportError:
    import gobject as GObject

aborted = False

interface_name = ""
ip_address = ""
seconds_delay = 0

def iface_setup():
    # handle delay before adding IP
    if (seconds_delay > 0):
        time.sleep(seconds_delay)
    try:
        # check for existing IP
        subprocess.check_output("ip -6 address show dev " + interface_name + "| grep -q " + ip_address, shell=True)
    except subprocess.CalledProcessError as e1:
        print("[IM] interface: %s add IPv6 address: %s" % (interface_name, ip_address))
        try:
            subprocess.call("ip addr add " + ip_address + " dev " + interface_name, shell=True)
        except:
            print("[IM] Unexpected error adding IP address")
    except:
        print("[IM] Unexpected error checking for IP address")

def int_signal_handler(*args, **kwargs):
    if kwargs['member'] != "UnitNew" or len(args) != 2:
        return
    if "net-" + interface_name + ".device" not in args[0]:
        return
    print("[IM] interface: %s up trigger" % interface_name)
    iface_setup()

if __name__ == '__main__':
    dbus.mainloop.glib.DBusGMainLoop(set_as_default=True)

    parser = argparse.ArgumentParser(description="Network interface monitor")
    parser.add_argument("-i", "--interface", help='Network interface to monitor', required=True)
    parser.add_argument("-d", "--dyn-ip", help='Dynamic IP address to add to interface', required=True)
    parser.add_argument("-s", "--seconds-delay", help='Delay in seconds before adding IP address', type=int, default=0)
    args = parser.parse_args()

    interface_name = args.interface
    ip_address = args.dyn_ip
    seconds_delay = args.seconds_delay

    print("[IM] === Starting Interface Monitor ===")
    print("[IM] monitor interface  : %s" % interface_name)
    print("[IM] dynamic ip setting : %s" % ip_address)
    print("[IM] delay setting : %d" % seconds_delay)

    # add IP (if interface is up)
    if os.path.exists("/sys/class/net/" + interface_name):
        print("[IM] interface: %s is already up" % interface_name)
        iface_setup()

    bus = dbus.SystemBus()
    # add signal handler
    bus.add_signal_receiver(int_signal_handler,
                            path='/org/freedesktop/systemd1',
                            member_keyword='member')

    mainloop = GObject.MainLoop()
    mainloop.run()
