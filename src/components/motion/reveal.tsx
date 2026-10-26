'use client'

import * as m from 'motion/react-m'
import type { ReactNode } from 'react'
import { duration, ease, rise, staggerStep } from '@/lib/motion'

/** Plain attributes forwarded to the element. */
type PassThrough = { id?: string; 'aria-labelledby'?: string; 'aria-label'?: string }

type As = 'div' | 'section' | 'li' | 'ul' | 'ol' | 'article' | 'header' | 'figure' | 'p' | 'span'

/**
 * Fades a block in and lifts it into place the first time it scrolls into view. Content is in
 * the HTML from the start, so search engines and no-JS visitors see everything.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
  y = rise,
  ...rest
}: {
  children: ReactNode
  className?: string
  /** Seconds. */
  delay?: number
  as?: As
  /** Rise distance in px; 0 for a plain fade. */
  y?: number
} & PassThrough) {
  const Tag = m[as]
  return (
    <Tag
      {...rest}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: duration.reveal, ease: ease.outSoft, delay }}
    >
      {children}
    </Tag>
  )
}

/** A list whose items appear one after another. Use `StaggerItem` for each child. */
export function Stagger({
  children,
  className,
  as = 'ul',
  delay = 0,
  ...rest
}: {
  children: ReactNode
  className?: string
  as?: As
  delay?: number
} & PassThrough) {
  const Tag = m[as]
  return (
    <Tag
      {...rest}
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: staggerStep, delayChildren: delay } },
      }}
    >
      {children}
    </Tag>
  )
}

export function StaggerItem({
  children,
  className,
  as = 'li',
}: {
  children: ReactNode
  className?: string
  as?: As
}) {
  const Tag = m[as]
  return (
    <Tag
      className={className}
      variants={{
        hidden: { opacity: 0, y: rise },
        shown: { opacity: 1, y: 0, transition: { duration: duration.reveal, ease: ease.outSoft } },
      }}
    >
      {children}
    </Tag>
  )
}
