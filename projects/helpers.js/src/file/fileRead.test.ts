import Path from "node:path"
import { test } from "node:test"
import { fileURLToPath } from "node:url"
import { fileRead, openInputFile } from "./index.ts"

const currentDir = Path.dirname(fileURLToPath(import.meta.url))

test("fileRead", () => {
  const file = openInputFile(Path.join(currentDir, "index.ts"))
  console.log({ "index.ts": fileRead(file) })
})
