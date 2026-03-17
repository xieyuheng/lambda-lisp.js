export function arrayUnzip<A, B>(zipped: Array<[A, B]>): [Array<A>, Array<B>] {
  return [zipped.map((pair) => pair[0]), zipped.map((pair) => pair[1])]
}
