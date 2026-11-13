import { ArrowRight, Check, CircleCheck, Clock, MapPin, ReceiptText } from 'lucide-react'
import Link from 'next/link'
import { Stagger, StaggerItem } from '@/components/motion/reveal'
import { JamaicaFlag } from '@/components/site/jamaica'
import { StockPhoto } from '@/components/site/stock-photo'
import { formatClockTime, formatJmd, formatUsd } from '@/lib/format'
import type { Receipt } from '@/lib/home'
import type { DeliveryZone } from '@/lib/types'

const ticks = ['Pay in US dollars', 'Receipt and door photos', 'They install nothing']

/**
 * The hero (docs/home-v3/PLAN.md §3, row 2): one crimson block that says what the shop is,
 * with the groceries, a gift note and a "bought in Jamaica" sticker; then three tiles that
 * answer the next three questions: is there a quick way, how do I know it arrived, where and when.
 */
export function HomeHero({
  parishList,
  zones,
  cutoff,
  fromBasketCents,
  receipt,
}: {
  parishList: string
  zones: DeliveryZone[]
  cutoff: string | null
  /** The lowest featured basket price, or null with no baskets. */
  fromBasketCents: number | null
  receipt: Receipt | null
}) {
  const lowestFee = zones.length ? Math.min(...zones.map((z) => z.feeCents)) : null
  return (
    <section aria-labelledby="home-h1" className="mx-auto max-w-wide gutter pt-4 md:pt-5">
      <div className="relative overflow-hidden rounded-3xl bg-crimson text-on-dark on-dark-focus">
        <div className="grid items-center gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-12">
          <div className="lg:col-span-7">
            {parishList && (
              <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-crimson-deep py-2 pr-4 pl-3 text-xs font-semibold sm:text-small">
                <JamaicaFlag />
                For family in {parishList}
              </p>
            )}
            <h1 id="home-h1" className="font-display text-mega text-balance">
              Shop for your family in Jamaica.
            </h1>
            <p className="mt-5 max-w-2xl text-lead text-on-crimson-muted">
              Order from overseas. We shop at a store in Jamaica and deliver to their door, with a
              photo of the till receipt and a photo at the door.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/shop"
                className="btn-slide inline-flex min-h-control-lg items-center gap-2 rounded-full bg-cream px-7 text-body font-bold text-crimson-deep [--slide:var(--color-mango)] active:translate-y-px"
              >
                Start shopping
                <ArrowRight className="size-icon" aria-hidden />
              </Link>
              <Link
                href="/baskets"
                className="inline-flex min-h-control items-center font-bold text-on-dark underline decoration-blush decoration-2 underline-offset-4 hover:decoration-on-dark"
              >
                See ready-made baskets
              </Link>
            </div>
            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-small font-semibold">
              {ticks.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check className="size-icon-sm text-mango" strokeWidth={3} aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* The groceries, the note that goes in the bag, and the one fact people get wrong. */}
          <div className="relative mx-auto mb-8 w-full max-w-sm lg:col-span-5 lg:mb-0">
            <div className="animate-settle rounded-3xl bg-cream p-2 shadow-float [--settle-rotate:2.5deg]">
              <StockPhoto
                name="homeBags"
                imgClassName="object-cover"
                sizes="(min-width: 1024px) 440px, 90vw"
                preload
                className="photo-loading aspect-square rounded-2xl"
              />
            </div>
            <div className="absolute -top-5 -right-2 animate-bob lg:-right-6">
              <p className="grid size-28 animate-settle place-items-center rounded-full bg-mango p-3 text-center font-display text-small leading-tight font-extrabold text-ink shadow-lift [--settle-rotate:10deg] [animation-delay:120ms] sm:size-32 sm:text-body">
                <span>
                  Bought in Jamaica.
                  <span className="mt-1 block font-sans text-xs font-bold">
                    Nothing is shipped.
                  </span>
                </span>
              </p>
            </div>
            <figure className="absolute -bottom-10 -left-2 w-52 animate-settle rounded-lg bg-surface px-4 pt-3 pb-4 text-ink shadow-float [--settle-rotate:-5deg] [animation-delay:240ms] sm:w-60 lg:-bottom-6 lg:-left-8">
              <figcaption className="text-xs font-semibold text-ink-muted">
                Example gift note, printed and put in the bag
              </figcaption>
              <blockquote className="mt-1 font-hand text-[1.6rem] leading-[1.05] text-crimson-deep">
                For Mummy. Cook something nice. Love, Marcia
              </blockquote>
            </figure>
          </div>
        </div>
      </div>

      <Stagger as="div" className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {/* Tile B: the quick way in. */}
        <StaggerItem as="div">
          <Link
            href="/baskets"
            className="group relative flex h-full min-h-44 card-rise overflow-hidden rounded-3xl bg-mango p-6 text-ink"
          >
            <div className="relative z-raised max-w-[58%]">
              <h2 className="font-display text-title">Ready-made baskets</h2>
              <p className="mt-2 font-medium text-ink-body">One tap, one price.</p>
              {fromBasketCents !== null && (
                <p className="mt-4 inline-block -rotate-3 rounded-full bg-ink px-4 py-2 font-display font-extrabold text-on-dark">
                  from {formatUsd(fromBasketCents)}
                </p>
              )}
            </div>
            <StockPhoto
              name="homeVegBox"
              alt=""
              zoom
              sizes="(min-width: 640px) 220px, 45vw"
              className="absolute -right-6 -bottom-6 size-40 rotate-6 rounded-3xl shadow-lift sm:size-44"
            />
          </Link>
        </StaggerItem>

        {/* Tile C: the proof. */}
        <StaggerItem as="div">
          <Link
            href="/how-it-works"
            className="group relative flex h-full min-h-44 card-rise overflow-hidden rounded-3xl bg-leaf p-6 text-on-dark focus-visible:outline-mango"
          >
            <div className="relative z-raised max-w-[55%] xl:max-w-[64%]">
              <h2 className="font-display text-title">
                <span className="block">See the receipt.</span>
                <span className="block">See the door.</span>
              </h2>
              <p className="mt-2 font-medium text-on-leaf-muted">Two photos with every order.</p>
              <p className="mt-4 inline-flex items-center gap-2 font-bold text-mango">
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
                className="absolute -right-2 -bottom-8 w-36 rotate-6 rounded-t-md bg-surface px-3 pt-3 pb-8 text-xs text-ink shadow-lift paper-edge lg:w-44 xl:w-36"
              >
                <p className="flex items-center gap-1.5 font-bold">
                  <ReceiptText className="size-icon-sm text-crimson" />
                  Till receipt
                </p>
                <ul className="mt-2 space-y-1 text-ink-body">
                  {receipt.lines.slice(0, 4).map((l) => (
                    <li key={l.name} className="flex justify-between gap-2">
                      <span className="truncate">{l.name}</span>
                      <span className="tabular-nums">{formatJmd(l.jmd)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Link>
        </StaggerItem>

        {/* Tile D: where, when and how much. */}
        <StaggerItem as="div" className="sm:col-span-2 xl:col-span-1">
          <Link
            href="/delivery"
            className="group relative flex h-full min-h-44 card-rise flex-col rounded-3xl bg-surface p-6"
          >
            <h2 className="font-display text-title text-ink">Delivered to their door</h2>
            <ul className="mt-4 flex flex-col gap-x-10 gap-y-2.5 font-medium text-ink-body sm:flex-row sm:flex-wrap xl:flex-col">
              {parishList && (
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-icon shrink-0 text-crimson" aria-hidden />
                  {parishList}
                </li>
              )}
              {cutoff && (
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 size-icon shrink-0 text-crimson" aria-hidden />
                  <span>
                    Same day when you order by{' '}
                    <strong className="font-bold text-ink">{formatClockTime(cutoff)}</strong>{' '}
                    Jamaica time
                  </span>
                </li>
              )}
              {lowestFee !== null && (
                <li className="flex items-start gap-3">
                  <CircleCheck className="mt-0.5 size-icon shrink-0 text-crimson" aria-hidden />
                  <span>
                    Delivery from{' '}
                    <strong className="font-bold text-ink">{formatUsd(lowestFee)}</strong>
                  </span>
                </li>
              )}
            </ul>
            <p className="mt-auto inline-flex items-center gap-2 pt-4 font-bold text-crimson">
              Areas and fees
              <ArrowRight
                className="size-icon transition-transform duration-250 group-hover:translate-x-1"
                aria-hidden
              />
            </p>
          </Link>
        </StaggerItem>
      </Stagger>
    </section>
  )
}
