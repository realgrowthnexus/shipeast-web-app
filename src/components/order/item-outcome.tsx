import { Check, Repeat, X } from 'lucide-react'
import { formatUsd } from '@/lib/format'
import type { SenderOrder } from '@/lib/orders/types'

/** What happened to one item at the store: bought, swapped or not in stock. */
export function ItemOutcome({ item }: { item: SenderOrder['items'][number] }) {
  if (item.outcome === 'found') {
    return (
      <span className="flex items-center gap-1 text-small font-semibold text-ok">
        <Check className="size-4" aria-hidden /> Bought
      </span>
    )
  }
  if (item.outcome === 'substituted') {
    return (
      <span className="flex items-center gap-1 text-small font-semibold text-info">
        <Repeat className="size-4" aria-hidden /> Swapped
      </span>
    )
  }
  if (item.outcome === 'missing') {
    return (
      <span className="flex items-center gap-1 text-small font-semibold text-warn">
        <X className="size-4" aria-hidden /> Not in stock
        {item.refundCents > 0 && `, ${formatUsd(item.refundCents)} back`}
      </span>
    )
  }
  return null
}
