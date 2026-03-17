import { type Exp } from "./Exp.ts"

export type Binding = {
  name: string
  exp: Exp
}

export type Bindings = Map<string, Binding>

export function bindingsIsEmpty(bindings: Bindings): boolean {
  return bindings.size === 0
}

export function bindingsFromArray(bindings: Array<Binding>): Bindings {
  return new Map([
    ...bindings.map<[string, Binding]>((bind) => [bind.name, bind]),
  ])
}

export function bindingsToArray(bindings: Bindings): Array<Binding> {
  return Array.from(bindings.values())
}

export function bindingsInitial(name: string, exp: Exp): Bindings {
  return new Map([[name, { name, exp }]])
}

export function bindingsUpdate(
  bindings: Bindings,
  name: string,
  exp: Exp,
): Bindings {
  return new Map([...bindings, [name, { name, exp }]])
}

export function bindingsMerge(left: Bindings, right: Bindings): Bindings {
  return new Map([...left, ...right])
}

export function bindingsMapExp(
  bindings: Bindings,
  f: (exp: Exp) => Exp,
): Bindings {
  return new Map([
    ...Array.from(bindings.values()).map<[string, Binding]>(({ name, exp }) => [
      name,
      { name, exp: f(exp) },
    ]),
  ])
}

export function bindingsTakeNames(
  bindings: Bindings,
  names: Set<string>,
): Bindings {
  const newBindings = new Map()
  for (const [name, exp] of bindings) {
    if (names.has(name)) {
      newBindings.set(name, exp)
    }
  }

  return newBindings
}
