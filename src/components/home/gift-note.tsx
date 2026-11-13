import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Reveal } from '@/components/motion/reveal'

/**
 * The gift note (docs/home-v3/audits/layout.md §3.5): the emotional centre of the service, in a
 * block of its own rather than a strip inside the baskets panel. A real paper note, what it
 * is, and the way to the gifts page, on one row from tablets up.
 */
export function HomeGiftNote() {
  return (
    <section aria-labelledby="home-gift" className="mx-auto max-w-wide gutter pt-10 md:pt-12">
      <Reveal
        y={0}
        className="grid items-center gap-6 rounded-2xl bg-crimson px-6 py-8 text-on-dark on-dark-focus md:grid-cols-12 md:gap-8 md:px-10 md:py-10 lg:px-14 lg:py-12"
      >
        <p
          aria-hidden
          className="-rotate-3 justify-self-center rounded-md bg-surface px-6 py-5 font-hand text-[2rem] leading-none text-crimson-deep shadow-lift md:col-span-4"
        >
          Happy birthday, Grandma!
        </p>
        <div className="md:col-span-5">
          <h2 id="home-gift" className="font-display text-title font-semibold text-on-dark">
            Add a note
          </h2>
          <p className="mt-2 max-w-md text-small text-on-crimson-muted">
            Write a few words at checkout. We print them and put the note in the bag, so it arrives
            as a gift from you.
          </p>
        </div>
        <Link
          href="/gifts"
          className="btn-slide inline-flex min-h-control items-center justify-center gap-2 rounded-md bg-surface px-5 text-small font-semibold text-crimson-deep [--slide:var(--color-mango)] md:col-span-3 md:justify-self-end"
        >
          Gifts and occasions
          <ArrowRight className="size-icon" aria-hidden />
        </Link>
      </Reveal>
    </section>
  )
}
