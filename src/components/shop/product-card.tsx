import Link from 'next/link'
import type { ReactNode } from 'react'
import { StockPhoto } from '@/components/site/stock-photo'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/cn'
import { Price } from '@/components/ui/price'
import { basketPhotos, type StockPhotoKey } from '@/lib/stock-photos'
import type { Basket, Product } from '@/lib/types'
import { ProductImage } from './product-image'

export function ProductCard({
  product,
  jmdPerUsd,
  category,
  action,
}: {
  product: Product
  jmdPerUsd: number
  /** The department name, shown small above the title in mixed grids. */
  category?: string
  /** Add-to-basket control; the card stays a plain link without it. */
  action?: ReactNode
}) {
  const outOfStock = product.status === 'out_of_stock'
  return (
    <article className="group relative flex w-full flex-col gap-3 rounded-lg border border-line bg-surface p-3 transition-[box-shadow,border-color] duration-250 ease-out-soft hover:border-line-strong hover:shadow-lift">
      <div className="relative">
        <ProductImage
          src={product.imagePath}
          alt={product.name}
          categoryId={product.categoryId}
          slug={product.slug}
          className={cn('aspect-square', outOfStock && 'opacity-60 grayscale-[40%]')}
        />
        {outOfStock && <Badge className="absolute top-2 left-2">Out of stock</Badge>}
      </div>
      <div className="flex flex-1 flex-col gap-0.5 px-0.5">
        {category && <p className="text-xs font-medium text-ink-muted">{category}</p>}
        <h3 className="line-clamp-2 text-small leading-snug font-semibold text-ink sm:text-body">
          <Link href={`/product/${product.slug}`} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>
        <p className="text-xs text-ink-muted">{product.size}</p>
      </div>
      {/* Price beside a small Add on wide cards; stacked, with a full-width Add, on narrow ones */}
      <div className="flex flex-col gap-2.5 px-0.5 xl:flex-row xl:items-end xl:justify-between">
        <Price cents={product.priceCents} jmdPerUsd={jmdPerUsd} size="sm" />
        {action && !outOfStock && (
          <div className="relative z-10 [&_button]:w-full xl:[&_button]:w-auto">{action}</div>
        )}
      </div>
    </article>
  )
}

export function BasketCard({
  basket,
  jmdPerUsd,
  itemCount,
  separateCents,
  action,
}: {
  basket: Basket
  jmdPerUsd: number
  itemCount: number
  /** What the items would cost bought one by one. */
  separateCents: number
  /** Usually a full-width add button, under the price. */
  action?: ReactNode
}) {
  const photo = basketPhotos[basket.slug]
  return (
    <article className="group relative flex hover-lift flex-col overflow-hidden rounded-lg border border-line bg-surface text-ink hover:border-line-strong">
      {photo && (
        <StockPhoto
          name={photo}
          sizes="(min-width: 1024px) 368px, (min-width: 768px) 50vw, 100vw"
          className="aspect-video rounded-none"
          zoom
        />
      )}
      <div className="flex flex-1 flex-col gap-2 p-card">
        <p className="text-small font-semibold text-ink-muted">{itemCount} items in one basket</p>
        <h3 className="text-h3">
          <Link href={`/baskets/${basket.slug}`} className="after:absolute after:inset-0">
            {basket.name}
          </Link>
        </h3>
        <p className="text-ink-body">{basket.description}</p>
      </div>
      {/* Gold means a saving, everywhere on the site: a small tag, never a whole strip */}
      <div className="flex items-end justify-between gap-3 border-t border-line px-5 py-4 text-ink">
        <Price cents={basket.priceCents} jmdPerUsd={jmdPerUsd} was={separateCents} tone="ink" />
        {separateCents > basket.priceCents && (
          <span className="rounded-sm bg-jm-gold px-2 py-0.5 text-xs font-bold whitespace-nowrap text-ink">
            Save {Math.round(((separateCents - basket.priceCents) / separateCents) * 100)}%
          </span>
        )}
      </div>
      {action && <div className="relative z-10 px-5 pb-5 [&_button]:w-full">{action}</div>}
    </article>
  )
}

export function CategoryTile({
  href,
  name,
  description,
  count,
  icon,
  photo,
}: {
  href: string
  name: string
  description: string
  count: number
  icon: ReactNode
  /** Shown in place of the icon when the category has a photo. */
  photo?: StockPhotoKey
}) {
  return (
    <Link
      href={href}
      className="group flex hover-lift items-center gap-4 rounded-lg border border-line bg-surface p-4 hover:border-blush"
    >
      {photo ? (
        <StockPhoto
          name={photo}
          sizes="96px"
          className="size-20 shrink-0 rounded-md sm:size-24"
          zoom
        />
      ) : (
        <span className="grid size-14 shrink-0 place-items-center rounded-md bg-crimson text-white [&_svg]:size-7">
          {icon}
        </span>
      )}
      <span className="flex flex-col">
        <span className="font-bold text-ink">{name}</span>
        <span className="text-small text-ink-muted">{description}</span>
        <span className="mt-1 text-xs font-semibold text-crimson">{count} items</span>
      </span>
    </Link>
  )
}
