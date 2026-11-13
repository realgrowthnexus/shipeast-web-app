import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Parallax } from '@/components/motion/parallax'
import { Reveal } from '@/components/motion/reveal'
import { CutoffNote } from '@/components/site/cutoff-note'
import { StockPhoto } from '@/components/site/stock-photo'

/** The last ask (PLAN §3, row 11): what the groceries become, and one button. */
export function HomeClosing({ parishList, cutoff }: { parishList: string; cutoff: string | null }) {
  return (
    <section aria-labelledby="home-closing" className="mx-auto max-w-wide gutter pb-10 md:pb-12">
      <div className="grid overflow-hidden rounded-3xl bg-crimson text-on-dark on-dark-focus md:grid-cols-12">
        <Reveal className="p-7 sm:p-10 md:col-span-7 lg:p-12">
          <h2 id="home-closing" className="font-display text-title font-semibold text-balance">
            Start a basket for home.
          </h2>
          <p className="mt-5 max-w-md text-body text-on-crimson-muted">
            {parishList
              ? `Groceries on the table in ${parishList}, paid for from wherever you are.`
              : 'Groceries on the table in Jamaica, paid for from wherever you are.'}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/shop"
              className="btn-slide inline-flex min-h-control items-center gap-2 rounded-full bg-cream px-6 text-small font-semibold text-crimson-deep [--slide:var(--color-mango)] active:translate-y-px"
            >
              Start shopping
              <ArrowRight className="size-icon" aria-hidden />
            </Link>
            <Link
              href="/track"
              className="inline-flex min-h-control items-center font-semibold text-on-dark underline decoration-blush decoration-2 underline-offset-4 hover:decoration-on-dark"
            >
              Track an order
            </Link>
          </div>
          {cutoff && <CutoffNote cutoff={cutoff} tone="onDark" className="mt-8 max-w-md" />}
        </Reveal>
        <Parallax className="aspect-[4/3] md:col-span-5 md:aspect-auto md:h-full">
          <StockPhoto
            name="homeFamilyCook"
            sizes="(min-width: 768px) 520px, 100vw"
            className="h-full w-full rounded-none"
          />
        </Parallax>
      </div>
    </section>
  )
}
