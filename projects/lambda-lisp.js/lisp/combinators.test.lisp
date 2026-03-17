(import "combinators.lisp" S K I)

(assert-bisimilar I (I I))
(assert-bisimilar I (K I I))
