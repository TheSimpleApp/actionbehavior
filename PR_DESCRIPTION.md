# Add Debug Setup & Supabase Connection Testing

## Summary
This PR adds comprehensive debugging setup and Supabase connection testing to enable proper local development and troubleshooting.

## Changes

### 🎯 Main Features

1. **Supabase Connection Testing on Home Page**
   - Real-time connection status display with visual indicators
   - Helpful error messages for debugging
   - Environment variable validation
   - Debug info panel

2. **Enhanced Error Handling**
   - Improved Supabase client error messages
   - Better validation of environment variables
   - Console logging for debugging

3. **Debugging Configuration**
   - VS Code launch configurations for Next.js debugging
   - Auto-attach debugging settings
   - Debug scripts in package.json

4. **Developer Experience**
   - Auto-launch PowerShell script
   - Comprehensive documentation
   - Troubleshooting guide

### 📝 Files Changed

**Modified:**
- `apps/web/app/page.tsx` - Added Supabase connection testing UI
- `apps/web/lib/supabase/client.ts` - Enhanced error handling
- `apps/web/next.config.ts` - Added env var exposure
- `apps/web/package.json` - Added debug scripts

**Added:**
- `.vscode/launch.json` - VS Code debug configurations
- `.vscode/settings.json` - VS Code debugging settings
- `launch-app.ps1` - Auto-launch script for Windows
- `DEBUG_SETUP.md` - Comprehensive documentation

### 🔧 Technical Details

#### Supabase Connection Testing
- Tests connection on page load
- Queries `events` table to verify connectivity
- Handles missing tables gracefully
- Shows clear error messages

#### Environment Variables
- Validates `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Displays debug info about env var status
- Updated `next.config.ts` to properly expose variables

#### Debugging Setup
- Server-side debugging with Node.js inspector
- Client-side debugging with Chrome DevTools
- Full-stack debugging support
- Auto-attach configuration

### 🚀 How to Test

1. **Start the app:**
   ```bash
   .\launch-app.ps1
   # or
   cd apps/web && npm run dev
   ```

2. **Check connection status:**
   - Navigate to http://localhost:3000
   - Look for "Supabase Connection Status" box
   - Green = Connected ✅
   - Red = Error (check message) ❌

3. **Test debugging:**
   - Open VS Code
   - Press F5
   - Select a debug configuration
   - Set breakpoints and debug

### 📚 Documentation

See `DEBUG_SETUP.md` for:
- Detailed setup instructions
- Troubleshooting guide
- Debugging workflows
- Environment variable requirements

### ✅ Checklist

- [x] App launches successfully
- [x] Supabase connection testing works
- [x] Error messages are helpful
- [x] Debugging configuration works
- [x] Documentation is complete
- [x] No breaking changes

### 🔍 Testing Notes

- Tested on Windows 10/11
- Works with VS Code and Cursor IDE
- Requires `.env.local` file with Supabase credentials
- Server runs on port 3000

### 📸 Screenshots

The home page now displays:
- ABC Summit 2025 title
- Supabase connection status box
- Navigation links (Register, Admin, Exports)
- Debug info panel

### 🐛 Known Issues

None at this time.

### 🔮 Future Improvements

- Add connection retry logic
- Add connection health check endpoint
- Add automated testing for connection status
- Add connection status to admin dashboard

