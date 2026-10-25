import type { OrderStatus } from '@/lib/types'

/**
 * One source of truth for how an order status reads everywhere: the sender's tracker, the
 * driver app and the admin panel. Mirrors the lifecycle table in docs/PLAN.md and the
 * `order_transition_allowed` function in the database.
 */

export type StatusTone = 'neutral' | 'info' | 'progress' | 'ok' | 'warn' | 'danger'

/** The seven stages the sender sees on the tracker. */
export const TRACKER_STAGES = [
  { key: 'paid', label: 'Paid' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'shopping', label: 'Shopping' },
  { key: 'shopped', label: 'Shopped' },
  { key: 'out_for_delivery', label: 'Out for delivery' },
  { key: 'delivered', label: 'Delivered' },
  { key: 'closed', label: 'Closed' },
] as const

export type TrackerStage = (typeof TRACKER_STAGES)[number]['key']

interface StatusInfo {
  /** Short label for pills and tables. Specific; never a vague "Pending". */
  label: string
  /** One sentence for the sender, written from their side. */
  senderText: string
  tone: StatusTone
  /** Tracker stage this status sits in; null for statuses before payment or outcomes. */
  stage: TrackerStage | null
}

export const ORDER_STATUS: Record<OrderStatus, StatusInfo> = {
  awaiting_payment: {
    label: 'Waiting for transfer',
    senderText: 'We start shopping as soon as your bank transfer arrives.',
    tone: 'warn',
    stage: null,
  },
  payment_failed: {
    label: 'Payment failed',
    senderText: 'Your payment did not go through. Your basket is saved, so you can try again.',
    tone: 'danger',
    stage: null,
  },
  paid: {
    label: 'Paid',
    senderText: 'Payment received. We are checking your order.',
    tone: 'info',
    stage: 'paid',
  },
  confirmed: {
    label: 'Confirmed',
    senderText: 'Order confirmed. We are lining up a driver.',
    tone: 'info',
    stage: 'confirmed',
  },
  awaiting_driver: {
    label: 'Needs a driver',
    senderText: 'Order confirmed. We are lining up a driver.',
    tone: 'warn',
    stage: 'confirmed',
  },
  driver_assigned: {
    label: 'Driver assigned',
    senderText: 'A driver has your order and is heading to the store.',
    tone: 'info',
    stage: 'confirmed',
  },
  shopping: {
    label: 'Shopping',
    senderText: 'Your driver is in the store picking your items.',
    tone: 'progress',
    stage: 'shopping',
  },
  shopped: {
    label: 'Shopped',
    senderText: 'Everything is bought. The receipt photo is below.',
    tone: 'progress',
    stage: 'shopped',
  },
  out_for_delivery: {
    label: 'Out for delivery',
    senderText: 'On the way to the door. Your family gets a text too.',
    tone: 'progress',
    stage: 'out_for_delivery',
  },
  delivered: {
    label: 'Delivered',
    senderText: 'Delivered. The door photo is below.',
    tone: 'ok',
    stage: 'delivered',
  },
  closed: {
    label: 'Closed',
    senderText: 'All done. Any refund for missing items has been sent.',
    tone: 'ok',
    stage: 'closed',
  },
  cancelled: {
    label: 'Cancelled',
    senderText: 'This order was cancelled.',
    tone: 'neutral',
    stage: null,
  },
  failed_delivery: {
    label: 'Delivery failed',
    senderText: 'We could not deliver. We will contact you to arrange another try.',
    tone: 'danger',
    stage: null,
  },
  refunded: {
    label: 'Refunded',
    senderText: 'This order was refunded.',
    tone: 'neutral',
    stage: null,
  },
}

/** Index of the tracker stage reached, or -1 before payment or for outcomes. */
export function trackerIndex(status: OrderStatus): number {
  const stage = ORDER_STATUS[status].stage
  return stage ? TRACKER_STAGES.findIndex((s) => s.key === stage) : -1
}
