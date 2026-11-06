# Deploying SDA Central Church website to AWS EC2

This guide deploys the static site to an EC2 instance running **Nginx**, then
adds a free HTTPS certificate and points your domain `sdacentralchurchvizag.in`
to the server.

Commands assume **Ubuntu** on EC2. If you use **Amazon Linux 2023**, the only
difference is the package manager (`sudo dnf` instead of `sudo apt`) and the
Nginx config path (`/etc/nginx/conf.d/` instead of `sites-available`). Notes
for that are included at the bottom.

---

## Prerequisites
- An EC2 instance that is running
- Your key pair file (e.g. `church-key.pem`)
- The instance's **public IPv4 address** (from the EC2 console)
- Security Group inbound rules allowing:
  - **HTTP  (port 80)** from 0.0.0.0/0
  - **HTTPS (port 443)** from 0.0.0.0/0
  - **SSH   (port 22)** from your IP

---

## Step 1 — Install Nginx on the server

SSH into the instance (run from your PC / PowerShell):

```powershell
ssh -i "C:\path\to\church-key.pem" ubuntu@YOUR_EC2_PUBLIC_IP
```

Then on the server:

```bash
sudo apt update
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

Visit `http://YOUR_EC2_PUBLIC_IP` in a browser — you should see the default
Nginx welcome page. That confirms the server works.

---

## Step 2 — Create the web root

On the server:

```bash
sudo mkdir -p /var/www/sdacentralchurchvsp
sudo chown -R $USER:$USER /var/www/sdacentralchurchvsp
```

---

## Step 3 — Upload the website files

Run this **from your PC (PowerShell)**, from inside the project folder
`d:\SDA CENTRAL CHURCH`. It copies everything to the server web root.

```powershell
# From d:\SDA CENTRAL CHURCH
scp -i "C:\path\to\church-key.pem" -r `
  index.html about.html ministries.html sermons.html events.html resources.html give.html contact.html `
  robots.txt sitemap.xml assets `
  ubuntu@YOUR_EC2_PUBLIC_IP:/var/www/sdacentralchurchvsp/
```

(The `deploy` folder is not uploaded — it is only for you.)

Verify on the server:

```bash
ls /var/www/sdacentralchurchvsp
# should list index.html, assets, etc.
```

---

## Step 4 — Configure Nginx

Upload the provided config from your PC:

```powershell
scp -i "C:\path\to\church-key.pem" `
  deploy\nginx-sdacentralchurchvsp.conf `
  ubuntu@YOUR_EC2_PUBLIC_IP:/tmp/
```

Then on the server:

```bash
sudo mv /tmp/nginx-sdacentralchurchvsp.conf /etc/nginx/sites-available/sdacentralchurchvsp
sudo ln -s /etc/nginx/sites-available/sdacentralchurchvsp /etc/nginx/sites-enabled/
# remove the default site so it does not override ours
sudo rm -f /etc/nginx/sites-enabled/default
# test the config, then reload
sudo nginx -t
sudo systemctl reload nginx
```

Now `http://YOUR_EC2_PUBLIC_IP` should show the church website.

---

## Step 5 — Point your domain to the server (DNS)

In your DNS provider (Route 53 or wherever the domain is managed), create:

| Type | Name                        | Value                 |
|------|-----------------------------|-----------------------|
| A    | sdacentralchurchvizag.in     | YOUR_EC2_PUBLIC_IP    |
| A    | www.sdacentralchurchvizag.in | YOUR_EC2_PUBLIC_IP    |

TIP: Assign an **Elastic IP** to the instance first so the IP never changes
(EC2 console → Elastic IPs → Allocate → Associate to your instance). Use that
Elastic IP in the A records.

DNS can take a few minutes to a couple of hours to propagate. Check with:

```bash
nslookup sdacentralchurchvizag.in
```

---

## Step 6 — Enable HTTPS (free, auto-renewing)

Once the domain resolves to the server, install a Let's Encrypt certificate:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d sdacentralchurchvizag.in -d www.sdacentralchurchvizag.in
```

Follow the prompts (enter an email, agree to terms, choose to redirect HTTP to
HTTPS). Certbot updates the Nginx config automatically and sets up auto-renewal.

Verify renewal works:

```bash
sudo certbot renew --dry-run
```

Your site is now live at **https://sdacentralchurchvizag.in**.

---

## Updating the site later

Whenever you change files, re-run the upload (Step 3) and reload Nginx:

```bash
sudo systemctl reload nginx   # only needed if config changed; not for file updates
```

For plain file updates you just re-upload — no reload needed.

---

## Amazon Linux 2023 differences (if not using Ubuntu)

- Install Nginx: `sudo dnf install -y nginx`
- Default user is `ec2-user`, not `ubuntu` (use `ec2-user@YOUR_EC2_PUBLIC_IP`)
- No `sites-available`/`sites-enabled`. Instead:
  ```bash
  sudo mv /tmp/nginx-sdacentralchurchvsp.conf /etc/nginx/conf.d/sdacentralchurchvsp.conf
  sudo nginx -t && sudo systemctl reload nginx
  ```
- Certbot: `sudo dnf install -y certbot python3-certbot-nginx`
```
