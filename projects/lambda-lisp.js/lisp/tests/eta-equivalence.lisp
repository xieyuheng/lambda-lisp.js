(define (id x) x)

;; eta-equivalence

;; (assert-bisimilar
;;   (lambda (f) f)
;;   (lambda (f) (lambda (x) (f x))))

(assert-bisimilar
  ((lambda (f) f) id)
  ((lambda (f) (lambda (x) (f x))) id))

(assert-bisimilar id (lambda (x) x))
(assert-bisimilar id (lambda (x) (id x)))
(assert-bisimilar id ((lambda (f) (lambda (x) (f x))) id))
