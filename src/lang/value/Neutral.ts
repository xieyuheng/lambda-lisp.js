import { type Value } from "../value/index.ts"

export type Neutral = VarNeutral | ApplyNeutral

export type VarNeutral = {
  kind: "VarNeutral"
  name: string
}

export function VarNeutral(name: string): VarNeutral {
  return {
    kind: "VarNeutral",
    name,
  }
}

export type ApplyNeutral = {
  kind: "ApplyNeutral"
  target: Neutral
  arg: Value
}

export function ApplyNeutral(target: Neutral, arg: Value): ApplyNeutral {
  return {
    kind: "ApplyNeutral",
    target,
    arg,
  }
}
