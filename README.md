# 🎯 ABC Summit 2025

> Enterprise conference app for 2,400+ employees

**Event:** February 27-28, 2026  
**Venue:** Gaylord Texan, Grapevine, TX  
**Client:** Action Behavior Centers

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup environment variables (see DEVELOPMENT.md)
cp apps/web/.env.local.example apps/web/.env.local
# Edit .env.local with your Supabase credentials

# Start development server
npm run dev:web
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📚 Documentation

- **[REQUIREMENTS.md](REQUIREMENTS.md)** - Complete project requirements
- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Setup & development guide
- **[QUICK_SETUP.md](QUICK_SETUP.md)** - Quick setup reference
- **[START_HERE.md](START_HERE.md)** - Getting started guide

---

## 🏗️ Project Structure

```
abc-summit-2025/
├── apps/
│   ├── web/              # Next.js Web Admin Portal
│   └── mobile/           # React Native Mobile App (Expo)
├── packages/
│   └── shared/           # Shared types & utilities
└── supabase/
    └── migrations/       # Database migrations
```

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Web Admin** | Next.js 16, React 19, TypeScript |
| **Mobile App** | React Native (Expo SDK 51) |
| **Backend** | Supabase (PostgreSQL + Auth + Storage) |
| **Styling** | Tailwind CSS (web), NativeWind (mobile) |
| **State** | Zustand + TanStack Query |
| **Monorepo** | Turborepo |

---

## 🔥 Key Features

### Top Priorities
1. **Data Exports** - One-click CSV exports (critical for client)
2. **Roommate Pairing** - Automated algorithm with 11 role types
3. **Admin Control** - Self-service content management

### Web Admin Portal
- User management
- Registration oversight
- Roommate pairing management
- Data exports (CSV)
- Travel coordination
- Push notifications

### Mobile App
- Travel hub (flights, hotel, roommates)
- Event schedule
- Interactive floor plans
- Speaker bios
- QR code check-in
- Push notifications

---

## 📋 Available Scripts

```bash
# Development
npm run dev              # Run all apps
npm run dev:web          # Web admin only
npm run dev:mobile       # Mobile app only

# Database
npm run db:start         # Start local Supabase
npm run db:reset         # Reset & apply migrations

# Build
npm run build            # Build all apps
npm run build:web        # Build web admin

# Utilities
npm run lint             # Lint code
npm run format           # Format with Prettier
```

---

## 🚦 Getting Started

### For First Time Setup

1. **Read the docs:**
   - [DEVELOPMENT.md](DEVELOPMENT.md) - Complete setup guide
   - [REQUIREMENTS.md](REQUIREMENTS.md) - What we're building

2. **Setup Supabase:**
   - Create account at [supabase.com](https://supabase.com)
   - Create new project
   - Copy credentials

3. **Configure environment:**
   - See [QUICK_SETUP.md](QUICK_SETUP.md) for details

4. **Run migrations:**
   - Apply database migrations (see DEVELOPMENT.md)

5. **Start coding:**
   ```bash
   npm run dev:web
   ```

### For Returning Developers

```bash
# Pull latest
git pull origin main

# Install any new deps
npm install

# Start dev server
npm run dev:web
```

---

## 🗄️ Database

**Tables:**
- `profiles` - User accounts
- `events` - Conference events
- `registrations` - Event registrations
- `roommate_selections` - User's roommate choices
- `roommate_matches` - Final pairings
- `cancellation_requests` - Cancellation workflow

All migrations in `supabase/migrations/`

---

## 🔐 Authentication

- **Google OAuth** via Supabase Auth
- Admin portal requires authentication
- Mobile app uses same auth system
- See DEVELOPMENT.md for OAuth setup

---

## 📦 Workspace Packages

### `apps/web`
Next.js web admin portal with protected routes for managing users, registrations, roommate pairings, and data exports.

### `apps/mobile`
React Native mobile app (Expo) for attendees with event information, travel hub, and interactive features.

### `packages/shared`
Shared TypeScript code including type definitions, roommate pairing algorithm, and utility functions.

---

## 🎯 Current Status

✅ Project structure set up  
✅ Database schema created  
✅ Authentication working  
✅ Web admin basic dashboard  
🚧 Building admin features  
⏳ Mobile app (coming next)

---

## 🤝 Contributing

This is a client project with specific requirements. See:
- [REQUIREMENTS.md](REQUIREMENTS.md) for what to build
- [DEVELOPMENT.md](DEVELOPMENT.md) for how to build it

---

**Built with:** React, Next.js, Supabase, Expo  
**For:** ABC Summit 2025 (Feb 27-28, 2026)
