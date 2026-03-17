import { type Env } from "../env/index.ts"
import { type Exp } from "../exp/index.ts"
import { type Mod } from "../mod/index.ts"
import { type Neutral } from "../value/index.ts"

export type Value = NotYetValue | ClosureValue | LazyValue | DelayedApplyValue

export type NotYetValue = {
  kind: "NotYet"
  neutral: Neutral
}

export type ClosureValue = {
  kind: "Lambda"
  mod: Mod
  env: Env
  name: string
  ret: Exp
  definedName?: string
}

export type LazyValue = {
  kind: "Lazy"
  mod: Mod
  env: Env
  exp: Exp
  value?: Value
}

export type DelayedApplyValue = {
  kind: "DelayedApply"
  target: Value
  arg: Value
}

export function NotYetValue(neutral: Neutral): NotYetValue {
  return {
    kind: "NotYet",
    neutral,
  }
}

export function LambdaValue(
  mod: Mod,
  env: Env,
  name: string,
  ret: Exp,
): ClosureValue {
  return {
    kind: "Lambda",
    mod,
    env,
    name,
    ret,
  }
}

export function LazyValue(mod: Mod, env: Env, exp: Exp): LazyValue {
  return {
    kind: "Lazy",
    mod,
    env,
    exp,
  }
}

export function DelayedApplyValue(
  target: Value,
  arg: Value,
): DelayedApplyValue {
  return {
    kind: "DelayedApply",
    target,
    arg,
  }
}
