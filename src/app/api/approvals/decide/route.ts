import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { ensureSeed, readSession } from '@/lib/session'
import { wireTenantToPod } from '@/lib/tenant'

export async function POST(req: NextRequest) {
  await ensureSeed()
  const session = await readSession()
  if (!session) return NextResponse.redirect(new URL('/login', req.url), 303)
  const form = await req.formData()
  const id = String(form.get('id'))
  const decision = String(form.get('decision'))
  const approval = await prisma.adminApproval.findUnique({ where: { id } })
  if (!approval) return NextResponse.redirect(new URL('/app/platform/approvals', req.url), 303)
  await prisma.adminApproval.update({
    where: { id },
    data: { status: decision, approverId: session.userId, decidedAt: new Date() },
  })
  if (decision === 'APPROVED' && approval.tenantId) {
    await prisma.tenant.update({
      where: { id: approval.tenantId },
      data: { status: 'ACTIVE', billingProvider: 'ADMIN_COMP' },
    })
    const t = await prisma.tenant.findUnique({ where: { id: approval.tenantId } })
    if (t) await wireTenantToPod(t.id, t.slug)
  }
  return NextResponse.redirect(new URL(`/app/platform/approvals?decided=${decision}`, req.url), 303)
}
