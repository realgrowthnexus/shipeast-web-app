import { describe, expect, it } from 'vitest'
import { checkoutSchema } from './checkout-schema'

const valid = {
  recipientName: 'marcia  brown',
  recipientPhone: '(876) 555-0142',
  street: '12 Queen Street',
  community: 'Morant Bay',
  landmark: 'Opposite the Anglican church',
  deliveryNotes: '',
  deliveryDate: '2026-10-26',
  substitutionRule: 'ask_first',
  giftMessage: '  ',
  senderName: 'Andre Brown',
  senderEmail: 'Andre@Example.com',
  senderPhone: '',
  paymentMethod: 'paypal',
  terms: 'on',
}

describe('checkout form', () => {
  it('cleans up names, phones and empty optional fields', () => {
    const r = checkoutSchema.parse(valid)
    expect(r.recipientName).toBe('Marcia Brown')
    expect(r.recipientPhone).toBe('1-876-555-0142')
    expect(r.senderEmail).toBe('andre@example.com')
    expect(r.giftMessage).toBeNull()
    expect(r.deliveryNotes).toBeNull()
  })

  it('rejects a non-Jamaican phone, a missing landmark and unticked terms', () => {
    const r = checkoutSchema.safeParse({
      ...valid,
      recipientPhone: '416 555 0142',
      landmark: '',
      terms: undefined,
    })
    expect(r.success).toBe(false)
    const fields = r.error!.issues.map((i) => i.path[0])
    expect(fields).toEqual(expect.arrayContaining(['recipientPhone', 'landmark', 'terms']))
  })

  it('only accepts known payment methods and substitution rules', () => {
    expect(checkoutSchema.safeParse({ ...valid, paymentMethod: 'cash' }).success).toBe(false)
    expect(checkoutSchema.safeParse({ ...valid, substitutionRule: 'whatever' }).success).toBe(false)
  })
})
