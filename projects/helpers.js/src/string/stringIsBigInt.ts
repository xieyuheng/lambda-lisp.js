export function stringIsBigInt(s: string): boolean {
  try {
    BigInt(s)
    return true
  } catch (_) {
    return false
  }
}
