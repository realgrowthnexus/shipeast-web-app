import type { SubstitutionRule } from '@/lib/types'

/** What each out-of-stock choice means, worded the same on every page. */
export const SUBSTITUTION_RULES: { value: SubstitutionRule; title: string; body: string }[] = [
  {
    value: 'allow_similar',
    title: 'Allow similar',
    body: 'The driver picks the closest match at the same price or less. If it costs less, you get the difference back.',
  },
  {
    value: 'ask_first',
    title: 'Ask me first',
    body: 'We message you before swapping anything. No answer in time means we leave it out and refund it.',
  },
  {
    value: 'leave_out',
    title: 'Leave it out',
    body: 'We skip the item and refund what you paid for it.',
  },
]
