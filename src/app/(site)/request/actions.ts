'use server'

import { z } from 'zod'
import { getActiveZones, getSettings } from '@/lib/data/site'
import { isDemoMode } from '@/lib/env'

const schema = z.object({
  item: z.string().trim().min(2, 'Tell us what you need.').max(200),
  details: z.string().trim().max(500).optional(),
  quantity: z.coerce.number().int('Use a whole number.').min(1, 'At least 1.').max(50, 'Up to 50.'),
  store: z.string().trim().max(100).optional(),
  budget: z.string().trim().max(40).optional(),
  zoneId: z.string().min(1, 'Choose the parish.'),
  name: z.string().trim().min(2, 'Enter your name.').max(100),
  email: z.email('Enter an email address like name@example.com.'),
})

type Key = keyof z.infer<typeof schema>

export type RequestState =
  | { status: 'idle' }
  | { status: 'error'; errors: Partial<Record<Key, string>>; values: Record<string, string> }
  | { status: 'sent'; preview: boolean }

const keys: Key[] = ['item', 'details', 'quantity', 'store', 'budget', 'zoneId', 'name', 'email']

export async function sendItemRequest(_prev: RequestState, form: FormData): Promise<RequestState> {
  const settings = await getSettings()
  if (!settings.features.item_requests) return { status: 'idle' }

  const values = Object.fromEntries(keys.map((k) => [k, String(form.get(k) ?? '')]))
  const parsed = schema.safeParse(
    Object.fromEntries(Object.entries(values).map(([k, v]) => [k, v || undefined])),
  )
  const zones = await getActiveZones()
  const errors: Partial<Record<Key, string>> = {}
  if (!parsed.success) {
    for (const issue of parsed.error.issues) errors[issue.path[0] as Key] ??= issue.message
  } else if (!zones.some((z) => z.id === parsed.data.zoneId)) {
    errors.zoneId = 'We don’t deliver there yet.'
  }
  if (Object.keys(errors).length) return { status: 'error', errors, values }

  if (isDemoMode()) return { status: 'sent', preview: true }
  // Request-any-item add-on: saved for ShipEast to quote once the add-on is switched on.
  return { status: 'sent', preview: false }
}
