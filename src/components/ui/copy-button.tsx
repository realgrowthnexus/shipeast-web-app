'use client'

import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

/** Copies a value (account number, amount, reference) so senders don't mistype it. */
export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } catch {
          // Clipboard blocked: the value is still on screen to copy by hand.
        }
      }}
      className="inline-flex min-h-11 items-center gap-1.5 rounded-md px-2.5 text-small font-semibold text-crimson hover:bg-surface-tint"
    >
      {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
      <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
      <span className="sr-only"> {label}</span>
    </button>
  )
}
