import { ArrowRight, Camera, Receipt } from 'lucide-react'
import Link from 'next/link'
import { StockPhoto } from '@/components/site/stock-photo'
import { ButtonLink } from '@/components/ui/button'
import { CutoffBadge } from './cutoff-badge'

/**
 * The home hero, kept short so the departments and the first shelf show on the first screen:
 * the live cut-off, the promise, one action and one line of proof. The photo runs to the right
 * edge on wide screens and is left out on phones.
 */
export function HomeHero({
  parishes,
  cutoff,
  feeFrom,
}: {
  parishes: string
  /** Same-day cut-off in Jamaica time, `13:00`. */
  cutoff: string
  /** The lowest delivery fee, already formatted (`USD$8`). */
  feeFrom?: string
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-surface">
      <div className="mx-auto grid w-full max-w-wide gutter lg:grid-cols-12">
        <div className="flex animate-rise flex-col items-start py-10 sm:py-14 lg:col-span-6 lg:py-16 lg:pr-10">
          <CutoffBadge cutoff={cutoff} parishes={parishes} />
          <h1 className="mt-6 text-display text-balance text-ink">
            Send groceries, <span className="text-crimson">not money</span>
          </h1>
          <p className="mt-5 max-w-lg text-lead text-ink-body">
            Pay in US dollars. We buy everything in Jamaica and deliver it to their door in{' '}
            {parishes} the same day.{feeFrom && <> Delivery from {feeFrom}.</>}
          </p>
          <div className="mt-8 flex w-full flex-wrap items-center gap-x-6 gap-y-3">
            <ButtonLink href="/shop" size="lg" className="w-full sm:w-auto">
              Start shopping
              <ArrowRight aria-hidden />
            </ButtonLink>
            <Link
              href="/how-it-works"
              className="inline-flex min-h-11 items-center font-semibold text-crimson hover:underline"
            >
              How it works
            </Link>
          </div>
          <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-small font-semibold text-ink-body">
            <Receipt className="size-4 text-crimson" aria-hidden />
            Receipt photo
            <span aria-hidden className="text-ink-muted">
              ·
            </span>
            <Camera className="size-4 text-crimson" aria-hidden />
            Doorstep photo
            <span className="font-medium text-ink-muted">with every order</span>
          </p>
        </div>
      </div>

      {/* Wide screens only: the right side of the band */}
      <div className="hidden lg:absolute lg:inset-y-0 lg:right-0 lg:block lg:w-[46%]">
        <StockPhoto
          name="staples"
          preload
          sizes="(min-width: 1024px) 46vw, 0px"
          className="h-full rounded-none"
        />
      </div>
    </section>
  )
}
