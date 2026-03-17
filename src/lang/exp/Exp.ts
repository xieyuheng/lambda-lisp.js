import { type Bindings } from "../exp/index.ts"

export type Exp = Var | Lambda | Apply | Let
export type Var = { kind: "Var"; name: string }
export type Lambda = { kind: "Lambda"; name: string; ret: Exp }
export type Apply = { kind: "Apply"; target: Exp; arg: Exp }
export type Let = { kind: "Let"; bindings: Bindings; body: Exp }

export function Var(name: string): Var {
  return { kind: "Var", name }
}

export function Lambda(name: string, ret: Exp): Lambda {
  return { kind: "Lambda", name, ret }
}

export function Apply(target: Exp, arg: Exp): Apply {
  return { kind: "Apply", target, arg }
}

export function Let(bindings: Bindings, body: Exp): Let {
  return { kind: "Let", bindings, body }
}
