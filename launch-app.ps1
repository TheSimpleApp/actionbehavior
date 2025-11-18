# Auto-launch script for ABC Summit 2025 App
# This script will start the dev server and open the browser

Write-Host "🚀 Starting ABC Summit 2025 App..." -ForegroundColor Cyan

# Check if port 3000 is already in use
$portInUse = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($portInUse) {
    Write-Host "⚠️  Port 3000 is already in use. Stopping existing process..." -ForegroundColor Yellow
    $process = Get-Process -Id $portInUse.OwningProcess -ErrorAction SilentlyContinue
    if ($process) {
        Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
        Start-Sleep -Seconds 2
    }
}

# Check if .env.local exists
$envFile = "apps\web\.env.local"
if (-not (Test-Path $envFile)) {
    Write-Host "⚠️  Warning: .env.local file not found!" -ForegroundColor Yellow
    Write-Host "   Please create apps/web/.env.local with your Supabase credentials" -ForegroundColor Yellow
    Write-Host "   See ENV_SETUP_INSTRUCTIONS.md for details" -ForegroundColor Yellow
    Write-Host ""
}

# Navigate to web app directory
Set-Location apps\web

Write-Host "📦 Installing dependencies (if needed)..." -ForegroundColor Cyan
npm install --silent

Write-Host "🔥 Starting Next.js dev server..." -ForegroundColor Green
Write-Host "   Server will be available at: http://localhost:3000" -ForegroundColor Gray
Write-Host ""

# Start the dev server in background
$job = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    npm run dev
}

# Wait a bit for server to start
Start-Sleep -Seconds 5

# Check if server started successfully
$serverRunning = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($serverRunning) {
    Write-Host "✅ Server is running!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 Opening browser..." -ForegroundColor Cyan
    
    # Open browser
    Start-Process "http://localhost:3000"
    
    Write-Host ""
    Write-Host "✨ App is ready! Check your browser." -ForegroundColor Green
    Write-Host "   Press Ctrl+C to stop the server" -ForegroundColor Gray
    Write-Host ""
    
    # Show job output
    Receive-Job $job -Wait
} else {
    Write-Host "❌ Failed to start server. Check the output above for errors." -ForegroundColor Red
    Stop-Job $job
    Remove-Job $job
}

