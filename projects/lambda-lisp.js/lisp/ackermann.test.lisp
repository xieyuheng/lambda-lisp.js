(import "nat-church.lisp" zero add1 sub1 zero?)
(import "nat-church.lisp" one two three four five)
(import "bool.lisp" if)

(import "ackermann.lisp" ackermann)

ackermann

(assert-bisimilar (ackermann zero zero) one)
(assert-bisimilar (ackermann one zero) two)
(assert-bisimilar (ackermann zero one) two)
(assert-bisimilar (ackermann two zero) three)
(assert-bisimilar (ackermann one one) three)
(assert-bisimilar (ackermann zero two) three)
(assert-bisimilar (ackermann three zero) five)
(assert-bisimilar (ackermann two one) five)
(assert-bisimilar (ackermann one two) four)
(assert-bisimilar (ackermann zero three) four)

(assert-bisimilar
  ackermann
  (lambda (m n)
    (if (zero? m)
      (add1 n)
      (if (zero? n)
        (ackermann (sub1 m) one)
        (ackermann (sub1 m) (ackermann m (sub1 n)))))))

(assert-bisimilar
  ackermann
  (lambda (m n)
    (if (zero? m)
      (add1 n)
      (if (zero? n)
        (ackermann (sub1 m) one)
        ((lambda (m n)
           (if (zero? m)
             (add1 n)
             (if (zero? n)
               (ackermann (sub1 m) one)
               (ackermann (sub1 m) (ackermann m (sub1 n))))))
         (sub1 m)
         (ackermann m (sub1 n)))))))
