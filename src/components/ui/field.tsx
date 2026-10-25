import { ChevronDown } from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/cn'

const control =
  'w-full rounded-md border-2 border-line bg-white px-3.5 text-base text-ink placeholder:text-ink-muted/70 transition-colors hover:border-blush focus:border-crimson focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-danger disabled:bg-blush-100 disabled:text-ink-muted'

/**
 * Label, control, help and error in one block. The label is always visible (never a
 * placeholder-only label) and the error sits right under the field it belongs to.
 */
export function Field({
  id,
  label,
  help,
  error,
  optional,
  children,
  className,
}: {
  id: string
  label: string
  help?: ReactNode
  error?: string
  optional?: boolean
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
        {optional && <span className="font-normal text-ink-muted"> (optional)</span>}
      </label>
      {children}
      {help && !error && (
        <p id={`${id}-help`} className="text-sm text-ink-muted">
          {help}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  )
}

/** aria props that connect a control to its Field's help or error text. */
export function describedBy(id: string, error?: string) {
  return {
    id,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? `${id}-error` : `${id}-help`,
  } as const
}

export function Input({ className, ...props }: ComponentProps<'input'>) {
  return <input className={cn(control, 'min-h-12', className)} {...props} />
}

export function Textarea({ className, ...props }: ComponentProps<'textarea'>) {
  return <textarea className={cn(control, 'min-h-28 py-3', className)} {...props} />
}

export function Select({ className, children, ...props }: ComponentProps<'select'>) {
  return (
    <div className="relative">
      <select className={cn(control, 'min-h-12 appearance-none pr-10', className)} {...props}>
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-3.5 size-5 -translate-y-1/2 text-ink-muted"
        aria-hidden
      />
    </div>
  )
}

/** Jamaican phone number input. Shows the 1-876 format the client asked for. */
export function PhoneInput({ className, ...props }: ComponentProps<'input'>) {
  return (
    <Input
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      placeholder="1-876-123-1234"
      className={className}
      {...props}
    />
  )
}

export function Checkbox({
  label,
  className,
  ...props
}: Omit<ComponentProps<'input'>, 'type'> & { label: ReactNode }) {
  return (
    <label className={cn('flex min-h-11 cursor-pointer items-start gap-3 py-2', className)}>
      <input
        type="checkbox"
        className="mt-0.5 size-5 shrink-0 cursor-pointer rounded accent-crimson"
        {...props}
      />
      <span className="text-base text-ink">{label}</span>
    </label>
  )
}

/**
 * A set of large choice cards backed by radio inputs, for decisions the sender must read,
 * like the substitution rule or the payment method. Works without JavaScript.
 */
export function ChoiceGroup({
  name,
  legend,
  options,
  defaultValue,
  columns = 1,
}: {
  name: string
  legend: string
  options: { value: string; title: string; description?: string; icon?: ReactNode }[]
  defaultValue?: string
  columns?: 1 | 2 | 3
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-ink">{legend}</legend>
      <div
        className={cn(
          'grid gap-2.5',
          columns === 2 && 'sm:grid-cols-2',
          columns === 3 && 'sm:grid-cols-3',
        )}
      >
        {options.map((o) => (
          <label
            key={o.value}
            className="group relative flex cursor-pointer gap-3 rounded-md border-2 border-line bg-white p-4 transition-colors hover:border-blush has-checked:border-crimson has-checked:bg-blush-100 has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-signal"
          >
            <input
              type="radio"
              name={name}
              value={o.value}
              defaultChecked={o.value === defaultValue}
              className="mt-0.5 size-5 shrink-0 accent-crimson focus-visible:outline-none"
            />
            <span className="flex flex-col gap-0.5">
              <span className="flex items-center gap-2 font-semibold text-ink">
                {o.icon}
                {o.title}
              </span>
              {o.description && <span className="text-sm text-ink-muted">{o.description}</span>}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
