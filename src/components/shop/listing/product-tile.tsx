import Link from 'next/link'
import { ProductImage } from '@/components/shop/product-image'
import { Badge } from '@/components/ui/badge'
import { Price } from '@/components/ui/price'
import { cn } from '@/lib/cn'
import type { Product } from '@/lib/types'
import { TileBasketControl } from './tile-basket-control'

const sizes = '(min-width: 1280px) 232px, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw'

/**
 * One product on the listing, read like a shelf tag: photo (or a type-led placeholder), the
 * price first with J$ under it, the aisle, the name (the card's link), the size, an honest unit
 * price when one can be worked out, and the basket control pinned to the bottom so rows line up.
 */
export function ProductTile({
  product,
  label,
  unitPrice,
  jmdPerUsd,
  inBasket,
  eager = false,
  priority = false,
  firstNew = false,
}: {
  product: Product
  label: string | null
  unitPrice: string | null
  jmdPerUsd: number
  inBasket: number
  eager?: boolean
  priority?: boolean
  /** The first tile of a newly loaded batch: Load more moves focus here. */
  firstNew?: boolean
}) {
  const outOfStock = product.status !== 'visible'
  return (
    <article
      data-first-new={firstNew || undefined}
      className="group relative flex w-full flex-col rounded-lg border border-line bg-surface p-2.5 transition-colors duration-250 ease-out-soft hover:border-line-hover has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-signal sm:p-3"
    >
      <div className="relative">
        <ProductImage
          src={product.imagePath}
          alt={product.name}
          categoryId={product.categoryId}
          slug={product.slug}
          placeholder="label"
          name={product.name}
          size={product.size}
          sizes={sizes}
          eager={eager}
          priority={priority}
          className={cn('aspect-square', outOfStock && 'opacity-60')}
        />
        {outOfStock && <Badge className="absolute top-2 left-2">Out of stock</Badge>}
      </div>
      <Price cents={product.priceCents} jmdPerUsd={jmdPerUsd} size="md" className="mt-3" />
      {label && <p className="mt-2 text-xs font-medium text-ink-muted">{label}</p>}
      <h3
        className={cn(
          'line-clamp-2 text-small leading-snug font-semibold text-ink sm:text-body',
          !label && 'mt-2',
        )}
      >
        <Link
          href={`/product/${product.slug}`}
          className="after:absolute after:inset-0 focus-visible:outline-none"
        >
          {product.name}
        </Link>
      </h3>
      <p className="text-xs text-ink-muted">{product.size}</p>
      {unitPrice && <p className="text-xs font-medium text-ink-body tabular-nums">{unitPrice}</p>}
      <div className="relative z-raised mt-auto pt-3">
        <TileBasketControl
          productId={product.id}
          name={product.name}
          quantity={inBasket}
          inStock={!outOfStock}
        />
      </div>
    </article>
  )
}
