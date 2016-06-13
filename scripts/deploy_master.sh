#!/bin/sh

set -ex

scp -r -P ${SCP_PORT} dist/ ${SCP_USER}@harusamex.com:${SCP_PATH}
