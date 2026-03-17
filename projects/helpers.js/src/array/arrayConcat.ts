export function arrayConcat<A>(arrays: Array<Array<A>>): Array<A> {
  return arrays.flatMap((x) => x)
}
