'use client'

import type { ComponentProps } from 'react'
import { Select } from '@/components/ui/field'

/** A select that submits its form as soon as it changes. The form keeps a button for no-JS. */
export function SubmitOnChangeSelect(props: ComponentProps<typeof Select>) {
  return <Select {...props} onChange={(e) => e.currentTarget.form?.requestSubmit()} />
}
