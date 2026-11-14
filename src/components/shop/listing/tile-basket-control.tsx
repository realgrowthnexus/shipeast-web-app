'use client'

import { Minus, Plus, Trash2 } from 'lucide-react'
import { MAX_QUANTITY } from '@/lib/basket/state'
import { useQuantityControl } from '@/lib/basket/use-quantity-control'
import { useListingNav } from './listing-nav'

export const stepButton =
  'grid w-11 shrink-0 cursor-pointer place-items-center rounded-md transition-colors duration-150 hover:bg-leaf-deep focus-visible:outline-offset-2 active:bg-leaf-deep disabled:cursor-default disabled:text-on-leaf-muted disabled:hover:bg-transparent [&_svg]:size-icon'

/**
 * The card's basket control: the home's outline "Add" that becomes a leaf-green stepper once
 * the item is in the basket (the same green as the home's "Added"). Every button posts an absolute target quantity to one server action,
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
  const { announce } = useListingNav()
  const { state, action, pending, shown, inBasket, addRef, plusRef, tap } = useQuantityControl(
    quantity,
    name,
    announce,
  )

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
          className="@container flex h-control w-full items-stretch rounded-md bg-leaf text-on-dark"
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
          <output className="flex flex-1 items-center justify-center gap-1 text-small font-semibold tabular-nums">
            {shown}
            <span className="hidden font-medium text-on-leaf-muted @[10rem]:inline">in basket</span>
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
        <button
          ref={addRef}
          type="submit"
          name="quantity"
          value={1}
          onClick={tap(1)}
          className="btn-slide inline-flex h-control w-full cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-crimson bg-surface px-5 text-small font-semibold text-crimson transition-colors duration-250 [--slide:var(--color-crimson)] hover:text-on-dark focus-visible:text-on-dark active:translate-y-px"
        >
          <Plus className="size-icon" aria-hidden />
          Add
          <span className="sr-only"> {name} to basket</span>
        </button>
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
