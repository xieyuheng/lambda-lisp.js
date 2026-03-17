import { apply } from "../evaluate/index.ts"
import * as Exps from "../exp/index.ts"
import { type Exp } from "../exp/index.ts"
import * as L from "../index.ts"
import * as Neutrals from "../value/index.ts"
import * as Values from "../value/index.ts"
import { type Neutral, type Value } from "../value/index.ts"
import { ctxBindName, type Ctx } from "./Ctx.ts"

export function readbackInCtx(ctx: Ctx, value: Value): Exp {
  switch (value.kind) {
    case "NeutralValue": {
      return readbackNeutralInCtx(ctx, value.neutral)
    }

    case "ClosureValue": {
      // if (
      //   lambdaIsDefined(value)) {
      //   if (ctxBlazeOccurred(ctx, value)) {
      //     return Exps.Var(value.definedName)
      //   } else {
      //     ctx = ctxBlazeTrail(ctx, value)
      //   }
      // }

      const freshName = L.generateFreshName(value.name)
      ctx = ctxBindName(ctx, freshName)
      const arg = Values.NeutralValue(Neutrals.VarNeutral(freshName))
      const ret = apply(value, arg)
      return Exps.Lambda(freshName, readbackInCtx(ctx, ret))
    }
  }
}

function readbackNeutralInCtx(ctx: Ctx, neutral: Neutral): Exp {
  switch (neutral.kind) {
    case "VarNeutral": {
      return Exps.Var(neutral.name)
    }

    case "ConstantNeutral": {
      return Exps.Var(neutral.definition.name)
    }

    case "ApplyNeutral": {
      return Exps.Apply(
        readbackNeutralInCtx(ctx, neutral.target),
        readbackInCtx(ctx, neutral.arg),
      )
    }
  }
}
