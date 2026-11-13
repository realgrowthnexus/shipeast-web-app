import { ArrowRight, CircleCheck, ReceiptText } from 'lucide-react'
import Link from 'next/link'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { StockPhoto } from '@/components/site/stock-photo'
import { formatJmd } from '@/lib/format'
import type { Receipt } from '@/lib/home'

const texts = [
  'ShipEast: Your groceries from Marcia are on the way. The driver will deliver today.',
  'ShipEast: Delivered. Your groceries from Marcia were dropped off at 2:41 PM.',
]

/**
 * Proof (docs/home-v3/audits/layout.md §3.6): the reason to choose us, and the one BIG moment
 * on the page. The headline goes large; then the things themselves, side by side: the till
 * receipt, the photo at the door and the two texts the family gets. They arrive in that order,
 * the page's one choreographed scroll sequence.
 */
export function HomeProof({ receipt }: { receipt: Receipt | null }) {
  return (
    <section
      aria-labelledby="home-proof"
      className="mt-10 rounded-t-2xl bg-oxblood text-on-dark on-dark-focus md:mt-12"
    >
      <div className="mx-auto max-w-wide gutter section">
        <Reveal y={0} className="grid items-end gap-6 lg:grid-cols-12 lg:gap-8">
          <h2
            id="home-proof"
            className="max-w-[12ch] font-display text-display font-semibold text-balance lg:col-span-7"
          >
            Send groceries, not money.
          </h2>
          <p className="max-w-md text-body text-on-oxblood-muted lg:col-span-5 lg:pb-2">
            Cash can be spent on anything. A basket arrives as food, and you see it happen twice:
            the till receipt when we finish shopping, and the bags at the door.
          </p>
        </Reveal>

        <div className="mt-12 grid items-start gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-10">
          {receipt && (
            <Reveal as="figure" y={16} className="sm:-rotate-2">
              <div className="rounded-t-lg bg-surface px-5 pt-5 pb-9 text-ink paper-edge">
                <p className="flex items-center gap-2 text-small font-semibold">
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
                <p className="mt-4 flex justify-between border-t-2 border-dashed border-line pt-4 text-body font-semibold text-ink">
                  <span>Total</span>
                  <span className="tabular-nums">{formatJmd(receipt.totalJmd)}</span>
                </p>
              </div>
              <figcaption className="mt-3 text-small font-medium text-on-oxblood-muted">
                1. The till receipt. Example, with today&rsquo;s prices.
              </figcaption>
            </Reveal>
          )}

          <Reveal as="figure" y={16} delay={0.12} className="sm:rotate-2">
            <div className="relative rounded-xl bg-surface p-2">
              <StockPhoto
                name="homeStepToDoor"
                alt="A paper bag of shopping carried up the steps to a front door"
                sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw"
                className="aspect-[4/3] rounded-md"
              />
              <p className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-small font-semibold text-ink">
                <CircleCheck className="size-icon text-leaf" aria-hidden />
                Delivered 2:41 PM
              </p>
            </div>
            <figcaption className="mt-3 text-small font-medium text-on-oxblood-muted">
              2. The photo at the door. Example.
            </figcaption>
          </Reveal>

          <div className="sm:col-span-2 lg:col-span-1">
            <Stagger className="space-y-2" delay={0.24}>
              {texts.map((t) => (
                <StaggerItem
                  key={t}
                  className="max-w-xs rounded-xl rounded-bl-sm bg-leaf-soft px-4 py-3 text-small font-medium text-ink"
                >
                  {t}
                </StaggerItem>
              ))}
            </Stagger>
            <p className="mt-3 text-small font-medium text-on-oxblood-muted">
              3. What your family gets by text. Example wording. No app, no account.
            </p>
          </div>
        </div>

        <Link
          href="/how-it-works"
          className="mt-10 inline-flex min-h-control items-center gap-2 font-semibold text-on-dark underline decoration-blush decoration-2 underline-offset-4 hover:decoration-on-dark"
        >
          See the full journey of an order
          <ArrowRight className="size-icon" aria-hidden />
        </Link>
      </div>
    </section>
  )
}
