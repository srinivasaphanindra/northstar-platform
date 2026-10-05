import Link from 'next/link'
import { PLANS } from '@/lib/plans'

export default function PricingPage() {
  return (
    <div className="mx-auto min-h-screen max-w-3xl px-4 py-10">
      <Link href="/" className="text-sm text-[var(--muted)]">
        ← Northstar
      </Link>
      <h1 className="font-display mt-4 text-4xl text-white">Pricing</h1>
      <p className="mt-2 text-[var(--muted)]">AI agents run your social and lead gen — one human voice across every platform you use.</p>
      <div className="mt-8 space-y-4">
        {PLANS.map((p) => (
          <div key={p.id} className="card p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-white">{p.name}</h2>
                <p className="text-sm text-[var(--muted)]">{p.tagline}</p>
              </div>
              <div className="text-right text-xl font-semibold">${p.priceMonthly}/mo</div>
            </div>
            <Link href={`/login?plan=${p.id}`} className="btn btn-primary mt-4 w-full">
              Continue with {p.name}
            </Link>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-[var(--muted)]">
        Need access without paying first? Request admin approval after login — Phanindra can comp a workspace.
      </p>
    </div>
  )
}
