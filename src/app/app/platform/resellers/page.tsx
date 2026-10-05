import { Badge, Card, PageHeader } from '@/components/ui'

export default function ResellersPage() {
  return (
    <div>
      <PageHeader title="Resellers" />
      <Card className="space-y-3">
        {[
          ['Bright Agency', '6 clients', 'ACTIVE'],
          ['Orbit Media', '0 clients', 'TRIAL'],
        ].map(([n, m, s]) => (
          <div key={n} className="flex items-center justify-between border-b border-[var(--border)] pb-3 last:border-0">
            <div>
              <div className="font-medium text-white">{n}</div>
              <div className="text-xs text-[var(--muted)]">{m}</div>
            </div>
            <Badge tone={s === 'ACTIVE' ? 'ok' : 'warn'}>{s}</Badge>
          </div>
        ))}
      </Card>
    </div>
  )
}
