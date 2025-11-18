-- Create a function to check if user is admin (bypasses RLS)
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = user_id
    AND profiles.role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update RLS policies to use the function
DROP POLICY IF EXISTS "Admins can view all registrations" ON registrations;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can process cancellation requests" ON cancellation_requests;
DROP POLICY IF EXISTS "Admins can manage cancellation requests" ON cancellation_requests;

-- Recreate policies using the function
CREATE POLICY "Admins can view all registrations" ON registrations
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    id = auth.uid() OR public.is_admin(auth.uid())
  );

CREATE POLICY "Admins can process cancellation requests" ON cancellation_requests
  FOR SELECT USING (
    user_id = auth.uid() OR public.is_admin(auth.uid())
  );

CREATE POLICY "Admins can manage cancellation requests" ON cancellation_requests
  FOR ALL USING (public.is_admin(auth.uid()));

