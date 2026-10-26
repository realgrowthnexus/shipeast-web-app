'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'

export function DialogDemo() {
  const [open, setOpen] = useState<null | 'center' | 'sheet'>(null)
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="secondary" onClick={() => setOpen('center')}>
        Open dialog
      </Button>
      <Button variant="secondary" onClick={() => setOpen('sheet')}>
        Open basket sheet
      </Button>
      <Dialog
        open={open !== null}
        onClose={() => setOpen(null)}
        variant={open ?? 'center'}
        title={open === 'sheet' ? 'Your basket' : 'Remove this item?'}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpen(null)}>
              Keep it
            </Button>
            <Button onClick={() => setOpen(null)}>
              {open === 'sheet' ? 'Go to checkout' : 'Remove item'}
            </Button>
          </div>
        }
      >
        <p className="text-ink-body">
          {open === 'sheet'
            ? 'On phones the basket slides up from the bottom so the shop stays in view.'
            : 'Long Grain Rice will come out of your basket. You can add it again any time.'}
        </p>
      </Dialog>
    </div>
  )
}
