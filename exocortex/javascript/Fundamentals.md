---
title: Fundamentals
category: Javascript
resources:
  - name: Understanding the JavaScript Call Stack
    url: https://medium.freecodecamp.org/understanding-the-javascript-call-stack-861e41ae61d4
  - name: Eloquent JavaScript
    url: http://eloquentjavascript.net/
  - name: JavaScript — Double Equals vs. Triple Equals
    url: https://codeburst.io/javascript-double-equals-vs-triple-equals-61d4ce5a121a
  - name: JavaScript Scopes and Closures
    url: https://css-tricks.com/javascript-scope-closures/
  - name: The battle between function scope and block scope
    url: http://www.deadcoderising.com/2017-04-11-es6-var-let-and-const-the-battle-between-function-scope-and-block-scope/
  - name: Explaining Value vs. Reference in Javascript
    url: https://codeburst.io/explaining-value-vs-reference-in-javascript-647a975e12a0
  - name: JS Hoisting
    url: https://www.w3schools.com/js/js_hoisting.asp
  - name: Understanding Hoisting in JavaScript
    url: https://scotch.io/tutorials/understanding-hoisting-in-javascript
  - name: An Introduction to IIFEs - Immediately Invoked Function Expressions
    url: http://adripofjavascript.com/blog/drips/an-introduction-to-iffes-immediately-invoked-function-expressions.html
  - name: IIFE
    url: https://developer.mozilla.org/en-US/docs/Glossary/IIFE
  - name: JavaScript Fundamentals before learning React
    url: https://www.robinwieruch.de/javascript-fundamentals-react-requirements/#react-javascript
  - name: Functional JS Light
    url: https://github.com/getify/Functional-Light-JS
  - name: "Understanding JavaScript: This Keyword"
    url: https://hackernoon.com/understanding-javascript-the-this-keyword-4de325d77f68
  - name: Understanding the “this” Keyword in JavaScript
    url: https://medium.com/quick-code/understanding-the-this-keyword-in-javascript-cb76d4c7c5e8
  - name: What is `this`? The Inner Workings of JavaScript Objects
    url: https://medium.com/javascript-scene/what-is-this-the-inner-workings-of-javascript-objects-d397bfa0708a?pix=9_0_0
date: 2020-06-08
---

## Call Stack

The call ctack is the basic data structure JavaScript uses to execute, or call, a code's functions. Whenever JavaScript code is executed (or called), the call stack controls the method and order behind this execution. That's why understanding the call stack is essential to see how JavaScript runs, since not understanding it can lead to unexpected errors or code called in the wrong order.

Some key traits of the call stack:

* **The call stack is synchronous.** Functions are called one at a time, from the start to the end, simple as that. JavaScript allows for asynchronous programming, but only by borrowing this functionality from elsewhere (the Browser API). JavaScript itself is synchronous and can only borrow asynchronous functionality from elsewhere.
* **The call stack is Last In, First Out.** Function calls are added to the top of a "pile," and whatever's on top of the pile is always called before what's below it can be called next. It's similar to stacking dishes - the last one you put on the pile is the first one you use later on.
* **A stack overflow is when the call stack limit is exceeded.** Recursive functions (functions that call themselves) can trigger a stack overflow when there's no end coded into it. Whatever's running this code will ultimately crash.

## Data Types

All data in computers can be reduced to bits, positive/negative charges expressed as ones and zeros.

In JavaScript, groups of bits are represented as _values._ You create them by simply invoking their name. There's several types:

* **Numbers,** which can be whole, negative, and decimal values. Their main benefit is using arithmetic operations to calculate new numbers.
    - The _remainder_ operator returns the leftover value after division. `314 % 100` returns `14`, and `100 % 10` returns `0`.
    - `NaN` is returned after any operation that doesn't return a real result. `0 / 0` will return `NaN`, as well as `Infinity - Infinity`.
* **Strings** are basic text enclosed by matching quotes.
    - Quotes or other special characters inside a string need to be _escaped_ with a backslash.
        + Quotes: `"\'It is a dangerous journey,\' the main said."`
        + New Lines: `"This is the first line\nAnd this is the second"`
        + String with backticks can include functions or operations, if they're enclosed in a `${}` wrapper.
* **Unary Operators** are symbols written as words
    - `typeof` tells you a value's type, so `typeof 4.5` returns `number`.
* **Boolean** values are simply true or false
    - You can use _comparison values_ that return boolean values, such as `3 > 2` returning `true`.
    - Logical operators such as `&&` and `||` also return boolean values.
    - The _negative_ operator flips an integer, so `- 5` returns `-5`.
    - The _not_ operator flips the boolean value on it, so `!true` returns `false`.
    - Ternary operators evaluate an expression and can return different values if it's `true` or `false`. So `true ? 1 : 2` returns `1`, but if it was false it would return `2`.
* **Empty Values** show a lack of meaningful values or info. If a value must be returned but none is produced, you get an empty value.
    - These can be either `null` or `undefined`, and they're mostly the same.

**Type Coercion** is when operators are applied to the wrong value types and quickly convert the value to what is needed, such as converting `"5"` from a string to `5` as an integer. To test for any unexpected type conversions or missing values, use the `===` and `!==` comparison operators.

## Equal Signs

`===` comparisons looks for **strict equality,** meaning it looks for matching "type" and "value".

* `55 === 55` returns `true`
* `55 === '55'` returns `false` (Same values, different types)

`==` comparisons look for **loose equality,** meaning it only looks for matching value. It can perform "type coercion" if needed, which converts the both values to the same type before comparing values.

* `55 == 55` returns `true`
* `55 == '55'` returns `true` (Different types, but it converts both values to the same type before comparing them, which makes it true)

This distinction is important since loose equality can lead to unexpected bugs related to conditions returning true when they may need to be false. It's better practice to always use `===` for comparisons.

## Scopes

Scope refers to the specific area a code of JavaScript has "access" to. If two sections of JS code are in the same scope, then they can access each other - different scope means they can't.

There's several types of scopes to know:

* **Global Scope** - Global scope refers to code can be accessed anywhere else, even separate functions. Global scope should be avoided as much as possible, since it greatly increases the risk of code "leaking out" to unexpected areas with unexpected (and often bad) results.
* **Function Scope** - Function scope refers to code that can only be accessed in a specific function. Variables declared in a function can only be accessed from within that function. Trying to call these variables from the global scope will result in an `undefined` error.
* **Block Scope** - Block scope was formally introduced with ES6, and refers to code only in certain operation "blocks," like `if` statements or for loops. Block scope variables must be declared with `let` or `const`.

This is generally easy to understand, but can get confusing when you use `var`, which isn't block-scoped. Declaring a variable in the global scope, and declaring another with the same name in a block, will override the global variable since there's no block scope.

```javascript
var myName = "Earl";

if (2 === 2) {
  var myName = "Crystal Soul-Eater";
}

console.log(myName); // "Crystal Soul-Eater"
```

If we used `let` instead of `var`, the second declaration would be block-scoped and not overwrite the global one. The `console.log` would then return `"Earl"`.

## Switch Statements

Large amounts of conditionals can often be awkward for `if` statements. The `switch` statement will often work better

```javascript
switch (variable_here) {
    case (10):
        console.log("It's ten!");
        break;
    case (5):
        console.log("It's five!");
    case (2):
        console.log("It's two!");
    default:
        console.log("What is this number...?");
        break;
}
```

Note that you don't need to include `break` in every case, which executes the code but then keeps going.

## Value and Reference Types

For data stored in different variables, JavaScript stores this data in two different ways: **value and reference**.

* **Value** means the data stored is a value separate from all other ones. It has much less risk of inadvertently changing other values. Data types stored by value are the simpler ones, which include:
  * Booleans - true or false
  * Strings - groups of text characters
  * Numbers - integers
  * undefined - for vars without a value
  * null - intentional absence of any value
* **Reference** means the data stored is looking to another place in memory to find the needed values. Copying data stored by reference isn't passing on a direct copy of the data, it's passing the reference to that data. That means changing one copy will change the reference, and thereby change everything using that same reference. Data types stored by reference are:
  * Objects
  * Arrays
  * Functions

Data types with values are also called **Primitive Data Types.** Data types with references are technically all **Objects**, although they're still often referred by their specific names. They're basically the same thing and can be called either one, but Primitives and Objects are common and simpler ways to name them.

### Changing Data

A basic example of how Primitives work is below. When assigning variables with values to other variables, you can change each independently of each other.

```javascript
let number = 42;
let anotherNumber = number;

number = 55;

console.log(number);        // 55, has changed
console.log(anotherNumber); // 42, has not changed
```

This independence doesn't hold true for Objects. They both reference the same array, so changing one array winds up changing both of them.

```javascript
let array = [1, 2, 3, 4];
let secondArray = array;

array.push(5);

console.log(array);
// [1, 2, 3, 4, 5]
// Changed, as expected

console.log(secondArray);
// [1, 2, 3, 4, 5]
// Also changed since it uses the same references
```

Note this also applies when passing Objects into functions. Using code directly on the variable passed in will affect the reference. A way around this is to assign values to a new Object, using the values from the passed object to calculate them when needed. This will create a new object with its own reference, which keeps the two objects from interfering with each other.

## Hoisting

### Hoisting with ES5

`var` declarations and value assignments can be placed anywhere on a page. However, the variable declarations are "hoisted" automatically to the top of the page.

When you do a typical `var` declaration and assignment like this:

```javascript
console.log('Foo bar!');
var y = 5;
```

The code will move the actual declaration to the top, which is the "hoist."

```javascript
var y;
console.log('Foo bar!');
y = 5;
```

Because of this, you could technically call on the variable before it's declared when you wrote. So this:

```javascript
console.log(y);
var y = 5;
```

Translates to this, which will put `undefined` in the console instead of a code error.

```javascript
var y;
console.log(y);
y = 5;
```

Hoisting also means `var` doesn't necessarily need to be declared when assigning a value, since it will be declared when it's hoisted. A computer reading this:

```javascript
y = 5;
```

This will change to this once it gets hoisted:

```javascript
var y;
y = 5;
```

This is why the first code sample, although it looks invalid, actually becomes valid when it becomes the second version. This isn't necessarily a good thing, since it can create unexpected complexity or bugs in the code.

This adds up to hoisting often causing bugs, or making bugs harder to find. Make it a habit of always declaring variables before use to avoid hoisting causing any unintended bugs.

### Hoisting in ES6

Avoiding this is easier with ES6, since the new variable declarations `let` and `const` are hoisted differently. Technically hoisting still takes place, but instead of returning `undefined` they return a reference error. Therefore even though they support hoisting, using them before their declaration causes more errors and therefore avoiding this is better enforced in the code.

### Hoisting Scope

ES5 variables are only hoisted up based on, and limited to, global and function scope. ES6 variables also hoist within block scope, which is another good reason to use them.

## IIFEs

Immediately Invoked Function Expressions (IIFEs) are simply anonymous functions that are called right after they're defined. They're written the same as regular functions but

* Are wrapped in a pair of parenthesis
* Have parenthesis added to the very end

```javascript
(function() {
  // Function fun here
});
```

IIFEs let you invoke any needed logic or actions right away without calling a named function or variable. This is helpful since it:

* Is more easily read as something to execute right away and no where else, for example as "setup" to the rest of the program.
* The function's contents are scoped to within the function, preventing additions to the global namespace and name collisions.
* Making the function anonymous also prevents global namespace pollution.

### Creating Variables

IIFEs can be useful if complex logic must be saved to a variable, since all that logic can be written into the function and be scoped.

```javascript
const birthdayStatement = (function() {
  const name = "Maxwell",
        birthYear = 2019 - 24;

  return `${name} was born in ${birthYear}`;
})();

console.log(birthdayStatement);
// "Maxwell was born in 1995
```

You can also pass arguments to IIFEs if needed. The way they're passed in is tricky though, since:

* The outside arguments are added to the final set of parenthesis.
* The IFFE's parameters must also be named in the function call, and can have a different name if needed.

```javascript
const globalPerson = {
  name: 'Maxwell',
  birthYear: 1995
};

const ageStatement = (function (person) {
    const name = person.name,
          age = 2019 - person.birthYear;

    return `${name} is ${age} years old`;
})(globalPerson);

console.log(ageStatement);
// "Maxwell is 24 years old"
```

## Functions

Functions are the core of Javascript, allowing coders to wrap larger functionalities inside different values. This reduces repetition and makes it easier to manage complexity.

Functions begin with the keyword `function`, followed by any `parameters` (may have multiple or none) and then the `body` with the statements the function executes. The traditional syntax always requires curly braces around the body (ES6 rules have exceptions). Two examples of different functions the book gives are below, showing some variety in parameters and complexity. Note that the first doesn't return a value (would give `undefined`) while the second does (using `return`).

```javascript
const makeNoise = function() {
  console.log("Pling!");
};

makeNoise();
// → Pling!

const power = function(base, exponent) {
  let result = 1;
  for (let count = 0; count < exponent; count++) {
    result *= base;
  }
  return result;
};

console.log(power(2, 10));
// → 1024
```

* **Parameters** are used in the body like regular values, but are only supplied when the function is called.
* Each function has its own local **scope** when called. Variables declared inside a function can only be referenced inside the function, and not after. It's basically its own little world, where it can reference global values if needed (not recommended) but nothing outside the function can reference it.

### Arrow Functions

Arrow functions are the new ES6 syntax for JavaScript functions. They're great for keeping your JS concise, especially for simpler functions. The big difference is they don't need the `function` keyword to set them up, instead using an `=>` icon.

#### Arrow Function With Body

These are more similar to ES5 functions, since it gives you multiple lines and must implicitly return a value.

```javascript
const arrowFunction = () => {
  return 'This is a string being returned!';
}
```

#### Arrow Function Without Body

Without the body, arrow functions are limited to one line and implicitly return what's there. Great for simpler code so it's easier to read.

```javascript
// Parenthesis are either blank or hold parameters
const arrowFunction = () => 'This is a string being returned!';
const doubleNumber = (n) => n * 2;

// Can break the line for neater syntax
const arrowFunction = () =>
  'This is a string being returned!';
```

#### Return Functions in Functions

Functions can work with more than just straight values, they can take and return other functions too! If you're writing code that's similar in many ways but will need to call different functions at times, you can pass in functions as arguments. This can exponentially increase a function's power and flexibility.

Below is a simple example:

```javascript
function formatter(formatFn) {
  return function inner(str){
    return formatFn( str );
  };
}
```

There's three functions to look at here:

* `formatter` is the outermost function, and the one that'll actually need to be called. It takes `formatFn` as an argument, which will be a separate function defined later.
* `inner` is a function defined inside this one, and is automatically called. If you store `formatter` in a variable and then call it, this is the function that will actually be called. It has `str` as its parameter.
* `formatFn` is the parameter that `formatter` needs, and is called in the smallest scope of this function. It's the one the coder will need to define separate, and will be called in saved instances of the `formatter` function.

It looks convoluted, but the basic use of this function is to **take functions built on formatting text, save them, and use them in a specific way later on.**

As an example, let's say we had a function that uppercases the first letter of a string.

```javascript
const upperFirst = (string) => `${string[0].toUpperCase()}${string.substr( 1 ).toLowerCase()}`;
```

We could pass this function into `formatter` and then call it later. We can also adjust `formatter` to better show the control it gives us.

```javascript
const formatter = (formatFn) => {
  return function inner(str){
    console.log(`Your returned string is "${formatFn( str )}."`);
  };
}

const upperFirst = (string) => string[0].toUpperCase() + string.substr( 1 ).toLowerCase();

logUpperFirst = formatter(upperFirst);

logUpperFirst( "hello" );
// logs 'Your returned string is "Hello."' in the console
```

We can use `formatter` for any number of other ways to change strings - all lowercase, reversing them, working them into a paragraph, etc. We can write the function completely separate and pass it in, keeping the code decoupled and flexible.

Note that you don't need to define your functions in a variable before passing them them, you can define them in the argument itself. The end result is the same, so it's a matter of preference.

```javascript
const logLower = formatter( function formatting(string){
    return string.toLowerCase();
} );
```

## Recursion

Recursions are functions that call themselves. They can be helpful since they can keep code dry, since you only write code once but can execute it as many times as needed. However recursive functions that have no end will cause a stack overflow (see Call Stack), so be sure they're used properly.

Take this example function that finds a number's factorial. This multiplies a number by every number lower than it until it returns the total product. So the factorial of `5` would be `5 * 4 * 3 * 2 * 1`.

```javascript
const factorial = (n) => (n < 2) ? 1 : n * factorial(n - 1);
```

Running `factorial(5)` leads to the following recursive function calls:

```javascript
factorial(5) = 5 * factorial(4)
factorial(5) = 5 * 4 * factorial(3)
factorial(5) = 5 * 4 * 3 * factorial(2)
factorial(5) = 5 * 4 * 3 * 2 * factorial(1)
factorial(5) = 5 * 4 * 3 * 2 * 1
factorial(5) = 120
```

The part of the function with `(n < 2) ? 1` is crucial, since it's what stops the function from returning itself. Once the number gets down to `1`, it simply returns that without calling itself, stopping the loop. Without it, the function would simply look like this:

```javascript
const factorial = (n) => n * factorial(n - 1);
```

And would be played out this way instead:

```javascript
factorial(5) = 5 * factorial(4)
factorial(5) = 5 * 4 * factorial(3)
factorial(5) = 5 * 4 * 3 * factorial(2)
factorial(5) = 5 * 4 * 3 * 2 * factorial(1)
factorial(5) = 5 * 4 * 3 * 2 * 1 * factorial(0)
factorial(5) = 5 * 4 * 3 * 2 * 1 * 0 * factorial(-1)
factorial(5) = 5 * 4 * 3 * 2 * 1 * 0 * -1 * factorial(-2)
factorial(5) = 5 * 4 * 3 * 2 * 1 * 0 * -1 * -2 * factorial(-3)
// Adding more negative numbers into infinity
```

Even though the result would have to be `0` since the result is being multipled by zero, the important thing is nothing's telling this function to stop calling itself. It will keep doing so until something in the code tells it through, and since nothing will, it simply goes into it creates a stack overflow.

## Async/Await

Async/Await functions are simple, effective methods for asynchronous JavaScript. They're essentially functions that will do two additional things things:

* Know when to pause when waiting for data outside of JavaScript's single-threaded system
* Will return a promise that resolves when the function is complete

An async/await function has a basic structure like this:

```javascript
async function myAsyncFunction() {
  let value = await promise;
  return value;
}

const asyncValue = myAsyncFunction;

asyncValue.then( function(value) {
  console.log(value)
})
```

This function will do the following:

1. It will immediately run, but pause and wait at the `await` line while the promise resolves
2. Once the promise resolves, it will continue until the function completes or there's another `await`.
3. When the function is assigned to `asyncValue`, the variable's value will be an unresolved promise.
4. When the variable's promise resolves, you can treat it like any other resolved promise. In this case, it uses `.then` to take the returned value when completed and log it.

## Expressions and Statements

Expressions and statements are used in virtually all parts of JavaScript code, so understanding the differences and what they do helps greatly in avoiding common mistakes. In simplest terms:

* **Expressions** return values
* **Statements** perform actions

A JavaScript file could have dozens of expressions that create different values, but won't actually do anything without statements to use them in. Expressions will give you different numbers, statements will add them together and return the solution at the end.

### Types of Expressions

#### Arithmetic

These return integer values. These can be integers on their own, or calculations that return the result of them in the end.

```javascript
20       // 20
20 * 5   // 100
```

#### String

These return strings. They can be strings on their own or concatenated strings.

#### Logical

Logical expressions compare two values in some way, and the result of this comparison returns a boolean.

```javascript
100 === 100             // true
100 < 100               // false
true && false           // false
true || false           // true
(10 === 10) && (9 > 8)  // true
```

#### Primary

These are simple standalone values, also known as literal values. Just using `15` or `'I am a string'` are both primary expressions.

#### Assignment

These use the `=` operator to assign values to variables. This doesn't include `var`, `let`, or `const` if they're being used, and would only be somelike like `total = 123`. Even with `const total = 123`, only `total = 123` would be the assignment expression.

### Types of Statements

#### Declaration

These create variables and functions, respectively.

```javascript
const number;

function logSeven() {
  console.log(7);
}
```

#### Expression

These are statements that have expressions substituted inside them. Expression statements will resolve their expressions, and then carry out the statement accordingly.

```javascript
const number = (5 + 5);
// The resolved expression in this expression statement translates to the below statement
const number = 10;
```

These are useful for statements that rely on changing or more volative values, by writing the expression in a flexible way.

#### Conditional

These run statements based on different expressions. If the expression resolves to a truthy value, the statement is executed. For an `if..else` statement, another statement will be run even if the expression is falsey.

```javascript
if (true && true) {
  // Statement here is run since above expression is true
}

if (true && false) {
  // Statement here isn't run since above expression is false
} else {
  // Statement here runs instead
}
```

#### Loops and Jumps

Loop statements are statements run in different `for` or `while` javascript loops, and are therefore run multiple times which may or may not change with each iteration (based on index or a common variable).

Jump statements, meanwhile, are statements used in syntaxes like `switch` statements which jump to a specific statement(s) on a certain condition. This separates them from conditional statements, which instead go down a list of conditions and stop at the first matching one.

## this

The `this` keyword is basically a shortcut reference to the object where it is being called. This is determined entirely on the call-site, which is simply the object `this` is being used in.

There's three basic bindings that will determine exactly what object `this` gets bound to.

### Global Binding

By default, `this` is bound to the program's global object. For browsers and Node environments, this will basically be the window object. This should usually be avoided.

### Implicit Binding

Calling `this` in any sort of object means it will refer to that instead, since that's the call site.

```javascript
const hulk = {
  name: 'Hulk',
  attack: 'Smash',

  scream: function() {
    console.log(`${this.name} ${this.attack}!!!`)
  }
}

hulk.scream(); // Hulk Smash!!!
```

Calling `this.name` in the call-site is basically the same as calling `hulk.name` outside of it. This lets you reference code inside the call-site, letting `this` easily adjust to any data dependent on context or closure data. Just know that `this` can only be used in functions or other code definined _within_ the call site.

Note that `this` won't be bound the same way with arrow functions, since they can never be bound to `this`. They'll default to the lexical scope. This variable is at the root of the file, so using an arrow function like the one below would be `undefined`.

```javascript
const hulk = {
  name: 'Hulk',
  attack: 'Smash',

  scream: () => console.log(`${this.name} ${this.attack}!!!`)
}
```

### Explicit Binding

If there's no implicit object for `this` to reference, one can be assigned with a few potential function calls.

#### .call() and .apply()

You can use either of these two on a function that uses `this` while passing in the object it'll use as the call-site. You can also pass in other arguments the function may need afterwards as a variable spread (`.call`) or in an array (`.apply`).

```javascript
function saySomething(message) {
  console.log( `${this.name} says "${message}"` );
}

const person = {
  name: 'Maxwell'
};

const announcement = "Watch Big Hero 6!";

saySomething.call(person, announcement);
saySomething.apply(person, [announcement]);
// Both return the following:
// Maxwell says "Watch Big Hero 6!"
```

#### .bind()

Bind operates similarly to the previous two methods, but differs in how it is called. This creates a new function with the passed object saved for `this`, and you then call that function afterwards.

```javascript
function say(message) {
  console.log( `${this.name} says "${message}"` );
}

const person = {
  name: 'Maxwell'
};

const MaxwellSays = say.bind(person);
// MaxwellSays is the 'say' function with
// 'person' bound to 'this'

const announcement = "Watch Big Hero 6!"; // Pass in needed args
MaxwellSays(announcement);
// Returns 'Maxwell says "Watch Big Hero 6!"'
```
