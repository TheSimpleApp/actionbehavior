# ⚡ Quick Start - Run Locally

## Prerequisites

1. **Docker Desktop must be running** (Supabase uses Docker)
   - Download: https://www.docker.com/products/docker-desktop
   - Start Docker Desktop before proceeding

2. **Environment variables are already created** ✅
   - `apps/web/.env.local` ✅
   - `apps/mobile/.env` ✅

---

## Step-by-Step to Run

### 1. Start Docker Desktop
Make sure Docker Desktop is running (you'll see the Docker icon in your system tray).

### 2. Start Supabase (Terminal 1)
```bash
npx supabase start
```

**First time:** This downloads Docker images (~5-10 minutes).  
**Subsequent times:** Starts in ~30 seconds.

You should see:
```
Started supabase local development setup.

         API URL: http://localhost:54321
      Studio URL: http://localhost:54323
```

### 3. Apply Database Migrations
```bash
npx supabase db reset
```

This creates all tables and RLS policies.

### 4. Start Web App (Terminal 2)
```bash
cd apps/web
npm run dev
```

Open: http://localhost:3000

### 5. Start Mobile App (Terminal 3 - Optional)
```bash
cd apps/mobile
npm start
```

Then:
- Press `w` to open in web browser
- Or scan QR code with Expo Go app on your phone

---

## Verify It Works

1. **Supabase Studio:** http://localhost:54323
   - Should see all 10 tables

2. **Web App:** http://localhost:3000
   - Should see Next.js page
   - Try: http://localhost:3000/register

3. **Mobile App:** http://localhost:19006 (Expo web)
   - Should see tabs

---

## Common Issues

### "Docker not running"
- Start Docker Desktop
- Wait for it to fully start (whale icon in system tray)

### "Port already in use"
- Stop other services using ports 54321, 54322, 54323
- Or change ports in `supabase/config.toml`

### "Migration failed"
- Run: `npx supabase db reset` (this resets and applies all migrations)

---

## All-in-One Commands

```bash
# Terminal 1: Start Supabase
npx supabase start
npx supabase db reset

# Terminal 2: Start Web
cd apps/web && npm run dev

# Terminal 3: Start Mobile (optional)
cd apps/mobile && npm start
```

---

**That's it! You're ready to develop locally. 🚀**

