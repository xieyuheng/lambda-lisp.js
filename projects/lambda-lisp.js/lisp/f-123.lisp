(define (f2 n) (f2 (f2 n)))
(define (g2 n) (g2 (g2 n)))
(assert-bisimilar f2 g2)

(define (f3 n) (f3 (f3 (f3 n))))
(define (g3 n) (g3 (g3 (g3 n))))
(assert-bisimilar f3 g3)

;; TODO
;; (assert-bisimilar f2 f3)
