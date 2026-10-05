import { Badge, Button, Card, PageHeader } from '@/components/ui'
import { ensureSeed, readSession } from '@/lib/session'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'

export default async function ApprovalsPage() {
  await ensureSeed()
  const session = await readSession()
  if (!session) redirect('/login')
  const rows = await prisma.adminApproval.findMany({
    where: { status: 'PENDING' },
    include: { tenant: true, requester: true },
    orderBy: { createdAt: 'desc' },
  })
  return (
    <div>
      <PageHeader title="Admin approvals" sub="Activate workspaces without payment." />
      <div className="space-y-3">
        {rows.length === 0 ? <Card className="text-sm text-[var(--muted)]">Queue empty.</Card> : null}
        {rows.map((r) => (
          <Card key={r.id}>
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="font-semibold text-white">{r.tenant?.name || 'Workspace'}</div>
                <div className="text-xs text-[var(--muted)]">{r.kind} · {r.requester.email}</div>
              </div>
              <Badge tone="warn">PENDING</Badge>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <form action="/api/approvals/decide" method="post">
                <input type="hidden" name="id" value={r.id} />
                <input type="hidden" name="decision" value="APPROVED" />
                <Button type="submit" className="w-full">Approve</Button>
              </form>
              <form action="/api/approvals/decide" method="post">
                <input type="hidden" name="id" value={r.id} />
                <input type="hidden" name="decision" value="REJECTED" />
                <Button type="submit" variant="ghost" className="w-full">Reject</Button>
              </form>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
