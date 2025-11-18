# Supabase Setup Script for ABC Summit 2025
# This script will help you authenticate and set up Supabase

Write-Host "🚀 ABC Summit 2025 - Supabase Setup" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check if Supabase CLI is available
Write-Host "Step 1: Checking Supabase CLI..." -ForegroundColor Yellow
$supabaseVersion = npx supabase --version 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Supabase CLI found: $supabaseVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Supabase CLI not found. Installing..." -ForegroundColor Red
    npm install -g supabase
}

Write-Host ""

# Step 2: Authenticate with Supabase
Write-Host "Step 2: Authenticating with Supabase..." -ForegroundColor Yellow
Write-Host "You'll need to authenticate in your browser." -ForegroundColor White
Write-Host "Press Enter to open the login page..." -ForegroundColor White
Read-Host

# Try to login (will open browser)
Write-Host "Opening browser for authentication..." -ForegroundColor Cyan
npx supabase login

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Authentication successful!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Authentication may have failed. Please run manually:" -ForegroundColor Yellow
    Write-Host "   npx supabase login" -ForegroundColor White
    Write-Host ""
    Write-Host "Or provide an access token:" -ForegroundColor Yellow
    Write-Host "   1. Go to https://supabase.com/dashboard/account/tokens" -ForegroundColor White
    Write-Host "   2. Create a new access token" -ForegroundColor White
    Write-Host "   3. Run: `$env:SUPABASE_ACCESS_TOKEN='your-token'; npx supabase projects list`" -ForegroundColor White
    exit 1
}

Write-Host ""

# Step 3: List existing projects or create new
Write-Host "Step 3: Checking for existing projects..." -ForegroundColor Yellow
$projects = npx supabase projects list 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "Your Supabase projects:" -ForegroundColor Cyan
    Write-Host $projects
    Write-Host ""
    Write-Host "Do you want to:" -ForegroundColor Yellow
    Write-Host "  1. Link to an existing project" -ForegroundColor White
    Write-Host "  2. Create a new project" -ForegroundColor White
    $choice = Read-Host "Enter choice (1 or 2)"
    
    if ($choice -eq "1") {
        $projectRef = Read-Host "Enter project reference ID (from projects list above)"
        Write-Host "Linking to project $projectRef..." -ForegroundColor Cyan
        npx supabase link --project-ref $projectRef
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Successfully linked to project!" -ForegroundColor Green
        } else {
            Write-Host "❌ Failed to link project" -ForegroundColor Red
            exit 1
        }
    } elseif ($choice -eq "2") {
        Write-Host "Creating new project..." -ForegroundColor Cyan
        Write-Host "Project name: abc-summit-2025" -ForegroundColor White
        Write-Host "Database password: (you'll be prompted)" -ForegroundColor White
        Write-Host ""
        Write-Host "Note: Creating projects via CLI requires Supabase Pro plan or API access." -ForegroundColor Yellow
        Write-Host "Alternative: Create project at https://supabase.com/dashboard, then link it." -ForegroundColor Yellow
        Write-Host ""
        $createChoice = Read-Host "Continue with manual creation? (y/n)"
        
        if ($createChoice -eq "y") {
            Write-Host "Please create project at: https://supabase.com/dashboard" -ForegroundColor Cyan
            Write-Host "Then run this script again and choose option 1 to link." -ForegroundColor White
            exit 0
        }
    }
} else {
    Write-Host "⚠️  Could not list projects. You may need to authenticate first." -ForegroundColor Yellow
    Write-Host "Run: npx supabase login" -ForegroundColor White
    exit 1
}

Write-Host ""

# Step 4: Get project details and update env files
Write-Host "Step 4: Getting project details..." -ForegroundColor Yellow
$projectInfo = npx supabase status 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Project linked successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Get your project URL and keys from:" -ForegroundColor White
    Write-Host "     https://supabase.com/dashboard/project/_/settings/api" -ForegroundColor Gray
    Write-Host "  2. Update apps/web/.env.local with your credentials" -ForegroundColor White
    Write-Host "  3. Update apps/mobile/.env with your credentials" -ForegroundColor White
    Write-Host "  4. Run: npx supabase db push (to apply migrations)" -ForegroundColor White
} else {
    Write-Host "⚠️  Could not get project status. Checking if we need to push migrations..." -ForegroundColor Yellow
}

Write-Host ""

# Step 5: Apply migrations
Write-Host "Step 5: Applying database migrations..." -ForegroundColor Yellow
$applyMigrations = Read-Host "Apply migrations now? (y/n)"

if ($applyMigrations -eq "y") {
    Write-Host "Pushing migrations to remote database..." -ForegroundColor Cyan
    npx supabase db push
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Migrations applied successfully!" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Migration push failed. You may need to:" -ForegroundColor Yellow
        Write-Host "  1. Check your project is linked correctly" -ForegroundColor White
        Write-Host "  2. Apply migrations manually in Supabase Dashboard SQL Editor" -ForegroundColor White
    }
}

Write-Host ""
Write-Host "🎉 Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "To start developing:" -ForegroundColor Cyan
Write-Host "  cd apps/web && npm run dev" -ForegroundColor White
Write-Host "  cd apps/mobile && npm start" -ForegroundColor White

