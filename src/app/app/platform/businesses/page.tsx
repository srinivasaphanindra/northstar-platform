import { Badge, Card, PageHeader } from '@/components/ui'
import { ensureSeed } from '@/lib/session'
import { prisma } from '@/lib/db'

export default async function BusinessesPage() {
  await ensureSeed()
  const rows = await prisma.tenant.findMany({ where: { kind: 'BUSINESS' }, orderBy: { createdAt: 'desc' } })
  return (
    <div>
      <PageHeader title="Businesses" />
      <Card className="space-y-3">
        {rows.map((b) => (
          <div key={b.id} className="flex items-center justify-between gap-2 border-b border-[var(--border)] pb-3 last:border-0">
            <div>
              <div className="font-medium text-white">{b.name}</div>
              <div className="text-xs text-[var(--muted)]">{b.planId} · {b.slug}</div>
            </div>
            <Badge tone={b.status === 'ACTIVE' ? 'ok' : 'warn'}>{b.status}</Badge>
          </div>
        ))}
      </Card>
    </div>
  )
}
