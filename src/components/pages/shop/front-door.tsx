import type { ReactNode } from 'react'
import { SearchBox } from '@/components/shop/search-box'
import { cn } from '@/lib/cn'
import { AisleSign } from './aisle-sign'

const riseDelay = [
  '',
  '[animation-delay:60ms]',
  '[animation-delay:120ms]',
  '[animation-delay:180ms]',
]

/**
 * S1, the shop's front door: type what you need or walk into an aisle. The four oxblood aisle
 * signs are the page's one bold element and its one load-time moment (they rise in turn); the
 * text, search and notes paint first and never animate.
 */
export function ShopFrontDoor({
  aisles,
  notes,
}: {
  aisles: { id: string; slug: string; name: string; count: number; sample: string }[]
  notes: ReactNode
}) {
  const n = aisles.length
  return (
    <section aria-labelledby="shop-title" className="bg-crimson section text-on-dark on-dark-focus">
      <div className="mx-auto grid max-w-wide gap-8 gutter lg:grid-cols-12 lg:gap-x-8 lg:gap-y-12 xl:gap-x-12">
        <div className="flex max-w-2xl flex-col gap-5 lg:col-span-7 lg:row-start-1 lg:max-w-none lg:gap-6 lg:pr-8">
          <h1 id="shop-title" className="text-h1 text-balance">
            What do they need this week?
          </h1>
          <p className="max-w-xl text-lead text-on-crimson-muted">
            Search or pick a department. You pay in US dollars, and our driver buys everything in
            Jamaica on the day we deliver.
          </p>
          <SearchBox id="shop-q" tone="onDark" className="mt-2 max-w-xl" />
        </div>

        <div className="lg:col-span-12 lg:row-start-2">
          {n > 0 ? (
            <nav aria-label="Departments">
              <ul
                className={cn(
                  'grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6',
                  n === 3 ? 'lg:grid-cols-3' : n === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4',
                )}
              >
                {aisles.map((a, i) => (
                  <li key={a.id} className={cn('flex animate-rise', riseDelay[Math.min(i, 3)])}>
                    <AisleSign slug={a.slug} name={a.name} count={a.count} sample={a.sample} />
                  </li>
                ))}
              </ul>
            </nav>
          ) : (
            <p className="text-on-crimson-muted">The shop is being stocked. Check back soon.</p>
          )}
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:self-end">{notes}</div>
      </div>
    </section>
  )
}
