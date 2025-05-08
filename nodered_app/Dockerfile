# Copyright (c) 2021 Foundries.io
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
FROM nodered/node-red:1.3.7-10

LABEL maintainer="Raul Munoz <raul@foundries.io>"

COPY settings.js /data/settings.js
COPY flows_cred.json /data/flows_cred.json
COPY flows.json /data/flows.json

# You should add extra nodes via your package.json file but you can also add them here:
RUN npm install node-red-node-serialport@0.15.0

RUN npm install node-red-contrib-influxdb@0.6.1

RUN npm install node-red-contrib-device-stats@1.1.2

RUN npm install @candy-line/node-red-contrib-omron-2jcie-bu@1.0.1

RUN npm install node-red-node-random@0.4.0

