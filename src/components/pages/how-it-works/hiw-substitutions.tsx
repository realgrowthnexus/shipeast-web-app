import { Ban, MessageCircleQuestion, PackageX, Replace, type LucideIcon } from 'lucide-react'
import { OutcomeTag } from '@/components/order/item-outcome'
import { formatUsd } from '@/lib/format'
import { SUBSTITUTION_RULES } from '@/lib/substitution'
import type { SubstitutionRule } from '@/lib/types'

const ruleIcons: Record<SubstitutionRule, LucideIcon> = {
  allow_similar: Replace,
  ask_first: MessageCircleQuestion,
  leave_out: Ban,
}

const outcomes: Record<SubstitutionRule, { tags: ('substituted' | 'missing')[]; line: string }> = {
  allow_similar: {
    tags: ['substituted'],
    line: 'The driver picks the closest match at the same price or less. Your tracking page names what was bought instead.',
  },
  ask_first: {
    tags: ['substituted', 'missing'],
    line: 'We message you first. Say yes and it is swapped; say no, or if we don’t hear back in time, it is left out and refunded.',
  },
  leave_out: {
    tags: ['missing'],
    line: 'Nothing is swapped. You get back exactly what you paid for it.',
  },
}

/**
 * S4: one real item out of stock, and what each of the three rules does with it, side by side,
 * with the same tags the sender later sees on the tracker. The rules are alternatives, so they
 * are not numbered.
 */
export function HiwSubstitutions({ missing }: { missing: { name: string; cents: number } | null }) {
  return (
    <section aria-labelledby="subs-h" className="section">
      <div className="mx-auto max-w-page gutter">
        <div className="max-w-2xl">
          <h2 id="subs-h" className="scroll-mt-header text-h2 text-balance text-ink">
            Shelves run out. You decide what happens.
          </h2>
          <p className="mt-3 text-lead text-ink-body">
            At checkout you pick one rule for the whole order.{' '}
            {missing
              ? 'Here is what each rule does when the same item is missing.'
              : 'Here is what each rule does.'}
          </p>
        </div>

        {missing && (
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg border border-line bg-surface px-5 py-4">
            <p className="flex items-center gap-2 text-small font-semibold text-ink-muted">
              <PackageX className="size-icon shrink-0 text-warn" aria-hidden />
              Out of stock at the store
            </p>
            <p className="font-bold text-ink">{missing.name}</p>
            <p className="ml-auto flex items-center gap-3">
              <span className="font-bold text-ink tabular-nums">{formatUsd(missing.cents)}</span>
              <span className="rounded-full bg-surface-muted px-2 py-0.5 text-xs font-semibold text-ink-muted">
                Example
              </span>
            </p>
          </div>
        )}

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {SUBSTITUTION_RULES.map((rule) => {
            const Icon = ruleIcons[rule.value]
            const outcome = outcomes[rule.value]
            return (
              <article
                key={rule.value}
                aria-labelledby={`rule-${rule.value}`}
                className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-card-lg md:grid md:grid-cols-[3rem_1fr] md:gap-x-5 lg:flex"
              >
                <span className="grid size-12 place-items-center rounded-full bg-surface-muted">
                  <Icon className="size-icon-lg text-crimson" aria-hidden />
                </span>
                <div className="flex flex-1 flex-col gap-4">
                  <div>
                    <h3 id={`rule-${rule.value}`} className="text-h3 text-ink">
                      {rule.title}
                    </h3>
                    <p className="mt-2 text-ink-body">{rule.body}</p>
                  </div>
                  <div className="mt-auto border-t border-line pt-4">
                    <p className="text-small font-semibold text-ink-muted">What you see</p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                      {outcome.tags.map((tag, i) => (
                        <span key={tag} className="flex items-center gap-x-3">
                          {i > 0 && <span className="text-small text-ink-muted">or</span>}
                          <OutcomeTag outcome={tag} refundCents={missing?.cents ?? 0} />
                        </span>
                      ))}
                    </div>
                    <p className="mt-2 text-small text-ink-body">{outcome.line}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <p className="mt-6 text-small text-ink-muted">
          You choose the rule at checkout, in the delivery step. It applies to every item in the
          order.
        </p>
      </div>
    </section>
  )
}
