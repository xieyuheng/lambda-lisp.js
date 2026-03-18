(import "nat-church.lisp" zero zero? add sub1)
(import "nat-church.lisp" one two three four five)
(import "bool.lisp" if)

(define (fibonacci-wrap fib1 fib2)
  (lambda (n)
    (add (fib1 (sub1 n))
         (fib2 (sub1 (sub1 n))))))

;; (define (fibonacci-wrap fib1 fib2)
;;   (lambda (n)
;;     (if (zero? n)
;;       zero
;;       (if (zero? (sub1 n))
;;         one
;;         (add (fib1 (sub1 n))
;;              (fib2 (sub1 (sub1 n))))))))

(define fibonacci-1
  (fibonacci-wrap fibonacci-1 fibonacci-1))

(define fibonacci-2
  (fibonacci-wrap
   (fibonacci-wrap fibonacci-2 fibonacci-2)
   fibonacci-2))

(define fibonacci-3
  (fibonacci-wrap
   (fibonacci-wrap fibonacci-3 fibonacci-3)
   (fibonacci-wrap fibonacci-3 fibonacci-3)))

(assert-not-convertible fibonacci-1 fibonacci-2)
(assert-not-convertible fibonacci-1 fibonacci-3)
(assert-not-convertible fibonacci-2 fibonacci-3)

(assert-bisimilar fibonacci-1 fibonacci-2)
(assert-bisimilar fibonacci-1 fibonacci-3)
(assert-bisimilar fibonacci-2 fibonacci-3)
