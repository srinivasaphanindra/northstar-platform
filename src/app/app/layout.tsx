import { cookies } from 'next/headers'
import { AppShell } from '@/components/app-shell'
import { redirect } from 'next/navigation'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const jar = await cookies()
  const raw = jar.get('ns_demo_session')?.value
  if (!raw && !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    redirect('/login')
  }
  let role = 'business'
  let workspace = 'Workspace'
  if (raw) {
    try {
      const s = JSON.parse(decodeURIComponent(raw))
      role = s.role || role
      workspace = s.workspace || workspace
    } catch {}
  }
  return (
    <AppShell role={role} workspace={workspace}>
      {children}
    </AppShell>
  )
}
