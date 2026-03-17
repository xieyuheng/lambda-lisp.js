export function stringBernsteinHash(string: string): number {
  const bytes = new TextEncoder().encode(string)
  let hash = 0
  for (const byte of bytes) {
    hash = ((((hash << 5) >>> 0) + hash) >>> 0) ^ byte
  }

  return hash
}
