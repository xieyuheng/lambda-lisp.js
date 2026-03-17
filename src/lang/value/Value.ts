import { type Env } from "../env/index.ts"
import { type Exp } from "../exp/index.ts"
import { type Mod } from "../mod/index.ts"
import { type Neutral } from "../value/index.ts"

export type Value = NotYetValue | ClosureValue | DelayedApplyValue

export type NotYetValue = {
  kind: "NotYetValue"
  neutral: Neutral
}

export type ClosureValue = {
  kind: "ClosureValue"
  mod: Mod
  env: Env
  name: string
  ret: Exp
  definedName?: string
}

export type DelayedApplyValue = {
  kind: "DelayedApplyValue"
  target: Value
  arg: Value
}

export function NotYetValue(neutral: Neutral): NotYetValue {
  return {
    kind: "NotYetValue",
    neutral,
  }
}

export function ClosureValue(
  mod: Mod,
  env: Env,
  name: string,
  ret: Exp,
): ClosureValue {
  return {
    kind: "ClosureValue",
    mod,
    env,
    name,
    ret,
  }
}

export function DelayedApplyValue(
  target: Value,
  arg: Value,
): DelayedApplyValue {
  return {
    kind: "DelayedApplyValue",
    target,
    arg,
  }
}
