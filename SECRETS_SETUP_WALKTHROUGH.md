# GitHub Secrets Setup - Step-by-Step Walkthrough

Follow this guide to set up all required GitHub secrets for CI/CD.

**Current Status:**
- ✅ Vercel account exists (need to create project)
- ⏳ Need to create Expo account
- ✅ Supabase production project exists

---

## Step 1: Set Up Vercel Project (15 minutes)

### 1.1 Install Vercel CLI
```bash
npm install -g vercel
```

### 1.2 Login to Vercel
```bash
vercel login
```
- Choose your preferred login method (GitHub recommended)
- Complete authentication in browser

### 1.3 Deploy the Web App (First Time)
```bash
cd /Users/daviddotson/actionbehavior/apps/web
vercel
```

**Answer the prompts:**
- `Set up and deploy?` → **Y**
- `Which scope?` → Choose your account/team
- `Link to existing project?` → **N**
- `What's your project's name?` → **abc-summit-2025** (or your preference)
- `In which directory is your code located?` → **./apps/web** (should auto-detect)
- `Want to override settings?` → **N**

**This will:**
- Create Vercel project
- Generate `.vercel` directory with project details
- Deploy preview version
- Give you a preview URL

### 1.4 Get Vercel Secrets

After deployment completes:

```bash
# Get ORG_ID and PROJECT_ID
cat /Users/daviddotson/actionbehavior/apps/web/.vercel/project.json
```

**Save these values:**
- `orgId` → This is your `VERCEL_ORG_ID`
- `projectId` → This is your `VERCEL_PROJECT_ID`

### 1.5 Create Vercel Token

1. Go to: https://vercel.com/account/tokens
2. Click **"Create Token"**
3. Name: `GitHub Actions - ABC Summit`
4. Scope: `Full Account` (or select specific projects)
5. Expiration: `No expiration` (or set to 1 year)
6. Click **"Create"**
7. **COPY THE TOKEN IMMEDIATELY** (you won't see it again!)
   - This is your `VERCEL_TOKEN`

### 1.6 Add Environment Variables to Vercel

1. Go to: https://vercel.com/[your-username]/abc-summit-2025/settings/environment-variables
2. Add these variables for **Production**, **Preview**, and **Development**:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

*(We'll get Supabase values in Step 3)*

---

## Step 2: Create Expo Account & Get Token (10 minutes)

### 2.1 Create Expo Account

1. Go to: https://expo.dev/signup
2. Sign up with:
   - Email (recommended for business)
   - Or GitHub account
3. Verify your email

### 2.2 Install EAS CLI
```bash
npm install -g eas-cli
```

### 2.3 Login to EAS
```bash
eas login
```
- Enter your Expo credentials
- Complete authentication

### 2.4 Initialize EAS Project
```bash
cd /Users/daviddotson/actionbehavior/apps/mobile
eas init
```

**Answer the prompts:**
- Select your Expo account
- Project name: **abc-summit-2025**

**This will:**
- Create an Expo project
- Update `app.json` with project ID
- Link your local project to Expo

### 2.5 Get Expo Access Token

1. Go to: https://expo.dev/accounts/[your-username]/settings/access-tokens
2. Click **"Create Token"**
3. Name: `GitHub Actions - ABC Summit`
4. Permissions (select all):
   - ✅ Read projects
   - ✅ Write projects
   - ✅ Read builds
   - ✅ Write builds
   - ✅ Read updates
   - ✅ Write updates
5. Click **"Create Token"**
6. **COPY THE TOKEN IMMEDIATELY**
   - This is your `EXPO_TOKEN`

### 2.6 (Optional) Apple App-Specific Password

**Only needed if you plan to auto-submit to App Store.**

Skip for now - you can add this later when ready for iOS submission.

To create later:
1. Go to: https://appleid.apple.com/account/manage
2. Security → App-Specific Passwords
3. Generate password for "EAS Submit"

---

## Step 3: Get Supabase Credentials (5 minutes)

### 3.1 Get Supabase Project Details

1. Go to: https://app.supabase.com
2. Select your **ABC Summit 2025** project
3. Go to: **Settings** → **API**

**Copy these values:**

```
Project URL: https://[PROJECT_REF].supabase.co
  → This is NEXT_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_URL

anon public key: eyJh...
  → This is NEXT_PUBLIC_SUPABASE_ANON_KEY

Project Reference ID: [project-ref]
  → This is SUPABASE_PROJECT_REF
```

### 3.2 Get Database Password

**If you remember your database password:**
- Use that as `SUPABASE_DB_PASSWORD`

**If you forgot:**
1. Go to: **Settings** → **Database**
2. Click **"Reset Database Password"**
3. Enter new password
4. Save it as `SUPABASE_DB_PASSWORD`

### 3.3 Create Supabase Access Token

1. Go to: https://app.supabase.com/account/tokens
2. Click **"Generate New Token"**
3. Name: `GitHub Actions - ABC Summit`
4. Scopes: Select all (or minimum: read/write projects)
5. Click **"Generate Token"**
6. **COPY THE TOKEN**
   - This is your `SUPABASE_ACCESS_TOKEN`

---

## Step 4: Add Secrets to GitHub (10 minutes)

### 4.1 Navigate to GitHub Secrets

1. Go to: https://github.com/TheSimpleApp/actionbehavior/settings/secrets/actions
2. Click **"New repository secret"** for each secret below

### 4.2 Add Each Secret

**Copy and paste these one by one:**

| Secret Name | Value Source |
|-------------|--------------|
| `VERCEL_TOKEN` | From Step 1.5 |
| `VERCEL_ORG_ID` | From Step 1.4 (orgId) |
| `VERCEL_PROJECT_ID` | From Step 1.4 (projectId) |
| `EXPO_TOKEN` | From Step 2.5 |
| `SUPABASE_ACCESS_TOKEN` | From Step 3.3 |
| `SUPABASE_PROJECT_REF` | From Step 3.1 (Project Reference ID) |
| `SUPABASE_DB_PASSWORD` | From Step 3.2 (Your DB password) |
| `NEXT_PUBLIC_SUPABASE_URL` | From Step 3.1 (Project URL) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | From Step 3.1 (anon public key) |

### 4.3 Verify All Secrets Added

Go back to: https://github.com/TheSimpleApp/actionbehavior/settings/secrets/actions

You should see **9 secrets** listed:
- ✅ EXPO_TOKEN
- ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY
- ✅ NEXT_PUBLIC_SUPABASE_URL
- ✅ SUPABASE_ACCESS_TOKEN
- ✅ SUPABASE_DB_PASSWORD
- ✅ SUPABASE_PROJECT_REF
- ✅ VERCEL_ORG_ID
- ✅ VERCEL_PROJECT_ID
- ✅ VERCEL_TOKEN

---

## Step 5: Update Local Environment Files (5 minutes)

### 5.1 Update Web App Environment

```bash
cd /Users/daviddotson/actionbehavior
cp apps/web/.env.example apps/web/.env.local
```

Edit `apps/web/.env.local` and add your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://[your-project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[get-from-supabase-settings-api]
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

**To get Service Role Key:**
- Supabase → Settings → API → `service_role` key
- ⚠️ **NEVER commit this to Git!**

### 5.2 Verify Mobile App Environment

Check that `apps/mobile/.env` exists with:

```bash
cat apps/mobile/.env
```

Should contain:
```
EXPO_PUBLIC_SUPABASE_URL=https://[your-project-ref].supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJh[your-anon-key]
```

---

## Step 6: Test Everything (10 minutes)

### 6.1 Test Local Development

```bash
cd /Users/daviddotson/actionbehavior

# Test web app
npm run web

# In another terminal, test mobile
npm run mobile
```

**Verify:**
- Web app loads at http://localhost:3000
- Can authenticate with Google
- Mobile app starts in Expo

### 6.2 Test GitHub Actions (Create Test PR)

```bash
cd /Users/daviddotson/actionbehavior

# Create test branch
git checkout -b test/github-actions

# Make a small change
echo "# CI/CD Test" >> TEST.md

# Commit and push
git add .
git commit -m "test: verify GitHub Actions workflows"
git push origin test/github-actions
```

### 6.3 Create Pull Request

1. Go to: https://github.com/TheSimpleApp/actionbehavior/pulls
2. Click **"New Pull Request"**
3. Base: `main` ← Compare: `test/github-actions`
4. Click **"Create Pull Request"**

### 6.4 Watch Workflows Run

1. Go to: **Actions** tab
2. You should see **"PR Checks"** workflow running
3. Wait for it to complete (2-5 minutes)
4. ✅ Should pass (type-check, lint, build)

If it passes → **All secrets configured correctly!**

### 6.5 Test Web Deployment (Optional)

```bash
# Merge the test PR to main
# This will trigger web deployment to Vercel

# Watch deployment:
vercel --prod
```

---

## Troubleshooting

### "Invalid token" error
**Solution:** Token expired or incorrect
- Regenerate the token
- Update GitHub secret

### "Project not found" error
**Solution:** Project ID mismatch
- Verify `VERCEL_PROJECT_ID` matches `.vercel/project.json`
- Verify `SUPABASE_PROJECT_REF` matches your project

### "Insufficient permissions" error
**Solution:** Token doesn't have required scopes
- Recreate token with full permissions
- Update GitHub secret

### Vercel build fails with "Module not found"
**Solution:** Dependencies not installed
- Check `package.json` includes all dependencies
- Verify build command is correct

### GitHub Actions workflow doesn't trigger
**Solution:** Workflow file syntax error
- Check `.github/workflows/` files for YAML errors
- Verify file extension is `.yml` not `.yaml`

---

## Security Checklist

After setup, verify:

- [ ] `.env.local` files are in `.gitignore`
- [ ] No tokens committed to Git
- [ ] All 9 secrets added to GitHub
- [ ] Service role key only in local `.env.local`
- [ ] Vercel environment variables configured
- [ ] Test PR workflow passed

---

## Need Help?

**Common Issues:**
1. **Vercel deployment fails:** Check build command in `vercel.json`
2. **GitHub Actions won't run:** Push to main or create PR
3. **Secrets not working:** Delete and recreate secret

**Resources:**
- Vercel Docs: https://vercel.com/docs
- Expo Docs: https://docs.expo.dev
- Supabase Docs: https://supabase.com/docs
- GitHub Actions: https://docs.github.com/actions

---

## Summary

Once complete, you'll have:

✅ **Vercel** - Auto-deploys web app on push to main
✅ **Expo/EAS** - Builds mobile apps on demand
✅ **Supabase** - Auto-runs database migrations
✅ **GitHub Actions** - Tests every PR automatically

**Total Time:** ~45-60 minutes
**Result:** Production-ready CI/CD pipeline 🚀

---

**Last Updated:** November 18, 2025
