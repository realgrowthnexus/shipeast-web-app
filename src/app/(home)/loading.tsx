/**
 * Shown while the home page streams in on a slow connection or a first visit from another
 * page: the shape of the hero (one banner and three small cards beside it on wide screens),
 * and the department tiles, pulsing softly.
 */
export default function HomeLoading() {
  return (
    <div className="mx-auto max-w-wide gutter pt-4 md:pt-6" aria-busy="true">
      <p className="sr-only" role="status">
        Loading the shop
      </p>
      <div className="grid gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-12 xl:grid-rows-3">
        <div className="h-[36rem] animate-pulse rounded-2xl bg-cream-deep md:col-span-3 md:h-[25rem] lg:h-[27.5rem] xl:col-span-8 xl:row-span-3 xl:h-[30rem]" />
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-xl bg-cream-deep xl:col-span-4 xl:h-auto"
          />
        ))}
      </div>
      <div className="mt-12 h-8 w-64 animate-pulse rounded-md bg-cream-deep" />
      <div className="mt-6 grid grid-cols-2 gap-3 pb-16 sm:gap-4 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-56 animate-pulse rounded-xl bg-cream-deep" />
        ))}
      </div>
    </div>
  )
}
