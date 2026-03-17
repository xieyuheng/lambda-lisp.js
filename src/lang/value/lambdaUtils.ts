import { type ClosureValue } from "./Value.ts"

export type DefinedLambda = ClosureValue & { definedName: string }

export function lambdaIsDefined(lambda: ClosureValue): lambda is DefinedLambda {
  return lambda.definedName !== undefined
}

export function lambdaSameDefined(x: ClosureValue, y: ClosureValue): boolean {
  return (
    lambdaIsDefined(x) &&
    lambdaIsDefined(y) &&
    x.definedName === y.definedName &&
    x.mod === y.mod
  )
}
