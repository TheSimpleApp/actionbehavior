# GitHub Secrets Setup Guide

This guide explains how to configure all required GitHub secrets for the CI/CD pipeline.

## How to Add Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Enter the name and value
5. Click **Add secret**

---

## Required Secrets

### 🌐 Web Deployment (Vercel)

#### `VERCEL_TOKEN`
**How to get:**
1. Go to https://vercel.com/account/tokens
2. Click "Create Token"
3. Name: "GitHub Actions"
4. Click "Create"
5. Copy the token (you won't see it again!)

#### `VERCEL_ORG_ID`
**How to get:**
1. Deploy to Vercel manually first: `cd apps/web && vercel`
2. After deployment, check `.vercel/project.json`
3. Copy the `orgId` value

Alternative:
1. Go to https://vercel.com/[your-username]/settings
2. Copy your Team ID (if using team) or User ID

#### `VERCEL_PROJECT_ID`
**How to get:**
1. Deploy to Vercel manually first: `cd apps/web && vercel`
2. After deployment, check `.vercel/project.json`
3. Copy the `projectId` value

Alternative:
1. Go to your Vercel project settings
2. Copy the Project ID from the URL or settings page

---

### 📱 Mobile Deployment (Expo)

#### `EXPO_TOKEN`
**How to get:**
1. Go to https://expo.dev/accounts/[username]/settings/access-tokens
2. Click "Create Token"
3. Name: "GitHub Actions"
4. Select permissions:
   - ✅ Read projects
   - ✅ Write projects
   - ✅ Read builds
   - ✅ Write builds
5. Click "Create"
6. Copy the token immediately

#### `EXPO_APPLE_APP_SPECIFIC_PASSWORD` (iOS Submission Only)
**How to get:**
1. Go to https://appleid.apple.com/account/manage
2. Sign in with your Apple ID
3. Under "Security" → "App-Specific Passwords"
4. Click "Generate Password"
5. Name: "EAS Submit"
6. Copy the generated password

**Note:** Only needed for automatic App Store submission via `eas submit`

---

### 🗄️ Database (Supabase)

#### `SUPABASE_ACCESS_TOKEN`
**How to get:**
1. Go to https://app.supabase.com/account/tokens
2. Click "Generate New Token"
3. Name: "GitHub Actions"
4. Scopes: Select all (or at minimum: read/write access)
5. Click "Generate Token"
6. Copy immediately

#### `SUPABASE_PROJECT_REF`
**How to get:**
1. Go to your Supabase project dashboard
2. Look at the URL: `https://app.supabase.com/project/[PROJECT_REF]`
3. Copy the `PROJECT_REF` portion

Alternative:
1. Project Settings → General → Reference ID

#### `SUPABASE_DB_PASSWORD`
**Value:** The database password you set when creating the project

**If forgotten:**
1. Go to Project Settings → Database
2. Click "Reset Database Password"
3. Set new password
4. Update this secret

---

### 🔐 Environment Variables (For PR Checks)

These are needed for building during PR checks:

#### `NEXT_PUBLIC_SUPABASE_URL`
**Value:** Your Supabase project URL
- Format: `https://[project-ref].supabase.co`
- Get from: Project Settings → API → Project URL

#### `NEXT_PUBLIC_SUPABASE_ANON_KEY`
**Value:** Your Supabase anonymous key
- Get from: Project Settings → API → Project API keys → `anon` `public`

**Note:** These are "public" keys, safe to expose in client-side code, but we store them as secrets for convenience.

---

## Optional Secrets

### 🔔 Notifications (Optional)

#### `SLACK_WEBHOOK_URL`
For deployment notifications to Slack

**How to get:**
1. Go to your Slack workspace
2. Create an Incoming Webhook
3. Copy the webhook URL

---

## Verification Checklist

After adding all secrets, verify:

- [ ] `VERCEL_TOKEN` - Added
- [ ] `VERCEL_ORG_ID` - Added
- [ ] `VERCEL_PROJECT_ID` - Added
- [ ] `EXPO_TOKEN` - Added
- [ ] `EXPO_APPLE_APP_SPECIFIC_PASSWORD` - Added (if doing iOS submission)
- [ ] `SUPABASE_ACCESS_TOKEN` - Added
- [ ] `SUPABASE_PROJECT_REF` - Added
- [ ] `SUPABASE_DB_PASSWORD` - Added
- [ ] `NEXT_PUBLIC_SUPABASE_URL` - Added
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Added

---

## Testing Your Setup

### Test PR Checks
1. Create a new branch
2. Make a small change
3. Create a pull request
4. Check that the "PR Checks" workflow runs successfully

### Test Web Deployment
1. Merge to `main` branch
2. Check that the "Deploy Web App to Vercel" workflow runs
3. Visit your Vercel dashboard to confirm deployment

### Test Mobile Build
1. Trigger manually: Actions → "Mobile App Build (EAS)" → "Run workflow"
2. Select "preview" profile
3. Check Expo dashboard for build progress

### Test Database Migration
1. Add a new migration file
2. Push to `main`
3. Check that "Database Migrations" workflow runs
4. Verify migration applied in Supabase dashboard

---

## Security Best Practices

✅ **DO:**
- Rotate tokens periodically (every 90 days)
- Use least-privilege access (minimal scopes needed)
- Monitor GitHub Actions logs for unauthorized access
- Delete unused tokens immediately

❌ **DON'T:**
- Share tokens in Slack/email
- Commit tokens to code (use secrets only)
- Use personal tokens (use service tokens when possible)
- Leave tokens active when not in use

---

## Troubleshooting

### "Invalid token" error
- Token may have expired
- Regenerate the token and update the secret

### "Insufficient permissions" error
- Token doesn't have required scopes
- Recreate token with broader permissions

### "Project not found" error
- `VERCEL_PROJECT_ID` or `SUPABASE_PROJECT_REF` is incorrect
- Verify IDs match your actual projects

---

## Quick Reference

| Secret | Where to Get | Used By |
|--------|--------------|---------|
| `VERCEL_TOKEN` | vercel.com/account/tokens | Web deployment |
| `VERCEL_ORG_ID` | .vercel/project.json | Web deployment |
| `VERCEL_PROJECT_ID` | .vercel/project.json | Web deployment |
| `EXPO_TOKEN` | expo.dev/settings/access-tokens | Mobile builds |
| `EXPO_APPLE_APP_SPECIFIC_PASSWORD` | appleid.apple.com | iOS submission |
| `SUPABASE_ACCESS_TOKEN` | app.supabase.com/account/tokens | DB migrations |
| `SUPABASE_PROJECT_REF` | Project URL | DB migrations |
| `SUPABASE_DB_PASSWORD` | Project creation | DB migrations |
| `NEXT_PUBLIC_SUPABASE_URL` | Project Settings → API | PR checks |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Project Settings → API | PR checks |

---

**Need Help?**
- Vercel: https://vercel.com/docs/concepts/projects/environment-variables
- Expo: https://docs.expo.dev/eas/metadata/credentials/
- Supabase: https://supabase.com/docs/guides/api/api-keys

---

**Last Updated:** November 18, 2025
