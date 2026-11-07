import { ChevronRight, LayoutGrid } from 'lucide-react'
import Link from 'next/link'
import { CategoryIcon } from '@/components/site/category-icon'
import { cn } from '@/lib/cn'
import { TabRailScroller } from './tab-rail-scroller'

/**
 * R1, the page's one bold element: a solid crimson band right under the light header, with the
 * title, the real item count and a folder tab per department. The current tab is cut out in
 * the strip's white, so the band opens into "this aisle". Not a hero: no photo, no lead, no
 * second column. Static (cached loaders only).
 */
export function DepartmentBand({
  title,
  count,
  current,
  departments,
}: {
  title: string
  count: number
  /** The current department's slug; null on `/shop`. */
  current: string | null
  departments: { slug: string; name: string }[]
}) {
  const tabs = [
    { slug: null, name: 'All', href: '/shop' },
    ...departments.map((d) => ({ slug: d.slug, name: d.name, href: `/shop/${d.slug}` })),
  ]
  const currentName = departments.find((d) => d.slug === current)?.name
  return (
    <section aria-labelledby="listing-title" className="bg-crimson text-on-dark on-dark-focus">
      <div className="mx-auto max-w-wide gutter pt-5 md:pt-8">
        {currentName && (
          <nav aria-label="Breadcrumb" className="text-small">
            <ol className="flex flex-wrap items-center gap-1 text-on-crimson-muted">
              <li>
                <Link
                  href="/shop"
                  className="inline-flex min-h-6 items-center underline-offset-2 hover:text-on-dark hover:underline"
                >
                  Shop
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="size-icon-sm" />
              </li>
              <li aria-current="page" className="font-semibold text-on-dark">
                {currentName}
              </li>
            </ol>
          </nav>
        )}
        <div className={cn('flex flex-wrap items-baseline gap-x-3 gap-y-1', currentName && 'mt-2')}>
          <h1 id="listing-title" className="text-h1 text-balance">
            {title}
          </h1>
          <p className="text-small font-semibold text-blush tabular-nums">
            {count} {count === 1 ? 'item' : 'items'}
          </p>
        </div>
      </div>
      <nav aria-label="Departments" className="mx-auto mt-4 max-w-wide md:mt-6">
        <ul className="flex [scrollbar-width:none] gap-1 overflow-x-auto gutter">
          {tabs.map((t) => {
            const isCurrent = t.slug === current
            return (
              <li key={t.href} className="shrink-0">
                <Link
                  href={t.href}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={cn(
                    'flex h-12 items-center gap-2 rounded-t-lg px-4 text-small font-semibold whitespace-nowrap transition-colors duration-150 focus-visible:outline-offset-[-3px] [&_svg]:size-icon',
                    isCurrent
                      ? 'bg-surface font-bold text-crimson'
                      : 'text-on-dark hover:bg-crimson-deep',
                  )}
                >
                  {t.slug ? <CategoryIcon slug={t.slug} /> : <LayoutGrid aria-hidden />}
                  {t.name}
                </Link>
              </li>
            )
          })}
          <li aria-hidden className="w-px shrink-0">
            <TabRailScroller />
          </li>
        </ul>
      </nav>
    </section>
  )
}
