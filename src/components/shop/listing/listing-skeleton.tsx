import Link from 'next/link'
import { Skeleton } from '@/components/ui/card'

/**
 * The results' Suspense fallback, in the final geometry so nothing shifts when they stream in.
 * The results read the URL and the basket cookie, so they stream after the static shell, and
 * the browser needs JavaScript to show them. Without it, a plain note says so.
 */
export function ListingSkeleton() {
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
      <div
        aria-hidden
        className="mx-auto max-w-wide gutter pt-6 pb-16 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-8 lg:pt-8 lg:pb-20 xl:grid-cols-[16rem_minmax(0,1fr)]"
      >
        <div className="hidden flex-col gap-5 lg:flex">
          <Skeleton className="h-11" />
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="flex flex-col gap-2 border-t border-line pt-5">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8" />
              <Skeleton className="h-8" />
              <Skeleton className="h-8" />
            </div>
          ))}
        </div>
        <div className="min-w-0">
          <div className="mb-3 flex flex-col gap-1.5 md:hidden">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-11" />
          </div>
          <div className="bleed-gutter mb-4 h-[60px] border-b border-line bg-surface lg:mx-0 lg:h-12 lg:border-0 lg:bg-transparent lg:px-0" />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:gap-y-6 xl:grid-cols-4">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className="flex flex-col rounded-lg border border-line bg-surface p-2.5 sm:p-3"
              >
                <Skeleton className="aspect-square" />
                <Skeleton className="mt-3 h-6 w-20" />
                <Skeleton className="mt-1 h-3 w-16" />
                <Skeleton className="mt-2 h-4 w-full" />
                <Skeleton className="mt-1 h-4 w-2/3" />
                <Skeleton className="mt-1 h-3 w-12" />
                <Skeleton className="mt-3 h-11" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
