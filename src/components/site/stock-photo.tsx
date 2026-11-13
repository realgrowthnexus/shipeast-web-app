'use client'

import Image, { type ImageLoader, type ImageProps } from 'next/image'
import { cn } from '@/lib/cn'
import { type StockPhoto as Photo, type StockPhotoKey, stockPhotos } from '@/lib/stock-photos'

/**
 * Unsplash resizes and converts on its own CDN, so we ask it for the exact width instead of
 * running the photo through Next's optimizer a second time.
 */
const unsplashLoader: ImageLoader = ({ src, width, quality }) =>
  `${src}?auto=format&fit=max&w=${width}&q=${quality ?? 70}`

/**
 * `next/image` that marks its frame `data-loaded` once the picture is in, so the frame's
 * `photo-loading` pulse stops. On the home page (`[data-home]`) a lazy picture also fades in
 * instead of popping (`[data-fade]` in globals.css); a preloaded one, the largest paint, never
 * waits. Without JavaScript the home layout's noscript rule shows it at once.
 */
export function FadeImage({ className, preload, onLoad, ...props }: ImageProps) {
  return (
    <Image
      {...props}
      preload={preload}
      data-fade={preload ? undefined : ''}
      onLoad={(e) => {
        e.currentTarget.parentElement?.setAttribute('data-loaded', '')
        onLoad?.(e)
      }}
      className={cn('transition-[opacity,scale] duration-250', className)}
    />
  )
}

/**
 * A stock photo from the registry, cropped to the box it sits in. Give it an aspect class
 * (`aspect-4/3`) or a sized parent, and always pass `sizes` so phones download a phone-sized file.
 * Text goes on a photo only under one flat role overlay (see docs/PHOTOGRAPHY.md); otherwise
 * flat brand colours sit beside photos, not over them.
 */
export function StockPhoto({
  name,
  sizes,
  className,
  preload = false,
  zoom = false,
  alt,
  position,
  imgClassName,
}: {
  name: StockPhotoKey
  sizes: string
  className?: string
  /** Only for the one photo at the top of a page (its hero). */
  preload?: boolean
  /** Zoom in slightly when a parent with `group` is hovered (cards that are links). */
  zoom?: boolean
  /** Overrides the registry alt, e.g. `""` when visible text already names the photo. */
  alt?: string
  /** Overrides the registry crop for one slot (CSS object-position). */
  position?: string
  /** Classes on the image itself, e.g. responsive crops (`object-[25%_30%] md:object-center`). */
  imgClassName?: string
}) {
  const photo = stockPhotos[name]
  return (
    <StockImage
      photo={position ? { ...photo, position } : photo}
      sizes={sizes}
      className={className}
      preload={preload}
      zoom={zoom}
      alt={alt}
      imgClassName={imgClassName}
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
  imgClassName,
  eager = false,
  priority = false,
}: {
  photo: Photo
  sizes: string
  className?: string
  preload?: boolean
  zoom?: boolean
  /** Overrides the photo's own alt text, e.g. with the product name. */
  alt?: string
  /** Classes on the image. When set, the registry's inline crop is not applied (it would win). */
  imgClassName?: string
  /** Load at once instead of lazily (first row of a product grid; not a preload). */
  eager?: boolean
  /** High fetch priority (the one or two images most likely to be the largest paint). */
  priority?: boolean
}) {
  return (
    <div className={cn('relative overflow-hidden rounded-lg bg-page', className)}>
      <FadeImage
        loader={unsplashLoader}
        src={p.src}
        alt={alt ?? p.alt}
        fill
        sizes={sizes}
        preload={preload}
        loading={eager && !preload ? 'eager' : undefined}
        fetchPriority={priority && !preload ? 'high' : undefined}
        className={cn(
          'object-cover',
          zoom &&
            'transition-[opacity,scale] duration-400 ease-out-soft group-hover:scale-[1.04] motion-reduce:transition-none',
          imgClassName,
        )}
        style={p.position && !imgClassName ? { objectPosition: p.position } : undefined}
      />
    </div>
  )
}
