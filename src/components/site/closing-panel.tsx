import Link from 'next/link'
import type { ReactNode } from 'react'
import { ButtonLink } from '@/components/ui/button'
import { onDarkLink } from './links'

/**
 * One calm last ask at the foot of a page: a contained crimson panel on the page band, so it
 * never touches the oxblood footer. Text on the left, one button and one text link on the right.
 */
export function ClosingPanel({
  id,
  title,
  children,
  primary,
  secondary,
}: {
  id: string
  title: ReactNode
  /** The one line under the title. */
  children: ReactNode
  primary: { href: string; label: string }
  secondary?: { href: string; label: string }
}) {
  return (
    <section aria-labelledby={id} className="section">
      <div className="mx-auto max-w-page gutter">
        <div className="flex flex-col gap-6 rounded-2xl bg-crimson p-card-lg text-on-dark on-dark-focus md:p-12 lg:flex-row lg:items-center lg:justify-between lg:px-16 lg:py-14">
          <div className="max-w-2xl">
            <h2 id={id} className="text-h2 text-balance">
              {title}
            </h2>
            <p className="mt-3 text-lead text-on-crimson-muted">{children}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            <ButtonLink href={primary.href} variant="onDark" size="lg" className="w-full sm:w-auto">
              {primary.label}
            </ButtonLink>
            {secondary && (
              <Link href={secondary.href} className={`${onDarkLink} self-start sm:self-auto`}>
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
