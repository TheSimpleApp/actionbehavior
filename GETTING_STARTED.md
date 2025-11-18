# 🛠️ Getting Started - ABC Summit 2025

## Quick Setup Guide (30 Minutes)

---

## ✅ Prerequisites

Install these first:

```bash
# Node.js 18+
node --version  # Should be v18 or higher

# Install global tools
npm install -g turbo supabase expo-cli
```

---

## 📝 Step-by-Step Setup

### Step 1: Create Supabase Project (5 min)

1. Go to [supabase.com](https://supabase.com)
2. Create new project:
   - Name: `abc-summit-2025`
   - Database Password: Save securely!
   - Region: Choose closest to users
3. Wait ~2 minutes for setup

### Step 2: Get Credentials (2 min)

In Supabase dashboard:
- Settings → API
- Copy:
  - Project URL
  - anon/public key
  - service_role key
  - Project ID

### Step 3: Initialize Project (10 min)

```bash
# Create project directory
mkdir abc-summit-2025
cd abc-summit-2025

# Initialize Next.js (web)
mkdir -p apps/web
cd apps/web
npx create-next-app@latest . --typescript --tailwind --app --yes
npm install @supabase/ssr @supabase/supabase-js @tanstack/react-query zustand react-hook-form zod
cd ..

# Initialize Expo (mobile)
mkdir apps/mobile
cd apps/mobile
npx create-expo-app@latest . --template tabs
npm install @supabase/supabase-js @tanstack/react-query zustand nativewind
cd ..

# Initialize Supabase
npx supabase init
npx supabase start
```

### Step 4: Environment Variables (3 min)

Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_PROJECT_ID=your_project_id
```

### Step 5: Database Schema (5 min)

Use the prompt from `START_BUILDING_NOW.md` Day 1-2 to generate schema with Claude/Cursor.

Apply migration:
```bash
npm run db:push
npm run db:types
```

### Step 6: Start Dev Servers (5 min)

```bash
# Terminal 1
npm run dev:web

# Terminal 2
npm run dev:mobile

# Terminal 3
npm run db:start
```

---

## ✅ Verify Everything Works

- [ ] Web admin opens at localhost:3000
- [ ] Mobile app shows in Expo
- [ ] Supabase Studio at localhost:54323
- [ ] Can create test user
- [ ] Database tables exist

---

## 🐛 Troubleshooting

**"Module not found"**
```bash
npm run clean
npm install
```

**Supabase won't start**
```bash
npx supabase stop
npx supabase start
```

**Type errors**
```bash
npm run db:types
```

---

## 🚀 Next Steps

1. Read `ABC_SUMMIT_2025_REQUIREMENTS.md`
2. Start building with `START_BUILDING_NOW.md`
3. Use prompts from `AI_PROMPTS_CHEATSHEET.md`

**You're ready to vibe code! 💪**
