// import * as L from "../index.ts"

// export function valueConvertible(lhs: L.Value, rhs: L.Value): boolean {
//   if (lhs.kind === "NeutralValue" && rhs.kind === "NeutralValue") {
//     return valueConvertible(ctx, lhs.neutral, rhs.neutral)
//   }

//   if (lhs.kind === "ClosureValue" && rhs.kind === "ClosureValue") {
//     // if (lambdaSameDefined(lhs, rhs)) {
//     //   return true
//     // }
//     // if (lambdaIsDefined(lhs) || lambdaIsDefined(rhs)) {
//     //   return false
//     // }
//   }

//   if (lhs.kind === "ClosureValue") {
//     const freshName = freshen(ctx.boundNames, lhs.name)
//     ctx = ctxBindName(ctx, freshName)
//     const arg = Values.NeutralValue(Neutrals.VarNeutral(freshName))
//     return sameInCtx(ctx, apply(lhs, arg), apply(rhs, arg))
//   }

//   if (rhs.kind === "ClosureValue") {
//     const freshName = freshen(ctx.boundNames, rhs.name)
//     ctx = ctxBindName(ctx, freshName)
//     const arg = Values.NeutralValue(Neutrals.VarNeutral(freshName))
//     return sameInCtx(ctx, apply(lhs, arg), apply(rhs, arg))
//   }

//   return false
// }

// function neutralConvertible(lhs: Neutral, rhs: Neutral): boolean {
//   if (lhs.kind === "VarNeutral" && rhs.kind === "VarNeutral") {
//     return rhs.name === lhs.name
//   }

//   if (lhs.kind === "ApplyNeutral" && rhs.kind === "ApplyNeutral") {
//     return (
//       valueConvertible(ctx, lhs.target, rhs.target) &&
//       valueConvertible(ctx, lhs.arg, rhs.arg)
//     )
//   }

//   return false
// }
