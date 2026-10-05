import { cookies } from 'next/headers'
import Link from 'next/link'
import { Badge, Card, PageHeader, Stat } from '@/components/ui'
import { Button } from '@/components/ui'

export default async function AppHome() {
  const jar = await cookies()
  let role = 'business'
  let name = 'You'
  let workspace = 'Workspace'
  try {
    const s = JSON.parse(decodeURIComponent(jar.get('ns_demo_session')?.value || '{}'))
    role = s.role || role
    name = s.name || name
    workspace = s.workspace || workspace
  } catch {}

  if (role === 'platform') {
    return (
      <div>
        <PageHeader title="Platform" sub={`Welcome ${name} — super-admin control plane.`} />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat label="MRR (demo)" value="$1,146" hint="Active tenants" />
          <Stat label="Resellers" value="3" />
          <Stat label="Businesses" value="18" />
          <Stat label="Pending approvals" value="2" hint="Tap Approvals" />
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Card>
            <div className="mb-2 text-sm font-semibold text-white">Needs you</div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between gap-2">
                <span>Leaf Studio · Presence · no payment</span>
                <Badge tone="warn">approval</Badge>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span>Orbit Media · Agency trial</span>
                <Badge tone="warn">approval</Badge>
              </div>
            </div>
            <Link href="/app/platform/approvals" className="btn btn-primary mt-4 w-full">
              Review approvals
            </Link>
          </Card>
          <Card>
            <div className="mb-2 text-sm font-semibold text-white">Shortcuts</div>
            <div className="grid gap-2">
              <Link href="/app/platform/resellers" className="btn btn-ghost w-full">
                Manage resellers
              </Link>
              <Link href="/app/platform/businesses" className="btn btn-ghost w-full">
                All businesses
              </Link>
              <Link href="/app/platform/billing" className="btn btn-ghost w-full">
                Billing providers
              </Link>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  if (role === 'reseller') {
    return (
      <div>
        <PageHeader title={workspace} sub="Agency dashboard — clients, white-label, team." />
        <div className="grid grid-cols-2 gap-3">
          <Stat label="Clients" value="6" />
          <Stat label="Client MRR" value="$894" />
          <Stat label="Onboarding" value="1" />
          <Stat label="Team" value="2" />
        </div>
        <Link href="/app/reseller/clients" className="btn btn-primary mt-4 w-full">
          Manage clients
        </Link>
        <Link href="/app/reseller/white-label" className="btn btn-ghost mt-2 w-full">
          White-label domain
        </Link>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title={workspace}
        sub="Presence workspace · mobile command"
        action={<Badge tone="accent">Presence</Badge>}
      />
      <div className="grid grid-cols-2 gap-3">
        <Stat label="Agents" value="3" hint="1 live" />
        <Stat label="Connections" value="2/4" />
        <Stat label="Drafts" value="2" hint="Need approve" />
        <Stat label="Leads" value="—" hint="Upgrade Pipeline" />
      </div>
      <Card className="mt-4">
        <div className="text-sm font-semibold text-white">Next on phone</div>
        <ol className="mt-3 space-y-3 text-sm text-[var(--muted)]">
          <li className="flex justify-between gap-2">
            <span>1. Connect X</span>
            <Link href="/app/connect" className="text-[var(--accent)]">
              Open
            </Link>
          </li>
          <li className="flex justify-between gap-2">
            <span>2. Approve drafts</span>
            <Link href="/app/inbox" className="text-[var(--accent)]">
              Inbox
            </Link>
          </li>
          <li className="flex justify-between gap-2">
            <span>3. Spin social agent</span>
            <Link href="/app/agents" className="text-[var(--accent)]">
              Agents
            </Link>
          </li>
        </ol>
      </Card>
      <form action="/api/billing/checkout" method="post" className="mt-4">
        <input type="hidden" name="plan" value="PIPELINE" />
        <Button type="submit" className="w-full" variant="ghost">
          Upgrade to Pipeline (Stripe / Razorpay)
        </Button>
      </form>
    </div>
  )
}
