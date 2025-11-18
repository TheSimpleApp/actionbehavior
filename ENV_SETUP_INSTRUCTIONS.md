# 🔑 Environment Setup - Your Credentials

## ✅ Your Supabase Project Details

**Project:** abc-summit-2025  
**Project ID:** qodmtpzgbflhsnlzkpcg  
**URL:** https://qodmtpzgbflhsnlzkpcg.supabase.co  
**Region:** East US (North Virginia)

---

## 📝 Step 1: Create Web App Environment File

Create a file: `apps/web/.env.local`

Paste this exact content:

```env
NEXT_PUBLIC_SUPABASE_URL=https://qodmtpzgbflhsnlzkpcg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvZG10cHpnYmZsaHNubHprcGNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0MjczMDEsImV4cCI6MjA3OTAwMzMwMX0.ZKyqTewBoO7g_li99LHmOEbKutOKYurG4DHys2Gwznk
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvZG10cHpnYmZsaHNubHprcGNnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzQyNzMwMSwiZXhwIjoyMDc5MDAzMzAxfQ.DBBRR6K3_PQbtE_XAcYpcg2GfjtV711IPF_50df8zcU
SUPABASE_PROJECT_ID=qodmtpzgbflhsnlzkpcg
```

---

## 📱 Step 2: Create Mobile App Environment File

Create a file: `apps/mobile/.env`

Paste this exact content:

```env
EXPO_PUBLIC_SUPABASE_URL=https://qodmtpzgbflhsnlzkpcg.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvZG10cHpnYmZsaHNubHprcGNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0MjczMDEsImV4cCI6MjA3OTAwMzMwMX0.ZKyqTewBoO7g_li99LHmOEbKutOKYurG4DHys2Gwznk
```

---

## 🚀 Step 3: Verify Database Tables

Go to your Supabase dashboard:
https://supabase.com/dashboard/project/qodmtpzgbflhsnlzkpcg/editor

You should see these tables:
- profiles
- events
- registrations
- roommate_selections
- roommate_matches
- cancellation_requests
- sessions
- session_bookmarks
- push_notifications
- floor_plans

If you DON'T see them, run:
```bash
npx supabase db push
```

---

## 🎯 Step 4: Start Development Servers

**Web App:**
```bash
cd apps/web
npm run dev
```
Open: http://localhost:3000

**Mobile App:**
```bash
cd apps/mobile
npm start
```
Press `w` for web browser

---

## Quick Commands to Create Files

**PowerShell:**
```powershell
# Create web .env.local
@"
NEXT_PUBLIC_SUPABASE_URL=https://qodmtpzgbflhsnlzkpcg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvZG10cHpnYmZsaHNubHprcGNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0MjczMDEsImV4cCI6MjA3OTAwMzMwMX0.ZKyqTewBoO7g_li99LHmOEbKutOKYurG4DHys2Gwznk
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvZG10cHpnYmZsaHNubHprcGNnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzQyNzMwMSwiZXhwIjoyMDc5MDAzMzAxfQ.DBBRR6K3_PQbtE_XAcYpcg2GfjtV711IPF_50df8zcU
SUPABASE_PROJECT_ID=qodmtpzgbflhsnlzkpcg
"@ | Out-File -FilePath "apps\web\.env.local" -Encoding utf8

# Create mobile .env
@"
EXPO_PUBLIC_SUPABASE_URL=https://qodmtpzgbflhsnlzkpcg.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvZG10cHpnYmZsaHNubHprcGNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0MjczMDEsImV4cCI6MjA3OTAwMzMwMX0.ZKyqTewBoO7g_li99LHmOEbKutOKYurG4DHys2Gwznk
"@ | Out-File -FilePath "apps\mobile\.env" -Encoding utf8

Write-Host "✅ Environment files created!" -ForegroundColor Green
```

Run these PowerShell commands above, or manually create the files.

---

## ✅ All Set!

Your Supabase project is fully configured and ready to go! 🎉

