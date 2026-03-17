(define f1
  (lambda (n)
    (f1 (f1 n))))

(assert-bisimilar f1 f1)

(define f2
  (lambda (n)
    (f2 (f2 n))))

(assert-bisimilar f1 f2)
