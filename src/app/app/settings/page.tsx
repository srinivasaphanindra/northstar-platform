import { Card, Field, PageHeader } from '@/components/ui'

export default function SettingsPage() {
  return (
    <div>
      <PageHeader title="Workspace settings" sub="Core identity — works fully on phone." />
      <Card className="space-y-3">
        <Field label="Workspace name">
          <input className="input" defaultValue="Acme Studio" />
        </Field>
        <Field label="Slug">
          <input className="input" defaultValue="acme" />
        </Field>
        <Field label="Timezone">
          <select className="input">
            <option>Asia/Kolkata</option>
            <option>UTC</option>
            <option>America/New_York</option>
          </select>
        </Field>
        <Field label="SuperGrok confirmed">
          <label className="flex min-h-11 items-center gap-2 text-sm">
            <input type="checkbox" className="h-5 w-5" defaultChecked /> Yes — client-paid model
          </label>
        </Field>
        <button className="btn btn-primary w-full" type="button">
          Save
        </button>
      </Card>
    </div>
  )
}
