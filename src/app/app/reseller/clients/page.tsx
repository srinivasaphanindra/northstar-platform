import { Badge, Button, Card, Field, PageHeader } from '@/components/ui'
import { ensureSeed, readSession } from '@/lib/session'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'

export default async function ResellerClientsPage() {
  await ensureSeed()
  const session = await readSession()
  if (!session) redirect('/login')
  const clients = await prisma.tenant.findMany({ where: { parentId: session.activeTenantId }, orderBy: { createdAt: 'desc' } })
  return (
    <div>
      <PageHeader title="Clients" sub="Sub-accounts under your Agency plan." />
      <Card className="mb-4 space-y-3">
        {clients.map((c) => (
          <div key={c.id} className="flex items-center justify-between border-b border-[var(--border)] pb-3 last:border-0">
            <div>
              <div className="font-medium text-white">{c.name}</div>
              <div className="text-xs text-[var(--muted)]">{c.planId} · {c.slug}</div>
            </div>
            <Badge tone={c.status === 'ACTIVE' ? 'ok' : 'warn'}>{c.status}</Badge>
          </div>
        ))}
      </Card>
      <Card className="space-y-3">
        <div className="font-semibold text-white">Add client</div>
        <form action="/api/tenants" method="post" className="space-y-3">
          <input type="hidden" name="kind" value="BUSINESS" />
          <Field label="Name"><input className="input" name="name" placeholder="Client Co" required /></Field>
          <Field label="Slug"><input className="input" name="slug" placeholder="client-co" required /></Field>
          <Field label="Plan">
            <select className="input" name="planId" defaultValue="PRESENCE">
              <option value="PRESENCE">Presence</option>
              <option value="PIPELINE">Pipeline</option>
              <option value="PILOT">Pilot</option>
            </select>
          </Field>
          <Button type="submit" className="w-full">Create sub-account</Button>
        </form>
      </Card>
    </div>
  )
}
