/** Opens `id` if it is closed and closes it if it is open, returning a new set. */
export function toggleOpen(open: ReadonlySet<string>, id: string): Set<string> {
  const next = new Set(open)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  return next
}
