# 🤖 Automatic Supabase Setup (Like Bolt.new & Lovable)

This guide will help you set up Supabase automatically using your Supabase account, similar to how Bolt.new and Lovable do it.

## Quick Setup (3 Steps)

### Step 1: Authenticate with Supabase

Run this command and follow the browser prompt:

```bash
npx supabase login
```

This will:
- Open your browser
- Ask you to log in to Supabase
- Authenticate the CLI with your account

**Alternative (if browser doesn't open):**
1. Go to: https://supabase.com/dashboard/account/tokens
2. Create a new access token
3. Run:
```bash
$env:SUPABASE_ACCESS_TOKEN='your-token-here'
npx supabase projects list
```

### Step 2: Link or Create Project

**Option A: Link to Existing Project**
```bash
# List your projects
npx supabase projects list

# Link to a project (replace PROJECT_REF with your project ID)
npx supabase link --project-ref PROJECT_REF
```

**Option B: Create New Project**

Unfortunately, creating projects via CLI requires API access. Easiest way:

1. Go to: https://supabase.com/dashboard
2. Click "New Project"
3. Fill in:
   - **Name:** `abc-summit-2025`
   - **Database Password:** (save this!)
   - **Region:** Choose closest
4. Wait 2 minutes for setup
5. Then link it:
```bash
npx supabase link --project-ref YOUR_PROJECT_ID
```

### Step 3: Apply Migrations & Get Credentials

```bash
# Push migrations to your project
npx supabase db push
```

**Get your credentials:**
1. Go to: https://supabase.com/dashboard/project/_/settings/api
2. Copy:
   - **Project URL**
   - **anon/public key**
   - **service_role key** (keep secret!)

**Update environment files:**

`apps/web/.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_PROJECT_ID=your_project_id
```

`apps/mobile/.env`:
```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

---

## Automated Script

I've created a PowerShell script that does most of this automatically:

```bash
# Run the setup script
.\setup-supabase.ps1
```

This will:
1. ✅ Check Supabase CLI
2. ✅ Authenticate you
3. ✅ List/create projects
4. ✅ Link project
5. ✅ Apply migrations
6. ✅ Guide you through env setup

---

## What Gets Set Up Automatically

Once linked, the CLI will:
- ✅ Create `.supabase` folder with project config
- ✅ Store your project reference
- ✅ Allow you to push migrations with `npx supabase db push`
- ✅ Sync types with `npx supabase gen types typescript`

---

## Verify Setup

```bash
# Check project status
npx supabase status

# Should show your project URL and status
```

---

## Troubleshooting

### "Cannot use automatic login flow"
Run in a regular terminal (not through script):
```bash
npx supabase login
```

### "Project not found"
Make sure you're using the correct project reference ID from:
```bash
npx supabase projects list
```

### "Migration failed"
Check your project has the correct database password set. You may need to reset it in the dashboard.

---

## Next Steps After Setup

1. **Start web app:**
   ```bash
   cd apps/web
   npm run dev
   ```

2. **Start mobile app:**
   ```bash
   cd apps/mobile
   npm start
   ```

3. **Create test data:**
   - Go to Supabase Dashboard → Table Editor
   - Insert a test event in `events` table
   - Test registration at http://localhost:3000/register

---

**Ready to go! 🚀**

