export function jsonParseString(text: string): string | undefined {
  try {
    const value = JSON.parse(text)
    if (typeof value === "string") return value
    else return undefined
  } catch (error) {
    return undefined
  }
}

export function jsonParseNumber(text: string): number | undefined {
  try {
    const value = JSON.parse(text)
    if (typeof value === "number") return value
    else return undefined
  } catch (error) {
    return undefined
  }
}
