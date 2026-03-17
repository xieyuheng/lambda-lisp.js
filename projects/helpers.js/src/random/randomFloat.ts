// random int between start (inclusive) and end (exclusive)

export function randomFloat(start: number, end: number): number {
  return Math.random() * (end - start) + start
}
