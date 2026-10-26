import { Check, Minus } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { JamaicaFlag } from '@/components/site/jamaica'
import { cn } from '@/lib/cn'

/**
 * The three ways people look after family back home, compared on what matters to the sender.
 * Plain, general facts only: no prices or timings for anyone else's service.
 */
const ways = ['Sending cash', 'Shipping a barrel', 'Shop & Send'] as const

const rows: { label: string; values: [boolean, boolean, boolean] }[] = [
  { label: 'Arrives the same day', values: [true, false, true] },
  { label: 'Your family doesn’t have to go shopping', values: [false, true, true] },
  { label: 'You see exactly what was bought', values: [false, true, true] },
  { label: 'Fresh food, not only dry goods', values: [true, false, true] },
  { label: 'A photo when it reaches the door', values: [false, false, true] },
]

export function CompareWays() {
  return (
    <Reveal className="mt-10 overflow-hidden rounded-2xl border border-line bg-surface">
      <table className="w-full text-left">
        <caption className="sr-only">
          Sending cash, shipping a barrel and Shop & Send compared
        </caption>
        <thead>
          <tr className="border-b border-line">
            <th scope="col" className="p-4 sm:p-6">
              <span className="sr-only">What you get</span>
            </th>
            {ways.map((w, i) => (
              <th
                key={w}
                scope="col"
                className={cn(
                  'w-1/5 p-3 text-center text-small font-bold sm:w-1/6 sm:p-6 sm:text-body',
                  i === 2 ? 'bg-crimson text-white' : 'text-ink',
                )}
              >
                {i === 2 && <JamaicaFlag className="mx-auto mb-2 w-7" />}
                {w}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-b border-line last:border-0">
              <th scope="row" className="p-4 font-semibold text-ink sm:p-6">
                {r.label}
              </th>
              {r.values.map((yes, i) => (
                <td
                  key={ways[i]}
                  className={cn('p-3 text-center sm:p-6', i === 2 && 'bg-surface-tint')}
                >
                  {yes ? (
                    <Check
                      className={cn('mx-auto size-6', i === 2 ? 'text-crimson' : 'text-ink-body')}
                      role="img"
                      aria-label="Yes"
                    />
                  ) : (
                    <Minus className="mx-auto size-6 text-ink-muted" role="img" aria-label="No" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Reveal>
  )
}
