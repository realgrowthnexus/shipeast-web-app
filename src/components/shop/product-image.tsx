import { Baby, Pill, ShoppingBasket, SprayCan, Wheat, type LucideIcon } from 'lucide-react'
import Image from 'next/image'
import { StockImage } from '@/components/site/stock-photo'
import { cn } from '@/lib/cn'
import { productPhotos } from '@/lib/photos/products'

const icons: Record<string, LucideIcon> = {
  'cat-groceries': Wheat,
  'cat-household': SprayCan,
  'cat-pharmacy': Pill,
  'cat-baby': Baby,
}

/**
 * Product photo. An uploaded photo wins; otherwise a stock photo of that exact item (by slug);
 * otherwise a branded placeholder. We never use PriceSmart's own images.
 */
export function ProductImage({
  src,
  alt,
  categoryId,
  slug,
  className,
  sizes = '(min-width: 1024px) 25vw, 50vw',
}: {
  src: string | null
  alt: string
  categoryId?: string
  /** The product's slug, to find its stock photo when nothing was uploaded. */
  slug?: string
  className?: string
  sizes?: string
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
        className={cn('aspect-[4/3] rounded-md', className)}
      />
    )
  return (
    <div
      className={cn('relative aspect-[4/3] overflow-hidden rounded-md bg-surface-tint', className)}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <div className="absolute inset-0 grid place-items-center" role="img" aria-label={alt}>
          <Icon className="size-1/3 text-crimson/35" strokeWidth={1.5} aria-hidden />
        </div>
      )}
    </div>
  )
}
