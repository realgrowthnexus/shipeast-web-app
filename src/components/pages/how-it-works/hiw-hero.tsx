import { Camera, Check } from 'lucide-react'
import Link from 'next/link'
import { CutoffNote } from '@/components/site/cutoff-note'
import { onDarkLink } from '@/components/site/links'
import { StockPhoto } from '@/components/site/stock-photo'
import { ButtonLink } from '@/components/ui/button'
import { formatClockTime } from '@/lib/format'
import { EXAMPLE_TIMES } from '@/lib/how-it-works'

const jumpLinks = [
  { href: '#journey-h', label: 'The seven steps' },
  { href: '#proof-h', label: 'The two photos' },
  { href: '#subs-h', label: 'Out of stock' },
  { href: '#family-h', label: 'What your family gets' },
  { href: '#timing-h', label: 'When it arrives' },
  { href: '#nobody-home-h', label: 'If nobody is home' },
  { href: '#questions-title', label: 'Questions' },
]

/**
 * S1: the promise on solid crimson beside the sender at home, with an example tracking card
 * over the photo's corner (the home hero uses the receipt; this page's proof object is the
 * tracker). A jump strip at the foot serves the reader who came for one answer.
 */
export function HiwHero({
  parishList,
  earliestCutoff,
}: {
  parishList: string
  earliestCutoff: string | null
}) {
  const paid = formatClockTime(EXAMPLE_TIMES.paid ?? '09:12')
  const shopped = formatClockTime(EXAMPLE_TIMES.shopped ?? '11:48')
  return (
    <section
      aria-labelledby="hiw-title"
      className="bg-crimson section pb-10 text-on-dark on-dark-focus lg:pb-12"
    >
      <div className="mx-auto max-w-wide gutter">
        <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-8 xl:gap-12">
          <div className="max-w-2xl animate-rise lg:col-span-7 lg:max-w-none xl:pr-12">
            <h1 id="hiw-title" className="text-h1 text-balance">
              Follow one order from your laptop to their door
            </h1>
            <p className="mt-5 text-lead text-on-crimson-muted lg:mt-6">
              You pay online in US dollars. Our driver buys everything at a store in Jamaica and
              delivers it in {parishList || 'Jamaica'}. You see every step, with a photo of the till
              receipt and a photo at the door.
            </p>
            <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
              <ButtonLink href="/shop" variant="onDark" size="lg" className="w-full sm:w-auto">
                Start shopping
              </ButtonLink>
              <Link href="/track" className={`${onDarkLink} self-start sm:self-auto`}>
                Track an order
              </Link>
            </div>
            {earliestCutoff && (
              <CutoffNote cutoff={earliestCutoff} tone="onDark" className="mt-6 lg:mt-8" />
            )}
          </div>

          <div className="relative mt-10 animate-rise lg:col-span-5 lg:mt-0">
            <StockPhoto
              name="hiwSender"
              preload
              sizes="(min-width: 1280px) 500px, (min-width: 1024px) 38vw, 100vw"
              position="40% center"
              className="aspect-4/3 rounded-xl md:aspect-16/9 lg:aspect-4/5 lg:rounded-2xl"
            />
            <div className="relative z-raised -mt-16 mr-3 ml-auto w-64 md:-mt-20 md:mr-8 lg:absolute lg:-bottom-6 lg:-left-10 lg:m-0 xl:-left-16 xl:w-72">
              <div
                role="img"
                aria-label={`Example tracking page: out for delivery. Paid at ${paid}, shopped at ${shopped}, receipt photo sent.`}
                className="rounded-lg bg-surface p-4 text-ink shadow-float"
              >
                <div aria-hidden>
                  <span className="inline-block rounded-full bg-surface-muted px-2 py-0.5 text-xs font-semibold text-ink-muted">
                    Example order SE-10428
                  </span>
                  <p className="mt-3 flex items-center gap-2 font-bold">
                    <span className="size-2.5 rounded-full bg-signal" />
                    Out for delivery
                  </p>
                  <ul className="mt-3 flex flex-col gap-1.5 border-t border-line pt-3 text-small text-ink-body tabular-nums">
                    <li className="flex items-center gap-2">
                      <Check className="size-icon-sm shrink-0 text-ok" />
                      <span className="flex-1">Paid</span>
                      {paid}
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="size-icon-sm shrink-0 text-ok" />
                      <span className="flex-1">Shopped</span>
                      {shopped}
                    </li>
                    <li className="flex items-center gap-2">
                      <Camera className="size-icon-sm shrink-0 text-crimson" />
                      Receipt photo sent
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav
          aria-label="On this page"
          className="mt-12 rounded-xl bg-crimson-deep p-4 lg:mt-16 lg:flex lg:items-center lg:gap-6 lg:px-6"
        >
          <p className="text-small text-on-crimson-muted lg:shrink-0">On this page</p>
          <ul className="mt-2 grid grid-cols-2 gap-x-4 md:grid-cols-3 lg:mt-0 lg:flex lg:flex-wrap lg:gap-x-6">
            {jumpLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={onDarkLink}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}
