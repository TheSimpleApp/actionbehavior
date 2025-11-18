import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Linking } from 'react-native'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function TravelScreen() {
  const [travelData, setTravelData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [checklist, setChecklist] = useState({
    completeCAS: false,
    downloadDocuments: false,
    reviewSchedule: false,
    packEssentials: false
  })

  useEffect(() => {
    loadTravelData()
  }, [])

  async function loadTravelData() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Get event
      const { data: event } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'published')
        .single()

      // Get registration
      const { data: registration } = await supabase
        .from('registrations')
        .select('*')
        .eq('user_id', user.id)
        .eq('event_id', event?.id)
        .single()

      // Get roommate match
      const { data: match } = await supabase
        .from('roommate_matches')
        .select(`
          *,
          roommate:user_2_id (full_name, preferred_name, phone_number)
        `)
        .eq('user_1_id', user.id)
        .single()

      setTravelData({
        event,
        registration,
        match
      })
    } catch (error) {
      console.error('Error loading travel data:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleChecklist = (item: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [item]: !prev[item] }))
  }

  const checklistProgress = Object.values(checklist).filter(Boolean).length
  const checklistTotal = Object.keys(checklist).length

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading travel information...</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      {/* Event Countdown */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Event Countdown</Text>
        {travelData?.event && (
          <>
            <Text style={styles.countdownText}>
              {Math.ceil((new Date(travelData.event.start_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days until ABC Summit 2025
            </Text>
            <Text style={styles.eventDates}>
              {new Date(travelData.event.start_date).toLocaleDateString()} - {new Date(travelData.event.end_date).toLocaleDateString()}
            </Text>
          </>
        )}
      </View>

      {/* Flight Information */}
      {travelData?.registration?.travel_needed && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Flight Information</Text>
          {travelData.registration.booked_flight_details ? (
            <View>
              <Text style={styles.infoText}>
                Flight: {JSON.stringify(travelData.registration.booked_flight_details)}
              </Text>
              <Text style={styles.infoText}>
                Confirmation: {travelData.registration.booked_flight_details.confirmation || 'N/A'}
              </Text>
            </View>
          ) : (
            <Text style={styles.infoText}>
              Contact travel team to book your flight
            </Text>
          )}
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => Linking.openURL('https://www.travelperk.com')}
          >
            <Text style={styles.linkText}>Book with Travel Perk</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Hotel Information */}
      {travelData?.registration?.hotel_needed && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Hotel Information</Text>
          <Text style={styles.infoText}>Hotel: Gaylord Texan</Text>
          <Text style={styles.infoText}>
            1501 Gaylord Trail, Grapevine, TX 76051
          </Text>
          {travelData.registration.hotel_confirmation && (
            <Text style={styles.infoText}>
              Confirmation: {travelData.registration.hotel_confirmation}
            </Text>
          )}
        </View>
      )}

      {/* Roommate Information */}
      {travelData?.match && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Roommate Information</Text>
          <Text style={styles.roommateName}>
            {travelData.match.roommate?.full_name || travelData.match.roommate?.preferred_name || 'TBD'}
          </Text>
          {travelData.match.roommate?.phone_number && (
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${travelData.match.roommate.phone_number}`)}
            >
              <Text style={styles.phoneLink}>
                {travelData.match.roommate.phone_number}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Pre-Arrival Checklist */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Pre-Arrival Checklist</Text>
        <Text style={styles.progressText}>
          {checklistProgress} of {checklistTotal} complete
        </Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(checklistProgress / checklistTotal) * 100}%` }]} />
        </View>
        <View style={styles.checklist}>
          <TouchableOpacity
            style={styles.checklistItem}
            onPress={() => toggleChecklist('completeCAS')}
          >
            <Text style={styles.checkbox}>{checklist.completeCAS ? '✓' : '○'}</Text>
            <Text style={styles.checklistText}>Complete CAS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.checklistItem}
            onPress={() => toggleChecklist('downloadDocuments')}
          >
            <Text style={styles.checkbox}>{checklist.downloadDocuments ? '✓' : '○'}</Text>
            <Text style={styles.checklistText}>Download travel documents</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.checklistItem}
            onPress={() => toggleChecklist('reviewSchedule')}
          >
            <Text style={styles.checkbox}>{checklist.reviewSchedule ? '✓' : '○'}</Text>
            <Text style={styles.checklistText}>Review event schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.checklistItem}
            onPress={() => toggleChecklist('packEssentials')}
          >
            <Text style={styles.checkbox}>{checklist.packEssentials ? '✓' : '○'}</Text>
            <Text style={styles.checklistText}>Pack essentials</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Links */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick Links</Text>
        <TouchableOpacity style={styles.linkButton}>
          <Text style={styles.linkText}>Travel Policy (PDF)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => Linking.openURL('https://www.travelperk.com')}
        >
          <Text style={styles.linkText}>Book with Travel Perk</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkButton}>
          <Text style={styles.linkText}>Contact Travel Team</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkButton}>
          <Text style={styles.linkText}>View Event Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkButton}>
          <Text style={styles.linkText}>View Floor Plans</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12
  },
  countdownText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 8
  },
  eventDates: {
    fontSize: 16,
    color: '#666'
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333'
  },
  roommateName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2563eb'
  },
  phoneLink: {
    fontSize: 18,
    color: '#2563eb',
    textDecorationLine: 'underline'
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    marginBottom: 16,
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 4
  },
  checklist: {
    gap: 12
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  checkbox: {
    fontSize: 20,
    width: 24
  },
  checklistText: {
    fontSize: 16,
    flex: 1
  },
  linkButton: {
    padding: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
    marginBottom: 8
  },
  linkText: {
    fontSize: 16,
    color: '#2563eb',
    textAlign: 'center'
  }
})

