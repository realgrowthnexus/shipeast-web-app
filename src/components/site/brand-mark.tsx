import { cn } from '@/lib/cn'

/**
 * The ShipEast mark: a doorway on a crimson tile, with the mango price-sticker dot. Every order
 * ends at a door. The same drawing is the favicon (`src/app/icon.svg`) and the logo files in
 * `public/brand/`; see docs/BRAND.md. Size it with a `size-*` class. Decorative beside the name.
 */
export function BrandMark({ className, ring = false }: { className?: string; ring?: boolean }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden
      focusable="false"
      className={cn('size-8 shrink-0 rounded-lg', ring && 'ring-2 ring-cream', className)}
    >
      <rect width="64" height="64" className="fill-crimson" />
      <path d="M19 64V31a13 13 0 0 1 26 0v33z" className="fill-cream" />
      <circle cx="38.5" cy="44" r="2.6" className="fill-crimson" />
      <circle cx="50" cy="14" r="5" className="fill-mango" />
    </svg>
  )
}
