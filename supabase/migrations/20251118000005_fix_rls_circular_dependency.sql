-- Fix circular dependency in RLS policies
-- The issue is that admin policies check profiles table, which causes infinite recursion

-- Drop all existing policies on profiles
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

-- Create a function to check admin status (bypasses RLS with SECURITY DEFINER)
-- This function runs with the privileges of the function creator, not the caller
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  -- SECURITY DEFINER means this runs with elevated privileges and bypasses RLS
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = user_id
    AND profiles.role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Allow users to view their own profile (no recursion - direct check)
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Allow users to insert their own profile (needed for first-time signup)
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Admins can view all profiles (using function to avoid recursion)
-- Note: The function uses SECURITY DEFINER so it bypasses RLS when checking
CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    auth.uid() = id OR -- Users can always see their own (no recursion)
    public.is_admin(auth.uid()) -- Admins can see all (function bypasses RLS)
  );

-- Admins can update all profiles
CREATE POLICY "Admins can update all profiles" ON profiles
  FOR UPDATE USING (public.is_admin(auth.uid()));
