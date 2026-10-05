import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { ensureSeed, readSession } from '@/lib/session'

export async function POST(req: NextRequest) {
  await ensureSeed()
  const session = await readSession()
  if (!session) return NextResponse.redirect(new URL('/login', req.url), 303)
  const form = await req.formData()
  const id = String(form.get('id'))
  const status = String(form.get('status') || 'APPROVED')
  await prisma.draft.updateMany({
    where: { id, tenantId: session.activeTenantId },
    data: { status: status as any },
  })
  await prisma.activityEvent.create({
    data: { tenantId: session.activeTenantId, kind: 'draft', message: `Draft ${status}` },
  })
  return NextResponse.redirect(new URL('/app/inbox', req.url), 303)
}
