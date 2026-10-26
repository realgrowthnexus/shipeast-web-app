import { CircleMinus, MessageCircleQuestion, Repeat2 } from 'lucide-react'
import { Stagger, StaggerItem } from '@/components/motion/reveal'
import { SUBSTITUTION_RULES } from '@/lib/substitution'
import type { SubstitutionRule } from '@/lib/types'

const icons: Record<SubstitutionRule, typeof Repeat2> = {
  allow_similar: Repeat2,
  ask_first: MessageCircleQuestion,
  leave_out: CircleMinus,
}

/** The three out-of-stock choices, worded as everywhere else on the site. */
export function SwapChoices() {
  return (
    <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
      {SUBSTITUTION_RULES.map((r) => {
        const Icon = icons[r.value]
        return (
          <StaggerItem
            key={r.value}
            className="flex flex-col gap-3 rounded-xl border border-line bg-surface p-card-lg"
          >
            <span className="grid size-12 place-items-center rounded-full bg-surface-tint">
              <Icon className="size-6 text-crimson" aria-hidden />
            </span>
            <h3 className="mt-2 text-h3 text-ink">{r.title}</h3>
            <p className="text-ink-body">{r.body}</p>
          </StaggerItem>
        )
      })}
    </Stagger>
  )
}
