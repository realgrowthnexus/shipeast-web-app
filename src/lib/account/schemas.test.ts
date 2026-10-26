import { describe, expect, it } from 'vitest'
import { addressSchema, resetPasswordSchema, signUpSchema } from './schemas'

describe('signUpSchema', () => {
  it('tidies names and email, and accepts an overseas phone', () => {
    const r = signUpSchema.parse({
      fullName: 'chris BROWN',
      email: 'Chris@Example.com',
      phone: '+1 416 555 0123',
      password: 'longenough',
    })
    expect(r).toMatchObject({ fullName: 'Chris Brown', email: 'chris@example.com' })
  })
  it('treats an empty phone as none and refuses short passwords', () => {
    const r = signUpSchema.safeParse({
      fullName: 'Chris Brown',
      email: 'c@x.com',
      phone: '',
      password: 'short',
    })
    expect(r.success).toBe(false)
    expect(r.error?.issues[0].path).toEqual(['password'])
  })
})

describe('resetPasswordSchema', () => {
  it('needs both passwords to match', () => {
    const r = resetPasswordSchema.safeParse({ password: 'longenough', confirm: 'different1' })
    expect(r.success).toBe(false)
    expect(r.error?.issues[0].path).toEqual(['confirm'])
  })
})

describe('addressSchema', () => {
  it('formats the Jamaican phone and the label dash', () => {
    const r = addressSchema.parse({
      label: 'Mum - Morant Bay',
      recipientName: 'marcia campbell',
      phone: '876 555 0142',
      street: '12 Church Street',
      community: 'Morant Bay',
      parish: 'St. Thomas',
      landmark: 'Green gate',
      notes: '',
      isDefault: true,
    })
    expect(r).toMatchObject({
      label: 'Mum — Morant Bay',
      recipientName: 'Marcia Campbell',
      phone: '1-876-555-0142',
      notes: '',
    })
  })
})
