import { ArrowRight, MapPin, Plus, ShoppingBasket } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import { AddressCard } from '@/components/account/address-card'
import { itemsSummary } from '@/components/account/order-card'
import { ReorderButton } from '@/components/account/reorder-button'
import { Alert } from '@/components/ui/alert'
import { StatusPill } from '@/components/ui/badge'
import { ButtonLink } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/card'
import { listAddresses, listOrders } from '@/lib/account/store'
import { firstName, isActive } from '@/lib/account/types'
import { param } from '@/lib/auth/redirect'
import { requireAccount } from '@/lib/auth/session'
import { formatDate, formatUsd } from '@/lib/format'
import { ORDER_STATUS } from '@/lib/order-status'

const link =
  'inline-flex items-center gap-1 font-semibold text-crimson underline-offset-2 hover:underline'

export default function AccountHomePage({ searchParams }: PageProps<'/account'>) {
  return (
    <Suspense fallback={<OverviewSkeleton />}>
      <Overview searchParams={searchParams} />
    </Suspense>
  )
}

async function Overview({ searchParams }: { searchParams: PageProps<'/account'>['searchParams'] }) {
  const account = await requireAccount('/account')
  const [orders, addresses, sp] = await Promise.all([
    listOrders(account),
    listAddresses(account),
    searchParams,
  ])
  const active = orders.filter((o) => isActive(o.status))
  const finished = orders.filter((o) => o.status === 'delivered' || o.status === 'closed')
  const current = active[0]

  return (
    <div className="flex flex-col gap-10">
      <header>
        <p className="mb-3 eyebrow text-crimson">My account</p>
        <h1 className="text-h1 text-ink">Hi, {firstName(account)}</h1>
        <p className="mt-2 text-ink-muted">
          Customer ID <span className="font-semibold text-ink">{account.publicId}</span>
        </p>
      </header>

      {param(sp.welcome) && (
        <Alert tone="ok" title="Your account is ready">
          Any orders you placed as a guest with {account.email} are now under Orders.
        </Alert>
      )}
      {param(sp.updated) === 'password' && <Alert tone="ok" title="Your new password is saved" />}
      {account.preview && (
        <Alert tone="info" title="Preview account">
          This is a sample account with made-up orders. Changes last for a day in this browser only.
        </Alert>
      )}

      <section aria-labelledby="on-the-way" className="flex flex-col gap-4">
        <h2 id="on-the-way" className="text-h3 text-ink">
          On the way
        </h2>
        {current ? (
          <div className="flex flex-col gap-5 rounded-xl bg-crimson p-card-lg text-white">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-h2">{current.orderNo}</span>
              <StatusPill status={current.status} />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-lead">
                For {current.recipientName}, {current.community},{' '}
                <span className="whitespace-nowrap">{current.parish}</span>
              </p>
              <p className="text-on-crimson-muted">{ORDER_STATUS[current.status].senderText}</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <ButtonLink href={`/track/${current.token}`} variant="onDark">
                Track live
              </ButtonLink>
              <Link
                href={`/account/orders/${current.orderNo}`}
                className="inline-flex min-h-11 items-center gap-1 font-semibold text-blush underline-offset-2 hover:underline"
              >
                Order details <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
            {active.length > 1 && (
              <Link
                href="/account/orders"
                className="border-t border-crimson-deep pt-4 font-semibold text-blush underline-offset-2 hover:underline"
              >
                {active.length - 1} more {active.length === 2 ? 'order' : 'orders'} on the way
              </Link>
            )}
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-line bg-surface p-card-lg">
            <p className="text-ink-body">Nothing on the way right now.</p>
            <ButtonLink href="/shop">
              <ShoppingBasket aria-hidden />
              Start a basket
            </ButtonLink>
          </div>
        )}
      </section>

      {finished.length > 0 && (
        <section aria-labelledby="send-again" className="flex flex-col gap-4">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <h2 id="send-again" className="text-h3 text-ink">
              Send again
            </h2>
            <Link href="/account/orders" className={link}>
              All orders <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <ul className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface">
            {finished.slice(0, 3).map((o) => (
              <li key={o.orderNo} className="flex flex-wrap items-center gap-x-4 gap-y-3 p-card">
                <div className="flex min-w-0 flex-1 basis-60 flex-col gap-0.5">
                  <Link
                    href={`/account/orders/${o.orderNo}`}
                    className="font-bold text-ink underline-offset-2 hover:text-crimson hover:underline"
                  >
                    {o.recipientName}, {o.community}
                  </Link>
                  <p className="truncate text-small text-ink-muted">{itemsSummary(o.itemNames)}</p>
                  <p className="text-small text-ink-muted">
                    {o.orderNo} · Delivered {formatDate(`${o.deliveryDate}T17:00:00Z`)} ·{' '}
                    {formatUsd(o.totalCents)}
                  </p>
                </div>
                <ReorderButton
                  orderNo={o.orderNo}
                  variant="secondary"
                  size="sm"
                  label="Send again"
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="family" className="flex flex-col gap-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 id="family" className="text-h3 text-ink">
            Family addresses
          </h2>
          {addresses.length > 0 && (
            <Link href="/account/addresses" className={link}>
              Manage <ArrowRight className="size-4" aria-hidden />
            </Link>
          )}
        </div>
        {addresses.length ? (
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {addresses.slice(0, 3).map((a) => (
              <li key={a.id}>
                <AddressCard address={a} compact />
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border-2 border-dashed border-line p-card-lg">
            <p className="flex items-center gap-2 text-ink-body">
              <MapPin className="size-5 text-crimson" aria-hidden />
              Save the people you send to, and checkout fills itself in.
            </p>
            <ButtonLink href="/account/addresses/new" variant="secondary">
              <Plus aria-hidden />
              Add an address
            </ButtonLink>
          </div>
        )}
      </section>
    </div>
  )
}

function OverviewSkeleton() {
  return (
    <div className="flex flex-col gap-10" aria-hidden>
      <Skeleton className="h-24 w-72" />
      <Skeleton className="h-56" />
      <Skeleton className="h-48" />
    </div>
  )
}
