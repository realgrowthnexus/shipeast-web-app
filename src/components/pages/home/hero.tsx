import { ArrowRight, Camera, Receipt } from 'lucide-react'
import Link from 'next/link'
import { FlagBadge } from '@/components/site/jamaica'
import { StockPhoto } from '@/components/site/stock-photo'
import { ButtonLink } from '@/components/ui/button'
import { TodayCard } from './today-card'

/**
 * The top of the store: a rounded banner with the promise and one action, and beside it the
 * live "today" card that counts down to the same-day cut-off. Banner photo on wide screens only,
 * so phones reach the departments sooner.
 */
export function HomeHero({
  parishes,
  cutoff,
  zones,
}: {
  parishes: string
  /** Same-day cut-off in Jamaica time, `13:00`. */
  cutoff: string
  zones: { id: string; parish: string; fee: string }[]
}) {
  return (
    <section aria-labelledby="hero-h" className="pt-4 pb-4 sm:pt-6">
      <div className="mx-auto grid w-full max-w-wide gap-4 gutter lg:grid-cols-12 lg:gap-6">
        <div className="relative overflow-hidden rounded-xl bg-canvas lg:col-span-8">
          <div className="relative z-10 flex animate-rise flex-col items-start p-6 sm:p-10 lg:w-[60%] lg:py-12">
            <FlagBadge>Shop &amp; Send to {parishes}</FlagBadge>
            <h1
              id="hero-h"
              className="mt-5 text-display text-balance text-ink lg:text-h1 lg:font-black"
            >
              Send groceries, <span className="text-crimson">not money</span>
            </h1>
            <p className="mt-4 max-w-md text-body text-ink-body sm:text-lead">
              Pay in US dollars. We buy everything in Jamaica and deliver it to their door the same
              day.
            </p>
            <div className="mt-7 flex w-full flex-wrap items-center gap-x-6 gap-y-3">
              <ButtonLink href="/shop" size="lg" className="w-full sm:w-auto">
                Shop now
                <ArrowRight aria-hidden />
              </ButtonLink>
              <Link
                href="/how-it-works"
                className="inline-flex min-h-11 items-center font-semibold text-ink-body hover:text-crimson"
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
          <div className="absolute inset-y-0 right-0 hidden w-[40%] lg:block">
            <StockPhoto
              name="staples"
              preload
              sizes="(min-width: 1280px) 360px, 30vw"
              className="h-full rounded-none"
            />
          </div>
        </div>
        <div className="lg:col-span-4">
          <TodayCard cutoff={cutoff} zones={zones} />
        </div>
      </div>
    </section>
  )
}
