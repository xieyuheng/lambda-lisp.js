export function numberAlign(alignment: number, n: number): number {
  const remainder = n % alignment
  if (remainder === 0) {
    return n
  } else {
    return n - remainder + alignment
  }
}
