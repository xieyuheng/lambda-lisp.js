import { envFindValue, envUpdate, type Env } from "../env/index.ts"
import { bindingsToArray, type Exp } from "../exp/index.ts"
import { modFindValue, type Mod } from "../mod/index.ts"
import * as Neutrals from "../value/index.ts"
import * as Values from "../value/index.ts"
import { type Value } from "../value/index.ts"

export function evaluateWithDelay(mod: Mod, env: Env, exp: Exp): Value {
  switch (exp.kind) {
    case "Var": {
      let value = undefined

      value = envFindValue(env, exp.name)
      if (value !== undefined) return value

      value = modFindValue(mod, exp.name)
      if (value !== undefined) return value

      throw new Error(
        `[evaluateWithDelay] I meet undefined name: ${exp.name}, in mod: ${mod.url}`,
      )
    }

    case "Lambda": {
      return Values.ClosureValue(mod, env, exp.name, exp.ret)
    }

    case "Apply": {
      const target = evaluateWithDelay(mod, env, exp.target)
      const arg = evaluateWithDelay(mod, env, exp.arg)
      // const arg = Values.Lazy(mod, env, exp.arg)
      return Values.DelayedApplyValue(target, arg)
    }

    case "Let": {
      const oldEnv = env
      for (const bind of bindingsToArray(exp.bindings)) {
        env = envUpdate(
          env,
          bind.name,
          evaluateWithDelay(mod, oldEnv, bind.exp),
        )
      }

      return evaluateWithDelay(mod, env, exp.body)
    }
  }
}

export function applyWithDelay(target: Value, arg: Value): Value {
  switch (target.kind) {
    case "NotYetValue": {
      return Values.NotYetValue(Neutrals.ApplyNeutral(target.neutral, arg))
    }

    case "ClosureValue": {
      return evaluateWithDelay(
        target.mod,
        envUpdate(target.env, target.name, arg),
        target.ret,
      )
    }

    case "DelayedApplyValue": {
      const nextTarget = applyWithDelay(target.target, target.arg)
      return applyWithDelay(nextTarget, arg)
    }
  }
}
