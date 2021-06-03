---
title: How closures work
category: JavaScript
date: 2021-01-19
---

Closure is a fundamental part of JavaScript that affects every programmer sooner or later. It's also a mild pain to understand, so I want my own explanation to show it step by step.

Imagine you have a function which also has a function inside of it.

```javascript
function createMonster() {
  let name = 'Super Bear';

  function revealName() {
    console.log(name);
  }
}
```

If you save the outer function `createMonster()` into a variable, you can then call the inner function `revealName` from that variable. It will use the `name` variable declared in that outer function’s scope.

```javascript
let myMonster = createMonster();
myMonster.revealName();// 'Super Bear'
```

You could adjust this so this inner function is returned by default, so you don’t need to specifically call it by name.

```javascript
function createMonster() {
  let name = 'Super Bear';
  function revealName() { console.log(name); }
  return revealName();
}

let myMonster = createMonster();
myMonster();// 'Super Bear'
```

What’s important to remember is **the inner function has access to everything in the outer function at the time it was called and stored in a variable.** Whenever that function is called, it’s referencing the data it had at the time it was first called.

It's like it got saved into its own personal bubble once it was created. But the above examples have the same data saved in each bubble, so it's not that useful. The difference, and implications, are clearer when you start passing data in through the outer function.

```javascript
function makeAdder(x) {
  function showAddValue() { return x; }
  return function(y) { return x + y; };
}
```

This function is fairly simple: the outer function takes the first value, and the inner function takes a second value. When you call the inner function, it adds them both together. But with this setup, you can use closure to save different versions of this function to multiple variables.

So if we did this:

```javascript
const add10 = makeAdder(10);
```

This creates a *closure* in the `addTen` variable. This is a bubble of everything in that environment when it was declared, and that bubble exists separate of everything else in the code. That bubble floats along with those values as the code keeps going.

If you call the `addTen` function, it gives the expected result.

```javascript
add10(5); // 15
```

Due to the closure formed by the function, the variable will reach into it’s memory and find the `10` we stored from when it was declared. It will take that value we passed into the outer function to make the inner function we’re calling. So it will add the 10 and 5 together to create 15.

You can use this repeatedly to make lots of different adders, knowing that their closures will store the numbers. This shows a practical application of closure, creating a factory for functions that can be quickly customized to add different numbers when needed.

```javascript
const add5 = makeAdder(5);
const add10 = makeAdder(10);
const add50 = makeAdder(50);
const add666 = makeAdder(666);

add5.showAddValue();   // 5
add10.showAddValue();  // 10
add50.showAddValue();  // 50
add666.showAddValue(); // 666

add5(25);    // 30
add10(90);   // 100
add50(25);   // 75
add666(334); // 1000
```

This also shows the core benefit of closure functions: **limiting these differences to variables keeps them out of the global scope**, making them less likely to accidentally affect other code. Their limited scope essentially make “private scopes” that can only be accessed through this outer function. If you removed the `showAddValue` inner function, you’d have no way to return the `x` variables stored in that scope. It’d be completely hidden away in that closure with no way to access it.
