#!/usr/bin/env sh

bin="node ./lib/main.js run"
ext=lisp

for file in $(find lisp -name "*.${ext}" -not -name "*.test.${ext}" -not -name "*.error.${ext}" -not -name "*.play.${ext}" -not -name "*.benchmark.${ext}"); do
    echo "[run] $file"
    ${bin} $file
done

for file in $(find lisp -name "*.test.${ext}"); do
    echo "[out] $file"
    ${bin} $file > $file.out
done

for file in $(find lisp -name "*.error.${ext}"); do
    echo "[err] $file"
    ${bin} $file > $file.err || true
done
