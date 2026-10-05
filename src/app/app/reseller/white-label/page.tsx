import { Card, Field, PageHeader, Badge } from '@/components/ui'

export default function WhiteLabelPage() {
  return (
    <div>
      <PageHeader title="White-label" sub="Custom domain for your client login." />
      <Card className="space-y-3">
        <Field label="Brand name">
          <input className="input" defaultValue="Bright Agency" />
        </Field>
        <Field label="Accent color">
          <input className="input" defaultValue="#3b82f6" />
        </Field>
        <Field label="Custom domain">
          <input className="input" placeholder="app.youragency.com" />
        </Field>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[var(--muted)]">DNS verified</span>
          <Badge tone="warn">pending</Badge>
        </div>
        <p className="text-xs text-[var(--muted)]">
          Point CNAME to <code className="text-white">cname.northstar.agents</code> then verify. Middleware will resolve
          host → reseller tenant.
        </p>
        <button className="btn btn-primary w-full" type="button">
          Save & verify
        </button>
      </Card>
    </div>
  )
}
