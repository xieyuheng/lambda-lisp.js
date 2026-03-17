#!/usr/bin/env bash

set -e

parallel="parallel -v --halt now,fail=1"
bin="node ./lib/main.js run"
flags=""

find lisp -name "*.test.lisp" | $parallel $bin {} $flags
find lisp -name "*.snapshot.lisp" | $parallel $bin {} $flags ">" {}.out
find lisp -name "*.error.lisp" | $parallel $bin {} $flags ">" {}.err "||" true
