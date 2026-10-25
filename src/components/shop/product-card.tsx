import Link from 'next/link'
import type { ReactNode } from 'react'
import { Badge } from '@/components/ui/badge'
import { Price } from '@/components/ui/price'
import type { Basket, Product } from '@/lib/types'
import { ProductImage } from './product-image'

export function ProductCard({
  product,
  jmdPerUsd,
  action,
}: {
  product: Product
  jmdPerUsd: number
  /** Add-to-basket control; the card stays a plain link without it. */
  action?: ReactNode
}) {
  const outOfStock = product.status === 'out_of_stock'
  return (
    <article className="group relative flex w-full flex-col gap-3 rounded-lg border border-line bg-blush-100 p-3 transition-shadow hover:shadow-card">
      <div className="relative">
        <ProductImage
          src={product.imagePath}
          alt={product.name}
          categoryId={product.categoryId}
          className={outOfStock ? 'opacity-60 grayscale-[40%]' : undefined}
        />
        {outOfStock && <Badge className="absolute top-2 left-2">Out of stock</Badge>}
      </div>
      <div className="flex flex-1 flex-col gap-1 px-1">
        <h3 className="leading-snug font-semibold text-ink">
          <Link href={`/product/${product.slug}`} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-ink-muted">{product.size}</p>
      </div>
      <div className="flex flex-wrap items-end justify-between gap-2 px-1 pb-1">
        <Price cents={product.priceCents} jmdPerUsd={jmdPerUsd} />
        {action && !outOfStock && <div className="relative z-10">{action}</div>}
      </div>
    </article>
  )
}

export function BasketCard({
  basket,
  jmdPerUsd,
  itemCount,
  separateCents,
}: {
  basket: Basket
  jmdPerUsd: number
  itemCount: number
  /** What the items would cost bought one by one. */
  separateCents: number
}) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg bg-premium text-white shadow-lift">
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-sm text-blush">{itemCount} items in one basket</p>
        <h3 className="text-xl leading-tight font-extrabold">
          <Link href={`/baskets/${basket.slug}`} className="after:absolute after:inset-0">
            {basket.name}
          </Link>
        </h3>
        <p className="text-white/80">{basket.description}</p>
      </div>
      <div className="flex items-end justify-between gap-3 bg-oxblood/40 px-5 py-4">
        <Price
          cents={basket.priceCents}
          jmdPerUsd={jmdPerUsd}
          was={separateCents}
          className="[&_*]:text-white [&_s]:text-white/60 [&>span:last-child]:text-blush"
        />
        {separateCents > basket.priceCents && (
          <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-crimson-deep">
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
}: {
  href: string
  name: string
  description: string
  count: number
  icon: ReactNode
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-lg border border-line bg-blush-100 p-4 transition-[box-shadow,border-color] hover:border-blush hover:shadow-card"
    >
      <span className="grid size-14 shrink-0 place-items-center rounded-md bg-premium text-white [&_svg]:size-7">
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="font-bold text-ink">{name}</span>
        <span className="text-sm text-ink-muted">{description}</span>
        <span className="mt-1 text-xs font-semibold text-crimson">{count} items</span>
      </span>
    </Link>
  )
}
