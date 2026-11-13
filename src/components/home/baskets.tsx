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
 * Ready-made baskets (docs/home-v3/audits/layout.md §3.5): hamper cards with a price sticker and
 * the first items inside. Only baskets we can buy today reach this list (`pickFeaturedBaskets`).
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
      <div>
        <Reveal y={0}>
          <div className="flex items-center justify-between gap-4">
            <h2 id="home-baskets" className="font-display text-title font-semibold">
              Ready-made baskets
            </h2>
            <Link
              href="/baskets"
              className="inline-flex min-h-control shrink-0 items-center gap-1 text-small font-semibold text-crimson underline-offset-4 hover:underline"
            >
              <span className="sm:hidden">
                See all<span className="sr-only"> baskets</span>
              </span>
              <span className="hidden sm:inline">All baskets</span>
              <ArrowRight className="size-icon" aria-hidden />
            </Link>
          </div>
          <p className="mt-1 text-small text-ink-body">
            Put together for the usual needs. Add one in a tap.
          </p>
        </Reveal>

        <Stagger className="bleed-gutter mt-6 rail scroll-px-[clamp(1rem,0.422rem+2.465vw,2rem)] gap-4 pb-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0 lg:pb-0">
          {baskets.map(({ basket, itemCount, separateCents }) => {
            const photo = basketPhotos[basket.slug]
            const lines = basket.items.flatMap((item) => {
              const product = byId.get(item.productId)
              return product ? [{ id: product.id, name: product.name, qty: item.quantity }] : []
            })
            const more = lines.length - SHOWN
            const saving = separateCents - basket.priceCents
            return (
              <StaggerItem key={basket.id} className="w-[80%] sm:w-[56%] md:w-[46%] lg:w-auto">
                <article className="group relative flex h-full card-rise flex-col rounded-xl border border-line bg-surface p-2 hover:border-line-hover has-[h3_a:focus-visible]:outline-3 has-[h3_a:focus-visible]:outline-offset-2 has-[h3_a:focus-visible]:outline-signal">
                  <div className="relative">
                    {photo ? (
                      <StockPhoto
                        name={photo}
                        alt=""
                        zoom
                        sizes="(min-width: 768px) 380px, 92vw"
                        className="photo-loading aspect-[16/10] rounded-md"
                      />
                    ) : (
                      <div className="aspect-[16/10] rounded-md bg-surface-muted" />
                    )}
                    <p className="absolute -bottom-4 left-4 -rotate-3 rounded-full bg-mango px-3.5 py-1 font-display text-price font-semibold text-ink tabular-nums shadow-lift transition-transform duration-250 ease-out-soft group-hover:scale-105 group-hover:rotate-0">
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
      </div>
    </section>
  )
}
