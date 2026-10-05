/** In-memory demo store when DATABASE_URL / Clerk missing */
export type DemoRole = 'platform' | 'reseller' | 'business'

export interface DemoSession {
  role: DemoRole
  name: string
  email: string
  workspace: string
}

const g = globalThis as unknown as { __nsDemo?: DemoSession | null }
if (!g.__nsDemo) g.__nsDemo = null

export function getDemoSession() {
  return g.__nsDemo
}
export function setDemoSession(s: DemoSession | null) {
  g.__nsDemo = s
}
