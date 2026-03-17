import assert from "node:assert"
import fs from "node:fs"
import { expFreeNames } from "../exp/expFreeNames.ts"
import { expIndirectFreeNames } from "../exp/index.ts"
import { formatExp } from "../format/formatExp.ts"
import {
  createMod,
  modFind,
  modOwnDefinitions,
  type Mod,
} from "../mod/index.ts"
import { parseStmts } from "../parse/index.ts"
import { globalLoadedMods } from "./globalLoadedMods.ts"
import { handleDefine } from "./handleDefine.ts"
import { handleEffect } from "./handleEffect.ts"
import { handleImport } from "./handleImport.ts"

export async function load(url: URL): Promise<Mod> {
  const found = globalLoadedMods.get(url.href)
  if (found !== undefined) return found.mod

  const text = await fs.promises.readFile(url.pathname, "utf8")
  const mod = createMod(url)
  mod.stmts = parseStmts(text)

  globalLoadedMods.set(url.href, { mod, text })
  await run(mod)
  return mod
}

async function run(mod: Mod): Promise<void> {
  if (mod.isFinished) return

  for (const stmt of mod.stmts) await handleDefine(mod, stmt)
  for (const stmt of mod.stmts) await handleImport(mod, stmt)

  postprocess(mod)

  for (const stmt of mod.stmts) await handleEffect(mod, stmt)

  mod.isFinished = true
}

function postprocess(mod: Mod): void {
  for (const def of modOwnDefinitions(mod).values()) {
    def.freeNames = expFreeNames(new Set(), def.exp)
  }

  for (const def of modOwnDefinitions(mod).values()) {
    assert(def.freeNames)
    for (const name of def.freeNames) {
      if (!modFind(mod, name)) {
        throw new Error(
          `[load] I find undefined name: ${name}\n` +
            `  defining: ${def.name}\n` +
            `  to: : ${formatExp(def.exp)}\n`,
        )
      }
    }
  }

  for (const def of modOwnDefinitions(mod).values()) {
    if (expIndirectFreeNames(mod, def.exp).has(def.name)) {
      def.isRecursive = true
    }
  }
}
