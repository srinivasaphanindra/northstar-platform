# Northstar Platform — Agents as a Service

Real multi-tenant SaaS control plane for **Northstar Agents**.

- **Marketing site** (mobile-first, Claude×Linear language)
- **App** (platform / reseller / business dashboards)
- **Backend**: Clerk auth · Postgres (Prisma) · Stripe + Razorpay · admin-comp approvals · white-label domain fields · WireTenant pod bridge hooks

## Product name
**Northstar** — Agents as a Service (AaaS)

## Plans
| Plan | Who | Price |
|------|-----|------|
| Presence | Individual social | $99/mo |
| Pipeline | Individual + lead gen | $249/mo |
| Agency | Reseller multi-client | $499/mo |
| Pilot / Launch | Trial / setup | $99 / $249 |

## Quick start
```bash
cp .env.example .env.local
# fill Clerk + DATABASE_URL (optional for UI demo mode)
npm install
npx prisma generate
# npx prisma db push   # when Postgres is up
npm run dev
```

Open http://localhost:3000

Without Clerk keys the UI runs in **demo mode** (local mock session).

## Architecture
See `docs/ARCHITECTURE.md`.

## Archive
Previous localStorage shell: https://github.com/srinivasaphanindra/northstar-app-v0
