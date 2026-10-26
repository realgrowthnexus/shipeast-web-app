import { describe, expect, it } from 'vitest'
import { ORDER_STATUS, TRACKER_STAGES, trackerIndex } from './order-status'

describe('order status', () => {
  it('never uses a vague "Pending" label', () => {
    for (const info of Object.values(ORDER_STATUS)) expect(info.label).not.toMatch(/pending/i)
  })

  it('maps the happy path onto the seven tracker stages in order', () => {
    const path = [
      'paid',
      'confirmed',
      'shopping',
      'shopped',
      'out_for_delivery',
      'delivered',
      'closed',
    ] as const
    expect(path.map(trackerIndex)).toEqual([0, 1, 2, 3, 4, 5, 6])
    expect(TRACKER_STAGES).toHaveLength(7)
  })

  it('keeps assignment steps inside "Confirmed"', () => {
    expect(trackerIndex('awaiting_driver')).toBe(1)
    expect(trackerIndex('driver_assigned')).toBe(1)
  })

  it('puts unpaid and outcome statuses outside the tracker', () => {
    for (const s of ['awaiting_payment', 'payment_failed', 'cancelled', 'refunded'] as const)
      expect(trackerIndex(s)).toBe(-1)
  })
})
