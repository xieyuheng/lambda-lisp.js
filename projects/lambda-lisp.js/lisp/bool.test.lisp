(import "bool.lisp" true false if and or not)

(assert-bisimilar (and true false) false)
(assert-bisimilar (or true false) true)
(assert-bisimilar (not true) false)
(assert-bisimilar (not (not true)) true)

(assert-bisimilar
  (lambda (x) (not (not true)))
  (lambda (x) true))
