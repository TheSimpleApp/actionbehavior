# Deployment Guide

Complete deployment guide for ABC Summit 2025 Conference App.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Variables](#environment-variables)
3. [Web App Deployment (Vercel)](#web-app-deployment-vercel)
4. [Mobile App Deployment (EAS)](#mobile-app-deployment-eas)
5. [Database Deployment (Supabase)](#database-deployment-supabase)
6. [CI/CD Pipeline](#cicd-pipeline)
7. [Deployment Checklist](#deployment-checklist)
8. [Rollback Procedures](#rollback-procedures)
9. [Monitoring & Logging](#monitoring--logging)

---

## Prerequisites

Before deploying, ensure you have:

- [x] Node.js 20.9+ installed
- [x] npm 10+ installed
- [x] Vercel account (for web deployment)
- [x] Expo account (for mobile deployment)
- [x] Supabase account (for database)
- [x] GitHub repository access
- [x] Domain name (optional, but recommended)

### Required CLI Tools

```bash
# Install Vercel CLI
npm install -g vercel

# Install Expo CLI
npm install -g eas-cli

# Install Supabase CLI
npm install -g supabase

# Login to services
vercel login
eas login
supabase login
```

---

## Environment Variables

### Web App (.env.local)

Copy the example file and fill in your values:

```bash
cp apps/web/.env.example apps/web/.env.local
```

**Required variables:**

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# App URL
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Mobile App (.env)

```bash
cp apps/mobile/.env.example apps/mobile/.env
```

**Required variables:**

```bash
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

## Web App Deployment (Vercel)

### Option 1: Automatic Deployment (Recommended)

1. **Connect GitHub Repository to Vercel**

   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Select "ABC Summit 2025" project

2. **Configure Project Settings**

   - **Framework Preset:** Next.js
   - **Root Directory:** `apps/web`
   - **Build Command:** `cd ../.. && npx turbo run build --filter=web`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`

3. **Add Environment Variables**

   - Navigate to: Settings → Environment Variables
   - Add all variables from `.env.example`
   - Create separate environments: Production, Preview, Development

4. **Deploy**

   - Click "Deploy"
   - Vercel will auto-deploy on every push to `main` branch

### Option 2: Manual Deployment via CLI

```bash
# Build the project
npm run build --workspace=apps/web

# Deploy to Vercel
cd apps/web
vercel --prod
```

### Configure GitHub Secrets for CI/CD

Add these secrets to your GitHub repository:

```
Settings → Secrets and Variables → Actions → New repository secret
```

Required secrets:

- `VERCEL_TOKEN` - Get from Vercel → Settings → Tokens
- `VERCEL_ORG_ID` - Get from `.vercel/project.json` after first deploy
- `VERCEL_PROJECT_ID` - Get from `.vercel/project.json` after first deploy
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key

### Custom Domain Setup

1. Go to Vercel → Your Project → Settings → Domains
2. Add your domain (e.g., `summit.abccompany.com`)
3. Update DNS records as instructed by Vercel
4. Wait for SSL certificate provisioning (~30 minutes)
5. Update `NEXT_PUBLIC_APP_URL` environment variable

---

## Mobile App Deployment (EAS)

### First-Time Setup

1. **Configure EAS Project**

   ```bash
   cd apps/mobile
   eas init
   ```

   This will:
   - Create an Expo project
   - Generate a project ID
   - Update `app.json` with project details

2. **Update Placeholder Values**

   Edit `apps/mobile/app.json`:

   ```json
   {
     "expo": {
       "extra": {
         "eas": {
           "projectId": "YOUR_ACTUAL_PROJECT_ID"
         }
       },
       "owner": "YOUR_EXPO_USERNAME"
     }
   }
   ```

3. **Configure App Store Credentials**

   **iOS:**
   ```bash
   eas credentials
   ```
   Follow prompts to set up:
   - Apple Developer account
   - App Store Connect API key
   - Push notification certificates

   **Android:**
   ```bash
   eas credentials
   ```
   Set up:
   - Google Play Console service account
   - Upload keystore

### Build Profiles

We have 3 build profiles in `eas.json`:

1. **development** - For local testing with Expo Go
2. **preview** - Internal testing builds (APK/IPA)
3. **production** - App Store/Play Store builds

### Creating Builds

**Development Build:**
```bash
cd apps/mobile
eas build --profile development --platform all
```

**Preview Build (Internal Testing):**
```bash
eas build --profile preview --platform all
```

**Production Build:**
```bash
eas build --profile production --platform all
```

### Submitting to App Stores

**Automatic submission:**
```bash
eas submit --platform all --latest
```

**Manual submission:**
1. Download the build from Expo dashboard
2. Upload to App Store Connect (iOS) or Play Console (Android)

### Over-The-Air (OTA) Updates

After app is published, you can push updates without app store review:

```bash
cd apps/mobile
eas update --branch production --message "Fix: Updated event schedule"
```

**Important:** OTA updates only work for JavaScript changes, not native code.

### Configure GitHub Secrets for Mobile CI/CD

Add these secrets:

- `EXPO_TOKEN` - Get from https://expo.dev/accounts/[username]/settings/access-tokens
- `EXPO_APPLE_APP_SPECIFIC_PASSWORD` - For iOS submission

---

## Database Deployment (Supabase)

### Production Setup

1. **Create Production Project**

   - Go to https://app.supabase.com
   - Click "New Project"
   - Name: "ABC Summit 2025 Production"
   - Choose region closest to users
   - Set strong database password

2. **Link Local Project to Production**

   ```bash
   supabase link --project-ref your-project-ref
   ```

3. **Run Migrations**

   ```bash
   # Push all migrations to production
   supabase db push

   # Or run specific migration
   supabase migration up
   ```

4. **Verify Row Level Security (RLS)**

   ```bash
   # Check RLS policies
   supabase db dump --role-only > roles.sql
   ```

   Ensure all tables have appropriate RLS policies enabled.

5. **Set up Authentication Providers**

   - Navigate to: Authentication → Providers
   - Enable Google OAuth
   - Add OAuth credentials:
     - Client ID from Google Cloud Console
     - Client Secret
     - Authorized redirect URIs

6. **Configure Storage Buckets**

   ```bash
   # Create buckets for file uploads
   supabase storage create-bucket avatars --public
   supabase storage create-bucket documents --private
   ```

### Database Backup Strategy

**Automated Backups:**
- Supabase automatically creates daily backups (retained for 7 days on free plan, 30 days on Pro)

**Manual Backup:**
```bash
supabase db dump > backup-$(date +%Y%m%d).sql
```

### Configure GitHub Secrets for Database CI/CD

Add these secrets:

- `SUPABASE_ACCESS_TOKEN` - From Supabase → Account → Access Tokens
- `SUPABASE_PROJECT_REF` - Your project reference ID
- `SUPABASE_DB_PASSWORD` - Database password

---

## CI/CD Pipeline

We have 4 GitHub Actions workflows configured:

### 1. PR Checks (`.github/workflows/pr-check.yml`)

**Triggers:** Pull requests and pushes to `main`/`develop`

**Actions:**
- ✅ Type checking
- ✅ Linting
- ✅ Build verification
- ✅ Dependency security review

**No secrets required** (uses placeholder env vars for builds)

### 2. Web Deployment (`.github/workflows/deploy-web.yml`)

**Triggers:** Pushes to `main` that modify web app files

**Actions:**
- Builds Next.js app
- Deploys to Vercel production

**Required secrets:**
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

### 3. Mobile Build (`.github/workflows/mobile-build.yml`)

**Triggers:**
- Pushes to `main` that modify mobile app
- Release tags
- Manual workflow dispatch

**Actions:**
- Builds iOS/Android apps via EAS
- Submits to app stores (on release)

**Required secrets:**
- `EXPO_TOKEN`
- `EXPO_APPLE_APP_SPECIFIC_PASSWORD` (for iOS submission)

### 4. Database Migrations (`.github/workflows/db-migrate.yml`)

**Triggers:** Pushes to `main` that modify `supabase/migrations/`

**Actions:**
- Runs database migrations
- Generates updated TypeScript types
- Creates PR with type updates

**Required secrets:**
- `SUPABASE_ACCESS_TOKEN`
- `SUPABASE_PROJECT_REF`
- `SUPABASE_DB_PASSWORD`

---

## Deployment Checklist

### Pre-Deployment (Days 9-10)

- [ ] All features tested locally
- [ ] Environment variables documented
- [ ] Database migrations tested
- [ ] RLS policies verified
- [ ] Google OAuth configured
- [ ] All secrets added to GitHub
- [ ] Vercel project created
- [ ] Expo project initialized
- [ ] App Store/Play Store listings created

### Web App Deployment (Day 10)

- [ ] Vercel project configured
- [ ] Custom domain added (if applicable)
- [ ] Environment variables set in Vercel
- [ ] First deployment successful
- [ ] SSL certificate active
- [ ] Test production URL
- [ ] Verify authentication flow
- [ ] Test registration form
- [ ] Verify admin dashboard
- [ ] Check CSV exports

### Mobile App Deployment (Day 11)

- [ ] `eas.json` configured
- [ ] Bundle identifiers set
- [ ] iOS certificate configured
- [ ] Android keystore configured
- [ ] Preview build created
- [ ] Internal testing completed
- [ ] Production build created
- [ ] TestFlight build uploaded (iOS)
- [ ] Internal testing track uploaded (Android)
- [ ] App Store submission prepared
- [ ] Play Store submission prepared

### Database Deployment (Day 10)

- [ ] Production Supabase project created
- [ ] All migrations applied
- [ ] RLS policies enabled
- [ ] Google OAuth configured
- [ ] Storage buckets created
- [ ] Test data seeded (optional)
- [ ] Backup strategy confirmed

### Post-Deployment (Day 12)

- [ ] All systems operational
- [ ] Monitoring enabled
- [ ] Error tracking configured
- [ ] Load testing completed
- [ ] Security review passed
- [ ] Documentation updated
- [ ] Team notified
- [ ] User communication sent

---

## Rollback Procedures

### Web App Rollback

**Via Vercel Dashboard:**
1. Go to Vercel → Deployments
2. Find previous stable deployment
3. Click "..." → "Promote to Production"

**Via CLI:**
```bash
vercel rollback
```

### Mobile App Rollback

**For JavaScript-only changes (OTA):**
```bash
eas update --branch production --message "Rollback to previous version"
```

**For native changes:**
- Cannot rollback immediately
- Push hotfix and create new build
- Submit expedited review to app stores

### Database Rollback

**Restore from backup:**
```bash
# Download backup from Supabase dashboard
# Or use manual backup
supabase db reset
psql $DATABASE_URL < backup-YYYYMMDD.sql
```

**Rollback specific migration:**
```bash
supabase migration down
```

⚠️ **WARNING:** Database rollbacks can cause data loss. Always backup before rollback.

---

## Monitoring & Logging

### Web App Monitoring

**Vercel Analytics (Built-in):**
- Page views
- Web Vitals (LCP, FID, CLS)
- Top pages

**Optional: Add Sentry for Error Tracking**

```bash
npm install @sentry/nextjs --workspace=apps/web
```

Add to `.env.local`:
```bash
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

### Mobile App Monitoring

**Expo Analytics:**
- Crash reports
- Performance metrics
- User analytics

**Access:** https://expo.dev/accounts/[username]/projects/abc-summit-2025

### Database Monitoring

**Supabase Dashboard:**
- Database size
- Active connections
- Query performance
- API requests

**Access:** https://app.supabase.com/project/[project-ref]

### Health Checks

**Web App:**
```bash
curl https://your-domain.com/api/health
```

**Database:**
```bash
curl https://your-project.supabase.co/rest/v1/
```

---

## Troubleshooting

### Common Issues

**Issue: Vercel build fails with "Module not found"**
- **Solution:** Check `vercel.json` build command points to correct directory
- Verify all dependencies are in `package.json`

**Issue: Mobile build fails with "Invalid credentials"**
- **Solution:** Run `eas credentials` and reconfigure

**Issue: Database migration fails**
- **Solution:** Check migration syntax, ensure no conflicting schemas

**Issue: Authentication not working in production**
- **Solution:** Verify OAuth redirect URLs include production domain

**Issue: Environment variables not loading**
- **Solution:** Ensure variables are prefixed with `NEXT_PUBLIC_` (web) or `EXPO_PUBLIC_` (mobile)

---

## Support

- **Vercel Docs:** https://vercel.com/docs
- **Expo Docs:** https://docs.expo.dev
- **Supabase Docs:** https://supabase.com/docs
- **Next.js Docs:** https://nextjs.org/docs

---

## Timeline Reference

**Day 10:** Production environment setup
**Day 11:** Deploy all services
**Day 12:** Final testing
**December 1, 2025:** 🚀 Launch!

---

**Last Updated:** November 18, 2025
**Maintained By:** Development Team
