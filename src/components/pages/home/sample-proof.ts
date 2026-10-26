import type { ComponentProps } from 'react'
import type { ProofPair } from '@/components/order/proof-pair'

type Props = ComponentProps<typeof ProofPair>

/** An example order, used to show what the receipt and door photos look like. */
export const sampleReceipt: Props['receipt'] = {
  store: 'PRICESMART',
  lines: [
    { name: 'Long Grain Rice', cents: 1450 },
    { name: 'Cooking Oil', cents: 1325 },
    { name: 'Corned Beef x2', cents: 950 },
    { name: 'Evaporated Milk', cents: 1590 },
  ],
  totalCents: 5315,
  at: '2026-10-25T15:40:00Z',
}

export const sampleDoor: Props['door'] = {
  recipient: 'Marcia Campbell',
  place: 'Morant Bay, St. Thomas',
  at: '2026-10-25T17:05:00Z',
}
