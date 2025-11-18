'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'

interface Registration {
  id: string
  user_id: string
  event_id: string
  rsvp_status: string
  travel_needed: boolean
  hotel_needed: boolean
  checked_in: boolean
  registered_at: string
  profiles: {
    email: string
    full_name: string | null
    preferred_name: string | null
    job_title: string | null
    department: string | null
  }
  events: {
    title: string
  }
}

interface CancellationRequest {
  id: string
  user_id: string
  registration_id: string
  requested_at: string
  status: string
  admin_notes: string | null
  user: {
    email: string
    full_name: string | null
    preferred_name: string | null
  }
}

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([])
  const [cancellations, setCancellations] = useState<CancellationRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [rsvpFilter, setRsvpFilter] = useState<string>('all')
  const [travelFilter, setTravelFilter] = useState<string>('all')
  const [selectedCancellation, setSelectedCancellation] = useState<CancellationRequest | null>(null)
  const [isCancellationDialogOpen, setIsCancellationDialogOpen] = useState(false)
  const [adminNotes, setAdminNotes] = useState('')

  const supabase = createClient()

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    filterRegistrations()
  }, [registrations, searchTerm, rsvpFilter, travelFilter])

  async function loadData() {
    try {
      // Load registrations
      const { data: regs, error: regsError } = await supabase
        .from('registrations')
        .select(`
          *,
          profiles:user_id (email, full_name, preferred_name, job_title, department),
          events:event_id (title)
        `)
        .order('registered_at', { ascending: false })

      if (regsError) throw regsError
      setRegistrations(regs || [])

      // Load pending cancellations
      const { data: cancels, error: cancelsError } = await supabase
        .from('cancellation_requests')
        .select(`
          *,
          user:user_id (email, full_name, preferred_name)
        `)
        .eq('status', 'pending')
        .order('requested_at', { ascending: false })

      if (cancelsError) throw cancelsError
      setCancellations(cancels || [])
    } catch (error) {
      console.error('Error loading data:', error)
      alert('Failed to load registrations')
    } finally {
      setLoading(false)
    }
  }

  function filterRegistrations() {
    let filtered = registrations

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (reg) =>
          reg.profiles?.email?.toLowerCase().includes(term) ||
          reg.profiles?.full_name?.toLowerCase().includes(term) ||
          reg.profiles?.preferred_name?.toLowerCase().includes(term)
      )
    }

    // Apply RSVP filter
    if (rsvpFilter !== 'all') {
      filtered = filtered.filter((reg) => reg.rsvp_status === rsvpFilter)
    }

    // Apply travel filter
    if (travelFilter === 'travel') {
      filtered = filtered.filter((reg) => reg.travel_needed)
    } else if (travelFilter === 'hotel') {
      filtered = filtered.filter((reg) => reg.hotel_needed)
    }

    setFilteredRegistrations(filtered)
  }

  function openCancellationDialog(cancellation: CancellationRequest) {
    setSelectedCancellation(cancellation)
    setAdminNotes('')
    setIsCancellationDialogOpen(true)
  }

  async function handleCancellationDecision(decision: 'approved' | 'denied') {
    if (!selectedCancellation) return

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { error } = await supabase
        .from('cancellation_requests')
        .update({
          status: decision,
          admin_notes: adminNotes,
          processed_by: user.id,
          processed_at: new Date().toISOString(),
        })
        .eq('id', selectedCancellation.id)

      if (error) throw error

      // If approved, update registration RSVP status to 'no'
      if (decision === 'approved') {
        const { error: regError } = await supabase
          .from('registrations')
          .update({ rsvp_status: 'no' })
          .eq('id', selectedCancellation.registration_id)

        if (regError) throw regError
      }

      alert(`Cancellation ${decision}!`)
      setIsCancellationDialogOpen(false)
      loadData()
    } catch (error) {
      console.error('Error processing cancellation:', error)
      alert('Failed to process cancellation')
    }
  }

  const stats = {
    total: registrations.length,
    attending: registrations.filter((r) => r.rsvp_status === 'yes').length,
    declined: registrations.filter((r) => r.rsvp_status === 'no').length,
    travel: registrations.filter((r) => r.travel_needed).length,
    hotel: registrations.filter((r) => r.hotel_needed).length,
    checkedIn: registrations.filter((r) => r.checked_in).length,
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">Loading registrations...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Registration Management</h1>
          <p className="text-gray-600">Manage all event registrations</p>
        </div>
        <Link href="/admin/exports">
          <Button variant="outline">Export Data</Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total</CardDescription>
            <CardTitle className="text-2xl">{stats.total}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Attending</CardDescription>
            <CardTitle className="text-2xl text-green-600">{stats.attending}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Declined</CardDescription>
            <CardTitle className="text-2xl text-red-600">{stats.declined}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Travel</CardDescription>
            <CardTitle className="text-2xl">{stats.travel}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Hotel</CardDescription>
            <CardTitle className="text-2xl">{stats.hotel}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Checked In</CardDescription>
            <CardTitle className="text-2xl">{stats.checkedIn}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="registrations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="registrations">Registrations</TabsTrigger>
          <TabsTrigger value="cancellations">
            Pending Cancellations
            {cancellations.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {cancellations.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Registrations Tab */}
        <TabsContent value="registrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>Search and filter registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Search</Label>
                  <Input
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <Label>RSVP Status</Label>
                  <Select value={rsvpFilter} onValueChange={setRsvpFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="yes">Attending</SelectItem>
                      <SelectItem value="no">Declined</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Travel/Hotel Filter</Label>
                  <Select value={travelFilter} onValueChange={setTravelFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="travel">Travel Needed</SelectItem>
                      <SelectItem value="hotel">Hotel Needed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Registrations ({filteredRegistrations.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>RSVP</TableHead>
                    <TableHead>Travel</TableHead>
                    <TableHead>Hotel</TableHead>
                    <TableHead>Checked In</TableHead>
                    <TableHead>Registered</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRegistrations.map((reg) => (
                    <TableRow key={reg.id}>
                      <TableCell className="font-medium">
                        {reg.profiles?.full_name || reg.profiles?.preferred_name || 'N/A'}
                      </TableCell>
                      <TableCell>{reg.profiles?.email}</TableCell>
                      <TableCell>{reg.profiles?.job_title || 'N/A'}</TableCell>
                      <TableCell>{reg.profiles?.department || 'N/A'}</TableCell>
                      <TableCell>
                        <Badge
                          variant={reg.rsvp_status === 'yes' ? 'default' : 'secondary'}
                        >
                          {reg.rsvp_status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {reg.travel_needed ? (
                          <Badge variant="outline">Yes</Badge>
                        ) : (
                          <span className="text-gray-400">No</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {reg.hotel_needed ? (
                          <Badge variant="outline">Yes</Badge>
                        ) : (
                          <span className="text-gray-400">No</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {reg.checked_in ? (
                          <Badge>Checked In</Badge>
                        ) : (
                          <span className="text-gray-400">No</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {new Date(reg.registered_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cancellations Tab */}
        <TabsContent value="cancellations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Cancellation Requests ({cancellations.length})</CardTitle>
              <CardDescription>Review and process cancellation requests</CardDescription>
            </CardHeader>
            <CardContent>
              {cancellations.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No pending cancellation requests
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Requested At</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cancellations.map((cancel) => (
                      <TableRow key={cancel.id}>
                        <TableCell className="font-medium">
                          {cancel.user?.full_name || cancel.user?.preferred_name || 'N/A'}
                        </TableCell>
                        <TableCell>{cancel.user?.email}</TableCell>
                        <TableCell>
                          {new Date(cancel.requested_at).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            onClick={() => openCancellationDialog(cancel)}
                          >
                            Review
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Cancellation Review Dialog */}
      <Dialog open={isCancellationDialogOpen} onOpenChange={setIsCancellationDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Cancellation Request</DialogTitle>
            <DialogDescription>
              Request from {selectedCancellation?.user?.full_name || selectedCancellation?.user?.email}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="admin_notes">Admin Notes</Label>
            <Input
              id="admin_notes"
              placeholder="Optional notes about this decision..."
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCancellationDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleCancellationDecision('denied')}
            >
              Deny
            </Button>
            <Button onClick={() => handleCancellationDecision('approved')}>
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
