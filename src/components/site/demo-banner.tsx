import { Info } from 'lucide-react'

/** Shown on every page while the app runs on placeholder data. */
export function DemoBanner() {
  return (
    <div className="bg-ink text-white">
      <p className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-2 text-sm">
        <Info className="size-4 shrink-0 text-blush" aria-hidden />
        Preview with sample products and prices. Orders can&apos;t be placed yet.
      </p>
    </div>
  )
}
