# 🚀 Setup Supabase NOW

## CURRENT STATUS

✅ **Done:**
- Project structure created (Next.js 16 + Expo SDK 51)
- All code written (exports, registration, admin, mobile)
- Database schema ready (10 tables)
- Supabase CLI installed

❌ **Missing:**
- Supabase project not linked
- Environment files need your credentials
- Database tables not created yet

---

## 5-Minute Setup (Do This Now)

### Step 1: Authenticate Supabase CLI (30 seconds)

```bash
npx supabase login
```

**What happens:**
- Opens your browser
- Asks you to login to Supabase
- Authenticates the CLI

**Troubleshooting:**
If it doesn't open automatically, go to the URL shown in the terminal.

---

### Step 2: Create or Link Project (2 minutes)

**If you have a Supabase account:**

```bash
# See your existing projects
npx supabase projects list

# Link to one (replace with your project ID)
npx supabase link --project-ref xxxxxxxxxxxxx
```

**If you DON'T have a project yet:**

1. Go to: https://supabase.com/dashboard
2. Click "New Project"
3. Enter:
   - Name: `abc-summit-2025`
   - Database Password: (make one up and SAVE IT!)
   - Region: US West (or closest to you)
4. Wait ~2 minutes for it to spin up
5. Then link it:
```bash
npx supabase link --project-ref YOUR_PROJECT_ID
```

**How to get PROJECT_REF:**
- It's in the URL: `https://supabase.com/dashboard/project/YOUR_PROJECT_ID`
- Or run: `npx supabase projects list`

---

### Step 3: Push Database Schema (30 seconds)

```bash
npx supabase db push
```

**What this does:**
- Reads `supabase/migrations/20251118000000_initial_schema.sql`
- Creates all 10 tables in your database
- Sets up RLS policies
- Creates indexes

**Verify it worked:**
1. Go to: https://supabase.com/dashboard/project/_/editor
2. Should see tables: profiles, events, registrations, roommate_selections, etc.

---

### Step 4: Update Environment Files (1 minute)

**Get your credentials:**
1. Go to: https://supabase.com/dashboard/project/_/settings/api
2. You'll see:
   - Project URL (e.g., `https://xxxxx.supabase.co`)
   - anon/public key (long JWT token)
   - service_role key (long JWT token - keep secret!)

**Copy the example files:**

```bash
# Web app
copy apps\web\.env.example apps\web\.env.local

# Mobile app
copy apps\mobile\.env.example apps\mobile\.env
```

**Then edit:**
- `apps/web/.env.local` - paste your URL and keys
- `apps/mobile/.env` - paste your URL and anon key

---

### Step 5: Start Apps (30 seconds)

**Web app:**
```bash
cd apps/web
npm run dev
```
Open: http://localhost:3000

**Mobile app:**
```bash
cd apps/mobile
npm start
```
Press `w` for web or scan QR code

---

## Quick Command Reference

```bash
# All setup commands in order:
npx supabase login
npx supabase projects list
npx supabase link --project-ref YOUR_PROJECT_ID
npx supabase db push

# Copy env files:
copy apps\web\.env.example apps\web\.env.local
copy apps\mobile\.env.example apps\mobile\.env

# (Edit the .env files with your credentials)

# Start developing:
cd apps/web && npm run dev
cd apps/mobile && npm start
```

---

## Verification

**Check database:**
1. Go to: https://supabase.com/dashboard/project/_/editor
2. Should see 10 tables

**Check web app:**
1. Open: http://localhost:3000/register
2. Should see registration form

**Check exports:**
1. Open: http://localhost:3000/exports
2. Should see 6 export buttons

---

## Need Help?

If stuck, run:
```bash
# Check if authenticated
npx supabase projects list

# Check if linked
npx supabase status

# Check project in browser
https://supabase.com/dashboard
```

---

**Total time: ~5 minutes to get fully running! 🚀**

