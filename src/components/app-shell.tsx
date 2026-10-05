'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bot, Home, Inbox, Link2, Menu, Settings, Users, Wallet, Network, Shield } from 'lucide-react'
import { cn } from '@/lib/cn'

const tabs = [
  { href: '/app', label: 'Home', icon: Home },
  { href: '/app/agents', label: 'Agents', icon: Bot },
  { href: '/app/connect', label: 'Connect', icon: Link2 },
  { href: '/app/inbox', label: 'Inbox', icon: Inbox },
  { href: '/app/more', label: 'More', icon: Menu },
]

export function AppShell({
  children,
  role = 'business',
  workspace = 'Workspace',
}: {
  children: React.ReactNode
  role?: string
  workspace?: string
}) {
  const path = usePathname()

  const side =
    role === 'platform'
      ? [
          { href: '/app', label: 'Overview', icon: Home },
          { href: '/app/platform/resellers', label: 'Resellers', icon: Network },
          { href: '/app/platform/businesses', label: 'Businesses', icon: Users },
          { href: '/app/platform/approvals', label: 'Approvals', icon: Shield },
          { href: '/app/platform/billing', label: 'Billing', icon: Wallet },
          { href: '/app/more', label: 'Settings', icon: Settings },
        ]
      : role === 'reseller'
        ? [
            { href: '/app', label: 'Overview', icon: Home },
            { href: '/app/reseller/clients', label: 'Clients', icon: Users },
            { href: '/app/agents', label: 'Agents', icon: Bot },
            { href: '/app/reseller/white-label', label: 'White-label', icon: Link2 },
            { href: '/app/more', label: 'Settings', icon: Settings },
          ]
        : [
            { href: '/app', label: 'Home', icon: Home },
            { href: '/app/agents', label: 'Agents', icon: Bot },
            { href: '/app/connect', label: 'Connect', icon: Link2 },
            { href: '/app/inbox', label: 'Inbox', icon: Inbox },
            { href: '/app/more', label: 'Settings', icon: Settings },
          ]

  return (
    <div className="min-h-screen bg-[var(--canvas)]">
      {/* desktop side */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 border-r border-[var(--border)] bg-[var(--surface)] p-3 md:flex md:flex-col">
        <div className="mb-4 flex items-center gap-2 px-2 py-2">
          <div className="h-7 w-7 rounded-full bg-[var(--accent)]" />
          <div>
            <div className="text-sm font-semibold text-white">Northstar</div>
            <div className="text-[11px] text-[var(--muted)]">{workspace}</div>
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-1">
          {side.map((item) => {
            const active = path === item.href || (item.href !== '/app' && path.startsWith(item.href))
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-medium text-[var(--muted)]',
                  active && 'bg-white/5 text-white',
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="mt-auto rounded-xl border border-[var(--border)] p-3 text-xs text-[var(--muted)]">
          Role: <span className="text-white">{role}</span>
        </div>
      </aside>

      {/* top mobile bar */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[var(--border)] bg-[var(--canvas)]/90 px-4 py-3 backdrop-blur md:hidden">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-[var(--accent)]" />
          <div>
            <div className="text-sm font-semibold">{workspace}</div>
            <div className="text-[11px] capitalize text-[var(--muted)]">{role}</div>
          </div>
        </div>
        <Link href="/app/more" className="btn btn-ghost !min-h-10 !px-3 text-xs">
          Account
        </Link>
      </header>

      <main className="safe-pb mx-auto max-w-3xl px-4 py-4 md:ml-60 md:max-w-5xl md:px-8 md:py-8">{children}</main>

      <nav className="tabbar md:hidden" aria-label="Primary">
        {tabs.map((t) => {
          const active = path === t.href || (t.href !== '/app' && path.startsWith(t.href))
          const Icon = t.icon
          return (
            <Link key={t.href} href={t.href} className={cn(active && 'active')}>
              <Icon />
              {t.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
