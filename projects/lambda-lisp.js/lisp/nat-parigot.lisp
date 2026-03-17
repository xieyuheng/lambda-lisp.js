(define zero (lambda (base step) base))
(define (add1 prev) (lambda (base step) (step prev (prev base step))))
(define (rec-Nat n base step) (n base step))

(define one (add1 zero))
(define two (add1 one))
(define three (add1 two))
(define four (add1 three))
(define five (add1 four))
(define six (add1 five))
(define seven (add1 six))
(define eight (add1 seven))
(define nine (add1 eight))
(define ten (add1 nine))

(define (add m n)
  (rec-Nat m
    n
    (lambda (prev almost) (add1 almost))))

(assert-bisimilar (add two five) seven)
(assert-bisimilar (add three three) six)

(define (mul m n)
  (rec-Nat m
    zero
    (lambda (prev almost) (add n almost))))

(assert-bisimilar (mul two five) ten)
(assert-bisimilar (mul three three) nine)
(assert-bisimilar (add two two) (mul two two))

(assert-bisimilar
  (mul two (mul two two))
  (mul (mul two two) two))

;; TODO too big

;; (assert-bisimilar
;;   (mul two (mul two (mul two two)))
;;   (mul (mul two two) (mul two two)))

(define (sub1 n)
  (rec-Nat n
    zero
    (lambda (prev almost) prev)))

(assert-bisimilar (sub1 three) two)
(assert-bisimilar (sub1 two) one)
(assert-bisimilar (sub1 one) zero)
(assert-bisimilar (sub1 zero) zero)

(define (factorial n)
  (rec-Nat n
    one
    (lambda (prev almost) (mul (add1 prev) almost))))

(assert-bisimilar (factorial zero) one)
(assert-bisimilar (factorial one) one)
(assert-bisimilar (factorial two) two)
(assert-bisimilar (factorial three) (mul three two))

;; TODO too big

;; (assert-bisimilar (factorial four) (mul four (mul three two)))
;; (assert-bisimilar (factorial five) (mul five (mul four (mul three two))))
