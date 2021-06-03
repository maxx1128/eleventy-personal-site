---
title: Lots of cool object methods
category: JavaScript
date: 2021-01-19
---

While catching up on episodes of the anime RWBY, I found a big list of methods for JavaScript objects. Up until then, I'd only used brackets to pull up values from objects. Knowing objects can do so much more was a great discovery, so I saved my favorites here.

## For X in Obj

This loops through all the properties and values of an object, in case all need to be looked at.

```javascript
const RWBY_colors = {
  ruby: 'red',
  yang: 'yellow',
  blake: 'black',
  weiss: 'white'
}

for (let character in RWBY_colors) {
  console.log(`${character} has a color of ${RWBY_colors[character]}`)
}

// ruby has a color of red
// yang has a color of yellow
// blake has a color of black
// weiss has a color of white
```

## Object.values()

The `values` method creates an array of all the object’s values, and ignores their keys.

```javascript
const RWBY_colors = {
  ruby: 'red',
  yang: 'yellow',
  blake: 'black',
  weiss: 'white'
}

const colors = Object.values(RWBY_colors);
// [ 'red', 'yellow', 'black', 'white' ]
```

## Object.keys()

The `keys` method does the reverse of `values`, creating an array of keys and ignoring the values.

```javascript
const RWBY_colors = {
  ruby: 'red',
  yang: 'yellow',
  blake: 'black',
  weiss: 'white'
}

const names = Object.keys(RWBY_colors);
// [ 'ruby', 'yang', 'blake', 'weiss' ]
```

## Object.entries()

`entries` is a combination of the two above methods. All key-value pairs are returned as arrays, with all of them inside another array. Any objects set as values here stay as objects.

```javascript
const RWBY_colors = {
  ruby: 'red',
  yang: 'yellow',
  blake: 'black',
  weiss: 'white'
}

const huntresses = Object.entries(RWBY_colors);
/*
[ [ 'ruby', 'red' ],
  [ 'yang', 'yellow' ],
  [ 'blake', 'black' ],
  [ 'weiss', 'white' ] ]
*/
```

## Object Spread

Object spreading lets you add key-value pairs into an object without mutation. This means you get a new object without affecting the original, which is great for functional programming.

```javascript
const RWBY_colors = {
  ruby: 'red',
  yang: 'yellow',
  blake: 'black',
  weiss: 'white'
}

const two_team_colors = {
  ...RWBY_colors,
  nora: 'pink',
  ren: 'green'
}
/*
{ ruby: 'red',
  yang: 'yellow',
  blake: 'black',
  weiss: 'white',
  nora: 'pink',
  ren: 'green' }
*/
```

## Object Freeze

The `freeze` method prevents an object from being modified or added to again. This is useful since `const` comes close but doesn’t entirely do this.

```javascript
const RWBY_colors = {
  ruby: 'red',
  yang: 'yellow',
  blake: 'black',
  weiss: 'white'
}

Object.freeze(RWBY_colors);

RWBY_colors.ruby = 'dark red';
// Won't change

RWBY_colors.nora = 'pink';
// Won't be added
```

## Object Seal

`seal` is a less severe version of `freeze`. It prevents an object from being added to, but existing properties can still be changed.

```javascript
const RWBY_colors = {
  ruby: 'red',
  yang: 'yellow',
  blake: 'black',
  weiss: 'white'
}

Object.seal(RWBY_colors);

RWBY_colors.ruby = 'dark red';
// Changes the object

RWBY_colors.nora = 'pink';
// Still won't be added
```
