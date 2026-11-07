'use server'

import { z } from 'zod'
import { getCatalogue } from '@/lib/data/catalogue'
import { readBasket, writeBasket } from './cookie'
import {
  addLine,
  countItems,
  MAX_QUANTITY,
  removeLine,
  setProductQuantity as setProductLine,
  setQuantity,
} from './state'

const target = z.object({
  kind: z.enum(['product', 'basket']),
  id: z.string().min(1).max(64),
})

const quantity = z.coerce.number().int().min(0).max(MAX_QUANTITY)

export type AddState =
  | { status: 'idle' }
  | { status: 'added'; name: string; count: number; at: number }
  | { status: 'error'; message: string }

export async function addToBasket(_prev: AddState, form: FormData): Promise<AddState> {
  const parsed = target
    .extend({ quantity: quantity.min(1) })
    .safeParse({ kind: form.get('kind'), id: form.get('id'), quantity: form.get('quantity') ?? 1 })
  if (!parsed.success) return { status: 'error', message: 'We couldn’t add that. Try again.' }

  const { kind, id } = parsed.data
  const catalogue = await getCatalogue()
  const item =
    kind === 'product'
      ? catalogue.products.find((p) => p.id === id && p.status === 'visible')
      : catalogue.baskets.find((b) => b.id === id)
  if (!item) return { status: 'error', message: 'That item isn’t available right now.' }

  const next = addLine(await readBasket(), parsed.data)
  await writeBasket(next)
  return { status: 'added', name: item.name, count: countItems(next), at: Date.now() }
}

export async function updateQuantity(form: FormData): Promise<void> {
  const parsed = target.extend({ quantity }).safeParse(Object.fromEntries(form))
  if (!parsed.success) return
  await writeBasket(setQuantity(await readBasket(), parsed.data, parsed.data.quantity))
}

export async function removeFromBasket(form: FormData): Promise<void> {
  const parsed = target.safeParse(Object.fromEntries(form))
  if (!parsed.success) return
  await writeBasket(removeLine(await readBasket(), parsed.data))
}

export async function chooseParish(form: FormData): Promise<void> {
  const zoneId = String(form.get('zoneId') ?? '')
  const { zones } = await getCatalogue()
  const zone = zones.find((z) => z.id === zoneId && z.active)
  await writeBasket({ ...(await readBasket()), zoneId: zone?.id ?? null })
}

export async function applyPromo(form: FormData): Promise<void> {
  const code = String(form.get('code') ?? '')
    .trim()
    .toUpperCase()
    .slice(0, 32)
  await writeBasket({ ...(await readBasket()), promoCode: code || null })
}

export async function removePromo(): Promise<void> {
  await writeBasket({ ...(await readBasket()), promoCode: null })
}

export type QuantityState =
  | { status: 'idle' }
  | { status: 'saved'; quantity: number; count: number; name: string; at: number }
  | { status: 'error'; message: string; at: number }

/** The shop stepper's input: an absolute target, so a double tap never counts twice. */
const productQuantityInput = z.object({
  id: z.string().min(1).max(64),
  quantity: z.coerce.number().int().min(0).max(99),
})

/**
 * Sets one product's quantity on the basket (0 removes it), for the shop listing's Add button
 * and stepper. The product is looked up in the catalogue: it must exist and not be hidden, and
 * raising the quantity needs it in stock. No price comes from the client. Anything above
 * MAX_QUANTITY is held at MAX_QUANTITY.
 */
export async function setProductQuantity(
  _prev: QuantityState,
  form: FormData,
): Promise<QuantityState> {
  const parsed = productQuantityInput.safeParse({
    id: form.get('id'),
    quantity: form.get('quantity'),
  })
  if (!parsed.success)
    return { status: 'error', message: 'We couldn’t change that. Try again.', at: Date.now() }

  const { products } = await getCatalogue()
  const product = products.find((p) => p.id === parsed.data.id && p.status !== 'hidden')
  const result = setProductLine(await readBasket(), product, parsed.data.quantity)
  if (!result.ok) return { status: 'error', message: result.message, at: Date.now() }

  await writeBasket(result.state)
  return {
    status: 'saved',
    quantity: result.quantity,
    count: countItems(result.state),
    name: product!.name,
    at: Date.now(),
  }
}
