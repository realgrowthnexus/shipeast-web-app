import 'server-only'
import { notFound } from 'next/navigation'
import { ORDER_STATUS, type TrackerStage } from '@/lib/order-status'
import { getSenderOrder } from './store'
import type { SenderOrder } from './types'

/** Loads the order behind `/…/[orderRef]?t=token`; both must match or the page is a 404. */
export async function orderForPage(
  orderRef: string,
  token: string | string[] | undefined,
): Promise<SenderOrder> {
  const t = Array.isArray(token) ? token[0] : token
  const order = t ? await getSenderOrder(t) : null
  if (!order || order.orderNo !== orderRef) notFound()
  return order
}

/** First time each tracker stage was reached, from the order's audit trail. */
export function stageTimes(events: SenderOrder['events']): Partial<Record<TrackerStage, string>> {
  const times: Partial<Record<TrackerStage, string>> = {}
  for (const e of events) {
    const stage = ORDER_STATUS[e.status].stage
    if (stage) times[stage] ??= e.at
  }
  return times
}

export const trackingPath = (order: Pick<SenderOrder, 'token'>) => `/track/${order.token}`
