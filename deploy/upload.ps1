# ============================================================
# Upload the SDA Central Church website to the EC2 server.
# Run this from your PC (PowerShell), from the project root
#   d:\SDA CENTRAL CHURCH
#
# EDIT the two variables below, then run:
#   powershell -ExecutionPolicy Bypass -File deploy\upload.ps1
# ============================================================

# --- EDIT THESE ---
$KeyPath = "C:\path\to\church-key.pem"     # your .pem key file
$Server  = "ubuntu@YOUR_ELASTIC_IP"        # e.g. ubuntu@13.234.56.78
# ------------------

$WebRoot = "/var/www/sdacentralchurchvsp"

$items = @(
  "index.html","about.html","ministries.html","sermons.html",
  "events.html","resources.html","give.html","contact.html",
  "robots.txt","sitemap.xml","assets"
)

Write-Host ">> Uploading site files to $Server ..." -ForegroundColor Cyan
scp -i $KeyPath -r $items "${Server}:${WebRoot}/"

Write-Host ">> Done. Visit your site to confirm." -ForegroundColor Green
