# 🎯 ABC Summit 2025 - Project Requirements

**Client:** Action Behavior Centers  
**Event:** ABC Summit 2025 - February 27-28, 2026  
**Venue:** Gaylord Texan, Grapevine, TX  
**Attendees:** ~2,400 employees  
**Budget:** $6,000

**Tech Stack:** React Native (Expo SDK 51) + Next.js 16 + Supabase

---

## 🔥 TOP 3 PRIORITIES

### #1 DATA EXPORTS (CRITICAL!)
**Why:** 2024's biggest pain point - exports were unreliable/incomplete

**Requirements:**
- One-click CSV export of ALL registration fields
- No data loss or truncation  
- Available on-demand to admin
- Multiple export types: Full Registration, Roommate Analysis, Flight Data, Hotel Data, Catering

**Client Quote:** "Data exports was a huge pain in the butt... that was my top one"

### #2 ROOMMATE PAIRING ALGORITHM
**Complexity:** 11 role types with specific pairing rules

**Role-Based Rules:**
- BCBA ↔ BCBA, Sr. BCBA, ACD, HQ
- Rising Star ↔ Rising Star, Rising Star+ ONLY
- Market Leaders/VPs ↔ Each other ONLY
- (Full rules: see PAIRING_RULES section below)

**Requirements:**
- Users select top 3 ranked roommates
- Algorithm runs after ALL registrations complete
- Preserve original selections permanently
- Admin override capability
- Export both: original choices + final matches

### #3 ADMIN CONTROL PANEL
**Goal:** Client manages content without developer

**Capabilities:**
- Real-time schedule/speaker/FAQ editing
- User management (add, edit, delete)
- Roommate pairing oversight
- Travel information management
- Push notification composer
- Data export access

---

## 📋 REGISTRATION WEBSITE FEATURES

**Core Registration:**
- RSVP (Yes/No)
- Self-service cancellation with admin approval workflow
- Users can re-register after cancellation (before deadline)

**Travel Management:**
- Travel needed (Y/N)
- Government name, DOB, gender (for airline)
- Personal email
- Frequent flyer numbers (Southwest, American, United)
- Flight preferences (1st, 2nd choice)
- Admin updates booked flight details

**Hotel & Roommates:**
- Hotel needed (Y/N)
- Select 3 roommates (ranked, role-filtered)
- Optional: "Open to any gender"
- Selections locked at registration

**Personal Info:**
- Shirt size (XS to 4XL)
- Meal preference (Chicken, Vegan/GF/DF)
- Medical accommodations (Y/N)
- Comments field

**Data Source:** Shanky system integration (employee data, roles)

---

## 📱 MOBILE APP FEATURES

**Travel Hub (NEW 2025 Feature):**
- Flight information display
- Hotel confirmation number
- Roommate info + phone number
- Pre-arrival checklist
- Link to Travel Perk
- All travel details in ONE place

**Event Features:**
- Countdown timer
- Real-time schedule
- Speaker bios
- Interactive floor plans (Gaylord Texan - clickable hotspots)
- Session bookmarks
- Push notifications
- QR code for check-in

---

## 🖥️ ADMIN DASHBOARD

**Content Management:**
- Schedule editor
- Speaker management
- FAQ editor
- Resource uploads
- Floor plan uploads

**User Management:**
- View all registrations
- Manual user addition
- Edit profiles (including preferred names)
- Approve/deny cancellations

**Roommate Management:**
- View all selections (top 3 per person)
- View algorithm matches
- Manual overrides
- Re-run algorithm after cancellations

**Travel Management:**
- Upload hotel confirmations
- Update flight details per user

**Data Exports (ALL TYPES):**
- Full registration data
- Roommate analysis (original + matched)
- Flight data (airline format)
- Hotel data
- Catering data
- Cancellation tracking

**Push Notifications:**
- Compose and send
- Stress test with 2,400 users
- Batch sending (400-500 at a time)

---

## 🔌 INTEGRATIONS

**Shanky System (REQUIRED):**
- Employee eligibility
- Job titles/roles
- Center/Market data
- Regular sync during registration

**Travel Perk (EXPLORATORY):**
- Display booked flights in app
- Automatic sync after booking
- Fallback: Manual admin upload

---

## 🔒 ROOMMATE PAIRING RULES

```typescript
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
```

---

## ⏰ TIMELINE

**Contract Dates:**
- Beta: Nov 25, 2025
- Launch: Dec 1, 2025
- Event: Feb 27-28, 2026

**Your Reality:** Building NOW = 10 months available!

**Development Phases:**
1. Foundation (2-3 weeks)
2. Registration Website (3-4 weeks)
3. Roommate Algorithm (2-3 weeks)
4. Data Exports (1-2 weeks)
5. Mobile App (3-4 weeks)
6. Admin Panel (3-4 weeks)
7. Polish & Testing (2-3 weeks)
8. Deployment (1 week)

**Total:** 18-24 weeks = 4.5-6 months (plenty of buffer!)

---

## 🎯 SUCCESS CRITERIA

**By Dec 1, 2025:**
- Registration website functional
- All data exports work perfectly
- Roommate algorithm handles all 11 roles
- Admin manages content independently
- Mobile app on TestFlight
- Push notifications tested with 2,400 users

**By Event (Feb 27-28, 2026):**
- Zero data export issues
- Real-time updates working
- QR check-in operational
- Client is HAPPY!

---

## 📚 NEXT STEPS

1. Read `START_BUILDING_NOW.md` for Week 1 plan
2. Follow `GETTING_STARTED.md` for setup
3. Use `AI_PROMPTS_CHEATSHEET.md` for ready prompts
4. Track progress with `PROJECT_CHECKLIST.md`

**Start vibe coding! 🚀**
