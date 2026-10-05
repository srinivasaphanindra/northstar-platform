import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { ensureSeed, readSession } from '@/lib/session'

export async function POST(req: NextRequest) {
  await ensureSeed()
  const session = await readSession()
  if (!session) return NextResponse.redirect(new URL('/login', req.url), 303)
  const form = await req.formData()
  const id = String(form.get('id') || '')
  const row = await prisma.connection.findFirst({ where: { id, tenantId: session.activeTenantId } })
  if (row) {
    const next = row.status === 'CONNECTED' ? 'DISCONNECTED' : 'CONNECTED'
    await prisma.connection.update({
      where: { id: row.id },
      data: { status: next as any, handle: row.handle || `@${row.provider.toLowerCase()}` },
    })
  }
  return NextResponse.redirect(new URL('/app/connect', req.url), 303)
}
