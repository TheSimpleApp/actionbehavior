<!-- b8ee90c2-90cb-48ca-ac6e-26fe0c45dbb2 05efc6b5-625d-4bfa-92d6-c31dedbfb1ae -->
# ABC Summit 2025 - Final Implementation Plan

## Executive Summary

**V1 Killer Issue**: Data exports were broken (Firebase/Firestore nightmare)

**V2 Solution**: PostgreSQL (Supabase) + Next.js = trivial CSV exports

**Build Approach**: Use cursor.directory rules + shadcn/ui for rapid, beautiful builds

**Timeline**: 3 months to event (Dec-Feb)

---

## V1 Analysis (FlutterFlow + Firebase)

### Critical Pain Points:

1. **Data Exports**: NO CSV functionality - Firestore queries too complex
2. **Roommate Matching**: Basic multiplication scoring only
3. **Admin UX**: Mobile-first UI not ideal for desktop workflows
4. **Database**: Firestore not relational - hard to query/join

### What Worked:

- Mobile app UI patterns (port to React Native)
- Registration flow logic (reuse)
- User data structure (similar to v2)

### V1 Database Structure:

- 16+ Firebase collections (fragmented)
- users, userSelections, matches, event, etc.
- No proper relational model
- Hard to export/report

---

## V2 Architecture (VALIDATED - Keep Monorepo)

### Why Your Current Setup is Right:

**Web Admin (Next.js - apps/web):**

- Fixes data export issue (PostgreSQL → CSV)
- Desktop UX for 5-10 admins
- Public registration (2,400 attendees, no app download)
- Perfect for management workflows

**Mobile App (React Native - apps/mobile):**

- On-site event experience (Feb 27-28)
- 2,400 attendees during conference
- Travel hub, schedule, QR check-in
- Native mobile UX

**Shared Package (packages/shared):**

- Sophisticated roommate algorithm (better than v1)
- TypeScript types
- Utilities
- Write once, use everywhere

**Database (Supabase - PostgreSQL):**

- 10 clean relational tables
- Easy exports, joins, aggregations
- AI-friendly with MCP

---

## Rapid Development Setup

### Add Cursor Rules (from cursor.directory)

**Use: Next.js React TypeScript Rules**

Source: https://cursor.directory/nextjs-react-vite-javascript-cursor-rules

Benefits:

- Consistent code style
- Best practices built-in
- Type safety patterns
- Next.js optimization patterns

How to add:

- Copy rules to `.cursorrules` file in project root
- Cursor will use these for all code generation
- Ensures consistency across all features

### Install shadcn/ui (Beautiful Components)

**Why shadcn:**

- Pre-built beautiful components
- Radix UI primitives (accessible)
- Tailwind CSS styling
- Customizable, not a framework
- Perfect for admin dashboards

**Essential components to install:**

```bash
cd apps/web
npx shadcn@latest init  # Configure
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add table
npx shadcn@latest add dialog
npx shadcn@latest add form
npx shadcn@latest add input
npx shadcn@latest add select
npx shadcn@latest add tabs
npx shadcn@latest add badge
npx shadcn@latest add dropdown-menu
```

**Result:** Beautiful, accessible UI out of the box = build 3x faster

---

## Build Sequence (Priority Order)

### WEEK 1: Data Exports + Setup (Fixes V1 Killer)

**Day 1: Setup UI Framework**

- Add cursor.directory rules
- Install shadcn/ui components
- Configure Tailwind properly
- Create base layout with navigation

**Day 2-3: Full Registrations Export**

File: `apps/web/app/admin/exports/page.tsx`

Steps:

1. Use shadcn Table + Button components
2. Query registrations with Supabase MCP
3. Build CSV converter (papaparse library)
4. Add download button
5. Test live in browser

SQL Query:

```sql
SELECT 
  r.*,
  p.email,
  p.full_name,
  p.job_title,
  p.department,
  p.center
FROM registrations r
JOIN profiles p ON r.user_id = p.id
WHERE r.event_id = '[event-id]'
ORDER BY r.registered_at DESC
```

**Day 4: Roommate Selections Export**

Features:

- Original choices (3 ranked selections)
- Final matches (if algorithm run)
- Match scores
- Admin overrides marked

SQL:

```sql
SELECT 
  rs.*,
  p1.full_name as user_name,
  p2.full_name as choice_1_name,
  p3.full_name as choice_2_name,
  p4.full_name as choice_3_name,
  rm.user_2_id as matched_with,
  rm.match_score
FROM roommate_selections rs
JOIN profiles p1 ON rs.user_id = p1.id
LEFT JOIN profiles p2 ON rs.choice_1_user_id = p2.id
LEFT JOIN profiles p3 ON rs.choice_2_user_id = p3.id
LEFT JOIN profiles p4 ON rs.choice_3_user_id = p4.id
LEFT JOIN roommate_matches rm ON (rm.user_1_id = rs.user_id OR rm.user_2_id = rs.user_id)
```

**Day 5: Travel + Hotel + Catering Exports**

Build remaining 3 exports with filters.

**End of Week 1:**

- All 5 CSV exports working
- V1 killer issue FIXED
- Validated data flow end-to-end

### WEEK 2: User & Registration Management

**User Management** (`apps/web/app/admin/users/page.tsx`):

Use shadcn components:

- Table for list view
- Dialog for add/edit forms
- Form components for inputs
- Badge for role display

Features:

1. List all users with search/filter
2. Add user (form with validation)
3. Edit user (modal with form)
4. Delete user (confirmation dialog)
5. Bulk import from CSV

**Registration Management** (`apps/web/app/admin/registrations/page.tsx`):

Features:

1. List registrations with filters (RSVP, travel, hotel)
2. Edit registration details
3. Cancellation request queue
4. Approve/deny workflow
5. Mark travel/hotel booked
6. Search functionality

Use shadcn:

- Table with sorting/filtering
- Tabs for different views (All, Pending, Cancelled)
- Badge for status indicators
- Dialog for edit forms

### WEEK 3: Roommate Pairing

**Algorithm** (`packages/shared/src/algorithms/roommatePairing.ts`):

ALREADY BUILT! But enhance:

- Add detailed logging
- Add gender preference logic
- Add role validation
- Test with real data

**UI** (`apps/web/app/admin/roommates/page.tsx`):

Features:

1. View all selections (who chose whom)
2. "Run Algorithm" button with progress
3. Review matches table
4. Match score visualization
5. Unmatched users list
6. Manual override interface
7. Export final results

Use shadcn:

- Table for selections/matches
- Card for user profiles
- Dialog for manual matching
- Badge for match scores
- Tabs for different views

---

## Enhanced Registration Form

**File:** `apps/web/app/(public)/register/page.tsx`

Current state: Basic multi-step form exists

Enhance with shadcn:

- Form components
- Input validation
- Progress indicator
- Better UX

Steps:

1. RSVP (Yes/No)
2. Travel Info (if needed)
3. Hotel + Roommates (if needed)
4. Personal (shirt, meal, medical)
5. Review + Submit

---

## Live Development Workflow

### Your Setup (Already Working):

1. Dev server: localhost:3000 ✅
2. Hot reload: Instant updates ✅
3. Browser tools: Testing/debugging ✅
4. Supabase MCP: Database queries ✅
5. shadcn/ui: Beautiful components (to add)
6. Cursor rules: Consistency (to add)

### Build-Test-Iterate Cycle:

```
1. Open file in Cursor
2. Write code (AI helps with cursor rules)
3. Use shadcn component (pre-built, beautiful)
4. Save → Auto reload
5. Test in browser
6. Query database with Supabase MCP
7. Fix → Repeat
```

This IS bolt.new/lovable.dev!

---

## Implementation Details

### CSV Export Implementation

Use papaparse library:

```typescript
import Papa from 'papaparse'

async function exportToCSV(data: any[], filename: string) {
  const csv = Papa.unparse(data)
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
}
```

### Supabase MCP Queries

Example asking AI:

```
"Use Supabase MCP to get all registrations where travel_needed is true, 
include user email and full name"
```

AI will:

1. Use MCP to run SQL
2. Show you results
3. Help build the UI
4. Generate CSV export

### shadcn/ui Example

Instead of building from scratch:

```tsx
// Without shadcn:
// 50+ lines of button code, styling, accessibility

// With shadcn:
import { Button } from '@/components/ui/button'

<Button onClick={handleExport}>Export to CSV</Button>
```

Beautiful, accessible, works instantly!

---

## Timeline

### Month 1 (Now - Dec 31):

- Week 1: Setup + Data Exports ✅
- Week 2: User + Registration Management
- Week 3: Roommate Pairing UI
- Week 4: Enhanced Registration Form

### Month 2 (Jan 1-31):

- Week 1-2: Mobile App (React Native)
- Week 3: Schedule/Speakers Management
- Week 4: Push Notifications

### Month 3 (Feb 1-27):

- Week 1-2: Testing + Content Loading
- Week 3: Beta Testing
- Week 4: Final Prep
- Feb 27-28: EVENT LIVE! 🎉

---

## Success Metrics

### Week 1:

✅ All 5 CSV exports working

✅ Downloaded real data in Excel

✅ All fields present (no data loss like v1)

### Month 1:

✅ Complete web admin MVP

✅ Can manage users, registrations, roommates

✅ Ready for content loading

### Month 2:

✅ Mobile app working

✅ Can test full attendee flow

✅ Push notifications functional

### Event Day:

✅ 2,400 attendees registered

✅ Roommate assignments done

✅ Travel coordinated

✅ Zero data export failures (vs v1 disaster)

---

## Why This Plan Works

1. **Fixes V1 Issues**: Data exports first = killer issue solved
2. **Rapid Development**: shadcn/ui + cursor rules = 3x faster
3. **Beautiful UI**: Pre-built components, not custom CSS
4. **Live Iteration**: Hot reload + browser testing = bolt.new experience
5. **AI-Assisted**: Supabase MCP + cursor rules = AI helps with everything
6. **Proven Architecture**: Monorepo is right for this use case
7. **Mobile Last**: Web admin first = validate data, then build mobile

---

## Start Building Checklist

Before you start coding:

- [ ] Add cursor.directory rules to project
- [ ] Install shadcn/ui in apps/web
- [ ] Verify dev server running (localhost:3000)
- [ ] Confirm Supabase MCP working
- [ ] Read through this plan one more time

Then:

- [ ] Open `apps/web/app/admin/exports/page.tsx`
- [ ] Build first CSV export
- [ ] Test in browser
- [ ] Ship feature 1!

**You're ready to build. The plan is solid. Let's execute!**

### To-dos

- [ ] Analyze FlutterFlow v1 app structure and pain points
- [ ] Build data exports page with CSV functionality
- [ ] Export all registrations to CSV
- [ ] Export roommate selections and matches
- [ ] Export travel data
- [ ] Export hotel data
- [ ] Build users list view
- [ ] Add create/edit/delete user functionality
- [ ] Build registrations list view
- [ ] Add edit/cancellation management
- [ ] Implement roommate pairing algorithm in shared package
- [ ] Build roommate management UI