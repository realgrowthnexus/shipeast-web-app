/**
 * Client formatting rules (from Derion). Every page formats money, dates, phones and names
 * through these helpers so the rules stay identical across the site, driver app and admin.
 */

const TIME_ZONE = 'America/Jamaica'

const usd = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const whole = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })

/** `3150` → `USD$31.50`, `3100` → `USD$31`. Amounts are integer US cents. */
export function formatUsd(cents: number): string {
  const sign = cents < 0 ? '-' : ''
  const abs = Math.abs(Math.round(cents))
  const body = abs % 100 === 0 ? whole.format(abs / 100) : usd.format(abs / 100)
  return `${sign}USD$${body}`
}

/** Converts US cents to Jamaican dollars at the admin-set rate, rounded to the nearest J$10. */
export function usdCentsToJmd(cents: number, jmdPerUsd: number): number {
  return Math.round(((cents / 100) * jmdPerUsd) / 10) * 10
}

/** `3100` → `J$3,100`. Takes whole Jamaican dollars; never shows decimals. */
export function formatJmd(jmd: number): string {
  const sign = jmd < 0 ? '-' : ''
  return `${sign}J$${whole.format(Math.abs(Math.round(jmd)))}`
}

const dateFmt = new Intl.DateTimeFormat('en-US', {
  timeZone: TIME_ZONE,
  month: 'long',
  day: 'numeric',
  year: 'numeric',
})
const timeFmt = new Intl.DateTimeFormat('en-US', {
  timeZone: TIME_ZONE,
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
})

/** `July 31, 2026`, in Jamaica time. */
export function formatDate(value: Date | string): string {
  return dateFmt.format(new Date(value))
}

/** `9:12 AM`, in Jamaica time. */
export function formatTime(value: Date | string): string {
  return timeFmt.format(new Date(value)).replace(/ /g, ' ')
}

/** `July 31, 2026 at 9:12 AM`. */
export function formatDateTime(value: Date | string): string {
  return `${formatDate(value)} at ${formatTime(value)}`
}

/** Jamaican area codes. 658 was added alongside 876 in 2018. */
const JM_AREA_CODES = ['876', '658']

/**
 * Normalises a Jamaican phone number to `1-876-123-1234`. Accepts `8761231234`,
 * `(876) 123-1234`, `+1 876 123 1234` and similar. Returns `null` when it isn't a Jamaican
 * number, so callers can show a validation error.
 */
export function formatJamaicanPhone(input: string): string | null {
  let digits = input.replace(/\D/g, '')
  if (digits.length === 11 && digits.startsWith('1')) digits = digits.slice(1)
  if (digits.length !== 10 || !JM_AREA_CODES.includes(digits.slice(0, 3))) return null
  return `1-${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
}

/** `chris BROWN` → `Chris Brown`. Keeps hyphenated and Mc/O' names readable. */
export function toTitleCase(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/(^|[\s\-'])(\p{L})/gu, (_, sep: string, ch: string) => sep + ch.toUpperCase())
    .replace(/\bMc(\p{L})/gu, (_, ch: string) => `Mc${ch.toUpperCase()}`)
}

/** `13:00` (a cut-off time stored in Jamaica time) → `1:00 PM`. */
export function formatClockTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number)
  const suffix = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 === 0 ? 12 : h % 12
  return `${hour}:${String(m).padStart(2, '0')} ${suffix}`
}
