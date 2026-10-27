'use client'

import { ArrowRight, Clock3 } from 'lucide-react'
import Link from 'next/link'
import { cutoffInLocalTime, formatDuration, minutesToCutoff } from '@/lib/cutoff'
import { formatClockTime } from '@/lib/format'
import { useNow } from './use-now'

type Zone = { id: string; parish: string; fee: string }

/**
 * The live "today" card beside the hero: how long is left to order for same-day delivery,
 * counted against the real Jamaica-time cut-off, plus each zone's fee. Before JavaScript loads
 * it shows the cut-off itself, which is always true.
 */
export function TodayCard({ cutoff, zones }: { cutoff: string; zones: Zone[] }) {
  const now = useNow()
  const left = now ? minutesToCutoff(cutoff, now) : null
  const local = now ? cutoffInLocalTime(cutoff, now) : null
  const time = formatClockTime(cutoff)
  const open = left === null || left > 0

  return (
    <aside
      aria-labelledby="today-h"
      className="flex h-full flex-col rounded-xl border border-line bg-surface p-card"
    >
      <p id="today-h" className="flex items-center gap-2 text-small font-semibold text-ink-muted">
        <Clock3 className="size-4 text-crimson" aria-hidden />
        {open ? 'Same-day delivery' : 'Next delivery'}
      </p>
      <p className="mt-3 text-h2 text-ink tabular-nums" aria-live="polite">
        {left === null ? `By ${time}` : open ? `${formatDuration(left)} left` : 'Tomorrow'}
      </p>
      <p className="mt-1 text-small text-ink-body">
        {open ? (
          <>
            to order for delivery today. Cut-off {time} Jamaica time
            {local && local !== time && <> ({local} your time)</>}.
          </>
        ) : (
          <>Today&apos;s cut-off has passed. Order now and we shop on the next delivery day.</>
        )}
      </p>
      <ul className="mt-5 grid gap-2 border-t border-line pt-4 text-small">
        {zones.map((z) => (
          <li key={z.id} className="flex items-center justify-between gap-3">
            <span className="text-ink-body">{z.parish}</span>
            <span className="font-semibold text-ink tabular-nums">{z.fee} delivery</span>
          </li>
        ))}
      </ul>
      {/* How the day runs, so the countdown means something (wide screens; the proof band covers it on phones) */}
      <ol className="mt-5 hidden gap-3 border-t border-line pt-4 text-small lg:grid">
        {[
          [open ? `Before ${time}` : 'Now', 'You order and pay in US dollars'],
          ['Then', 'Our driver shops and sends the receipt photo'],
          [open ? 'Today' : 'Next day', 'At their door, with a doorstep photo'],
        ].map(([when, what], i) => (
          <li key={when} className="grid grid-cols-[1.5rem_1fr] gap-x-2">
            <span className="grid size-6 place-items-center rounded-full border border-line-strong text-xs font-bold text-ink">
              {i + 1}
            </span>
            <span>
              <span className="block font-semibold text-ink">{when}</span>
              <span className="text-ink-body">{what}</span>
            </span>
          </li>
        ))}
      </ol>
      <Link
        href="/track"
        className="group mt-auto hidden min-h-11 items-center gap-1.5 pt-4 text-small font-semibold text-ink-body hover:text-crimson lg:inline-flex"
      >
        Track an order
        <ArrowRight
          className="size-4 transition-transform duration-250 ease-out-soft group-hover:translate-x-0.5 motion-reduce:transition-none"
          aria-hidden
        />
      </Link>
    </aside>
  )
}
