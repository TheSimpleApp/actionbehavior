# 🤖 AI Prompts Cheatsheet - ABC Summit 2025

Quick copy-paste prompts for vibe coding this project.

---

## 🏗️ Initial Setup

### Database Schema
```
Create Supabase database schema for ABC Summit 2025 conference app.

Tables: profiles, events, registrations, roommate_selections, roommate_matches, 
cancellation_requests, sessions, session_bookmarks, push_notifications, floor_plans

Include: RLS policies, indexes, foreign keys, updated_at triggers

Key requirements:
- Support 2,400 attendees
- Complex roommate pairing (11 role types)
- All registration fields (travel, hotel, preferences)
- Data export optimization

Generate migration SQL file.
```

---

## 📝 Registration Website

### Multi-Step Registration Form
```
Create registration form for ABC Summit 2025.

File: apps/web/app/(public)/register/page.tsx

Steps:
1. RSVP (Yes/No)
2. Travel Info (conditional): government name, DOB, gender, frequent flyer #s, flight preferences
3. Hotel & Roommates (conditional): 3 ranked roommate choices with role-based filtering
4. Personal Info: shirt size, meal preference, medical accommodations
5. Review & Submit

Use: react-hook-form, zod, shadcn/ui, Supabase
Include: progress indicator, save draft, validation
```

### Roommate Selection Component
```
Create roommate selector with role-based filtering.

Pairing Rules (11 types):
- BCBA ↔ BCBA, Sr. BCBA, ACD, HQ
- Rising Star ↔ Rising Star, Rising Star+ ONLY
- Market Leader/VP ↔ Each other ONLY
[Full rules in ABC_SUMMIT_2025_REQUIREMENTS.md]

Features:
- 3 dropdowns (1st, 2nd, 3rd choice)
- Filter by user's role
- Prevent duplicate selections
- Lock selections on submit
```

---

## 📊 Data Export System

### Complete Export Functionality
```
Create comprehensive data export system.

File: apps/web/app/(admin)/exports/page.tsx

TOP PRIORITY: This was 2024's biggest pain point!

Export Types:
1. Full Registration (ALL fields, no truncation)
2. Roommate Analysis (original choices + final matches)
3. Flight Data (optimized for airline booking)
4. Hotel/Rooming Data
5. Catering Data
6. Cancellation Tracking

Use: Supabase queries, papaparse for CSV, download functionality

Critical: Test with 2,400+ records, verify NO data loss
```

---

## 🧩 Roommate Pairing Algorithm

### Automated Matching System
```
Create roommate pairing algorithm.

File: packages/shared/src/algorithms/roommatePairing.ts

Requirements:
- Handle 11 role types with specific pairing rules
- Wait for ALL registrations before running
- Optimize for mutual preferences
- Preserve original selections permanently
- Handle edge cases (odd numbers, promotions)
- Support admin override
- Re-run on cancellations

Function: runRoommatePairing(eventId: string)
Returns: matches[], unmatched[], algorithm_log[]
```

---

## 📱 Mobile App

### Travel Hub Screen
```
Create Travel Hub for ABC Summit mobile app.

File: apps/mobile/app/(tabs)/travel.tsx

NEW highlighted feature for 2025!

Sections:
- Event countdown
- Flight information
- Hotel confirmation number
- Roommate info + phone number
- Pre-arrival checklist
- Quick links (Travel Perk, policy, etc.)

Design: Card-based, NativeWind styling, offline-capable
Goal: ONE place for ALL travel info
```

### QR Code Profile
```
Create user profile with QR code.

File: apps/mobile/app/(tabs)/profile.tsx

Display:
- User info (name, email, title)
- Large QR code (from user ID)
- Registration status
- Roommate assignment
- Hotel/flight details
- Edit preferred name option

Use: react-native-qrcode-svg, keep screen bright
```

---

## 🖥️ Admin Dashboard

### Main Dashboard
```
Create admin dashboard for ABC Summit 2025.

File: apps/web/app/(admin)/page.tsx

Layout:
- Sidebar navigation (registrations, roommates, travel, exports, content, notifications, users)
- Stat cards (total registrations, pending cancellations, travel bookings, hotel needs)
- Recent activity feed (realtime)
- Quick actions (export all, send notification, add user, run algorithm)

Use: shadcn/ui, Supabase Realtime, TanStack Query
Auth: Admin role check with redirect
```

### Content Management
```
Create content management system.

Files: apps/web/app/(admin)/content/*

Allow admin to edit:
- Schedule (add/edit/remove sessions)
- Speakers (bios, photos)
- FAQs (Q&A pairs)
- Resources (upload documents)
- Floor plans (upload, add hotspots)

Real-time sync with mobile app
No developer needed for updates
```

---

## 🔔 Push Notifications

### Notification Composer
```
Create push notification system.

File: apps/web/app/(admin)/notifications/page.tsx

Features:
- Compose notification (title, message)
- Send to: All users, specific event, specific roles
- Schedule for later (optional)
- Preview before sending
- Batch sending (400-500 at a time)
- Delivery tracking

Stress test: Must handle 2,400 users
Delivery: Within 2 minutes
```

---

## 🎯 Quick Wins

### Event Card Component
```
Create EventCard for both web and mobile.

Web: apps/web/components/EventCard.tsx
Mobile: apps/mobile/components/EventCard.tsx

Display: image, title, date, location, attendee count
Props: event object, onPress/onClick
Variants: compact, full
```

### Data Export Button
```
Add CSV export button to any admin page.

Props: exportType, filters, filename
On click: Query Supabase, convert to CSV, download
Show: progress, success message
```

---

## 🔧 Utility Functions

### Role-Based Pairing Check
```
Create utility to check if two roles can pair.

File: packages/shared/src/utils/roommatePairing.ts

function canPairRoles(role1: string, role2: string): boolean {
  const rules = PAIRING_RULES;
  return rules[role1]?.includes(role2) || false;
}
```

### CSV Export Helper
```
Create CSV export utility.

File: packages/shared/src/utils/csvExport.ts

function exportToCSV(data: any[], filename: string): void {
  // Use papaparse
  // Generate CSV
  // Trigger download
  // No data truncation!
}
```

---

## 🎓 Best Practices

### Always Specify Tech Stack
```
Good: "Create [feature] using Next.js 14, Supabase, shadcn/ui"
Bad: "Create [feature]"
```

### Reference Existing Code
```
Good: "Create SessionCard similar to EventCard but with [differences]"
Bad: "Create SessionCard"
```

### Request Tests
```
"Create [feature] and include unit tests with Jest"
```

---

## 💡 Pro Tips

1. Use Cursor Composer (Ctrl+I) for multi-file edits
2. Ask Claude for complex algorithms (roommate pairing)
3. Test data exports immediately with large datasets
4. Verify all 11 role types work in pairing
5. Reference `ABC_SUMMIT_2025_REQUIREMENTS.md` for full specs

---

**More prompts in:** `VIBE_CODING_GUIDE.md`

**Start building:** `START_BUILDING_NOW.md`
