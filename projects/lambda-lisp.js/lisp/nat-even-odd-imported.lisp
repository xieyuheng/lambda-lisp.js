(import "bool.lisp" true false if and or not)
(import "nat-church.lisp" zero add1 sub1 zero?)
(import "nat-church.lisp" one two three four)

(import "nat-even.lisp" even?)
(import "nat-odd.lisp" odd?)

(assert-bisimilar true (even? zero))
(assert-bisimilar true (even? two))
(assert-bisimilar true (even? four))

(assert-bisimilar false (even? one))
(assert-bisimilar false (even? three))

(assert-bisimilar false (odd? zero))
(assert-bisimilar false (odd? two))
(assert-bisimilar false (odd? four))

(assert-bisimilar true (odd? one))
(assert-bisimilar true (odd? three))

;; test equivalence between recursive functions

(assert-bisimilar even? even?)
(assert-bisimilar odd? odd?)

(assert-bisimilar
  even?
  (lambda (n)
    (if (zero? n) true
        (odd? (sub1 n)))))

(assert-not-bisimilar
  odd?
  (lambda (n)
    (if (zero? n) true
        (odd? (sub1 n)))))
