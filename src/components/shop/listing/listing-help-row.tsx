import { PackagePlus, Receipt } from 'lucide-react'
import Link from 'next/link'
import { requestLink } from '@/components/pages/shop/shop-promises'

const link =
  'mt-2 inline-flex min-h-control items-center text-small font-semibold text-crimson underline underline-offset-2 hover:text-crimson-deep'

/** A quiet exit under the grid: ask for a missing item, and how we shop (proof, once more). */
export function ListingHelpRow({ itemRequests }: { itemRequests: boolean }) {
  const request = requestLink(itemRequests)
  return (
    <div className="mt-12 grid gap-6 rounded-lg border border-line bg-surface p-card md:grid-cols-2 md:gap-10">
      <div>
        <h2 className="flex items-center gap-2 text-body font-bold text-ink">
          <PackagePlus className="size-icon shrink-0 text-crimson" aria-hidden />
          Can’t find something?
        </h2>
        <p className="mt-1 text-small text-ink-body">
          Tell us what they need and we’ll look for it in store.
        </p>
        <Link href={request.href} className={link}>
          {request.label}
        </Link>
      </div>
      <div>
        <h2 className="flex items-center gap-2 text-body font-bold text-ink">
          <Receipt className="size-icon shrink-0 text-crimson" aria-hidden />
          How we shop for you
        </h2>
        <p className="mt-1 text-small text-ink-body">
          A driver buys your items in Jamaica on the day we deliver. You get a photo of the till
          receipt, then a photo at the door.
        </p>
        <Link href="/how-it-works" className={link}>
          How it works
        </Link>
      </div>
    </div>
  )
}
