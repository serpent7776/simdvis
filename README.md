# simdvis

Interactive visualisers for x86 SIMD instructions.

**Live:** https://serpent7776.github.io/simdvis

## Running locally

Open `index.html` in a browser. No build step required.

## Pre-commit checks

    git config core.hooksPath hooks

Checks staged HTML with `tidy` (if installed), syntax-checks inline JS with
`node`, and verifies every page is linked from `index.html`.
