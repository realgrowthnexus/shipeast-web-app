import 'server-only'
import { notFound } from 'next/navigation'
import { requireAccount } from '@/lib/auth/session'
import { getSenderOrder } from '@/lib/orders/store'
import type { SenderOrder } from '@/lib/orders/types'
import { orderTokenFor } from './store'
import type { Account } from './types'

/** One of the signed-in sender's own orders; anyone else's order number is a 404. */
export async function accountOrder(
  orderRef: string,
  path: string,
): Promise<{ account: Account; order: SenderOrder }> {
  const account = await requireAccount(path)
  const token = await orderTokenFor(account, orderRef)
  const order = token ? await getSenderOrder(token) : null
  if (!order) notFound()
  return { account, order }
}
