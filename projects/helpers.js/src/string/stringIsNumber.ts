export function stringIsNumber(s: string): boolean {
  if (typeof s != "string") return false
  return !isNaN(s as any) && !isNaN(parseFloat(s))
}
