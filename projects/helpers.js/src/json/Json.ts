export type Json = AtomJson | ArrayJson | JsonObject

export type AtomJson = string | number | boolean | null | undefined

export type ArrayJson = Array<Json>

export type JsonObject = { [x: string]: Json }

export function isJsonObject(json: Json): json is JsonObject {
  return typeof json === "object" && json !== null && !isArrayJson(json)
}

export function isArrayJson(json: Json): json is ArrayJson {
  return json instanceof Array
}
