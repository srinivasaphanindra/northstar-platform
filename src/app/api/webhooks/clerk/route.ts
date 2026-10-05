import { NextRequest, NextResponse } from 'next/server'
import { dbEnabled, prisma } from '@/lib/db'

/** Clerk user.created → upsert User row */
export async function POST(req: NextRequest) {
  const payload = await req.json().catch(() => ({}))
  const type = payload.type
  const data = payload.data
  if (type === 'user.created' && dbEnabled() && data?.id) {
    const email = data.email_addresses?.[0]?.email_address || `${data.id}@users.clerk`
    await prisma.user.upsert({
      where: { clerkId: data.id },
      create: {
        clerkId: data.id,
        email,
        name: [data.first_name, data.last_name].filter(Boolean).join(' ') || null,
        imageUrl: data.image_url,
      },
      update: {
        email,
        name: [data.first_name, data.last_name].filter(Boolean).join(' ') || null,
      },
    })
  }
  return NextResponse.json({ ok: true })
}
