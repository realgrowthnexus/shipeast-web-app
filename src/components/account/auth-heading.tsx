import type { ReactNode } from 'react'

/** Title block for the sign-in pages. */
export function AuthHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children?: ReactNode
}) {
  return (
    <div className="mb-8">
      <p className="mb-3 eyebrow text-crimson">{eyebrow}</p>
      <h1 className="text-h1 text-balance text-ink">{title}</h1>
      {children && <div className="mt-3 text-lead text-ink-body">{children}</div>}
    </div>
  )
}
