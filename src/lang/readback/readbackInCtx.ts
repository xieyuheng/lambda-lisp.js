import { freshen } from "../../utils/name/freshen.ts"
import { apply } from "../evaluate/index.ts"
import * as Exps from "../exp/index.ts"
import { type Exp } from "../exp/index.ts"
import * as Neutrals from "../value/index.ts"
import * as Values from "../value/index.ts"
import { lambdaIsDefined, type Neutral, type Value } from "../value/index.ts"
import {
  ctxBindName,
  ctxBlazeOccurred,
  ctxBlazeTrail,
  type Ctx,
} from "./Ctx.ts"

export function readbackInCtx(ctx: Ctx, value: Value): Exp {
  switch (value.kind) {
    case "NotYetValue": {
      return readbackNeutralInCtx(ctx, value.neutral)
    }

    case "ClosureValue": {
      if (lambdaIsDefined(value)) {
        if (ctxBlazeOccurred(ctx, value)) {
          return Exps.Var(value.definedName)
        } else {
          ctx = ctxBlazeTrail(ctx, value)
        }
      }

      const freshName = freshen(ctx.boundNames, value.name)
      ctx = ctxBindName(ctx, freshName)
      const arg = Values.NotYetValue(Neutrals.VarNeutral(freshName))
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
