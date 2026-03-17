import { envLookup, envUpdate, type Env } from "../env/index.ts"
import { bindingsToArray, type Exp } from "../exp/index.ts"
import * as L from "../index.ts"
import { modFind as modLookup, type Mod } from "../mod/index.ts"
import * as Neutrals from "../value/index.ts"
import * as Values from "../value/index.ts"
import { type Value } from "../value/index.ts"

export function evaluate(mod: Mod, env: Env, exp: Exp): Value {
  switch (exp.kind) {
    case "Var": {
      const value = envLookup(env, exp.name)
      if (value !== undefined) {
        return value
      }

      const definition = modLookup(mod, exp.name)
      if (definition !== undefined) {
        return L.NeutralValue(L.ConstantNeutral(definition))
      }

      let message = `[evaluate] undefined name`
      message += `\n  name: ${exp.name}`
      message += `\n  mod: ${mod.url}`
      throw new Error(message)
    }

    case "Lambda": {
      return Values.ClosureValue(mod, env, exp.name, exp.ret)
    }

    case "Apply": {
      const target = evaluate(mod, env, exp.target)
      const arg = evaluate(mod, env, exp.arg)
      return apply(target, arg)
    }

    case "Let": {
      const oldEnv = env
      for (const bind of bindingsToArray(exp.bindings)) {
        env = envUpdate(env, bind.name, evaluate(mod, oldEnv, bind.exp))
      }

      return evaluate(mod, env, exp.body)
    }
  }
}

export function apply(target: Value, arg: Value): Value {
  switch (target.kind) {
    case "NeutralValue": {
      return Values.NeutralValue(Neutrals.ApplyNeutral(target.neutral, arg))
    }

    case "ClosureValue": {
      return evaluate(
        target.mod,
        envUpdate(target.env, target.name, arg),
        target.ret,
      )
    }
  }
}
