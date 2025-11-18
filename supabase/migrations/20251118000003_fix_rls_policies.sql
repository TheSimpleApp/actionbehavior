-- Fix RLS policies to allow admin queries with HEAD requests
-- The issue is that admin policies check profiles table, but during the check, 
-- the profiles table itself might not be accessible

-- Drop existing admin policies that might cause circular dependencies
DROP POLICY IF EXISTS "Admins can view all registrations" ON registrations;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can process cancellation requests" ON cancellation_requests;

-- Recreate with better logic
-- Admins can view all registrations (using service role or bypassing RLS check)
CREATE POLICY "Admins can view all registrations" ON registrations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    id = auth.uid() OR -- Users can always see their own profile
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() 
      AND p.role = 'admin'
    )
  );

-- Admins can process cancellation requests
CREATE POLICY "Admins can process cancellation requests" ON cancellation_requests
  FOR SELECT USING (
    user_id = auth.uid() OR -- Users can see their own
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Also allow admins to INSERT/UPDATE/DELETE on cancellation_requests
CREATE POLICY "Admins can manage cancellation requests" ON cancellation_requests
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

