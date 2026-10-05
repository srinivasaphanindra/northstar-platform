import { NextRequest, NextResponse } from 'next/server'
import { createRazorpayOrder, createStripeCheckout } from '@/lib/billing'

export async function POST(req: NextRequest) {
  const form = await req.formData()
  const plan = String(form.get('plan') || 'PRESENCE')
  const provider = String(form.get('provider') || 'stripe')
  const amount = plan === 'PIPELINE' ? 24900 : plan === 'AGENCY' ? 49900 : 9900
  const base = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin

  if (provider === 'razorpay') {
    const order = await createRazorpayOrder({
      amountCents: amount,
      currency: 'INR',
      tenantId: 'demo',
      receipt: `ns_${Date.now()}`,
    })
    return NextResponse.redirect(new URL(`/app/settings/billing?razorpay=${order.orderId}`, req.url), 303)
  }

  const session = await createStripeCheckout({
    amountCents: amount,
    currency: 'usd',
    customerEmail: 'buyer@example.com',
    tenantId: 'demo',
    successUrl: `${base}/app?paid=1`,
    cancelUrl: `${base}/app/settings/billing`,
  })
  return NextResponse.redirect(session.url || `${base}/app`, 303)
}
