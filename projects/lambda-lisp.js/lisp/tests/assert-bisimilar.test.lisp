(assert-bisimilar
  (lambda (x) x)
  (lambda (y) y))

(assert-bisimilar
  (lambda (x y) (x y))
  (lambda (y x) (y x)))

(assert-not-bisimilar
  (lambda (x y) (x y))
  (lambda (x y) (y x)))
