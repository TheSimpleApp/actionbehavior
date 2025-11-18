'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Papa from 'papaparse'

export default function ExportsPage() {
  const [loading, setLoading] = useState<string | null>(null)
  const supabase = createClient()

  const downloadCSV = (data: any[], filename: string) => {
    const csv = Papa.unparse(data)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportFullRegistration = async () => {
    setLoading('full-registration')
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select(`
          *,
          profiles:user_id (
            id,
            email,
            full_name,
            preferred_name,
            job_title,
            department,
            center,
            market,
            employee_id,
            phone_number
          ),
          events:event_id (
            title,
            start_date,
            end_date
          )
        `)

      if (error) throw error

      const flattened = data?.map(reg => ({
        'Registration ID': reg.id,
        'User ID': reg.user_id,
        'Event ID': reg.event_id,
        'Event Title': reg.events?.title || '',
        'Event Dates': reg.events ? `${reg.events.start_date} - ${reg.events.end_date}` : '',
        'Email': reg.profiles?.email || '',
        'Full Name': reg.profiles?.full_name || '',
        'Preferred Name': reg.profiles?.preferred_name || '',
        'Job Title': reg.profiles?.job_title || '',
        'Department': reg.profiles?.department || '',
        'Center': reg.profiles?.center || '',
        'Market': reg.profiles?.market || '',
        'Employee ID': reg.profiles?.employee_id || '',
        'Phone': reg.profiles?.phone_number || '',
        'RSVP Status': reg.rsvp_status || '',
        'Travel Needed': reg.travel_needed ? 'Yes' : 'No',
        'Government Name': reg.government_name || '',
        'Date of Birth': reg.date_of_birth || '',
        'Gender': reg.gender || '',
        'Personal Email': reg.personal_email || '',
        'Frequent Flyer Southwest': reg.frequent_flyer_southwest || '',
        'Frequent Flyer American': reg.frequent_flyer_american || '',
        'Frequent Flyer United': reg.frequent_flyer_united || '',
        'Flight Preference 1': reg.flight_preference_1 || '',
        'Flight Preference 2': reg.flight_preference_2 || '',
        'Booked Flight Details': reg.booked_flight_details ? JSON.stringify(reg.booked_flight_details) : '',
        'Hotel Needed': reg.hotel_needed ? 'Yes' : 'No',
        'Shirt Size': reg.shirt_size || '',
        'Meal Preference': reg.meal_preference || '',
        'Medical Accommodations': reg.medical_accommodations ? 'Yes' : 'No',
        'Comments': reg.comments || '',
        'Checked In': reg.checked_in ? 'Yes' : 'No',
        'Checked In At': reg.checked_in_at || '',
        'Registered At': reg.registered_at || ''
      })) || []

      const filename = `ABC_Summit_2025_Full_Registration_${new Date().toISOString().split('T')[0]}.csv`
      downloadCSV(flattened, filename)
    } catch (error) {
      console.error('Export error:', error)
      alert('Failed to export data. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  const exportRoommateAnalysis = async () => {
    setLoading('roommate-analysis')
    try {
      // Export original selections
      const { data: selections, error: selectionsError } = await supabase
        .from('roommate_selections')
        .select(`
          *,
          user:user_id (full_name, preferred_name, email),
          choice_1:choice_1_user_id (full_name, preferred_name),
          choice_2:choice_2_user_id (full_name, preferred_name),
          choice_3:choice_3_user_id (full_name, preferred_name)
        `)

      if (selectionsError) throw selectionsError

      const selectionsData = selections?.map(sel => ({
        'Person Name': sel.user?.full_name || sel.user?.preferred_name || '',
        'Person Email': sel.user?.email || '',
        '1st Choice': sel.choice_1?.full_name || sel.choice_1?.preferred_name || '',
        '2nd Choice': sel.choice_2?.full_name || sel.choice_2?.preferred_name || '',
        '3rd Choice': sel.choice_3?.full_name || sel.choice_3?.preferred_name || '',
        'Open to Any Gender': sel.open_to_any_gender ? 'Yes' : 'No',
        'Submitted At': sel.submitted_at || ''
      })) || []

      const selectionsFilename = `ABC_Summit_2025_Roommate_Selections_${new Date().toISOString().split('T')[0]}.csv`
      downloadCSV(selectionsData, selectionsFilename)

      // Export final matches
      const { data: matches, error: matchesError } = await supabase
        .from('roommate_matches')
        .select(`
          *,
          user_1:user_1_id (full_name, preferred_name),
          user_2:user_2_id (full_name, preferred_name)
        `)

      if (matchesError) throw matchesError

      const matchesData = matches?.map(match => ({
        'Person 1 Name': match.user_1?.full_name || match.user_1?.preferred_name || '',
        'Person 2 Name': match.user_2?.full_name || match.user_2?.preferred_name || '',
        'Match Score': match.match_score || 0,
        'Matched By': match.matched_by || '',
        'Admin Override': match.admin_override ? 'Yes' : 'No',
        'Confirmed At': match.confirmed_at || ''
      })) || []

      const matchesFilename = `ABC_Summit_2025_Roommate_Matches_${new Date().toISOString().split('T')[0]}.csv`
      downloadCSV(matchesData, matchesFilename)
    } catch (error) {
      console.error('Export error:', error)
      alert('Failed to export roommate data. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  const exportFlightData = async () => {
    setLoading('flight-data')
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select(`
          *,
          profiles:user_id (full_name, preferred_name, email, market)
        `)
        .eq('travel_needed', true)

      if (error) throw error

      const flightData = data?.map(reg => ({
        'Government Name': reg.government_name || '',
        'Date of Birth': reg.date_of_birth || '',
        'Gender': reg.gender || '',
        'Personal Email': reg.personal_email || '',
        'Frequent Flyer Southwest': reg.frequent_flyer_southwest || '',
        'Frequent Flyer American': reg.frequent_flyer_american || '',
        'Frequent Flyer United': reg.frequent_flyer_united || '',
        'Flight Preference 1': reg.flight_preference_1 || '',
        'Flight Preference 2': reg.flight_preference_2 || '',
        'Market': reg.profiles?.market || '',
        'Booked Flight Details': reg.booked_flight_details ? JSON.stringify(reg.booked_flight_details) : ''
      })) || []

      const filename = `ABC_Summit_2025_Flight_Data_${new Date().toISOString().split('T')[0]}.csv`
      downloadCSV(flightData, filename)
    } catch (error) {
      console.error('Export error:', error)
      alert('Failed to export flight data. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  const exportHotelData = async () => {
    setLoading('hotel-data')
    try {
      const { data: matches, error: matchesError } = await supabase
        .from('roommate_matches')
        .select(`
          *,
          user_1:user_1_id (full_name, preferred_name, email, phone_number),
          user_2:user_2_id (full_name, preferred_name, email, phone_number)
        `)

      if (matchesError) throw matchesError

      const hotelData = matches?.map(match => ({
        'Person 1 Name': match.user_1?.full_name || match.user_1?.preferred_name || '',
        'Person 1 Email': match.user_1?.email || '',
        'Person 1 Phone': match.user_1?.phone_number || '',
        'Person 2 Name': match.user_2?.full_name || match.user_2?.preferred_name || '',
        'Person 2 Email': match.user_2?.email || '',
        'Person 2 Phone': match.user_2?.phone_number || '',
        'Roommate Confirmed': match.confirmed_at ? 'Yes' : 'No'
      })) || []

      const filename = `ABC_Summit_2025_Hotel_Data_${new Date().toISOString().split('T')[0]}.csv`
      downloadCSV(hotelData, filename)
    } catch (error) {
      console.error('Export error:', error)
      alert('Failed to export hotel data. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  const exportCateringData = async () => {
    setLoading('catering-data')
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select(`
          *,
          profiles:user_id (full_name, preferred_name)
        `)
        .eq('rsvp_status', 'yes')

      if (error) throw error

      const cateringData = data?.map(reg => ({
        'Name': reg.profiles?.full_name || reg.profiles?.preferred_name || '',
        'Meal Preference': reg.meal_preference || '',
        'Medical Accommodations': reg.medical_accommodations ? 'Yes' : 'No',
        'Comments': reg.comments || ''
      })) || []

      // Add summary
      const mealCounts = cateringData.reduce((acc, item) => {
        const meal = item['Meal Preference'] || 'Not Specified'
        acc[meal] = (acc[meal] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      const summary = Object.entries(mealCounts).map(([meal, count]) => ({
        'Meal Type': meal,
        'Count': count
      }))

      const filename = `ABC_Summit_2025_Catering_Data_${new Date().toISOString().split('T')[0]}.csv`
      downloadCSV([...cateringData, ...summary], filename)
    } catch (error) {
      console.error('Export error:', error)
      alert('Failed to export catering data. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  const exportCancellations = async () => {
    setLoading('cancellations')
    try {
      const { data, error } = await supabase
        .from('cancellation_requests')
        .select(`
          *,
          user:user_id (full_name, preferred_name, email),
          registration:registration_id (*),
          processed_by_user:processed_by (full_name, preferred_name)
        `)

      if (error) throw error

      const cancellationData = data?.map(req => ({
        'Request ID': req.id,
        'User Name': req.user?.full_name || req.user?.preferred_name || '',
        'User Email': req.user?.email || '',
        'Status': req.status || '',
        'Requested At': req.requested_at || '',
        'Processed By': req.processed_by_user?.full_name || req.processed_by_user?.preferred_name || '',
        'Processed At': req.processed_at || '',
        'Admin Notes': req.admin_notes || ''
      })) || []

      const filename = `ABC_Summit_2025_Cancellations_${new Date().toISOString().split('T')[0]}.csv`
      downloadCSV(cancellationData, filename)
    } catch (error) {
      console.error('Export error:', error)
      alert('Failed to export cancellation data. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Data Exports</h1>
      <p className="text-gray-600 mb-8">
        Export all registration and event data to CSV format. This is the TOP PRIORITY feature.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={exportFullRegistration}
          disabled={loading === 'full-registration'}
          className="p-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading === 'full-registration' ? 'Exporting...' : '1. Full Registration Export'}
        </button>

        <button
          onClick={exportRoommateAnalysis}
          disabled={loading === 'roommate-analysis'}
          className="p-6 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading === 'roommate-analysis' ? 'Exporting...' : '2. Roommate Analysis Export'}
        </button>

        <button
          onClick={exportFlightData}
          disabled={loading === 'flight-data'}
          className="p-6 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading === 'flight-data' ? 'Exporting...' : '3. Flight Data Export'}
        </button>

        <button
          onClick={exportHotelData}
          disabled={loading === 'hotel-data'}
          className="p-6 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading === 'hotel-data' ? 'Exporting...' : '4. Hotel/Rooming Export'}
        </button>

        <button
          onClick={exportCateringData}
          disabled={loading === 'catering-data'}
          className="p-6 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading === 'catering-data' ? 'Exporting...' : '5. Catering Export'}
        </button>

        <button
          onClick={exportCancellations}
          disabled={loading === 'cancellations'}
          className="p-6 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading === 'cancellations' ? 'Exporting...' : '6. Cancellation Tracking Export'}
        </button>
      </div>
    </div>
  )
}

