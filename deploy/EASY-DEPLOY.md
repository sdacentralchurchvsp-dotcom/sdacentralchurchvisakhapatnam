# Easy Deploy — SDA Central Church → AWS EC2 (no key file, all in browser)

This is the simplest way to get the site live. You do NOT need an SSH client,
a .pem key, or any local setup. Everything happens in the AWS Console using
**EC2 Instance Connect** (a browser terminal).

Your instance:
- Name: sdacentralchurch
- Public IP: 65.0.135.2  (see note about Elastic IP at the end)
- Region: ap-south-1 (Mumbai)

------------------------------------------------------------
## STEP 0 — Open a browser terminal on the server
------------------------------------------------------------
1. In the AWS Console, go to **EC2 → Instances**.
2. Select the **sdacentralchurch** instance (checkbox).
3. Click the **Connect** button (top right).
4. Choose the **EC2 Instance Connect** tab → click **Connect**.
   A black terminal opens in your browser, logged into the server.

If "EC2 Instance Connect" says it cannot connect, it usually means the
Security Group is missing SSH. Fix: EC2 → the instance → Security tab →
click the security group → Edit inbound rules → Add rule:
   Type SSH, Port 22, Source: Anywhere-IPv4 (0.0.0.0/0) → Save.
Then try Connect again.

------------------------------------------------------------
## STEP 1 — Install the web server (paste into the terminal)
------------------------------------------------------------
Copy this whole block, paste it into the browser terminal, press Enter.
(It auto-detects Ubuntu vs Amazon Linux.)

```
if command -v apt >/dev/null 2>&1; then
  sudo apt update && sudo apt install -y nginx unzip
  NGDIR=/etc/nginx/sites-available; ENDIR=/etc/nginx/sites-enabled
else
  sudo dnf install -y nginx unzip
  NGDIR=/etc/nginx/conf.d; ENDIR=""
fi
sudo systemctl enable nginx && sudo systemctl start nginx
sudo mkdir -p /var/www/sdacentralchurchvsp
echo "Web server installed."
```

------------------------------------------------------------
## STEP 2 — Configure the site (paste next)
------------------------------------------------------------
```
sudo tee /etc/nginx/conf.d/sdacentralchurchvsp.conf >/dev/null <<'NGINX'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name sdacentralchurchvizag.in www.sdacentralchurchvizag.in _;
    root /var/www/sdacentralchurchvsp;
    index index.html;
    location / { try_files $uri $uri/ =404; }
    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;
}
NGINX
# On Ubuntu, remove the default site so ours wins:
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
echo "Site configured."
```

------------------------------------------------------------
## STEP 3 — Get the website files onto the server
------------------------------------------------------------
See UPLOAD-VIA-S3.md — you upload one zip to an S3 bucket in the console,
then paste one command here to pull and unpack it. (No key/SSH needed.)

------------------------------------------------------------
## STEP 4 — Point the domain + enable HTTPS
------------------------------------------------------------
1. Allocate an Elastic IP and associate it to the instance
   (EC2 → Elastic IPs → Allocate → Associate). Use that IP below.
2. In your DNS, add A records for sdacentralchurchvizag.in and
   www.sdacentralchurchvizag.in pointing to the Elastic IP.
3. Once the domain resolves, enable free HTTPS (paste in terminal):
```
if command -v apt >/dev/null 2>&1; then sudo apt install -y certbot python3-certbot-nginx; else sudo dnf install -y certbot python3-certbot-nginx; fi
sudo certbot --nginx -d sdacentralchurchvizag.in -d www.sdacentralchurchvizag.in
```
