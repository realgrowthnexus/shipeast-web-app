import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * One home-page block on the store's grid: a 24px title with an optional "See all" link on the
 * same line, then the content. Every block uses the same width, title size and spacing, so the
 * page reads as one organized store.
 */
export function HomeSection({
  id,
  title,
  note,
  link,
  className,
  children,
}: {
  id: string
  title: ReactNode
  /** One quiet line under the title. Hidden on phones. */
  note?: ReactNode
  link?: { href: string; label: string; short?: string }
  className?: string
  children: ReactNode
}) {
  return (
    <section aria-labelledby={id} className={cn('py-8 sm:py-10', className)}>
      <div className="mx-auto w-full max-w-wide gutter">
        <div className="mb-5 flex items-end justify-between gap-4 sm:mb-6">
          <div className="min-w-0">
            <h2 id={id} className="text-title text-balance text-ink">
              {title}
            </h2>
            {note && <p className="mt-1 hidden text-small text-ink-muted sm:block">{note}</p>}
          </div>
          {link && <SeeAll {...link} />}
        </div>
        {children}
      </div>
    </section>
  )
}

export function SeeAll({ href, label, short }: { href: string; label: string; short?: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex min-h-11 shrink-0 items-center gap-1.5 text-small font-semibold text-ink-body hover:text-crimson"
    >
      {short ? (
        <>
          <span className="sm:hidden">{short}</span>
          <span className="hidden sm:inline">{label}</span>
        </>
      ) : (
        label
      )}
      <ArrowRight
        className="size-4 transition-transform duration-250 ease-out-soft group-hover:translate-x-0.5 motion-reduce:transition-none"
        aria-hidden
      />
    </Link>
  )
}
