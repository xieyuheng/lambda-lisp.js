import { type Value } from "../value/index.ts"

export type Neutral = VarNeutral | ApplyNeutral
export type VarNeutral = { kind: "Var"; name: string }
export type ApplyNeutral = { kind: "Apply"; target: Neutral; arg: Value }

export function VarNeutral(name: string): VarNeutral {
  return {
    kind: "Var",
    name,
  }
}

export function ApplyNeutral(target: Neutral, arg: Value): ApplyNeutral {
  return {
    kind: "Apply",
    target,
    arg,
  }
}
