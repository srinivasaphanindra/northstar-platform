import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/billing'
import { dbEnabled, prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  const stripe = getStripe()
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')
  let event: any = { type: 'demo', data: { object: {} } }
  if (stripe && process.env.STRIPE_WEBHOOK_SECRET && sig) {
    try {
      event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (e: any) {
      return NextResponse.json({ error: e.message }, { status: 400 })
    }
  } else {
    try {
      event = JSON.parse(body || '{}')
    } catch {
      event = {}
    }
  }

  if (event.type === 'checkout.session.completed') {
    const tenantId = event.data?.object?.metadata?.tenantId
    if (tenantId && dbEnabled()) {
      await prisma.tenant.update({
        where: { id: tenantId },
        data: { status: 'ACTIVE', billingProvider: 'STRIPE' },
      })
    }
  }
  return NextResponse.json({ received: true })
}
