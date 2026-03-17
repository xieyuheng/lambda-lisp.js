export function mapMap<K, A, B>(
  map: Map<K, A>,
  f: (entry: [K, A]) => [K, B],
): Map<K, B> {
  return new Map(map.entries().map(f))
}
