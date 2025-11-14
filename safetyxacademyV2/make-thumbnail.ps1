# Professional automated thumbnail creator
# This script will create the thumbnail using the best available method

$ErrorActionPreference = "Continue"

$sourcePath = "images/blog/veiligheidskundige-opleiding-industriele-inspectie.webp"
$destPath = "images/blog/veiligheidskundige-thumbnail.webp"
$maxWidth = 300

Write-Host "=== Professional Thumbnail Creator ===" -ForegroundColor Cyan
Write-Host "Creating thumbnail: max width $maxWidth px" -ForegroundColor White
Write-Host ""

# Check source
if (-not (Test-Path $sourcePath)) {
    Write-Host "ERROR: Source image not found: $sourcePath" -ForegroundColor Red
    exit 1
}

# Remove old thumbnail if exists
if (Test-Path $destPath) {
    Remove-Item $destPath -Force
    Write-Host "Removed old thumbnail" -ForegroundColor Yellow
}

# Method 1: Try to use online image processing via API
Write-Host "Attempting to create thumbnail using online service..." -ForegroundColor Yellow

try {
    # Use a free image resizing API
    # We'll use a simple HTTP-based approach
    
    $imageBytes = [System.IO.File]::ReadAllBytes((Resolve-Path $sourcePath).Path)
    $base64Image = [Convert]::ToBase64String($imageBytes)
    
    # Use Cloudinary or similar service (free tier)
    # For now, let's create a simple solution that works
    
    Write-Host "Using browser-based automated solution..." -ForegroundColor Yellow
    
    # Create a simple HTML file that does everything automatically
    $htmlContent = @'
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Auto Thumbnail</title>
    <style>
        body { font-family: Arial; padding: 20px; background: #f0f0f0; text-align: center; }
        .container { max-width: 400px; margin: 50px auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        h1 { color: #333; margin: 0 0 20px 0; }
        .status { padding: 15px; margin: 15px 0; border-radius: 5px; background: #e7f3ff; color: #004085; }
        .success { background: #d4edda; color: #155724; }
        canvas { display: none; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Creating Thumbnail...</h1>
        <div id="status" class="status">Processing image...</div>
    </div>
    
    <canvas id="canvas"></canvas>
    
    <script>
        const maxWidth = 300;
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const status = document.getElementById('status');
        
        async function createThumbnail() {
            try {
                const response = await fetch('../images/blog/veiligheidskundige-opleiding-industriele-inspectie.webp');
                if (!response.ok) throw new Error('Failed to load image');
                
                const blob = await response.blob();
                const img = new Image();
                
                img.onload = function() {
                    let width = img.width;
                    let height = img.height;
                    
                    if (width > maxWidth) {
                        height = (height * maxWidth) / width;
                        width = maxWidth;
                    }
                    
                    canvas.width = width;
                    canvas.height = height;
                    
                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = 'high';
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    canvas.toBlob(function(blob) {
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'veiligheidskundige-thumbnail.webp';
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                        
                        status.className = 'status success';
                        status.innerHTML = 'Thumbnail downloaded!<br>Save it as: images/blog/veiligheidskundige-thumbnail.webp';
                        
                        // Close window after 2 seconds
                        setTimeout(() => window.close(), 2000);
                    }, 'image/webp', 0.90);
                };
                
                img.onerror = function() {
                    status.innerHTML = 'Error loading image. Please select it manually:';
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/webp';
                    input.style.marginTop = '10px';
                    input.onchange = function(e) {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.onload = function(event) {
                            const img2 = new Image();
                            img2.onload = function() {
                                let w = img2.width;
                                let h = img2.height;
                                if (w > maxWidth) {
                                    h = (h * maxWidth) / w;
                                    w = maxWidth;
                                }
                                canvas.width = w;
                                canvas.height = h;
                                ctx.imageSmoothingEnabled = true;
                                ctx.imageSmoothingQuality = 'high';
                                ctx.drawImage(img2, 0, 0, w, h);
                                canvas.toBlob(function(blob) {
                                    const url = URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = 'veiligheidskundige-thumbnail.webp';
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                    URL.revokeObjectURL(url);
                                    status.className = 'status success';
                                    status.innerHTML = 'Thumbnail downloaded!<br>Save it as: images/blog/veiligheidskundige-thumbnail.webp';
                                    setTimeout(() => window.close(), 2000);
                                }, 'image/webp', 0.90);
                            };
                            img2.src = event.target.result;
                        };
                        reader.readAsDataURL(file);
                    };
                    document.querySelector('.container').appendChild(input);
                };
                
                img.src = URL.createObjectURL(blob);
            } catch (error) {
                status.innerHTML = 'Error: ' + error.message;
            }
        }
        
        // Auto-start
        createThumbnail();
    </script>
</body>
</html>
'@
    
    $htmlContent | Out-File -FilePath "create-thumbnail-auto.html" -Encoding UTF8
    
    Write-Host "Created automated tool" -ForegroundColor Green
    Write-Host "Opening browser (will auto-download thumbnail)..." -ForegroundColor Yellow
    
    Start-Process "create-thumbnail-auto.html"
    
    Write-Host "`nThe browser will:" -ForegroundColor Cyan
    Write-Host "1. Automatically load and process the image" -ForegroundColor White
    Write-Host "2. Resize to max 300px width (maintaining aspect ratio)" -ForegroundColor White
    Write-Host "3. Auto-download the thumbnail" -ForegroundColor White
    Write-Host "4. Close automatically after download" -ForegroundColor White
    Write-Host "`nSave the downloaded file to: images\blog\veiligheidskundige-thumbnail.webp" -ForegroundColor Yellow
    Write-Host "`nWaiting for download to complete..." -ForegroundColor Gray
    
    # Wait and check Downloads folder
    $downloadsPath = [Environment]::GetFolderPath("UserProfile") + "\Downloads"
    $downloadedFile = Join-Path $downloadsPath "veiligheidskundige-thumbnail.webp"
    
    # Wait up to 30 seconds for download
    $maxWait = 30
    $waited = 0
    $found = $false
    
    while ($waited -lt $maxWait -and -not $found) {
        Start-Sleep -Seconds 2
        $waited += 2
        
        if (Test-Path $downloadedFile) {
            Write-Host "Download detected! Moving to target location..." -ForegroundColor Green
            Move-Item -Path $downloadedFile -Destination $destPath -Force
            $found = $true
        } elseif (Test-Path $destPath) {
            Write-Host "Thumbnail already in place!" -ForegroundColor Green
            $found = $true
        }
    }
    
    if (Test-Path $destPath) {
        $fileInfo = Get-Item $destPath
        Write-Host "`nSUCCESS: Thumbnail created and placed!" -ForegroundColor Green
        Write-Host "File: $destPath" -ForegroundColor White
        Write-Host "Size: $([math]::Round($fileInfo.Length/1KB, 2)) KB" -ForegroundColor White
    } else {
        Write-Host "`nThumbnail not automatically detected. Please:" -ForegroundColor Yellow
        Write-Host "1. Check your Downloads folder for 'veiligheidskundige-thumbnail.webp'" -ForegroundColor White
        Write-Host "2. Move it to: images\blog\veiligheidskundige-thumbnail.webp" -ForegroundColor White
        Write-Host "`nOr run this script again - it will auto-detect and move the file." -ForegroundColor Gray
    }
    
} catch {
    Write-Host "`nError: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Please use an online tool like:" -ForegroundColor Yellow
    Write-Host "- https://ezgif.com/resize/webp" -ForegroundColor White
    Write-Host "- https://convertio.co/webp-webp/" -ForegroundColor White
    Write-Host "`nResize to max width: $maxWidth pixels" -ForegroundColor White
    exit 1
}

Write-Host "`nDone!" -ForegroundColor Green
