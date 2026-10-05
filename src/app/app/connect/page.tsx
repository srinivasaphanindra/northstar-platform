import { Badge, Card, PageHeader } from '@/components/ui'

const providers = [
  { id: 'X', handle: '@you', status: 'CONNECTED' },
  { id: 'FACEBOOK', handle: '—', status: 'DISCONNECTED' },
  { id: 'LINKEDIN', handle: 'You', status: 'CONNECTED' },
  { id: 'YOUTUBE', handle: '—', status: 'DISCONNECTED' },
  { id: 'SLACK', handle: '#ns-you', status: 'PENDING' },
]

export default function ConnectPage() {
  return (
    <div>
      <PageHeader title="Connect" sub="Tools & social. We never ask for passwords in-app." />
      <div className="space-y-3">
        {providers.map((p) => (
          <Card key={p.id} className="flex items-center justify-between gap-3">
            <div>
              <div className="font-semibold text-white">{p.id}</div>
              <div className="text-xs text-[var(--muted)]">{p.handle}</div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge tone={p.status === 'CONNECTED' ? 'ok' : p.status === 'PENDING' ? 'warn' : undefined}>
                {p.status}
              </Badge>
              <form action="/api/connections" method="post">
                <input type="hidden" name="provider" value={p.id} />
                <button type="submit" className="text-sm font-semibold text-[var(--accent)]">
                  {p.status === 'CONNECTED' ? 'Manage' : 'Connect'}
                </button>
              </form>
            </div>
          </Card>
        ))}
      </div>
      <p className="mt-4 text-xs text-[var(--muted)]">
        Production: OAuth + agency Chrome session bridge. Tokens stay server-side / vault.
      </p>
    </div>
  )
}
