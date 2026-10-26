'use client'

import Image, { type ImageLoader } from 'next/image'
import { cn } from '@/lib/cn'
import { type StockPhoto as Photo, type StockPhotoKey, stockPhotos } from '@/lib/stock-photos'

/**
 * Unsplash resizes and converts on its own CDN, so we ask it for the exact width instead of
 * running the photo through Next's optimizer a second time.
 */
const unsplashLoader: ImageLoader = ({ src, width, quality }) =>
  `${src}?auto=format&fit=max&w=${width}&q=${quality ?? 70}`

/**
 * A stock photo from the registry, cropped to the box it sits in. Give it an aspect class
 * (`aspect-4/3`) or a sized parent, and always pass `sizes` so phones download a phone-sized file.
 * No overlays or text on top: flat brand colours sit beside photos, never over them.
 */
export function StockPhoto({
  name,
  sizes,
  className,
  preload = false,
  zoom = false,
}: {
  name: StockPhotoKey
  sizes: string
  className?: string
  /** Only for the one photo at the top of the home page. */
  preload?: boolean
  /** Zoom in slightly when a parent with `group` is hovered (cards that are links). */
  zoom?: boolean
}) {
  return (
    <StockImage
      photo={stockPhotos[name]}
      sizes={sizes}
      className={className}
      preload={preload}
      zoom={zoom}
    />
  )
}

/** The same frame for a photo that is not in the page registry, such as a product photo. */
export function StockImage({
  photo: p,
  sizes,
  className,
  preload = false,
  zoom = false,
  alt,
}: {
  photo: Photo
  sizes: string
  className?: string
  preload?: boolean
  zoom?: boolean
  /** Overrides the photo's own alt text, e.g. with the product name. */
  alt?: string
}) {
  return (
    <div className={cn('relative overflow-hidden rounded-lg bg-surface-tint', className)}>
      <Image
        loader={unsplashLoader}
        src={p.src}
        alt={alt ?? p.alt}
        fill
        sizes={sizes}
        preload={preload}
        className={cn(
          'object-cover',
          zoom &&
            'transition-transform duration-700 ease-out-soft group-hover:scale-[1.04] motion-reduce:transition-none',
        )}
        style={p.position ? { objectPosition: p.position } : undefined}
      />
    </div>
  )
}
