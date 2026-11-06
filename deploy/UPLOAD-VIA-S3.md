# Get the site files onto the EC2 server (no SSH key needed)

We use S3 as a "drop box": upload one zip in the browser, then have the
server pull it. You already have S3 in your account.

The zip to upload is: **deploy\site.zip** (in this project folder).

------------------------------------------------------------
## STEP A — Create an S3 bucket and upload the zip
------------------------------------------------------------
1. AWS Console → **S3** → **Create bucket**.
2. Bucket name: something unique, e.g. **sdacentral-deploy-2026**
   Region: **Asia Pacific (Mumbai) ap-south-1** (same as the server).
   Leave "Block all public access" ON (we'll use a temporary signed link).
   Click **Create bucket**.
3. Open the bucket → **Upload** → **Add files** → choose
   `deploy\site.zip` from this project → **Upload**.

------------------------------------------------------------
## STEP B — Make a temporary download link for the zip
------------------------------------------------------------
1. In the bucket, click **site.zip**.
2. Click **Object actions → Share with a presigned URL**.
3. Set expiry (e.g. 60 minutes) → **Create presigned URL** → **Copy**.
   You now have a long https link that works for a short time.

------------------------------------------------------------
## STEP C — Pull and unpack on the server
------------------------------------------------------------
Back in the EC2 Instance Connect browser terminal, paste this — replacing
PASTE_URL_HERE with the presigned URL you copied (keep the quotes):

```
cd /var/www/sdacentralchurchvsp
curl -L "PASTE_URL_HERE" -o site.zip
unzip -o site.zip
rm site.zip
sudo chown -R $USER:$USER /var/www/sdacentralchurchvsp
ls
```

You should see index.html, assets, etc. Now open **http://65.0.135.2** in a
browser — the church website should appear.

------------------------------------------------------------
## Updating the site later
------------------------------------------------------------
Re-create the zip on your PC, upload the new site.zip to the same bucket,
make a new presigned URL, and repeat STEP C. The `unzip -o` overwrites the
old files.

(To regenerate the zip on your PC, run from d:\SDA CENTRAL CHURCH:)
```
powershell -Command "Remove-Item deploy\site.zip -ErrorAction SilentlyContinue; Compress-Archive -Path index.html,about.html,ministries.html,sermons.html,events.html,resources.html,give.html,contact.html,robots.txt,sitemap.xml,assets -DestinationPath deploy\site.zip"
```
