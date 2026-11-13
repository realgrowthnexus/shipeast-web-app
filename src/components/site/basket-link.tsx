import { ShoppingBasket } from 'lucide-react'
import Link from 'next/link'
import { readBasket } from '@/lib/basket/cookie'
import { countItems } from '@/lib/basket/state'
import { cn } from '@/lib/cn'

function BasketButton({ count, className }: { count: number | null; className?: string }) {
  return (
    <Link
      href="/basket"
      className={cn(
        'relative flex min-h-control items-center gap-2 rounded-full bg-crimson px-4 font-bold text-on-dark transition-colors duration-150 hover:bg-crimson-deep active:translate-y-px',
        className,
      )}
    >
      <ShoppingBasket className="size-5" aria-hidden />
      <span className="hidden sm:inline">Basket</span>
      <span
        className="grid min-w-6 place-items-center rounded-full bg-surface px-1.5 text-xs font-bold text-crimson-deep tabular-nums"
        aria-hidden={count === null}
      >
        {count ?? ' '}
      </span>
      {count !== null && <span className="sr-only">{count === 1 ? 'item' : 'items'}</span>}
    </Link>
  )
}

/** Reads the basket cookie, so it streams in after the static header. */
export async function BasketLink({ className }: { className?: string } = {}) {
  return <BasketButton count={countItems(await readBasket())} className={className} />
}

export function BasketLinkFallback({ className }: { className?: string } = {}) {
  return <BasketButton count={null} className={className} />
}
