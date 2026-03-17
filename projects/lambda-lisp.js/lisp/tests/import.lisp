(import "compose.lisp" id compose (rename compose c))

(assert-bisimilar id (compose (compose id id) (compose id id)))
(assert-bisimilar id (c (c id id) (c id id)))
