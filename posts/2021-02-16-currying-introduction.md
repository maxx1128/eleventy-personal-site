---
title: "The Currying Introduction I Wish I Had"
date: "2021-02-16"
excerpt: "Currying is a tricky yet major of JavaScript and functional programming. Sadly, it doesn't involve eating actual curry."
image: "currying-introduction.jpg"
tags: ["javascript", "Intros I Wish I Had"]
featured_image_link: https://safebooru.org/index.php?page=post&s=view&id=3159174
---

Currying is one of those JavaScript words I heard many times before I understood it. That's part of why I put in the time to figure it out. The other reason is it's fun to say.

But for anyone reading this who wants to understand for non-just-fun-to-say reasons, I hope you find this post useful. This is the explanation I wished I read as I was learning the basics of JavaScript.

If you wanted to read about the best curry recipes for Pokemon Sword and Shield, I can't help you there. All I can say is Spicy Sausage Curry always wins and you have to accept that.

## The Problem Currying Solves

Most JavaScript functions operate predictably:

1. Put in one or more arguments
2. Let the function do some stuff with those values
3. The function returns a value.
4. ALL HAIL THE MIGHTY GLOW CLOUD.

A basic ES6 function to multiply two values would look like this:

```javascript
const multiply = (x, y) => x * y;
multiply(5, 10); // 50
```

But suppose I needed lots of multiplication operations that were not quite the same. For example, there were groups where one number is always the same.

```javascript
multiply(3, 6);
multiply(3, 8);
multiply(3, 22); // All multiply by 3

multiply(5, 2);
multiply(5, 9);
multiply(5, 34); // All multiply by 5

multiply(7, 4);
multiply(7, 12);
multiply(7, 999); // All multiply by 7
```

This works, but it’s repetitive, not too elegant, and easier to mess up (especially by folks like me). This can get unmaintainable fast as the codebase scales up.

This is where currying helps. I touched on currying almost [two years ago when writing about functional programming](https://www.maxwellantonucci.com/posts/2019/06/25/metaphorical-intro-functional-js/). But want to go into more detail here.

## So What is Currying?

In a nutshell, currying is making a sequence of nested functions. But that wasn't clear to me at first, so here's the definition outside a nutshell.

Sometimes I may need to call several functions to get what I want, one after the other. Or like the above example, write one function with the same arguments. But imagine writing those functions and arguments in the same order over and over until my mind snaps again. Nobody wants this, especially the guy who has to fix my floorboards.

**Currying lets me nest those functions inside each other. Then I only need to call one, and the function calls the rest in the proper order for me.** Time, energy, and sanity are saved.

It took a while for this to click for me. If I asked the JavaScript language to explain how this would with the above examples, I imagine it'd go like this.

### A Conversation with JavaScript about Currying

**Coder:** Look at all these multiplication functions. I could you all the arguments at once, but that's repetitive here, right? Instead, can you remember some of the arguments for me? That way when I call `multiply`, you can take the different argument.

**JavaScript:** I would remember the number three...so it'd look like this?

```javascript
const multiply = x => x * 3;
```

**Coder:** That would work...but I also want you to remember functions for the other common multipliers: five and seven.

**JavaScript:** So write those functions out too. You'll need to give them different names.

```javascript
const multiplyBy3 = x => x * 3;
const multiplyBy5 = x => x * 5;
const multiplyBy7 = x => x * 7;
```

**Coder:** That’s the result I want, but rewriting that multiplication logic feels wasteful. I want to generate different versions of that function without rewriting so much.

**JavaScript:** Hey, you’re the programmer, not me. You’re supposed to figure this stuff out.

**Coder:** Hmm..._could I a function that would make the multiplying function for me?_ The first function is where I pass in the number I always want to multiply by. Does that one return the function that can multiply by this number?

**JavaScript:** Sure, it can do that! That’ll look like this:

```javascript
const multiplyCurrier = y => x => x * y;

const multiplyBy3 = multiplyCurrier(3);
// This is a function that multiplies the argument by three
multiplyBy3(5); // 3 * 5 = 15

const multiplyBy5 = multiplyCurrier(5);
multiplyBy5(5); // 25

const multiplyBy7 = multiplyCurrier(7);
multiplyBy7(5); // 35
```

**JavaScript:** Don’t forget that in this language we have "first-class functions." **You can use functions as arguments, and you can have them return other functions. Here, I'm breaking a function down into a sequence of functions that each takes one argument.** You can pass in each argument to construct lots of different functions with less work.

**Coder:** Hooray! This looks good and I'm fulfilled at long last!

### Call Many Arguments at Once

Currying just helped me make a bunch of multiplication functions with little repetition. I can also make more if I need to. But we can stretch currying's abilities further.

The above example goes two functions deep, and I only call one at a time. But I could call that `multipleCurrier` function with both arguments at once if I wanted to.

```javascript
const multiplyCurrier = y => x => x * y;
multiplyCurrier(3)(5); // 15
```

This lets me multiply two numbers without making a new function.

It also lets me get more ambitious with what kinds of functions I can make. Let's say I have a function that lets me get substrings and goes three levels deep.

```javascript
const curriedSubstring = start => length => string =>  string.substr(start, length);
```

The arguments each function in this sequence takes are:

1. The substring's starting index
2. The substrings ending index
3. The string to pull the substring from

Once it gets all these arguments, it returns the substring. So if I wanted to get a string's first character, I could call them all at once.

```javascript
curriedSubstring(0)(1)('potatoes'); // 'p'
```

But I can also save the first two levels into a separate function, and use it on its own like this.

```javascript
const getFirstChar = string => curriedSubstring(0)(1)(string);
//  Note that I need to include "string" as an argument and pass it to "curriedSubstring"

getFirstChar('potatoes'); // 'p'
getFirstChar('white rice'); // 'w'
getFirstChar('sausages'); // 's'
```

Or I could stop at the first level, and make a function to get different numbers of starting characters.

```javascript
const getStartingChars = length => string => curriedSubstring(0)(length)(string);
getStartingChars(3)('potatoes'); // 'pot'
getStartingChars(5)('white rice'); // 'white'
getStartingChars(7)('sausages'); // 'sausage'
```

These all show how I can tap into this sequence of functions at different points into new functions. This lets me extend the code while only writing the underlying logic and arguments once.

## Enjoy Your Curry...ing

I hope you found this post useful and watch for times you can break out the currying! Anytime there are many functions with shared logic or arguments, that's often a good sign. Even for things as simple as multiplication or getting substrings.

Plus I'll say it again, "currying" is just fun to say. Understanding it gives us more reason to use it in conversation. I know this, you know this, the world knows this. I know I'm not the only one who learned it mainly for this reason. No one else has admitted it yet.

_Ahem_, regardless, [happy currying](https://safebooru.org/index.php?page=post&s=view&id=3090199)!

<img alt="A trainer and several pokemon gathering around a freshly-made pot of curry." class="post-content--partial-bleed" src="/assets/images/posts/currying-introduction/pokemon-curry.jpeg" />
