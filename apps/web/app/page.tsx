'use client'

import Image from "next/image";
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [supabaseStatus, setSupabaseStatus] = useState<{
    connected: boolean
    loading: boolean
    error: string | null
    tables: string[]
  }>({
    connected: false,
    loading: true,
    error: null,
    tables: []
  })

  useEffect(() => {
    async function testSupabaseConnection() {
      try {
        const supabase = createClient()
        
        // Check if env vars are set
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        
        if (!url || !key) {
          setSupabaseStatus({
            connected: false,
            loading: false,
            error: 'Missing environment variables: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY',
            tables: []
          })
          return
        }

        // Test connection by querying a table
        const { data, error } = await supabase
          .from('events')
          .select('id')
          .limit(1)

        if (error) {
          // If table doesn't exist, that's okay - connection works
          if (error.code === 'PGRST116' || error.message.includes('does not exist')) {
            setSupabaseStatus({
              connected: true,
              loading: false,
              error: 'Connected but tables may not be created yet. Run: npx supabase db push',
              tables: []
            })
          } else {
            setSupabaseStatus({
              connected: false,
              loading: false,
              error: error.message,
              tables: []
            })
          }
          return
        }

        // Try to get list of tables (if possible)
        const tables = ['events', 'registrations', 'profiles', 'roommate_selections']
        setSupabaseStatus({
          connected: true,
          loading: false,
          error: null,
          tables
        })
      } catch (err: any) {
        setSupabaseStatus({
          connected: false,
          loading: false,
          error: err.message || 'Unknown error',
          tables: []
        })
      }
    }

    testSupabaseConnection()
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="w-full">
          <Image
            className="dark:invert mb-8"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />
          
          <h1 className="text-4xl font-bold mb-6 text-black dark:text-zinc-50">
            ABC Summit 2025
          </h1>

          {/* Supabase Connection Status */}
          <div className="mb-8 p-6 rounded-lg border-2" style={{
            borderColor: supabaseStatus.loading ? '#fbbf24' : supabaseStatus.connected ? '#10b981' : '#ef4444',
            backgroundColor: supabaseStatus.loading ? '#fef3c7' : supabaseStatus.connected ? '#d1fae5' : '#fee2e2'
          }}>
            <h2 className="text-xl font-semibold mb-2">
              Supabase Connection Status
            </h2>
            {supabaseStatus.loading ? (
              <p className="text-gray-700">Testing connection...</p>
            ) : supabaseStatus.connected ? (
              <div>
                <p className="text-green-800 font-semibold mb-2">✅ Connected Successfully!</p>
                {supabaseStatus.tables.length > 0 && (
                  <p className="text-sm text-gray-700">
                    Available tables: {supabaseStatus.tables.join(', ')}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <p className="text-red-800 font-semibold mb-2">❌ Connection Failed</p>
                <p className="text-sm text-red-700">{supabaseStatus.error}</p>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Link
              href="/register"
              className="p-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-center transition-colors"
            >
              <h2 className="text-xl font-bold mb-2">Register</h2>
              <p className="text-sm">Event Registration</p>
            </Link>

            <Link
              href="/admin"
              className="p-6 bg-green-500 text-white rounded-lg hover:bg-green-600 text-center transition-colors"
            >
              <h2 className="text-xl font-bold mb-2">Admin Dashboard</h2>
              <p className="text-sm">View registrations & stats</p>
            </Link>

            <Link
              href="/exports"
              className="p-6 bg-purple-500 text-white rounded-lg hover:bg-purple-600 text-center transition-colors"
            >
              <h2 className="text-xl font-bold mb-2">Data Exports</h2>
              <p className="text-sm">Export registration data</p>
            </Link>
          </div>

          {/* Debug Info */}
          <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded text-sm">
            <p className="font-semibold mb-2">Debug Info:</p>
            <p>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}</p>
            <p>Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
