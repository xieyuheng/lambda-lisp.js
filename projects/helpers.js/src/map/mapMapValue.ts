export function mapMapValue<K, A, B>(
  map: Map<K, A>,
  f: (x: A) => B,
): Map<K, B> {
  return new Map(map.entries().map(([key, value]) => [key, f(value)]))
}
