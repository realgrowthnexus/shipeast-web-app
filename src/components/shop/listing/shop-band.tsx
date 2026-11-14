import { ChevronRight, DollarSign, Receipt } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { CutoffNote } from '@/components/site/cutoff-note'
import { formatJmd } from '@/lib/format'
import { DepartmentTile } from './department-tile'

/**
 * The listing's hero (docs/shop-v2/PLAN.md §2.A): a compact full-bleed crimson band with the
 * title, the real item count, what a sender needs before buying (cut-off, receipt photo, J$ is
 * a guide), the find field at 1024+, and five photo tiles that switch department. Static:
 * cached loaders only; the find field streams in its own Suspense boundary.
 */
export function ShopBand({
  title,
  description,
  count,
  current,
  departments,
  allCount,
  cutoff,
  jmdPerUsd,
  findSlot,
}: {
  title: string
  description: string
  count: number
  /** The current department's slug; null on `/shop`. */
  current: string | null
  departments: { slug: string; name: string; count: number }[]
  allCount: number
  cutoff: string | null
  jmdPerUsd: number
  findSlot: ReactNode
}) {
  const currentName = departments.find((d) => d.slug === current)?.name
  const tiles = [
    { slug: null, name: 'All', count: allCount, href: '/shop' },
    ...departments.map((d) => ({ ...d, href: `/shop/${d.slug}` })),
  ]
  return (
    <section aria-labelledby="listing-title" className="bg-crimson text-on-dark on-dark-focus">
      <div className="mx-auto max-w-wide gutter pt-5 pb-5 md:pt-7 md:pb-6">
        <div className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            {currentName && (
              <nav aria-label="Breadcrumb" className="mb-2 text-xs md:text-small">
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
                  <li aria-current="page" className="font-medium text-on-dark">
                    {currentName}
                  </li>
                </ol>
              </nav>
            )}
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h1 id="listing-title" className="font-display text-h2 font-semibold text-balance">
                {title}
              </h1>
              <p className="text-small font-medium text-blush tabular-nums">
                {count} {count === 1 ? 'item' : 'items'}
              </p>
            </div>
            <p className="mt-1.5 hidden max-w-[60ch] text-small text-on-crimson-muted md:block">
              {description}
            </p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5">
              {cutoff && <CutoffNote cutoff={cutoff} tone="onDark" />}
              <p className="hidden items-start gap-2 text-small text-on-dark md:flex">
                <Receipt className="mt-0.5 size-icon shrink-0 text-blush" aria-hidden />A photo of
                the till receipt with every order
              </p>
              <p className="hidden items-start gap-2 text-small text-on-dark lg:flex">
                <DollarSign className="mt-0.5 size-icon shrink-0 text-blush" aria-hidden />
                J$ is a guide at {formatJmd(jmdPerUsd)} to USD$1
              </p>
            </div>
          </div>
          <div className="hidden lg:col-span-5 lg:block">{findSlot}</div>
        </div>

        <nav aria-label="Departments in the shop" className="mt-5 md:mt-6">
          <ul className="bleed-gutter -my-1.5 rail scroll-px-4 gap-3 py-1.5 lg:m-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:p-0">
            {tiles.map((t, i) => (
              <DepartmentTile
                key={t.href}
                href={t.href}
                name={t.name}
                count={t.count}
                slug={t.slug}
                current={t.slug === current}
                index={i}
              />
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}
