/**
 * Local session + workspace service (no Clerk keys required).
 * When CLERK_* env is set later, swap getSessionUser to Clerk.
 */
import { cookies } from 'next/headers'
import { prisma } from './db'
import { createHash, randomBytes } from 'crypto'

export type SessionPayload = {
  userId: string
  email: string
  name: string
  activeTenantId: string
  role: string
}

const COOKIE = 'ns_forge_session'

export function sessionCookieName() {
  return COOKIE
}

export async function readSession(): Promise<SessionPayload | null> {
  const jar = await cookies()
  const raw = jar.get(COOKIE)?.value
  if (!raw) return null
  try {
    return JSON.parse(decodeURIComponent(raw)) as SessionPayload
  } catch {
    return null
  }
}

export async function ensureSeed() {
  const existing = await prisma.tenant.findFirst({ where: { kind: 'PLATFORM' } })
  if (existing) return existing

  try {
    const platform = await prisma.tenant.create({
      data: {
        kind: 'PLATFORM',
        name: 'Northstar Forge',
        slug: 'northstar-forge',
        status: 'ACTIVE',
        planId: 'AGENCY',
        superGrokOk: true,
        mrrCents: 0,
      },
    })

  const admin = await prisma.user.create({
    data: {
      clerkId: 'local-phanindra',
      email: 'phanindra@northstar.agents',
      name: 'Phanindra Malladi',
      isPlatformAdmin: true,
    },
  })
  await prisma.membership.create({
    data: { userId: admin.id, tenantId: platform.id, role: 'PLATFORM_OWNER' },
  })

  const resellerUser = await prisma.user.create({
    data: {
      clerkId: 'local-riya',
      email: 'riya@bright.agency',
      name: 'Riya Shah',
    },
  })
  const reseller = await prisma.tenant.create({
    data: {
      kind: 'RESELLER',
      name: 'Bright Agency',
      slug: 'bright',
      status: 'ACTIVE',
      planId: 'AGENCY',
      parentId: platform.id,
      superGrokOk: true,
      mrrCents: 49900,
      brandColor: '#3b82f6',
    },
  })
  await prisma.membership.create({
    data: { userId: resellerUser.id, tenantId: reseller.id, role: 'RESELLER_OWNER' },
  })

  const bizUser = await prisma.user.create({
    data: {
      clerkId: 'local-alex',
      email: 'alex@acme.studio',
      name: 'Alex Chen',
    },
  })
  const biz = await prisma.tenant.create({
    data: {
      kind: 'BUSINESS',
      name: 'Acme Studio',
      slug: 'acme',
      status: 'ACTIVE',
      planId: 'PIPELINE',
      parentId: reseller.id,
      superGrokOk: true,
      mrrCents: 24900,
      podSlug: 'acme',
    },
  })
  await prisma.membership.create({
    data: { userId: bizUser.id, tenantId: biz.id, role: 'BUSINESS_OWNER' },
  })
  await prisma.tenantSettings.create({
    data: { tenantId: biz.id, timezone: 'Asia/Kolkata' },
  })

  for (const [name, kind, status] of [
    ['Writer', 'writer', 'LIVE'],
    ['Social', 'social', 'LIVE'],
    ['Outreach', 'outreach', 'DRAFT'],
  ] as const) {
    await prisma.agent.create({
      data: { tenantId: biz.id, name, kind, status: status as any },
    })
  }
  await prisma.connection.createMany({
    data: [
      { tenantId: biz.id, provider: 'X', handle: '@acmestudio', status: 'CONNECTED' },
      { tenantId: biz.id, provider: 'LINKEDIN', handle: 'Acme Studio', status: 'CONNECTED' },
      { tenantId: biz.id, provider: 'FACEBOOK', status: 'DISCONNECTED' },
      { tenantId: biz.id, provider: 'YOUTUBE', status: 'PENDING' },
    ],
  })
  await prisma.draft.createMany({
    data: [
      {
        tenantId: biz.id,
        platform: 'X',
        title: 'Calm beats loud',
        body: 'Most founders over-post. We ship three sharp posts and talk to humans in between.',
        status: 'PENDING',
      },
      {
        tenantId: biz.id,
        platform: 'LinkedIn',
        title: 'Ship the system',
        body: 'Design systems that ship — not slide decks that stall.',
        status: 'PENDING',
      },
    ],
  })
  await prisma.lead.createMany({
    data: [
      {
        tenantId: biz.id,
        name: 'Dana Park',
        source: 'LinkedIn comment',
        status: 'QUALIFIED',
        note: 'Asked about pricing',
      },
      {
        tenantId: biz.id,
        name: 'Chris O.',
        source: 'X reply',
        status: 'NEW',
        note: 'Weekly content only',
      },
    ],
  })
  await prisma.activityEvent.create({
    data: {
      tenantId: biz.id,
      kind: 'system',
      message: 'Workspace seeded on Northstar Forge local DB',
    },
  })

  // pending admin approval sample
  const leafUser = await prisma.user.create({
    data: {
      clerkId: 'local-priya',
      email: 'priya@leaf.studio',
      name: 'Priya Nair',
    },
  })
  const leaf = await prisma.tenant.create({
    data: {
      kind: 'BUSINESS',
      name: 'Leaf Studio',
      slug: 'leaf',
      status: 'PENDING_APPROVAL',
      planId: 'PRESENCE',
      parentId: platform.id,
      mrrCents: 9900,
      billingProvider: 'ADMIN_COMP',
    },
  })
  await prisma.membership.create({
    data: { userId: leafUser.id, tenantId: leaf.id, role: 'BUSINESS_OWNER' },
  })
  await prisma.adminApproval.create({
    data: {
      tenantId: leaf.id,
      requesterId: leafUser.id,
      kind: 'COMP_ACCESS',
      status: 'PENDING',
      note: 'Wants Presence without payment yet',
    },
  })

  await prisma.planCatalog.createMany({
    data: [
      {
        id: 'PRESENCE',
        name: 'Presence',
        tagline: 'Individual social',
        priceMonthly: 99,
        audience: 'individual',
        featuresJson: JSON.stringify(['1–2 networks', 'Draft approvals', 'Weekly pulse']),
        maxClientSeats: 1,
      },
      {
        id: 'PIPELINE',
        name: 'Pipeline',
        tagline: 'Social + lead gen',
        priceMonthly: 249,
        audience: 'individual_leads',
        featuresJson: JSON.stringify(['Presence+', 'Outreach drafts', 'Lead inbox']),
        maxClientSeats: 1,
        leadGen: true,
      },
      {
        id: 'AGENCY',
        name: 'Agency',
        tagline: 'Reseller multi-client',
        priceMonthly: 499,
        audience: 'reseller',
        featuresJson: JSON.stringify(['Sub-accounts', 'Team', 'White-label']),
        maxClientSeats: 25,
        leadGen: true,
        multiClient: true,
      },
    ],
  })

  return platform
  } catch (err: any) {
    // Parallel Next prerender can race seed creates on unique slug — return winner.
    if (err?.code === 'P2002') {
      const again = await prisma.tenant.findFirst({ where: { kind: 'PLATFORM' } })
      if (again) return again
    }
    throw err
  }
}

export async function loginAsEmail(email: string) {
  await ensureSeed()
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) throw new Error('Unknown user')
  const membership = await prisma.membership.findFirst({
    where: { userId: user.id },
    include: { tenant: true },
    orderBy: { createdAt: 'asc' },
  })
  if (!membership) throw new Error('No membership')
  const payload: SessionPayload = {
    userId: user.id,
    email: user.email,
    name: user.name || user.email,
    activeTenantId: membership.tenantId,
    role: membership.role,
  }
  return payload
}

export async function getWorkspaceContext() {
  const session = await readSession()
  if (!session) return null
  await ensureSeed()
  const tenant = await prisma.tenant.findUnique({ where: { id: session.activeTenantId } })
  if (!tenant) return null
  return { session, tenant }
}
