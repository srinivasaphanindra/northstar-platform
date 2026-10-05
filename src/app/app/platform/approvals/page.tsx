import { Badge, Button, Card, PageHeader } from '@/components/ui'

const rows = [
  { id: 'a1', who: 'Leaf Studio', kind: 'COMP_ACCESS', plan: 'PRESENCE' },
  { id: 'a2', who: 'Orbit Media', kind: 'WORKSPACE_CREATE', plan: 'AGENCY' },
]

export default function ApprovalsPage() {
  return (
    <div>
      <PageHeader title="Admin approvals" sub="Activate workspaces without payment when you say yes." />
      <div className="space-y-3">
        {rows.map((r) => (
          <Card key={r.id}>
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="font-semibold text-white">{r.who}</div>
                <div className="text-xs text-[var(--muted)]">
                  {r.kind} · {r.plan}
                </div>
              </div>
              <Badge tone="warn">PENDING</Badge>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <form action="/api/approvals/decide" method="post">
                <input type="hidden" name="id" value={r.id} />
                <input type="hidden" name="decision" value="APPROVED" />
                <Button type="submit" className="w-full">
                  Approve
                </Button>
              </form>
              <form action="/api/approvals/decide" method="post">
                <input type="hidden" name="id" value={r.id} />
                <input type="hidden" name="decision" value="REJECTED" />
                <Button type="submit" variant="ghost" className="w-full">
                  Reject
                </Button>
              </form>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
