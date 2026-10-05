import { Badge, Button, Card, PageHeader } from '@/components/ui'
import { ensureSeed, readSession } from '@/lib/session'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'

export default async function InboxPage() {
  await ensureSeed()
  const session = await readSession()
  if (!session) redirect('/login')
  const drafts = await prisma.draft.findMany({ where: { tenantId: session.activeTenantId }, orderBy: { createdAt: 'desc' } })
  const leads = await prisma.lead.findMany({ where: { tenantId: session.activeTenantId }, orderBy: { createdAt: 'desc' } })
  return (
    <div>
      <PageHeader title="Inbox" sub="Drafts & leads from the database." />
      <div className="space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Drafts</div>
        {drafts.length === 0 ? <Card className="text-sm text-[var(--muted)]">No drafts</Card> : null}
        {drafts.map((d) => (
          <Card key={d.id}>
            <div className="flex items-center justify-between gap-2">
              <div className="font-semibold text-white">{d.platform} · {d.title}</div>
              <Badge tone={d.status === 'PENDING' ? 'warn' : d.status === 'APPROVED' || d.status === 'POSTED' ? 'ok' : undefined}>{d.status}</Badge>
            </div>
            <p className="mt-2 text-sm text-[var(--muted)]">{d.body}</p>
            {d.status === 'PENDING' ? (
              <div className="mt-3 grid grid-cols-2 gap-2">
                <form action="/api/drafts/approve" method="post">
                  <input type="hidden" name="id" value={d.id} />
                  <input type="hidden" name="status" value="APPROVED" />
                  <Button type="submit" className="w-full">Approve</Button>
                </form>
                <form action="/api/drafts/approve" method="post">
                  <input type="hidden" name="id" value={d.id} />
                  <input type="hidden" name="status" value="REJECTED" />
                  <Button type="submit" variant="ghost" className="w-full">Reject</Button>
                </form>
              </div>
            ) : null}
          </Card>
        ))}
        <div className="pt-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Leads</div>
        {leads.map((l) => (
          <Card key={l.id} className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white">{l.name}</div>
              <div className="text-xs text-[var(--muted)]">{l.source} · {l.note}</div>
            </div>
            <Badge>{l.status}</Badge>
          </Card>
        ))}
      </div>
    </div>
  )
}
