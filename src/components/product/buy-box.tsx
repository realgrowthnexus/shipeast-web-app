import { Clock, MapPin, MessageCircleQuestion } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { formatClockTime, formatJmd, formatUsd, usdCentsToJmd } from '@/lib/format'
import { joinParishes } from '@/lib/home'
import { SUBSTITUTION_RULES } from '@/lib/substitution'
import type { Product } from '@/lib/types'
import { BUY_CONTROL_ATTR } from './dock-target'
import { ProofTicket } from './proof-ticket'

const askFirst = SUBSTITUTION_RULES.find((r) => r.value === 'ask_first')

/**
 * The buy box (docs/product-v2/PLAN.md §2.C): on the page, not in a card. The aisle link, the
 * name, the size, the price group, the basket control (streamed in by the page), then the three
 * answers a sender needs before adding (sold out, when, where) and the proof ticket.
 */
export function BuyBox({
  product,
  aisle,
  unitPrice,
  jmdPerUsd,
  cutoff,
  parishes,
  control,
}: {
  product: Product
  /** The aisle (or, without one, the department) and its shop link. */
  aisle: { name: string; href: string } | null
  unitPrice: string | null
  jmdPerUsd: number
  /** Earliest same-day cut-off, `HH:MM`, or null when no zone is open. */
  cutoff: string | null
  parishes: string[]
  control: ReactNode
}) {
  return (
    <div className="flex flex-col pt-6 lg:sticky lg:top-[calc(var(--header-height)+1.5rem)] lg:self-start lg:pt-0">
      {aisle && (
        <Link
          href={aisle.href}
          className="-my-2 inline-flex self-start py-2 text-xs font-semibold text-crimson-deep [&>span]:transition-colors [&>span]:duration-200 hover:[&>span]:bg-crimson hover:[&>span]:text-on-dark"
        >
          <span className="inline-flex h-8 items-center rounded-md bg-surface-selected px-2.5">
            {aisle.name}
          </span>
        </Link>
      )}
      <h1 className="mt-3 font-display text-title font-semibold text-balance text-ink">
        {product.name}
      </h1>
      {product.size && <p className="mt-1 text-small text-ink-muted">{product.size}</p>}

      <div className="mt-5 flex animate-rise flex-wrap items-baseline gap-x-3 gap-y-0.5">
        <p className="font-display text-h3 font-semibold text-ink tabular-nums">
          {formatUsd(product.priceCents)}
        </p>
        <p className="text-small font-medium text-ink-muted tabular-nums">
          about {formatJmd(usdCentsToJmd(product.priceCents, jmdPerUsd))}
        </p>
        {unitPrice && <p className="w-full text-small text-ink-body tabular-nums">{unitPrice}</p>}
        <p className="mt-1 w-full text-xs text-ink-muted">
          You pay in US dollars. J$ is a guide at {formatJmd(jmdPerUsd)} to {formatUsd(100)}.
        </p>
      </div>

      <div {...{ [BUY_CONTROL_ATTR]: '' }} className="mt-5 animate-rise [animation-delay:80ms]">
        {control}
      </div>

      <ul
        role="list"
        className="mt-6 flex flex-col gap-3 border-t border-line pt-5 text-small text-ink-body"
      >
        <li className="flex gap-3">
          <MessageCircleQuestion className="mt-0.5 size-icon shrink-0 text-crimson" aria-hidden />
          <p>
            <span className="font-semibold text-ink">Sold out on the day? We ask you first.</span>{' '}
            {askFirst?.body} You can change this at checkout.
          </p>
        </li>
        <li className="flex gap-3">
          <Clock className="mt-0.5 size-icon shrink-0 text-crimson" aria-hidden />
          <p>
            {cutoff
              ? `Order by ${formatClockTime(cutoff)} Jamaica time and we aim to deliver the same day. Delivery times are estimates.`
              : 'Delivery is paused for now. Check back soon.'}
          </p>
        </li>
        {parishes.length > 0 && (
          <li className="flex gap-3">
            <MapPin className="mt-0.5 size-icon shrink-0 text-leaf" aria-hidden />
            <p>We deliver in {joinParishes(parishes)} only.</p>
          </li>
        )}
      </ul>

      <div className="mt-6">
        <ProofTicket />
      </div>
    </div>
  )
}
