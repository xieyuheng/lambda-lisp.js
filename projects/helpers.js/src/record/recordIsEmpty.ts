export function recordIsEmpty<V>(record: Record<string, V>): boolean {
  return Object.keys(record).length === 0
}
