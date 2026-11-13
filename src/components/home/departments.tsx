import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { StockPhoto } from '@/components/site/stock-photo'
import { cn } from '@/lib/cn'
import type { StockPhotoKey } from '@/lib/stock-photos'
import type { Category } from '@/lib/types'

/** Each department has its own shelf colour and photo; unknown ones fall back to cream. */
const looks: Record<string, { tint: string; photo: StockPhotoKey; crop: string }> = {
  groceries: { tint: 'bg-mango-soft', photo: 'homeVegBox', crop: 'object-center' },
  household: { tint: 'bg-leaf-soft', photo: 'catHousehold', crop: 'object-[center_35%]' },
  pharmacy: { tint: 'bg-sky-soft', photo: 'catPharmacy', crop: 'object-center' },
  'baby-and-child': { tint: 'bg-surface-selected', photo: 'catBaby', crop: 'object-top' },
}

/**
 * Departments (docs/home-v3/audits/layout.md §3.3): four tiles whose photo fills the top edge
 * to edge, the name on the department's colour below. No item counts: a thin aisle reads as an
 * empty shop on the front page (the shop pages still show them).
 */
export function HomeDepartments({ categories }: { categories: (Category & { count: number })[] }) {
  return (
    <section
      aria-labelledby="home-departments"
      className="mx-auto max-w-wide gutter pt-10 md:pt-12"
    >
      <Reveal y={0} className="flex items-center justify-between gap-4">
        <h2 id="home-departments" className="font-display text-title font-semibold">
          Shop by department
        </h2>
        <Link
          href="/shop"
          className="inline-flex min-h-control shrink-0 items-center gap-1 text-small font-semibold text-crimson underline-offset-4 hover:underline"
        >
          <span className="sm:hidden">
            See all<span className="sr-only"> departments</span>
          </span>
          <span className="hidden sm:inline">All departments</span>
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
                  'group relative flex h-full card-rise flex-col overflow-hidden rounded-xl',
                  look?.tint ?? 'bg-cream-deep',
                )}
              >
                {look && (
                  <StockPhoto
                    name={look.photo}
                    alt=""
                    zoom
                    imgClassName={look.crop}
                    sizes="(min-width: 1024px) 300px, 50vw"
                    className="photo-loading aspect-[4/3] w-full rounded-none"
                  />
                )}
                <span className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-surface text-ink shadow-lift transition-colors duration-250 group-hover:bg-crimson group-hover:text-on-dark">
                  <ArrowUpRight
                    className="size-icon transition-transform duration-250 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
                <span className="block truncate px-4 py-3 font-display text-body font-semibold text-ink sm:px-5 sm:py-4 sm:text-lead">
                  {c.name}
                </span>
              </Link>
            </StaggerItem>
          )
        })}
      </Stagger>
    </section>
  )
}
