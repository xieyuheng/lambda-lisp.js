import { emptyEnv } from "../env/Env.ts"
import { evaluate } from "../evaluate/evaluate.ts"
import { type Exp } from "../exp/index.ts"
import { type Stmt } from "../stmt/index.ts"
import { type Value } from "../value/index.ts"

export type Definition = {
  mod: Mod
  name: string
  exp: Exp
  freeNames?: Set<string>
  value?: Value
  isRecursive?: boolean
}

export type Mod = {
  url: URL
  definitions: Map<string, Definition>
  stmts: Array<Stmt>
  isFinished?: boolean
}

export function createMod(url: URL): Mod {
  return {
    url,
    definitions: new Map(),
    stmts: [],
  }
}

export function modDefine(
  mod: Mod,
  name: string,
  definition: Definition,
): void {
  mod.definitions.set(name, definition)
}

export function modFind(mod: Mod, name: string): Definition | undefined {
  return mod.definitions.get(name)
}

export function modFindValue(mod: Mod, name: string): Value | undefined {
  const definition = modFind(mod, name)
  if (definition === undefined) return undefined

  if (definition.value) return definition.value

  const value = evaluate(definition.mod, emptyEnv(), definition.exp)

  // TODO Uncomment the following,
  // will only blaze recursive function,
  // but it will be to slow for `equalInCtx`.
  // I do not fully understand it yet.

  if (
    // def.isRecursive &&
    value.kind === "ClosureValue" &&
    value.definedName === undefined
  ) {
    value.definedName = definition.name
  }

  definition.value = value
  return value
}

export function modResolve(mod: Mod, href: string): URL {
  return new URL(href, mod.url)
}

export function modOwnDefinitions(mod: Mod): Map<string, Definition> {
  const ownDefs = new Map()
  for (const [name, def] of mod.definitions) {
    if (def.mod.url.href === mod.url.href) {
      ownDefs.set(name, def)
    }
  }

  return ownDefs
}
