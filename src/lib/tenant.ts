import { dbEnabled, prisma } from './db'
import type { PlanId, TenantKind, TenantStatus } from '@prisma/client'

export async function createWorkspace(opts: {
  kind: TenantKind
  name: string
  slug: string
  planId: PlanId
  ownerUserId?: string
  parentId?: string
  status?: TenantStatus
  billingProvider?: 'STRIPE' | 'RAZORPAY' | 'MANUAL' | 'ADMIN_COMP'
}) {
  if (!dbEnabled()) {
    return { id: `demo-${opts.slug}`, ...opts, demo: true }
  }
  const tenant = await prisma.tenant.create({
    data: {
      kind: opts.kind,
      name: opts.name,
      slug: opts.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-').slice(0, 48),
      planId: opts.planId,
      parentId: opts.parentId,
      status: opts.status || 'PENDING_APPROVAL',
      billingProvider: opts.billingProvider,
      mrrCents: opts.planId === 'PRESENCE' ? 9900 : opts.planId === 'PIPELINE' ? 24900 : opts.planId === 'AGENCY' ? 49900 : 0,
    },
  })
  if (opts.ownerUserId) {
    const role =
      opts.kind === 'PLATFORM'
        ? 'PLATFORM_OWNER'
        : opts.kind === 'RESELLER'
          ? 'RESELLER_OWNER'
          : 'BUSINESS_OWNER'
    await prisma.membership.create({
      data: { userId: opts.ownerUserId, tenantId: tenant.id, role: role as any },
    })
  }
  await prisma.activityEvent.create({
    data: {
      tenantId: tenant.id,
      kind: 'workspace',
      message: `Workspace created · ${opts.planId}`,
    },
  })
  return tenant
}

/** Bridge hook: call agency box to stand up pod when approved/paid */
export async function wireTenantToPod(tenantId: string, slug: string) {
  const url = process.env.AGENCY_BRIDGE_URL
  const token = process.env.AGENCY_BRIDGE_TOKEN
  if (!url) {
    return { ok: false, reason: 'AGENCY_BRIDGE_URL not set — queue for later' }
  }
  const res = await fetch(`${url}/onboard`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token || ''}`,
    },
    body: JSON.stringify({ tenantId, slug }),
  })
  if (dbEnabled()) {
    await prisma.tenant.update({
      where: { id: tenantId },
      data: { podSlug: slug, status: 'ONBOARDING' },
    })
  }
  return { ok: res.ok, status: res.status }
}
