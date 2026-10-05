import Link from 'next/link'
import { PLANS } from '@/lib/plans'

export default function MarketingPage() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--canvas)]/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 font-semibold text-white">
            <span className="h-6 w-6 rounded-full bg-[var(--accent)]" />
            Northstar
          </div>
          <div className="flex items-center gap-2">
            <Link href="/pricing" className="hidden text-sm text-[var(--muted)] sm:inline">
              Pricing
            </Link>
            <Link href="/login" className="btn btn-ghost !min-h-10 !px-3 text-sm">
              Log in
            </Link>
            <Link href="/login" className="btn btn-primary !min-h-10 !px-3 text-sm">
              Start
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 pb-12 pt-10 sm:pt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">Agents as a Service · Northstar Forge</p>
        <h1 className="font-display mt-3 max-w-2xl text-4xl leading-[1.1] text-white sm:text-6xl">
          A digital workforce for social — built for your phone.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
          Create agent workspaces, connect X · Facebook · LinkedIn (and more networks over time), approve drafts, and run
          Presence, Pipeline, or Agency. One human voice across platforms. Founders and resellers. Mobile-first.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/login" className="btn btn-primary w-full sm:w-auto">
            Open Forge
          </Link>
          <Link href="/pricing" className="btn btn-ghost w-full sm:w-auto">
            See plans
          </Link>
        </div>
      </section>

      <section className="mkt-light px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl sm:text-4xl">Three doors in</h2>
          <p className="mt-2 max-w-2xl text-[var(--ink)]/70">Same platform. Different jobs.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {PLANS.map((p) => (
              <div key={p.id} className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-wide text-[#c96442]">{p.audience.replace('_', ' ')}</div>
                <h3 className="mt-1 text-xl font-semibold text-[var(--ink)]">{p.name}</h3>
                <p className="mt-1 text-sm text-[var(--ink)]/70">{p.tagline}</p>
                <div className="mt-4 text-2xl font-semibold text-[var(--ink)]">
                  ${p.priceMonthly}
                  <span className="text-sm font-normal text-[var(--ink)]/50">/mo</span>
                </div>
                <ul className="mt-3 space-y-1.5 text-sm text-[var(--ink)]/75">
                  {p.features.map((f) => (
                    <li key={f}>· {f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-semibold text-white">Built like modern AI products</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            ['Mobile command', 'Bottom tabs, thumb-reach CTAs, full settings on phone.'],
            ['Agents you own', 'Spin writer / social / outreach agents per workspace.'],
            ['Connect tools', 'Social networks you run — no passwords in the app; secure connect later.'],
            ['Reseller ready', 'Sub-accounts, team seats, white-label domain hooks.'],
            ['Pay your way', 'Stripe worldwide · Razorpay India · admin approve without payment.'],
            ['Wire to pods', 'Approved tenants can bridge to Northstar automation runtime.'],
          ].map(([t, d]) => (
            <div key={t} className="card p-4">
              <div className="font-semibold text-white">{t}</div>
              <p className="mt-1 text-sm text-[var(--muted)]">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-[var(--border)] px-4 py-8 text-center text-xs text-[var(--muted)]">
        Northstar Agents · Agents as a Service · Northstar Forge ·{' '}
        <Link href="/login" className="text-white">
          Log in
        </Link>
      </footer>
    </div>
  )
}
