import { ShoppingBasket } from 'lucide-react'
import Link from 'next/link'
import { readBasket } from '@/lib/basket/cookie'
import { countItems } from '@/lib/basket/state'

function BasketButton({ count }: { count: number | null }) {
  return (
    <Link
      href="/basket"
      className="relative flex min-h-11 items-center gap-2 rounded-md bg-premium px-3.5 font-semibold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.25)]"
    >
      <ShoppingBasket className="size-5" aria-hidden />
      <span className="hidden sm:inline">Basket</span>
      <span
        className="grid min-w-6 place-items-center rounded-full bg-white px-1.5 text-xs font-bold text-crimson-deep tabular-nums"
        aria-hidden={count === null}
      >
        {count ?? ' '}
      </span>
      {count !== null && <span className="sr-only">{count === 1 ? 'item' : 'items'}</span>}
    </Link>
  )
}

/** Reads the basket cookie, so it streams in after the static header. */
export async function BasketLink() {
  return <BasketButton count={countItems(await readBasket())} />
}

export function BasketLinkFallback() {
  return <BasketButton count={null} />
}
