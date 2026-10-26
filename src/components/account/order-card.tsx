import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { StatusPill } from '@/components/ui/badge'
import type { AccountOrder } from '@/lib/account/types'
import { formatDate, formatUsd } from '@/lib/format'

/** "Long Grain Rice, Vegetable Cooking Oil and 2 more". */
export function itemsSummary(names: string[]): string {
  if (names.length <= 2) return names.join(' and ')
  return `${names.slice(0, 2).join(', ')} and ${names.length - 2} more`
}

/** One order in a list. The whole card is the link to its details. */
export function OrderCard({ order }: { order: AccountOrder }) {
  return (
    <li>
      <Link
        href={`/account/orders/${order.orderNo}`}
        className="group flex items-center gap-4 rounded-lg border border-line bg-surface p-card transition-colors hover:border-blush"
      >
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="font-bold text-ink">{order.orderNo}</span>
            <StatusPill status={order.status} />
          </div>
          <p className="text-ink">
            For {order.recipientName}, {order.community},{' '}
            <span className="whitespace-nowrap">{order.parish}</span>
          </p>
          <p className="truncate text-small text-ink-muted">{itemsSummary(order.itemNames)}</p>
          <p className="text-small text-ink-muted">
            Placed {formatDate(order.createdAt)} ·{' '}
            <span className="font-semibold text-ink tabular-nums">
              {formatUsd(order.totalCents)}
            </span>
          </p>
        </div>
        <ChevronRight
          className="size-5 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:text-crimson"
          aria-hidden
        />
      </Link>
    </li>
  )
}
