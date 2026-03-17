// random int between start (inclusive) and end (exclusive)

export function randomInt(start: number, end: number): number {
  return Math.floor(Math.random() * (end - start + 1)) + start
}
