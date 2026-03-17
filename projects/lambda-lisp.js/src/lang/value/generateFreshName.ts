import { stringToSubscript } from "@xieyuheng/helpers.js/string"

export function generateFreshName(name: string): string {
  const subscript = stringToSubscript(generateVarSerialNumber(name).toString())
  return `${name}${subscript}`
}

const serialNumberMap: Map<string, bigint> = new Map()

function generateVarSerialNumber(name: string): bigint {
  const count = serialNumberMap.get(name)
  if (count) {
    serialNumberMap.set(name, count + 1n)
    return count + 1n
  } else {
    serialNumberMap.set(name, 1n)
    return 1n
  }
}
