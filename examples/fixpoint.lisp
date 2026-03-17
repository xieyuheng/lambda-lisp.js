(define (Y f)
  ((lambda (u) (u u))
   (lambda (x) (f (lambda (t) ((x x) t))))))
