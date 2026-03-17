# lambda-lisp.js

An implementation of call-by-value [lambda calculus](https://en.wikipedia.org/wiki/Lambda_calculus).

```scheme
(define name body)
(define (name arg ...) body)
(import name ... "./file.scm")
(assert-bisimilar lhs rhs)
(assert-not-bisimilar lhs rhs)

(lambda (name) ret)
(let ((name exp) ...) body)
```
