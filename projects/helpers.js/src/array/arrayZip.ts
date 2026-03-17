export function arrayZip<A, B>(left: Array<A>, right: Array<B>): Array<[A, B]> {
  const array: Array<[A, B]> = []
  for (const i of left.keys()) {
    const x = left[i]
    const y = right[i]
    array.push([x, y])
  }

  return array
}
