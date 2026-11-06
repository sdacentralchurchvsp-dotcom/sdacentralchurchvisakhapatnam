#!/usr/bin/env bash
# ============================================================
# One-shot server setup for SDA Central Church static website
# Target: Ubuntu 22.04 / 24.04 on AWS EC2
# Run this ONCE on the EC2 instance after first login.
# Usage:
#   chmod +x server-setup.sh
#   ./server-setup.sh
# ============================================================
set -euo pipefail

DOMAIN="sdacentralchurchvsp.org"
WEBROOT="/var/www/sdacentralchurchvsp"

echo ">> Updating packages..."
sudo apt update
sudo apt install -y nginx

echo ">> Enabling and starting Nginx..."
sudo systemctl enable nginx
sudo systemctl start nginx

echo ">> Creating web root at ${WEBROOT}..."
sudo mkdir -p "${WEBROOT}"
sudo chown -R "$USER":"$USER" "${WEBROOT}"

echo ">> Writing Nginx site config..."
sudo tee /etc/nginx/sites-available/sdacentralchurchvsp >/dev/null <<NGINX
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} www.${DOMAIN};

    root ${WEBROOT};
    index index.html;

    location / {
        try_files \$uri \$uri/ =404;
    }

    location ~* \.(?:css|js|jpg|jpeg|png|gif|ico|svg|webp|pdf|woff2?)\$ {
        expires 30d;
        add_header Cache-Control "public, max-age=2592000";
        access_log off;
    }

    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;
    gzip_min_length 256;

    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
NGINX

echo ">> Enabling site and disabling default..."
sudo ln -sf /etc/nginx/sites-available/sdacentralchurchvsp /etc/nginx/sites-enabled/sdacentralchurchvsp
sudo rm -f /etc/nginx/sites-enabled/default

echo ">> Testing and reloading Nginx..."
sudo nginx -t
sudo systemctl reload nginx

echo ""
echo ">> Server is ready."
echo ">> Web root: ${WEBROOT}"
echo ">> Next: upload the website files into that folder (see DEPLOY-EC2.md Step 3),"
echo ">> point DNS to this server's IP, then run:"
echo "     sudo apt install -y certbot python3-certbot-nginx"
echo "     sudo certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}"
