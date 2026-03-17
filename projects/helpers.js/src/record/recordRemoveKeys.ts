export function recordRemoveKeys<A>(
  record: Record<string, A>,
  keys: Array<string>,
): Record<string, A> {
  return Object.fromEntries(
    Object.entries(record).filter(([key, _]) => !keys.includes(key)),
  )
}
