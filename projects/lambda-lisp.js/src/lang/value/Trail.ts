import * as L from "../index.ts"

export type Trail = Array<[L.Value, L.Value]>

export function trailLoopOccurred(
  trail: Trail,
  lhs: L.Value,
  rhs: L.Value,
): boolean {
  for (const entry of trail) {
    if (
      (L.valueConvertible(entry[0], lhs) &&
        L.valueConvertible(entry[1], rhs)) ||
      (L.valueConvertible(entry[0], rhs) && L.valueConvertible(entry[1], lhs))
    ) {
      return true
    }
  }

  return false
}

export function formatTrail(trail: Trail): string {
  let s = ``
  for (const entry of trail) {
    s += `${L.formatValue(entry[0])} = ${L.formatValue(entry[1])}\n`
  }

  return s
}
