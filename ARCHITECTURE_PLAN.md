# 🏗️ Architecture Plan - ABC Summit 2025

## Tech Stack

**Mobile:** React Native (Expo SDK 50)  
**Web:** Next.js 14 (App Router)  
**Database:** Supabase (PostgreSQL)  
**Auth:** Supabase Auth (Google Sign-In)  
**Storage:** Supabase Storage  
**State:** Zustand + TanStack Query  
**Styling:** Tailwind + NativeWind

---

## 📊 Database Schema

```sql
-- 10 Core Tables

1. profiles - User data from Shanky + preferences
2. events - ABC Summit 2025 event  
3. registrations - All registration fields (travel, hotel, preferences)
4. roommate_selections - Top 3 ranked choices per person
5. roommate_matches - Algorithm results + admin overrides
6. cancellation_requests - Pending admin approval
7. sessions - Event schedule
8. session_bookmarks - User's saved sessions
9. push_notifications - Notification history
10. floor_plans - Venue maps with hotspots
```

### Key Features
- Row Level Security (RLS) policies
- Indexes for 2,400 user scale
- Foreign key constraints
- Updated_at triggers
- Optimized for CSV exports

---

## 🏗️ Project Structure

```
abc-summit-2025/
├── apps/
│   ├── web/                    # Next.js (Admin + Registration)
│   │   ├── app/
│   │   │   ├── (public)/       # Registration website
│   │   │   ├── (admin)/        # Admin dashboard
│   │   │   └── api/
│   │   └── components/
│   │
│   └── mobile/                 # React Native (Expo)
│       ├── app/
│       │   ├── (auth)/
│       │   ├── (tabs)/         # Home, Travel, Schedule, Profile
│       │   └── event/
│       └── components/
│
├── packages/
│   └── shared/                 # Shared code
│       ├── types/
│       ├── api/
│       ├── utils/
│       └── algorithms/
│
└── supabase/
    ├── migrations/
    └── functions/
```

---

## 🔐 Authentication & Authorization

**Auth Method:** Google Sign-In (via Supabase)  
**Access Control:** Email-based (ABC email addresses)  
**Roles:** Admin, Attendee

**RLS Policies:**
- Users see own data
- Admins see all data
- Prevent unauthorized access

---

## 🎯 Development Phases

### Phase 1: Foundation (2-3 weeks)
- Monorepo setup
- Database schema
- Auth system
- Basic UI shells

### Phase 2: Registration (3-4 weeks)
- Multi-step form
- Roommate selection
- Shanky integration
- Data validation

### Phase 3: Roommate Algorithm (2-3 weeks)
- Pairing logic (11 role types)
- Admin override
- Re-pairing workflow

### Phase 4: Data Exports (1-2 weeks)
- All export types
- CSV generation
- Testing with large data

### Phase 5: Mobile App (3-4 weeks)
- Travel Hub
- Interactive maps
- Push notifications
- QR codes

### Phase 6: Admin Panel (3-4 weeks)
- Content management
- User management
- Roommate oversight
- Export UI

### Phase 7: Polish & Deploy (2-3 weeks)
- Testing
- Bug fixes
- Deployment
- Training

**Total:** 18-24 weeks (you have 40+ weeks!)

---

## 🚀 Deployment

**Web:** Vercel (Next.js optimized)  
**Mobile:** Expo EAS Build  
**iOS:** TestFlight (already approved)  
**Android:** Internal testing

---

## 📊 Success Metrics

- All data exports work perfectly
- Roommate algorithm handles 2,400 users
- Admin manages independently
- Mobile app feels smooth
- Launch on time (Dec 1, 2025)
- Event runs smoothly (Feb 27-28, 2026)

---

**See also:**
- `MVP_ARCHITECTURE.md` - Simplified approach
- `FINAL_DOCUMENTATION.md` - Comprehensive guide
- `ABC_SUMMIT_2025_REQUIREMENTS.md` - Full requirements
