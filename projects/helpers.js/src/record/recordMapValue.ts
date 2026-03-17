export function recordMapValue<A, B>(
  record: Record<string, A>,
  f: (x: A) => B,
): Record<string, B> {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [key, f(value)]),
  )
}
