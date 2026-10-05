import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { ensureSeed, readSession } from '@/lib/session'
import { createWorkspace } from '@/lib/tenant'

export async function POST(req: NextRequest) {
  await ensureSeed()
  const session = await readSession()
  if (!session) return NextResponse.redirect(new URL('/login', req.url), 303)
  const form = await req.formData()
  const name = String(form.get('name') || '')
  const slug = String(form.get('slug') || '')
  const planId = String(form.get('planId') || 'PRESENCE') as any
  if (!name || !slug) return NextResponse.json({ error: 'missing' }, { status: 400 })
  await createWorkspace({
    kind: 'BUSINESS',
    name,
    slug,
    planId,
    parentId: session.activeTenantId,
    status: 'ONBOARDING',
    billingProvider: 'MANUAL',
  })
  return NextResponse.redirect(new URL('/app/reseller/clients?created=1', req.url), 303)
}
