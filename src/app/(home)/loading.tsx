/**
 * Shown while the home page streams in on a slow connection or a first visit from another
 * page: the shape of the hero (one banner and three small cards in a row under it),
 * and the department tiles, pulsing softly.
 */
export default function HomeLoading() {
  return (
    <div className="mx-auto max-w-wide gutter pt-4 md:pt-6" aria-busy="true">
      <p className="sr-only" role="status">
        Loading the shop
      </p>
      <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
        <div className="h-[36rem] animate-pulse rounded-2xl bg-surface-strong md:col-span-3 md:h-[25rem] lg:h-[27.5rem] xl:h-[28.75rem]" />
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-32 animate-pulse rounded-xl bg-surface-strong" />
        ))}
      </div>
      <div className="mt-12 h-8 w-64 animate-pulse rounded-md bg-surface-strong" />
      <div className="mt-6 grid grid-cols-2 gap-3 pb-16 sm:gap-4 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-56 animate-pulse rounded-xl bg-surface-strong" />
        ))}
      </div>
    </div>
  )
}
