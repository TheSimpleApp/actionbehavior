# Debug Setup & Supabase Connection Testing

## Overview
This document describes the debugging setup and Supabase connection testing implementation that was added to enable proper local development and testing.

## Changes Made

### 1. Home Page Supabase Connection Testing (`apps/web/app/page.tsx`)
- **Changed from**: Static Next.js template page
- **Changed to**: Dynamic page with Supabase connection testing
- **Features Added**:
  - Real-time Supabase connection status display
  - Visual indicators (green for connected, red for failed, yellow for loading)
  - Error message display with helpful debugging info
  - Environment variable validation
  - Navigation links to key app sections (Register, Admin, Exports)
  - Debug info panel showing env var status

### 2. Enhanced Supabase Client Error Handling (`apps/web/lib/supabase/client.ts`)
- **Added**: Comprehensive error checking and logging
- **Features**:
  - Validates `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
  - Throws descriptive errors if env vars are missing
  - Console logging for debugging
  - Better error messages to help diagnose connection issues

### 3. Next.js Configuration Update (`apps/web/next.config.ts`)
- **Added**: Explicit environment variable exposure
- **Why**: Ensures environment variables are properly available to client-side code
- **Note**: This is important for Next.js 16+ to properly expose `NEXT_PUBLIC_*` variables

### 4. VS Code Debugging Configuration (`.vscode/launch.json`)
- **Created**: Debug configurations for Next.js
- **Configurations**:
  - `Next.js: debug server-side` - Debug Node.js server code
  - `Next.js: debug client-side` - Debug React components in Chrome
  - `Next.js: debug full stack` - Debug both server and client simultaneously

### 5. VS Code Settings (`.vscode/settings.json`)
- **Added**: Auto-attach debugging settings
- **Features**:
  - Auto-attach to Node.js processes
  - Smart JavaScript debugging
  - Break on conditional errors and uncaught exceptions

### 6. Auto-Launch Script (`launch-app.ps1`)
- **Created**: PowerShell script to automatically start the dev server
- **Features**:
  - Checks if port 3000 is in use and stops existing processes
  - Verifies `.env.local` file exists
  - Installs dependencies if needed
  - Starts Next.js dev server
  - Opens browser automatically
  - Shows helpful status messages

### 7. Debug Scripts (`apps/web/package.json`)
- **Added**: `dev:debug` - Starts dev server with Node.js inspector
- **Added**: `debug` - Starts dev server with Turbo mode

## How to Use

### Starting the App
```bash
# Option 1: Use the auto-launch script
.\launch-app.ps1

# Option 2: Manual start
cd apps/web
npm run dev

# Option 3: With debugging
cd apps/web
npm run dev:debug
```

### Testing Supabase Connection
1. Navigate to http://localhost:3000
2. Check the "Supabase Connection Status" box on the home page
3. **Green box** = Connected successfully ✅
4. **Red box** = Connection failed - check error message ❌
5. **Yellow box** = Testing connection... ⏳

### Debugging in VS Code
1. Open VS Code
2. Go to Run and Debug (F5)
3. Select one of the debug configurations:
   - `Next.js: debug server-side` - For server-side debugging
   - `Next.js: debug client-side` - For React component debugging
   - `Next.js: debug full stack` - For both

### Troubleshooting

#### Connection Failed Errors
If you see a red connection status box:

1. **Check `.env.local` file exists**:
   ```bash
   ls apps/web/.env.local
   ```

2. **Verify environment variables are set**:
   ```bash
   # Should show your Supabase URL
   cat apps/web/.env.local | grep NEXT_PUBLIC_SUPABASE_URL
   ```

3. **Check Supabase project is active**:
   - Visit your Supabase dashboard
   - Verify project is not paused
   - Check API keys are correct

4. **Verify database tables exist**:
   ```bash
   npx supabase db push
   ```

#### Server Won't Start
1. **Check if port 3000 is in use**:
   ```powershell
   netstat -ano | findstr :3000
   ```

2. **Kill existing process**:
   ```powershell
   # Replace PID with actual process ID
   Stop-Process -Id <PID> -Force
   ```

3. **Clear Next.js cache**:
   ```bash
   cd apps/web
   rm -rf .next
   npm run dev
   ```

## Files Changed

### Modified Files
- `apps/web/app/page.tsx` - Added Supabase connection testing
- `apps/web/lib/supabase/client.ts` - Enhanced error handling
- `apps/web/next.config.ts` - Added env var exposure
- `apps/web/package.json` - Added debug scripts

### New Files
- `.vscode/launch.json` - VS Code debug configuration
- `.vscode/settings.json` - VS Code settings
- `launch-app.ps1` - Auto-launch script
- `DEBUG_SETUP.md` - This documentation

## Environment Variables Required

Make sure `apps/web/.env.local` contains:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
SUPABASE_PROJECT_ID=your_project_id_here
```

## Next Steps

1. ✅ App launches successfully
2. ✅ Supabase connection testing implemented
3. ✅ Debugging configuration added
4. ⏭️ Test registration flow
5. ⏭️ Test admin dashboard
6. ⏭️ Test data exports

## Notes

- The home page now serves as a health check dashboard
- Connection status updates automatically on page load
- All error messages are user-friendly and actionable
- Debug configuration works with VS Code and Cursor IDE

