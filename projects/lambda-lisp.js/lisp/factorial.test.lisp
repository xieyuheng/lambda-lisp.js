(import "nat-church.lisp" add mul)
(import "nat-church.lisp" zero one two three four five)

(import "factorial.lisp" factorial)

(assert-bisimilar (factorial zero) one)
(assert-bisimilar (factorial one) one)
(assert-bisimilar (factorial two) two)
(assert-bisimilar (factorial three) (mul three two))

;; TODO too big

;; (assert-bisimilar (factorial four) (mul four (mul three two)))
;; (assert-bisimilar (factorial five) (mul five (mul four (mul three two))))

;; test readback recursive functions

factorial

;; test equivalence between recursive functions

(assert-convertible factorial factorial)
(assert-bisimilar factorial factorial)

(assert-not-convertible factorial (lambda (x) (factorial x)))
(assert-bisimilar factorial (lambda (y) (factorial y)))
(assert-bisimilar factorial (lambda (x) (factorial x)))
(assert-bisimilar (lambda (x) (factorial x)) (lambda (y) (factorial y)))
