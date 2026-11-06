import { cn } from '@/lib/cn'

/**
 * What the family sees on their phone: plain text messages from "ShipEast". Works on any
 * phone, so the panel is drawn as simple bubbles, not a smartphone mock-up.
 */
export function SmsPreview({
  messages,
  label,
  sender = 'ShipEast',
  className,
}: {
  messages: string[]
  /** The figure caption, e.g. "Examples of the text messages your family gets". */
  label: string
  sender?: string
  className?: string
}) {
  return (
    <figure className={cn('rounded-xl bg-surface p-card text-ink', className)}>
      <figcaption className="sr-only">{label}</figcaption>
      <p className="text-small font-semibold text-ink-muted" aria-hidden>
        {sender}
      </p>
      <div className="mt-3 flex flex-col gap-3">
        {messages.map((m) => (
          <p
            key={m}
            className="max-w-[85%] rounded-lg rounded-bl-sm bg-surface-muted px-4 py-3 text-body text-ink"
          >
            {m}
          </p>
        ))}
      </div>
    </figure>
  )
}
