import Link from 'next/link'
import { StockPhoto } from '@/components/site/stock-photo'
import { categoryPhotos, type StockPhotoKey } from '@/lib/stock-photos'

type Department = { id: string; slug: string; name: string }

/** Aisles beside the departments, each with a photo of what's in it. */
const aisles: { href: string; label: string; photo: StockPhotoKey }[] = [
  { href: '/baskets', label: 'Baskets', photo: 'heroGroceries' },
  { href: '/gifts', label: 'Gifts', photo: 'giftChristmas' },
]

/**
 * The store's aisles as round photo tiles, like the department row of a grocery site. Scrolls
 * sideways on phones with the next tile peeking in; one row on wide screens. No item counts:
 * they only advertise how small a launch catalogue is.
 */
export function DepartmentRail({ categories }: { categories: Department[] }) {
  const tiles = [
    ...categories.map((c) => ({
      href: `/shop/${c.slug}`,
      label: c.name,
      photo: categoryPhotos[c.slug] as StockPhotoKey | undefined,
    })),
    ...aisles,
  ]
  return (
    <nav aria-label="Shop by department" className="pt-8 pb-2 sm:pt-10">
      <div className="mx-auto max-w-wide gutter">
        <h2 className="mb-4 text-h3 text-ink">Shop by department</h2>
        <ul className="-mx-4 flex snap-x scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-6 sm:gap-4 sm:overflow-visible sm:px-0">
          {tiles.map((t) => (
            <li key={t.href} className="w-22 shrink-0 snap-start sm:w-auto">
              <Link
                href={t.href}
                className="group flex flex-col items-center gap-2.5 rounded-lg p-1 text-center"
              >
                <span className="block size-20 overflow-hidden rounded-full border border-line bg-canvas transition-[border-color,transform] duration-250 ease-out-soft group-hover:-translate-y-0.5 group-hover:border-crimson motion-reduce:transition-none sm:size-24">
                  {t.photo && (
                    <StockPhoto
                      name={t.photo}
                      sizes="96px"
                      className="size-full rounded-full"
                      zoom
                    />
                  )}
                </span>
                <span className="text-small font-semibold text-ink group-hover:text-crimson">
                  {t.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
