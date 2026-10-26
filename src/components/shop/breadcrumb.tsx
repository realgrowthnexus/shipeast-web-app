import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export function Breadcrumb({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-small">
      <ol className="flex flex-wrap items-center gap-1 text-ink-muted">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="size-4" aria-hidden />}
            {item.href ? (
              <Link href={item.href} className="hover:text-crimson">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-semibold text-ink">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/** Same-day delivery line, built from the live zones so it never promises a closed parish. */
export function deliveryPromise(zones: { parish: string; cutoffTime: string }[], cutoff: string) {
  const parishes = zones.map((z) => z.parish)
  const list =
    parishes.length > 1
      ? `${parishes.slice(0, -1).join(', ')} and ${parishes.at(-1)}`
      : (parishes[0] ?? '')
  return `Same-day delivery in ${list} when you order by ${cutoff}, Jamaica time.`
}
