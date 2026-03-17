import Path from "node:path"
import process from "node:process"

export function pathRelativeToCwd(path: string): string {
  return Path.relative(process.cwd(), path)
}
