# 📘 Final Documentation - ABC Summit 2025

Complete technical reference for the ActionBehavior conference platform.

---

## 🎯 Project Overview

**Name:** ABC Summit 2025  
**Client:** Action Behavior Centers  
**Event:** February 27-28, 2026  
**Venue:** Gaylord Texan, Grapevine, TX  
**Scale:** 2,400 attendees  
**Budget:** $6,000

---

## 🏗️ Tech Stack

### Frontend
- **Web Admin & Registration:** Next.js 14.1.0 (App Router)
- **Mobile App:** React Native via Expo SDK 50.0.0
- **Styling:** Tailwind CSS 3.4.1 + NativeWind 4.0.1
- **UI Components:** shadcn/ui (web)

### Backend
- **Database:** Supabase (PostgreSQL 15)
- **Auth:** Supabase Auth
- **Storage:** Supabase Storage
- **Realtime:** Supabase Realtime

### State & Data
- **Server State:** @tanstack/react-query 5.17.19
- **Client State:** Zustand 4.5.0
- **Forms:** react-hook-form 7.49.3
- **Validation:** Zod 3.22.4

### Development
- **Monorepo:** Turborepo 1.12.0
- **Language:** TypeScript 5.3.3
- **AI Tools:** Claude Max + Cursor Ultra

---

## 🗄️ Database Schema

### Core Tables (10)

```sql
-- 1. profiles (User Management)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users,
  email TEXT NOT NULL,
  full_name TEXT,
  preferred_name TEXT,
  job_title TEXT, -- For roommate pairing rules
  department TEXT,
  center TEXT,
  market TEXT,
  role TEXT DEFAULT 'attendee',
  employee_id TEXT,
  phone_number TEXT,
  from_shanky BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. events
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  location TEXT,
  image_url TEXT,
  status TEXT DEFAULT 'draft',
  max_attendees INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. registrations (ALL registration fields)
CREATE TABLE registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  event_id UUID REFERENCES events(id),
  rsvp_status TEXT, -- 'yes' or 'no'
  
  -- Travel fields
  travel_needed BOOLEAN,
  government_name TEXT,
  date_of_birth DATE,
  gender TEXT,
  personal_email TEXT,
  frequent_flyer_southwest TEXT,
  frequent_flyer_american TEXT,
  frequent_flyer_united TEXT,
  flight_preference_1 TEXT,
  flight_preference_2 TEXT,
  booked_flight_details JSONB,
  
  -- Hotel fields
  hotel_needed BOOLEAN,
  
  -- Personal fields
  shirt_size TEXT,
  meal_preference TEXT,
  medical_accommodations BOOLEAN,
  comments TEXT,
  
  -- Status
  checked_in BOOLEAN DEFAULT FALSE,
  checked_in_at TIMESTAMPTZ,
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, event_id)
);

-- 4. roommate_selections (Top 3 ranked choices)
CREATE TABLE roommate_selections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  event_id UUID REFERENCES events(id),
  choice_1_user_id UUID REFERENCES profiles(id),
  choice_2_user_id UUID REFERENCES profiles(id),
  choice_3_user_id UUID REFERENCES profiles(id),
  open_to_any_gender BOOLEAN DEFAULT FALSE,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  locked BOOLEAN DEFAULT TRUE, -- Prevent editing after submit
  UNIQUE(user_id, event_id)
);

-- 5. roommate_matches (Algorithm results)
CREATE TABLE roommate_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id),
  user_1_id UUID REFERENCES profiles(id),
  user_2_id UUID REFERENCES profiles(id),
  match_score INTEGER,
  matched_by TEXT DEFAULT 'algorithm', -- or 'admin'
  admin_override BOOLEAN DEFAULT FALSE,
  confirmed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, user_1_id)
);

-- 6. cancellation_requests
CREATE TABLE cancellation_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id UUID REFERENCES registrations(id),
  user_id UUID REFERENCES profiles(id),
  requested_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'pending', -- pending, approved, denied
  admin_notes TEXT,
  processed_by UUID REFERENCES profiles(id),
  processed_at TIMESTAMPTZ
);

-- 7-10. Additional tables for sessions, floor_plans, notifications, etc.
```

### RLS Policies

```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Users see own data
CREATE POLICY "Users view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users view own registration" ON registrations
  FOR SELECT USING (auth.uid() = user_id);

-- Admins see all
CREATE POLICY "Admins view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins view all registrations" ON registrations
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

---

## 🔐 Authentication

**Method:** Google Sign-In via Supabase Auth  
**Access Control:** Email-based (ABC email addresses only)  
**Roles:** Admin, Attendee

---

## 📊 Data Exports

**Top Priority Feature!**

Export types:
1. Full Registration (all fields)
2. Roommate Analysis (original + matched)
3. Flight Data (for airlines)
4. Hotel Data (confirmations, roommates)
5. Catering (meal counts)
6. Cancellations (tracking)

**Implementation:**
```typescript
// Simple with PostgreSQL!
const { data } = await supabase
  .from('registrations')
  .select('*, profiles(*), roommate_selections(*)')
  .eq('event_id', eventId);

// Convert to CSV with papaparse
const csv = Papa.unparse(data);
// Download
```

---

## 🧩 Roommate Pairing

**11 Role Types with Specific Rules**

```typescript
const PAIRING_RULES = {
  'BCBA': ['BCBA', 'Sr. BCBA', 'ACD', 'HQ'],
  'Rising Star': ['Rising Star', 'Rising Star+'], // ONLY
  'Market Leader': ['Market Leader', 'VP'], // ONLY
  // ... see ABC_SUMMIT_2025_REQUIREMENTS.md for full list
};
```

**Algorithm:**
1. Collect all user top 3 choices
2. Calculate mutual preference scores
3. Enforce role-based rules
4. Generate optimal matches
5. Handle unmatched users
6. Allow admin overrides

---

## 📱 Mobile App Structure

```
app/
  (tabs)/
    index.tsx        # Events
    travel.tsx       # Travel Hub (NEW!)
    schedule.tsx     # My Schedule
    profile.tsx      # Profile + QR
```

---

## 🖥️ Admin Dashboard Structure

```
app/(admin)/
  page.tsx                    # Dashboard
  registrations/              # Manage
  roommates/                  # Algorithm + overrides
  exports/                    # CSV downloads
  content/                    # Schedule, FAQ, etc.
  notifications/              # Push composer
  users/                      # Manual add/edit
```

---

## 🚀 Deployment

**Web:** Vercel  
**Mobile:** Expo EAS Build  
**iOS:** TestFlight (private)  
**Android:** Internal testing

---

## 📊 Success Metrics

- [ ] 2,400 users supported
- [ ] Data exports: 100% reliable
- [ ] Roommate algorithm: 100% accurate
- [ ] Admin independence: 90%+
- [ ] Mobile experience: 5-star worthy
- [ ] On-time launch: Dec 1, 2025

---

**For complete details, see other documentation files.**

**Start building:** `START_BUILDING_NOW.md`
