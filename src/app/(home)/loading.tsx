/**
 * Shown while the home page streams in on a slow connection or a first visit from another
 * page: the shape of the hero, its three tiles and the first shelf, pulsing softly.
 */
export default function HomeLoading() {
  return (
    <div className="mx-auto max-w-wide gutter pt-4 md:pt-5" aria-busy="true">
      <p className="sr-only" role="status">
        Loading the shop
      </p>
      <div className="h-[28rem] animate-pulse rounded-3xl bg-cream-deep lg:h-[32rem]" />
      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-44 animate-pulse rounded-3xl bg-cream-deep" />
        ))}
      </div>
      <div className="mt-12 h-8 w-64 animate-pulse rounded-full bg-cream-deep" />
      <div className="mt-6 grid grid-cols-2 gap-4 pb-16 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-64 animate-pulse rounded-3xl bg-cream-deep" />
        ))}
      </div>
    </div>
  )
}
