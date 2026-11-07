import { Check, X } from 'lucide-react'
import Link from 'next/link'
import { lightLink } from '@/components/site/links'
import { cn } from '@/lib/cn'

type Item = { title: string; body: React.ReactNode }

function RuleList({
  id,
  title,
  items,
  tone,
  children,
}: {
  id: string
  title: string
  items: Item[]
  tone: 'do' | 'dont'
  children?: React.ReactNode
}) {
  const Icon = tone === 'do' ? Check : X
  return (
    <section aria-labelledby={id}>
      <h3 id={id} className="text-title text-ink">
        {title}
      </h3>
      <ul className="mt-4">
        {items.map((item) => (
          <li
            key={item.title}
            className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-line py-5"
          >
            <span
              className={cn(
                'grid size-10 place-items-center rounded-full',
                tone === 'do' ? 'bg-ok-tint text-ok' : 'bg-surface-muted text-ink-muted',
              )}
            >
              <Icon className="size-icon" aria-hidden />
            </span>
            <p className="text-body">
              <strong className="font-bold text-ink">{item.title}</strong>{' '}
              <span className="text-ink-body">{item.body}</span>
            </p>
          </li>
        ))}
      </ul>
      {children}
    </section>
  )
}

/**
 * S3: what we promise beside what we refuse to do, as two ruled lists. Trust is as much about
 * the fears ruled out (cash going astray, barrels, surprise swaps) as the promises made.
 */
export function AboutPromise({
  parishList,
  bankTransfer,
}: {
  parishList: string
  bankTransfer: boolean
}) {
  const does: Item[] = [
    {
      title: 'Shop for the items you chose.',
      body: 'At a local store in Jamaica, item by item from your basket.',
    },
    { title: 'Photograph the till receipt.', body: 'You see every item and price we paid.' },
    {
      title: 'Deliver to the door.',
      body: 'And photograph the handover, added to your tracking link.',
    },
    {
      title: 'Follow your swap rule.',
      body: 'If an item is out of stock: a similar item, ask you first, or leave it out and refund it. You choose at checkout.',
    },
    {
      title: 'Charge you in US dollars.',
      body: `PayPal, or a debit or credit card through PayPal${bankTransfer ? ', or bank transfer' : ''}. You see the Jamaican dollar amount too.`,
    },
    {
      title: 'Text your family.',
      body: 'On any phone, when the order is on its way and when it’s delivered.',
    },
  ]
  const donts: Item[] = [
    {
      title: 'Ship anything.',
      body: 'No barrels, customs or freight. Only the money crosses the border.',
    },
    { title: 'Send cash.', body: 'Your money buys the items you picked, and nothing else.' },
    { title: 'Swap without your rule.', body: 'We never substitute an item you said not to.' },
    { title: 'Ask your family for anything.', body: 'No app, no account, no payment at the door.' },
    ...(parishList
      ? [
          {
            title: `Deliver outside ${parishList} yet.`,
            body: (
              <>
                Family somewhere else in Jamaica?{' '}
                <Link
                  href="/contact"
                  className="font-semibold text-crimson underline underline-offset-4"
                >
                  Tell us where
                </Link>
                .
              </>
            ),
          },
        ]
      : []),
  ]
  return (
    <section aria-labelledby="promise-title" className="bg-surface section">
      <div className="mx-auto max-w-page gutter">
        <div className="max-w-2xl">
          <h2 id="promise-title" className="text-h2 text-balance text-ink">
            What we do, and what we don&apos;t
          </h2>
          <p className="mt-3 text-lead text-ink-body">
            The same rules on every order, whether it&apos;s the weekly shop or a Christmas hamper.
          </p>
        </div>
        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <RuleList id="do-title" title="What we do" items={does} tone="do" />
          <RuleList id="dont-title" title="What we don’t do" items={donts} tone="dont">
            <Link href="/legal/refunds" className={lightLink}>
              Read our refunds and cancellations policy
            </Link>
          </RuleList>
        </div>
      </div>
    </section>
  )
}
