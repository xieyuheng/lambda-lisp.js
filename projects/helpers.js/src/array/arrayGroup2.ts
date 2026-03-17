export function arrayGroup2<A>(array: Array<A>): Array<[A, A]> {
  const results: Array<[A, A]> = []
  let lastKey: A | undefined = undefined
  for (const [index, value] of array.entries()) {
    if (index % 2 === 0) {
      lastKey = value
    } else {
      results.push([lastKey as A, value])
    }
  }

  return results
}
