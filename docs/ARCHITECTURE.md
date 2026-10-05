# Architecture

```
Browser (mobile-first Next.js)
  → Clerk session (or demo)
  → API routes /api/*
  → Prisma → Postgres
  → Stripe | Razorpay webhooks → tenant ACTIVE
  → AdminApproval → PLATFORM_OWNER approve without payment
  → WireTenant → agency box new-client.sh / pod slug
```

## Tenant tree
PLATFORM (Northstar) → RESELLER → BUSINESS
PLATFORM → BUSINESS (direct)

## Security
- Membership scoped server-side
- Never store social passwords; OAuth/session tokens in vault later
- White-label: customDomain + DNS verify

## Payments India
Razorpay orders + webhooks mirror Stripe checkout completed.
