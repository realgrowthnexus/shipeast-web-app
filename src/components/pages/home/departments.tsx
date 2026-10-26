import { CalendarSync, Gift, ShoppingBasket } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { CategoryIcon } from '@/components/site/category-icon'
import { StockPhoto } from '@/components/site/stock-photo'
import { categoryPhotos } from '@/lib/stock-photos'

type Department = { id: string; slug: string; name: string; count: number }

/**
 * The store's aisles as round photo tiles, like the department row of a grocery site. Scrolls
 * sideways on phones; one row on wide screens.
 */
export function DepartmentRail({ categories }: { categories: Department[] }) {
  return (
    <nav aria-label="Shop by department" className="pb-4 sm:pb-8">
      <div className="mx-auto max-w-wide gutter">
        <h2 className="mb-5 text-h3 text-ink">Shop by department</h2>
        <ul className="-mx-4 flex snap-x scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0 lg:grid-cols-7">
          {categories.map((c) => {
            const photo = categoryPhotos[c.slug]
            return (
              <Tile
                key={c.id}
                href={`/shop/${c.slug}`}
                label={c.name}
                meta={`${c.count} ${c.count === 1 ? 'item' : 'items'}`}
              >
                {photo ? (
                  <StockPhoto name={photo} sizes="112px" className="size-full rounded-full" zoom />
                ) : (
                  <span className="grid size-full place-items-center text-crimson [&_svg]:size-9">
                    <CategoryIcon slug={c.slug} />
                  </span>
                )}
              </Tile>
            )
          })}
          <Tile href="/baskets" label="Baskets" meta="Bundles">
            <IconFace>
              <ShoppingBasket aria-hidden />
            </IconFace>
          </Tile>
          <Tile href="/gifts" label="Gifts" meta="Occasions">
            <IconFace>
              <Gift aria-hidden />
            </IconFace>
          </Tile>
          <Tile href="/monthly" label="Monthly" meta="Reorder">
            <IconFace>
              <CalendarSync aria-hidden />
            </IconFace>
          </Tile>
        </ul>
      </div>
    </nav>
  )
}

function Tile({
  href,
  label,
  meta,
  children,
}: {
  href: string
  label: string
  meta: string
  children: ReactNode
}) {
  return (
    <li className="w-26 shrink-0 snap-start sm:w-auto">
      <Link
        href={href}
        className="group flex flex-col items-center gap-3 rounded-lg p-1 text-center"
      >
        <span className="block size-24 overflow-hidden rounded-full border-2 border-line bg-surface-tint transition-[border-color,transform] duration-250 ease-out-soft group-hover:-translate-y-0.5 group-hover:border-crimson motion-reduce:transition-none sm:size-28">
          {children}
        </span>
        <span className="flex flex-col">
          <span className="font-bold text-ink group-hover:text-crimson">{label}</span>
          <span className="text-xs font-semibold text-ink-muted">{meta}</span>
        </span>
      </Link>
    </li>
  )
}

function IconFace({ children }: { children: ReactNode }) {
  return (
    <span className="grid size-full place-items-center bg-crimson text-white [&_svg]:size-9">
      {children}
    </span>
  )
}
