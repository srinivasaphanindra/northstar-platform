import { Badge, Button, Card, PageHeader } from '@/components/ui'

const drafts = [
  {
    id: '1',
    platform: 'X',
    title: 'Calm beats loud',
    body: 'Most founders over-post. We ship three sharp posts and talk to humans in between.',
  },
  {
    id: '2',
    platform: 'LinkedIn',
    title: 'Ship the system',
    body: 'Design systems that ship — not slide decks that stall.',
  },
]

export default function InboxPage() {
  return (
    <div>
      <PageHeader title="Inbox" sub="Drafts to approve · leads on Pipeline." />
      <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
        {['Drafts', 'Leads', 'Activity'].map((t, i) => (
          <span
            key={t}
            className={`whitespace-nowrap rounded-full border px-3 py-2 text-xs font-semibold ${i === 0 ? 'border-[var(--accent)] bg-[rgba(201,100,66,0.12)] text-white' : 'border-[var(--border)] text-[var(--muted)]'}`}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="space-y-3">
        {drafts.map((d) => (
          <Card key={d.id}>
            <div className="flex items-center justify-between gap-2">
              <div className="font-semibold text-white">
                {d.platform} · {d.title}
              </div>
              <Badge tone="warn">pending</Badge>
            </div>
            <p className="mt-2 text-sm text-[var(--muted)]">{d.body}</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <form action="/api/drafts/approve" method="post">
                <input type="hidden" name="id" value={d.id} />
                <input type="hidden" name="status" value="APPROVED" />
                <Button type="submit" className="w-full">
                  Approve
                </Button>
              </form>
              <form action="/api/drafts/approve" method="post">
                <input type="hidden" name="id" value={d.id} />
                <input type="hidden" name="status" value="REJECTED" />
                <Button type="submit" variant="ghost" className="w-full">
                  Edit later
                </Button>
              </form>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
