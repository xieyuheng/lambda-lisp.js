(define (f1 n) (f1 n))
(define (g1 n) (g1 n))

;; (assert-bisimilar f1 g1)

(define (f2 n) (f2 (f2 n)))
(define (g2 n) (g2 (g2 n)))

;; (assert-bisimilar f2 g2)

;; TODO fail
;; (assert-bisimilar f2 (lambda (n) (f2 (f2 (f2 n)))))

;; TODO fail
;; (assert-bisimilar (lambda (n) (f2 (f2 n))) (lambda (n) (f2 (f2 (f2 n)))))

;; neutral-fail 之后，马上展开 rhs 的递归定义了，这会导致无限循环。
;; 如果把递归函数的深度优先遍历，改成广度优先，可能就可以了。

;; [neutralBisimilar/neutral-fail] n₂ (f2 n₂)
;; (f2 (f2 n₂)) = (f2 (f2 (f2 n₂)))
;; (f2 n₂) = (f2 (f2 n₂))

;; [valueBisimilar/rhs] n₂ (f2 n₂)
;; (f2 (f2 n₂)) = (f2 (f2 (f2 n₂)))
;; (f2 n₂) = (f2 (f2 n₂))

;; [neutralBisimilar/neutral-fail] n₂ (f2 (f2 n₂))
;; (f2 (f2 n₂)) = (f2 (f2 (f2 n₂)))
;; (f2 n₂) = (f2 (f2 n₂))
;; n₂ = (f2 n₂)

;; [valueBisimilar/rhs] n₂ (f2 (f2 n₂))
;; (f2 (f2 n₂)) = (f2 (f2 (f2 n₂)))
;; (f2 n₂) = (f2 (f2 n₂))
;; n₂ = (f2 n₂)

;; [neutralBisimilar/neutral-fail] n₂ (f2 (f2 (f2 n₂)))
;; (f2 (f2 n₂)) = (f2 (f2 (f2 n₂)))
;; (f2 n₂) = (f2 (f2 n₂))
;; n₂ = (f2 n₂)
;; n₂ = (f2 (f2 n₂))

;; [valueBisimilar/rhs] n₂ (f2 (f2 (f2 n₂)))
;; (f2 (f2 n₂)) = (f2 (f2 (f2 n₂)))
;; (f2 n₂) = (f2 (f2 n₂))
;; n₂ = (f2 n₂)
;; n₂ = (f2 (f2 n₂))

(define (f3 n) (f3 (f3 (f3 n))))
(define (g3 n) (g3 (g3 (g3 n))))

;; (assert-bisimilar f3 g3)

;; TODO fail
;; (assert-bisimilar f2 f3)
