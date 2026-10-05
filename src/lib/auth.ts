import { getDemoSession } from './demo-store'

export function clerkConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY)
}

/** Server helper — demo session cookie fallback */
export async function getAppUser() {
  if (clerkConfigured()) {
    try {
      const { auth, currentUser } = await import('@clerk/nextjs/server')
      const a = await auth()
      if (!a.userId) return null
      const u = await currentUser()
      return {
        id: a.userId,
        email: u?.primaryEmailAddress?.emailAddress || '',
        name: u?.fullName || u?.firstName || 'User',
        demo: false as const,
      }
    } catch {
      return null
    }
  }
  const d = getDemoSession()
  if (!d) return null
  return { id: 'demo', email: d.email, name: d.name, demo: true as const, role: d.role, workspace: d.workspace }
}
