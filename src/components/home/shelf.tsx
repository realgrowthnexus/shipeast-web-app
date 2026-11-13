import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { ProductImage } from '@/components/shop/product-image'
import { formatJmd, formatUsd, usdCentsToJmd } from '@/lib/format'
import type { Product } from '@/lib/types'
import { HomeAddButton } from './add-button'

/**
 * The shelf (PLAN §3, row 5): real products with real prices, addable from the home page. A
 * rail on phones, a row on wide screens, ending in the way into the whole department.
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
    <section aria-labelledby="home-shelf" className="pt-14 md:pt-20">
      <div className="mx-auto flex max-w-wide flex-wrap items-end justify-between gap-x-6 gap-y-2 gutter">
        <h2 id="home-shelf" className="font-display text-h2">
          Staples for the kitchen
        </h2>
        <Link
          href={allHref}
          className="inline-flex min-h-control items-center gap-1 font-bold text-crimson underline-offset-4 hover:underline"
        >
          {allLabel}
          <ArrowRight className="size-icon" aria-hidden />
        </Link>
      </div>
      <ul className="mx-auto mt-6 rail max-w-wide scroll-px-4 gap-3 gutter pb-2 sm:gap-4 lg:grid lg:grid-cols-6 lg:overflow-visible">
        {products.map((p, i) => (
          <li key={p.id} className="w-[44%] sm:w-[30%] lg:w-auto">
            <article className="group relative flex h-full flex-col rounded-2xl bg-surface p-3 transition-shadow duration-250 hover:shadow-lift has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-signal">
              <ProductImage
                src={p.imagePath}
                alt=""
                categoryId={p.categoryId}
                slug={p.slug}
                sizes="(min-width: 1024px) 190px, 44vw"
                eager={i < 3}
                className="aspect-square rounded-xl"
              />
              <div className="mt-3 min-h-[4.25rem]">
                <h3 className="line-clamp-2 leading-snug font-bold text-ink">
                  <Link
                    href={`/product/${p.slug}`}
                    className="after:absolute after:inset-0 focus-visible:outline-none"
                  >
                    {p.name}
                  </Link>
                </h3>
                <p className="text-small text-ink-muted">{p.size}</p>
              </div>
              <p className="mt-2 font-display text-title text-ink tabular-nums">
                {formatUsd(p.priceCents)}
              </p>
              <p className="text-xs font-medium text-ink-muted tabular-nums">
                about {formatJmd(usdCentsToJmd(p.priceCents, jmdPerUsd))}
              </p>
              <HomeAddButton
                kind="product"
                id={p.id}
                name={p.name}
                className="relative z-raised mt-auto pt-3"
              />
            </article>
          </li>
        ))}
        <li className="w-[44%] sm:w-[30%] lg:w-auto">
          <Link
            href={allHref}
            className="group flex h-full min-h-64 flex-col justify-between rounded-2xl bg-crimson p-5 text-on-dark transition-colors duration-250 hover:bg-crimson-deep"
          >
            <span className="font-display text-title text-balance">{allLabel}</span>
            <span className="grid size-12 place-items-center rounded-full bg-cream text-crimson-deep transition-transform duration-250 group-hover:translate-x-1">
              <ArrowRight className="size-icon" aria-hidden />
            </span>
          </Link>
        </li>
      </ul>
    </section>
  )
}
