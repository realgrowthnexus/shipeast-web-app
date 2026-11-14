import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { ShelfCard } from '@/components/shop/shelf-card'
import { formatJmd } from '@/lib/format'
import type { Product } from '@/lib/types'
import { HomeAddButton } from './add-button'

/**
 * The shelf (docs/home-v3/audits/layout.md §3.4): real products with real prices, addable from
 * the home page, on the same grey square each, the way a grocery site lines up its stock. A rail
 * on phones, a row on wide screens, ending in the way into the whole department.
 */
export function HomeShelf({
  products,
  jmdPerUsd,
  allHref,
  allLabel,
}: {
  products: Product[]
  jmdPerUsd: number
  allHref: string
  allLabel: string
}) {
  return (
    <section aria-labelledby="home-shelf" className="pt-10 md:pt-12">
      <Reveal y={0} className="mx-auto max-w-wide gutter">
        <div className="flex items-center justify-between gap-4">
          <h2 id="home-shelf" className="font-display text-title font-semibold">
            Staples for the kitchen
          </h2>
          <Link
            href={allHref}
            className="inline-flex min-h-control shrink-0 items-center gap-1 text-small font-semibold text-crimson underline-offset-4 hover:underline"
          >
            <span className="sm:hidden">
              See all<span className="sr-only"> {allLabel.toLowerCase()}</span>
            </span>
            <span className="hidden sm:inline">{allLabel}</span>
            <ArrowRight className="size-icon" aria-hidden />
          </Link>
        </div>
        <p className="mt-1 text-small text-ink-muted">
          You pay in US dollars. J$ amounts are a guide at {formatJmd(jmdPerUsd)} to USD$1.
        </p>
      </Reveal>
      <Stagger className="mx-auto mt-6 rail max-w-wide scroll-px-4 gap-3 gutter pb-2 sm:gap-4 lg:grid lg:grid-cols-6 lg:overflow-visible">
        {products.map((p, i) => (
          <StaggerItem key={p.id} className="w-[42%] sm:w-[28%] lg:w-auto">
            <ShelfCard
              product={p}
              jmdPerUsd={jmdPerUsd}
              sizes="(min-width: 1024px) 190px, 44vw"
              eager={i < 3}
              placeholder="icon"
              action={<HomeAddButton kind="product" id={p.id} name={p.name} variant="outline" />}
            />
          </StaggerItem>
        ))}
        <StaggerItem className="w-[42%] sm:w-[28%] lg:w-auto">
          <Link
            href={allHref}
            className="group btn-slide flex h-full min-h-56 flex-col justify-between rounded-lg bg-crimson p-5 text-on-dark"
          >
            <span className="font-display text-lead font-semibold text-balance">{allLabel}</span>
            <span className="grid size-12 place-items-center rounded-full bg-surface text-crimson-deep transition-transform duration-250 group-hover:translate-x-1">
              <ArrowRight className="size-icon" aria-hidden />
            </span>
          </Link>
        </StaggerItem>
      </Stagger>
    </section>
  )
}
