import * as L from "../index.ts"

export function readback(value: L.Value): L.Exp {
  switch (value.kind) {
    case "NeutralValue": {
      return readbackNeutral(value.neutral)
    }

    case "ClosureValue": {
      const freshName = L.generateFreshName(value.name)
      const arg = L.NeutralValue(L.VarNeutral(freshName))
      const ret = L.apply(value, arg)
      return L.Lambda(freshName, readback(ret))
    }
  }
}

function readbackNeutral(neutral: L.Neutral): L.Exp {
  switch (neutral.kind) {
    case "VarNeutral": {
      return L.Var(neutral.name)
    }

    case "ConstantNeutral": {
      return L.Var(neutral.definition.name)
    }

    case "ApplyNeutral": {
      return L.Apply(readbackNeutral(neutral.target), readback(neutral.arg))
    }
  }
}
