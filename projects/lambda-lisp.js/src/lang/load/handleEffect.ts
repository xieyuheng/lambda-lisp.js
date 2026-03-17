import * as L from "../index.ts"

export async function handleEffect(mod: L.Mod, stmt: L.Stmt): Promise<void> {
  if (stmt.kind === "AssertEqual") {
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
      `[assert-equal] fail:\n` +
        `  lhs: ${L.formatExp(stmt.lhs)}\n` +
        `  rhs: ${L.formatExp(stmt.rhs)}\n`,
    )
  }

  if (stmt.kind === "AssertNotEqual") {
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
      `[assert-not-equal] fail:\n` +
        `  lhs: ${L.formatExp(stmt.lhs)}\n` +
        `  rhs: ${L.formatExp(stmt.rhs)}\n`,
    )
  }

  if (stmt.kind === "AssertSame") {
    if (
      L.valueConvertible(
        L.evaluate(mod, L.emptyEnv(), stmt.lhs),
        L.evaluate(mod, L.emptyEnv(), stmt.rhs),
      )
    ) {
      return
    }

    throw new Error(
      `[assert-same] fail:\n` +
        `  lhs: ${L.formatExp(stmt.lhs)}\n` +
        `  rhs: ${L.formatExp(stmt.rhs)}\n`,
    )
  }

  if (stmt.kind === "AssertNotSame") {
    if (
      !L.valueConvertible(
        L.evaluate(mod, L.emptyEnv(), stmt.lhs),
        L.evaluate(mod, L.emptyEnv(), stmt.rhs),
      )
    ) {
      return
    }

    throw new Error(
      `[assert-not-same] fail:\n` +
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
