# Final stage
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
FROM grafana/grafana:8.5.3

LABEL maintainer="Raul Munoz <raul@foundries.io>"

USER grafana
ENTRYPOINT [ "/run.sh" ]
USER root
RUN apk add --no-cache vim git
USER 1000

COPY public /usr/share/grafana/public
COPY grafana.db /var/lib/grafana/grafana.db
COPY grafana.ini /etc/grafana/grafana.ini
COPY foundries.png /usr/share/grafana/public/img/
COPY grafana.png /usr/share/grafana/public/img/ 
COPY nodered.png /usr/share/grafana/public/img/
COPY influxdb.png /usr/share/grafana/public/img/

