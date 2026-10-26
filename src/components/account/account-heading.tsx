import type { ReactNode } from 'react'

/** Title row for each My account page, with room for a main action on the right. */
export function AccountHeading({
  title,
  children,
  action,
}: {
  title: string
  children?: ReactNode
  action?: ReactNode
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        <h1 className="text-h1 text-balance text-ink">{title}</h1>
        {children && <div className="mt-2 text-lead text-ink-body">{children}</div>}
      </div>
      {action}
    </div>
  )
}
