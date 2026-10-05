import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const form = await req.formData()
  const provider = String(form.get('provider') || '')
  // Production: start OAuth — for now bounce back with intent
  return NextResponse.redirect(new URL(`/app/connect?start=${provider}`, req.url), 303)
}
