import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  // White-label host resolution placeholder
  const host = req.headers.get('host') || ''
  const res = NextResponse.next()
  if (host && !host.includes('localhost') && !host.includes('northstar')) {
    res.headers.set('x-ns-whitelabel-host', host)
  }
  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
