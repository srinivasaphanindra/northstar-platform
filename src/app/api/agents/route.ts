import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { ensureSeed, readSession } from '@/lib/session'

export async function POST(req: NextRequest) {
  await ensureSeed()
  const session = await readSession()
  if (!session) return NextResponse.redirect(new URL('/login', req.url), 303)
  const form = await req.formData()
  const name = String(form.get('name') || 'Custom agent')
  const kind = String(form.get('kind') || 'custom')
  await prisma.agent.create({
    data: { tenantId: session.activeTenantId, name, kind, status: 'DRAFT' },
  })
  await prisma.activityEvent.create({
    data: { tenantId: session.activeTenantId, kind: 'agent', message: `Created agent ${name}` },
  })
  return NextResponse.redirect(new URL('/app/agents?created=1', req.url), 303)
}
