-- ABC Summit 2025 - Initial Database Schema
-- Created: November 18, 2025

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. profiles (User Management)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  preferred_name TEXT,
  job_title TEXT, -- For roommate pairing rules
  department TEXT,
  center TEXT,
  market TEXT,
  role TEXT DEFAULT 'attendee' CHECK (role IN ('admin', 'attendee')),
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
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  max_attendees INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. registrations (ALL registration fields)
CREATE TABLE registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  rsvp_status TEXT CHECK (rsvp_status IN ('yes', 'no')),
  
  -- Travel fields
  travel_needed BOOLEAN DEFAULT FALSE,
  government_name TEXT,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('Male', 'Female', 'Other')),
  personal_email TEXT,
  frequent_flyer_southwest TEXT,
  frequent_flyer_american TEXT,
  frequent_flyer_united TEXT,
  flight_preference_1 TEXT,
  flight_preference_2 TEXT,
  booked_flight_details JSONB,
  
  -- Hotel fields
  hotel_needed BOOLEAN DEFAULT FALSE,
  
  -- Personal fields
  shirt_size TEXT CHECK (shirt_size IN ('XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL')),
  meal_preference TEXT CHECK (meal_preference IN ('Chicken', 'Vegan/Gluten-Free/Dairy-Free')),
  medical_accommodations BOOLEAN DEFAULT FALSE,
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
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  choice_1_user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  choice_2_user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  choice_3_user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  open_to_any_gender BOOLEAN DEFAULT FALSE,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  locked BOOLEAN DEFAULT TRUE, -- Prevent editing after submit
  UNIQUE(user_id, event_id)
);

-- 5. roommate_matches (Algorithm results)
CREATE TABLE roommate_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_1_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  user_2_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  match_score INTEGER,
  matched_by TEXT DEFAULT 'algorithm' CHECK (matched_by IN ('algorithm', 'admin')),
  admin_override BOOLEAN DEFAULT FALSE,
  confirmed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, user_1_id),
  CHECK (user_1_id != user_2_id)
);

-- 6. cancellation_requests
CREATE TABLE cancellation_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id UUID REFERENCES registrations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  requested_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'denied')),
  admin_notes TEXT,
  processed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  processed_at TIMESTAMPTZ
);

-- 7. sessions (Event schedule)
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  location TEXT,
  floor_plan_marker TEXT,
  speaker_name TEXT,
  speaker_bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. session_bookmarks (User's saved sessions)
CREATE TABLE session_bookmarks (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, session_id)
);

-- 9. push_notifications (Notification history)
CREATE TABLE push_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  sent_to TEXT NOT NULL CHECK (sent_to IN ('all', 'specific_event', 'specific_users')),
  event_id UUID REFERENCES events(id) ON DELETE SET NULL,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  sent_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  delivery_count INTEGER DEFAULT 0
);

-- 10. floor_plans (Venue maps)
CREATE TABLE floor_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  floor_number INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  hotspots JSONB, -- Clickable areas
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_job_title ON profiles(job_title);
CREATE INDEX idx_registrations_user_id ON registrations(user_id);
CREATE INDEX idx_registrations_event_id ON registrations(event_id);
CREATE INDEX idx_registrations_rsvp_status ON registrations(rsvp_status);
CREATE INDEX idx_roommate_selections_user_id ON roommate_selections(user_id);
CREATE INDEX idx_roommate_selections_event_id ON roommate_selections(event_id);
CREATE INDEX idx_roommate_matches_event_id ON roommate_matches(event_id);
CREATE INDEX idx_roommate_matches_user_1_id ON roommate_matches(user_1_id);
CREATE INDEX idx_sessions_event_id ON sessions(event_id);
CREATE INDEX idx_session_bookmarks_user_id ON session_bookmarks(user_id);
CREATE INDEX idx_cancellation_requests_status ON cancellation_requests(status);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sessions_updated_at BEFORE UPDATE ON sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE roommate_selections ENABLE ROW LEVEL SECURITY;
ALTER TABLE roommate_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE cancellation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_bookmarks ENABLE ROW LEVEL SECURITY;

-- Users can view and update their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update all profiles" ON profiles
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Users can view and create their own registrations
CREATE POLICY "Users can view own registration" ON registrations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own registration" ON registrations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own registration" ON registrations
  FOR UPDATE USING (auth.uid() = user_id);

-- Admins can view all registrations
CREATE POLICY "Admins can view all registrations" ON registrations
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update all registrations" ON registrations
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Users can view and create their own roommate selections
CREATE POLICY "Users can view own roommate selections" ON roommate_selections
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own roommate selections" ON roommate_selections
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own roommate selections" ON roommate_selections
  FOR UPDATE USING (auth.uid() = user_id AND locked = FALSE);

-- Admins can view all roommate selections
CREATE POLICY "Admins can view all roommate selections" ON roommate_selections
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Users can view their own roommate matches
CREATE POLICY "Users can view own roommate matches" ON roommate_matches
  FOR SELECT USING (auth.uid() = user_1_id OR auth.uid() = user_2_id);

-- Admins can view and manage all roommate matches
CREATE POLICY "Admins can manage roommate matches" ON roommate_matches
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Users can view and create their own cancellation requests
CREATE POLICY "Users can manage own cancellation requests" ON cancellation_requests
  FOR ALL USING (auth.uid() = user_id);

-- Admins can view and process all cancellation requests
CREATE POLICY "Admins can process cancellation requests" ON cancellation_requests
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Users can view and manage their own session bookmarks
CREATE POLICY "Users can manage own session bookmarks" ON session_bookmarks
  FOR ALL USING (auth.uid() = user_id);

-- Events, sessions, and floor_plans are public (read-only for all authenticated users)
CREATE POLICY "Authenticated users can view events" ON events
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage events" ON events
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Authenticated users can view sessions" ON sessions
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage sessions" ON sessions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Authenticated users can view floor plans" ON floor_plans
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage floor plans" ON floor_plans
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Push notifications: Admins can create, users can view their own
CREATE POLICY "Admins can manage push notifications" ON push_notifications
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

