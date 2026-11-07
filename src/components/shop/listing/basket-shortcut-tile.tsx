import { ChevronRight, ShoppingBasket } from 'lucide-react'
import Link from 'next/link'
import { StockPhoto } from '@/components/site/stock-photo'
import { formatUsd } from '@/lib/format'
import type { Shortcut } from '@/lib/shop-listing'
import { basketPhotos } from '@/lib/stock-photos'

/**
 * The one ready-made basket in the grid: a solid oxblood cell, only on an unfiltered first
 * batch, from real basket data. On a department page it is that department's basket; on
 * `/shop` it points to all of them.
 */
export function BasketShortcutTile({ shortcut }: { shortcut: Shortcut }) {
  const basket = shortcut.kind === 'basket' ? shortcut.summary.basket : null
  const photo = basket ? basketPhotos[basket.slug] : 'basketFood'
  const href = basket ? `/baskets/${basket.slug}` : '/baskets'
  return (
    <article className="group relative flex w-full flex-col rounded-lg bg-oxblood p-2.5 text-on-dark on-dark-focus has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-blush sm:p-3">
      {photo ? (
        <StockPhoto
          name={photo}
          alt=""
          sizes="(min-width: 1280px) 232px, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          zoom
          className="aspect-square rounded-md"
        />
      ) : (
        <span className="grid aspect-square place-items-center rounded-md bg-crimson-deep">
          <ShoppingBasket className="size-8 text-blush" aria-hidden />
        </span>
      )}
      {basket && <p className="mt-3 text-xs font-semibold text-blush">Ready-made basket</p>}
      <h3 className={basket ? 'mt-1 line-clamp-2 text-body font-bold' : 'mt-3 text-body font-bold'}>
        {basket ? basket.name : 'Ready-made baskets'}
      </h3>
      <p className="mt-1 text-small text-on-oxblood-muted tabular-nums">
        {shortcut.kind === 'basket'
          ? `${shortcut.summary.itemCount} ${shortcut.summary.itemCount === 1 ? 'item' : 'items'} for ${formatUsd(shortcut.summary.basket.priceCents)}`
          : `${shortcut.count} ${shortcut.count === 1 ? 'basket' : 'baskets'} from ${formatUsd(shortcut.fromCents)}`}
      </p>
      <Link
        href={href}
        className="mt-auto flex min-h-control items-center gap-1 pt-2 text-small font-semibold underline-offset-4 group-hover:underline after:absolute after:inset-0 focus-visible:outline-none"
      >
        {basket ? 'See what’s inside' : 'See the baskets'}
        <ChevronRight className="size-icon shrink-0" aria-hidden />
      </Link>
    </article>
  )
}
