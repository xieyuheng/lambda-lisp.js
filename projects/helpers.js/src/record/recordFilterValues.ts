export function recordFilterValues<A>(
  record: Record<string, A>,
  p: (x: A) => boolean,
): Record<string, A> {
  return Object.fromEntries(
    Object.entries(record).filter(([_, value]) => p(value)),
  )
}
