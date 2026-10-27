import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * Teaches tailwind-merge our named type scale (globals.css), so `text-h1` is read as a font
 * size and never dropped in favour of a text colour like `text-ink`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ['display', 'numeral', 'h1', 'h2', 'title', 'h3', 'lead', 'body', 'small', 'eyebrow'],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
