import * as L from "../index.ts"
import { trailLoopOccurred, type Trail } from "./Trail.ts"

export function valueBisimilar(
  trail: Trail,
  lhs: L.Value,
  rhs: L.Value,
): boolean {
  if (trailLoopOccurred(trail, lhs, rhs)) {
    return true
  }

  if (L.valueConvertible(lhs, rhs)) {
    return true
  }

  if (lhs.kind === "NeutralValue" && rhs.kind === "NeutralValue") {
    if (neutralBisimilar(trail, lhs.neutral, rhs.neutral)) {
      return true
    } else {
      // console.log("[neutralBisimilar/fail]", L.formatValue(lhs), L.formatValue(rhs))
      // console.log(L.formatTrail(trail))
    }
  }

  if (lhs.kind === "ClosureValue" && rhs.kind === "ClosureValue") {
    const freshName = L.generateFreshName(lhs.name)
    const freshVar = L.NeutralValue(L.VarNeutral(freshName))
    return valueBisimilar(trail, L.apply(lhs, freshVar), L.apply(rhs, freshVar))
  }

  if (
    lhs.kind === "NeutralValue" &&
    isConstantApply(lhs.neutral) &&
    rhs.kind === "NeutralValue" &&
    isConstantApply(rhs.neutral)
  ) {
    // console.log("[valueBisimilar/1]", L.formatValue(lhs), L.formatValue(rhs))
    // console.log(L.formatTrail(trail))

    trail = [...trail, [lhs, rhs]]

    return valueBisimilar(
      trail,
      reduceConstantApply(lhs.neutral),
      reduceConstantApply(rhs.neutral),
    )
  }

  if (lhs.kind === "NeutralValue" && isConstantApply(lhs.neutral)) {
    trail = [...trail, [lhs, rhs]]

    return valueBisimilar(trail, reduceConstantApply(lhs.neutral), rhs)
  }

  if (rhs.kind === "NeutralValue" && isConstantApply(rhs.neutral)) {
    trail = [...trail, [lhs, rhs]]

    return valueBisimilar(trail, lhs, reduceConstantApply(rhs.neutral))
  }

  return false
}

function neutralBisimilar(
  trail: Trail,
  lhs: L.Neutral,
  rhs: L.Neutral,
): boolean {
  if (trailLoopOccurred(trail, L.NeutralValue(lhs), L.NeutralValue(rhs))) {
    return true
  }

  if (lhs.kind === "VarNeutral" && rhs.kind === "VarNeutral") {
    return rhs.name === lhs.name
  }

  if (lhs.kind === "ConstantNeutral" && rhs.kind === "ConstantNeutral") {
    return rhs.definition === lhs.definition
  }

  if (lhs.kind === "ApplyNeutral" && rhs.kind === "ApplyNeutral") {
    trail = [...trail, [L.NeutralValue(lhs), L.NeutralValue(rhs)]]

    return (
      neutralBisimilar(trail, lhs.target, rhs.target) &&
      valueBisimilar(trail, lhs.arg, rhs.arg)
    )
  }

  return false
}

function isConstantApply(neutral: L.Neutral): boolean {
  if (neutral.kind === "ConstantNeutral") {
    return true
  }

  if (neutral.kind === "ApplyNeutral") {
    return isConstantApply(neutral.target)
  }

  return false
}

function reduceConstantApply(neutral: L.Neutral): L.Value {
  if (neutral.kind === "ConstantNeutral") {
    return L.definitionMeaning(neutral.definition)
  }

  if (neutral.kind === "ApplyNeutral") {
    return L.apply(reduceConstantApply(neutral.target), neutral.arg)
  }

  throw new Error("[reduceConstantApply] unhandled neutral")
}
