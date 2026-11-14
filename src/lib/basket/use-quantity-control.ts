import { useActionState, useEffect, useRef, useState } from 'react'
import { setProductQuantity, type QuantityState } from '@/lib/basket/actions'

/**
 * The logic behind every product basket control (the shop tile, the product page's buy box and
 * its dock). Every button posts an absolute target quantity to one server action, so a double
 * tap never counts twice and the form works as a plain post without JavaScript. While a change
 * is in flight the control shows the target at once; on error it falls back to the server's
 * number, which always comes from the basket cookie.
 */

/** The action, its state, the in-flight target and one announcement per change. */
export function useQuantityAction(name: string, announce: (message: string) => void) {
  const [state, action, pending] = useActionState<QuantityState, FormData>(setProductQuantity, {
    status: 'idle',
  })
  const [target, setTarget] = useState<number | null>(null)

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

  /** What the control shows: the target while a change is in flight, else the cookie's number. */
  const shownFor = (quantity: number) => (pending && target !== null ? target : quantity)
  return { state, action, pending, target, setTarget, shownFor }
}

/**
 * Focus follows the control when it changes shape (Add ↔ stepper), only after a tap on this
 * control, so a change made elsewhere (the dock, another tab) never steals focus.
 */
export function useFocusFollow(inBasket: boolean) {
  const touched = useRef(false)
  const addRef = useRef<HTMLButtonElement>(null)
  const plusRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!touched.current) return
    ;(inBasket ? plusRef : addRef).current?.focus()
  }, [inBasket])
  const touch = () => {
    touched.current = true
  }
  return { addRef, plusRef, touch }
}

/** Both together, for a control that owns its own action (the shop tile). */
export function useQuantityControl(
  quantity: number,
  name: string,
  announce: (message: string) => void,
) {
  const { state, action, pending, setTarget, shownFor } = useQuantityAction(name, announce)
  const shown = shownFor(quantity)
  const inBasket = shown > 0
  const { addRef, plusRef, touch } = useFocusFollow(inBasket)
  const tap = (n: number) => () => {
    touch()
    setTarget(n)
  }
  return { state, action, pending, shown, inBasket, addRef, plusRef, tap }
}
