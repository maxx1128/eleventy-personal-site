---
title: JavaScript has an infinity value
category: JavaScript
date: 2021-01-24
---

There have been times where I had to calculate the limit for a number of items. Sometimes the limit was 0, 1, 15, or whatever. But recently, I had to remove the limit altogether but still had to return a number.

My first thought was to return a magic number too high to ever be reached, like `99999`. But a colleague pointed out JavaScript has a global `Infinity` value for situations like this.

`Infinity` is seen as a number, and as you'd expect, no number can be bigger than it. If that was possible, the universe would presumably explode.

```javascript
> typeof Infinity
'number'

> Infinity > 999999999999
true

> Infinity < 999999999999
false
```

Using `Infinity` or `999999999999` likely have the same effect, since there's no realistic chance of most data lists in any application getting that long outside of hacks or data errors. To me, the benefit is more semantic. A magic number could confuse folks down the line if there was a now-lost reason for using that number. **`Infinity` makes it clear it's a fail-safe, one-outcome operation. Even in the case of hacked or errored data.**

This holds true, no matter what any second-graders may try to tell you. Adding a few numbers to `Infinity` doesn't make it any bigger.

```javascript
> Infinity + 2
Infinity

> Infinity + 2 > Infinity
false

> Infinity + 2 === Infinity
true
```
