import { NextRequest, NextResponse } from 'next/server'
import { dbEnabled, prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  const form = await req.formData()
  const kind = String(form.get('kind') || 'COMP_ACCESS')
  if (dbEnabled()) {
    // requires real user ids — log only in demo
  }
  return NextResponse.redirect(new URL(`/app/settings/billing?requested=${kind}`, req.url), 303)
}
