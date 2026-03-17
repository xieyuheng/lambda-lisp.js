export function arrayDedup<A>(
  array: Array<A>,
  eq: (x: A, y: A) => boolean,
): Array<A> {
  const results: Array<A> = []
  for (const x of array) {
    if (results.every((y) => !eq(x, y))) {
      results.push(x)
    }
  }

  return results
}
