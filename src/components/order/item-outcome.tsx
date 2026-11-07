import { Check, Repeat, X } from 'lucide-react'
import { formatUsd } from '@/lib/format'
import type { SenderOrder } from '@/lib/orders/types'
import type { ItemOutcome as ItemOutcomeKind } from '@/lib/types'

/**
 * The tag for what happened to an item at the store: bought, swapped or not in stock. The
 * tracker uses it per item; How it works shows the same tags so senders recognise them later.
 */
export function OutcomeTag({
  outcome,
  refundCents = 0,
}: {
  outcome: Exclude<ItemOutcomeKind, 'pending'>
  refundCents?: number
}) {
  if (outcome === 'found') {
    return (
      <span className="flex items-center gap-1 text-small font-semibold text-ok">
        <Check className="size-4" aria-hidden /> Bought
      </span>
    )
  }
  if (outcome === 'substituted') {
    return (
      <span className="flex items-center gap-1 text-small font-semibold text-info">
        <Repeat className="size-4" aria-hidden /> Swapped
      </span>
    )
  }
  return (
    <span className="flex items-center gap-1 text-small font-semibold text-warn">
      <X className="size-4" aria-hidden /> Not in stock
      {refundCents > 0 && `, ${formatUsd(refundCents)} back`}
    </span>
  )
}

/** What happened to one item at the store; nothing before the driver has shopped. */
export function ItemOutcome({ item }: { item: SenderOrder['items'][number] }) {
  if (item.outcome === 'pending') return null
  return <OutcomeTag outcome={item.outcome} refundCents={item.refundCents} />
}
