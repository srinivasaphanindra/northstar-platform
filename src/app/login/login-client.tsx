'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

const personas = [
  { role: 'platform', name: 'Phanindra', email: 'phanindra@northstar.agents', workspace: 'Northstar Platform' },
  { role: 'reseller', name: 'Riya Shah', email: 'riya@bright.agency', workspace: 'Bright Agency' },
  { role: 'business', name: 'Alex Chen', email: 'alex@acme.studio', workspace: 'Acme Studio' },
] as const

export default function LoginClient() {
  const router = useRouter()
  const params = useSearchParams()
  const plan = params.get('plan') || 'PRESENCE'
  const [loading, setLoading] = useState<string | null>(null)

  async function enter(p: (typeof personas)[number]) {
    setLoading(p.role)
    await fetch('/api/demo/session', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...p, plan }),
    })
    router.push('/app')
    router.refresh()
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-4 py-10">
      <Link href="/" className="text-sm text-[var(--muted)]">
        ← Back
      </Link>
      <h1 className="mt-4 text-3xl font-semibold text-white">Enter Northstar</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Demo mode (no Clerk keys). Pick a persona. Production uses Clerk email / Google / SSO.
      </p>
      <p className="mt-2 text-xs text-[var(--muted)]">
        Plan intent: <span className="text-white">{plan}</span>
      </p>
      <div className="mt-6 space-y-3">
        {personas.map((p) => (
          <button
            key={p.role}
            type="button"
            disabled={!!loading}
            onClick={() => enter(p)}
            className="card flex w-full items-center justify-between p-4 text-left active:scale-[0.99]"
          >
            <div>
              <div className="font-semibold text-white">{p.name}</div>
              <div className="text-xs text-[var(--muted)]">
                {p.workspace} · {p.role}
              </div>
            </div>
            <span className="text-sm text-[var(--accent)]">{loading === p.role ? '…' : 'Enter'}</span>
          </button>
        ))}
      </div>
      <p className="mt-6 text-xs text-[var(--muted)]">
        Wire Clerk by setting <code className="text-white">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code> and{' '}
        <code className="text-white">CLERK_SECRET_KEY</code>.
      </p>
    </div>
  )
}
