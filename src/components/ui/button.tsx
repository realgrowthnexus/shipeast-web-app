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
        secondary: 'bg-blush-200 text-crimson-deep hover:bg-blush',
        outline: 'border-2 border-crimson bg-transparent text-crimson hover:bg-blush-200',
        ghost: 'text-ink hover:bg-blush-200',
        onDark: 'bg-white text-crimson-deep hover:bg-blush-100',
        destructive: 'bg-danger text-white hover:bg-[#93190f]',
      },
      size: {
        sm: 'min-h-9 px-3.5 text-sm',
        md: 'min-h-11 px-5 text-base',
        lg: 'min-h-13 px-7 text-lg',
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
