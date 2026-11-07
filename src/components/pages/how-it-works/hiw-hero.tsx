import { Camera, Check } from 'lucide-react'
import Link from 'next/link'
import { CutoffNote } from '@/components/site/cutoff-note'
import { overlayLink } from '@/components/site/links'
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
 * S1 "One scene, one live order": the sender at home under the flat ink overlay, the text
 * anchored bottom-left, the example tracking card floating on the photo at the right, and a
 * crimson "On this page" rail docked under the scene. Below 1024px the photo is a stage that
 * carries only the h1 (under her chin), and the rest continues on solid ink, so her face is
 * never behind text on a phone.
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
    <section aria-labelledby="hiw-title" className="bg-ink text-on-dark on-dark-focus">
      <div className="relative isolate">
        {/* Photo layer: a 4:5 / 16:9 stage below 1024px, the whole scene from 1024px. */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-[125vw] md:h-[56.25vw] lg:inset-y-0 lg:h-auto"
        >
          <StockPhoto
            name="hiwSender"
            alt=""
            preload
            sizes="100vw"
            imgClassName="object-[72%_center] md:object-[62%_center] lg:object-[60%_40%]"
            className="absolute inset-0 rounded-none"
          />
          <div className="absolute inset-0 bg-photo-scrim-ink" />
        </div>

        <div className="mx-auto max-w-wide gutter pb-10 lg:grid lg:min-h-[640px] lg:grid-cols-12 lg:items-end lg:gap-8 lg:pt-32 lg:pb-12 xl:min-h-[720px]">
          <div className="lg:col-span-7">
            {/* As tall as the stage below 1024px, so the h1 always sits on the photo's bottom edge. */}
            <div className="flex h-[125vw] flex-col justify-end pb-6 md:h-[56.25vw] md:pb-8 lg:block lg:h-auto lg:pb-0">
              <h1 id="hiw-title" className="max-w-2xl text-h1 text-balance">
                Follow one order from your laptop to their door
              </h1>
            </div>
            <p className="mt-6 max-w-2xl text-lead text-on-dark lg:mt-5">
              You pay online in US dollars. Our driver buys everything at a store in Jamaica and
              delivers it in {parishList || 'Jamaica'}. You see every step, with a photo of the till
              receipt and a photo at the door.
            </p>
            <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
              <ButtonLink href="/shop" variant="onDark" size="lg" className="w-full sm:w-auto">
                Start shopping
              </ButtonLink>
              <Link href="/track" className={`${overlayLink} self-start sm:self-auto`}>
                Track an order
              </Link>
            </div>
            {earliestCutoff && (
              <CutoffNote cutoff={earliestCutoff} tone="onPhoto" className="mt-6 lg:mt-8" />
            )}
          </div>
          <div className="mt-8 w-full max-w-sm animate-rise [animation-delay:200ms] lg:col-span-4 lg:col-start-9 lg:mt-0 lg:max-w-none lg:justify-self-end xl:w-80">
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

      <nav aria-label="On this page" className="bg-crimson">
        <div className="mx-auto flex max-w-wide flex-col items-start gap-2 gutter py-3 md:flex-row md:items-center md:gap-4 lg:gap-6 lg:py-4">
          <p className="shrink-0 text-small text-on-crimson-muted">On this page</p>
          <ul className="-my-1 flex w-full snap-x [scrollbar-width:thin] gap-2 overflow-x-auto py-1 md:w-auto md:flex-wrap md:overflow-visible lg:gap-x-6 lg:gap-y-0">
            {jumpLinks.map((l) => (
              <li key={l.href} className="shrink-0 snap-start">
                <a
                  href={l.href}
                  className="inline-flex min-h-control items-center rounded-full bg-crimson-deep px-4 text-small font-semibold whitespace-nowrap text-on-dark transition-colors duration-150 hover:bg-oxblood lg:bg-transparent lg:px-0 lg:text-body lg:underline lg:decoration-blush lg:decoration-2 lg:underline-offset-4 lg:hover:bg-transparent lg:hover:decoration-on-dark"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </section>
  )
}
