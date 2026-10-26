import { z } from 'zod'

/**
 * What a sender has put in their basket: catalogue items and ready-made baskets, plus the
 * parish they're sending to and a promo code. Prices are never stored here; they're looked up
 * fresh every time so a price change in admin can't be dodged with an old cookie.
 */

export const MAX_QUANTITY = 20
export const MAX_LINES = 40

export type LineKind = 'product' | 'basket'

export interface BasketLine {
  kind: LineKind
  id: string
  quantity: number
}

export interface BasketState {
  lines: BasketLine[]
  zoneId: string | null
  promoCode: string | null
}

export const emptyBasket: BasketState = { lines: [], zoneId: null, promoCode: null }

const lineSchema = z.object({
  kind: z.enum(['product', 'basket']),
  id: z.string().min(1).max(64),
  quantity: z.int().min(1).max(MAX_QUANTITY),
})

export const basketSchema = z.object({
  lines: z.array(lineSchema).max(MAX_LINES),
  zoneId: z.string().max(64).nullable(),
  promoCode: z.string().max(32).nullable(),
})

const same = (a: Pick<BasketLine, 'kind' | 'id'>, b: Pick<BasketLine, 'kind' | 'id'>) =>
  a.kind === b.kind && a.id === b.id

const clamp = (n: number) => Math.min(MAX_QUANTITY, Math.max(1, Math.trunc(n)))

/** Adds to an existing line, or appends a new one. Quantities top out at MAX_QUANTITY. */
export function addLine(state: BasketState, line: BasketLine): BasketState {
  const existing = state.lines.find((l) => same(l, line))
  if (existing) {
    return {
      ...state,
      lines: state.lines.map((l) =>
        same(l, line) ? { ...l, quantity: clamp(l.quantity + line.quantity) } : l,
      ),
    }
  }
  if (state.lines.length >= MAX_LINES) return state
  return { ...state, lines: [...state.lines, { ...line, quantity: clamp(line.quantity) }] }
}

/** Sets a line's quantity; zero or less removes it. */
export function setQuantity(
  state: BasketState,
  target: Pick<BasketLine, 'kind' | 'id'>,
  quantity: number,
): BasketState {
  if (quantity <= 0) return removeLine(state, target)
  return {
    ...state,
    lines: state.lines.map((l) => (same(l, target) ? { ...l, quantity: clamp(quantity) } : l)),
  }
}

export function removeLine(
  state: BasketState,
  target: Pick<BasketLine, 'kind' | 'id'>,
): BasketState {
  return { ...state, lines: state.lines.filter((l) => !same(l, target)) }
}

export function countItems(state: BasketState): number {
  return state.lines.reduce((n, l) => n + l.quantity, 0)
}
