# 🚀 How to Run Locally

## ⚠️ IMPORTANT: Choose Your Setup Method

You have **2 options** to run locally:

### Option 1: Local Supabase (Recommended - Full Local Development)
- ✅ Complete local development
- ✅ No internet required after setup
- ❌ Requires Docker Desktop

### Option 2: Remote Supabase (Easier Setup)
- ✅ No Docker needed
- ✅ Faster to get started
- ❌ Requires internet connection
- ❌ Need to create Supabase project online

---

## Option 1: Local Supabase Setup (Requires Docker)

### Step 1: Install Docker Desktop

1. Download: https://www.docker.com/products/docker-desktop
2. Install Docker Desktop
3. **Start Docker Desktop** (wait for it to fully start - whale icon in system tray)

### Step 2: Start Supabase

```bash
# Start Supabase (downloads images first time - takes 5-10 min)
npx supabase start

# Apply database migrations
npx supabase db reset
```

### Step 3: Run Apps

**Terminal 1 - Web:**
```bash
cd apps/web
npm run dev
```
Open: http://localhost:3000

**Terminal 2 - Mobile (optional):**
```bash
cd apps/mobile
npm start
```
Press `w` for web or scan QR code.

---

## Option 2: Remote Supabase Setup (No Docker Needed)

### Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Sign up / Log in
3. Click "New Project"
4. Fill in:
   - **Name:** `abc-summit-2025`
   - **Database Password:** (save this securely!)
   - **Region:** Choose closest to you
5. Wait ~2 minutes for setup

### Step 2: Get Your Credentials

In Supabase Dashboard:
1. Go to **Settings** → **API**
2. Copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key**
   - **service_role key** (keep secret!)
   - **Project ID**

### Step 3: Update Environment Variables

**Update `apps/web/.env.local`:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
SUPABASE_PROJECT_ID=your_project_id_here
```

**Update `apps/mobile/.env`:**
```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### Step 4: Apply Database Schema

**Option A: Using Supabase Dashboard (Easiest)**
1. Go to Supabase Dashboard → **SQL Editor**
2. Open `supabase/migrations/20251118000000_initial_schema.sql`
3. Copy entire contents
4. Paste into SQL Editor
5. Click "Run"

**Option B: Using Supabase CLI**
```bash
# Link to your remote project
npx supabase link --project-ref your-project-id

# Push migrations
npx supabase db push
```

### Step 5: Run Apps

**Terminal 1 - Web:**
```bash
cd apps/web
npm run dev
```
Open: http://localhost:3000

**Terminal 2 - Mobile (optional):**
```bash
cd apps/mobile
npm start
```

---

## Quick Verification

### Check Web App Works:
1. Open: http://localhost:3000
2. Navigate to: http://localhost:3000/register
3. Should see registration form (may show errors without auth, that's OK)

### Check Supabase Connection:
1. **Local:** http://localhost:54323 (Supabase Studio)
2. **Remote:** https://supabase.com/dashboard/project/your-project-id
3. Should see all 10 tables created

---

## Troubleshooting

### "Cannot connect to Supabase"
- Check environment variables are correct
- For remote: Check project URL and keys
- For local: Make sure Docker is running

### "Tables don't exist"
- Run migrations: `npx supabase db reset` (local) or apply SQL in dashboard (remote)

### "Port 3000 already in use"
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
cd apps/web
npm run dev -- -p 3001
```

### Mobile app can't connect (Remote Supabase)
- Make sure you're using `https://` not `http://` in env vars
- For physical device: Use your computer's IP or ngrok tunnel

---

## Recommended: Start with Option 2 (Remote)

**Easiest path to get running:**
1. Create Supabase project online (5 min)
2. Copy credentials to `.env.local` and `.env`
3. Run SQL migration in dashboard
4. Start apps

**Then later:** Set up Docker for full local development.

---

## Next Steps After Running

1. **Create test event:**
   - Supabase Studio → Table Editor → `events`
   - Insert: `title='ABC Summit 2025', status='published', start_date='2026-02-27', end_date='2026-02-28'`

2. **Test registration:**
   - Go to http://localhost:3000/register
   - Fill form and submit

3. **Test exports:**
   - Go to http://localhost:3000/exports
   - Click export buttons

---

**Choose your option and let's get it running! 🚀**

