'use client'

import { X } from 'lucide-react'
import { useEffect, useId, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { IconButton } from './button'

/**
 * Modal built on the native <dialog>: focus trapping, Escape to close and the backdrop come
 * from the browser. `variant="sheet"` slides up from the bottom on phones (the shop's filter
 * sheet); from 640px it is a centred dialog.
 */
export function Dialog({
  open,
  onClose,
  title,
  children,
  footer,
  variant = 'center',
  id,
  bodyClassName,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
  variant?: 'center' | 'sheet'
  id?: string
  /** Classes for the scrolling body, e.g. a taller max height. */
  bodyClassName?: string
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open && !el.open) el.showModal()
    if (!open && el.open) el.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      id={id}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby={titleId}
      className={cn(
        'm-auto max-h-[90dvh] w-[min(32rem,calc(100%-2rem))] overflow-hidden rounded-lg bg-surface p-0 text-ink shadow-float backdrop:bg-scrim backdrop:backdrop-blur-[2px]',
        variant === 'sheet' &&
          'mb-0 w-full max-w-none rounded-b-none max-sm:sheet-bottom sm:mb-auto sm:w-[min(32rem,calc(100%-2rem))] sm:rounded-lg',
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b border-line py-2 pr-2 pl-5">
        <h2 id={titleId} className="text-h3">
          {title}
        </h2>
        <IconButton label="Close" onClick={onClose}>
          <X aria-hidden />
        </IconButton>
      </div>
      <div className={cn('max-h-[60dvh] overflow-y-auto p-5', bodyClassName)}>{children}</div>
      {footer && <div className="border-t border-line bg-surface p-4">{footer}</div>}
    </dialog>
  )
}
