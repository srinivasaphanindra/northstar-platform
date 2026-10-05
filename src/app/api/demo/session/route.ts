import { NextRequest, NextResponse } from 'next/server'
import { ensureSeed, loginAsEmail, sessionCookieName } from '@/lib/session'

export async function POST(req: NextRequest) {
  await ensureSeed()
  const body = await req.json().catch(() => ({}))
  const email =
    body.email ||
    (body.role === 'platform'
      ? 'phanindra@northstar.agents'
      : body.role === 'reseller'
        ? 'riya@bright.agency'
        : 'alex@acme.studio')

  try {
    const payload = await loginAsEmail(email)
    const res = NextResponse.json({ ok: true, session: payload })
    res.cookies.set(sessionCookieName(), encodeURIComponent(JSON.stringify(payload)), {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
    })
    res.cookies.set('ns_demo_session', '', { path: '/', maxAge: 0 })
    return res
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'login failed' }, { status: 400 })
  }
}

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get('logout')) {
    const res = NextResponse.redirect(new URL('/login', req.url))
    res.cookies.set(sessionCookieName(), '', { path: '/', maxAge: 0 })
    res.cookies.set('ns_demo_session', '', { path: '/', maxAge: 0 })
    return res
  }
  await ensureSeed()
  return NextResponse.json({ ok: true, product: process.env.NEXT_PUBLIC_PRODUCT_NAME || 'Northstar Forge' })
}
