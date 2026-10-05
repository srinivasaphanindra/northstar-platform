import { Badge, Card, PageHeader } from '@/components/ui'
import { ensureSeed } from '@/lib/session'
import { prisma } from '@/lib/db'

export default async function ResellersPage() {
  await ensureSeed()
  const rows = await prisma.tenant.findMany({ where: { kind: 'RESELLER' }, orderBy: { createdAt: 'desc' } })
  const withCounts = await Promise.all(
    rows.map(async (r) => ({ r, n: await prisma.tenant.count({ where: { parentId: r.id } }) })),
  )
  return (
    <div>
      <PageHeader title="Resellers" />
      <Card className="space-y-3">
        {withCounts.map(({ r, n }) => (
          <div key={r.id} className="flex items-center justify-between border-b border-[var(--border)] pb-3 last:border-0">
            <div>
              <div className="font-medium text-white">{r.name}</div>
              <div className="text-xs text-[var(--muted)]">{n} clients · {r.slug}</div>
            </div>
            <Badge tone={r.status === 'ACTIVE' ? 'ok' : 'warn'}>{r.status}</Badge>
          </div>
        ))}
      </Card>
    </div>
  )
}
