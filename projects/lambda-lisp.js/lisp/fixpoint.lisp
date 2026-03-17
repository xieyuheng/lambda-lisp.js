;; (define (Y f)
;;   ((lambda (u) (u u))
;;    (lambda (x) (f (lambda (t) ((x x) t))))))

(define (Y f)
  ((lambda (x) (f (lambda (t) ((x x) t))))
   (lambda (x) (f (lambda (t) ((x x) t))))))
