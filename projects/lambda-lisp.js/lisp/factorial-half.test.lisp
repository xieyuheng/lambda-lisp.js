(import "nat-church.lisp" add mul)
(import "nat-church.lisp" zero one two three four five)

(import "factorial-half.lisp" factorial)

(assert-bisimilar (factorial zero) one)
(assert-bisimilar (factorial one) one)
(assert-bisimilar (factorial two) two)
(assert-bisimilar (factorial three) (mul three two))
;; (assert-bisimilar (factorial four) (mul four (mul three two)))
;; (assert-bisimilar (factorial five) (mul five (mul four (mul three two))))
