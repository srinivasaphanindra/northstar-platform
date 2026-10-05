import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const form = await req.formData()
  const id = String(form.get('id'))
  const status = String(form.get('status'))
  // Production: update Draft + notify bots
  return NextResponse.redirect(new URL(`/app/inbox?draft=${id}&status=${status}`, req.url), 303)
}
