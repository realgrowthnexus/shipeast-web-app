import { formatClockTime } from '@/lib/format'
import { EXAMPLE_TIMES } from '@/lib/how-it-works'

/**
 * The two texts the family gets in the example order, shared by the order day (S2) and the
 * family section (S5) so the wording never drifts. Labelled as examples on the page.
 * Needs Derion: replace with the real Twilio templates once they are written.
 */
export const exampleTexts = [
  'ShipEast: Hi Paulette, groceries from Andre are on the way. Your driver will call when they are close.',
  `ShipEast: Delivered. Your groceries from Andre were handed over at ${formatClockTime(EXAMPLE_TIMES.delivered ?? '12:52')}.`,
]

/** The example recipient, shown on the drawn door photo. */
export const exampleRecipient = { name: 'Paulette Brown', place: 'Yallahs, St. Thomas' }
