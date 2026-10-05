import { NextRequest, NextResponse } from 'next/server'
import { dbEnabled, prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  const form = await req.formData()
  const name = String(form.get('name') || 'Agent')
  const kind = String(form.get('kind') || 'custom')
  if (dbEnabled()) {
    // demo: needs real tenant id from session — skip create if none
    try {
      await prisma.activityEvent.create({
        data: {
          tenantId: 'missing',
          kind: 'agent',
          message: `Would create agent ${name}/${kind}`,
        },
      })
    } catch {
      /* no tenant yet */
    }
  }
  return NextResponse.redirect(new URL('/app/agents?created=1', req.url), 303)
}
