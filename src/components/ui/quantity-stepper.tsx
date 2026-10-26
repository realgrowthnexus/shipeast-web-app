'use client'

import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/cn'

export function QuantityStepper({
  name,
  label,
  defaultValue = 1,
  min = 1,
  max = 20,
  onChange,
  className,
}: {
  name?: string
  /** What is being counted, for screen readers: "Quantity of Long Grain Rice". */
  label: string
  defaultValue?: number
  min?: number
  max?: number
  onChange?: (value: number) => void
  className?: string
}) {
  const [value, setValue] = useState(defaultValue)
  const set = (next: number) => {
    const clamped = Math.min(max, Math.max(min, next))
    setValue(clamped)
    onChange?.(clamped)
  }
  const btn =
    'grid size-11 place-items-center text-crimson transition-colors hover:bg-surface-tint disabled:text-ink-disabled disabled:hover:bg-transparent'

  return (
    <div
      className={cn(
        'inline-flex items-center overflow-hidden rounded-md border-[1.5px] border-line-strong bg-surface',
        className,
      )}
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        className={btn}
        onClick={() => set(value - 1)}
        disabled={value <= min}
        aria-label="Remove one"
      >
        <Minus className="size-4" aria-hidden />
      </button>
      <output className="w-9 text-center font-bold text-ink tabular-nums" aria-live="polite">
        {value}
      </output>
      {name && <input type="hidden" name={name} value={value} />}
      <button
        type="button"
        className={btn}
        onClick={() => set(value + 1)}
        disabled={value >= max}
        aria-label="Add one"
      >
        <Plus className="size-4" aria-hidden />
      </button>
    </div>
  )
}
