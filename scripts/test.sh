#!/usr/bin/env bash

set -e

pnpm run -r test
pnpm run -r test:cli
