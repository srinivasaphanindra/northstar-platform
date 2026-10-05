import { NextRequest, NextResponse } from 'next/server'
import { createWorkspace } from '@/lib/tenant'

export async function POST(req: NextRequest) {
  const form = await req.formData()
  const name = String(form.get('name') || '')
  const slug = String(form.get('slug') || '')
  const planId = String(form.get('planId') || 'PRESENCE') as any
  const kind = String(form.get('kind') || 'BUSINESS') as any
  if (!name || !slug) return NextResponse.json({ error: 'missing' }, { status: 400 })
  const tenant = await createWorkspace({
    kind,
    name,
    slug,
    planId,
    status: 'ONBOARDING',
    billingProvider: 'MANUAL',
  })
  return NextResponse.redirect(new URL('/app/reseller/clients?created=1', req.url), 303)
}
