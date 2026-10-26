'use client'

import { Check, Plus } from 'lucide-react'
import Link from 'next/link'
import { useActionState } from 'react'
import { Button } from '@/components/ui/button'
import { QuantityStepper } from '@/components/ui/quantity-stepper'
import { addToBasket, type AddState } from '@/lib/basket/actions'
import type { LineKind } from '@/lib/basket/state'

/**
 * Add-to-basket form. `compact` is the one-tap button on product cards; `full` adds a quantity
 * stepper for product and basket pages. Works as a plain form post before JavaScript loads.
 */
export function AddToBasket({
  kind,
  id,
  name,
  variant = 'compact',
}: {
  kind: LineKind
  id: string
  name: string
  variant?: 'compact' | 'full'
}) {
  const [state, action, pending] = useActionState<AddState, FormData>(addToBasket, {
    status: 'idle',
  })
  const added = state.status === 'added'

  if (variant === 'compact') {
    return (
      <form action={action}>
        <input type="hidden" name="kind" value={kind} />
        <input type="hidden" name="id" value={id} />
        <Button
          type="submit"
          size="sm"
          variant={added ? 'secondary' : 'primary'}
          loading={pending}
          className="min-h-11"
        >
          {!pending && (added ? <Check aria-hidden /> : <Plus aria-hidden />)}
          {added ? 'Added' : 'Add'}
          <span className="sr-only"> {name} to basket</span>
        </Button>
        <p className="sr-only" aria-live="polite">
          {added ? `${name} added. ${state.count} in your basket.` : ''}
          {state.status === 'error' ? state.message : ''}
        </p>
      </form>
    )
  }

  return (
    <form action={action} className="flex flex-col gap-3">
      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="id" value={id} />
      <div className="flex flex-wrap items-center gap-3">
        <QuantityStepper name="quantity" label={`Quantity of ${name}`} />
        <Button type="submit" size="lg" loading={pending} className="flex-1 sm:flex-none">
          {!pending && <Plus aria-hidden />}
          Add to basket
        </Button>
      </div>
      <div aria-live="polite" className="min-h-6 text-small">
        {added && (
          <p className="flex flex-wrap items-center gap-x-2 font-semibold text-ok">
            <Check className="size-4" aria-hidden />
            Added. {state.count} {state.count === 1 ? 'item' : 'items'} in your basket.
            <Link href="/basket" className="text-crimson underline underline-offset-2">
              View basket
            </Link>
          </p>
        )}
        {state.status === 'error' && <p className="font-semibold text-danger">{state.message}</p>}
      </div>
    </form>
  )
}
