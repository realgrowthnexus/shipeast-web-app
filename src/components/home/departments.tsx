import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { StockPhoto } from '@/components/site/stock-photo'
import { cn } from '@/lib/cn'
import type { StockPhotoKey } from '@/lib/stock-photos'
import type { Category } from '@/lib/types'

/** Each department has its own shelf colour and photo; unknown ones fall back to cream. */
const looks: Record<string, { tint: string; photo: StockPhotoKey }> = {
  groceries: { tint: 'bg-mango-soft', photo: 'homeVegBox' },
  household: { tint: 'bg-leaf-soft', photo: 'catHousehold' },
  pharmacy: { tint: 'bg-sky-soft', photo: 'catPharmacy' },
  'baby-and-child': { tint: 'bg-surface-selected', photo: 'catBaby' },
}

/**
 * Departments (PLAN §3, row 4): four colour tiles. The photo sits in an arch, the shape of a
 * doorway, which is where every order ends up.
 */
export function HomeDepartments({ categories }: { categories: (Category & { count: number })[] }) {
  return (
    <section
      aria-labelledby="home-departments"
      className="mx-auto max-w-wide gutter pt-10 md:pt-12"
    >
      <Reveal className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div>
          <h2 id="home-departments" className="font-display text-title font-semibold">
            Shop by department
          </h2>
          <p className="mt-1 text-small text-ink-body">
            Prices in US dollars, with the Jamaican dollar amount beside them.
          </p>
        </div>
        <Link
          href="/shop"
          className="inline-flex min-h-control items-center gap-1 text-small font-semibold text-crimson underline-offset-4 hover:underline"
        >
          All departments
          <ArrowUpRight className="size-icon" aria-hidden />
        </Link>
      </Reveal>
      <Stagger className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {categories.map((c) => {
          const look = looks[c.slug]
          return (
            <StaggerItem key={c.id}>
              <Link
                href={`/shop/${c.slug}`}
                className={cn(
                  'group relative flex h-full card-rise flex-col overflow-hidden rounded-3xl px-4 pt-4 sm:px-5 sm:pt-5',
                  look?.tint ?? 'bg-cream-deep',
                )}
              >
                <span className="flex items-start justify-between gap-2">
                  <span>
                    <span className="block font-display text-lead font-semibold text-ink">
                      {c.name}
                    </span>
                    <span className="block text-xs font-medium text-ink-body">
                      {c.count} {c.count === 1 ? 'item' : 'items'}
                    </span>
                  </span>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface text-ink transition-colors duration-250 group-hover:bg-crimson group-hover:text-on-dark">
                    <ArrowUpRight className="size-icon" aria-hidden />
                  </span>
                </span>
                {look && (
                  <StockPhoto
                    name={look.photo}
                    alt=""
                    zoom
                    sizes="(min-width: 1024px) 260px, 45vw"
                    className="photo-loading mx-auto mt-4 aspect-square w-[66%] rounded-t-full sm:mt-4"
                  />
                )}
              </Link>
            </StaggerItem>
          )
        })}
      </Stagger>
    </section>
  )
}
