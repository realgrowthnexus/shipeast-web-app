import { Package } from 'lucide-react'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { AccountHeading } from '@/components/account/account-heading'
import { OrderCard } from '@/components/account/order-card'
import { ButtonLink } from '@/components/ui/button'
import { EmptyState, Skeleton } from '@/components/ui/card'
import { Tabs } from '@/components/ui/tabs'
import { listOrders } from '@/lib/account/store'
import { isActive, type AccountOrder } from '@/lib/account/types'
import { requireAccount } from '@/lib/auth/session'

export const metadata: Metadata = { title: 'Your orders' }

export default function OrdersPage() {
  return (
    <>
      <AccountHeading title="Your orders">
        Track what’s on the way, see receipts and door photos, and send a basket again.
      </AccountHeading>
      <Suspense fallback={<Skeleton className="h-96" />}>
        <Orders />
      </Suspense>
    </>
  )
}

async function Orders() {
  const account = await requireAccount('/account/orders')
  const orders = await listOrders(account)
  if (!orders.length) {
    return (
      <EmptyState
        icon={<Package aria-hidden />}
        title="No orders yet"
        action={<ButtonLink href="/shop">Start a basket</ButtonLink>}
      >
        When you send groceries home, every order shows up here with its receipt and door photo.
      </EmptyState>
    )
  }
  const active = orders.filter((o) => isActive(o.status))
  const past = orders.filter((o) => !isActive(o.status))
  return (
    <Tabs
      label="Orders"
      tabs={[
        {
          id: 'active',
          title: 'On the way',
          count: active.length,
          body: <OrderList orders={active} empty="Nothing on the way right now." />,
        },
        {
          id: 'past',
          title: 'Past orders',
          count: past.length,
          body: <OrderList orders={past} empty="Finished orders show up here." />,
        },
      ]}
    />
  )
}

function OrderList({ orders, empty }: { orders: AccountOrder[]; empty: string }) {
  if (!orders.length) return <p className="py-6 text-ink-muted">{empty}</p>
  return (
    <ul className="flex flex-col gap-3">
      {orders.map((o) => (
        <OrderCard key={o.orderNo} order={o} />
      ))}
    </ul>
  )
}
