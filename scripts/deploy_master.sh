#!/bin/sh

set -ex

rsync -avz --delete -e "ssh -p ${SSH_PORT}" dist/ ${SSH_USER}@harusamex.com:/var/www/homepage/

