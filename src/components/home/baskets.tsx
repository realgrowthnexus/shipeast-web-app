import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { StockPhoto } from '@/components/site/stock-photo'
import type { BasketSummary } from '@/lib/data/site'
import { formatJmd, formatUsd, usdCentsToJmd } from '@/lib/format'
import { basketPhotos } from '@/lib/stock-photos'
import type { Product } from '@/lib/types'
import { HomeAddButton } from './add-button'

const SHOWN = 4

/**
 * Ready-made baskets (PLAN §3, row 6): hamper cards with a price sticker and the first items
 * inside, then the gift note that turns a delivery into a present.
 */
export function HomeBaskets({
  baskets,
  products,
  jmdPerUsd,
}: {
  baskets: BasketSummary[]
  products: Product[]
  jmdPerUsd: number
}) {
  const byId = new Map(products.map((p) => [p.id, p]))
  return (
    <section aria-labelledby="home-baskets" className="mx-auto max-w-wide gutter pt-10 md:pt-12">
      <div className="rounded-3xl bg-surface p-5 sm:p-7 lg:p-8">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div>
            <h2 id="home-baskets" className="font-display text-title font-semibold">
              Ready-made baskets
            </h2>
            <p className="mt-1 text-small text-ink-body">
              Put together for the usual needs. Add one in a tap.
            </p>
          </div>
          <Link
            href="/baskets"
            className="inline-flex min-h-control items-center gap-1 text-small font-semibold text-crimson underline-offset-4 hover:underline"
          >
            All baskets
            <ArrowRight className="size-icon" aria-hidden />
          </Link>
        </div>

        <Stagger className="-mx-5 mt-6 rail gap-4 px-5 pb-6 sm:-mx-8 sm:px-8 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
          {baskets.map(({ basket, itemCount, separateCents }) => {
            const photo = basketPhotos[basket.slug]
            const lines = basket.items.flatMap((item) => {
              const product = byId.get(item.productId)
              return product ? [{ id: product.id, name: product.name, qty: item.quantity }] : []
            })
            const more = lines.length - SHOWN
            const saving = separateCents - basket.priceCents
            return (
              <StaggerItem key={basket.id} className="w-[80%] sm:w-[56%] md:w-auto">
                <article className="group relative flex h-full card-rise flex-col rounded-3xl bg-cream p-3 has-[h3_a:focus-visible]:outline-3 has-[h3_a:focus-visible]:outline-offset-2 has-[h3_a:focus-visible]:outline-signal">
                  <div className="relative">
                    {photo ? (
                      <StockPhoto
                        name={photo}
                        alt=""
                        zoom
                        sizes="(min-width: 768px) 380px, 92vw"
                        className="photo-loading aspect-[16/10] rounded-2xl"
                      />
                    ) : (
                      <div className="aspect-[16/10] rounded-2xl bg-cream-deep" />
                    )}
                    <p className="absolute -bottom-4 left-4 -rotate-3 rounded-full bg-mango px-3.5 py-1 font-display text-lead font-semibold text-ink tabular-nums shadow-lift transition-transform duration-250 ease-out-soft group-hover:scale-105 group-hover:rotate-0">
                      {formatUsd(basket.priceCents)}
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col px-3 pt-7 pb-3">
                    <h3 className="font-display text-lead font-semibold text-ink">
                      <Link
                        href={`/baskets/${basket.slug}`}
                        className="after:absolute after:inset-0 focus-visible:outline-none"
                      >
                        {basket.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-small font-medium text-ink-muted tabular-nums">
                      {itemCount} items, about{' '}
                      {formatJmd(usdCentsToJmd(basket.priceCents, jmdPerUsd))}
                    </p>
                    {saving > 0 && (
                      <p className="mt-2 self-start rounded-full bg-leaf-soft px-3 py-1 text-xs font-semibold text-leaf-deep tabular-nums">
                        Save {formatUsd(saving)}
                      </p>
                    )}
                    <ul className="mt-4 space-y-1.5 text-small text-ink-body">
                      {lines.slice(0, SHOWN).map((l) => (
                        <li key={l.id} className="flex gap-2">
                          <span className="w-7 shrink-0 font-semibold text-ink tabular-nums">
                            {l.qty} ×
                          </span>
                          {l.name}
                        </li>
                      ))}
                      {more > 0 && (
                        <li className="pl-9 font-medium text-ink-muted">
                          and {more} more {more === 1 ? 'item' : 'items'}
                        </li>
                      )}
                    </ul>
                    <HomeAddButton
                      kind="basket"
                      id={basket.id}
                      name={basket.name}
                      label="Add basket"
                      className="relative z-raised mt-auto pt-5"
                    />
                  </div>
                </article>
              </StaggerItem>
            )
          })}
        </Stagger>

        {/* The gift note: the emotional centre of the whole service, so it gets real paper. */}
        <Reveal className="mt-6 flex flex-col items-start gap-5 rounded-3xl bg-surface-selected p-6 sm:flex-row sm:items-center sm:gap-8">
          <p className="-rotate-2 rounded-lg bg-surface px-5 py-4 font-hand text-[1.35rem] leading-none text-crimson-deep shadow-lift">
            Happy birthday, Grandma!
          </p>
          <div>
            <h3 className="font-display text-lead font-semibold text-ink">Add a note.</h3>
            <p className="mt-1 max-w-xl text-small text-ink-body">
              Write a few words at checkout. We print them and put the note in the bag, so it
              arrives as a gift from you.
            </p>
          </div>
          <Link
            href="/gifts"
            className="inline-flex min-h-control shrink-0 items-center gap-1 font-semibold text-crimson underline-offset-4 hover:underline sm:ml-auto"
          >
            Gifts and occasions
            <ArrowRight className="size-icon" aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
