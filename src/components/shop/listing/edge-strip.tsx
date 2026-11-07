import { CalendarCheck, DollarSign, Receipt } from 'lucide-react'
import { CutoffNote } from '@/components/site/cutoff-note'

const item = 'flex items-start gap-2 text-small text-ink-body'
const icon = 'mt-0.5 size-icon shrink-0 text-crimson'

/**
 * R2: our edge in one line under the band: the same-day cut-off (live countdown), the receipt
 * photo, paying in USD and when prices were checked. Fewer items on narrow screens.
 */
export function EdgeStrip({
  cutoff,
  priceCheck,
}: {
  cutoff: string | null
  priceCheck: string | null
}) {
  return (
    // With no cut-off the phone strip would be empty: then it starts at 768px.
    <div className={`border-b border-line bg-surface ${cutoff ? '' : 'hidden md:block'}`}>
      <div className="mx-auto flex max-w-wide flex-wrap items-start gap-x-8 gap-y-2 gutter py-3">
        {cutoff && <CutoffNote cutoff={cutoff} tone="light" />}
        <p className={`${item} hidden md:flex`}>
          <Receipt className={icon} aria-hidden />A photo of the till receipt with every order
        </p>
        <p className={`${item} hidden lg:flex`}>
          <DollarSign className={icon} aria-hidden />
          Pay in US dollars. J$ shown for your family.
        </p>
        {priceCheck && (
          <p className={`${item} hidden lg:flex`}>
            <CalendarCheck className={icon} aria-hidden />
            {priceCheck}
          </p>
        )}
      </div>
    </div>
  )
}
