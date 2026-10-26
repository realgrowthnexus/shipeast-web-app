import { describe, expect, it, vi } from 'vitest'

vi.mock('server-only', () => ({}))
const { fromPayPalAmount, readCapture, toPayPalAmount } = await import('./paypal')

describe('PayPal amounts', () => {
  it('converts cents both ways without float drift', () => {
    expect(toPayPalAmount(5410)).toBe('54.10')
    expect(toPayPalAmount(800)).toBe('8.00')
    expect(fromPayPalAmount('54.10')).toBe(5410)
    expect(fromPayPalAmount('0.29')).toBe(29)
    expect(fromPayPalAmount('1019.99')).toBe(101999)
    expect(fromPayPalAmount('12')).toBe(1200)
  })

  it('reads the capture, amount and our order number from a capture response', () => {
    const r = readCapture({
      purchase_units: [
        {
          reference_id: 'SE-10001',
          payments: {
            captures: [
              {
                id: 'CAP1',
                status: 'COMPLETED',
                amount: { value: '54.10' },
                custom_id: 'SE-10001',
              },
            ],
          },
        },
      ],
    })
    expect(r).toMatchObject({
      status: 'COMPLETED',
      captureId: 'CAP1',
      amountCents: 5410,
      orderNo: 'SE-10001',
    })
  })
})
