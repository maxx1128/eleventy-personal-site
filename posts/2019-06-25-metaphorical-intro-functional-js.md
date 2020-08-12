---
title: "A Metaphorical Introduction to Functional JavaScript"
date: "2019-06-25"
excerpt: "Functional JavaScript is my new favorite approach to writing JavaScript, but few introductions I found were beginner friendly. I break down the basics with angels, mutants, and demanding southern belles."
image: 'functional-js-metaphors.jpg'
tags: ['javascript']
featured_image_link: 'https://safebooru.org/index.php?page=post&s=view&id=2196900'
---

Functional JavaScript isn't a tool, framework, 3rd-party addon, npm module, or anything else you'd add on. Functional Programming is an approach for writing code, and Functional JavaScript (FJS) is how to use that approach for JavaScript. Like all approaches, it has benefits and drawbacks, tradeoffs one makes, people who like and dislike it, and different lobbying groups in international governments.

I'm firmly in the "like" camp for FJS. I've been writing JavaScript (poorly and otherwise) for several years and wish I'd learned about it from the start. **I've found the benefits of FJS well worth the learning curve, and it's resulted in code that's more readable, flexible, and maintainable.** I struggled to nail down what it means to write FJS, but once I did I couldn't go back.

From the name, you'd expect Functional Programming to just be about writing lots of functions. In a way that's true, but there are several rules one must follow to achieve that. Rules that are often hard to understand both at first glance and after some Google searches.

1. Use Pure Functions
2. Don't Mutate State
3. Declarative, not Imperative
4. Higher Order Functions

In this article, I'm going to try and break down these elements of FJS in ways that are easier to understand. This isn't an exhaustive guide by any means but is meant to be a jumping off point so people can better understand more detailed, thorough resources to learn FJS.

Let's begin!

## Keep Functions Pure

Using Pure Functions and avoiding State Mutation are perhaps the most important parts of writing FJS. Instead of starting with the usual definitions, I'm going to indulge myself and explain them with an imaginary dinner party.

### An Angel and a Mutant Enter a Dinner Party...

First, imagine an angel. The angel radiates a soft, pure white with glittering wings and a serene face. They bob gently over the ground and moves with smooth yet purposeful grace. No living person can see this angel, and it passes through anything it touches.

Let's say this angel was in the corner of a crowded dinner party. You tell the angel they need to move across the room and stand next to the punch bowl. The angel nods and starts floating toward this spot. No one can see or touch it. No one's conversations are disturbed and no one needs to move out of their way. Thanks to all this, the angel takes the shortest possible route to the punch bowl. If the dinner party filled with entirely new guests, the angel could do this again along the exact path.

Now imagine almost the exact opposite of this angel: a radioactive mutant. The mutant was once human but has transformed into something grotesque. They could have any grotesque feature you want: waving tentacles, eyes all over their back, feet that are webbed and clawed, a t-shirt with a pop culture reference decades out of date, or they own a real estate business. Whatever you choose, this mutant is scary and you can't look at it too long.

Let's say this mutant had the same task: move from the corner of a dinner party to the punch bowl. You could imagine how horrible that would go. People would be screaming and pushing away from the mutant constantly. Plus its radioactivity would start giving random people different mutations, and guests would run from them too. The mutant would need to push and shove along an unpredictable path to reach that spot. If you restarted this scenario at a party with different guests, the radiation would make different people mutate, and the humans would panic in new ways. The mutant would need to take a different, but just as rough, route to the punch bowl.

### To be a Pure Function

As you may have guessed, the angel has all the qualities of a pure function.

1. **No external state is changed.** The angel goes across the room without anyone or anything changing. A pure function does its job without anything outside the function changing either.
2. **The same input has the same results.** The angel takes the same exact path to the same path every time. A pure function, when given the same input, returns the same result each time.

And if the name wasn't a big enough giveaway, the mutant has all the qualities of a function that mutates state.

1. **Variables outside the function are affected.** The mutant affects other people by scaring party guests and making other people mutate. Impure functions change variables that exist outside of them, on purpose or by accident.
2. **The same input can have different results.** The mutant makes random people mutate, which will change the type of panic and therefore the path the mutant takes each time. Impure functions return different values due to how they affect outside variables each time.

Here's some actual JavaScript to drive all this home. Is the below `addNumber` function an angel or a mutant?

```javascript
let number = 0;

let addNumber = x => {
  number += x;
  return number;
}
```

`addNumber` is a mutant since it changes `number`, a variable outside the function. These changes mean we could run this function twice with the same parameter and get different results.

```javascript
addNumber(5) // 5
addNumber(5) // 10 (which is not 5)
```

If we wanted a pure angel function, we'd rewrite one like this.

```javascript
let number = 0;

let addNumbers = (x, y) => x + y;
```

Instead of relying on an outside variable, we make both numbers variables that we pass in. This keeps all the function's variables in its own scope, and the same inputs give the same results.

```javascript
addNumbers(number, 5); // 5
addNumbers(number, 5); // 5 (which is 5)!
```

FJS uses pure functions since they're like angels. Angels are good and mutants are bad. Don't let the mutants win. Use pure functions.

## Be Declarative, not Imperative

I've had a hard time understanding the difference between declarative and imperative programming for the longest time. Before anything else, know that **declarative and imperative programming are both valid approaches with their own ups and downs.** Functional programming just favors being declarative.

As for the specifics, let's imagine two different beings again. This time it'll be a southern belle and a stable boy. We ask both of them to fetch us a bucket of milk and give them an empty bucket for the job.

The southern belle is haughty and hates getting her hands dirty. She handles this task by summoning her servant and saying "I _do declare_, if there is a cow outside, bring me a bucket of milk with a bucket like this!" The servant bows, examines the bucket, leaves, and returns with a bucket of milk. It's in a different bucket that looks identical to the one we gave her. The southern belle takes the milk and hands it to us.

The stable boy enjoys getting his hands dirty. He handles this task by taking the bucket, going to the barn, finding a cow, and going through all the motions to milk it. He chooses the right cow, milks the cow, fills our bucket with the milk, and carries it back to us himself.

Both people got us the bucket of milk, albeit in very different ways. The southern belle wasn't involved in the actual steps to get the milk, she focused on _what_ she needed and used her servant to get it. Meanwhile, the stable boy focused on _how_ to get the milk and went through all the steps.

At its core, that's the difference between declarative and imperative programming. **Declarative programming solves a problem based on what it needs, and avoids direct DOM or variable manipulation.** This is a good fit for pure functions since they're about giving you new data and objects to avoid mutating state. Meanwhile, imperative programming changes the DOM and manipulates state, but in a more focused way that gives better control when done right.

For a good reminder on all this with some code examples, I simply refer you to this tweet!

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">I can’t be the only one always getting the concepts of Imperative and Declarative programming confused... right? 🙏✨⚛️🎀 <a href="https://twitter.com/hashtag/lolsobjs?src=hash&amp;ref_src=twsrc%5Etfw">#lolsobjs</a> <a href="https://twitter.com/hashtag/CodeNewbie?src=hash&amp;ref_src=twsrc%5Etfw">#CodeNewbie</a> <a href="https://twitter.com/hashtag/learntocode?src=hash&amp;ref_src=twsrc%5Etfw">#learntocode</a> <a href="https://t.co/ucgQ6iBaUG">pic.twitter.com/ucgQ6iBaUG</a></p>&mdash; LOLSOB.js (@lolsobjs) <a href="https://twitter.com/lolsobjs/status/1140697401155575810?ref_src=twsrc%5Etfw">June 17, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

When you're not writing JavaScript to manipulate DOMs, I've approached declarative programming **by declaring new variables instead of mutating existing ones.**

For example, let's say you had to write a function that doubled all numbers in an array. An imperative approach would manipulate the given array directly and redefine each item.

```javascript
const doubleArray = array => {
  for (i = 0; i < array.length; i++) {
    array[i] += array[i];
  }

  return array;
}
```

This is the code equivalent of the stable boy taking the array, doubling each item in it, and giving you a mutated version of the array. The declarative version looks quite different.

```javascript
const doubleArray = array => array.map(item => item * 2);
```

This declarative version gives the work to another function, in this case, `map`, which already has built-in logic to go through each item (we'll cover this in a bit). This returns an array separate from the original and the first array isn't mutated, making this a pure function! As a result, this function is simpler, cleaner, safer to use, and much more in line with FJS.

The southern belle is simply _declaring_ she wants an array with double the values, and her servant (`map`) is returning a different array to meet her request.

## Use the Right FJS Tools

Okay, enough metaphors. Let's get into the nitty-gritty-codey ways to write FJS. First let's cover some of the tools you'll be using the most to write your pure, imperative functions.

### Arrow functions

Arrow functions were added with ES6 and their main benefit is a shorter, sweeter function syntax. FJS means writing lots of functions, so we might as well make it easier.

Before arrow functions, a basic "add five to a number" function would look like this.

```javascript
const addFive = function(number) {
  return number + 5;
}
```

Simple functions like this can be written without the `function` keyword or the explicit return.

```javascript
const addFive = number => number + 5;
```

The variable first identifies the arguments, in this case `number`. You could also use parenthesis for no arguments, like with `()`, or for multiple arguments, like with `(number1, number2)`.

After that is the arrow, shown as `=>`. Whatever expression follows is automatically returned, in this case, that's `number` with five added.

More complex functions can use braces for extra lines, but you'll lose the implicit `return` and need to write it out. Not as good, but still better than the first syntax.

```javascript
const addFive = number => {
  // more code here
  return number + 5;
};
```

### Array Prototype Methods

Each array has several powerful tools built into them that'll cover most, if not all, of your FJS needs. Calling them returns new, modified arrays you can easily assign to new variables. They're similar to the southern belle's servant from the declarative metaphor - they're already there, do the work for you, and give you new objects based on what you started with.

Let's start with one of the most basic methods, `map`. It takes each item in an array, runs it through a function to get a new value, and replaces the old value with this new one. Once it does that for each item, it returns a newly updated array.

Here's a tweaked example of the declarative code example from before, but using `map` to double array values.

```javascript
[2, 4, 6].map(item => item * 2);
// [4, 8, 12]
```

You're basically using `map` to pull out each array object as `item` and say "Replace this `item` with `item * 2`."

You could also write the doubling function separately to make the code even more functional. Plus you can assign what `map` returns to an entirely different variable.

```javascript
const double       = (item) => item * 2,
      array        = [2, 4, 6],
      doubledArray = array.map(double);

console.log(array);        // [2, 4, 6]
console.log(doubledArray); // [4, 8, 12]
// The original array hasn't been mutated!
```

There are many great methods to learn, and covering them all is another post altogether. [Check out my study repo for a quick look at different array prototype methods](/exocortex/javascript/ArrayMethods.html), or just google around for them!

#### Bonus: Chain Array Prototype Methods

One more fun fact you should know: array methods can be chained together! This lets you combine different array changes quickly and without breaking FJS rules.

Let's say we wanted to double each array value, then filter out the ones lower than five (`filter` is another useful method to learn later). We just need to write one extra function and add another method to our array.

```javascript
const double         = (item) => item * 2,
      higherThanFive = (item) => item > 5,
      array          = [2, 4, 6],
      doubledArray   = array.map(double).filter(higherThanFive);

console.log(array);        // [2, 4, 6]
console.log(doubledArray); // [8, 12]
```

Lastly, many people (like myself) often use different spacing when chaining to keep it readable. The below variable is the same as the above but easier to understand at a glance.

```javascript
doubledArray   = array
                  .map(double)
                  .filter(higherThanFive);
```

### Remember Reduce

`reduce` is a prototype method I want to highlight since it's arguably the most powerful. On its own, it can recreate almost any other prototype method and can make more complex and powerful ones. Reduce is another blog post too, so once again [I refer you to my study notebook (or Google) to quickly learn more about `reduce`](/exocortex/javascript/ReduceFunction.html). Just remember these important facts:

1. Reduce is great for complex merging or manipulation of data, as long as you make sure another prototype method doesn't already do what you need.
2. Everything about other prototype methods, such as chaining and passing in functions, applies to reduce.

`reduce` is one of your most powerful FJS tools, so learn it well.

## Higher-order functions

Now that we have these new ways to write functions, next is new ways to manage them. One of the best methods for FJS is making use of higher-order functions, of HOFs. Several code examples so far have made use of HOFs, but having a clearer definition of it helps with making full use of it.

HOFs are functions that take other functions as arguments. Remember that functions are first-class citizens in the JavaScript kingdom, so they can be:

* Saved to variables
* Passed to other functions
* Returned from other functions

I wish I'd learned to make use of HOFs earlier in my career. It helped me write more functions that abstracted logic away to make programs more readable and maintainable. So getting into the mindset of "functions passing around functions" is great for FJS, but also better JavaScript in general.

Let's say I needed to test if many numbers were divisible by a group of other numbers. One's first instinct may be to write each function out like this.

```javascript
const divisibleby3 = (n) => n % 3 === 0,
      divisibleby5 = (n) => n % 5 === 0,
      divisibleby7 = (n) => n % 7 === 0;

divisibleBy3(6);  // true
divisibleBy5(14); // false
divisibleBy7(28); // false
```

This works, but you have to repeat the same expressions over and over. A solution using HOFs would look like this and get the same results.

```javascript
const divideBy = (x) => (y) => y % x === 0;

const divisibleBy3 = divideBy(3),
      divisibleBy5 = divideBy(5),
      divisibleBy7 = divideBy(7);

divisibleBy3(6);  // true
divisibleBy5(14); // false
divisibleBy7(28); // true
```

This is complicated, so let's break it down.

1. The `divideBy` function takes one argument, `x`, and saves it while _returning another function_. So when we call `divideBy(3)`, we're saving `x` as part of the function being returned every time.
2. We can _save this function to a variable_, such as `divisibleBy3`. This makes sense since we've already made `3` part of the function returned each time.
3. Since `divideBy` returns a function, we can now call `divisibleBy3` like a normal function. It uses both the `y` variable it gets at the call, and the `x` variable it got before.

All this is an example of "currying" functions or **functions that return other functions until they eventually give final functions** like `divisibleBy3`. As you can see, currying in JavaScript has many examples of HOFs in use. Currying is great if you have functions with some, but not all, of their logic in common. You can create a template with the logic they have in common (a comparison operator) and pass in logic specific to each one (the number used in the operation).

If you don't want to save the first part of a curried function to a variable, you can use the shortcut of calling multiple arguments at the same time.

```javascript
const divideBy = (x) => (y) => y % x === 0;

divideBy(3)(6);  // true
divideBy(5)(14); // false
divideBy(7)(28); // true
```

As you can see, curried functions help your code whether you use them once or dozens of times in your program!

Curried functions are also tough to understand, so [I have another note that better breaks currying down if you need it](/exocortex/javascript/Currying.html#what-is-currying).

Here's another example of HOFs that takes a function as the `fn` argument. The function accepting it refers to it like any other variable.

```javascript
const performMultipleTimes = (times, x, fn) => {
  for (let i = 0; i < times; i++) {
    fn(x);
  }
}
```

This function takes three arguments:

1. The number of times to repeat the loop
2. The argument passed into the `fn` function
3. The `fn` function

The function is being called inside the loop, so `performMultipleTimes` lets us call a function many times while only writing it once. All we need to do is _pass one function another function_, which we can do by _storing the function in a variable._ HOFs at work once again!

```javascript
const logString = s => console.log(s);

performMultipleTimes(3, 'Greetings!', logString);
// Greetings!
// Greetings!
// Greetings!
```

If you don't use this function anywhere else and don't want to save it for later, you can also pass it directly. You can do this with or without the bracket syntax.

```javascript
performMultipleTimes(3, 'Greetings!', (s) => console.log(s));

performMultipleTimes(3, 'Greetings!', (s) => {
  const newString = `I am here to say '${s}'`;
  console.log(newString);
});
```

Understanding HOFs is great but is especially for FJS. This style is about focusing on the power of functions, and passing functions around effectively can multiply their power and modularity.

However, this was hard to grasp for me and it might be the same for you. So if you (understandably) still have trouble, [this chapter from Eloquent JavaScript does a great job breaking HOFs down further](https://eloquentjavascript.net/05_higher_order.html).

## FJS is a Style, not an Absolute

A final note on FJS: it's a style of writing JavaScript that exists on a spectrum. It isn't simply "this is or is not FJS." **You can write code with elements of FJS (like pure functions or being declarative) without needing to follow the rules. Each is a preference that, as they're put together, make your JavaScript closer to the functional paradigm.**

FJS can be tough to grasp, as you can tell by the number of links I reference for extra reading. But understanding these four topics will help you build a solid foundation for learning more. This is what holds true for me since they made everything click into place for every other article I read on FJS. Hopefully, this post can do the same for anyone else looking to learn and use it.

_If you really want to go deeper into FJS, I recommend [Kyle Simpson's book "Functional-Light JS."](https://github.com/getify/Functional-Light-JS) It goes into much deeper detail on functional programming and JavaScript, and you can read it for free on Github!_
