import assert from "node:assert"
import { test } from "node:test"
import { arrayZip } from "./arrayZip.ts"

test("arrayZip", () => {
  assert.deepStrictEqual(arrayZip([1, 2, 3], ["a", "b", "c"]), [
    [1, "a"],
    [2, "b"],
    [3, "c"],
  ])

  // based on length of the left
  assert.deepStrictEqual(arrayZip([1, 2, 3], ["a", "b", "c", "c"]), [
    [1, "a"],
    [2, "b"],
    [3, "c"],
  ])
})
