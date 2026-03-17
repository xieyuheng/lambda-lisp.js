import { formatIndent } from "./formatIndent.ts"

export function formatUnderTag(i: number, tag: string, body: string): string {
  return formatIndent(i, `\n` + tag) + formatIndent(i + 2, `\n` + body)
}
