rename assert-equal to assert-bisimilar
rename assert-same to assert-convertible

# bug

[bug] `(assert-equal fibonacci fibonacci/1)` fail

- as i how understand it now, this fail,
  because of `sameInCtx` can only handle unary function,
  and loop forever in the case of `DelayedApply`.
  - should be like `readbackInCtx` in the case of `DelayedApply`,
    find the head of the `DelayedApply` to handle non unary functions.

[bug] `(assert-equal ackermann ackermann/1)` fail

- maybe is it possible to extend the algorithm to handle `ackermann`,
  if not, is it related to different classes of recursive functions?

[bug] why top level wrap need a eta?

```scheme
(define factorial-1 (factorial-wrap factorial-1))
(define (factorial-1 n) ((factorial-wrap factorial-1) n))
```

# later

`formatValue` -- use `let` to print closure
