import Link from 'next/link'
import type { ReactNode } from 'react'
import { formatDate } from '@/lib/format'
import type { Product } from '@/lib/types'

/**
 * "About this item" (docs/product-v2/PLAN.md §2.D): a short definition list of what we know,
 * rows with no value left out, then the item's description.
 */
export function ProductDetails({
  product,
  aisle,
  unitPrice,
}: {
  product: Product
  aisle: { name: string; href: string } | null
  unitPrice: string | null
}) {
  const rows: { label: string; value: ReactNode }[] = [
    ...(product.size ? [{ label: 'Size', value: product.size }] : []),
    ...(aisle
      ? [
          {
            label: 'Aisle',
            value: (
              <Link
                href={aisle.href}
                className="text-crimson underline underline-offset-2 hover:text-crimson-deep"
              >
                {aisle.name}
              </Link>
            ),
          },
        ]
      : []),
    ...(unitPrice ? [{ label: 'Price per unit', value: unitPrice }] : []),
    { label: 'Price checked in store', value: formatDate(product.priceCheckedAt) },
  ]
  return (
    <section
      aria-labelledby="details-title"
      className="mt-8 rounded-xl border border-line bg-surface p-card"
    >
      <h2 id="details-title" className="font-display text-lead font-semibold text-ink">
        About this item
      </h2>
      <dl className="mt-3 grid gap-x-8 gap-y-3 md:grid-cols-2">
        {rows.map((row) => (
          <div key={row.label} className="flex flex-col">
            <dt className="text-xs font-medium text-ink-muted">{row.label}</dt>
            <dd className="text-small font-medium text-ink tabular-nums">{row.value}</dd>
          </div>
        ))}
      </dl>
      {product.description && (
        <p className="mt-4 border-t border-line pt-4 text-small text-ink-body">
          {product.description}
        </p>
      )}
    </section>
  )
}
