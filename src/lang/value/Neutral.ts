import type { Definition } from "../definition/index.ts"
import { type Value } from "../value/index.ts"

export type Neutral = VarNeutral | ConstantNeutral | ApplyNeutral

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

export type ConstantNeutral = {
  kind: "ConstantNeutral"
  definition: Definition
}

export function ConstantNeutral(definition: Definition): ConstantNeutral {
  return {
    kind: "ConstantNeutral",
    definition,
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
