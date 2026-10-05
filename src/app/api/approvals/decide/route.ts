import { NextRequest, NextResponse } from 'next/server'
import { wireTenantToPod } from '@/lib/tenant'

export async function POST(req: NextRequest) {
  const form = await req.formData()
  const id = String(form.get('id'))
  const decision = String(form.get('decision'))
  if (decision === 'APPROVED') {
    // When DB wired: set tenant ACTIVE + ADMIN_COMP + wireTenantToPod
    await wireTenantToPod(id, `comp-${id}`)
  }
  return NextResponse.redirect(new URL(`/app/platform/approvals?decided=${decision}`, req.url), 303)
}
