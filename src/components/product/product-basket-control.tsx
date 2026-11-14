'use client'

import { LoaderCircle, Minus, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { stepButton } from '@/components/shop/listing/tile-basket-control'
import { cn } from '@/lib/cn'
import { MAX_QUANTITY } from '@/lib/basket/state'
import { useFocusFollow } from '@/lib/basket/use-quantity-control'
import { useProductBuy, useShownQuantity } from './product-buy-provider'

const pickButton =
  'grid size-control shrink-0 cursor-pointer place-items-center rounded-md text-crimson transition-colors duration-150 hover:bg-surface-muted active:bg-surface-strong disabled:cursor-default disabled:text-ink-disabled disabled:hover:bg-transparent [&_svg]:size-icon'

/**
 * The product page's basket control (docs/product-v2/PLAN.md §2.C5, §2.H). `full` sits in the
 * buy box: a quantity picker and a solid crimson "Add to basket", which becomes the leaf
 * stepper once the item is in the basket. `dock` is the phone bar's compact form: "Add" only.
 * Both read one shared action from `ProductBuyProvider`, post absolute targets, and work as
 * plain form posts. Must sit inside Suspense (it waits for the basket cookie).
 */
export function ProductBasketControl({
  variant,
  fallback,
}: {
  variant: 'full' | 'dock'
  /** Where the out-of-stock note sends the sender ("See more Rice & grains"). */
  fallback?: { label: string; href: string }
}) {
  const { productId, name, inStock, state, action, pending, target, setTarget } = useProductBuy()
  const shown = useShownQuantity()
  const inBasket = shown > 0
  const { addRef, plusRef, touch } = useFocusFollow(inBasket)
  const [picked, setPicked] = useState(1)
  const full = variant === 'full'

  const tap = (n: number) => () => {
    touch()
    setTarget(n)
  }
  // The pressed button shows the spinner; the stepper already shows its target.
  const adding = pending && !inBasket && target !== null && target > 0

  if (!inStock && !inBasket)
    return full ? (
      <div className="rounded-lg bg-surface-muted p-4">
        <p className="text-small font-semibold text-ink">Out of stock today</p>
        <p className="mt-1 text-small text-ink-body">
          The store is out right now. We restock often.
        </p>
        {fallback && (
          <Link
            href={fallback.href}
            className="mt-1 inline-flex min-h-control items-center text-small font-semibold text-crimson underline underline-offset-2 hover:text-crimson-deep"
          >
            {fallback.label}
          </Link>
        )}
      </div>
    ) : null

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
            <span
              className={cn(
                'font-medium text-on-leaf-muted',
                full ? 'inline' : 'hidden @[10rem]:inline',
              )}
            >
              {full ? 'in your basket' : 'in basket'}
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
      ) : full ? (
        <div className="flex gap-2">
          <div className="inline-flex h-control shrink-0 items-center rounded-md border-control border-line-strong bg-surface">
            <button
              type="button"
              onClick={() => setPicked((n) => Math.max(1, n - 1))}
              disabled={picked <= 1}
              className={pickButton}
              aria-label="One fewer"
            >
              <Minus aria-hidden />
            </button>
            <output
              aria-label={`Quantity to add: ${picked}`}
              className="w-9 text-center text-small font-semibold text-ink tabular-nums"
            >
              {picked}
            </output>
            <button
              type="button"
              onClick={() => setPicked((n) => Math.min(MAX_QUANTITY, n + 1))}
              disabled={picked >= MAX_QUANTITY}
              title={picked >= MAX_QUANTITY ? `${MAX_QUANTITY} is the most per item` : undefined}
              className={pickButton}
              aria-label="One more"
            >
              <Plus aria-hidden />
            </button>
          </div>
          <button
            ref={addRef}
            type="submit"
            name="quantity"
            value={picked}
            onClick={tap(picked)}
            aria-busy={adding || undefined}
            className="btn-slide inline-flex h-control flex-1 cursor-pointer items-center justify-center gap-2 rounded-md bg-crimson px-5 text-small font-semibold text-on-dark [--slide:var(--color-crimson-deep)] active:translate-y-px"
          >
            {adding ? (
              <LoaderCircle className="size-icon-sm animate-spin" aria-hidden />
            ) : (
              <Plus className="size-icon" aria-hidden />
            )}
            Add to basket
            <span className="sr-only"> {name}</span>
          </button>
        </div>
      ) : (
        <button
          ref={addRef}
          type="submit"
          name="quantity"
          value={1}
          onClick={tap(1)}
          aria-busy={adding || undefined}
          className="btn-slide inline-flex h-control w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-crimson px-4 text-small font-semibold text-on-dark [--slide:var(--color-crimson-deep)] active:translate-y-px"
        >
          {adding ? (
            <LoaderCircle className="size-icon-sm animate-spin" aria-hidden />
          ) : (
            <Plus className="size-icon" aria-hidden />
          )}
          Add
          <span className="sr-only"> {name} to basket</span>
        </button>
      )}
      {full && inBasket && (
        <p className="mt-2 text-small text-ink-body">
          {!inStock && 'Out of stock now. We follow your swap choice. '}
          <Link
            href="/basket"
            className="inline-flex min-h-control items-center font-semibold text-crimson underline underline-offset-2 hover:text-crimson-deep"
          >
            Go to basket
          </Link>
        </p>
      )}
      {full && state.status === 'error' && !pending && (
        <p className="mt-2 text-small font-medium text-danger">{state.message}</p>
      )}
    </form>
  )
}
