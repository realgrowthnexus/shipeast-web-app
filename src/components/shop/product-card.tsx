import Link from 'next/link'
import type { ReactNode } from 'react'
import { StockPhoto } from '@/components/site/stock-photo'
import { Badge } from '@/components/ui/badge'
import { Price } from '@/components/ui/price'
import { cn } from '@/lib/cn'
import { basketPhotos, type StockPhotoKey } from '@/lib/stock-photos'
import type { Basket, Product } from '@/lib/types'
import { ProductImage } from './product-image'

export function ProductCard({
  product,
  jmdPerUsd,
  action,
  tone = 'light',
}: {
  product: Product
  jmdPerUsd: number
  /** Add-to-basket control; the card stays a plain link without it. */
  action?: ReactNode
  /** `crimson` for store shelves: a red card with the photo on a light panel. */
  tone?: 'light' | 'crimson'
}) {
  const outOfStock = product.status === 'out_of_stock'
  const red = tone === 'crimson'
  return (
    <article
      className={cn(
        'group relative flex w-full hover-lift flex-col gap-3 rounded-lg p-3',
        red ? 'bg-crimson text-white' : 'border border-line bg-surface hover:border-blush',
      )}
    >
      <div className={cn('relative', red && 'rounded-md bg-surface')}>
        <ProductImage
          src={product.imagePath}
          alt={product.name}
          categoryId={product.categoryId}
          slug={product.slug}
          className={outOfStock ? 'opacity-60 grayscale-[40%]' : undefined}
        />
        {outOfStock && <Badge className="absolute top-2 left-2">Out of stock</Badge>}
      </div>
      <div className="flex flex-1 flex-col gap-1 px-1">
        <h3 className={cn('leading-snug font-semibold', red ? 'text-white' : 'text-ink')}>
          <Link href={`/product/${product.slug}`} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>
        <p className={cn('text-small', red ? 'text-on-crimson-muted' : 'text-ink-muted')}>
          {product.size}
        </p>
      </div>
      <div className="flex flex-col gap-3 px-1 pb-1">
        <Price cents={product.priceCents} jmdPerUsd={jmdPerUsd} tone={red ? 'white' : 'ink'} />
        {action && !outOfStock && <div className="relative z-10 [&_button]:w-full">{action}</div>}
      </div>
    </article>
  )
}

/** Flag colours for a basket's price strip, rotated along a row of baskets. */
const strips = {
  oxblood: { strip: 'bg-crimson-800', price: 'white', pill: 'bg-white text-crimson-deep' },
  gold: { strip: 'bg-jm-gold text-ink', price: 'ink', pill: 'bg-crimson text-white' },
  green: { strip: 'bg-jm-green text-jm-black', price: 'black', pill: 'bg-white text-ink' },
  black: { strip: 'bg-jm-black text-white', price: 'white', pill: 'bg-jm-gold text-ink' },
} as const

export type BasketStrip = keyof typeof strips

/** Strip colours for the nth basket in a row: gold, green, black, then round again. */
export const flagStrip = (i: number): BasketStrip => (['gold', 'green', 'black'] as const)[i % 3]

export function BasketCard({
  basket,
  jmdPerUsd,
  itemCount,
  separateCents,
  strip = 'oxblood',
}: {
  basket: Basket
  jmdPerUsd: number
  itemCount: number
  /** What the items would cost bought one by one. */
  separateCents: number
  /** Colour of the price strip at the foot of the card. */
  strip?: BasketStrip
}) {
  const photo = basketPhotos[basket.slug]
  const tone = strips[strip]
  return (
    <article className="group relative flex hover-lift flex-col overflow-hidden rounded-xl bg-crimson text-white">
      {photo && (
        <StockPhoto
          name={photo}
          sizes="(min-width: 1024px) 368px, (min-width: 768px) 50vw, 100vw"
          className="aspect-video rounded-none"
          zoom
        />
      )}
      <div className="flex flex-1 flex-col gap-2 p-card">
        <p className="text-small text-blush">{itemCount} items in one basket</p>
        <h3 className="text-h3">
          <Link href={`/baskets/${basket.slug}`} className="after:absolute after:inset-0">
            {basket.name}
          </Link>
        </h3>
        <p className="text-on-crimson-muted">{basket.description}</p>
      </div>
      <div className={cn('flex items-end justify-between gap-3 px-5 py-4', tone.strip)}>
        <Price
          cents={basket.priceCents}
          jmdPerUsd={jmdPerUsd}
          was={separateCents}
          tone={tone.price}
        />
        {separateCents > basket.priceCents && (
          <span className={cn('rounded-full px-2.5 py-1 text-xs font-bold', tone.pill)}>
            Save {Math.round(((separateCents - basket.priceCents) / separateCents) * 100)}%
          </span>
        )}
      </div>
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
