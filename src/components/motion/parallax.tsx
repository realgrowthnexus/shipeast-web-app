'use client'

import { useScroll, useTransform } from 'motion/react'
import * as m from 'motion/react-m'
import { type ReactNode, useRef } from 'react'
import { cn } from '@/lib/cn'

/**
 * Moves its child a little slower than the page as it scrolls past, for depth on large photos.
 * The child is scaled up slightly so its edges never show. Keep it for one or two big photos per
 * page; it is switched off for reduced motion.
 */
export function Parallax({
  children,
  className,
  strength = 8,
}: {
  children: ReactNode
  className?: string
  /** Total travel as a percentage of the frame height. */
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength / 2}%`, `${strength / 2}%`])
  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <m.div style={{ y }} className="absolute inset-x-0 -inset-y-[6%]">
        {children}
      </m.div>
    </div>
  )
}
