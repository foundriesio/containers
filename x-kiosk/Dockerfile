FROM foundriesio/minideb:stretch

RUN install_packages \
  sudo \
  xorg \
  chromium \
  lightdm

COPY start.sh /usr/bin/start.sh
COPY xorg.conf /etc/X11/xorg.conf
RUN chmod a+x /usr/bin/start.sh

ENTRYPOINT ["/usr/bin/start.sh"]
