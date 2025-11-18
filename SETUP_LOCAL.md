# 🚀 Local Development Setup Guide

## Prerequisites Check

✅ Node.js 20.9+ (You have: v22.18.0)  
✅ npm 10+ (You have: 10.9.3)  
✅ Supabase CLI installed

---

## Step 1: Install Supabase CLI (if not installed)

```bash
npm install -g supabase
```

Or using Scoop (Windows):
```bash
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

---

## Step 2: Create Environment Variables

### For Web App (`apps/web/.env.local`)

Create `apps/web/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU
SUPABASE_PROJECT_ID=actionbehavior
```

**Note:** These are the default local Supabase keys. They're safe to use locally.

### For Mobile App (`apps/mobile/.env`)

Create `apps/mobile/.env`:

```env
EXPO_PUBLIC_SUPABASE_URL=http://localhost:54321
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
```

---

## Step 3: Start Supabase Local Development

```bash
# Start Supabase (this will start PostgreSQL, API, Auth, etc.)
npm run db:start

# Or directly:
npx supabase start
```

**First time:** This will download Docker images and may take 5-10 minutes.

**Expected output:**
```
Started supabase local development setup.

         API URL: http://localhost:54321
     GraphQL URL: http://localhost:54321/graphql/v1
          DB URL: postgresql://postgres:postgres@localhost:54322/postgres
      Studio URL: http://localhost:54323
    Inbucket URL: http://localhost:54324
      JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
        anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Step 4: Run Database Migrations

```bash
# Apply the migration we created
npx supabase db reset

# Or just push migrations
npx supabase migration up
```

This will create all 10 tables with RLS policies.

---

## Step 5: Install Dependencies (if not done)

```bash
# Install root dependencies
npm install

# Install web app dependencies
cd apps/web
npm install
cd ../..

# Install mobile app dependencies
cd apps/mobile
npm install
cd ../..
```

---

## Step 6: Run the Applications

### Option A: Run Both Separately

**Terminal 1 - Web App:**
```bash
cd apps/web
npm run dev
```
Web app will be available at: http://localhost:3000

**Terminal 2 - Mobile App:**
```bash
cd apps/mobile
npm start
```
Then scan QR code with Expo Go app or press `w` for web.

**Terminal 3 - Supabase (if not running):**
```bash
npx supabase start
```

### Option B: Use Root Scripts

```bash
# Terminal 1 - Web
npm run dev:web

# Terminal 2 - Mobile
npm run dev:mobile

# Terminal 3 - Supabase (if needed)
npm run db:start
```

---

## Step 7: Verify Everything Works

### 1. Check Supabase Studio
Open: http://localhost:54323
- Should see all tables created
- Can view/edit data here

### 2. Check Web App
Open: http://localhost:3000
- Should see Next.js welcome page
- Navigate to `/register` to see registration form
- Navigate to `/exports` (admin) to see export page

### 3. Check Mobile App
- Expo dev server should start
- Scan QR code or press `w` for web version
- Should see tabs including Travel tab

---

## Troubleshooting

### Supabase won't start
```bash
# Stop and restart
npx supabase stop
npx supabase start
```

### Port already in use
```bash
# Check what's using the port
netstat -ano | findstr :54321

# Or change port in supabase/config.toml
```

### Database connection errors
- Make sure Supabase is running: `npx supabase status`
- Check environment variables are set correctly
- Verify migration ran: Check Supabase Studio

### Mobile app can't connect to Supabase
- Make sure you're using `EXPO_PUBLIC_` prefix for env vars
- Restart Expo dev server after adding env vars
- For physical device: Use your computer's IP address instead of localhost

### TypeScript errors
```bash
# Generate types from database
npm run db:types
```

---

## Next Steps After Setup

1. **Create a test user:**
   - Go to Supabase Studio → Authentication
   - Create a user manually or set up Google OAuth

2. **Create a test event:**
   - Go to Supabase Studio → Table Editor → events
   - Insert a test event with status='published'

3. **Test registration:**
   - Navigate to http://localhost:3000/register
   - Fill out the form and submit

4. **Test exports:**
   - Navigate to http://localhost:3000/exports
   - Click export buttons (will work even with no data)

---

## Quick Start Commands Summary

```bash
# 1. Start Supabase
npx supabase start

# 2. Reset database (applies migrations)
npx supabase db reset

# 3. Start web app (in one terminal)
cd apps/web && npm run dev

# 4. Start mobile app (in another terminal)
cd apps/mobile && npm start
```

---

## Environment Variables Reference

### Local Development (Default Supabase Keys)
- **API URL:** http://localhost:54321
- **Anon Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0`
- **Service Role Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU`

**Note:** These keys are safe for local development only. Never commit them to production.

---

**Ready to code! 🚀**

