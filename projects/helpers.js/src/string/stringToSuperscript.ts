export function stringToSuperscript(s: string): string {
  return [...s].map((c) => numberSuperscripts[c] || c).join("")
}

export const numberSuperscripts: Record<string, string> = {
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
}
