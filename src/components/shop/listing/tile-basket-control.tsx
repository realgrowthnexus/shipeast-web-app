'use client'

import { Minus, Plus, Trash2 } from 'lucide-react'
import { useActionState, useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { setProductQuantity, type QuantityState } from '@/lib/basket/actions'
import { MAX_QUANTITY } from '@/lib/basket/state'
import { useListingNav } from './listing-nav'

const stepButton =
  'grid w-11 shrink-0 cursor-pointer place-items-center transition-colors duration-150 hover:bg-crimson-deep active:bg-oxblood disabled:cursor-default disabled:text-on-crimson-muted disabled:hover:bg-transparent [&_svg]:size-icon'

/**
 * The tile's basket control: an outline "Add" that becomes a solid crimson stepper once the
 * item is in the basket. Every button posts an absolute target quantity to one server action,
 * so a double tap never counts twice, and the form works as a plain post without JavaScript.
 * While a change is in flight the stepper shows the target at once; on error it falls back to
 * the server's number. `quantity` always comes from the basket cookie, read on the server.
 */
export function TileBasketControl({
  productId,
  name,
  quantity,
  inStock,
}: {
  productId: string
  name: string
  quantity: number
  inStock: boolean
}) {
  const [state, action, pending] = useActionState<QuantityState, FormData>(setProductQuantity, {
    status: 'idle',
  })
  const [target, setTarget] = useState<number | null>(null)
  const { announce } = useListingNav()
  const shown = pending && target !== null ? target : quantity

  // Focus follows the control when it changes shape (Add ↔ stepper), only after a tap here.
  const touched = useRef(false)
  const addRef = useRef<HTMLButtonElement>(null)
  const plusRef = useRef<HTMLButtonElement>(null)
  const inBasket = shown > 0
  useEffect(() => {
    if (!touched.current) return
    ;(inBasket ? plusRef : addRef).current?.focus()
  }, [inBasket])

  // One message per change, through the page's single live region.
  const lastAt = useRef(0)
  useEffect(() => {
    if (state.status === 'idle' || state.at === lastAt.current) return
    lastAt.current = state.at
    if (state.status === 'error') return announce(state.message)
    announce(
      state.quantity
        ? `${name}: ${state.quantity} in your basket. ${state.count} ${state.count === 1 ? 'item' : 'items'} in total.`
        : `${name} removed from your basket.`,
    )
  }, [state, name, announce])

  const tap = (n: number) => () => {
    touched.current = true
    setTarget(n)
  }

  if (!inStock && shown === 0)
    return (
      <p className="flex h-control items-center justify-center rounded-md bg-surface-muted text-small font-semibold text-ink-muted">
        Out of stock
      </p>
    )

  return (
    <form action={action}>
      <input type="hidden" name="id" value={productId} />
      {inBasket ? (
        <div
          role="group"
          aria-label={`${name} in your basket`}
          className="@container flex h-control w-full items-stretch overflow-hidden rounded-md bg-crimson text-on-dark on-dark-focus"
        >
          <button
            type="submit"
            name="quantity"
            value={shown - 1}
            onClick={tap(shown - 1)}
            className={stepButton}
            aria-label={shown === 1 ? `Remove ${name} from basket` : `Remove one ${name}`}
          >
            {shown === 1 ? <Trash2 aria-hidden /> : <Minus aria-hidden />}
          </button>
          <output className="flex flex-1 items-center justify-center gap-1 font-bold tabular-nums">
            {shown}
            <span className="hidden font-medium text-on-crimson-muted @[10rem]:inline">
              in basket
            </span>
          </output>
          <button
            ref={plusRef}
            type="submit"
            name="quantity"
            value={shown + 1}
            onClick={tap(shown + 1)}
            disabled={!inStock || shown >= MAX_QUANTITY}
            title={shown >= MAX_QUANTITY ? `${MAX_QUANTITY} is the most per item` : undefined}
            className={stepButton}
            aria-label={`Add one more ${name}`}
          >
            <Plus aria-hidden />
          </button>
        </div>
      ) : (
        <Button
          ref={addRef}
          type="submit"
          name="quantity"
          value={1}
          onClick={tap(1)}
          variant="outline"
          size="sm"
          block
        >
          <Plus aria-hidden />
          Add
          <span className="sr-only"> {name} to basket</span>
        </Button>
      )}
      {!inStock && inBasket && (
        <p className="mt-1.5 text-xs text-ink-muted">
          Out of stock now. We follow your swap choice.
        </p>
      )}
      {state.status === 'error' && !pending && (
        <p className="mt-1.5 text-xs font-medium text-danger">{state.message}</p>
      )}
    </form>
  )
}
