import { formatExp } from "../format/index.ts"
import { type Neutral, type Value } from "../value/index.ts"

export function formatValue(value: Value): string {
  switch (value.kind) {
    case "NeutralValue": {
      return formatNeutral(value.neutral)
    }

    case "ClosureValue": {
      return `(lambda (${value.name}) ${formatExp(value.ret)})`
    }
  }
}

export function formatNeutral(neutral: Neutral): string {
  switch (neutral.kind) {
    case "VarNeutral": {
      return neutral.name
    }

    case "ConstantNeutral": {
      return neutral.definition.name
    }

    case "ApplyNeutral": {
      const target = formatNeutral(neutral.target)
      const arg = formatValue(neutral.arg)
      return `(${target} ${arg})`
    }
  }
}
