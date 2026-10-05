import { Card, Field, PageHeader } from '@/components/ui'

export default function AdvancedPage() {
  return (
    <div>
      <PageHeader title="Advanced" sub="Power controls — same on mobile as desktop." />
      <Card className="space-y-3">
        <Field label="Model preference">
          <select className="input">
            <option>Auto (platform route)</option>
            <option>Grok primary</option>
            <option>Cost-save free route</option>
          </select>
        </Field>
        <Field label="Quiet hours (JSON)">
          <textarea className="input min-h-24" defaultValue={'{"start":"22:00","end":"07:00"}'} />
        </Field>
        <Field label="Feature flags">
          <textarea className="input min-h-24" defaultValue={'{"engageFirst":true,"fbGroups":false}'} />
        </Field>
        <label className="flex min-h-11 items-center justify-between text-sm">
          <span>Debug activity webhooks</span>
          <input type="checkbox" className="h-5 w-5" />
        </label>
        <button className="btn btn-primary w-full">Save advanced</button>
      </Card>
    </div>
  )
}
