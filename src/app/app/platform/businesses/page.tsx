import { Badge, Card, PageHeader } from '@/components/ui'

export default function BusinessesPage() {
  return (
    <div>
      <PageHeader title="Businesses" />
      <Card className="space-y-3">
        {[
          ['Acme Studio', 'PIPELINE', 'ACTIVE'],
          ['Mike Torres', 'PRESENCE', 'TRIAL'],
          ['Leaf Studio', 'PRESENCE', 'PENDING_APPROVAL'],
        ].map(([n, p, s]) => (
          <div key={n} className="flex items-center justify-between gap-2 border-b border-[var(--border)] pb-3 last:border-0">
            <div>
              <div className="font-medium text-white">{n}</div>
              <div className="text-xs text-[var(--muted)]">{p}</div>
            </div>
            <Badge tone={s === 'ACTIVE' ? 'ok' : 'warn'}>{s}</Badge>
          </div>
        ))}
      </Card>
    </div>
  )
}
