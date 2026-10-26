import { Info } from 'lucide-react'

/** Shown on every page while the app runs on placeholder data. */
export function DemoBanner() {
  return (
    <div className="bg-ink text-white print:hidden">
      <p className="mx-auto flex max-w-6xl items-center gap-2 gutter py-2 text-small">
        <Info className="size-4 shrink-0 text-blush" aria-hidden />
        Preview with sample products and prices. Orders can&apos;t be placed yet.
      </p>
    </div>
  )
}
