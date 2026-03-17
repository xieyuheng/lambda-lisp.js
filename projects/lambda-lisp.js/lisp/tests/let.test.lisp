(assert-bisimilar
  (lambda (x) x)
  (let ((id (lambda (x) x)))
    (id id)))
