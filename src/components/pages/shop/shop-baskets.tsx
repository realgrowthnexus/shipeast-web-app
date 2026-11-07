import Link from 'next/link'
import { lightLink } from '@/components/site/links'
import { SectionHeader } from '@/components/site/section'
import { cn } from '@/lib/cn'
import type { BasketRow } from '@/lib/baskets'
import { basketsLead } from '@/lib/home'
import { ShopBasketCard } from './shop-basket-card'

/** S2: the occasion sender's shortcut, compact so the shelves stay close. */
export function ShopBaskets({ rows, jmdPerUsd }: { rows: BasketRow[]; jmdPerUsd: number }) {
  const n = rows.length
  return (
    <section aria-labelledby="shop-baskets-title" className="section-sm">
      <div className="mx-auto max-w-wide gutter">
        <SectionHeader
          id="shop-baskets-title"
          title="Short on time? Send a ready-made basket"
          lead={basketsLead(rows.map((r) => r.summary.basket.occasion))}
          action={
            <Link href="/baskets" className={lightLink}>
              All baskets
            </Link>
          }
          className="mb-8"
        />
        <ul
          className={cn(
            'grid gap-4',
            n === 1 ? 'max-w-2xl' : n === 2 ? 'xl:grid-cols-2' : 'xl:grid-cols-3',
          )}
        >
          {rows.map((row) => (
            <li key={row.summary.basket.id} className="flex [&>article]:flex-1">
              <ShopBasketCard
                summary={row.summary}
                jmdPerUsd={jmdPerUsd}
                unavailable={row.unavailable.length > 0}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
