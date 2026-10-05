import Link from 'next/link'
import { Badge, Card, PageHeader, Stat } from '@/components/ui'
import { ensureSeed, readSession } from '@/lib/session'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'

export default async function AppHome() {
  await ensureSeed()
  const session = await readSession()
  if (!session) redirect('/login')

  const tenant = await prisma.tenant.findUniqueOrThrow({ where: { id: session.activeTenantId } })
  const isPlatform = tenant.kind === 'PLATFORM'
  const isReseller = tenant.kind === 'RESELLER'

  if (isPlatform) {
    const resellers = await prisma.tenant.count({ where: { kind: 'RESELLER' } })
    const businesses = await prisma.tenant.count({ where: { kind: 'BUSINESS' } })
    const pending = await prisma.adminApproval.count({ where: { status: 'PENDING' } })
    const mrr = await prisma.tenant.aggregate({
      where: { kind: { not: 'PLATFORM' }, status: { in: ['ACTIVE', 'TRIAL', 'ONBOARDING'] } },
      _sum: { mrrCents: true },
    })
    const approvals = await prisma.adminApproval.findMany({
      where: { status: 'PENDING' },
      include: { tenant: true },
      take: 5,
      orderBy: { createdAt: 'desc' },
    })

    return (
      <div>
        <PageHeader title="Forge · Platform" sub={`Signed in as ${session.name}`} />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat label="MRR" value={`$${Math.round((mrr._sum.mrrCents || 0) / 100)}`} hint="From DB tenants" />
          <Stat label="Resellers" value={resellers} />
          <Stat label="Businesses" value={businesses} />
          <Stat label="Pending approvals" value={pending} />
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Card>
            <div className="mb-2 text-sm font-semibold text-white">Needs you</div>
            {approvals.length === 0 ? (
              <p className="text-sm text-[var(--muted)]">No pending approvals</p>
            ) : (
              <div className="space-y-3 text-sm">
                {approvals.map((a) => (
                  <div key={a.id} className="flex items-center justify-between gap-2">
                    <span>
                      {a.tenant?.name || 'Workspace'} · {a.kind}
                    </span>
                    <Badge tone="warn">pending</Badge>
                  </div>
                ))}
              </div>
            )}
            <Link href="/app/platform/approvals" className="btn btn-primary mt-4 w-full">
              Review approvals
            </Link>
          </Card>
          <Card>
            <div className="mb-2 text-sm font-semibold text-white">Shortcuts</div>
            <div className="grid gap-2">
              <Link href="/app/platform/resellers" className="btn btn-ghost w-full">Resellers</Link>
              <Link href="/app/platform/businesses" className="btn btn-ghost w-full">Businesses</Link>
              <Link href="/app/platform/billing" className="btn btn-ghost w-full">Payment setup</Link>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  if (isReseller) {
    const clients = await prisma.tenant.findMany({ where: { parentId: tenant.id } })
    const clientMrr = clients.reduce((s, c) => s + c.mrrCents, 0)
    return (
      <div>
        <PageHeader title={tenant.name} sub="Agency · live from database" />
        <div className="grid grid-cols-2 gap-3">
          <Stat label="Clients" value={clients.length} />
          <Stat label="Client MRR" value={`$${Math.round(clientMrr / 100)}`} />
          <Stat label="Onboarding" value={clients.filter((c) => c.status === 'ONBOARDING' || c.status === 'PENDING_APPROVAL').length} />
          <Stat label="Your plan" value="Agency" hint="$499/mo" />
        </div>
        <Link href="/app/reseller/clients" className="btn btn-primary mt-4 w-full">Manage clients</Link>
        <Link href="/app/reseller/white-label" className="btn btn-ghost mt-2 w-full">White-label domain</Link>
      </div>
    )
  }

  const agents = await prisma.agent.count({ where: { tenantId: tenant.id } })
  const liveAgents = await prisma.agent.count({ where: { tenantId: tenant.id, status: 'LIVE' } })
  const connections = await prisma.connection.findMany({ where: { tenantId: tenant.id } })
  const pendingDrafts = await prisma.draft.count({ where: { tenantId: tenant.id, status: 'PENDING' } })
  const leads = await prisma.lead.count({ where: { tenantId: tenant.id } })

  return (
    <div>
      <PageHeader title={tenant.name} sub={`${tenant.planId} · live workspace`} action={<Badge tone="accent">{tenant.planId}</Badge>} />
      <div className="grid grid-cols-2 gap-3">
        <Stat label="Agents" value={agents} hint={`${liveAgents} live`} />
        <Stat label="Connections" value={`${connections.filter((c) => c.status === 'CONNECTED').length}/${connections.length}`} />
        <Stat label="Drafts pending" value={pendingDrafts} />
        <Stat label="Leads" value={tenant.planId === 'PRESENCE' ? '—' : leads} />
      </div>
      <Card className="mt-4">
        <div className="text-sm font-semibold text-white">Next on phone</div>
        <ol className="mt-3 space-y-3 text-sm text-[var(--muted)]">
          <li className="flex justify-between gap-2"><span>1. Connect tools</span><Link href="/app/connect" className="text-[var(--accent)]">Open</Link></li>
          <li className="flex justify-between gap-2"><span>2. Approve drafts ({pendingDrafts})</span><Link href="/app/inbox" className="text-[var(--accent)]">Inbox</Link></li>
          <li className="flex justify-between gap-2"><span>3. Agents</span><Link href="/app/agents" className="text-[var(--accent)]">Open</Link></li>
        </ol>
      </Card>
    </div>
  )
}
