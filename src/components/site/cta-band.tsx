import type { ReactNode } from 'react'
import { Reveal } from '@/components/motion/reveal'
import { ButtonLink } from '@/components/ui/button'
import type { StockPhotoKey } from '@/lib/stock-photos'
import { StockPhoto } from './stock-photo'

/**
 * The closing call to action on a marketing page: a crimson panel with one main action, and a
 * photo beside it on wide screens.
 */
export function CtaBand({
  title,
  children,
  href = '/shop',
  label = 'Start shopping',
  secondary,
  photo,
}: {
  title: ReactNode
  children?: ReactNode
  href?: string
  label?: string
  /** A quieter second link, e.g. to WhatsApp or the FAQ. */
  secondary?: { href: string; label: string }
  photo?: StockPhotoKey
}) {
  return (
    <section className="section-sm">
      <div className="mx-auto w-full max-w-wide gutter">
        <Reveal className="grid overflow-hidden rounded-2xl bg-crimson text-white lg:grid-cols-12">
          <div className="flex flex-col items-start gap-6 p-card-lg sm:p-12 lg:col-span-7 lg:p-16">
            <h2 className="text-h1 text-balance">{title}</h2>
            {children && <div className="max-w-xl text-lead text-on-crimson-muted">{children}</div>}
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={href} variant="onDark" size="lg">
                {label}
              </ButtonLink>
              {secondary && (
                <ButtonLink
                  href={secondary.href}
                  size="lg"
                  variant="ghost"
                  className="text-white hover:bg-crimson-700"
                >
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
          </div>
          {photo && (
            <StockPhoto
              name={photo}
              sizes="(min-width: 1024px) 520px, 0px"
              className="hidden rounded-none lg:col-span-5 lg:block"
            />
          )}
        </Reveal>
      </div>
    </section>
  )
}
