import { test } from "node:test"
import { stringBernsteinHash } from "./stringBernsteinHash.ts"

function logHash(string: string) {
  console.log({ string, hash: stringBernsteinHash(string) })
}

test("stringBernsteinHash", () => {
  logHash("")
  logHash("a")
  logHash("ab")
  logHash("abc")
  logHash("1")
  logHash("12")
  logHash("123")
})
