---
title: Equal Signs
category: Javascript
resources:
  - name: JavaScript — Double Equals vs. Triple Equals
    url: https://codeburst.io/javascript-double-equals-vs-triple-equals-61d4ce5a121a
date: 2020-06-08
---

`===` comparisons looks for **strict equality,** meaning it looks for matching "type" and "value".

* `55 === 55` returns `true`
* `55 === '55'` returns `false` (Same values, different types)

`==` comparisons look for **loose equality,** meaning it only looks for matching value. It can perform "type coercion" if needed, which converts the both values to the same type before comparing values.

* `55 == 55` returns `true`
* `55 == '55'` returns `true` (Different types, but it converts both values to the same type before comparing them, which makes it true)

This distinction is important since loose equality can lead to unexpected bugs related to conditions returning true when they may need to be false. It's better practice to always use `===` for comparisons.
