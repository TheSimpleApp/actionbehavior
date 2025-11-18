# Tech Stack

Complete technical stack documentation for ABC Summit 2025 Conference App.

## Overview

This project uses a modern, type-safe stack optimized for rapid development and AI-assisted coding.

## Frontend

### Web Application (Next.js 16)

**Framework:** Next.js 16.0.3
- **Why:** Latest LTS version with App Router, Server Components, and excellent TypeScript support
- **React Version:** 19.2.0 (Required by Next.js 16)
- **Routing:** App Router (file-based routing)

**Key Features:**
- Server Components for better performance
- Server Actions for form handling
- Built-in API routes
- Image optimization
- Font optimization

**Styling:**
- **Tailwind CSS:** 3.4.x
- **Components:** Radix UI primitives
- **Icons:** Lucide React (or similar)

**Forms & Validation:**
- **React Hook Form:** 7.66.1
- **Zod:** 3.25.76 (schema validation)
- **@hookform/resolvers:** 5.2.2

**State Management:**
- **TanStack Query:** 5.90.10 (server state)
- **Zustand:** 4.5.7 (client state)

**Data Fetching:**
- **@supabase/ssr:** 0.5.2 (Server-Side Rendering)
- **@supabase/supabase-js:** 2.81.1

### Mobile Application (Expo SDK 51)

**Framework:** Expo SDK 51.0.0
- **Why:** Proven stable, excellent developer experience, OTA updates
- **React Native:** 0.74.5
- **React Version:** 18.2.0 (Mobile uses React 18, different from web)

**Navigation:**
- **Expo Router:** 6.0.15 (file-based routing)

**Styling:**
- **NativeWind:** 4.2.1 (Tailwind for React Native)

**State Management:**
- **TanStack Query:** 5.90.10 (server state)
- **Zustand:** 4.5.7 (client state)

**Key Libraries:**
- **@expo/vector-icons:** 15.0.3
- **expo-constants:** 18.0.10
- **expo-font:** 14.0.9
- **expo-linking:** 8.0.9
- **expo-splash-screen:** 31.0.11
- **expo-status-bar:** 3.0.8
- **expo-web-browser:** 15.0.9
- **react-native-reanimated:** 4.1.1
- **react-native-safe-area-context:** 5.6.0
- **react-native-screens:** 4.16.0

**Data Fetching:**
- **@supabase/supabase-js:** 2.81.1

## Backend

### Supabase

**Database:** PostgreSQL 15
- Row Level Security (RLS) for data access control
- Real-time subscriptions
- Full-text search capabilities

**Authentication:**
- Supabase Auth
- Google OAuth (primary method)
- Email/password (if needed)
- Session management

**Storage:**
- Supabase Storage for file uploads
- Image optimization
- CDN delivery

**API:**
- Auto-generated REST API
- GraphQL support (if needed)
- Edge Functions (Deno runtime)

**Security:**
- Row Level Security (RLS) policies
- API key management
- CORS configuration

## Shared Packages

### `packages/shared`

**Purpose:** Shared code between web and mobile apps

**Contents:**
- TypeScript types (including Supabase-generated types)
- Utility functions
- Business logic (e.g., roommate pairing algorithm)
- Constants

**Type Generation:**
- Supabase types auto-generated from database schema
- Command: `npm run db:types`

## Development Tools

### Build System

**Turbo:** 1.13.0
- Monorepo build system
- Task orchestration
- Caching for faster builds

### TypeScript

**Version:** 5.1+
- Strict mode enabled
- Path aliases configured
- Shared types between packages

### Code Quality

**ESLint:** 8.56.0
- Next.js config for web
- React Native config for mobile
- TypeScript support

**Prettier:** 3.2.4
- Code formatting
- Consistent style

### Package Management

**npm:** 10+ (workspaces)
- Monorepo support
- Workspace dependencies

## Version Compatibility Matrix

### Node.js & npm

| Component | Minimum Version | Recommended |
|-----------|----------------|-------------|
| Node.js   | 20.9.0         | 20.9.0+     |
| npm       | 10.0.0         | 10.0.0+     |

**Critical:** Next.js 16 requires Node.js 20.9+. Older versions will fail.

### React Versions

| Platform | React Version | Reason |
|----------|--------------|---------|
| Web      | 19.2.0       | Required by Next.js 16 |
| Mobile   | 18.2.0       | Compatible with Expo SDK 51 |

**Note:** Web and Mobile use different React versions. This is intentional and works fine because they're separate apps.

### Framework Versions

| Framework | Version | Status |
|-----------|---------|--------|
| Next.js   | 16.0.3  | Latest LTS |
| Expo SDK  | 51.0.0  | Stable |
| React Native | 0.74.5 | Compatible with Expo 51 |

## Key Dependencies

### Web Dependencies

```json
{
  "next": "16.0.3",
  "react": "19.2.0",
  "react-dom": "19.2.0",
  "@supabase/ssr": "^0.5.2",
  "@supabase/supabase-js": "^2.81.1",
  "@tanstack/react-query": "^5.90.10",
  "zustand": "^4.5.7",
  "react-hook-form": "^7.66.1",
  "zod": "^3.25.76",
  "tailwindcss": "^3.4.0"
}
```

### Mobile Dependencies

```json
{
  "expo": "~51.0.0",
  "react": "^18.2.0",
  "react-native": "^0.74.5",
  "expo-router": "~6.0.15",
  "@supabase/supabase-js": "^2.81.1",
  "@tanstack/react-query": "^5.90.10",
  "zustand": "^4.5.7",
  "nativewind": "^4.2.1"
}
```

## Architecture Decisions

### Why Next.js 16?

- Latest LTS with long-term support
- Excellent TypeScript support
- Server Components for performance
- Great developer experience
- Active development and community

### Why Expo SDK 51?

- Proven stable (not bleeding edge)
- Excellent documentation
- OTA updates capability
- Easy deployment (EAS)
- Large ecosystem

### Why Supabase?

- PostgreSQL (powerful and familiar)
- Built-in authentication
- Row Level Security
- Real-time capabilities
- Easy data exports (SQL → CSV)
- TypeScript type generation
- Free tier for development

### Why TanStack Query + Zustand?

- **TanStack Query:** Handles server state, caching, refetching
- **Zustand:** Lightweight client state (simpler than Redux)
- Both work well with TypeScript
- Great developer experience

### Why Monorepo?

- Shared types between web and mobile
- Shared utilities and business logic
- Single source of truth
- Easier refactoring
- Turbo for fast builds

## Development Workflow

1. **Local Development:**
   - Supabase local instance (`npm run db:start`)
   - Web: `npm run web`
   - Mobile: `npm run mobile`

2. **Database Changes:**
   - Create migration: `npm run db:migration`
   - Test locally: `npm run db:push`
   - Generate types: `npm run db:types`

3. **Building:**
   - Web: `npm run build:web`
   - Mobile: `npm run build:mobile` (EAS)

4. **Deployment:**
   - Web: Vercel/Netlify (automatic from Git)
   - Mobile: EAS Build + App Store/Play Store

## Performance Considerations

- **Web:** Server Components reduce client bundle size
- **Mobile:** Code splitting with Expo Router
- **Database:** Indexed queries, RLS policies optimized
- **Images:** Next.js Image optimization, Supabase Storage CDN

## Security

- **Authentication:** Supabase Auth with Google OAuth
- **Authorization:** Row Level Security (RLS) policies
- **API Keys:** Environment variables, never committed
- **HTTPS:** Enforced in production
- **CORS:** Configured for specific origins

## Future Considerations

- **Edge Functions:** For serverless functions (Deno runtime)
- **Real-time:** Supabase Realtime for live updates
- **Analytics:** Consider adding analytics (PostHog, Mixpanel)
- **Error Tracking:** Consider Sentry for error monitoring
- **Testing:** Add Jest + React Testing Library

---

**Last Updated:** November 18, 2025  
**Maintained By:** Development Team

