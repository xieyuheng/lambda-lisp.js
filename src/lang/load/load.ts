import fs from "node:fs"
import { createMod, type Mod } from "../mod/index.ts"
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
  for (const stmt of mod.stmts) await handleEffect(mod, stmt)

  mod.isFinished = true
}
