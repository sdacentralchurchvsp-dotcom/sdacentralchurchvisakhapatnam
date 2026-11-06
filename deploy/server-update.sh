#!/usr/bin/env bash
# ============================================================
# Pull the latest website files from S3 onto this server.
# Run on the EC2 server whenever you want to update the live site:
#     bash ~/update.sh
# ============================================================
set -euo pipefail

BUCKET="s3://sdacentral-deploy-2026/SDA CENTRAL CHURCH/"
WEBROOT="/var/www/sdacentralchurchvsp"

echo ">> Syncing from ${BUCKET} ..."
aws s3 sync "${BUCKET}" "${WEBROOT}" --delete
echo ">> Reloading Nginx..."
sudo systemctl reload nginx
echo ">> Live site updated at $(date)"
