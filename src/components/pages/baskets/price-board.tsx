import { ArrowDown } from 'lucide-react'
import type { BasketRow } from '@/lib/baskets'
import { formatJmd, formatUsd, usdCentsToJmd } from '@/lib/format'
import { occasionPhrases } from '@/lib/home'
import { OccasionIcon } from './occasion-icon'
import { SavingTag } from '@/components/shop/saving-tag'

/**
 * The page's bold element: a shop price board, one big row per basket with the price as large
 * as the name. One column of rows on phones and tablets, a 2-column board from 1024px. Each row
 * jumps to its basket below. Sits inside the crimson panel of the baskets hero.
 */
export function PriceBoard({ rows, jmdPerUsd }: { rows: BasketRow[]; jmdPerUsd: number }) {
  return (
    <nav aria-label="Baskets on this page">
      <ol className="grid lg:grid-cols-2 lg:gap-x-10">
        {rows.map(({ summary: { basket, itemCount }, savingCents, unavailable }) => (
          <li
            key={basket.id}
            className="border-b border-crimson-deep last:border-0 lg:[&:nth-last-child(2):nth-child(odd)]:border-0"
          >
            <a
              href={`#${basket.slug}`}
              className="group grid min-h-control grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-1 rounded-lg px-2 py-5 transition-colors duration-150 hover:bg-crimson-deep focus-visible:ring-3 focus-visible:ring-blush focus-visible:outline-none focus-visible:ring-inset active:bg-oxblood sm:px-4 lg:grid-cols-[auto_1fr_auto_auto] lg:py-6"
            >
              <span className="grid size-12 place-items-center rounded-full bg-crimson-deep text-blush transition-colors duration-150 group-hover:bg-oxblood [&_svg]:size-6">
                <OccasionIcon occasion={basket.occasion} />
              </span>
              <span className="min-w-0">
                <span className="block text-small text-on-crimson-muted">
                  For {occasionPhrases[basket.occasion]}
                </span>
                <span className="block text-title text-on-dark">{basket.name}</span>
                <span className="block text-small text-on-crimson-muted tabular-nums">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </span>
              </span>
              <span className="text-right">
                <span className="block text-title font-extrabold tabular-nums">
                  {formatUsd(basket.priceCents)}
                </span>
                <span className="block text-small text-on-crimson-muted tabular-nums">
                  about {formatJmd(usdCentsToJmd(basket.priceCents, jmdPerUsd))}
                </span>
                {unavailable.length > 0 ? (
                  <span className="mt-1 block text-small text-on-crimson-muted">
                    Not available today
                  </span>
                ) : (
                  savingCents > 0 && <SavingTag cents={savingCents} className="mt-1" />
                )}
              </span>
              <ArrowDown
                className="hidden size-icon text-blush transition-transform duration-150 group-hover:translate-y-0.5 motion-reduce:transition-none lg:block"
                aria-hidden
              />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
