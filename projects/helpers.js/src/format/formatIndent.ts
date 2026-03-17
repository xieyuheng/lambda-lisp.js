export function formatIndent(length: number, text: string): string {
  return text.split("\n").join("\n" + " ".repeat(length))
}
