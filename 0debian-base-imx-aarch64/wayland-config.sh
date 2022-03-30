#!/bin/bash

export FIO_HOME="/home/weston"
export FIO_USERID=63
export FIO_USERNAME="weston"

groupadd -g 61 render

if [ ! "${FIO_USERID}" = "0" ]; then \
    groupadd -g ${FIO_USERID} ${FIO_USERNAME}; \
    useradd -d ${FIO_HOME} -s /bin/bash -m ${FIO_USERNAME} -u ${FIO_USERID} -g ${FIO_USERID} -G video,render; \
fi

echo "export WAYLAND_USER=weston" >> /etc/bash.bashrc
echo "export XDG_RUNTIME_DIR=/run/user/63" >> /etc/bash.bashrc
echo "export WAYLAND_DISPLAY=wayland-0" >> /etc/bash.bashrc
