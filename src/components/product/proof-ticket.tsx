import { ReceiptText } from 'lucide-react'
import Link from 'next/link'
import { StockPhoto } from '@/components/site/stock-photo'

/**
 * The product page's one bold block (docs/product-v2/PLAN.md §2.C7): an oxblood ticket that
 * shows ShipEast's proof as objects, a little till receipt and the door photo from the home
 * proof band, beside what they mean.
 */
export function ProofTicket() {
  return (
    <section
      aria-labelledby="proof-title"
      className="grid animate-rise grid-cols-[1fr_auto] items-center gap-4 rounded-xl bg-oxblood p-card text-on-dark on-dark-focus [animation-delay:160ms]"
    >
      <div>
        <h2 id="proof-title" className="font-display text-body font-semibold">
          You’ll see it bought and delivered
        </h2>
        <p className="mt-1 text-small text-on-oxblood-muted">
          A photo of the till receipt when we finish shopping, and a photo of the bags at the door.
        </p>
        <Link
          href="/how-it-works"
          className="mt-2 inline-flex min-h-control items-center text-small font-semibold text-blush underline underline-offset-2"
        >
          How it works
        </Link>
      </div>
      <div aria-hidden className="flex items-center pr-1 max-[359px]:hidden">
        <div className="flex h-20 w-16 -rotate-[4deg] flex-col gap-1.5 bg-surface px-2 pt-2.5 pb-3 receipt-edge">
          <ReceiptText className="size-icon text-ink-muted" />
          <span className="h-1 rounded-sm bg-surface-strong" />
          <span className="h-1 w-4/5 rounded-sm bg-surface-strong" />
          <span className="h-1 rounded-sm bg-surface-strong" />
        </div>
        <StockPhoto
          name="homeStepToDoor"
          alt=""
          sizes="64px"
          className="-ml-3 size-16 rotate-[3deg] rounded-md ring-2 ring-surface"
        />
      </div>
    </section>
  )
}
