import { cn } from '@/lib/cn'

/**
 * The ShipEast mark, the Receipt E: the E of East cut from a till receipt, torn along the
 * bottom. The receipt photo is our proof, so the mark is the proof. One white shape on a
 * crimson tile (64 grid, 14 corner), so it reads at 16px. The same drawing is the favicon
 * (`src/app/icon.svg`) and the logo files in `public/brand/`; see docs/BRAND.md.
 * Size it with a `size-*` class. Decorative beside the name. On dark bands pass `ring`.
 */
export function BrandMark({ className, ring = false }: { className?: string; ring?: boolean }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden
      focusable="false"
      className={cn('size-8 shrink-0 rounded-[21.875%]', ring && 'ring-2 ring-blush', className)}
    >
      <rect width="64" height="64" rx="14" className="fill-crimson" />
      <path
        d="M15 9H49V21H32V28H45V36H32V43H49V55L43.33 48L37.67 55L32 48L26.33 55L20.67 48L15 55Z"
        className="fill-surface"
      />
    </svg>
  )
}
