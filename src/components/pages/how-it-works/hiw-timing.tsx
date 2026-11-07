import Link from 'next/link'
import { onDarkLink } from '@/components/site/links'
import { cn } from '@/lib/cn'
import { formatClockTime, formatUsd } from '@/lib/format'
import { SPEED_LABEL } from '@/lib/home'
import { ORDER_STATUS } from '@/lib/order-status'
import type { DeliveryZone } from '@/lib/types'

/** Worded from the delivery policy (src/lib/demo/legal.ts, "If nobody is home"): no more. */
const nobodyHome = [
  'The driver calls the recipient.',
  'They wait a reasonable time.',
  'If they still can’t deliver, we contact you to arrange another attempt.',
]

/**
 * S6, the serious operational band: "will it come today?" answered with the live cut-offs and
 * fees, and "what if she's out?" answered with the delivery policy's three steps.
 */
export function HiwTiming({
  zones,
  earliestCutoff,
  bankTransfer,
  hoursToPay,
}: {
  zones: DeliveryZone[]
  earliestCutoff: string | null
  bankTransfer: boolean
  hoursToPay: number
}) {
  const cut = earliestCutoff
  const same = cut !== null && zones.every((z) => z.cutoffTime === cut)
  const cutLabel = cut ? formatClockTime(cut) : ''
  const failed = ORDER_STATUS.failed_delivery
  const hasZones = zones.length > 0

  return (
    <section aria-labelledby="timing-h" className="bg-oxblood section text-on-dark on-dark-focus">
      <div className="mx-auto max-w-page gutter lg:grid lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <h2 id="timing-h" className="scroll-mt-header text-h2 text-balance">
            {!hasZones
              ? 'When it arrives'
              : same
                ? `Pay by ${cutLabel}, at their door the same day`
                : 'Pay before the cut-off, at their door the same day'}
          </h2>
          <p className="mt-3 text-lead text-on-oxblood-muted">
            {hasZones
              ? 'Jamaica time. Orders paid after the cut-off are delivered the next day. You choose the delivery day at checkout.'
              : 'We are setting up delivery areas. Write to us and we will tell you when we reach your family.'}
          </p>

          {hasZones && (
            <>
              <div
                role="img"
                aria-label={
                  same
                    ? `Paid before ${cutLabel}: delivered today. Paid after: delivered the next day.`
                    : 'Paid before the cut-off: delivered today. Paid after: delivered the next day.'
                }
                className="relative mt-8 sm:mt-12"
              >
                <div aria-hidden className="grid gap-1 sm:grid-cols-2 sm:gap-0">
                  <div className="rounded-t-lg bg-crimson p-4 sm:rounded-l-lg sm:rounded-tr-none">
                    <p className="text-small text-on-crimson-muted">
                      Paid before {same ? cutLabel : 'the cut-off'}
                    </p>
                    <p className="font-bold text-on-dark">Delivered today</p>
                  </div>
                  <div className="rounded-b-lg border border-line-on-dark bg-crimson-deep p-4 sm:rounded-r-lg sm:rounded-bl-none">
                    <p className="text-small text-on-crimson-muted">
                      Paid after {same ? cutLabel : 'the cut-off'}
                    </p>
                    <p className="font-bold text-on-dark">Delivered the next day</p>
                  </div>
                  {same && (
                    <div className="absolute -top-7 bottom-0 left-1/2 hidden -translate-x-1/2 flex-col items-center sm:flex">
                      <span className="text-small font-bold tabular-nums">{cutLabel}</span>
                      <span className="mt-1 w-0.5 flex-1 bg-on-dark" />
                    </div>
                  )}
                </div>
              </div>

              <ul className="mt-6 grid gap-3 md:grid-cols-2">
                {zones.map((z) => (
                  <li key={z.id} className="rounded-lg border border-line-on-dark p-4">
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-bold">{z.parish}</span>
                      <span className="rounded-full bg-crimson-deep px-2 py-0.5 text-xs font-bold text-on-dark">
                        {SPEED_LABEL[z.speed]}
                      </span>
                    </p>
                    <p className="mt-1 text-small text-on-oxblood-muted tabular-nums">
                      Cut-off {formatClockTime(z.cutoffTime)}. Delivery {formatUsd(z.feeCents)}.
                    </p>
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="mt-6 text-small text-on-oxblood-muted">
            {bankTransfer && (
              <p>
                Paying by bank transfer? Send it within {hoursToPay} hours. We schedule the shopping
                once the money arrives.
              </p>
            )}
            <Link
              href={hasZones ? '/delivery' : '/contact'}
              className={cn(onDarkLink, 'text-body')}
            >
              {hasZones ? 'See delivery areas and fees' : 'Contact us'}
            </Link>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-line-on-dark p-card-lg lg:col-span-5 lg:mt-0 lg:self-start">
          <h3 id="nobody-home-h" className="scroll-mt-header text-h3">
            If nobody is home
          </h3>
          <ol className="mt-4 flex flex-col gap-4">
            {nobodyHome.map((step, i) => (
              <li key={step} className="grid grid-cols-[2rem_1fr] gap-3">
                <span
                  aria-hidden
                  className="grid size-8 place-items-center rounded-full bg-crimson-deep text-small font-bold tabular-nums"
                >
                  {i + 1}
                </span>
                <span className="pt-1">{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-small text-on-oxblood-muted">
            Your tracking page then shows &ldquo;{failed.label}&rdquo;: {failed.senderText}
          </p>
          <Link href="/legal/delivery" className={cn(onDarkLink, 'mt-2')}>
            Read the delivery policy
          </Link>
        </div>
      </div>
    </section>
  )
}
