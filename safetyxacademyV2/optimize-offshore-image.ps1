# Optimize offshore image to 1200px width, WebP quality 80, <150 KB
$ErrorActionPreference = "Stop"

$sourcePath = "images/nebosh-offshore-safety-training-oil-rig.webp"
$destPath = "images/nebosh-offshore-safety-training-oil-rig.webp"
$targetWidth = 1200
$targetQuality = 0.80
$maxFileSizeKB = 150

Write-Host "=== Optimizing Offshore Image ===" -ForegroundColor Cyan
Write-Host "Source: $sourcePath" -ForegroundColor White
Write-Host "Target width: $targetWidth px (height auto)" -ForegroundColor White
Write-Host "WebP quality: $($targetQuality * 100)%" -ForegroundColor White
Write-Host "Max file size: $maxFileSizeKB KB" -ForegroundColor White
Write-Host ""

# Check source
if (-not (Test-Path $sourcePath)) {
    Write-Host "ERROR: Source image not found: $sourcePath" -ForegroundColor Red
    Write-Host "Please ensure the image exists before running this script." -ForegroundColor Yellow
    exit 1
}

Write-Host "Creating browser-based optimizer..." -ForegroundColor Yellow

# Create HTML tool that resizes and optimizes
$htmlContent = @"
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Optimize Offshore Image</title>
    <style>
        body { font-family: Arial; padding: 20px; background: #f0f0f0; text-align: center; }
        .container { max-width: 600px; margin: 50px auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        h1 { color: #333; margin: 0 0 20px 0; }
        .status { padding: 15px; margin: 15px 0; border-radius: 5px; background: #e7f3ff; color: #004085; }
        .success { background: #d4edda; color: #155724; }
        .warning { background: #fff3cd; color: #856404; }
        canvas { display: none; }
        #preview { max-width: 100%; margin: 20px auto; display: block; border: 2px solid #ddd; border-radius: 5px; }
        .info { font-size: 0.9em; color: #666; margin-top: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Optimizing Image</h1>
        <div id="status" class="status">Processing...</div>
        <img id="preview" style="display:none;">
        <div id="info" class="info" style="display:none;"></div>
    </div>
    
    <canvas id="canvas"></canvas>
    
    <script>
        const targetWidth = $targetWidth;
        const targetQuality = $targetQuality;
        const maxFileSizeKB = $maxFileSizeKB;
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const status = document.getElementById('status');
        const preview = document.getElementById('preview');
        const info = document.getElementById('info');
        
        async function optimizeImage() {
            try {
                const response = await fetch('../images/nebosh-offshore-safety-training-oil-rig.webp');
                if (!response.ok) throw new Error('Failed to load image');
                
                const blob = await response.blob();
                const img = new Image();
                
                img.onload = function() {
                    // Calculate new dimensions maintaining aspect ratio
                    let width = img.width;
                    let height = img.height;
                    
                    if (width > targetWidth) {
                        height = (height * targetWidth) / width;
                        width = targetWidth;
                    }
                    
                    canvas.width = width;
                    canvas.height = height;
                    
                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = 'high';
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    // Show preview
                    preview.src = canvas.toDataURL('image/webp', targetQuality);
                    preview.style.display = 'block';
                    
                    // Try different quality levels if file size is too large
                    let quality = targetQuality;
                    let finalBlob = null;
                    let attempts = 0;
                    const maxAttempts = 10;
                    
                    function tryQuality(q) {
                        return new Promise((resolve) => {
                            canvas.toBlob(function(blob) {
                                if (blob) {
                                    const sizeKB = blob.size / 1024;
                                    resolve({ blob, sizeKB, quality: q });
                                } else {
                                    resolve(null);
                                }
                            }, 'image/webp', q);
                        });
                    }
                    
                    async function optimize() {
                        let result = await tryQuality(quality);
                        
                        // If too large, reduce quality
                        while (result && result.sizeKB > maxFileSizeKB && attempts < maxAttempts && quality > 0.5) {
                            quality -= 0.05;
                            attempts++;
                            result = await tryQuality(quality);
                        }
                        
                        if (result) {
                            finalBlob = result.blob;
                            const sizeKB = result.sizeKB;
                            
                            // Update preview with final quality
                            preview.src = canvas.toDataURL('image/webp', quality);
                            
                            // Auto-download
                            const url = URL.createObjectURL(finalBlob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'nebosh-offshore-safety-training-oil-rig.webp';
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(url);
                            
                            status.className = 'status success';
                            status.innerHTML = 'Image optimized and downloaded!<br>Dimensions: ' + width + 'x' + Math.round(height) + ' px<br>File size: ' + sizeKB.toFixed(2) + ' KB<br>Quality: ' + (quality * 100).toFixed(0) + '%';
                            
                            info.style.display = 'block';
                            info.innerHTML = 'Save it as: images/nebosh-offshore-safety-training-oil-rig.webp<br>(overwrite the existing file)';
                            
                            setTimeout(() => window.close(), 4000);
                        } else {
                            status.innerHTML = 'Error creating optimized image';
                        }
                    }
                    
                    optimize();
                };
                
                img.onerror = function() {
                    status.innerHTML = 'Error loading image. Please select it manually:';
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.style.marginTop = '10px';
                    input.onchange = function(e) {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.onload = function(event) {
                            const img2 = new Image();
                            img2.onload = function() {
                                let w = img2.width;
                                let h = img2.height;
                                
                                if (w > targetWidth) {
                                    h = (h * targetWidth) / w;
                                    w = targetWidth;
                                }
                                
                                canvas.width = w;
                                canvas.height = h;
                                ctx.imageSmoothingEnabled = true;
                                ctx.imageSmoothingQuality = 'high';
                                ctx.drawImage(img2, 0, 0, w, h);
                                
                                let q = targetQuality;
                                let finalBlob2 = null;
                                
                                async function optimize2() {
                                    let result = await new Promise((resolve) => {
                                        canvas.toBlob(function(blob) {
                                            if (blob) {
                                                const sizeKB = blob.size / 1024;
                                                resolve({ blob, sizeKB, quality: q });
                                            } else {
                                                resolve(null);
                                            }
                                        }, 'image/webp', q);
                                    });
                                    
                                    let attempts2 = 0;
                                    while (result && result.sizeKB > maxFileSizeKB && attempts2 < 10 && q > 0.5) {
                                        q -= 0.05;
                                        attempts2++;
                                        result = await new Promise((resolve) => {
                                            canvas.toBlob(function(blob) {
                                                if (blob) {
                                                    const sizeKB = blob.size / 1024;
                                                    resolve({ blob, sizeKB, quality: q });
                                                } else {
                                                    resolve(null);
                                                }
                                            }, 'image/webp', q);
                                        });
                                    }
                                    
                                    if (result) {
                                        finalBlob2 = result.blob;
                                        const sizeKB = result.sizeKB;
                                        
                                        preview.src = canvas.toDataURL('image/webp', q);
                                        preview.style.display = 'block';
                                        
                                        const url = URL.createObjectURL(finalBlob2);
                                        const a = document.createElement('a');
                                        a.href = url;
                                        a.download = 'nebosh-offshore-safety-training-oil-rig.webp';
                                        document.body.appendChild(a);
                                        a.click();
                                        document.body.removeChild(a);
                                        URL.revokeObjectURL(url);
                                        
                                        status.className = 'status success';
                                        status.innerHTML = 'Image optimized!<br>' + w + 'x' + Math.round(h) + ' px, ' + sizeKB.toFixed(2) + ' KB, quality ' + (q * 100).toFixed(0) + '%';
                                        
                                        info.style.display = 'block';
                                        info.innerHTML = 'Save as: images/nebosh-offshore-safety-training-oil-rig.webp';
                                        
                                        setTimeout(() => window.close(), 4000);
                                    }
                                }
                                
                                optimize2();
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
        
        optimizeImage();
    </script>
</body>
</html>
"@

$htmlContent | Out-File -FilePath "optimize-offshore-image.html" -Encoding UTF8

Write-Host "Created optimization tool: optimize-offshore-image.html" -ForegroundColor Green
Write-Host "Opening browser (will auto-optimize and download)..." -ForegroundColor Yellow

Start-Process "optimize-offshore-image.html"

Write-Host "`nThe browser will:" -ForegroundColor Cyan
Write-Host "1. Load the source image" -ForegroundColor White
Write-Host "2. Resize to max $targetWidth px width (maintaining aspect ratio)" -ForegroundColor White
Write-Host "3. Optimize to WebP quality 80% (adjust if needed to stay under $maxFileSizeKB KB)" -ForegroundColor White
Write-Host "4. Auto-download the optimized image" -ForegroundColor White
Write-Host "`nWaiting for download..." -ForegroundColor Gray

# Wait and check Downloads folder
$downloadsPath = [Environment]::GetFolderPath("UserProfile") + "\Downloads"
$downloadedFile = Join-Path $downloadsPath "nebosh-offshore-safety-training-oil-rig.webp"

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
        $fileInfo = Get-Item $destPath
        $fileSizeKB = [math]::Round($fileInfo.Length / 1KB, 2)
        if ($fileSizeKB -lt $maxFileSizeKB) {
            Write-Host "Optimized image already in place!" -ForegroundColor Green
            $found = $true
        }
    }
}

if (Test-Path $destPath) {
    $fileInfo = Get-Item $destPath
    $fileSizeKB = [math]::Round($fileInfo.Length / 1KB, 2)
    Write-Host "`nSUCCESS: Image optimized!" -ForegroundColor Green
    Write-Host "File: $destPath" -ForegroundColor White
    Write-Host "Size: $fileSizeKB KB" -ForegroundColor White
    
    if ($fileSizeKB -gt $maxFileSizeKB) {
        Write-Host "WARNING: File size ($fileSizeKB KB) exceeds target ($maxFileSizeKB KB)" -ForegroundColor Yellow
        Write-Host "You may want to reduce quality further or resize more aggressively." -ForegroundColor Yellow
    } else {
        Write-Host "File size is within target (< $maxFileSizeKB KB)" -ForegroundColor Green
    }
} else {
    Write-Host "`nOptimized image not automatically detected." -ForegroundColor Yellow
    Write-Host "Please check Downloads folder and move to: images\nebosh-offshore-safety-training-oil-rig.webp" -ForegroundColor White
    Write-Host "Or run this script again after download completes." -ForegroundColor Gray
}

Write-Host "`nDone!" -ForegroundColor Green

