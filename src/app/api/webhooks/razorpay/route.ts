import { NextRequest, NextResponse } from 'next/server'
import { dbEnabled, prisma } from '@/lib/db'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET
  if (secret) {
    const sig = req.headers.get('x-razorpay-signature') || ''
    const expected = crypto.createHmac('sha256', secret).update(body).digest('hex')
    if (sig !== expected) return NextResponse.json({ error: 'bad sig' }, { status: 400 })
  }
  let event: any = {}
  try {
    event = JSON.parse(body || '{}')
  } catch {}
  const tenantId = event?.payload?.payment?.entity?.notes?.tenantId
  if (tenantId && dbEnabled() && event.event === 'payment.captured') {
    await prisma.tenant.update({
      where: { id: tenantId },
      data: { status: 'ACTIVE', billingProvider: 'RAZORPAY' },
    })
  }
  return NextResponse.json({ received: true })
}
