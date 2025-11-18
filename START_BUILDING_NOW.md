# 🚀 START BUILDING NOW - ABC Summit 2025
## Your Week 1 Action Plan with Vibe Coding

**You're 100% right to use React Native + Supabase for this project.**

Here's your immediate path forward with Claude Max + Cursor Ultra.

---

## ✅ Why You're Making the Smart Choice

**Contract says Flutter, you're choosing React Native + Supabase:**

### You're Right Because:
1. **Data Exports (Top Priority):** PostgreSQL → CSV is trivial vs. Firestore complexity
2. **Vibe Coding:** Claude/Cursor are TRAINED on React/TypeScript more than Dart/Flutter
3. **Admin Panel:** Same stack (Next.js) = code sharing, faster development
4. **Complex Queries:** Roommate algorithm much easier in SQL
5. **Your Tools:** Claude Max + Cursor Ultra = optimized for TypeScript
6. **Your Time:** You're busy = need fastest option = React Native with AI
7. **Your Experience:** You've built 6 apps - you know what works best

**Client wants OUTCOMES, not specific tech.** They want:
- ✅ Reliable data exports
- ✅ Admin control
- ✅ Automated roommate pairing
- ✅ Beautiful mobile app
- ✅ On time, on budget

**React Native + Supabase delivers ALL of that BETTER.**

---

## 🎯 Your Week 1 Plan (7 Days)

### Day 1-2: Project Setup + Database

**Use This First Prompt in Cursor:**
```
I'm building ABC Summit 2025 conference app for 2,400 employees.

Tech stack:
- Web (admin + registration): Next.js 16 + Supabase
- Mobile: React Native (Expo SDK 51) + Supabase
- Monorepo: Turborepo

Create the project structure:

1. Initialize monorepo with these apps:
   - apps/web (Next.js 16 with App Router)
   - apps/mobile (Expo SDK 51 with tabs template)
   - packages/shared (types, API, utils)

2. Set up package.json with these scripts:
   - dev:web, dev:mobile
   - db:push, db:types
   - build, lint, format

3. Configure TypeScript for all workspaces

4. Set up Tailwind CSS for web
5. Set up NativeWind for mobile

Generate complete folder structure with config files.
```

**Then Create Supabase Database:**
```
Create complete Supabase database schema for ABC Summit 2025.

TABLES NEEDED:

1. profiles (extends auth.users)
   - id, email, full_name, preferred_name
   - job_title (for pairing rules)
   - department, center, market
   - role (admin, attendee)
   - employee_id
   - from_shanky boolean
   - phone_number

2. events
   - id, title, description
   - start_date, end_date, location
   - image_url, status
   - max_attendees

3. registrations
   - id, user_id, event_id
   - rsvp_status, registered_at
   - travel_needed boolean
   - government_name, dob, gender
   - personal_email
   - frequent_flyer_southwest, frequent_flyer_american, frequent_flyer_united
   - flight_preference_1, flight_preference_2
   - booked_flight_details jsonb
   - hotel_needed boolean
   - shirt_size, meal_preference
   - medical_accommodations boolean
   - comments text
   - checked_in boolean
   - checked_in_at timestamp

4. roommate_selections
   - id, user_id, event_id
   - choice_1_user_id (1st preference)
   - choice_2_user_id (2nd preference)
   - choice_3_user_id (3rd preference)
   - open_to_any_gender boolean
   - submitted_at timestamp
   - locked boolean (prevents editing)

5. roommate_matches
   - id, event_id
   - user_1_id, user_2_id
   - match_score integer
   - matched_by (algorithm or admin)
   - admin_override boolean
   - confirmed_at timestamp

6. cancellation_requests
   - id, registration_id
   - user_id, requested_at
   - status (pending, approved, denied)
   - admin_notes text
   - processed_by user_id
   - processed_at timestamp

7. sessions
   - id, event_id
   - title, description
   - start_time, end_time
   - location, floor_plan_marker
   - speaker_name, speaker_bio

8. session_bookmarks
   - user_id, session_id
   - created_at

9. push_notifications
   - id, title, message
   - sent_to (all, specific_event, specific_users)
   - sent_at, sent_by
   - delivery_count

10. floor_plans
    - id, event_id
    - floor_number, image_url
    - hotspots jsonb (clickable areas)

Include:
- RLS policies (users see own data, admins see all)
- Indexes for performance
- Foreign key constraints
- Updated_at triggers
- Proper CASCADE deletes

Generate SQL migration file.
```

---

### Day 3: Registration Website (PRIORITY)

**Prompt:**
```
Create registration website for ABC Summit 2025.

File: apps/web/app/(public)/register/page.tsx

Multi-step registration form with these sections:

STEP 1: RSVP
- Yes/No radio buttons
- If No: Thank you message, end registration
- If Yes: Continue to next steps

STEP 2: Travel Information (conditional)
- "Do you need travel?" Y/N toggle
- If Yes:
  * Government name (text input)
  * Date of birth (date picker)
  * Gender dropdown (Male, Female)
  * Personal email (email input)
  * Frequent flyer numbers:
    - Southwest (optional)
    - American Airlines (optional)
    - United Airlines (optional)
  * Flight preference 1 (dropdown - will be populated by admin)
  * Flight preference 2 (dropdown)

STEP 3: Hotel & Roommates (conditional)
- "Do you need hotel?" Y/N toggle
- If Yes:
  * Roommate preference 1 (dropdown with role-based filtering)
  * Roommate preference 2 (dropdown)
  * Roommate preference 3 (dropdown)
  * Checkbox: "Open to any gender roommate"
  * Must complete all 3 roommate choices to proceed

STEP 4: Personal Preferences
- Shirt size dropdown (XS, S, M, L, XL, XXL, 3XL, 4XL)
- Meal preference radio (Chicken, Vegan/Gluten-Free/Dairy-Free)
- Medical accommodations needed? Y/N
  * If Yes: Show note "Please email details to..."
- Comments/feedback textarea (optional)

STEP 5: Review & Submit
- Summary of all selections
- Edit buttons for each section
- Submit button
- After submit: Redirect to app download page

Tech Requirements:
- react-hook-form with zod validation
- shadcn/ui Form components
- Progress indicator (Step 1 of 5)
- Save draft capability
- Load user data from profiles table
- Submit to registrations + roommate_selections tables
- Handle errors gracefully
- Success toast + redirect

Generate complete multi-step form.
```

---

### Day 4: Data Export System (CRITICAL!)

**Prompt:**
```
Create comprehensive data export system for ABC Summit 2025 admin.

File: apps/web/app/(admin)/exports/page.tsx

This is the TOP PRIORITY feature (2024's biggest pain point).

EXPORT TYPES (Each as separate CSV download):

1. Full Registration Export
   - ALL fields from registrations table
   - JOIN with profiles for user data
   - Include: name, email, employee_id, title, center
   - Include: rsvp, travel data, hotel data, preferences
   - Include: comments, registration date
   - No truncation, no data loss

2. Roommate Analysis Export (CRITICAL)
   - TWO separate CSV files:
     A. Original Selections:
        - Person name
        - 1st choice name
        - 2nd choice name
        - 3rd choice name
        - Open to any gender?
        - Submitted timestamp
     
     B. Final Matches:
        - Person 1 name
        - Person 2 name
        - Match score
        - Matched by (algorithm/admin)
        - Admin override (yes/no)
        - Confirmed date
   
   - Side-by-side downloadable for verification

3. Flight Data Export (for airline booking)
   - Government name, DOB, gender
   - Personal email
   - All frequent flyer numbers
   - Flight preferences (1st, 2nd)
   - Market assignment
   - Booked flight details (if entered)
   - Format optimized for travel agent submission

4. Hotel/Rooming Export
   - Person name, email
   - Roommate name, roommate phone
   - Hotel confirmation number
   - Room number (if assigned)
   - Special accommodations

5. Catering Export
   - Name, meal preference
   - Count totals by type
   - Medical accommodation notes

6. Cancellation Tracking Export
   - Pending cancellations (awaiting admin approval)
   - Approved cancellations with dates
   - Re-registration tracking

UI Design:
- Large, clear export buttons
- Export type selector
- Date range filter (optional)
- "Export All Data" master button
- Download progress indicator
- Export history log
- File naming: ABC_Summit_2025_[ExportType]_[Date].csv

Tech:
- Use Supabase queries with JOINs
- papaparse for CSV generation
- Handle 2,400+ records efficiently
- Download via browser
- Show success confirmation
- Error handling with retry

CRITICAL: Make this bulletproof. Test with large datasets.
This feature MUST work perfectly.
```

---

### Day 5: Roommate Pairing Algorithm

**Prompt:**
```
Create roommate pairing algorithm for ABC Summit 2025.

File: packages/shared/src/algorithms/roommatePairing.ts

COMPLEXITY: This is the most complex feature.

ROLE-BASED PAIRING RULES (11 role types):

const PAIRING_RULES = {
  'BCBA': ['BCBA', 'Sr. BCBA', 'ACD', 'HQ'],
  'Sr. BCBA': ['BCBA', 'Sr. BCBA', 'ACD', 'HQ'],
  'ACD': ['BCBA', 'Sr. BCBA', 'ACD', 'HQ'],
  'AOM': ['AOM', 'OM', 'Sr. OM', 'Group OM', 'CD', 'Sr. CD', 'Group CD', 'HQ'],
  'OM': ['AOM', 'OM', 'Sr. OM', 'Group OM', 'CD', 'Sr. CD', 'Group CD', 'HQ'],
  'Sr. OM': ['AOM', 'OM', 'Sr. OM', 'Group OM', 'CD', 'Sr. CD', 'Group CD', 'HQ'],
  'Group OM': ['AOM', 'OM', 'Sr. OM', 'Group OM', 'CD', 'Sr. CD', 'Group CD', 'HQ'],
  'CD': ['CD', 'Sr. CD', 'Group CD', 'AOM', 'OM', 'Sr. OM', 'Group OM', 'HQ'],
  'Sr. CD': ['CD', 'Sr. CD', 'Group CD', 'AOM', 'OM', 'Sr. OM', 'Group OM', 'HQ'],
  'Group CD': ['CD', 'Sr. CD', 'Group CD', 'AOM', 'OM', 'Sr. OM', 'Group OM', 'HQ'],
  'Rising Star': ['Rising Star', 'Rising Star+'],
  'Rising Star+': ['Rising Star', 'Rising Star+'],
  'RDO': ['RDO', 'RCD'],
  'RCD': ['RDO', 'RCD'],
  'Market Leader': ['Market Leader', 'VP'],
  'VP': ['Market Leader', 'VP'],
  'HQ': ['BCBA', 'Sr. BCBA', 'ACD', 'CD', 'Sr. CD', 'Group CD', 'AOM', 'OM', 'Sr. OM', 'Group OM', 'HQ']
};

ALGORITHM REQUIREMENTS:
1. Wait until ALL eligible attendees submit top 3 choices
2. Run fully automated matching
3. Optimize for:
   - Mutual first choices (highest score)
   - Mutual second choices
   - Mutual third choices
   - Role compatibility
4. Preserve original selections permanently (locked)
5. Return matches with scores
6. Handle unmatched users gracefully

SPECIAL CASES:
- Rising Star/Rising Star+ can ONLY pair with each other
- Market Leaders/VPs can ONLY pair with each other
- Handle odd numbers (one person gets single room)
- Admin can override any match
- Re-run algorithm when cancellations occur

Function signature:
export async function runRoommatePairing(eventId: string): Promise<{
  matches: RoommateMatch[];
  unmatched: User[];
  algorithm_log: string[];
}>

Include detailed comments explaining logic.
Test with sample data.
```

---

### Day 6: Mobile App - Travel Hub

**Prompt:**
```
Create Travel Hub screen for ABC Summit 2025 mobile app.

File: apps/mobile/app/(tabs)/travel.tsx

This is a NEW highlighted feature for 2025.

SECTIONS (Card-based layout):

1. Event Countdown
   - Days until ABC Summit 2025
   - Feb 27-28, 2026
   - Animated countdown

2. Flight Information
   - Booked flight details (if available)
   - Flight number, departure/arrival
   - Confirmation number
   - Link to booking (if Travel Perk integration works)
   - Fallback: "Contact travel team to book"

3. Hotel Information
   - Hotel: Gaylord Texan
   - Address: 1501 Gaylord Trail, Grapevine, TX 76051
   - Confirmation number (from admin upload)
   - Check-in/out dates

4. Roommate Information
   - Roommate name (large, prominent)
   - Roommate phone number (tap to call)
   - "Message roommate" button
   - Photo (if available)

5. Pre-Arrival Checklist
   - Interactive checklist with checkboxes
   - Complete CAS
   - Download travel documents
   - Review event schedule
   - Pack essentials
   - Progress bar

6. Quick Links (Button grid)
   - Travel Policy (PDF)
   - Book with Travel Perk
   - Contact Travel Team
   - View Event Schedule
   - View Floor Plans

Design:
- Use NativeWind for styling
- Card components with shadows
- Prominent confirmation numbers
- Tap-to-call/email functionality
- Pull-to-refresh
- Offline-capable (cache data)
- Loading states
- Empty states if no travel needed

Make this the ONE PLACE for all travel info!
```

---

### Day 7: Admin Dashboard Shell

**Prompt:**
```
Create admin dashboard for ABC Summit 2025.

File: apps/web/app/(admin)/page.tsx

LAYOUT:
- Sidebar with navigation:
  * Dashboard (overview)
  * Registrations (manage)
  * Roommates (algorithm + overrides)
  * Travel (manage bookings)
  * Exports (CSV downloads) ← Highlight this
  * Content (schedule, FAQ, speakers)
  * Notifications (push composer)
  * Users (manual add/edit)
  * Settings

- Main Dashboard:
  * Stat cards (4 across):
    - Total Registrations: [count]
    - Pending Cancellations: [count] (red badge if > 0)
    - Travel Bookings: [count]
    - Hotel Rooms Needed: [count]
  
  * Recent Activity feed:
    - New registrations (realtime)
    - Cancellation requests
    - Roommate selections completed
    - Export history
  
  * Quick Actions:
    - "Export All Data" (prominent button)
    - "Send Push Notification"
    - "Add New User"
    - "Run Roommate Algorithm"

- Admin auth check:
  * Redirect if not admin role
  * Show loading during auth check

Use:
- shadcn/ui components (Sidebar, Card, Badge, Button)
- Supabase Realtime for live updates
- TanStack Query for data fetching
- Clean, professional design

Generate complete admin dashboard.
```

---

## 🎯 Critical Features to Build First

**Priority Order:**
1. **Data Export System** (Day 4) - Most critical!
2. **Registration Form** (Day 3) - Core functionality
3. **Roommate Algorithm** (Day 5) - Most complex
4. **Admin Dashboard** (Day 7) - Client empowerment
5. **Travel Hub** (Day 6) - New feature
6. Database Schema (Day 1-2) - Foundation

---

## 📊 Week 1 Success Criteria

By end of Week 1, you should have:

**Functional:**
- [ ] User can complete registration form
- [ ] Admin can export ALL registration data to CSV
- [ ] Admin can see roommate selections
- [ ] Mobile app runs and shows travel hub
- [ ] Database schema deployed

**Tested:**
- [ ] Registration submission works
- [ ] CSV export includes all fields
- [ ] No data truncation
- [ ] Mobile app launches

**Next Week Preview:**
- Finish roommate pairing algorithm
- Content management system
- Push notifications
- Shanky integration

---

## 💡 Pro Tips

### Verify Exports Immediately
After building export system:
```sql
-- Create 100 test registrations
-- Export to CSV
-- Open in Excel
-- Verify ALL columns present
-- Check no truncation
```

### Test Roommate Rules Early
```typescript
// Test each role type
// Verify dropdown only shows valid pairings
// Test all 11 role combinations
```

### Use Claude for Complex Logic
Roommate pairing algorithm is complex. Ask Claude:
```
Help me design an optimal matching algorithm for roommates
with these constraints...
```

---

## 🚀 Let's Go!

**Right Now:**
1. Open Cursor
2. Paste first prompt (project setup)
3. Let Claude + Cursor build it
4. Review, test, iterate

**This Week:**
- Build foundation
- Get exports working (CRITICAL!)
- Create registration form
- Mobile app shell

**You have ~10 months. Start strong! 💪**

---

**Next file to read:** `ABC_SUMMIT_2025_REQUIREMENTS.md` for complete feature list.

**GitHub:** https://github.com/TheSimpleApp/actionbehavior
