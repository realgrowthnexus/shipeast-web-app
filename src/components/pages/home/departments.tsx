import Link from 'next/link'
import { CategoryIcon } from '@/components/site/category-icon'
import { SectionHeader } from '@/components/site/section'
import { StockPhoto } from '@/components/site/stock-photo'
import { categoryPhotos } from '@/lib/stock-photos'
import type { Category } from '@/lib/types'
import { lightLink } from '@/components/site/links'

/** S3: one tap into a department, with real item counts. */
export function HomeDepartments({ categories }: { categories: (Category & { count: number })[] }) {
  return (
    <section aria-labelledby="departments-title" className="bg-surface section">
      <div className="mx-auto max-w-page gutter">
        <SectionHeader
          id="departments-title"
          title="Shop by department"
          lead="Prices are in US dollars, with the Jamaican dollar amount alongside."
          action={
            <Link href="/shop" className={lightLink}>
              All departments
            </Link>
          }
        />
        <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:mt-12">
          {categories.map((c) => {
            const photo = categoryPhotos[c.slug]
            return (
              <li key={c.id}>
                <Link href={`/shop/${c.slug}`} className="group flex flex-col gap-3 rounded-lg">
                  {photo ? (
                    <StockPhoto
                      name={photo}
                      alt=""
                      zoom
                      sizes="(min-width: 1024px) 270px, (min-width: 768px) 23vw, 45vw"
                      className="aspect-square rounded-lg md:aspect-4/5"
                    />
                  ) : (
                    <span className="grid aspect-square place-items-center rounded-lg bg-crimson text-blush md:aspect-4/5 [&_svg]:size-12">
                      <CategoryIcon slug={c.slug} />
                    </span>
                  )}
                  <span>
                    <span className="block text-h3 text-ink decoration-2 underline-offset-4 group-hover:underline">
                      {c.name}
                    </span>
                    {c.count > 0 && (
                      <span className="mt-1 block text-small text-ink-muted tabular-nums">
                        {c.count} {c.count === 1 ? 'item' : 'items'}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
