import Link from 'next/link'
import { StockPhoto } from '@/components/site/stock-photo'
import { categoryPhotos, type StockPhotoKey } from '@/lib/stock-photos'
import { HomeSection } from './home-section'

type Department = { id: string; slug: string; name: string }

/** Aisles beside the departments, each with a photo of what's in it. */
const aisles: { href: string; label: string; photo: StockPhotoKey }[] = [
  { href: '/baskets', label: 'Baskets', photo: 'heroGroceries' },
  { href: '/gifts', label: 'Gifts', photo: 'giftChristmas' },
]

/**
 * The store's aisles as small square cards: photo, then name. A thin border that turns
 * crimson on hover, with the photo easing in. Three across on phones, six on wide screens.
 */
export function DepartmentGrid({ categories }: { categories: Department[] }) {
  const tiles = [
    ...categories.map((c) => ({
      href: `/shop/${c.slug}`,
      label: c.name,
      photo: categoryPhotos[c.slug] as StockPhotoKey | undefined,
    })),
    ...aisles,
  ]
  return (
    <HomeSection
      id="dept-h"
      title="Shop by department"
      link={{ href: '/shop', label: 'All departments', short: 'All' }}
    >
      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-4">
        {tiles.map((t) => (
          <li key={t.href}>
            <Link
              href={t.href}
              className="group flex h-full flex-col items-center gap-3 rounded-lg border border-line bg-surface p-2 text-center transition-[border-color,box-shadow] duration-250 ease-out-soft hover:border-crimson hover:shadow-lift sm:p-3"
            >
              <span className="block aspect-square w-full overflow-hidden rounded-md bg-canvas">
                {t.photo && (
                  <StockPhoto
                    name={t.photo}
                    sizes="(min-width: 640px) 180px, 30vw"
                    className="size-full rounded-md"
                    zoom
                  />
                )}
              </span>
              <span className="pb-1 text-small font-semibold text-ink group-hover:text-crimson">
                {t.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </HomeSection>
  )
}
