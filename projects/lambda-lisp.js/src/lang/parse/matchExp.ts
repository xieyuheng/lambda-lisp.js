import * as X from "@xieyuheng/x-data.js"
import * as Exps from "../exp/index.ts"
import { bindingsFromArray, type Binding, type Exp } from "../exp/index.ts"

const expMatcher: X.Matcher<Exp> = X.matcherChoice<Exp>([
  X.matcher("`(lambda ,names ,exp)", ({ names, exp }) =>
    X.dataToArray(names)
      .map(X.symbolToString)
      .reduceRight((fn, name) => Exps.Lambda(name, fn), matchExp(exp)),
  ),

  X.matcher("`(let ,bindings ,body)", ({ bindings, body }) =>
    Exps.Let(
      bindingsFromArray(X.dataToArray(bindings).map(matchBind)),
      matchExp(body),
    ),
  ),

  X.matcher("(cons target args)", ({ target, args }) =>
    X.dataToArray(args)
      .map(matchExp)
      .reduce((result, arg) => Exps.Apply(result, arg), matchExp(target)),
  ),

  X.matcher("name", ({ name }) => Exps.Var(X.symbolToString(name))),
])

export function matchExp(data: X.Data): Exp {
  return X.match(expMatcher, data)
}

export function matchBind(data: X.Data): Binding {
  return X.match(
    X.matcher("`(,name ,exp)", ({ name, exp }) => ({
      name: X.symbolToString(name),
      exp: matchExp(exp),
    })),
    data,
  )
}
