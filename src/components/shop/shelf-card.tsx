import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'
import { hasProductPhoto, ProductImage } from '@/components/shop/product-image'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/cn'
import { formatJmd, formatUsd, usdCentsToJmd } from '@/lib/format'
import type { Product } from '@/lib/types'

/**
 * The one product card (docs/shop-v2/PLAN.md §2.C3), lifted from the home shelf: the pack shot
 * whole on a grey square, the name (the card's link, two lines reserved so rows line up), the
 * size, the USD price with J$ under it, an honest unit price when one can be worked out, and the
 * basket control pinned to the bottom. The home shelf and the shop grid both render it; only the
 * control slot differs.
 */
export function ShelfCard({
  product,
  jmdPerUsd,
  action,
  unitPrice = null,
  sizes,
  eager = false,
  priority = false,
  firstNew = false,
  placeholder = 'label',
  className,
  style,
}: {
  product: Product
  jmdPerUsd: number
  /** The basket control: the home's add button or the listing's stepper. */
  action: ReactNode
  unitPrice?: string | null
  sizes: string
  /** Load at once (the first row). */
  eager?: boolean
  /** High fetch priority (the first two cards on a phone). */
  priority?: boolean
  /** The first card of a newly loaded batch: Load more moves focus here. */
  firstNew?: boolean
  /** What shows when there is no photo. */
  placeholder?: 'icon' | 'label'
  className?: string
  style?: CSSProperties
}) {
  const outOfStock = product.status !== 'visible'
  return (
    <article
      data-first-new={firstNew || undefined}
      style={style}
      className={cn(
        'group relative flex h-full w-full card-rise flex-col rounded-lg border border-line bg-surface p-3 hover:border-line-hover has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-signal',
        className,
      )}
    >
      <div className="relative">
        <ProductImage
          src={product.imagePath}
          alt=""
          categoryId={product.categoryId}
          slug={product.slug}
          placeholder={placeholder}
          name={product.name}
          size={product.size}
          sizes={sizes}
          eager={eager}
          priority={priority}
          className={cn(
            'aspect-square rounded-md bg-surface-muted',
            hasProductPhoto(product) && 'photo-loading',
            outOfStock && 'opacity-60',
          )}
          imgClassName="object-contain p-3 mix-blend-multiply transition-[opacity,scale] duration-500 ease-hover group-hover:scale-[1.04] motion-reduce:transition-none"
        />
        {outOfStock && <Badge className="absolute top-2 left-2">Out of stock</Badge>}
      </div>
      <div className="mt-3 px-1 text-small">
        <h3 className="line-clamp-2 h-[2lh] leading-snug font-semibold text-ink">
          <Link
            href={`/product/${product.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-0.5 truncate text-xs text-ink-muted">{product.size}</p>
        <p className="mt-2 text-price font-semibold text-ink tabular-nums">
          {formatUsd(product.priceCents)}
        </p>
        <p className="text-xs font-medium text-ink-muted tabular-nums">
          about {formatJmd(usdCentsToJmd(product.priceCents, jmdPerUsd))}
        </p>
        {unitPrice && <p className="text-xs font-medium text-ink-body tabular-nums">{unitPrice}</p>}
      </div>
      <div className="relative z-raised mt-auto pt-3">{action}</div>
    </article>
  )
}
