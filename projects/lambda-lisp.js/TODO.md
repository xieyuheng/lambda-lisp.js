`valueConvertible` -- handle eta-equivalence

```scheme
(assert-bisimilar
  (lambda (f) f)
  (lambda (f) (lambda (x) (f x))))
```

# later

`formatValue` -- use `let` to print closure
