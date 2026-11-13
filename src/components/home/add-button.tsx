'use client'

import { Check, LoaderCircle, Plus } from 'lucide-react'
import { useActionState } from 'react'
import { cn } from '@/lib/cn'
import { addToBasket, type AddState } from '@/lib/basket/actions'
import type { LineKind } from '@/lib/basket/state'

/**
 * The home page's add button: solid crimson (one per basket card) or a crimson outline (a row
 * of products, so the shelf is not a wall of red), turning solid leaf green with a tick once
 * the item is in the basket. While it adds, a spinner takes the plus sign's place. Posts to the same server action as every other add button, so it works
 * without JavaScript and the header count updates.
 */
export function HomeAddButton({
  kind,
  id,
  name,
  label = 'Add',
  variant = 'solid',
  className,
}: {
  kind: LineKind
  id: string
  name: string
  label?: string
  variant?: 'solid' | 'outline'
  className?: string
}) {
  const [state, action, pending] = useActionState<AddState, FormData>(addToBasket, {
    status: 'idle',
  })
  const added = state.status === 'added'
  return (
    <form action={action} className={className}>
      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        disabled={pending}
        aria-busy={pending || undefined}
        className={cn(
          'btn-slide inline-flex min-h-control w-full cursor-pointer items-center justify-center gap-2 rounded-md border-2 px-5 text-small font-semibold transition-colors duration-250 active:translate-y-px disabled:cursor-progress',
          added
            ? 'border-leaf bg-leaf text-on-dark [--slide:var(--color-leaf-deep)]'
            : variant === 'outline'
              ? 'border-crimson bg-surface text-crimson [--slide:var(--color-crimson)] hover:text-on-dark focus-visible:text-on-dark'
              : 'border-crimson bg-crimson text-on-dark [--slide:var(--color-oxblood)]',
        )}
      >
        {pending ? (
          <LoaderCircle className="size-icon animate-spin" aria-hidden />
        ) : added ? (
          <Check className="size-icon animate-rise" aria-hidden />
        ) : (
          <Plus className="size-icon" aria-hidden />
        )}
        {added ? 'Added' : label}
        <span className="sr-only"> {name} to basket</span>
      </button>
      <p className="sr-only" aria-live="polite">
        {added ? `${name} added. ${state.count} in your basket.` : ''}
        {state.status === 'error' ? state.message : ''}
      </p>
    </form>
  )
}
