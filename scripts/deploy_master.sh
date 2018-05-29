#!/bin/sh

set -ex

rsync -avz --delete -e "ssh -p ${SSH_PORT} -o StrictHostKeyChecking=no" dist/ ${SSH_USER}@harusamex.com:/var/www/homepage/

