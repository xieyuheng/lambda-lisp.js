export function mapFlatMap<K, A, B>(
  map: Map<K, A>,
  f: (entry: [K, A]) => Array<[K, B]>,
): Map<K, B> {
  const newMap = new Map()
  for (const entry of map.entries()) {
    for (const [k, v] of f(entry)) {
      newMap.set(k, v)
    }
  }

  return newMap
}
