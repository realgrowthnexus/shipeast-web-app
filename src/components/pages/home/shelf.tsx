import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { AddToBasket } from '@/components/shop/add-to-basket'
import { ProductCard } from '@/components/shop/product-card'
import { Section } from '@/components/site/section'
import type { SectionTone } from '@/components/site/section'
import type { Product } from '@/lib/types'

/**
 * A store shelf: one department's products with prices and one-tap add. Scrolls sideways on
 * phones and shows five across on wide screens, with a link to the whole aisle. No entrance
 * animation: in a store the products should simply be there.
 */
export function ProductShelf({
  id,
  title,
  lead,
  href,
  products,
  jmdPerUsd,
  tone = 'canvas',
}: {
  id: string
  title: string
  lead?: string
  href: string
  products: Product[]
  jmdPerUsd: number
  tone?: SectionTone
}) {
  if (!products.length) return null
  return (
    <Section tone={tone} size="sm" wide aria-labelledby={id}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div>
          <h2 id={id} className="text-h2 text-ink">
            {title}
          </h2>
          {lead && <p className="mt-1 text-ink-body">{lead}</p>}
        </div>
        <Link
          href={href}
          className="group inline-flex min-h-11 items-center gap-1.5 font-semibold text-crimson hover:underline"
        >
          See all {title.toLowerCase()}
          <ArrowRight
            className="size-4 transition-transform duration-250 ease-out-soft group-hover:translate-x-1 motion-reduce:transition-none"
            aria-hidden
          />
        </Link>
      </div>
      <ul className="-mx-4 grid snap-x auto-cols-[46%] grid-flow-col gap-3 overflow-x-auto px-4 pb-2 sm:auto-cols-[31%] md:mx-0 md:auto-cols-auto md:grid-flow-row md:grid-cols-4 md:overflow-visible md:px-0 lg:grid-cols-5 lg:gap-4">
        {products.slice(0, 5).map((p, i) => (
          <li
            key={p.id}
            className={i === 4 ? 'flex snap-start md:hidden lg:flex' : 'flex snap-start'}
          >
            <ProductCard
              product={p}
              jmdPerUsd={jmdPerUsd}
              action={<AddToBasket kind="product" id={p.id} name={p.name} />}
            />
          </li>
        ))}
      </ul>
    </Section>
  )
}
