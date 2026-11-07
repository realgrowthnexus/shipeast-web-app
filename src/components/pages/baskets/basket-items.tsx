import { Badge } from '@/components/ui/badge'
import type { BasketRow } from '@/lib/baskets'
import { formatUsd } from '@/lib/format'

/**
 * What's inside one basket: every item, its quantity and today's shop price, ending in the
 * three totals that prove the saving.
 */
export function BasketItems({ row }: { row: BasketRow }) {
  const { basket, separateCents } = row.summary
  return (
    <div className="rounded-lg bg-page p-4 md:p-5">
      <table className="w-full text-left text-small text-ink-body tabular-nums">
        <caption className="sr-only">
          What&apos;s inside the {basket.name}, at today&apos;s shop prices
        </caption>
        <thead className="text-xs font-bold text-ink-muted">
          <tr>
            <th scope="col" className="pb-2">
              <span className="sr-only">Quantity</span>
            </th>
            <th scope="col" className="pb-2">
              Item
            </th>
            <th scope="col" className="pb-2 pl-3 text-right">
              Shop price
            </th>
          </tr>
        </thead>
        <tbody>
          {row.lines.map(({ product, quantity, lineCents }) => (
            <tr key={product.id} className="border-t border-line">
              <td className="w-10 py-2.5 pr-2 align-top font-bold whitespace-nowrap text-ink">
                {quantity} ×
              </td>
              <td className="py-2.5 align-top">
                <span className="block font-semibold text-ink">{product.name}</span>
                <span className="text-ink-muted">{product.size}</span>
                {product.status !== 'visible' && (
                  <Badge tone="warn" className="ml-2">
                    Out of stock
                  </Badge>
                )}
              </td>
              <td className="py-2.5 pl-3 text-right align-top whitespace-nowrap">
                {formatUsd(lineCents)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="border-t border-dashed border-line-strong">
          {row.savingCents > 0 && (
            <tr>
              <th scope="row" colSpan={2} className="pt-3 font-normal">
                Bought one by one
              </th>
              <td className="pt-3 pl-3 text-right whitespace-nowrap">{formatUsd(separateCents)}</td>
            </tr>
          )}
          <tr>
            <th
              scope="row"
              colSpan={2}
              className={row.savingCents > 0 ? 'pt-1 font-normal' : 'pt-3 font-normal'}
            >
              Basket price
            </th>
            <td
              className={`${row.savingCents > 0 ? 'pt-1' : 'pt-3'} pl-3 text-right whitespace-nowrap`}
            >
              {formatUsd(basket.priceCents)}
            </td>
          </tr>
          {row.savingCents > 0 && (
            <tr className="font-extrabold text-crimson">
              <th scope="row" colSpan={2} className="pt-1">
                You save
              </th>
              <td className="pt-1 pl-3 text-right whitespace-nowrap">
                {formatUsd(row.savingCents)}
              </td>
            </tr>
          )}
        </tfoot>
      </table>
    </div>
  )
}
