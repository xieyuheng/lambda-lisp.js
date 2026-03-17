import { apply } from "../evaluate/index.ts"
import { formatValue } from "../format/index.ts"
import * as L from "../index.ts"
import * as Neutrals from "../value/index.ts"
import * as Values from "../value/index.ts"
import { type Neutral, type Value } from "../value/index.ts"
import { ctxBindName, ctxDepthAdd1, type Ctx } from "./Ctx.ts"

const debug = false

export function sameInCtx(ctx: Ctx, lhs: Value, rhs: Value): boolean {
  ctx = ctxDepthAdd1(ctx)

  if (debug) {
    console.log("[sameInCtx]", ctx.depth, " ", formatValue(lhs))
    console.log("[sameInCtx]", ctx.depth, "=", formatValue(rhs))
  }

  if (lhs.kind === "NeutralValue" && rhs.kind === "NeutralValue") {
    return sameNeutralInCtx(ctx, lhs.neutral, rhs.neutral)
  }

  if (lhs.kind === "ClosureValue" && rhs.kind === "ClosureValue") {
    // if (lambdaSameDefined(lhs, rhs)) {
    //   return true
    // }
    // if (lambdaIsDefined(lhs) || lambdaIsDefined(rhs)) {
    //   return false
    // }
  }

  if (lhs.kind === "ClosureValue") {
    const freshName = L.generateFreshName(lhs.name)
    ctx = ctxBindName(ctx, freshName)
    const arg = Values.NeutralValue(Neutrals.VarNeutral(freshName))
    return sameInCtx(ctx, apply(lhs, arg), apply(rhs, arg))
  }

  if (rhs.kind === "ClosureValue") {
    const freshName = L.generateFreshName(rhs.name)
    ctx = ctxBindName(ctx, freshName)
    const arg = Values.NeutralValue(Neutrals.VarNeutral(freshName))
    return sameInCtx(ctx, apply(lhs, arg), apply(rhs, arg))
  }

  return false
}

function sameNeutralInCtx(ctx: Ctx, lhs: Neutral, rhs: Neutral): boolean {
  if (lhs.kind === "VarNeutral" && rhs.kind === "VarNeutral") {
    return rhs.name === lhs.name
  }

  if (lhs.kind === "ApplyNeutral" && rhs.kind === "ApplyNeutral") {
    return (
      sameNeutralInCtx(ctx, lhs.target, rhs.target) &&
      sameInCtx(ctx, lhs.arg, rhs.arg)
    )
  }

  return false
}
