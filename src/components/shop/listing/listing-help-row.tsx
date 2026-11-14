import { MessageCircle, PackagePlus } from 'lucide-react'
import Link from 'next/link'
import { requestLink } from '@/components/pages/shop/shop-promises'
import { formatJamaicanPhone } from '@/lib/format'

const heading = 'flex items-center gap-2 font-display text-body font-semibold text-ink'
const icon = 'size-icon shrink-0 text-crimson'
const link =
  'mt-1 inline-flex min-h-control items-center text-small font-semibold text-crimson underline underline-offset-2 hover:text-crimson-deep'

/**
 * The help strip under the results: ask for an item we don't list, or ask a real person on
 * WhatsApp. Static, visible without JavaScript.
 */
export function ListingHelpRow({
  itemRequests,
  whatsapp,
}: {
  itemRequests: boolean
  /** Digits from settings; empty hides the WhatsApp half. */
  whatsapp: string
}) {
  const request = requestLink(itemRequests)
  const digits = whatsapp.replace(/\D/g, '')
  return (
    <div className="mt-12 grid rounded-xl border border-line bg-surface md:grid-cols-2">
      <div className="p-card md:p-card-lg">
        <h2 className={heading}>
          <PackagePlus className={icon} aria-hidden />
          Can’t find something?
        </h2>
        <p className="mt-1 text-small text-ink-body">
          Tell us what they need and we’ll look for it in store.
        </p>
        <Link href={request.href} className={link}>
          {request.label}
        </Link>
      </div>
      {digits && (
        <div className="border-t border-line p-card md:border-t-0 md:border-l md:p-card-lg">
          <h2 className={heading}>
            <MessageCircle className={icon} aria-hidden />
            Ask us on WhatsApp
          </h2>
          <p className="mt-1 text-small text-ink-body">
            A real person at ShipEast answers.{' '}
            <span className="whitespace-nowrap tabular-nums">{formatJamaicanPhone(digits)}</span>
          </p>
          <a href={`https://wa.me/${digits}`} className={link}>
            Message us
          </a>
        </div>
      )}
    </div>
  )
}
