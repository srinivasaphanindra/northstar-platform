# Northstar Forge

**Agents as a Service** control plane for Northstar.

- Product name: **Northstar Forge** (agency brand remains Northstar Agents)
- Mobile-first app + marketing site
- **Local DB works with zero cloud keys** (SQLite file)
- Stripe + Razorpay ready when you add keys (see `docs/PAYMENTS.md`)
- Clerk optional later

## Run (this machine)

```bash
cd /home/box/agency/products/northstar-platform
npm run db:push
npm run dev -- -p 3020
```

Open http://127.0.0.1:3020/login

## GitHub

https://github.com/srinivasaphanindra/northstar-platform
