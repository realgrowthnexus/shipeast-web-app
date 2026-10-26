import { Repeat } from 'lucide-react'
import { reorderAction } from '@/app/(site)/account/actions'
import { Button } from '@/components/ui/button'
import type { ComponentProps } from 'react'

/** "Send this again": puts an earlier order's items back in the basket. Works without JS. */
export function ReorderButton({
  orderNo,
  label = 'Send this again',
  ...props
}: { orderNo: string; label?: string } & Pick<
  ComponentProps<typeof Button>,
  'variant' | 'size' | 'block' | 'className'
>) {
  return (
    <form action={reorderAction}>
      <input type="hidden" name="orderNo" value={orderNo} />
      <Button type="submit" {...props}>
        <Repeat aria-hidden />
        {label}
      </Button>
    </form>
  )
}
