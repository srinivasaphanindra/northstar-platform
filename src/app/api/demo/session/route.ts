import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const res = NextResponse.json({ ok: true })
  res.cookies.set('ns_demo_session', encodeURIComponent(JSON.stringify(body)), {
    httpOnly: false,
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
  })
  return res
}

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get('logout')) {
    const res = NextResponse.redirect(new URL('/login', req.url))
    res.cookies.set('ns_demo_session', '', { path: '/', maxAge: 0 })
    return res
  }
  return NextResponse.json({ ok: true })
}
