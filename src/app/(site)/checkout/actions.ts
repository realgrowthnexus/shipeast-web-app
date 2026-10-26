'use server'

import { redirect } from 'next/navigation'
import { readBasket, writeBasket } from '@/lib/basket/cookie'
import { priceBasket } from '@/lib/basket/pricing'
import { emptyBasket } from '@/lib/basket/state'
import { getCatalogue } from '@/lib/data/catalogue'
import { getSettings } from '@/lib/data/site'
import { CHECKOUT_FIELDS, checkoutSchema, type CheckoutField } from '@/lib/orders/checkout-schema'
import { deliveryOptions } from '@/lib/orders/delivery'
import { availablePaymentMethods } from '@/lib/orders/payment-methods'
import { placeOrder } from '@/lib/orders/store'
import { saveAddress } from '@/lib/account/store'
import type { Account } from '@/lib/account/types'
import { getAccount } from '@/lib/auth/session'
import type { CheckoutData } from '@/lib/orders/checkout-schema'
import { PLACE_ORDER_ERRORS } from '@/lib/orders/types'

export type CheckoutState =
  | { status: 'idle' }
  | {
      status: 'error'
      /** Shown above the form, e.g. when the basket changed. */
      message?: string
      errors: Partial<Record<CheckoutField, string>>
      values: Record<string, string>
    }

export async function placeOrderAction(
  _prev: CheckoutState,
  form: FormData,
): Promise<CheckoutState> {
  const values = Object.fromEntries(CHECKOUT_FIELDS.map((k) => [k, String(form.get(k) ?? '')]))
  const fail = (
    errors: Partial<Record<CheckoutField, string>>,
    message?: string,
  ): CheckoutState => ({
    status: 'error',
    errors,
    message,
    values,
  })

  const parsed = checkoutSchema.safeParse({ ...values, terms: form.get('terms') ?? undefined })
  const errors: Partial<Record<CheckoutField, string>> = {}
  if (!parsed.success) {
    for (const issue of parsed.error.issues)
      errors[issue.path[0] as CheckoutField] ??= issue.message
  }

  const [basket, catalogue, settings, account] = await Promise.all([
    readBasket(),
    getCatalogue(),
    getSettings(),
    getAccount(),
  ])
  const priced = priceBasket(basket, catalogue)
  if (!priced.canCheckout || !priced.zone) {
    return fail(errors, 'Your basket changed. Go back to your basket to check it, then try again.')
  }

  if (parsed.success) {
    const allowedDates = deliveryOptions(priced.zone, new Date()).map((o) => o.date)
    if (!allowedDates.includes(parsed.data.deliveryDate)) {
      errors.deliveryDate = 'The same-day cut-off has passed. Choose another day.'
    }
    if (!availablePaymentMethods(settings).includes(parsed.data.paymentMethod)) {
      errors.paymentMethod = 'That payment method isn’t available. Choose another.'
    }
  }
  if (!parsed.success || Object.keys(errors).length) {
    return fail(errors, 'Please check the highlighted fields.')
  }

  const result = await placeOrder({
    form: parsed.data,
    basket,
    priced,
    jmdPerUsd: settings.jmdPerUsd,
    customerId: account && !account.preview ? account.id : null,
  })
  if (!result.ok) return fail({}, PLACE_ORDER_ERRORS[result.error])

  if (account && !form.get('savedAddressId') && form.get('saveAddress') === 'on') {
    await saveCheckoutAddress(account, parsed.data, priced.zone.parish)
  }

  await writeBasket(emptyBasket)
  const query = `?t=${encodeURIComponent(result.token)}`
  redirect(
    parsed.data.paymentMethod === 'bank_transfer'
      ? `/checkout/bank-transfer/${result.orderNo}${query}`
      : `/checkout/pay/${result.orderNo}${query}`,
  )
}

/** "Save this address for next time". The order is already placed, so a failure here is quiet. */
async function saveCheckoutAddress(account: Account, data: CheckoutData, parish: string) {
  try {
    await saveAddress(account, null, {
      label: '',
      recipientName: data.recipientName,
      phone: data.recipientPhone,
      street: data.street,
      community: data.community,
      parish,
      landmark: data.landmark,
      notes: data.deliveryNotes ?? '',
      isDefault: false,
    })
  } catch (error) {
    console.error('Saving the checkout address failed', error)
  }
}
