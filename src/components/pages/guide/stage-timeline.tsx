'use client'

import { useReducedMotion, useScroll, useTransform } from 'motion/react'
import * as m from 'motion/react-m'
import { useRef } from 'react'

/**
 * The seven tracker stages as a vertical timeline. The crimson line fills from the top as the
 * list scrolls through the screen, the way an order moves through its stages. With reduced
 * motion the line is simply full.
 */
export function StageTimeline({
  stages,
}: {
  stages: { key: string; label: string; text: string }[]
}) {
  const ref = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <ol ref={ref} className="relative flex flex-col gap-8 sm:gap-10">
      {/* The track sits behind the numbered dots: 22px is the middle of a 44px dot. */}
      <span
        aria-hidden
        className="absolute top-5 bottom-5 left-[21px] w-0.5 rounded-full bg-crimson-100"
      />
      <m.span
        aria-hidden
        style={{ scaleY: reduce ? 1 : scaleY }}
        className="absolute top-5 bottom-5 left-[21px] w-0.5 origin-top rounded-full bg-crimson"
      />
      {stages.map((stage, i) => (
        <li key={stage.key} className="relative flex gap-5 sm:gap-6">
          <span className="relative grid size-11 shrink-0 place-items-center rounded-full border-2 border-crimson bg-surface font-extrabold text-crimson tabular-nums">
            {i + 1}
          </span>
          <div className="pt-2">
            <h3 className="text-h3 text-ink">{stage.label}</h3>
            <p className="mt-1 max-w-xl text-ink-body">{stage.text}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
