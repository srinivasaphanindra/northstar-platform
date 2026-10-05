import { AppShell } from '@/components/app-shell'
import { redirect } from 'next/navigation'
import { ensureSeed, readSession } from '@/lib/session'
import { prisma } from '@/lib/db'

export default async function Layout({ children }: { children: React.ReactNode }) {
  await ensureSeed()
  const session = await readSession()
  if (!session) redirect('/login')

  const tenant = await prisma.tenant.findUnique({ where: { id: session.activeTenantId } })
  const role =
    session.role.includes('PLATFORM')
      ? 'platform'
      : session.role.includes('RESELLER')
        ? 'reseller'
        : 'business'

  return (
    <AppShell role={role} workspace={tenant?.name || 'Workspace'}>
      {children}
    </AppShell>
  )
}
