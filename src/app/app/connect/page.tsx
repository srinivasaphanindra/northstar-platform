import { Badge, Card, PageHeader } from '@/components/ui'
import { ensureSeed, readSession } from '@/lib/session'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'

export default async function ConnectPage() {
  await ensureSeed()
  const session = await readSession()
  if (!session) redirect('/login')
  let connections = await prisma.connection.findMany({ where: { tenantId: session.activeTenantId } })
  if (connections.length === 0) {
    await prisma.connection.createMany({
      data: [
        { tenantId: session.activeTenantId, provider: 'X', status: 'DISCONNECTED' },
        { tenantId: session.activeTenantId, provider: 'FACEBOOK', status: 'DISCONNECTED' },
        { tenantId: session.activeTenantId, provider: 'LINKEDIN', status: 'DISCONNECTED' },
        { tenantId: session.activeTenantId, provider: 'YOUTUBE', status: 'DISCONNECTED' },
        { tenantId: session.activeTenantId, provider: 'INSTAGRAM', status: 'DISCONNECTED' },
        { tenantId: session.activeTenantId, provider: 'THREADS', status: 'DISCONNECTED' },
      ],
    })
    connections = await prisma.connection.findMany({ where: { tenantId: session.activeTenantId } })
  }
  return (
    <div>
      <PageHeader title="Connect" sub="Tools & social — DB-backed status." />
      <div className="space-y-3">
        {connections.map((p) => (
          <Card key={p.id} className="flex items-center justify-between gap-3">
            <div>
              <div className="font-semibold text-white">{p.provider}</div>
              <div className="text-xs text-[var(--muted)]">{p.handle || '—'}</div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge tone={p.status === 'CONNECTED' ? 'ok' : p.status === 'PENDING' ? 'warn' : undefined}>{p.status}</Badge>
              <form action="/api/connections" method="post">
                <input type="hidden" name="id" value={p.id} />
                <button type="submit" className="text-sm font-semibold text-[var(--accent)]">{p.status === 'CONNECTED' ? 'Disconnect' : 'Mark connected'}</button>
              </form>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
