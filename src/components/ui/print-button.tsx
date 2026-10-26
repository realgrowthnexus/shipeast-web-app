'use client'

import { Printer } from 'lucide-react'
import { Button } from './button'

/** Opens the browser's print dialog, where people can also save as PDF. */
export function PrintButton({ label = 'Print or save as PDF' }: { label?: string }) {
  return (
    <Button type="button" onClick={() => window.print()} className="print:hidden">
      <Printer aria-hidden />
      {label}
    </Button>
  )
}
