import Link from 'next/link'
import { Skeleton } from '@/components/ui/card'
import type { Scope } from '@/lib/shop-listing'

/**
 * The results' Suspense fallback, in the final geometry (docs/shop-v2/PLAN.md §2.F) so nothing
 * shifts when they stream in.
 * The results read the URL and the basket cookie, so they stream after the static shell, and
 * the browser needs JavaScript to show them. Without it, a plain note says so.
 */
export function ListingSkeleton({ scope }: { scope: Scope }) {
  return (
    <>
      <noscript>
        <div className="mx-auto max-w-wide gutter pt-6">
          <p className="rounded-md bg-warn-tint p-4 text-small text-ink">
            The product list needs JavaScript. Turn it on in your browser to see and filter the
            products, or{' '}
            <Link
              href="/baskets"
              className="font-semibold text-crimson underline underline-offset-2"
            >
              see our ready-made baskets
            </Link>
            .
          </p>
        </div>
      </noscript>
      <div role="status" className="sr-only">
        Loading products
      </div>
      {scope.kind === 'department' && (
        <div
          aria-hidden
          className="mx-auto flex max-w-wide gap-2 overflow-hidden gutter pt-3 lg:hidden"
        >
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="h-11 w-24 shrink-0 rounded-md" />
          ))}
        </div>
      )}
      <div
        aria-hidden
        className="mx-auto max-w-wide gutter pt-4 pb-12 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-8 lg:pt-6 lg:pb-16 xl:grid-cols-[16rem_minmax(0,1fr)]"
      >
        <div className="hidden flex-col lg:flex">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 border-t border-line pt-5 not-first:mt-5 first:border-t-0 first:pt-0"
            >
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6" />
              <Skeleton className="h-6" />
              <Skeleton className="h-6" />
            </div>
          ))}
        </div>
        <div className="min-w-0">
          <div className="bleed-gutter h-[61px] border-b border-line bg-surface lg:mx-0 lg:flex lg:h-11 lg:items-center lg:justify-between lg:border-0 lg:bg-transparent lg:px-0">
            <Skeleton className="hidden h-5 w-28 lg:block" />
            <Skeleton className="hidden h-11 w-64 lg:block" />
          </div>
          <Skeleton className="mt-3 h-5 w-32 lg:hidden" />
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="flex flex-col rounded-lg border border-line bg-surface p-3">
                <Skeleton className="aspect-square rounded-md" />
                <div className="mt-3 flex flex-col px-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="mt-1 h-4 w-2/3" />
                  <Skeleton className="mt-1.5 h-3 w-16" />
                  <Skeleton className="mt-2 h-5 w-20" />
                  <Skeleton className="mt-1 h-3 w-24" />
                </div>
                <Skeleton className="mt-3 h-11 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
