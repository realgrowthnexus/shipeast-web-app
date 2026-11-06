import Link from 'next/link'
import { ButtonLink } from '@/components/ui/button'
import { formatClockTime } from '@/lib/format'
import { onCrimsonLink } from './hero'

/**
 * S9: one calm last ask. A contained crimson panel on the page band, so it never touches the
 * oxblood footer. (CtaBand is a wider panel with a photo, so it is not reused here.)
 */
export function HomeClosing({
  parishList,
  earliestCutoff,
}: {
  parishList: string
  earliestCutoff: string | null
}) {
  return (
    <section aria-labelledby="closing-title" className="section">
      <div className="mx-auto max-w-page gutter">
        <div className="flex flex-col gap-6 rounded-2xl bg-crimson p-card-lg text-on-dark on-dark-focus md:p-12 lg:flex-row lg:items-center lg:justify-between lg:px-16 lg:py-14">
          <div className="max-w-2xl">
            <h2 id="closing-title" className="text-h2 text-balance">
              Start a basket for home
            </h2>
            <p className="mt-3 text-lead text-on-crimson-muted">
              {parishList && earliestCutoff ? (
                <>
                  Same-day delivery in {parishList} when you order by{' '}
                  <span className="tabular-nums">{formatClockTime(earliestCutoff)}</span> Jamaica
                  time.
                </>
              ) : (
                'Delivery in Jamaica, with a photo of the receipt and a photo at the door.'
              )}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            <ButtonLink href="/shop" variant="onDark" size="lg" className="w-full sm:w-auto">
              Start shopping
            </ButtonLink>
            <Link href="/track" className={`${onCrimsonLink} self-start sm:self-auto`}>
              Track an order
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
