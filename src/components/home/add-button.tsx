'use client'

import { Check, Plus } from 'lucide-react'
import { useActionState } from 'react'
import { cn } from '@/lib/cn'
import { addToBasket, type AddState } from '@/lib/basket/actions'
import type { LineKind } from '@/lib/basket/state'

/**
 * The home page's add button: a crimson pill that turns leaf green with a tick once the item
 * is in the basket. Posts to the same server action as every other add button, so it works
 * without JavaScript and the header count updates.
 */
export function HomeAddButton({
  kind,
  id,
  name,
  label = 'Add',
  className,
}: {
  kind: LineKind
  id: string
  name: string
  label?: string
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
          'inline-flex min-h-control w-full cursor-pointer items-center justify-center gap-2 rounded-full px-5 font-bold text-on-dark transition-colors duration-150 active:translate-y-px disabled:opacity-70',
          added ? 'bg-leaf hover:bg-leaf-deep' : 'bg-crimson hover:bg-crimson-deep',
        )}
      >
        {added ? (
          <Check className="size-icon" aria-hidden />
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
