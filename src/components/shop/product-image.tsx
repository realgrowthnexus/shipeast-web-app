import { Baby, Pill, ShoppingBasket, SprayCan, Wheat, type LucideIcon } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/cn'

const icons: Record<string, LucideIcon> = {
  'cat-groceries': Wheat,
  'cat-household': SprayCan,
  'cat-pharmacy': Pill,
  'cat-baby': Baby,
}

/**
 * Product photo, or a branded placeholder until ShipEast supplies real photos. We never use
 * PriceSmart's own images.
 */
export function ProductImage({
  src,
  alt,
  categoryId,
  className,
  sizes = '(min-width: 1024px) 25vw, 50vw',
}: {
  src: string | null
  alt: string
  categoryId?: string
  className?: string
  sizes?: string
}) {
  const Icon = (categoryId && icons[categoryId]) || ShoppingBasket
  return (
    <div
      className={cn(
        'relative aspect-[4/3] overflow-hidden rounded-md bg-gradient-to-br from-blush-200 to-blush',
        className,
      )}
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
