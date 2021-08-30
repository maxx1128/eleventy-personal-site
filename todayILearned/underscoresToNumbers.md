---
title: You can add underscores to numbers
category: JavaScript
date: 2021-08-25
---

In programming as a whole, long numbers can be tough to read. It takes a few seconds to figure out just how big this number is. Is it around one hundred thousand, one million, ten million, or something else?

```
1234567
```

But JavaScript, for once, has a trick to make things easier! **We can add underscores to numbers that make them more readable without affecting the value.**

```javascript
let x = 1_234_567
let y = 1234567

console.log(x === y)
// true (hooray!)
```

The `x` and `y` variables are the same number, but `x` is easier to read.

But with great power comes great responsibility. Using them too much can bring the code's readability back to square one.

```javascript
let x = 1_2_3_4_5_6_7
let y = 1234567
// Both are the same number
// and just as confusing
```

Plus, there's the requisite example of "JavaScript absurdity you should do for fun but never for work."

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">(Well, ya know ... within the limits of JavaScript of course) <a href="https://t.co/XB618g34C5">pic.twitter.com/XB618g34C5</a></p>&mdash; Ben Michel (@obensource) <a href="https://twitter.com/obensource/status/1405986895704719361?ref_src=twsrc%5Etfw">June 18, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

You're better off using [JavaScript's "infinity value,"](/todayilearned/javascriptinfinity/) which I wrote about before. Unless you want to use this to mess with a coworker on April Fools Day.
