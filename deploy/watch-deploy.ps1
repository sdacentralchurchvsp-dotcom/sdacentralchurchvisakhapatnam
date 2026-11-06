# ============================================================
# AUTO-DEPLOY WATCHER
# Watches the project folder. Whenever you save/change a file,
# it automatically syncs the project to S3 (which the EC2 server
# then auto-pulls). So: edit -> save -> it goes live. No manual
# uploading.
#
# Start it once (leave this window open while you work):
#     powershell -ExecutionPolicy Bypass -File deploy\watch-deploy.ps1
#
# Stop it: press Ctrl+C or close the window.
# ============================================================

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$Bucket = "s3://sdacentral-deploy-2026/SDA CENTRAL CHURCH"

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host " Auto-deploy watcher started" -ForegroundColor Cyan
Write-Host " Watching: $ProjectRoot" -ForegroundColor Cyan
Write-Host " Any change is uploaded to S3 automatically." -ForegroundColor Cyan
Write-Host " Leave this window open. Press Ctrl+C to stop." -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

function Invoke-Sync {
  Write-Host ("[{0}] Change detected - syncing to S3..." -f (Get-Date -Format "HH:mm:ss")) -ForegroundColor Yellow
  aws s3 sync "$ProjectRoot" "$Bucket" `
    --delete `
    --exclude "deploy/*" `
    --exclude ".git/*" `
    --exclude "*.ps1" `
    --exclude "Thumbs.db" `
    --exclude ".DS_Store" 2>&1 | Out-Null
  if ($LASTEXITCODE -eq 0) {
    Write-Host ("[{0}] Synced. Live within ~5 min at http://3.111.190.139" -f (Get-Date -Format "HH:mm:ss")) -ForegroundColor Green
  } else {
    Write-Host ("[{0}] Sync error." -f (Get-Date -Format "HH:mm:ss")) -ForegroundColor Red
  }
}

# Do an initial sync on start
Invoke-Sync

# Set up the file system watcher
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $ProjectRoot
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true

# Debounce: collect rapid changes, then sync once
$script:lastRun = Get-Date

$action = {
  $path = $Event.SourceEventArgs.FullPath
  # Ignore the deploy folder and git
  if ($path -match "\\deploy\\" -or $path -match "\\\.git\\") { return }
  # Debounce - only sync if 3s since last run
  if ((New-TimeSpan -Start $script:lastRun -End (Get-Date)).TotalSeconds -lt 3) { return }
  $script:lastRun = Get-Date
  Start-Sleep -Milliseconds 800   # let the file finish writing
  Invoke-Sync
}

Register-ObjectEvent $watcher Changed -Action $action | Out-Null
Register-ObjectEvent $watcher Created -Action $action | Out-Null
Register-ObjectEvent $watcher Deleted -Action $action | Out-Null
Register-ObjectEvent $watcher Renamed -Action $action | Out-Null

# Keep the script running
try {
  while ($true) { Start-Sleep -Seconds 1 }
} finally {
  $watcher.EnableRaisingEvents = $false
  $watcher.Dispose()
  Get-EventSubscriber | Unregister-Event
  Write-Host "Watcher stopped." -ForegroundColor Cyan
}
