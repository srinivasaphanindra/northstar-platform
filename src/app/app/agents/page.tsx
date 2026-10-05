import { Badge, Button, Card, PageHeader } from '@/components/ui'
import { ensureSeed, readSession } from '@/lib/session'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'

export default async function AgentsPage() {
  await ensureSeed()
  const session = await readSession()
  if (!session) redirect('/login')
  const agents = await prisma.agent.findMany({ where: { tenantId: session.activeTenantId }, orderBy: { createdAt: 'asc' } })
  return (
    <div>
      <PageHeader title="Agents" sub="Stored in local database." action={<form action="/api/agents" method="post"><input type="hidden" name="name" value="Custom agent" /><input type="hidden" name="kind" value="custom" /><Button type="submit" className="!min-h-10 !px-3 text-sm">New</Button></form>} />
      <div className="space-y-3">
        {agents.length === 0 ? <Card className="text-sm text-[var(--muted)]">No agents yet.</Card> : null}
        {agents.map((a) => (
          <Card key={a.id} className="flex items-center justify-between gap-3">
            <div>
              <div className="font-semibold text-white">{a.name}</div>
              <div className="text-xs text-[var(--muted)]">{a.kind}</div>
            </div>
            <Badge tone={a.status === 'LIVE' ? 'ok' : a.status === 'DRAFT' ? 'warn' : undefined}>{a.status}</Badge>
          </Card>
        ))}
      </div>
    </div>
  )
}
