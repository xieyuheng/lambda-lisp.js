import { DelayedApplyValue, type Value } from "./Value.ts"

export function delayedApplyHead(delayedApply: DelayedApplyValue): Value {
  if (delayedApply.target.kind === "DelayedApplyValue") {
    return delayedApplyHead(delayedApply.target)
  }

  return delayedApply.target
}
