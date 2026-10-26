import { Plus } from 'lucide-react'
import type { Faq } from '@/lib/types'

/**
 * Questions as an accordion, built on native <details> like the shared Accordion, so it works
 * without JavaScript, keeps its keyboard and screen reader behaviour, and is searchable with
 * Ctrl+F. The answer rises in gently when opened (switched off for reduced motion).
 */
export function FaqList({ faqs }: { faqs: Pick<Faq, 'id' | 'question' | 'answer'>[] }) {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
      {faqs.map((f) => (
        <details key={f.id} className="group">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-ink transition-colors duration-150 hover:bg-crimson-50 sm:px-6 [&::-webkit-details-marker]:hidden">
            <span className="text-h3">{f.question}</span>
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-tint text-crimson transition-[background-color,color] duration-200 group-open:bg-crimson group-open:text-white">
              <Plus
                className="size-5 transition-transform duration-200 ease-out-soft group-open:rotate-45"
                aria-hidden
              />
            </span>
          </summary>
          <div className="px-5 pb-6 group-open:animate-rise sm:px-6">
            <p className="max-w-2xl text-ink-body">{f.answer}</p>
          </div>
        </details>
      ))}
    </div>
  )
}
