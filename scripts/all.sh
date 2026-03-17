#!/usr/bin/env bash

set -e

sh scripts/clean.sh
sh scripts/format.sh
sh scripts/build.sh
sh scripts/test.sh
