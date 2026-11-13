import { ArrowRight, CircleCheck, ReceiptText } from 'lucide-react'
import Link from 'next/link'
import { StockPhoto } from '@/components/site/stock-photo'
import { formatJmd } from '@/lib/format'
import type { Receipt } from '@/lib/home'

const texts = [
  'ShipEast: Your groceries from Marcia are on the way. The driver will deliver today.',
  'ShipEast: Delivered. Your groceries from Marcia were dropped off at 2:41 PM.',
]

/**
 * Proof (PLAN §3, row 7): the reason to choose us, shown as the things themselves: the till
 * receipt, the photo at the door and the two texts the family gets.
 */
export function HomeProof({ receipt }: { receipt: Receipt | null }) {
  return (
    <section
      aria-labelledby="home-proof"
      className="mt-14 rounded-t-4xl bg-oxblood text-on-dark on-dark-focus md:mt-20"
    >
      <div className="mx-auto grid max-w-wide items-center gap-12 gutter py-14 md:py-20 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2 id="home-proof" className="font-display text-shout text-balance">
            Send groceries, not money.
          </h2>
          <p className="mt-6 max-w-md text-lead text-on-oxblood-muted">
            Cash can be spent on anything. A basket arrives as food, and you see it happen twice:
            the till receipt when we finish shopping, and the bags at the door.
          </p>
          <ul className="mt-8 space-y-3 font-semibold">
            {[
              'A photo of the real till receipt, by email',
              'A photo at the door, and who received it',
              'A text to your family when the driver is on the way',
            ].map((line) => (
              <li key={line} className="flex items-start gap-3">
                <CircleCheck className="mt-0.5 size-icon shrink-0 text-mango" aria-hidden />
                {line}
              </li>
            ))}
          </ul>
          <Link
            href="/how-it-works"
            className="mt-8 inline-flex min-h-control items-center gap-2 font-bold text-on-dark underline decoration-blush decoration-2 underline-offset-4 hover:decoration-on-dark"
          >
            See the full journey of an order
            <ArrowRight className="size-icon" aria-hidden />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
          {receipt && (
            <figure className="sm:-rotate-2">
              <div className="rounded-t-lg bg-surface px-5 pt-5 pb-9 text-ink paper-edge">
                <p className="flex items-center gap-2 text-small font-bold">
                  <ReceiptText className="size-icon text-crimson" aria-hidden />
                  {receipt.basketName}
                </p>
                <ul className="mt-4 space-y-2 border-t-2 border-dashed border-line pt-4 text-small text-ink-body">
                  {receipt.lines.map((l) => (
                    <li key={l.name} className="flex justify-between gap-3">
                      <span>
                        {l.qty} × {l.name}
                      </span>
                      <span className="tabular-nums">{formatJmd(l.jmd)}</span>
                    </li>
                  ))}
                  {receipt.more > 0 && (
                    <li className="text-ink-muted">
                      and {receipt.more} more {receipt.more === 1 ? 'item' : 'items'}
                    </li>
                  )}
                </ul>
                <p className="mt-4 flex justify-between border-t-2 border-dashed border-line pt-4 font-display text-h3 text-ink">
                  <span>Total</span>
                  <span className="tabular-nums">{formatJmd(receipt.totalJmd)}</span>
                </p>
              </div>
              <figcaption className="mt-3 text-small font-semibold text-on-oxblood-muted">
                1. The till receipt. Example, with today&rsquo;s prices.
              </figcaption>
            </figure>
          )}

          <div className="flex flex-col gap-5">
            <figure className="sm:rotate-2">
              <div className="relative rounded-3xl bg-cream p-2">
                <StockPhoto
                  name="homeStepToDoor"
                  alt="A paper bag of shopping carried up the steps to a front door"
                  sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 92vw"
                  className="aspect-[4/3] rounded-2xl"
                />
                <p className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-small font-bold text-ink">
                  <CircleCheck className="size-icon text-leaf" aria-hidden />
                  Delivered 2:41 PM
                </p>
              </div>
              <figcaption className="mt-3 text-small font-semibold text-on-oxblood-muted">
                2. The photo at the door. Example.
              </figcaption>
            </figure>

            <div>
              <ul className="space-y-2">
                {texts.map((t) => (
                  <li
                    key={t}
                    className="max-w-xs rounded-2xl rounded-bl-sm bg-leaf-soft px-4 py-3 text-small font-medium text-ink"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-small font-semibold text-on-oxblood-muted">
                What your family gets by text. Example wording. No app, no account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
