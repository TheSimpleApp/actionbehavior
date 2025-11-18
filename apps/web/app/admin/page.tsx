'use client'

import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRegistrations: 0,
    pendingCancellations: 0,
    travelBookings: 0,
    hotelRooms: 0
  })
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function loadStats() {
      console.log('[AdminDashboard] Loading stats...')
      try {
        // Get current user first
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (userError) {
          console.log('[AdminDashboard] User error:', userError.message)
        } else {
          console.log(`[AdminDashboard] User: ${user?.email} (${user?.id})`)
        }

        // Get total registrations
        console.log('[AdminDashboard] Querying registrations (yes)...')
        const { count: regCount, error: regError } = await supabase
          .from('registrations')
          .select('*', { count: 'exact', head: true })
          .eq('rsvp_status', 'yes')
        if (regError) {
          console.log('[AdminDashboard] Registrations error:', regError.message, regError.code, regError.details)
        } else {
          console.log(`[AdminDashboard] Total registrations: ${regCount}`)
        }

        // Get pending cancellations
        console.log('[AdminDashboard] Querying cancellation_requests...')
        const { count: cancelCount, error: cancelError } = await supabase
          .from('cancellation_requests')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending')
        if (cancelError) {
          console.log('[AdminDashboard] Cancellation requests error:', cancelError.message, cancelError.code, cancelError.details)
        } else {
          console.log(`[AdminDashboard] Pending cancellations: ${cancelCount}`)
        }

        // Get travel bookings
        console.log('[AdminDashboard] Querying registrations (travel)...')
        const { count: travelCount, error: travelError } = await supabase
          .from('registrations')
          .select('*', { count: 'exact', head: true })
          .eq('travel_needed', true)
        if (travelError) {
          console.log('[AdminDashboard] Travel bookings error:', travelError.message, travelError.code, travelError.details)
        } else {
          console.log(`[AdminDashboard] Travel bookings: ${travelCount}`)
        }

        // Get hotel rooms needed
        console.log('[AdminDashboard] Querying registrations (hotel)...')
        const { count: hotelCount, error: hotelError } = await supabase
          .from('registrations')
          .select('*', { count: 'exact', head: true })
          .eq('hotel_needed', true)
        if (hotelError) {
          console.log('[AdminDashboard] Hotel rooms error:', hotelError.message, hotelError.code, hotelError.details)
        } else {
          console.log(`[AdminDashboard] Hotel rooms: ${hotelCount}`)
        }

        setStats({
          totalRegistrations: regCount || 0,
          pendingCancellations: cancelCount || 0,
          travelBookings: travelCount || 0,
          hotelRooms: hotelCount || 0
        })
        console.log('[AdminDashboard] Stats loaded successfully')
      } catch (error) {
        console.error('[AdminDashboard] Error loading stats:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [supabase])

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm text-gray-600 mb-2">Total Registrations</h2>
          <p className="text-3xl font-bold">{loading ? '...' : stats.totalRegistrations}</p>
        </div>

        <div className={`p-6 rounded-lg shadow ${stats.pendingCancellations > 0 ? 'bg-red-100' : 'bg-white'}`}>
          <h2 className="text-sm text-gray-600 mb-2">Pending Cancellations</h2>
          <p className={`text-3xl font-bold ${stats.pendingCancellations > 0 ? 'text-red-600' : ''}`}>
            {loading ? '...' : stats.pendingCancellations}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm text-gray-600 mb-2">Travel Bookings</h2>
          <p className="text-3xl font-bold">{loading ? '...' : stats.travelBookings}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm text-gray-600 mb-2">Hotel Rooms Needed</h2>
          <p className="text-3xl font-bold">{loading ? '...' : stats.hotelRooms}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/exports"
          className="p-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-center"
        >
          <h2 className="text-xl font-bold mb-2">Data Exports</h2>
          <p className="text-sm">Export all registration data to CSV</p>
        </Link>

        <Link
          href="/registrations"
          className="p-6 bg-green-500 text-white rounded-lg hover:bg-green-600 text-center"
        >
          <h2 className="text-xl font-bold mb-2">Manage Registrations</h2>
          <p className="text-sm">View and manage all registrations</p>
        </Link>

        <Link
          href="/roommates"
          className="p-6 bg-purple-500 text-white rounded-lg hover:bg-purple-600 text-center"
        >
          <h2 className="text-xl font-bold mb-2">Roommate Management</h2>
          <p className="text-sm">View selections and assign roommates</p>
        </Link>

        <Link
          href="/users"
          className="p-6 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-center"
        >
          <h2 className="text-xl font-bold mb-2">User Management</h2>
          <p className="text-sm">Add and edit users</p>
        </Link>
      </div>
    </div>
  )
}

