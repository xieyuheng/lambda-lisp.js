(import "nat-church.lisp" zero one two three four five)
(import "fibonacci.lisp" fibonacci)

(assert-bisimilar (fibonacci zero) zero)
(assert-bisimilar (fibonacci one) one)
(assert-bisimilar (fibonacci two) one)
(assert-bisimilar (fibonacci three) two)
(assert-bisimilar (fibonacci four) three)
(assert-bisimilar (fibonacci five) five)
