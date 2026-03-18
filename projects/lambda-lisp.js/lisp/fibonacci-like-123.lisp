(import "nat-church.lisp" zero zero? add sub1)
(import "nat-church.lisp" one two three four five)
(import "bool.lisp" if)

(define (fibonacci-1 n)
  (add (fibonacci-1 (sub1 n))
       (fibonacci-1 (sub1 (sub1 n)))))

(define (fibonacci-2 n)
  (add (add (fibonacci-2 (sub1 (sub1 n)))
            (fibonacci-2 (sub1 (sub1 (sub1 n)))))
       (fibonacci-2 (sub1 (sub1 n)))))

(define (fibonacci-3 n)
  (add (add (fibonacci-3 (sub1 (sub1 n)))
            (fibonacci-3 (sub1 (sub1 (sub1 n)))))
       (add (fibonacci-3 (sub1 (sub1 (sub1 n))))
            (fibonacci-3 (sub1 (sub1 (sub1 (sub1 n))))))))

;; TODO fail:
;; (assert-bisimilar fibonacci-1 fibonacci-2)
;; (assert-bisimilar fibonacci-1 fibonacci-3)
;; (assert-bisimilar fibonacci-2 fibonacci-3)
