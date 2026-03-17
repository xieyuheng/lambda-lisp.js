import fs from "node:fs"
import Path from "node:path"

export function getPackageJson(baseDir: string) {
  const packageFile = findUpFile(baseDir, "package.json")
  if (packageFile === undefined) {
    let message = `[getPackageJson] can not find package.json`
    message += `\n  baseDir: ${baseDir}`
    throw new Error(message)
  }

  const packageText = fs.readFileSync(packageFile, "utf8")
  return JSON.parse(packageText)
}

function findUpFile(baseDir: string, file: string): string | undefined {
  baseDir = Path.resolve(baseDir)
  while (true) {
    if (fs.existsSync(Path.join(baseDir, file))) {
      return Path.join(baseDir, file)
    }

    if (baseDir === "/") {
      return undefined
    }

    baseDir = Path.dirname(baseDir)
  }
}
