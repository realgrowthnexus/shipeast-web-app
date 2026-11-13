import { ArrowRight, MapPin, ReceiptText } from 'lucide-react'
import Link from 'next/link'
import { JamaicaFlag } from '@/components/site/jamaica'
import { StockPhoto } from '@/components/site/stock-photo'
import { formatUsd } from '@/lib/format'
import type { Receipt } from '@/lib/home'
import type { DeliveryZone } from '@/lib/types'

/** The three small cards share one anatomy: words on the left, one small picture on the right. */
const card =
  'group grid h-full card-rise grid-cols-[1fr_auto] items-center gap-4 rounded-xl p-5 animate-rise'
/** The picture slot: hidden on tablets, where three cards sit side by side and run narrow. */
const visual = 'size-16 shrink-0 sm:size-20 md:max-lg:hidden lg:max-xl:size-16'

/**
 * The hero (docs/home-v3/audits/layout.md §3.2): one shop banner and three small cards, read as
 * one composition. On wide screens the banner takes eight columns and the cards stack in the
 * other four, sharing its top and bottom edges. In the banner, red and the photo meet on one
 * clean seam; on phones the photo comes first, so the first screen shows food. Everything
 * here moves with CSS, so nothing waits for JavaScript; the headline never moves.
 */
export function HomeHero({
  parishList,
  zones,
  fromBasketCents,
  receipt,
}: {
  parishList: string
  zones: DeliveryZone[]
  /** The lowest featured basket price, or null with no baskets. */
  fromBasketCents: number | null
  receipt: Receipt | null
}) {
  const lowestFee = zones.length ? Math.min(...zones.map((z) => z.feeCents)) : null
  return (
    <section aria-labelledby="home-h1" className="mx-auto max-w-wide gutter pt-4 md:pt-6">
      <div className="grid gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-12 xl:grid-rows-3">
        <div className="relative grid overflow-hidden rounded-2xl bg-crimson text-on-dark on-dark-focus md:col-span-3 md:min-h-[400px] md:grid-cols-12 lg:min-h-[440px] xl:col-span-8 xl:row-span-3 xl:min-h-[480px]">
          {/* The groceries: edge to edge in their half, no frame, no tilt. */}
          <div className="relative aspect-[16/10] md:order-last md:col-span-5 md:aspect-auto">
            <StockPhoto
              name="homeBags"
              imgClassName="object-cover object-[center_60%]"
              sizes="(min-width: 1280px) 340px, (min-width: 768px) 42vw, 100vw"
              preload
              className="photo-loading absolute inset-0 rounded-none"
            />
            <p className="absolute top-4 right-4 grid size-20 animate-settle place-items-center rounded-full bg-mango p-2 text-center font-display text-xs leading-tight font-semibold text-ink shadow-lift [--settle-rotate:10deg] [animation-delay:100ms] sm:top-5 sm:right-5 sm:size-24 sm:text-small">
              <span>
                Bought in Jamaica.
                <span className="mt-0.5 block font-sans text-xs font-semibold">
                  Nothing is shipped.
                </span>
              </span>
            </p>
            {/* The note crosses the seam between red and photo, where it reads as a gift. */}
            <figure className="absolute bottom-8 -left-10 z-raised hidden w-44 animate-settle rounded-md bg-surface px-4 pt-3 pb-4 text-ink shadow-float [--settle-rotate:-4deg] [animation-delay:180ms] lg:block">
              <figcaption className="text-xs font-medium text-ink-muted">
                Example gift note, printed and put in the bag
              </figcaption>
              <blockquote className="mt-1 font-hand text-[1.35rem] leading-[1.05] text-crimson-deep">
                For Mummy. Cook something nice. Love, Marcia
              </blockquote>
            </figure>
          </div>

          <div className="flex flex-col justify-center px-6 py-8 md:col-span-7 md:px-10 md:py-10 xl:px-12 xl:py-12">
            {parishList && (
              <p className="mb-5 hidden items-center gap-2 self-start rounded-full bg-crimson-deep py-2 pr-4 pl-3 text-small font-medium sm:inline-flex">
                <JamaicaFlag />
                For family in {parishList}
              </p>
            )}
            <h1 id="home-h1" className="font-display text-h1 font-semibold text-balance">
              Shop for your family in Jamaica.
            </h1>
            <p className="mt-4 max-w-xl text-body text-on-crimson-muted">
              Order from overseas. We shop at a store in Jamaica and deliver to their door, with a
              photo of the till receipt and a photo at the door.
            </p>
            <div className="mt-8 flex flex-col gap-x-6 gap-y-2 sm:flex-row sm:items-center">
              <Link
                href="/shop"
                className="btn-slide inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-cream px-6 text-small font-semibold text-crimson-deep [--slide:var(--color-mango)] active:translate-y-px"
              >
                Start shopping
                <ArrowRight className="size-icon" aria-hidden />
              </Link>
              <Link
                href="/baskets"
                className="inline-flex min-h-control items-center justify-center font-semibold text-on-dark underline decoration-blush decoration-2 underline-offset-4 hover:decoration-on-dark"
              >
                See ready-made baskets
              </Link>
            </div>
          </div>
        </div>

        {/* The quick way in. */}
        <Link
          href="/baskets"
          className={`${card} bg-mango text-ink [animation-delay:240ms] xl:col-span-4`}
        >
          <div>
            <h2 className="font-display text-lead leading-tight font-semibold text-balance">
              Baskets ready to go
            </h2>
            <p className="mt-1 text-small text-ink-body">Put together for you, one price.</p>
            {fromBasketCents !== null && (
              <p className="mt-2 inline-block -rotate-2 rounded-full bg-ink px-3 py-1 text-small font-semibold text-on-dark">
                from {formatUsd(fromBasketCents)}
              </p>
            )}
          </div>
          <StockPhoto
            name="homeVegBox"
            alt=""
            zoom
            sizes="80px"
            className={`${visual} rotate-3 rounded-md shadow-lift`}
          />
        </Link>

        {/* The proof. */}
        <Link
          href="/how-it-works"
          className={`${card} bg-leaf text-on-dark [animation-delay:300ms] focus-visible:outline-mango xl:col-span-4`}
        >
          <div>
            <h2 className="font-display text-lead leading-tight font-semibold text-balance">
              <span className="block">See the receipt.</span>
              <span className="block">See the door.</span>
            </h2>
            <p className="mt-1 text-small text-on-leaf-muted">Two photos with every order.</p>
            <p className="mt-2 inline-flex items-center gap-2 text-small font-semibold text-mango">
              How proof works
              <ArrowRight
                className="size-icon transition-transform duration-250 group-hover:translate-x-1"
                aria-hidden
              />
            </p>
          </div>
          {receipt && (
            <div
              aria-hidden
              className={`${visual} flex rotate-3 flex-col gap-1.5 rounded-t-sm bg-surface px-2.5 pt-2.5 pb-4 shadow-lift paper-edge`}
            >
              <ReceiptText className="size-icon-sm text-crimson" />
              {[80, 64, 72, 56].map((w) => (
                <span key={w} className="h-1 rounded-full bg-line" style={{ width: `${w}%` }} />
              ))}
              <span className="mt-auto h-1.5 w-full rounded-full bg-ink-muted" />
            </div>
          )}
        </Link>

        {/* Where and how much. */}
        <Link
          href="/delivery"
          className={`${card} bg-surface text-ink [animation-delay:360ms] xl:col-span-4`}
        >
          <div>
            <h2 className="font-display text-lead leading-tight font-semibold text-balance">
              Delivered to their door
            </h2>
            <p className="mt-1 text-small text-ink-body">
              {parishList || 'In Jamaica'}
              {lowestFee !== null && (
                <>
                  {', from '}
                  <strong className="font-semibold text-ink">{formatUsd(lowestFee)}</strong>
                </>
              )}
            </p>
            <p className="mt-2 inline-flex items-center gap-2 text-small font-semibold text-crimson">
              Areas and fees
              <ArrowRight
                className="size-icon transition-transform duration-250 group-hover:translate-x-1"
                aria-hidden
              />
            </p>
          </div>
          <span
            aria-hidden
            className={`${visual} grid place-items-center rounded-full bg-surface-selected text-crimson`}
          >
            <MapPin className="size-icon-lg" />
          </span>
        </Link>
      </div>
    </section>
  )
}
