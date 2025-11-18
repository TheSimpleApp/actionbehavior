'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/client'

const registrationSchema = z.object({
  rsvp_status: z.enum(['yes', 'no']),
  travel_needed: z.boolean().optional(),
  government_name: z.string().optional(),
  date_of_birth: z.string().optional(),
  gender: z.enum(['Male', 'Female', 'Other']).optional(),
  personal_email: z.string().email().optional().or(z.literal('')),
  frequent_flyer_southwest: z.string().optional(),
  frequent_flyer_american: z.string().optional(),
  frequent_flyer_united: z.string().optional(),
  flight_preference_1: z.string().optional(),
  flight_preference_2: z.string().optional(),
  hotel_needed: z.boolean().optional(),
  choice_1_user_id: z.string().optional(),
  choice_2_user_id: z.string().optional(),
  choice_3_user_id: z.string().optional(),
  open_to_any_gender: z.boolean().optional(),
  shirt_size: z.enum(['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL']).optional(),
  meal_preference: z.enum(['Chicken', 'Vegan/Gluten-Free/Dairy-Free']).optional(),
  medical_accommodations: z.boolean().optional(),
  comments: z.string().optional()
})

type RegistrationForm = z.infer<typeof registrationSchema>

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      rsvp_status: undefined,
      travel_needed: false,
      hotel_needed: false,
      open_to_any_gender: false,
      medical_accommodations: false
    }
  })

  const rsvpStatus = watch('rsvp_status')
  const travelNeeded = watch('travel_needed')
  const hotelNeeded = watch('hotel_needed')

  const onSubmit = async (data: RegistrationForm) => {
    setSubmitting(true)
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        alert('Please sign in to register')
        return
      }

      // Get event ID (assuming there's one main event)
      const { data: event } = await supabase
        .from('events')
        .select('id')
        .eq('status', 'published')
        .single()

      if (!event) {
        alert('No active event found')
        return
      }

      // Create registration
      const { error: regError } = await supabase
        .from('registrations')
        .insert({
          user_id: user.id,
          event_id: event.id,
          rsvp_status: data.rsvp_status,
          travel_needed: data.travel_needed || false,
          government_name: data.government_name,
          date_of_birth: data.date_of_birth,
          gender: data.gender,
          personal_email: data.personal_email,
          frequent_flyer_southwest: data.frequent_flyer_southwest,
          frequent_flyer_american: data.frequent_flyer_american,
          frequent_flyer_united: data.frequent_flyer_united,
          flight_preference_1: data.flight_preference_1,
          flight_preference_2: data.flight_preference_2,
          hotel_needed: data.hotel_needed || false,
          shirt_size: data.shirt_size,
          meal_preference: data.meal_preference,
          medical_accommodations: data.medical_accommodations || false,
          comments: data.comments
        })

      if (regError) throw regError

      // Create roommate selections if hotel needed
      if (data.hotel_needed && data.choice_1_user_id) {
        const { error: roommateError } = await supabase
          .from('roommate_selections')
          .insert({
            user_id: user.id,
            event_id: event.id,
            choice_1_user_id: data.choice_1_user_id,
            choice_2_user_id: data.choice_2_user_id,
            choice_3_user_id: data.choice_3_user_id,
            open_to_any_gender: data.open_to_any_gender || false,
            locked: true
          })

        if (roommateError) throw roommateError
      }

      alert('Registration submitted successfully!')
      // Redirect to success page or app download
    } catch (error) {
      console.error('Registration error:', error)
      alert('Failed to submit registration. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (rsvpStatus === 'no') {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <h1 className="text-3xl font-bold mb-4">ABC Summit 2025 Registration</h1>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Thank you for your response</h2>
          <p>We're sorry you won't be able to join us. If you change your mind, you can register again before the deadline.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">ABC Summit 2025 Registration</h1>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Step {currentStep} of 5</span>
          <span className="text-sm text-gray-600">{Math.round((currentStep / 5) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Step 1: RSVP */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">RSVP</h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="radio" value="yes" {...register('rsvp_status')} />
                <span>Yes, I will attend</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" value="no" {...register('rsvp_status')} />
                <span>No, I cannot attend</span>
              </label>
            </div>
            {errors.rsvp_status && (
              <p className="text-red-500 text-sm">{errors.rsvp_status.message}</p>
            )}
          </div>
        )}

        {/* Step 2: Travel Information */}
        {currentStep === 2 && travelNeeded && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Travel Information</h2>
            <label className="flex items-center space-x-2 mb-4">
              <input type="checkbox" {...register('travel_needed')} />
              <span>I need travel assistance</span>
            </label>

            {travelNeeded && (
              <div className="space-y-4">
                <div>
                  <label className="block mb-1">Government Name *</label>
                  <input
                    type="text"
                    {...register('government_name')}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Date of Birth *</label>
                  <input
                    type="date"
                    {...register('date_of_birth')}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Gender *</label>
                  <select {...register('gender')} className="w-full p-2 border rounded">
                    <option value="">Select...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1">Personal Email *</label>
                  <input
                    type="email"
                    {...register('personal_email')}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Frequent Flyer - Southwest</label>
                  <input
                    type="text"
                    {...register('frequent_flyer_southwest')}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Frequent Flyer - American Airlines</label>
                  <input
                    type="text"
                    {...register('frequent_flyer_american')}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1">Frequent Flyer - United Airlines</label>
                  <input
                    type="text"
                    {...register('frequent_flyer_united')}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Hotel & Roommates */}
        {currentStep === 3 && hotelNeeded && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Hotel & Roommate Preferences</h2>
            <label className="flex items-center space-x-2 mb-4">
              <input type="checkbox" {...register('hotel_needed')} />
              <span>I need hotel accommodation</span>
            </label>

            {hotelNeeded && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Select your top 3 roommate preferences (role-based filtering will be applied)
                </p>
                <div>
                  <label className="block mb-1">1st Choice *</label>
                  <select {...register('choice_1_user_id')} className="w-full p-2 border rounded">
                    <option value="">Select...</option>
                    {/* TODO: Populate with eligible users based on role */}
                  </select>
                </div>
                <div>
                  <label className="block mb-1">2nd Choice</label>
                  <select {...register('choice_2_user_id')} className="w-full p-2 border rounded">
                    <option value="">Select...</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1">3rd Choice</label>
                  <select {...register('choice_3_user_id')} className="w-full p-2 border rounded">
                    <option value="">Select...</option>
                  </select>
                </div>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" {...register('open_to_any_gender')} />
                  <span>Open to any gender roommate</span>
                </label>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Personal Preferences */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Personal Preferences</h2>
            <div>
              <label className="block mb-1">Shirt Size *</label>
              <select {...register('shirt_size')} className="w-full p-2 border rounded">
                <option value="">Select...</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
                <option value="3XL">3XL</option>
                <option value="4XL">4XL</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Meal Preference *</label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="radio" value="Chicken" {...register('meal_preference')} />
                  <span>Chicken</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" value="Vegan/Gluten-Free/Dairy-Free" {...register('meal_preference')} />
                  <span>Vegan/Gluten-Free/Dairy-Free</span>
                </label>
              </div>
            </div>
            <label className="flex items-center space-x-2">
              <input type="checkbox" {...register('medical_accommodations')} />
              <span>Medical accommodations needed</span>
            </label>
            {watch('medical_accommodations') && (
              <p className="text-sm text-gray-600">
                Please email details to the event coordinator.
              </p>
            )}
            <div>
              <label className="block mb-1">Comments/Feedback</label>
              <textarea
                {...register('comments')}
                className="w-full p-2 border rounded"
                rows={4}
              />
            </div>
          </div>
        )}

        {/* Step 5: Review & Submit */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Review & Submit</h2>
            <div className="bg-gray-50 p-4 rounded">
              <p className="mb-2"><strong>RSVP:</strong> {rsvpStatus}</p>
              {travelNeeded && <p className="mb-2"><strong>Travel:</strong> Needed</p>}
              {hotelNeeded && <p className="mb-2"><strong>Hotel:</strong> Needed</p>}
              {/* Add more review details */}
            </div>
          </div>
        )}

        <div className="flex justify-between">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Previous
            </button>
          )}
          <div className="ml-auto">
            {currentStep < 5 ? (
              <button
                type="button"
                onClick={() => {
                  if (currentStep === 1 && rsvpStatus === 'yes') setCurrentStep(2)
                  else if (currentStep === 2) {
                    if (travelNeeded) setCurrentStep(2) // Stay on travel step if needed
                    else setCurrentStep(3)
                  }
                  else if (currentStep === 3) {
                    if (hotelNeeded) setCurrentStep(3) // Stay on hotel step if needed
                    else setCurrentStep(4)
                  }
                  else setCurrentStep(currentStep + 1)
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Registration'}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

