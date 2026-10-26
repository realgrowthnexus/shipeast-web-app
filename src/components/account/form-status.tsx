import { Alert } from '@/components/ui/alert'
import type { FormState } from '@/lib/account/schemas'

/** The message at the top of an account form after it is sent. */
export function FormStatus({ state }: { state: FormState }) {
  if (state.status === 'ok') return <Alert tone="ok" title={state.message} />
  if (state.status === 'error') {
    const title =
      state.message ??
      (Object.keys(state.errors).length ? 'Please check the highlighted fields.' : '')
    return title ? <Alert tone="danger" title={title} /> : null
  }
  return null
}

/** Helpers for reading a form state in a field. */
export function stateFields(state: FormState) {
  return {
    errors: state.status === 'error' ? state.errors : ({} as Record<string, string>),
    values: state.status === 'error' ? state.values : ({} as Record<string, string>),
  }
}
