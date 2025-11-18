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

interface Profile {
  id: string
  email: string
  full_name: string | null
  preferred_name: string | null
  job_title: string | null
  department: string | null
  center: string | null
  market: string | null
  role: string
  employee_id: string | null
  phone_number: string | null
  created_at: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<Profile[]>([])
  const [filteredUsers, setFilteredUsers] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    preferred_name: '',
    job_title: '',
    department: '',
    center: '',
    market: '',
    role: 'attendee',
    employee_id: '',
    phone_number: '',
  })

  const supabase = createClient()

  useEffect(() => {
    loadUsers()
  }, [])

  useEffect(() => {
    filterUsers()
  }, [users, searchTerm, roleFilter])

  async function loadUsers() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setUsers(data || [])
    } catch (error) {
      console.error('Error loading users:', error)
      alert('Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  function filterUsers() {
    let filtered = users

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (user) =>
          user.email?.toLowerCase().includes(term) ||
          user.full_name?.toLowerCase().includes(term) ||
          user.preferred_name?.toLowerCase().includes(term) ||
          user.employee_id?.toLowerCase().includes(term)
      )
    }

    // Apply role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter((user) => user.role === roleFilter)
    }

    setFilteredUsers(filtered)
  }

  function openAddDialog() {
    setFormData({
      email: '',
      full_name: '',
      preferred_name: '',
      job_title: '',
      department: '',
      center: '',
      market: '',
      role: 'attendee',
      employee_id: '',
      phone_number: '',
    })
    setIsAddDialogOpen(true)
  }

  function openEditDialog(user: Profile) {
    setSelectedUser(user)
    setFormData({
      email: user.email,
      full_name: user.full_name || '',
      preferred_name: user.preferred_name || '',
      job_title: user.job_title || '',
      department: user.department || '',
      center: user.center || '',
      market: user.market || '',
      role: user.role || 'attendee',
      employee_id: user.employee_id || '',
      phone_number: user.phone_number || '',
    })
    setIsEditDialogOpen(true)
  }

  function openDeleteDialog(user: Profile) {
    setSelectedUser(user)
    setIsDeleteDialogOpen(true)
  }

  async function handleAddUser() {
    try {
      // In a real app, you'd use Supabase Auth Admin API to create the user
      // For now, we'll just insert into profiles (requires auth setup)
      const { error } = await supabase.from('profiles').insert({
        email: formData.email,
        full_name: formData.full_name,
        preferred_name: formData.preferred_name,
        job_title: formData.job_title,
        department: formData.department,
        center: formData.center,
        market: formData.market,
        role: formData.role,
        employee_id: formData.employee_id,
        phone_number: formData.phone_number,
      })

      if (error) throw error

      alert('User added successfully!')
      setIsAddDialogOpen(false)
      loadUsers()
    } catch (error) {
      console.error('Error adding user:', error)
      alert('Failed to add user. In production, use Supabase Auth Admin API.')
    }
  }

  async function handleEditUser() {
    if (!selectedUser) return

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          preferred_name: formData.preferred_name,
          job_title: formData.job_title,
          department: formData.department,
          center: formData.center,
          market: formData.market,
          role: formData.role,
          employee_id: formData.employee_id,
          phone_number: formData.phone_number,
        })
        .eq('id', selectedUser.id)

      if (error) throw error

      alert('User updated successfully!')
      setIsEditDialogOpen(false)
      loadUsers()
    } catch (error) {
      console.error('Error updating user:', error)
      alert('Failed to update user')
    }
  }

  async function handleDeleteUser() {
    if (!selectedUser) return

    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', selectedUser.id)

      if (error) throw error

      alert('User deleted successfully!')
      setIsDeleteDialogOpen(false)
      loadUsers()
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('Failed to delete user')
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">Loading users...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-gray-600">Manage all attendees and admins</p>
        </div>
        <Button onClick={openAddDialog}>Add User</Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Search and filter users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Search</Label>
              <Input
                placeholder="Search by name, email, or employee ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Label>Role Filter</Label>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="attendee">Attendee</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Center</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.full_name || user.preferred_name || 'N/A'}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.job_title || 'N/A'}</TableCell>
                  <TableCell>{user.department || 'N/A'}</TableCell>
                  <TableCell>{user.center || 'N/A'}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => openEditDialog(user)}>
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => openDeleteDialog(user)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Create a new user account</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="employee_id">Employee ID</Label>
              <Input
                id="employee_id"
                value={formData.employee_id}
                onChange={(e) => setFormData({ ...formData, employee_id: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="preferred_name">Preferred Name</Label>
              <Input
                id="preferred_name"
                value={formData.preferred_name}
                onChange={(e) => setFormData({ ...formData, preferred_name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="job_title">Job Title</Label>
              <Input
                id="job_title"
                value={formData.job_title}
                onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="center">Center</Label>
              <Input
                id="center"
                value={formData.center}
                onChange={(e) => setFormData({ ...formData, center: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="market">Market</Label>
              <Input
                id="market"
                value={formData.market}
                onChange={(e) => setFormData({ ...formData, market: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                value={formData.phone_number}
                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="attendee">Attendee</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddUser}>Add User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div>
              <Label>Email (read-only)</Label>
              <Input value={formData.email} disabled />
            </div>
            <div>
              <Label htmlFor="edit_employee_id">Employee ID</Label>
              <Input
                id="edit_employee_id"
                value={formData.employee_id}
                onChange={(e) => setFormData({ ...formData, employee_id: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit_full_name">Full Name</Label>
              <Input
                id="edit_full_name"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit_preferred_name">Preferred Name</Label>
              <Input
                id="edit_preferred_name"
                value={formData.preferred_name}
                onChange={(e) => setFormData({ ...formData, preferred_name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit_job_title">Job Title</Label>
              <Input
                id="edit_job_title"
                value={formData.job_title}
                onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit_department">Department</Label>
              <Input
                id="edit_department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit_center">Center</Label>
              <Input
                id="edit_center"
                value={formData.center}
                onChange={(e) => setFormData({ ...formData, center: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit_market">Market</Label>
              <Input
                id="edit_market"
                value={formData.market}
                onChange={(e) => setFormData({ ...formData, market: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit_phone_number">Phone Number</Label>
              <Input
                id="edit_phone_number"
                value={formData.phone_number}
                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit_role">Role</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="attendee">Attendee</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditUser}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedUser?.full_name || selectedUser?.email}?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
