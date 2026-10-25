/** Wraps each search word found in `text` in a <mark>. */
export function Highlight({ text, query }: { text: string; query: string }) {
  const words = query
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  if (!words.length) return text
  const parts = text.split(new RegExp(`(${words.join('|')})`, 'gi'))
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <mark key={i} className="rounded-xs bg-blush px-0.5 text-crimson-deep">
        {part}
      </mark>
    ) : (
      part
    ),
  )
}
