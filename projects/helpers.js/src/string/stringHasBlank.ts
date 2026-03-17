export function stringHasBlank(s: string): boolean {
  return s.includes(" ") || s.includes("\n") || s.includes("\t")
}
