(import "nat-church.lisp" zero zero? add sub1)
(import "nat-church.lisp" one two three four five)
(import "bool.lisp" if)

(define (fibonacci-wrap fib1 fib2)
  (lambda (n)
    (if (zero? n)
      zero
      (if (zero? (sub1 n))
        one
        (add (fib1 (sub1 n))
             (fib2 (sub1 (sub1 n))))))))

(define fibonacci-1
  (fibonacci-wrap fibonacci-1 fibonacci-1))

(assert-bisimilar (fibonacci-1 zero) zero)
(assert-bisimilar (fibonacci-1 one) one)
(assert-bisimilar (fibonacci-1 two) one)
(assert-bisimilar (fibonacci-1 three) two)
(assert-bisimilar (fibonacci-1 four) three)
(assert-bisimilar (fibonacci-1 five) five)

(define fibonacci-2
  (fibonacci-wrap
   (fibonacci-wrap fibonacci-2 fibonacci-2)
   fibonacci-2))

;; TODO the following fibonacci-2 can not pass,
;; the following assert-bisimilar,
;; but the above fibonacci-2 can pass.

;; (assert-bisimilar fibonacci-2 fibonacci-3)

;; (define (fibonacci-2 n)
;;   (if (zero? n)
;;     zero
;;     (if (zero? (sub1 n))
;;       one
;;       (add ((fibonacci-wrap fibonacci-2 fibonacci-2) (sub1 n))
;;            (fibonacci-2 (sub1 (sub1 n)))))))

;; (define fibonacci-2
;;   (fibonacci-wrap
;;    fibonacci-2
;;    (fibonacci-wrap fibonacci-2 fibonacci-2)))

(assert-bisimilar (fibonacci-2 zero) zero)
(assert-bisimilar (fibonacci-2 one) one)
(assert-bisimilar (fibonacci-2 two) one)
(assert-bisimilar (fibonacci-2 three) two)
;; (assert-bisimilar (fibonacci-2 four) three)
;; (assert-bisimilar (fibonacci-2 five) five)

(define fibonacci-3
  (fibonacci-wrap
   (fibonacci-wrap fibonacci-3 fibonacci-3)
   (fibonacci-wrap fibonacci-3 fibonacci-3)))

;; (define (fibonacci-3 n)
;;   (if (zero? n)
;;     zero
;;     (if (zero? (sub1 n))
;;       one
;;       (add ((fibonacci-wrap fibonacci-3) (sub1 n))
;;            ((fibonacci-wrap fibonacci-3) (sub1 (sub1 n)))))))

(assert-bisimilar (fibonacci-3 zero) zero)
(assert-bisimilar (fibonacci-3 one) one)
(assert-bisimilar (fibonacci-3 two) one)
(assert-bisimilar (fibonacci-3 three) two)
;; (assert-bisimilar (fibonacci-3 four) three)
;; (assert-bisimilar (fibonacci-3 five) five)

(assert-not-convertible fibonacci-1 fibonacci-2)

(assert-bisimilar fibonacci-1 fibonacci-2)
(assert-bisimilar fibonacci-1 fibonacci-3)

;; TODO fail:
;; Maximum call stack size exceeded
(assert-bisimilar fibonacci-2 fibonacci-3)
