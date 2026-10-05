import { Card, PageHeader, Badge } from '@/components/ui'

export default function PlatformBillingPage() {
  return (
    <div>
      <PageHeader title="Payment gateways" sub="Stripe + Razorpay · webhooks activate tenants." />
      <div className="space-y-3">
        <Card className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-white">Stripe</div>
            <div className="text-xs text-[var(--muted)]">Global cards · subscriptions</div>
          </div>
          <Badge tone={process.env.STRIPE_SECRET_KEY ? 'ok' : 'warn'}>
            {process.env.STRIPE_SECRET_KEY ? 'configured' : 'env missing'}
          </Badge>
        </Card>
        <Card className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-white">Razorpay</div>
            <div className="text-xs text-[var(--muted)]">India UPI · cards · netbanking</div>
          </div>
          <Badge tone={process.env.RAZORPAY_KEY_ID ? 'ok' : 'warn'}>
            {process.env.RAZORPAY_KEY_ID ? 'configured' : 'env missing'}
          </Badge>
        </Card>
      </div>
    </div>
  )
}
