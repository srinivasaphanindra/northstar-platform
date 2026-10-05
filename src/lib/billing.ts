import Stripe from 'stripe'

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) return null
  return new Stripe(key, { apiVersion: '2024-11-20.acacia' as any })
}

export async function createStripeCheckout(opts: {
  priceId?: string
  amountCents: number
  currency: string
  customerEmail: string
  tenantId: string
  successUrl: string
  cancelUrl: string
}) {
  const stripe = getStripe()
  if (!stripe) return { demo: true, url: `/app?billing=demo-success&tenant=${opts.tenantId}` }
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer_email: opts.customerEmail,
    line_items: opts.priceId
      ? [{ price: opts.priceId, quantity: 1 }]
      : [
          {
            price_data: {
              currency: opts.currency.toLowerCase(),
              product_data: { name: 'Northstar plan' },
              unit_amount: opts.amountCents,
              recurring: { interval: 'month' },
            },
            quantity: 1,
          },
        ],
    success_url: opts.successUrl,
    cancel_url: opts.cancelUrl,
    metadata: { tenantId: opts.tenantId },
  })
  return { demo: false, url: session.url }
}

export async function createRazorpayOrder(opts: {
  amountCents: number
  currency: string
  tenantId: string
  receipt: string
}) {
  const id = process.env.RAZORPAY_KEY_ID
  const secret = process.env.RAZORPAY_KEY_SECRET
  if (!id || !secret) {
    return { demo: true, orderId: `order_demo_${opts.tenantId}` }
  }
  const Razorpay = (await import('razorpay')).default
  const rz = new Razorpay({ key_id: id, key_secret: secret })
  const order = await rz.orders.create({
    amount: opts.amountCents, // INR paise if currency INR
    currency: opts.currency,
    receipt: opts.receipt,
    notes: { tenantId: opts.tenantId },
  })
  return { demo: false, orderId: order.id, amount: order.amount, currency: order.currency }
}
