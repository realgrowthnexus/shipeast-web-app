/**
 * The product page while it loads (docs/product-v2/PLAN.md §2.J), in the final geometry so
 * nothing jumps when the page arrives: the trail, the stage, the buy box down to the ticket.
 */
export function ProductSkeleton() {
  return (
    <div aria-busy="true" className="mx-auto w-full max-w-wide gutter">
      <span className="sr-only">Loading the item</span>
      <div className="pt-2 pb-1 lg:pt-5 lg:pb-4">
        <div className="flex h-control items-center">
          <div className="h-4 w-48 skeleton" />
        </div>
      </div>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
        <div className="mx-auto aspect-[4/3] w-full skeleton rounded-2xl md:aspect-square md:max-w-[34rem] lg:col-span-6 lg:max-w-none" />
        <div className="flex flex-col pt-6 lg:col-span-5 lg:col-start-8 lg:pt-0">
          <div className="h-6 w-28 skeleton" />
          <div className="mt-3 h-8 w-4/5 skeleton" />
          <div className="mt-2 h-4 w-24 skeleton" />
          <div className="mt-5 h-6 w-40 skeleton" />
          <div className="mt-5 h-control w-full skeleton" />
          <div className="mt-6 flex flex-col gap-3 border-t border-line pt-5">
            <div className="h-4 w-full skeleton" />
            <div className="h-4 w-11/12 skeleton" />
            <div className="h-4 w-3/4 skeleton" />
          </div>
          <div className="mt-6 h-28 skeleton rounded-xl" />
        </div>
      </div>
    </div>
  )
}

/** Four shelf-card shapes, while the related rail waits for the basket cookie. */
export function RailSkeleton() {
  return (
    <div aria-busy="true" className="pt-10 lg:pt-12">
      <div className="h-7 w-56 skeleton" />
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`flex-col rounded-lg border border-line bg-surface p-3 ${i >= 2 ? 'hidden md:flex' : 'flex'}`}
          >
            <div className="aspect-square w-full skeleton" />
            <div className="mt-3 h-4 w-11/12 skeleton" />
            <div className="mt-2 h-3 w-1/2 skeleton" />
            <div className="mt-2 h-5 w-1/3 skeleton" />
            <div className="mt-3 h-control w-full skeleton" />
          </div>
        ))}
      </div>
    </div>
  )
}
