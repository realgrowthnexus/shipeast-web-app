import { ClosingPanel } from '@/components/site/closing-panel'
import { formatClockTime } from '@/lib/format'

/**
 * S9: one calm last ask, also used at the foot of How it works and About. (CtaBand is a wider
 * panel with a photo, so it is not reused here.)
 */
export function HomeClosing({
  parishList,
  earliestCutoff,
}: {
  parishList: string
  earliestCutoff: string | null
}) {
  return (
    <ClosingPanel
      id="closing-title"
      title="Start a basket for home"
      primary={{ href: '/shop', label: 'Start shopping' }}
      secondary={{ href: '/track', label: 'Track an order' }}
    >
      {parishList && earliestCutoff ? (
        <>
          Same-day delivery in {parishList} when you order by{' '}
          <span className="tabular-nums">{formatClockTime(earliestCutoff)}</span> Jamaica time.
        </>
      ) : (
        'Delivery in Jamaica, with a photo of the receipt and a photo at the door.'
      )}
    </ClosingPanel>
  )
}
