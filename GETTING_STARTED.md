# Getting Started

This guide will help you set up your development environment for the ABC Summit 2025 Conference App.

## Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js 20.9+** (REQUIRED for Next.js 16)
* **npm 10+** (REQUIRED)
* **Git** (for version control)
* **Expo CLI** (for mobile development)
* **Supabase account** (for backend services)

### Verify Your Environment

```bash
node --version   # Must show >= 20.9.0
npm --version    # Must show >= 10.0.0
```

### Critical Note

This project uses **Next.js 16** and **React 19**, which require Node.js 20.9+. Older Node versions will fail.

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/TheSimpleApp/actionbehavior.git
cd actionbehavior
```

### 2. Install Dependencies

```bash
npm install
```

This will install dependencies for all workspaces (web, mobile, and shared packages).

### 3. Set Up Environment Variables

#### Web App (.env.local)

Create `apps/web/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### Mobile App (.env.local)

Create `apps/mobile/.env.local`:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Set Up Supabase

#### Local Development

```bash
# Start Supabase locally
npm run db:start

# Run migrations
npm run db:push

# Reset database (if needed)
npm run db:reset
```

#### Production/Remote

1. Create a project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from the project settings
3. Add them to your `.env.local` files
4. Push migrations: `npm run db:push`

## Development

### Run Web App

```bash
npm run web
# or
npm run dev:web
```

The web app will be available at `http://localhost:3000`

### Run Mobile App

```bash
npm run mobile
# or
npm run dev:mobile
```

This will start the Expo development server. You can:
* Scan the QR code with Expo Go app (iOS/Android)
* Press `i` for iOS simulator
* Press `a` for Android emulator

### Run Both Apps

```bash
npm run dev
```

This uses Turbo to run both apps concurrently.

## Database Management

### Generate TypeScript Types

After schema changes, regenerate types:

```bash
npm run db:types
```

This creates `packages/shared/src/types/supabase.ts` with all database types.

### Create a Migration

```bash
npm run db:migration migration_name
```

### Common Database Commands

```bash
npm run db:start    # Start local Supabase
npm run db:stop     # Stop local Supabase
npm run db:push     # Push migrations to remote
npm run db:reset    # Reset local database
```

## Project Structure

```
actionbehavior/
├── apps/
│   ├── web/              # Next.js 16 web app
│   │   ├── app/          # App Router pages
│   │   ├── components/   # React components
│   │   └── lib/          # Utilities & Supabase clients
│   └── mobile/           # Expo SDK 51 mobile app
│       ├── app/          # Expo Router pages
│       ├── components/   # React Native components
│       └── lib/          # Utilities & Supabase clients
├── packages/
│   └── shared/           # Shared code
│       ├── src/
│       │   ├── types/    # TypeScript types
│       │   ├── utils/    # Shared utilities
│       │   └── algorithms/ # Business logic (e.g., roommate pairing)
└── supabase/
    └── migrations/       # Database migrations
```

## Troubleshooting

### Node Version Issues

If you see errors about Node version:
1. Install Node.js 20.9+ from [nodejs.org](https://nodejs.org)
2. Use `nvm` (Node Version Manager) to switch versions:
   ```bash
   nvm install 20.9.0
   nvm use 20.9.0
   ```

### Dependency Issues

If you encounter dependency conflicts:
```bash
npm run clean
npm install
```

### Supabase Connection Issues

1. Verify your `.env.local` files have correct values
2. Check that your Supabase project is running
3. Verify RLS policies allow your operations

### Mobile App Issues

1. Clear Expo cache:
   ```bash
   cd apps/mobile
   npx expo start --clear
   ```
2. Reinstall dependencies:
   ```bash
   rm -rf node_modules
   npm install
   ```

## Next Steps

* Read `MVP_SPRINT_PLAN.md` for development timeline
* Check `TECH_STACK.md` for detailed technology information
* Review `README.md` for project overview

## Getting Help

If you're stuck:
1. Check the troubleshooting section above
2. Review relevant documentation files
3. Check Supabase logs: `npm run db:logs` (if available)
4. Review error messages carefully - they often point to the issue

