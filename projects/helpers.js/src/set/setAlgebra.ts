export function setAdd<T>(x: ReadonlySet<T>, e: T): Set<T> {
  return new Set([...x, e])
}

export function setAddMany<T>(x: ReadonlySet<T>, es: Array<T>): Set<T> {
  return new Set([...x, ...es])
}

export function setUnion<T>(x: ReadonlySet<T>, y: ReadonlySet<T>): Set<T> {
  return new Set([...x, ...y])
}

export function setUnionMany<T>(setArray: Array<Set<T>>): Set<T> {
  return setArray.reduceRight((result, s) => setUnion(result, s), new Set())
}

export function setIntersection<T>(
  x: ReadonlySet<T>,
  y: ReadonlySet<T>,
): Set<T> {
  const z = new Set<T>()
  for (const e of x) {
    if (y.has(e)) {
      z.add(e)
    }
  }

  return z
}

export function setDifference<T>(x: ReadonlySet<T>, y: ReadonlySet<T>): Set<T> {
  const z = new Set<T>()
  for (const e of x) {
    if (!y.has(e)) {
      z.add(e)
    }
  }

  return z
}

export function setSymmetricDifference<T>(
  x: ReadonlySet<T>,
  y: ReadonlySet<T>,
): Set<T> {
  return setDifference(setUnion(x, y), setIntersection(x, y))
}

export function setIsSubsetOf<T>(
  x: ReadonlySet<T>,
  y: ReadonlySet<T>,
): boolean {
  for (const e of x) {
    if (!y.has(e)) {
      return false
    }
  }

  return true
}

export function setEqual<T>(x: ReadonlySet<T>, y: ReadonlySet<T>): boolean {
  return setIsSubsetOf(x, y) && setIsSubsetOf(y, x)
}

export function setIsSupersetOf<T>(
  x: ReadonlySet<T>,
  y: ReadonlySet<T>,
): boolean {
  return setIsSubsetOf(y, x)
}

export function setIsDisjointFrom<T>(
  x: ReadonlySet<T>,
  y: ReadonlySet<T>,
): boolean {
  for (const e of x) {
    if (y.has(e)) {
      return false
    }
  }

  for (const e of y) {
    if (x.has(e)) {
      return false
    }
  }

  return true
}
