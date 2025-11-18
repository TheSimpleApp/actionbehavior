import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  console.log('[AdminLayout] Checking authentication...')
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError) {
    console.log('[AdminLayout] Auth error:', authError.message)
  }

  if (!user) {
    console.log('[AdminLayout] No user, redirecting to login')
    redirect('/auth/login')
  }

  console.log(`[AdminLayout] User found: ${user.email} (${user.id})`)

  // Ensure profile exists (trigger should create it, but just in case)
  console.log('[AdminLayout] Checking profile...')
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profileError) {
    console.log('[AdminLayout] Profile query error:', profileError.message, profileError.code)
  }

  if (!profile) {
    console.log('[AdminLayout] Profile not found, creating...')
    // Create profile if it doesn't exist
    const { error: insertError } = await supabase.from('profiles').insert({
      id: user.id,
      email: user.email || '',
      full_name: user.user_metadata?.full_name || user.user_metadata?.name || '',
      role: 'admin' // Set first user as admin for testing
    })
    if (insertError) {
      console.log('[AdminLayout] Profile insert error:', insertError.message, insertError.code)
    } else {
      console.log('[AdminLayout] Profile created successfully')
    }
  } else {
    console.log(`[AdminLayout] Profile found: role=${profile.role}`)
    if (!profile.role || profile.role === 'attendee') {
      console.log('[AdminLayout] Updating profile to admin...')
      // Update to admin if not already set (for testing - remove in production)
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', user.id)
      if (updateError) {
        console.log('[AdminLayout] Profile update error:', updateError.message, updateError.code)
      } else {
        console.log('[AdminLayout] Profile updated to admin')
      }
    }
  }

  console.log('[AdminLayout] Rendering children')
  return <>{children}</>
}

