import {
  Camera,
  Clock3,
  DollarSign,
  MapPin,
  MessageSquareText,
  Repeat2,
  Receipt,
} from 'lucide-react'

/**
 * A slow band of the promises every order carries. Facts only, never invented numbers. The list
 * is written twice so the scroll loops without a gap; the copy is hidden from screen readers,
 * which read the first copy as a normal list.
 */
const promises = [
  { icon: Receipt, text: 'Photo of the store receipt' },
  { icon: Camera, text: 'Photo at the door' },
  { icon: Clock3, text: 'Same-day delivery' },
  { icon: DollarSign, text: 'Pay in US dollars' },
  { icon: MessageSquareText, text: 'Your family gets a text' },
  { icon: Repeat2, text: 'You choose the swaps' },
  { icon: MapPin, text: 'St. Thomas and Kingston' },
]

export function PromiseTicker({ tone = 'oxblood' }: { tone?: 'oxblood' | 'tint' }) {
  const dark = tone === 'oxblood'
  const list = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {promises.map(({ icon: Icon, text }) => (
        <li key={text} className="flex items-center gap-3 font-semibold whitespace-nowrap">
          <Icon className={dark ? 'size-5 text-blush' : 'size-5 text-crimson'} aria-hidden />
          {text}
        </li>
      ))}
    </ul>
  )
  return (
    <div
      className={
        dark
          ? 'overflow-hidden bg-oxblood py-5 text-white'
          : 'overflow-hidden border-y border-line bg-crimson-50 py-5 text-ink'
      }
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {list(false)}
        {list(true)}
      </div>
    </div>
  )
}
