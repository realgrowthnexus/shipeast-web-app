import { cva, type VariantProps } from 'class-variance-authority'
import { LoaderCircle } from 'lucide-react'
import Link from 'next/link'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'

export const buttonStyles = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-semibold whitespace-nowrap transition-[background-color,box-shadow,transform] duration-150 ease-out-soft select-none active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-[1.15em] [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-crimson text-white hover:bg-crimson-deep',
        secondary: 'bg-surface-tint text-crimson-deep hover:bg-blush',
        outline: 'border-[1.5px] border-crimson bg-transparent text-crimson hover:bg-surface-tint',
        ghost: 'text-ink hover:bg-surface-tint',
        dark: 'bg-ink text-white hover:bg-ink-body',
        onDark: 'bg-white text-crimson-deep hover:bg-surface',
        destructive: 'bg-danger text-white hover:bg-danger-deep',
      },
      size: {
        sm: 'min-h-11 px-4 text-small',
        md: 'min-h-11 px-5 text-body',
        lg: 'min-h-13 px-7 text-lead',
      },
      block: { true: 'w-full' },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

type ButtonVariants = VariantProps<typeof buttonStyles>

export function Button({
  variant,
  size,
  block,
  loading,
  className,
  children,
  disabled,
  ...props
}: ComponentProps<'button'> & ButtonVariants & { loading?: boolean }) {
  return (
    <button
      className={cn(buttonStyles({ variant, size, block }), className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <LoaderCircle className="animate-spin" aria-hidden />}
      {children}
    </button>
  )
}

export function ButtonLink({
  variant,
  size,
  block,
  className,
  ...props
}: ComponentProps<typeof Link> & ButtonVariants) {
  return <Link className={cn(buttonStyles({ variant, size, block }), className)} {...props} />
}

/** Square icon-only button. `label` is required so screen readers can name it. */
export function IconButton({
  label,
  className,
  variant = 'ghost',
  children,
  ...props
}: ComponentProps<'button'> & { label: string; variant?: ButtonVariants['variant'] }) {
  return (
    <button
      aria-label={label}
      title={label}
      className={cn(buttonStyles({ variant, size: 'md' }), 'size-11 px-0', className)}
      {...props}
    >
      {children}
    </button>
  )
}
