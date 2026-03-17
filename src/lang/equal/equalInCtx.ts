import { freshen } from "../../utils/name/freshen.ts"
import { applyWithDelay } from "../evaluate/index.ts"
import { formatValue } from "../format/index.ts"
import { same } from "../same/index.ts"
import * as Neutrals from "../value/index.ts"
import * as Values from "../value/index.ts"
import { lambdaIsDefined, type Neutral, type Value } from "../value/index.ts"
import {
  ctxBindName,
  ctxBlazeOccurred,
  ctxBlazeTrail,
  ctxDepthAdd1,
  type Ctx,
} from "./Ctx.ts"

const debug = false

export function equalInCtx(ctx: Ctx, lhs: Value, rhs: Value): boolean {
  ctx = ctxDepthAdd1(ctx)

  lhs = Values.lazyActiveDeep(lhs)
  rhs = Values.lazyActiveDeep(rhs)

  if (debug) {
    console.log("[equalInCtx]", ctx.depth, " ", formatValue(lhs))
    console.log("[equalInCtx]", ctx.depth, "=", formatValue(rhs))
    console.log("[equalInCtx]", "same:", same(lhs, rhs))
  }

  if (same(lhs, rhs)) return true

  if (lhs.kind === "NotYetValue" && rhs.kind === "NotYetValue") {
    return equalNeutralInCtx(ctx, lhs.neutral, rhs.neutral)
  }

  if (lhs.kind === "ClosureValue") {
    if (lambdaIsDefined(lhs)) {
      if (ctxBlazeOccurred(ctx, lhs, rhs)) {
        return true
      } else {
        ctx = ctxBlazeTrail(ctx, lhs, rhs)
      }
    }

    const freshName = freshen(ctx.boundNames, lhs.name)
    ctx = ctxBindName(ctx, freshName)
    const v = Neutrals.VarNeutral(freshName)
    const arg = Values.NotYetValue(v)
    return equalInCtx(ctx, applyWithDelay(lhs, arg), applyWithDelay(rhs, arg))
  }

  if (rhs.kind === "ClosureValue") {
    if (lambdaIsDefined(rhs)) {
      if (ctxBlazeOccurred(ctx, rhs, lhs)) {
        return true
      } else {
        ctx = ctxBlazeTrail(ctx, rhs, lhs)
      }
    }

    const freshName = freshen(ctx.boundNames, rhs.name)
    ctx = ctxBindName(ctx, freshName)
    const v = Neutrals.VarNeutral(freshName)
    const arg = Values.NotYetValue(v)
    return equalInCtx(ctx, applyWithDelay(lhs, arg), applyWithDelay(rhs, arg))
  }

  if (lhs.kind === "DelayedApplyValue" && rhs.kind === "DelayedApplyValue") {
    if (
      equalInCtx(ctx, lhs.target, rhs.target) &&
      equalInCtx(ctx, lhs.arg, rhs.arg)
    ) {
      return true
    }

    // if (
    //   equalInCtx(ctx, applyWithDelay(lhs.target, lhs.arg), rhs) ||
    //   equalInCtx(ctx, lhs, applyWithDelay(rhs.target, rhs.arg)) ||
    //   equalInCtx(
    //     ctx,
    //     applyWithDelay(lhs.target, lhs.arg),
    //     applyWithDelay(rhs.target, rhs.arg),
    //   )
    // ) {
    //   return true
    // }
  }

  if (lhs.kind === "DelayedApplyValue") {
    return equalInCtx(ctx, applyWithDelay(lhs.target, lhs.arg), rhs)
  }

  if (rhs.kind === "DelayedApplyValue") {
    return equalInCtx(ctx, lhs, applyWithDelay(rhs.target, rhs.arg))
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
