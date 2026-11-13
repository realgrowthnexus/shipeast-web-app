import { Baby, Pill, ShoppingBasket, SprayCan, Wheat, type LucideIcon } from 'lucide-react'
import { FadeImage, StockImage } from '@/components/site/stock-photo'
import { cn } from '@/lib/cn'
import { productPhotos } from '@/lib/photos/products'

const icons: Record<string, LucideIcon> = {
  'cat-groceries': Wheat,
  'cat-household': SprayCan,
  'cat-pharmacy': Pill,
  'cat-baby': Baby,
}

/** True when a product has a real photo: an upload or a stock photo of that exact item. */
export function hasProductPhoto(product: { imagePath: string | null; slug: string }) {
  return Boolean(product.imagePath || productPhotos[product.slug])
}

/**
 * Product photo. An uploaded photo wins; otherwise a stock photo of that exact item (by slug);
 * otherwise a branded placeholder: a plain icon (`icon`), or a shelf tag with the department
 * icon, the name in heavy type and the size (`label`, the shop listing). We never use
 * PriceSmart's own images.
 */
export function ProductImage({
  src,
  alt,
  categoryId,
  slug,
  className,
  sizes = '(min-width: 1024px) 25vw, 50vw',
  placeholder = 'icon',
  name,
  size,
  eager = false,
  priority = false,
  imgClassName,
}: {
  src: string | null
  alt: string
  categoryId?: string
  /** The product's slug, to find its stock photo when nothing was uploaded. */
  slug?: string
  className?: string
  sizes?: string
  /** What shows when there is no photo. `label` needs `name` (and `size`). */
  placeholder?: 'icon' | 'label'
  name?: string
  size?: string
  /** Load at once (the first row of a grid). */
  eager?: boolean
  /** High fetch priority (the first two tiles on a phone). */
  priority?: boolean
  /** Replaces the pack shot's image classes (the home shelf blends it into a grey well). */
  imgClassName?: string
}) {
  const Icon = (categoryId && icons[categoryId]) || ShoppingBasket
  const stock = !src && slug ? productPhotos[slug] : undefined
  if (stock)
    return (
      <StockImage
        photo={stock}
        alt={alt}
        sizes={sizes}
        zoom
        eager={eager}
        priority={priority}
        className={cn('aspect-[4/3] rounded-md', className)}
      />
    )
  if (!src && placeholder === 'label')
    return (
      // Decorative: the name is the card's link text right below.
      <div
        aria-hidden
        className={cn(
          'relative grid aspect-square place-items-center rounded-md bg-surface-muted p-4 text-center ring-1 ring-line ring-inset',
          className,
        )}
      >
        <Icon className="absolute top-3 left-3 size-icon-lg text-crimson" aria-hidden />
        <span className="flex flex-col items-center">
          <span className="line-clamp-3 text-body font-extrabold text-balance text-ink sm:text-h3 sm:font-extrabold">
            {name}
          </span>
          {size && <span className="mt-1 text-small font-semibold text-ink-muted">{size}</span>}
        </span>
      </div>
    )
  // A pack shot on white (ShipEast's own product pictures): show all of it, on white.
  const packShot = Boolean(src?.startsWith('/products/'))
  return (
    <div
      className={cn(
        'relative aspect-[4/3] overflow-hidden rounded-md',
        packShot ? 'bg-surface' : 'bg-page',
        className,
      )}
    >
      {src ? (
        <FadeImage
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          loading={eager ? 'eager' : undefined}
          fetchPriority={priority ? 'high' : undefined}
          className={cn(
            packShot
              ? (imgClassName ??
                  'object-contain p-2 transition-[opacity,scale] duration-400 ease-out-soft group-hover:scale-[1.04] motion-reduce:transition-none')
              : 'object-cover',
          )}
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center" role="img" aria-label={alt}>
          <Icon className="size-8 text-ink-muted" strokeWidth={1.5} aria-hidden />
        </div>
      )}
    </div>
  )
}
