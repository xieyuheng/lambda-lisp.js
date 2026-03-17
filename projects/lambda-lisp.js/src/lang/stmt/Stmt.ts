import { type Exp } from "../exp/index.ts"

export type Stmt =
  | AssertBisimilar
  | AssertNotBisimilar
  | AssertConvertible
  | AssertNotConvertible
  | Compute
  | Define
  | Import

export type AssertBisimilar = { kind: "AssertBisimilar"; lhs: Exp; rhs: Exp }
export type AssertNotBisimilar = {
  kind: "AssertNotBisimilar"
  lhs: Exp
  rhs: Exp
}
export type AssertConvertible = {
  kind: "AssertConvertible"
  lhs: Exp
  rhs: Exp
}
export type AssertNotConvertible = {
  kind: "AssertNotConvertible"
  lhs: Exp
  rhs: Exp
}
export type Compute = { kind: "Compute"; exp: Exp }
export type Define = { kind: "Define"; name: string; exp: Exp }
export type Import = {
  kind: "Import"
  path: string
  entries: Array<ImportEntry>
}

export type ImportEntry = {
  name: string
  rename?: string
}

export function AssertBisimilar(lhs: Exp, rhs: Exp): AssertBisimilar {
  return {
    kind: "AssertBisimilar",
    lhs,
    rhs,
  }
}

export function AssertNotBisimilar(lhs: Exp, rhs: Exp): AssertNotBisimilar {
  return {
    kind: "AssertNotBisimilar",
    lhs,
    rhs,
  }
}

export function AssertConvertible(lhs: Exp, rhs: Exp): AssertConvertible {
  return {
    kind: "AssertConvertible",
    lhs,
    rhs,
  }
}

export function AssertNotConvertible(lhs: Exp, rhs: Exp): AssertNotConvertible {
  return {
    kind: "AssertNotConvertible",
    lhs,
    rhs,
  }
}

export function Compute(exp: Exp): Compute {
  return {
    kind: "Compute",
    exp,
  }
}

export function Define(name: string, exp: Exp): Define {
  return {
    kind: "Define",
    name,
    exp,
  }
}

export function Import(path: string, entries: Array<ImportEntry>): Import {
  return {
    kind: "Import",
    path,
    entries,
  }
}
