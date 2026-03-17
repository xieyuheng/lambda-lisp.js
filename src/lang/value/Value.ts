import { type Env } from "../env/index.ts"
import { type Exp } from "../exp/index.ts"
import { type Mod } from "../mod/index.ts"
import { type Neutral } from "../value/index.ts"

export type Value = NeutralValue | ClosureValue

export type NeutralValue = {
  kind: "NeutralValue"
  neutral: Neutral
}

export function NeutralValue(neutral: Neutral): NeutralValue {
  return {
    kind: "NeutralValue",
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
