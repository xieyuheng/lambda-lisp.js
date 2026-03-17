(assert-convertible
  (lambda (x) x)
  (lambda (y) y))

(assert-convertible
  (lambda (x y) (x y))
  (lambda (y x) (y x)))

(assert-not-convertible
  (lambda (x y) (x y))
  (lambda (x y) (y x)))

(define (id1 x) x)
(define (id2 x) x)

(assert-convertible id1 id1)
(assert-convertible id2 id2)
(assert-not-convertible id1 id2)

(assert-convertible
  (lambda (x) (id2 x))
  (lambda (x) (id2 x)))

;; partial evaluation for unnamed lambda:
(assert-convertible
  (lambda (x) ((lambda (x) (id2 x)) x))
  (lambda (x) (id2 x)))

(assert-not-convertible
  id1
  (lambda (x) (id1 x)))

(assert-not-convertible
  (lambda (x) (id2 x))
  (lambda (x) (id1 x)))
