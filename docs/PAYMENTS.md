# Payments setup (Stripe + India)

You do **not** need this for the app to run locally. Local Forge already creates workspaces end-to-end on SQLite.

When bank verification is done, add keys to `.env.local` and restart.

## Stripe (global cards)

1. Create account: https://dashboard.stripe.com/register  
2. Activate account (business + bank — takes days).  
3. Developers → API keys:
   - `STRIPE_SECRET_KEY` = `sk_test_...` (test) then `sk_live_...`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = `pk_test_...` / `pk_live_...`
4. Developers → Webhooks → Add endpoint:
   - URL: `https://YOUR_DOMAIN/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `invoice.paid`
   - Secret → `STRIPE_WEBHOOK_SECRET` = `whsec_...`
5. (Optional) Products → create prices for Presence $99 / Pipeline $249 / Agency $499 → put price ids on `PlanCatalog.stripePriceId`

**What Stripe gives us:** paid checkout → webhook → tenant `ACTIVE` automatically.

## Razorpay (India UPI / cards / netbanking)

(You wrote “Payly” — we use **Razorpay**, the standard India SaaS gateway. PayU is an alternative later.)

1. https://dashboard.razorpay.com/  
2. Settings → API Keys:
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
3. Webhooks:
   - URL: `https://YOUR_DOMAIN/api/webhooks/razorpay`
   - Secret → `RAZORPAY_WEBHOOK_SECRET`
   - Event: `payment.captured`

Amounts for INR: store paise (e.g. ₹4999 → 499900) when you lock India prices.

## Without payment (already built)

Platform admin can **Approve** a `COMP_ACCESS` request → workspace activates with `billingProvider=ADMIN_COMP`. No Stripe needed.

## Local status

| Piece | Now |
|-------|-----|
| Database | SQLite file `prisma/dev.db` (zero cloud keys) |
| Auth | Local session cookie (swap to Clerk when you have keys) |
| Checkout buttons | Work in demo mode; real charge when Stripe keys present |
| Webhooks | Implemented; need public HTTPS URL later (or Stripe CLI) |

## Clerk (optional later)

Clerk = hosted login (Google/email). Not required today.

1. https://dashboard.clerk.com → create app  
2. `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` + `CLERK_SECRET_KEY`  
3. Webhook user.created → `/api/webhooks/clerk`

## Neon Postgres (optional later)

Neon = hosted Postgres. Local SQLite is enough until multi-server deploy.

1. https://neon.tech → create project  
2. Copy connection string → `DATABASE_URL`  
3. Change `prisma/schema.prisma` provider back to `postgresql`  
4. `npx prisma db push`

## What Phanindra must do (only bank stuff)

1. Finish Stripe identity/bank verification  
2. Finish Razorpay KYC if using India checkout  
3. Paste keys into `.env.local` (or send to Chief privately — never in Slack public)  
4. Tell Chief the public domain when ready for webhooks  

Everything else runs on this computer already.
