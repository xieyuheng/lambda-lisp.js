import type { Definition } from "../definition/index.ts"
import { type Stmt } from "../stmt/index.ts"

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
