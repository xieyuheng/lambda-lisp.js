import * as L from "../index.ts"

export function definitionMeaning(definition: L.Definition): L.Value {
  if (definition.value) {
    return definition.value
  }

  const value = L.evaluate(definition.mod, L.emptyEnv(), definition.exp)
  definition.value = value
  return value
}
