# ============================================================
# One-command deploy: sync the whole project to S3.
# The EC2 server auto-pulls from S3 (cron every 5 min), so
# running this puts your changes live within ~5 minutes.
#
# Run from the project root (d:\SDA CENTRAL CHURCH):
#     powershell -ExecutionPolicy Bypass -File deploy\deploy.ps1
# ============================================================

$ErrorActionPreference = "Stop"

$Bucket   = "s3://sdacentral-deploy-2026/SDA CENTRAL CHURCH"
$ProjectRoot = Split-Path -Parent $PSScriptRoot   # parent of \deploy

Write-Host ">> Syncing project to S3 ..." -ForegroundColor Cyan

# Sync everything except the deploy folder, git, and OS junk.
aws s3 sync "$ProjectRoot" "$Bucket" `
  --delete `
  --exclude "deploy/*" `
  --exclude ".git/*" `
  --exclude "*.ps1" `
  --exclude "Thumbs.db" `
  --exclude ".DS_Store"

if ($LASTEXITCODE -eq 0) {
  Write-Host ">> Uploaded to S3 successfully." -ForegroundColor Green
  Write-Host ">> The EC2 server will pull the changes within ~5 minutes." -ForegroundColor Green
  Write-Host ">> Live site: http://3.111.190.139" -ForegroundColor Green
} else {
  Write-Host ">> Upload failed. Check the output above." -ForegroundColor Red
}
