# MVP Sprint Plan

**MVP Launch Date:** December 1, 2025  
**Total Sprint Duration:** 13 days (Nov 18 - Dec 1)  
**Event Date:** February 27-28, 2026

## Overview

This sprint focuses on delivering a Minimum Viable Product (MVP) that covers the core functionality needed for the ABC Summit 2025 conference. The MVP prioritizes data exports, registration, and basic mobile functionality.

## Sprint Goals

1. ✅ Complete authentication system
2. ⭐ Build comprehensive data export system (Priority #1)
3. 🎯 Implement event registration with RSVP
4. 📱 Create mobile app MVP with basic features
5. 🚀 Deploy and test before launch

## Day-by-Day Breakdown

### Days 1-2: Setup + Authentication ✅

**Status:** Complete

**Tasks:**
- [x] Project structure setup
- [x] Supabase configuration
- [x] Database schema and migrations
- [x] Authentication flow (Google Sign-In)
- [x] User profile creation
- [x] RLS policies setup

**Deliverables:**
- Working authentication on web and mobile
- User profiles in database
- Secure RLS policies

---

### Days 3-5: Registration + Data Exports ⭐

**Status:** In Progress

**Priority:** HIGHEST - This is the #1 pain point from 2024

#### Day 3: Registration Form

**Tasks:**
- [ ] Build registration form with all fields
- [ ] Travel information collection
- [ ] Hotel preferences
- [ ] Meal preferences
- [ ] Roommate selection UI
- [ ] Form validation (React Hook Form + Zod)
- [ ] Save to database

**Deliverables:**
- Complete registration form
- Data saved to `registrations` table

#### Day 4: Admin Dashboard - Data Exports

**Tasks:**
- [ ] Admin dashboard layout
- [ ] Registration list view
- [ ] CSV export functionality
- [ ] Travel data export (for airline booking)
- [ ] Roommate analysis export
- [ ] Catering data export
- [ ] Export filters and sorting

**Deliverables:**
- Admin dashboard with export capabilities
- All CSV export formats working

#### Day 5: Registration Polish + Testing

**Tasks:**
- [ ] Error handling
- [ ] Loading states
- [ ] Success messages
- [ ] Form pre-filling (if user already registered)
- [ ] Testing all registration flows
- [ ] Edge case handling

**Deliverables:**
- Polished registration experience
- Tested and working exports

---

### Days 6-7: Mobile App MVP

**Status:** Pending

#### Day 6: Mobile Core Features

**Tasks:**
- [ ] Mobile navigation setup
- [ ] Home screen
- [ ] Event schedule view
- [ ] Profile screen
- [ ] Basic styling (NativeWind)
- [ ] Supabase client setup

**Deliverables:**
- Mobile app with core navigation
- Basic screens functional

#### Day 7: Mobile Registration + Travel Hub

**Tasks:**
- [ ] Mobile registration form
- [ ] Travel Hub screen (consolidated travel info)
- [ ] View registration status
- [ ] View travel details
- [ ] Mobile-optimized UI

**Deliverables:**
- Mobile registration working
- Travel Hub functional

---

### Days 8-9: Testing + Polish

**Status:** Pending

#### Day 8: Integration Testing

**Tasks:**
- [ ] End-to-end registration flow
- [ ] Export functionality testing
- [ ] Mobile app testing
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Bug fixes

**Deliverables:**
- All features tested
- Bug list and fixes

#### Day 9: UI/UX Polish

**Tasks:**
- [ ] Design consistency
- [ ] Loading states everywhere
- [ ] Error messages
- [ ] Success feedback
- [ ] Responsive design
- [ ] Accessibility improvements

**Deliverables:**
- Polished UI/UX
- Production-ready look and feel

---

### Days 10-11: Deployment

**Status:** Pending

#### Day 10: Production Setup

**Tasks:**
- [ ] Production environment variables
- [ ] Supabase production project setup
- [ ] Database migrations to production
- [ ] Build optimization
- [ ] Environment configuration

**Deliverables:**
- Production environment ready

#### Day 11: Deploy + Configure

**Tasks:**
- [ ] Deploy web app (Vercel/Netlify)
- [ ] Configure custom domain
- [ ] Set up mobile app build (EAS)
- [ ] Test production deployment
- [ ] SSL certificates
- [ ] CDN configuration

**Deliverables:**
- Live production app
- Mobile app ready for distribution

---

### Days 12-13: Final Testing + Launch 🚀

**Status:** Pending

#### Day 12: Final Testing

**Tasks:**
- [ ] Production testing
- [ ] Load testing
- [ ] Security review
- [ ] Documentation review
- [ ] User acceptance testing (if possible)
- [ ] Final bug fixes

**Deliverables:**
- Production-ready MVP
- All critical bugs fixed

#### Day 13: Launch

**Tasks:**
- [ ] Final deployment
- [ ] Announcement preparation
- [ ] User communication
- [ ] Monitoring setup
- [ ] Support preparation
- [ ] Launch! 🎉

**Deliverables:**
- MVP launched successfully
- Users can register

---

## Post-Launch (Dec 2 - Feb 27)

After MVP launch, focus on:

1. **Automated Roommate Pairing** - Algorithm implementation
2. **QR Code Check-In** - Mobile check-in feature
3. **Shanky Integration** - Third-party service integration
4. **Interactive Floor Plans** - Venue navigation
5. **Push Notifications** - User engagement
6. **Advanced Features** - Based on user feedback

## Success Metrics

- ✅ Users can register for the event
- ✅ Admin can export all data in CSV format
- ✅ Mobile app provides basic functionality
- ✅ All critical features working
- ✅ Production deployment successful

## Risk Mitigation

**Risk:** Data export complexity  
**Mitigation:** Start early (Day 4), test thoroughly

**Risk:** Mobile app delays  
**Mitigation:** Keep MVP scope minimal, focus on core features

**Risk:** Deployment issues  
**Mitigation:** Test deployment process early, have rollback plan

**Risk:** Time constraints  
**Mitigation:** Prioritize must-haves, defer nice-to-haves

## Notes

- Focus on **data exports** as highest priority
- Keep mobile MVP minimal but functional
- Test early and often
- Deploy to staging before production
- Have rollback plan ready

---

**Last Updated:** November 18, 2025  
**Next Review:** Daily during sprint

