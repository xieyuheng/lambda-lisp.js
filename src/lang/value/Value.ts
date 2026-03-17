import { type Env } from "../env/index.ts"
import { type Exp } from "../exp/index.ts"
import { type Mod } from "../mod/index.ts"
import { type Neutral } from "../value/index.ts"

export type Value = NotYetValue | ClosureValue

export type NotYetValue = {
  kind: "NotYetValue"
  neutral: Neutral
}

export function NotYetValue(neutral: Neutral): NotYetValue {
  return {
    kind: "NotYetValue",
    neutral,
  }
}

export type ClosureValue = {
  kind: "ClosureValue"
  mod: Mod
  env: Env
  name: string
  ret: Exp
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
