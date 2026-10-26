import { Minus, Plus, ShoppingBasket, Tag, Trash2, X } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { ProductImage } from '@/components/shop/product-image'
import { Container, PageIntro } from '@/components/site/page-intro'
import { Alert } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button, ButtonLink } from '@/components/ui/button'
import { EmptyState, Skeleton } from '@/components/ui/card'
import { Input } from '@/components/ui/field'
import {
  applyPromo,
  chooseParish,
  removeFromBasket,
  removePromo,
  updateQuantity,
} from '@/lib/basket/actions'
import { readBasket } from '@/lib/basket/cookie'
import { priceBasket, type PricedBasket, type PricedLine } from '@/lib/basket/pricing'
import { MAX_QUANTITY } from '@/lib/basket/state'
import { getCatalogue } from '@/lib/data/catalogue'
import { getSettings } from '@/lib/data/site'
import { formatClockTime, formatJmd, formatUsd, usdCentsToJmd } from '@/lib/format'
import { SubmitOnChangeSelect } from './submit-on-change'

export const metadata: Metadata = {
  title: 'Your basket',
  robots: { index: false },
}

export default function BasketPage() {
  return (
    <>
      <PageIntro title="Your basket" />
      <Container className="py-10">
        <Suspense fallback={<BasketSkeleton />}>
          <BasketView />
        </Suspense>
      </Container>
    </>
  )
}

async function BasketView() {
  const [state, catalogue, settings] = await Promise.all([
    readBasket(),
    getCatalogue(),
    getSettings(),
  ])
  const priced = priceBasket(state, catalogue)
  const rate = settings.jmdPerUsd

  if (!priced.lines.length) {
    return (
      <EmptyState
        icon={<ShoppingBasket aria-hidden />}
        title="Your basket is empty"
        action={
          <div className="flex flex-wrap justify-center gap-2">
            <ButtonLink href="/shop">Start shopping</ButtonLink>
            <ButtonLink href="/baskets" variant="outline">
              Ready-made baskets
            </ButtonLink>
          </div>
        }
      >
        Add groceries, household and pharmacy items, and we’ll buy them in Jamaica on the day we
        deliver.
      </EmptyState>
    )
  }

  const activeZones = catalogue.zones.filter((z) => z.active)

  return (
    <div className="grid gap-8 pb-24 lg:grid-cols-[1fr_24rem] lg:pb-0">
      <section aria-labelledby="items" className="flex flex-col gap-4">
        <h2 id="items" className="sr-only">
          Items
        </h2>
        {priced.hasUnavailable && (
          <Alert tone="warn" title="Some items aren’t available today">
            Remove them to continue. You aren’t charged for them.
          </Alert>
        )}
        <ul className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-blush-100">
          {priced.lines.map((line) => (
            <BasketLineRow key={`${line.kind}-${line.id}`} line={line} rate={rate} />
          ))}
        </ul>
        <Link
          href="/shop"
          className="self-start font-semibold text-crimson underline-offset-2 hover:underline"
        >
          Keep shopping
        </Link>
      </section>

      <aside
        aria-labelledby="summary"
        className="flex flex-col gap-5 self-start rounded-lg border border-line bg-blush-100 p-5 shadow-card lg:sticky lg:top-24"
      >
        <h2 id="summary" className="text-xl font-extrabold text-ink">
          Order summary
        </h2>

        {/* Keyed so React's post-action form reset shows the saved parish, not the first one. */}
        <form
          key={priced.zone?.id ?? 'none'}
          action={chooseParish}
          className="flex flex-col gap-1.5"
        >
          <label htmlFor="zoneId" className="text-sm font-semibold text-ink">
            Delivering to
          </label>
          <div className="flex gap-2">
            <SubmitOnChangeSelect
              id="zoneId"
              name="zoneId"
              defaultValue={priced.zone?.id ?? ''}
              className="flex-1"
            >
              <option value="" disabled>
                Choose a parish
              </option>
              {activeZones.map((z) => (
                <option key={z.id} value={z.id}>
                  {z.parish}, {formatUsd(z.feeCents)} delivery
                </option>
              ))}
            </SubmitOnChangeSelect>
            <noscript>
              <Button type="submit" variant="secondary">
                Set
              </Button>
            </noscript>
          </div>
          <p className="text-sm text-ink-muted">
            {priced.zone
              ? `Same-day delivery when you order by ${formatClockTime(priced.zone.cutoffTime)}, Jamaica time.`
              : `We deliver to ${activeZones.map((z) => z.parish).join(' and ')} for now.`}
          </p>
        </form>

        <PromoForm priced={priced} />

        <Totals priced={priced} rate={rate} />

        {priced.shortOfMinimumCents > 0 && priced.zone && (
          <p className="rounded-md bg-warn-tint p-3 text-sm text-ink">
            Add {formatUsd(priced.shortOfMinimumCents)} more to reach the{' '}
            {formatUsd(priced.zone.minOrderCents)} minimum for {priced.zone.parish}.
          </p>
        )}

        <CheckoutButton priced={priced} className="hidden lg:flex" />
      </aside>

      {/* Phones: total and checkout stay in reach while scrolling the list. */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-4 border-t border-line bg-blush-50/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex flex-col leading-tight">
          <span className="text-xs text-ink-muted">Total</span>
          <span className="text-lg font-extrabold text-ink tabular-nums">
            {formatUsd(priced.totalCents)}
          </span>
        </div>
        <CheckoutButton priced={priced} className="flex-1" compact />
      </div>
    </div>
  )
}

function BasketLineRow({ line, rate }: { line: PricedLine; rate: number }) {
  const hidden = (
    <>
      <input type="hidden" name="kind" value={line.kind} />
      <input type="hidden" name="id" value={line.id} />
    </>
  )
  const step =
    'grid size-10 place-items-center text-crimson hover:bg-blush-200 disabled:text-ink-muted/40 disabled:hover:bg-transparent'
  return (
    <li className="flex gap-3 p-3 sm:gap-4">
      {line.kind === 'product' ? (
        <ProductImage
          src={line.imagePath}
          alt=""
          categoryId={line.categoryId ?? undefined}
          sizes="96px"
          className="w-20 shrink-0 self-start sm:w-24"
        />
      ) : (
        <div className="grid aspect-[4/3] w-20 shrink-0 place-items-center self-start rounded-md bg-crimson text-xs font-bold text-white sm:w-24">
          Basket
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
          <div className="flex min-w-0 flex-col">
            <Link href={line.href} className="font-semibold text-ink hover:text-crimson">
              {line.name}
            </Link>
            <span className="text-sm text-ink-muted">
              {line.detail} · {formatUsd(line.unitCents)} each
            </span>
          </div>
          {line.available ? (
            <span className="text-right leading-tight">
              <span className="block font-extrabold text-ink tabular-nums">
                {formatUsd(line.totalCents)}
              </span>
              <span className="block text-xs text-ink-muted tabular-nums">
                about {formatJmd(usdCentsToJmd(line.totalCents, rate))}
              </span>
            </span>
          ) : (
            <Badge tone="warn">Not available</Badge>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          {line.available ? (
            <div
              role="group"
              aria-label={`Quantity of ${line.name}`}
              className="inline-flex items-center overflow-hidden rounded-md border-2 border-line bg-white"
            >
              <form action={updateQuantity}>
                {hidden}
                <input type="hidden" name="quantity" value={line.quantity - 1} />
                <button
                  type="submit"
                  className={step}
                  aria-label={line.quantity === 1 ? `Remove ${line.name}` : 'Remove one'}
                >
                  <Minus className="size-4" aria-hidden />
                </button>
              </form>
              <span className="w-9 text-center font-bold text-ink tabular-nums">
                {line.quantity}
              </span>
              <form action={updateQuantity}>
                {hidden}
                <input type="hidden" name="quantity" value={line.quantity + 1} />
                <button
                  type="submit"
                  className={step}
                  disabled={line.quantity >= MAX_QUANTITY}
                  aria-label="Add one"
                >
                  <Plus className="size-4" aria-hidden />
                </button>
              </form>
            </div>
          ) : (
            <span className="text-sm text-ink-muted">Out of stock today</span>
          )}
          <form action={removeFromBasket}>
            {hidden}
            <button
              type="submit"
              className="flex min-h-10 items-center gap-1.5 rounded-md px-2 text-sm font-semibold text-ink-muted hover:bg-blush-200 hover:text-danger"
            >
              <Trash2 className="size-4" aria-hidden />
              Remove<span className="sr-only"> {line.name}</span>
            </button>
          </form>
        </div>
      </div>
    </li>
  )
}

function PromoForm({ priced }: { priced: PricedBasket }) {
  const { promo } = priced
  if (promo.status === 'applied') {
    return (
      <div className="flex items-center gap-3 rounded-md bg-ok-tint p-3 text-sm">
        <Tag className="size-4 shrink-0 text-ok" aria-hidden />
        <div className="flex flex-1 flex-col">
          <span className="font-bold text-ok">{promo.code}</span>
          <span className="text-ink">{promo.description}</span>
        </div>
        <form action={removePromo}>
          <button
            type="submit"
            className="grid size-10 place-items-center rounded-md text-ink-muted hover:bg-white"
          >
            <X className="size-4" aria-hidden />
            <span className="sr-only">Remove code {promo.code}</span>
          </button>
        </form>
      </div>
    )
  }
  const error = promo.status === 'rejected' ? promo.reason : undefined
  return (
    <form
      key={promo.status === 'rejected' ? promo.code : 'empty'}
      action={applyPromo}
      className="flex flex-col gap-1.5"
    >
      <label htmlFor="code" className="text-sm font-semibold text-ink">
        Promo code <span className="font-normal text-ink-muted">(optional)</span>
      </label>
      <div className="flex gap-2">
        <Input
          id="code"
          name="code"
          defaultValue={promo.status === 'rejected' ? promo.code : ''}
          autoCapitalize="characters"
          autoComplete="off"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? 'code-error' : undefined}
          className="flex-1 uppercase"
        />
        <Button type="submit" variant="secondary">
          Apply
        </Button>
      </div>
      {error && (
        <p id="code-error" className="text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </form>
  )
}

function Totals({ priced, rate }: { priced: PricedBasket; rate: number }) {
  const row = 'flex justify-between gap-4'
  return (
    <dl className="flex flex-col gap-2 border-t border-line pt-4 text-ink">
      <div className={row}>
        <dt>Items ({priced.itemCount})</dt>
        <dd className="tabular-nums">{formatUsd(priced.subtotalCents)}</dd>
      </div>
      {priced.discountCents > 0 && (
        <div className={`${row} text-ok`}>
          <dt>Promo discount</dt>
          <dd className="tabular-nums">-{formatUsd(priced.discountCents)}</dd>
        </div>
      )}
      <div className={row}>
        <dt>Delivery</dt>
        <dd className="tabular-nums">
          {priced.deliveryCents === null ? (
            <span className="text-ink-muted">Choose a parish</span>
          ) : (
            formatUsd(priced.deliveryCents)
          )}
        </dd>
      </div>
      <div className={`${row} items-baseline border-t border-line pt-3`}>
        <dt className="text-lg font-bold">Total</dt>
        <dd className="text-right leading-tight">
          <span className="block text-2xl font-black tabular-nums">
            {formatUsd(priced.totalCents)}
          </span>
          <span className="block text-sm text-ink-muted tabular-nums">
            about {formatJmd(usdCentsToJmd(priced.totalCents, rate))}
          </span>
        </dd>
      </div>
    </dl>
  )
}

function checkoutBlocker(priced: PricedBasket): string | null {
  if (priced.hasUnavailable) return 'Remove unavailable items first'
  if (!priced.zone) return 'Choose a parish first'
  if (priced.shortOfMinimumCents > 0) return `Add ${formatUsd(priced.shortOfMinimumCents)} more`
  return null
}

function CheckoutButton({
  priced,
  className,
  compact,
}: {
  priced: PricedBasket
  className?: string
  compact?: boolean
}) {
  const blocker = checkoutBlocker(priced)
  if (blocker) {
    return (
      <Button size={compact ? 'md' : 'lg'} disabled block className={className}>
        {blocker}
      </Button>
    )
  }
  return (
    <ButtonLink href="/checkout" size={compact ? 'md' : 'lg'} block className={className}>
      Go to checkout
    </ButtonLink>
  )
}

function BasketSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_24rem]" aria-hidden>
      <Skeleton className="h-80" />
      <Skeleton className="h-96" />
    </div>
  )
}
