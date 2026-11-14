import { ArrowRight, ShoppingBasket } from 'lucide-react'
import Link from 'next/link'
import { StockPhoto } from '@/components/site/stock-photo'
import { formatUsd } from '@/lib/format'
import type { Shortcut } from '@/lib/shop-listing'
import { basketPhotos } from '@/lib/stock-photos'

/**
 * The one ready-made basket in the grid: a solid oxblood cell in the product card's geometry,
 * only on an unfiltered first batch, from real basket data. On a department page it is that
 * department's basket; on `/shop` it points to all of them.
 */
export function BasketShortcutTile({ shortcut }: { shortcut: Shortcut }) {
  const basket = shortcut.kind === 'basket' ? shortcut.summary.basket : null
  const photo = basket ? basketPhotos[basket.slug] : 'basketFood'
  const href = basket ? `/baskets/${basket.slug}` : '/baskets'
  return (
    <article className="group relative flex h-full w-full card-rise flex-col rounded-lg bg-oxblood p-3 text-on-dark on-dark-focus has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-blush">
      {photo ? (
        <StockPhoto
          name={photo}
          alt=""
          sizes="(min-width: 1280px) 236px, (min-width: 1024px) 28vw, (min-width: 768px) 31vw, 46vw"
          zoom
          className="photo-loading aspect-square rounded-md"
        />
      ) : (
        <span className="grid aspect-square place-items-center rounded-md bg-crimson-deep">
          <ShoppingBasket className="size-8 text-blush" aria-hidden />
        </span>
      )}
      <div className="mt-3 px-1">
        {basket && <p className="text-xs font-semibold text-blush">Ready-made basket</p>}
        <h3 className="mt-0.5 line-clamp-2 font-display text-small leading-snug font-semibold">
          {basket ? basket.name : 'Ready-made baskets'}
        </h3>
        <p className="mt-1 text-xs text-on-oxblood-muted tabular-nums">
          {shortcut.kind === 'basket'
            ? `${shortcut.summary.itemCount} ${shortcut.summary.itemCount === 1 ? 'item' : 'items'} for ${formatUsd(shortcut.summary.basket.priceCents)}`
            : `${shortcut.count} ${shortcut.count === 1 ? 'basket' : 'baskets'} from ${formatUsd(shortcut.fromCents)}`}
        </p>
      </div>
      <Link
        href={href}
        className="mt-auto flex min-h-control items-center gap-1.5 px-1 pt-3 text-small font-semibold underline-offset-4 group-hover:underline after:absolute after:inset-0 focus-visible:outline-none"
      >
        {basket ? 'See what’s inside' : 'See the baskets'}
        <ArrowRight
          className="size-icon shrink-0 transition-transform duration-250 group-hover:translate-x-[3px]"
          aria-hidden
        />
      </Link>
    </article>
  )
}
