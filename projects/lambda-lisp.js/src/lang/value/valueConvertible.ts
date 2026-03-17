import * as L from "../index.ts"

export function valueConvertible(lhs: L.Value, rhs: L.Value): boolean {
  if (lhs.kind === "NeutralValue" && rhs.kind === "NeutralValue") {
    return neutralConvertible(lhs.neutral, rhs.neutral)
  }

  if (lhs.kind === "ClosureValue" && rhs.kind === "ClosureValue") {
    const freshName = L.generateFreshName(lhs.name)
    const freshVar = L.NeutralValue(L.VarNeutral(freshName))
    return valueConvertible(L.apply(lhs, freshVar), L.apply(rhs, freshVar))
  }

  return false
}

function neutralConvertible(lhs: L.Neutral, rhs: L.Neutral): boolean {
  if (lhs.kind === "VarNeutral" && rhs.kind === "VarNeutral") {
    return rhs.name === lhs.name
  }

  if (lhs.kind === "ConstantNeutral" && rhs.kind === "ConstantNeutral") {
    return rhs.definition === lhs.definition
  }

  if (lhs.kind === "ApplyNeutral" && rhs.kind === "ApplyNeutral") {
    return (
      neutralConvertible(lhs.target, rhs.target) &&
      valueConvertible(lhs.arg, rhs.arg)
    )
  }

  return false
}
