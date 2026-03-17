(define zero (lambda (base step) base))
(define (add1 prev) (lambda (base step) (step (prev base step))))
(define (iter-Nat n base step) (n base step))

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

(define (add m n) (iter-Nat m n add1))

(assert-bisimilar (add two five) seven)
(assert-bisimilar (add three three) six)

;; The above `add` is `O(n)`,
;; Rosser has a `O(4)` `add`, which takes
;; four beta-reduction steps for any inputs
;; (assuming inputs are in normal forms).

(define (add-rosser m n)
  (lambda (base step)
    (iter-Nat m (iter-Nat n base step) step)))

(assert-bisimilar (add-rosser two five) seven)
(assert-bisimilar (add-rosser three three) six)

(define (mul m n) (iter-Nat m zero (add n)))

(assert-bisimilar (mul two five) ten)
(assert-bisimilar (mul three three) nine)
(assert-bisimilar (add two two) (mul two two))

(assert-bisimilar
  (mul two (mul two (mul two two)))
  (mul (mul two two) (mul two two)))

(define (power-of m n) (iter-Nat m one (mul n)))
(define (power m n) (power-of n m))

(assert-bisimilar (power two three) eight)
(assert-bisimilar (power three two) nine)

(assert-bisimilar (power two four) (power four two))
(assert-bisimilar (power two four) (mul four four))
(assert-bisimilar (power two four) (mul (mul two two) (mul two two)))

(import "bool.lisp" true false if and or not)

(define (zero? n) (iter-Nat n true (lambda (x) false)))

(assert-bisimilar (zero? zero) true)
(assert-bisimilar (zero? one) false)
(assert-bisimilar (zero? two) false)

;; The `sub1` about is `O(n)`,
;; while `sub1` for Scott encoding is `O(3)`.

(import "cons.lisp" cons car cdr)

(define (shift-add1 x)
  (cons (cdr x) (add1 (cdr x))))

(define (sub1 n)
  (car (iter-Nat n (cons zero zero) shift-add1)))

(assert-bisimilar (sub1 two) one)
(assert-bisimilar (sub1 one) zero)
(assert-bisimilar (sub1 zero) zero)

(define (sub m n) (iter-Nat n m sub1))

(assert-bisimilar (sub three zero) three)
(assert-bisimilar (sub three one) two)
(assert-bisimilar (sub three two) one)
(assert-bisimilar (sub three three) zero)
(assert-bisimilar (sub three four) zero)

(define (lteq m n) (zero? (sub m n)))

(assert-bisimilar (lteq three four) true)
(assert-bisimilar (lteq four three) false)
