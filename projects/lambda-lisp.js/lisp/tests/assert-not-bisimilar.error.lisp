(assert-not-bisimilar
  (lambda (x y) (x y))
  (lambda (y x) (y x)))
