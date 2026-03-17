import { apply } from "../evaluate/index.ts"
import { formatValue } from "../format/index.ts"
import * as L from "../index.ts"
import { same } from "../same/index.ts"
import * as Neutrals from "../value/index.ts"
import * as Values from "../value/index.ts"
import { type Neutral, type Value } from "../value/index.ts"
import { ctxBindName, ctxDepthAdd1, type Ctx } from "./Ctx.ts"

const debug = false

export function equalInCtx(ctx: Ctx, lhs: Value, rhs: Value): boolean {
  ctx = ctxDepthAdd1(ctx)

  if (debug) {
    console.log("[equalInCtx]", ctx.depth, " ", formatValue(lhs))
    console.log("[equalInCtx]", ctx.depth, "=", formatValue(rhs))
    console.log("[equalInCtx]", "same:", same(lhs, rhs))
  }

  if (same(lhs, rhs)) return true

  if (lhs.kind === "NeutralValue" && rhs.kind === "NeutralValue") {
    return equalNeutralInCtx(ctx, lhs.neutral, rhs.neutral)
  }

  if (lhs.kind === "ClosureValue") {
    // if (lambdaIsDefined(lhs)) {
    //   if (ctxBlazeOccurred(ctx, lhs, rhs)) {
    //     return true
    //   } else {
    //     ctx = ctxBlazeTrail(ctx, lhs, rhs)
    //   }
    // }

    const freshName = L.generateFreshName(lhs.name)
    ctx = ctxBindName(ctx, freshName)
    const v = Neutrals.VarNeutral(freshName)
    const arg = Values.NeutralValue(v)
    return equalInCtx(ctx, apply(lhs, arg), apply(rhs, arg))
  }

  if (rhs.kind === "ClosureValue") {
    // if (lambdaIsDefined(rhs)) {
    //   if (ctxBlazeOccurred(ctx, rhs, lhs)) {
    //     return true
    //   } else {
    //     ctx = ctxBlazeTrail(ctx, rhs, lhs)
    //   }
    // }

    const freshName = L.generateFreshName(rhs.name)
    ctx = ctxBindName(ctx, freshName)
    const v = Neutrals.VarNeutral(freshName)
    const arg = Values.NeutralValue(v)
    return equalInCtx(ctx, apply(lhs, arg), apply(rhs, arg))
  }

  return false
}

function equalNeutralInCtx(ctx: Ctx, lhs: Neutral, rhs: Neutral): boolean {
  if (lhs.kind === "VarNeutral" && rhs.kind === "VarNeutral") {
    return rhs.name === lhs.name
  }

  if (lhs.kind === "ApplyNeutral" && rhs.kind === "ApplyNeutral") {
    return (
      equalNeutralInCtx(ctx, lhs.target, rhs.target) &&
      equalInCtx(ctx, lhs.arg, rhs.arg)
    )
  }

  return false
}
