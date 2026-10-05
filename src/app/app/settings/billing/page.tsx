import { Card, PageHeader, Badge } from '@/components/ui'
import Link from 'next/link'

export default function BillingSettingsPage() {
  return (
    <div>
      <PageHeader title="Plan & billing" />
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-white">Presence</div>
            <div className="text-sm text-[var(--muted)]">$99/mo · USD</div>
          </div>
          <Badge tone="ok">active</Badge>
        </div>
        <div className="mt-4 grid gap-2">
          <form action="/api/billing/checkout" method="post">
            <input type="hidden" name="plan" value="PIPELINE" />
            <input type="hidden" name="provider" value="stripe" />
            <button className="btn btn-primary w-full" type="submit">
              Upgrade via Stripe
            </button>
          </form>
          <form action="/api/billing/checkout" method="post">
            <input type="hidden" name="plan" value="PIPELINE" />
            <input type="hidden" name="provider" value="razorpay" />
            <button className="btn btn-ghost w-full" type="submit">
              Pay with Razorpay (India)
            </button>
          </form>
          <form action="/api/approvals" method="post">
            <input type="hidden" name="kind" value="COMP_ACCESS" />
            <button className="btn btn-ghost w-full" type="submit">
              Request admin approval (no payment)
            </button>
          </form>
        </div>
      </Card>
      <p className="mt-3 text-xs text-[var(--muted)]">
        Webhooks auto-create / activate workspaces. See <Link href="/docs">docs</Link>.
      </p>
    </div>
  )
}
