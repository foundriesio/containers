#!/usr/bin/python3

# Copyright (c) 2021 Foundries.io
# All rights reserved.
#
# SPDX-License-Identifier: Apache-2.0

import logging

from http.server import HTTPServer, BaseHTTPRequestHandler
from typing import Optional

logging.basicConfig(level="INFO", format="%(asctime)s %(levelname)s: %(message)s")
log = logging.getLogger()

# HTTP HANDLER

class AktualizrCallbacks(BaseHTTPRequestHandler):

    def do_POST(self):
        length = int(self.headers["content-length"])
        buf = self.rfile.read(length)
        parts = buf.decode().split(",")

        log.debug("POST received")

        msg: str = ""
        current: str = ""
        status: Optional[str] = None

        try:
            if len(parts) == 3:
                msg, current, status = parts
            elif len(parts) == 2:
                msg, current = parts
            else:
                raise ValueError(buf)

            #
            # Current messages are:
            # - check-for-update-pre  return: none
            # - check-for-update-post return: none
            # - download-pre          return: none
            # - download-post         return: OK or FAILED
            # - install-pre           return: none
            # - install-post          return: NEEDS_COMPLETION, OK, or FAILED
            if msg == "check-for-update-pre":
                log.info("handle: %s", msg)
            elif msg == "check-for-update-post":
                log.info("handle: %s", msg)
            elif msg == "download-pre":
                log.info("handle: %s", msg)
            elif msg == "download-post":
                log.info("handle: %s(%s)", msg, status)
            elif msg == "install-pre":
                log.info("handle: %s", msg)
            elif msg == "install-post":
                log.info("handle: %s(%s)", msg, status)
            else:
                log.info("Ignoring callback msg: %s", msg)

        except Exception as e:
            log.error("error: %r", e)
            self.send_response(400)
            self.send_header("Content-type", "text/plain")
            self.end_headers()
            self.wfile.write(str(e).encode())
            return

        log.debug("POST response")
        self.send_response(201)
        self.send_header("Content-type", "text/plain")
        self.end_headers()
        self.wfile.write(b"OK\n")


if __name__ == "__main__":
    log.info("Starting listening server")
    httpd = HTTPServer(("", 8000), AktualizrCallbacks)
    httpd.serve_forever()
