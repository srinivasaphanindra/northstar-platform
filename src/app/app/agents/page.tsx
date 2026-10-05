import { Badge, Button, Card, PageHeader } from '@/components/ui'

const agents = [
  { name: 'Writer', kind: 'writer', status: 'LIVE', desc: 'Drafts in your voice' },
  { name: 'Social', kind: 'social', status: 'LIVE', desc: 'Post + engage within caps' },
  { name: 'Outreach', kind: 'outreach', status: 'DRAFT', desc: 'Pipeline plan' },
  { name: 'Analyst', kind: 'analyst', status: 'PAUSED', desc: 'Weekly pulse' },
]

export default function AgentsPage() {
  return (
    <div>
      <PageHeader
        title="Agents"
        sub="Build and run specialized agents for this workspace."
        action={
          <form action="/api/agents" method="post">
            <input type="hidden" name="name" value="Custom agent" />
            <input type="hidden" name="kind" value="custom" />
            <Button type="submit" className="!min-h-10 !px-3 text-sm">
              New
            </Button>
          </form>
        }
      />
      <div className="space-y-3">
        {agents.map((a) => (
          <Card key={a.name} className="flex items-center justify-between gap-3">
            <div>
              <div className="font-semibold text-white">{a.name}</div>
              <div className="text-xs text-[var(--muted)]">
                {a.kind} · {a.desc}
              </div>
            </div>
            <Badge tone={a.status === 'LIVE' ? 'ok' : a.status === 'DRAFT' ? 'warn' : undefined}>{a.status}</Badge>
          </Card>
        ))}
      </div>
      <Card className="mt-4">
        <div className="text-sm font-semibold text-white">Advanced (mobile)</div>
        <p className="mt-1 text-xs text-[var(--muted)]">Caps, quiet hours, model route — full controls, thumb-friendly.</p>
        <div className="mt-3 grid gap-2">
          <label className="flex min-h-11 items-center justify-between text-sm">
            <span>Live posting</span>
            <input type="checkbox" className="h-5 w-5" />
          </label>
          <label className="flex min-h-11 items-center justify-between text-sm">
            <span>Engage-first</span>
            <input type="checkbox" defaultChecked className="h-5 w-5" />
          </label>
          <label className="block text-sm">
            <span className="text-[var(--muted)]">Daily originals cap</span>
            <input className="input mt-1" defaultValue="2" inputMode="numeric" />
          </label>
        </div>
      </Card>
    </div>
  )
}
