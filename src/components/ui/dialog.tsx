'use client'

import { X } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { IconButton } from './button'

/**
 * Modal built on the native <dialog>: focus trapping, Escape to close and the backdrop come
 * from the browser. `variant="sheet"` slides up from the bottom on phones (mobile basket).
 */
export function Dialog({
  open,
  onClose,
  title,
  children,
  footer,
  variant = 'center',
}: {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
  variant?: 'center' | 'sheet'
}) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open && !el.open) el.showModal()
    if (!open && el.open) el.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="dialog-title"
      className={cn(
        'm-auto max-h-[90dvh] w-[min(32rem,calc(100%-2rem))] overflow-hidden rounded-lg bg-blush-100 p-0 text-ink shadow-lift backdrop:bg-oxblood/60 backdrop:backdrop-blur-[2px]',
        variant === 'sheet' &&
          'mb-0 w-full max-w-none rounded-b-none sm:mb-auto sm:w-[min(32rem,calc(100%-2rem))] sm:rounded-lg',
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b border-line py-2 pr-2 pl-5">
        <h2 id="dialog-title" className="text-lg font-bold">
          {title}
        </h2>
        <IconButton label="Close" onClick={onClose}>
          <X aria-hidden />
        </IconButton>
      </div>
      <div className="max-h-[60dvh] overflow-y-auto p-5">{children}</div>
      {footer && <div className="border-t border-line bg-white p-4">{footer}</div>}
    </dialog>
  )
}
