# Resize image to exact 300x200 pixels
$ErrorActionPreference = "Stop"

$sourcePath = "images/blog/veiligheidskundige-opleiding-industriele-inspectie.webp"
$destPath = "images/blog/thumbnail-veiligheidskundige.webp"
$targetWidth = 300
$targetHeight = 200

Write-Host "=== Resizing Image to Exact Dimensions ===" -ForegroundColor Cyan
Write-Host "Source: $sourcePath" -ForegroundColor White
Write-Host "Target: $destPath" -ForegroundColor White
Write-Host "Dimensions: ${targetWidth}x${targetHeight} pixels" -ForegroundColor White
Write-Host ""

# Check source
if (-not (Test-Path $sourcePath)) {
    Write-Host "ERROR: Source image not found!" -ForegroundColor Red
    exit 1
}

# Remove old thumbnail if exists
if (Test-Path $destPath) {
    Remove-Item $destPath -Force
    Write-Host "Removed old thumbnail" -ForegroundColor Yellow
}

Write-Host "Creating browser-based resizer for exact dimensions..." -ForegroundColor Yellow

# Create HTML tool that resizes to exact dimensions
$htmlContent = @"
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Resize to 300x200</title>
    <style>
        body { font-family: Arial; padding: 20px; background: #f0f0f0; text-align: center; }
        .container { max-width: 400px; margin: 50px auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        h1 { color: #333; margin: 0 0 20px 0; }
        .status { padding: 15px; margin: 15px 0; border-radius: 5px; background: #e7f3ff; color: #004085; }
        .success { background: #d4edda; color: #155724; }
        canvas { display: none; }
        #preview { max-width: 300px; margin: 20px auto; display: block; border: 2px solid #ddd; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Resizing to 300x200</h1>
        <div id="status" class="status">Processing...</div>
        <img id="preview" style="display:none;">
    </div>
    
    <canvas id="canvas"></canvas>
    
    <script>
        const targetWidth = $targetWidth;
        const targetHeight = $targetHeight;
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const status = document.getElementById('status');
        const preview = document.getElementById('preview');
        
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        
        async function resizeImage() {
            try {
                const response = await fetch('../images/blog/veiligheidskundige-opleiding-industriele-inspectie.webp');
                if (!response.ok) throw new Error('Failed to load image');
                
                const blob = await response.blob();
                const img = new Image();
                
                img.onload = function() {
                    // Draw image to canvas, cropping/centering to fit exact dimensions
                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = 'high';
                    
                    // Calculate scaling to cover the entire canvas (may crop)
                    const scale = Math.max(targetWidth / img.width, targetHeight / img.height);
                    const scaledWidth = img.width * scale;
                    const scaledHeight = img.height * scale;
                    const x = (targetWidth - scaledWidth) / 2;
                    const y = (targetHeight - scaledHeight) / 2;
                    
                    // Fill background (in case of transparency)
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(0, 0, targetWidth, targetHeight);
                    
                    // Draw image centered
                    ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
                    
                    // Show preview
                    preview.src = canvas.toDataURL('image/webp', 0.90);
                    preview.style.display = 'block';
                    
                    // Auto-download
                    canvas.toBlob(function(blob) {
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'thumbnail-veiligheidskundige.webp';
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                        
                        status.className = 'status success';
                        status.innerHTML = 'Thumbnail downloaded!<br>Exact size: ' + targetWidth + 'x' + targetHeight + ' pixels<br><br>Save it as: images/blog/thumbnail-veiligheidskundige.webp';
                        
                        setTimeout(() => window.close(), 3000);
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
                                canvas.width = targetWidth;
                                canvas.height = targetHeight;
                                ctx.imageSmoothingEnabled = true;
                                ctx.imageSmoothingQuality = 'high';
                                
                                const scale = Math.max(targetWidth / img2.width, targetHeight / img2.height);
                                const scaledWidth = img2.width * scale;
                                const scaledHeight = img2.height * scale;
                                const x = (targetWidth - scaledWidth) / 2;
                                const y = (targetHeight - scaledHeight) / 2;
                                
                                ctx.fillStyle = '#ffffff';
                                ctx.fillRect(0, 0, targetWidth, targetHeight);
                                ctx.drawImage(img2, x, y, scaledWidth, scaledHeight);
                                
                                preview.src = canvas.toDataURL('image/webp', 0.90);
                                preview.style.display = 'block';
                                
                                canvas.toBlob(function(blob) {
                                    const url = URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = 'thumbnail-veiligheidskundige.webp';
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                    URL.revokeObjectURL(url);
                                    status.className = 'status success';
                                    status.innerHTML = 'Thumbnail downloaded! ' + targetWidth + 'x' + targetHeight + ' pixels';
                                    setTimeout(() => window.close(), 3000);
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
        
        resizeImage();
    </script>
</body>
</html>
"@

$htmlContent | Out-File -FilePath "resize-exact.html" -Encoding UTF8

Write-Host "Created resize tool: resize-exact.html" -ForegroundColor Green
Write-Host "Opening browser (will auto-resize and download)..." -ForegroundColor Yellow

Start-Process "resize-exact.html"

Write-Host "`nThe browser will:" -ForegroundColor Cyan
Write-Host "1. Load the source image" -ForegroundColor White
Write-Host "2. Resize to EXACT 300x200 pixels (may crop to fit)" -ForegroundColor White
Write-Host "3. Auto-download the thumbnail" -ForegroundColor White
Write-Host "`nWaiting for download..." -ForegroundColor Gray

# Wait and check Downloads folder
$downloadsPath = [Environment]::GetFolderPath("UserProfile") + "\Downloads"
$downloadedFile = Join-Path $downloadsPath "thumbnail-veiligheidskundige.webp"

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
    Write-Host "`nSUCCESS: Thumbnail created!" -ForegroundColor Green
    Write-Host "File: $destPath" -ForegroundColor White
    Write-Host "Size: $([math]::Round($fileInfo.Length/1KB, 2)) KB" -ForegroundColor White
    Write-Host "Dimensions: ${targetWidth}x${targetHeight} pixels" -ForegroundColor White
} else {
    Write-Host "`nThumbnail not automatically detected." -ForegroundColor Yellow
    Write-Host "Please check Downloads folder and move to: images\blog\thumbnail-veiligheidskundige.webp" -ForegroundColor White
    Write-Host "Or run this script again after download completes." -ForegroundColor Gray
}

Write-Host "`nDone!" -ForegroundColor Green



