#!/usr/bin/env python3
#
# Copyright (c) 2025 Foundries.io
#
# SPDX-License-Identifier: BSD-3-Clause
#
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
