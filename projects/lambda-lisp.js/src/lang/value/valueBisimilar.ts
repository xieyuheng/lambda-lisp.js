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

  trail = [...trail, [lhs, rhs]]
  trail = [...trail, [rhs, lhs]]

  if (lhs.kind === "ClosureValue" && rhs.kind === "ClosureValue") {
    const freshName = L.generateFreshName(lhs.name)
    const freshVar = L.NeutralValue(L.VarNeutral(freshName))
    return valueBisimilar(trail, L.apply(lhs, freshVar), L.apply(rhs, freshVar))
  }

  if (
    lhs.kind === "NeutralValue" &&
    isConstantApplication(lhs.neutral) &&
    rhs.kind === "NeutralValue" &&
    isConstantApplication(rhs.neutral)
  ) {
    return valueBisimilar(
      trail,
      reduceConstantApplication(lhs.neutral),
      reduceConstantApplication(rhs.neutral),
    )
  }

  if (lhs.kind === "NeutralValue" && isConstantApplication(lhs.neutral)) {
    return valueBisimilar(trail, reduceConstantApplication(lhs.neutral), rhs)
  }

  if (rhs.kind === "NeutralValue" && isConstantApplication(rhs.neutral)) {
    return valueBisimilar(trail, lhs, reduceConstantApplication(rhs.neutral))
  }

  if (lhs.kind === "NeutralValue" && rhs.kind === "NeutralValue") {
    return neutralBisimilar(trail, lhs.neutral, rhs.neutral)
  }

  return false
}

function neutralBisimilar(
  trail: Trail,
  lhs: L.Neutral,
  rhs: L.Neutral,
): boolean {
  if (lhs.kind === "VarNeutral" && rhs.kind === "VarNeutral") {
    return rhs.name === lhs.name
  }

  if (lhs.kind === "ConstantNeutral" && rhs.kind === "ConstantNeutral") {
    return rhs.definition === lhs.definition
  }

  if (lhs.kind === "ApplyNeutral" && rhs.kind === "ApplyNeutral") {
    return (
      neutralBisimilar(trail, lhs.target, rhs.target) &&
      valueBisimilar(trail, lhs.arg, rhs.arg)
    )
  }

  return false
}

function isConstantApplication(neutral: L.Neutral): boolean {
  if (neutral.kind === "ConstantNeutral") {
    return true
  }

  if (neutral.kind === "ApplyNeutral") {
    return isConstantApplication(neutral.target)
  }

  return false
}

function reduceConstantApplication(neutral: L.Neutral): L.Value {
  if (neutral.kind === "ConstantNeutral") {
    return L.definitionMeaning(neutral.definition)
  }

  if (neutral.kind === "ApplyNeutral") {
    return L.apply(reduceConstantApplication(neutral.target), neutral.arg)
  }

  throw new Error("[reduceConstantApplication] unhandled neutral")
}
