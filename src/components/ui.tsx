import { cn } from '@/lib/cn'
import Link from 'next/link'

export function Button({
  className,
  variant = 'primary',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' | 'white' }) {
  return (
    <button
      className={cn('btn', variant === 'primary' && 'btn-primary', variant === 'ghost' && 'btn-ghost', variant === 'white' && 'btn-white', className)}
      {...props}
    />
  )
}

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('card p-4', className)}>{children}</div>
}

export function Badge({ children, tone }: { children: React.ReactNode; tone?: 'accent' | 'ok' | 'warn' }) {
  return (
    <span className={cn('badge', tone === 'accent' && 'badge-accent', tone === 'ok' && 'badge-ok', tone === 'warn' && 'badge-warn')}>
      {children}
    </span>
  )
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-semibold text-[var(--muted)]">{label}</span>
      {children}
    </label>
  )
}

export function PageHeader({ title, sub, action }: { title: string; sub?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h1>
        {sub ? <p className="mt-1 text-sm text-[var(--muted)]">{sub}</p> : null}
      </div>
      {action}
    </div>
  )
}

export function Stat({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <Card>
      <div className="text-xs font-semibold text-[var(--muted)]">{label}</div>
      <div className="mt-2 text-2xl font-semibold tracking-tight text-white">{value}</div>
      {hint ? <div className="mt-1 text-xs text-[var(--muted)]">{hint}</div> : null}
    </Card>
  )
}

export function ListRow({ title, meta, right }: { title: string; meta?: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] py-3 last:border-0">
      <div className="min-w-0">
        <div className="truncate font-medium text-white">{title}</div>
        {meta ? <div className="truncate text-xs text-[var(--muted)]">{meta}</div> : null}
      </div>
      {right}
    </div>
  )
}

export function TextLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn('text-[var(--accent)] underline-offset-2 hover:underline', className)}>
      {children}
    </Link>
  )
}
