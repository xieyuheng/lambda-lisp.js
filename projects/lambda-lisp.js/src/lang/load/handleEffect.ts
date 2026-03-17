import * as L from "../index.ts"

export async function handleEffect(mod: L.Mod, stmt: L.Stmt): Promise<void> {
  if (stmt.kind === "AssertBisimilar") {
    if (
      L.valueBisimilar(
        [],
        L.evaluate(mod, L.emptyEnv(), stmt.lhs),
        L.evaluate(mod, L.emptyEnv(), stmt.rhs),
      )
    ) {
      return
    }

    throw new Error(
      `[assert-bisimilar] fail:\n` +
        `  lhs: ${L.formatExp(stmt.lhs)}\n` +
        `  rhs: ${L.formatExp(stmt.rhs)}\n`,
    )
  }

  if (stmt.kind === "AssertNotBisimilar") {
    if (
      !L.valueBisimilar(
        [],
        L.evaluate(mod, L.emptyEnv(), stmt.lhs),
        L.evaluate(mod, L.emptyEnv(), stmt.rhs),
      )
    ) {
      return
    }

    throw new Error(
      `[assert-not-bisimilar] fail:\n` +
        `  lhs: ${L.formatExp(stmt.lhs)}\n` +
        `  rhs: ${L.formatExp(stmt.rhs)}\n`,
    )
  }

  if (stmt.kind === "AssertConvertible") {
    if (
      L.valueConvertible(
        L.evaluate(mod, L.emptyEnv(), stmt.lhs),
        L.evaluate(mod, L.emptyEnv(), stmt.rhs),
      )
    ) {
      return
    }

    throw new Error(
      `[assert-convertible] fail:\n` +
        `  lhs: ${L.formatExp(stmt.lhs)}\n` +
        `  rhs: ${L.formatExp(stmt.rhs)}\n`,
    )
  }

  if (stmt.kind === "AssertNotConvertible") {
    if (
      !L.valueConvertible(
        L.evaluate(mod, L.emptyEnv(), stmt.lhs),
        L.evaluate(mod, L.emptyEnv(), stmt.rhs),
      )
    ) {
      return
    }

    throw new Error(
      `[assert-not-convertible] fail:\n` +
        `  lhs: ${L.formatExp(stmt.lhs)}\n` +
        `  rhs: ${L.formatExp(stmt.rhs)}\n`,
    )
  }

  if (stmt.kind === "Compute") {
    const value = L.evaluate(mod, L.emptyEnv(), stmt.exp)
    const exp = L.readback(value)
    console.log(L.formatExp(exp))
    return
  }
}
