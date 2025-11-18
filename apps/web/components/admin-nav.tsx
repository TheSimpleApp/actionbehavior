'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { AdminLogout } from './admin-logout'

const navItems = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/exports', label: 'Exports' },
  { href: '/admin/registrations', label: 'Registrations' },
  { href: '/admin/roommates', label: 'Roommates' },
  { href: '/admin/users', label: 'Users' },
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">ABC Summit 2025</h2>
            <span className="text-sm text-muted-foreground">Admin Portal</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={pathname === item.href ? 'default' : 'ghost'}
                    size="sm"
                    className={cn(
                      pathname === item.href && 'bg-primary text-primary-foreground'
                    )}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
            <AdminLogout />
          </div>
        </div>
      </div>
    </nav>
  )
}