import { Card, PageHeader, Badge } from '@/components/ui'

export default function TeamPage() {
  return (
    <div>
      <PageHeader title="Team" sub="Invite seats for this workspace." />
      <Card className="space-y-3">
        {[
          ['You', 'owner'],
          ['Jordan', 'member'],
        ].map(([n, r]) => (
          <div key={n} className="flex min-h-12 items-center justify-between border-b border-[var(--border)] pb-3 last:border-0">
            <span className="font-medium text-white">{n}</span>
            <Badge>{r}</Badge>
          </div>
        ))}
        <input className="input" placeholder="email@company.com" />
        <button className="btn btn-primary w-full">Send invite</button>
      </Card>
    </div>
  )
}
