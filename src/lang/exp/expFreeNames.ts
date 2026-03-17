import { bindingsToArray } from "../exp/index.ts"
import { type Exp } from "./index.ts"

export function expFreeNames(boundNames: Set<string>, exp: Exp): Set<string> {
  switch (exp.kind) {
    case "Var": {
      return boundNames.has(exp.name) ? new Set() : new Set([exp.name])
    }

    case "Lambda": {
      return expFreeNames(new Set([...boundNames, exp.name]), exp.ret)
    }

    case "Apply": {
      return new Set([
        ...expFreeNames(boundNames, exp.target),
        ...expFreeNames(boundNames, exp.arg),
      ])
    }

    case "Let": {
      // NOTE All bindings in the bindings are independent.
      const bindings = bindingsToArray(exp.bindings)
      const bindingsFreeNames = bindings
        .map((bind) => Array.from(expFreeNames(boundNames, bind.exp)))
        .flatMap((names) => names)
      return new Set([
        ...bindingsFreeNames,
        ...expFreeNames(
          new Set([...boundNames, ...bindings.map((bind) => bind.name)]),
          exp.body,
        ),
      ])
    }
  }
}
