;; (define (Y f)
;;   ((lambda (u) (u u))
;;    (lambda (u) (u u))))

;; (define (Y f)
;;   ((lambda (u) (u u))
;;    (lambda (x) (f (lambda (t) ((x x) t))))))

(define (Y f)
  ((lambda (x) (f (lambda (t) ((x x) t))))
   (lambda (x) (f (lambda (t) ((x x) t))))))

(define (turing-half x y) (y (x x y)))
;; (define (turing-half x y) (y (lambda (z) (x x y z))))
(define turing (turing-half turing-half))
