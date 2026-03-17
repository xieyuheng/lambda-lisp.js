export function arrayPickLast<A>(array: Array<A>): [prefix: Array<A>, last: A] {
  if (array.length === 0) {
    throw new Error(`[arrayPickLast] can not pick the last from empty array`)
  }

  const prefix = array.slice(0, array.length - 1)
  const last = array[array.length - 1]
  return [prefix, last]
}
