import {
  Camera,
  Clock,
  DoorOpen,
  Laptop,
  Mail,
  MapPin,
  ReceiptText,
  type LucideIcon,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { onDarkLink } from '@/components/site/links'
import { cn } from '@/lib/cn'
import { formatClockTime, formatUsd } from '@/lib/format'
import type { Receipt } from '@/lib/home'
import { EXAMPLE_TIMES, type ExampleOrder } from '@/lib/how-it-works'
import { TRACKER_STAGES, type TrackerStage } from '@/lib/order-status'
import { exampleRecipient, exampleTexts } from './example-texts'
import { MiniReceipt } from './mini-receipt'

/** A white "On your screen" card: an email the sender receives at this step. */
function ScreenCard({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon
  title: string
  children: ReactNode
}) {
  return (
    <div className="rounded-lg border border-line bg-surface p-card">
      <p className="flex items-center gap-2 font-bold text-ink">
        <Icon className="size-icon shrink-0 text-crimson" aria-hidden />
        {title}
      </p>
      <div className="mt-3 text-small text-ink-body">{children}</div>
    </div>
  )
}

/** A family text, drawn as a white bubble inside the oxblood lane. */
function TextBubble({ children }: { children: string }) {
  return (
    <p className="mt-3 max-w-[90%] rounded-lg rounded-bl-sm bg-surface px-4 py-3 text-small text-ink">
      <span className="sr-only">Example text message: </span>
      {children}
    </p>
  )
}

function MoneyRow({ label, cents, strong }: { label: string; cents: number; strong?: boolean }) {
  return (
    <p
      className={cn(
        'flex justify-between gap-3 tabular-nums',
        strong && 'mt-2 border-t border-line pt-2 font-bold text-ink',
      )}
    >
      <span>{label}</span>
      <span className="shrink-0">{formatUsd(cents)}</span>
    </p>
  )
}

/**
 * S2, the page's bold element: one example order as the seven real tracker stages, each with
 * a Jamaica clock time. Beside each stage, what lands on the sender's screen and what happened
 * in Jamaica to cause it. The "In Jamaica" lane is built from touching oxblood cells, so it
 * reads as one column on wide screens without a background trick.
 */
export function HiwJourney({
  order,
  receipt,
  bankTransfer,
}: {
  order: ExampleOrder | null
  receipt: Receipt | null
  bankTransfer: boolean
}) {
  const payLine = bankTransfer ? 'PayPal, card or bank transfer' : 'PayPal or card'
  const missing = order?.missing ?? null
  const plain = (label: string) => `Your tracking page shows ${label}.`

  const rows: Record<TrackerStage, { screen: ReactNode; jamaica: ReactNode }> = {
    paid: {
      screen: (
        <ScreenCard icon={Mail} title="Email: your receipt">
          {order ? (
            <>
              <MoneyRow label={order.basketName} cents={order.basketCents} />
              <MoneyRow label={`Delivery to ${order.parish}`} cents={order.feeCents} />
              <MoneyRow label="Paid" cents={order.totalCents} strong />
              <p className="mt-3 text-ink-muted">
                By {payLine}. You also get a tracking link to share.
              </p>
            </>
          ) : (
            <p>What you paid, in US dollars, and a tracking link to share.</p>
          )}
        </ScreenCard>
      ),
      jamaica:
        'The order reaches our team in Jamaica. Nobody there handles cash: you have already paid.',
    },
    confirmed: {
      screen: plain('Confirmed'),
      jamaica: 'We check the list and give it to a driver who knows the area.',
    },
    shopping: {
      screen: plain('Shopping'),
      jamaica: missing ? (
        <>
          <p>
            The driver is in the store, ticking off your list item by item. The {missing.name} is
            out of stock, so they follow your rule: leave it out.
          </p>
          <a href="#subs-h" className={cn(onDarkLink, 'mt-1')}>
            What the three rules do
          </a>
        </>
      ) : (
        'The driver is in the store, ticking off your list item by item. If something is out of stock, they follow the rule you chose.'
      ),
    },
    shopped: {
      screen: (
        <ScreenCard icon={Camera} title="Email: the receipt photo">
          {receipt && <MiniReceipt receipt={receipt} className="mb-3" />}
          <p>A photo of the store&apos;s own till receipt.</p>
        </ScreenCard>
      ),
      jamaica: 'The driver pays at the till and photographs the receipt before leaving the store.',
    },
    out_for_delivery: {
      screen: plain('Out for delivery'),
      jamaica: (
        <>
          <p>Your family gets a text:</p>
          <TextBubble>{exampleTexts[0]}</TextBubble>
        </>
      ),
    },
    delivered: {
      screen: (
        <ScreenCard icon={DoorOpen} title="Email: the door photo">
          <div
            role="img"
            aria-label={`Example door photo card: delivered to ${exampleRecipient.name}, ${exampleRecipient.place}`}
            className="flex aspect-3/2 max-w-xs flex-col justify-between rounded-md bg-crimson p-4 text-on-dark"
          >
            <DoorOpen className="size-10 text-blush" strokeWidth={1.5} aria-hidden />
            <div aria-hidden>
              <p className="text-xs text-blush">Delivered to</p>
              <p className="font-bold">{exampleRecipient.name}</p>
              <p className="text-xs text-on-crimson-muted">{exampleRecipient.place}</p>
            </div>
          </div>
        </ScreenCard>
      ),
      jamaica: (
        <>
          <p>
            The driver hands the order over at the door, takes the photo and notes who received it.
            Your family gets a second text:
          </p>
          <TextBubble>{exampleTexts[1]}</TextBubble>
        </>
      ),
    },
    closed: {
      screen: (
        <ScreenCard icon={ReceiptText} title="Email: order closed">
          <p>
            {missing
              ? `${missing.name} not in stock: ${formatUsd(missing.cents)} back to you.`
              : 'Any refund for missing items is sent, and the order is finished.'}
          </p>
        </ScreenCard>
      ),
      jamaica: 'Nothing more for your family to do.',
    },
  }

  const last = TRACKER_STAGES.length - 1

  return (
    <section aria-labelledby="journey-h" className="section">
      <div className="mx-auto max-w-page gutter">
        <div className="max-w-2xl">
          <h2 id="journey-h" className="scroll-mt-header text-h2 text-balance text-ink">
            Seven steps you can follow, from your laptop to their door
          </h2>
          <p className="mt-3 text-lead text-ink-body">
            {order &&
              `Here is one example order, a ${order.basketName} for Paulette in Yallahs, St. Thomas. `}
            Every order moves through the same seven steps, and your tracking page shows each one
            with the time it happened. Share the link and your family can follow too.
          </p>
          <p className="mt-4 flex items-center gap-2 text-small text-ink-muted">
            <Clock className="size-icon shrink-0" aria-hidden />
            Example order SE-10428. Times are Jamaica time.
          </p>
        </div>

        <div aria-hidden className="mt-10 hidden lg:grid lg:grid-cols-12 lg:gap-x-8">
          <p className="flex items-center gap-2 pb-4 font-bold text-ink lg:col-span-4 lg:col-start-4">
            <Laptop className="size-icon text-crimson" />
            On your screen
          </p>
        </div>

        <ol aria-labelledby="journey-h" className="mt-8 lg:mt-0">
          {TRACKER_STAGES.map((stage, i) => {
            const time = EXAMPLE_TIMES[stage.key]
            const row = rows[stage.key]
            const isPlain = typeof row.screen === 'string'
            return (
              <li
                key={stage.key}
                className="relative grid grid-cols-[2rem_1fr] gap-x-4 pb-8 last:pb-0 lg:grid-cols-12 lg:gap-x-8 lg:pb-0"
              >
                {i < last && (
                  <span
                    aria-hidden
                    className="absolute top-8 bottom-0 left-[15px] w-0.5 bg-crimson lg:top-16 lg:-bottom-8"
                  />
                )}
                <div className="contents lg:col-span-3 lg:flex lg:gap-4 lg:py-8">
                  <span
                    aria-hidden
                    className="relative grid size-8 shrink-0 place-items-center rounded-full bg-crimson text-small font-bold text-on-dark tabular-nums"
                  >
                    {i + 1}
                  </span>
                  <div className="pt-0.5 lg:pt-0">
                    <time className="block text-title text-ink tabular-nums">
                      {time ? formatClockTime(time) : 'Then'}
                    </time>
                    <h3 className="text-h3 text-ink">{stage.label}</h3>
                  </div>
                </div>

                <div className="col-start-2 mt-4 lg:col-span-4 lg:col-start-4 lg:mt-0 lg:py-8">
                  {isPlain ? (
                    <p className="text-small text-ink-muted lg:text-body">
                      <span className="sr-only">On your screen: </span>
                      {row.screen}
                    </p>
                  ) : (
                    <>
                      <p className="mb-2 flex items-center gap-2 text-small font-semibold text-ink-muted lg:sr-only">
                        <Laptop className="size-icon-sm" aria-hidden />
                        On your screen
                      </p>
                      {row.screen}
                    </>
                  )}
                </div>

                <div
                  className={cn(
                    'col-start-2 mt-3 rounded-xl bg-oxblood p-card text-on-dark on-dark-focus lg:col-span-5 lg:col-start-8 lg:mt-0 lg:rounded-none lg:px-8 lg:py-8',
                    i === 0 && 'lg:rounded-t-2xl',
                    i === last && 'lg:rounded-b-2xl',
                  )}
                >
                  <p
                    className={cn(
                      'mb-2 flex items-center gap-2 text-small font-semibold text-on-oxblood-muted',
                      i === 0 ? 'lg:mb-4 lg:text-body lg:font-bold lg:text-on-dark' : 'lg:sr-only',
                    )}
                  >
                    <MapPin className="size-icon-sm text-blush lg:size-icon" aria-hidden />
                    In Jamaica
                  </p>
                  <div className="text-body">{row.jamaica}</div>
                </div>
              </li>
            )
          })}
        </ol>

        <p className="mt-8 max-w-2xl text-small text-ink-muted">
          Every order sends you the same emails.
          {bankTransfer && ' Paying by bank transfer? Step 1 waits until the money arrives.'}
        </p>
      </div>
    </section>
  )
}
