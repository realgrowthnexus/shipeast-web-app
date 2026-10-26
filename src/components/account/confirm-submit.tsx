'use client'

import { useState, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'

/**
 * A destructive button that asks once more before it submits its form, without a pop-up:
 * the first press swaps it for "Yes, delete" and "Keep it".
 */
export function ConfirmSubmit({
  label,
  confirmLabel,
  question,
  icon,
}: {
  label: string
  confirmLabel: string
  question: string
  icon?: ReactNode
}) {
  const [asking, setAsking] = useState(false)
  if (!asking) {
    return (
      <Button type="button" variant="ghost" className="text-danger" onClick={() => setAsking(true)}>
        {icon}
        {label}
      </Button>
    )
  }
  return (
    <div role="group" aria-label={question} className="flex flex-wrap items-center gap-3">
      <p className="font-semibold text-ink">{question}</p>
      <Button type="submit" variant="destructive" autoFocus>
        {confirmLabel}
      </Button>
      <Button type="button" variant="ghost" onClick={() => setAsking(false)}>
        Keep it
      </Button>
    </div>
  )
}
