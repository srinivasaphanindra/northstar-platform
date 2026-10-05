import Link from 'next/link'
import { Card, PageHeader } from '@/components/ui'
import { cookies } from 'next/headers'

export default async function MorePage() {
  const jar = await cookies()
  let role = 'business'
  try {
    role = JSON.parse(decodeURIComponent(jar.get('ns_demo_session')?.value || '{}')).role || role
  } catch {}

  const links = [
    { href: '/app/settings', label: 'Workspace settings' },
    { href: '/app/settings/advanced', label: 'Advanced' },
    { href: '/app/settings/billing', label: 'Plan & billing' },
    { href: '/app/settings/team', label: 'Team' },
    ...(role === 'reseller' ? [{ href: '/app/reseller/white-label', label: 'White-label domain' }] : []),
    ...(role === 'platform'
      ? [
          { href: '/app/platform/approvals', label: 'Admin approvals' },
          { href: '/app/platform/billing', label: 'Payment gateways' },
        ]
      : []),
    { href: '/api/demo/session?logout=1', label: 'Sign out' },
  ]

  return (
    <div>
      <PageHeader title="More" sub="Everything reachable on mobile." />
      <Card className="divide-y divide-[var(--border)] !p-0">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="flex min-h-14 items-center justify-between px-4 text-sm font-medium text-white">
            {l.label}
            <span className="text-[var(--muted)]">›</span>
          </Link>
        ))}
      </Card>
    </div>
  )
}
