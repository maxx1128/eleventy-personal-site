---
title: JavaScript strings have many useful methods
category: JavaScript
date: 2021-01-17
---

Like JavaScript arrays, JavaScript strings are important and I won't explain why here. But I've found lots of useful methods built into those strings I repeatedly use, and thought I'd share them here.

I also wrote all these notes while listening to Markiplier play "Five Nights at Freddy's 4." As you'll see, it had a subtle effect on my code examples.

## .length

`length` gets the length of a string, spaces and all. It doesn’t count just letters, it goes the inclusive route and counts them all!

```javascript
let str = "Nightmare Bonnie hates the flashlight.";
console.log(str.length);
// 38
```

## .trim()

`trim` removes the whitespace at the beginning and end of a string. **It does not remove the white space between characters!**

```javascript
let str = "    Shine the light on Plushtrap. Be careful...      ",
    trimmedStr = str.trim();

console.log(trimmedStr);
// "Shine the light on Plushtrap. Be careful..."
```

## .includes()

`includes` returns a true or false value if a string contains a substring.

```javascript
let str = "What was The Bite of 87?";
console.log(str.includes("Bite")); // true
console.log(str.includes("Golden Freddy")); // false
```

## .indexOf()

`indexOf` gets the string index (starting from 0) of where a substring first occurs in a longer string. If the substring isn’t there, it returns `-1`.

```javascript
let alphabet = "abcdefg";
console.log(alphabet.indexOf('a')); // 0
console.log(alphabet.indexOf('d')); // 3
console.log(alphabet.indexOf('h')); // -1
```

## .toUpperCase() and .toLowerCase()

These respective functions turn a string to all lowercase and uppercase letters. They're pretty self-explanatory.

```javascript
let lowercaseString = "was that breathing?!",
    uppercaseString = "I HAVE TO LISTEN QUIETLY...";
    console.log(lowercaseString.toUpperCase()); // WAS THAT BREATHING?!
    console.log(uppercaseString.toLowerCase()); //  i have to listen quietly...;
```

There’s no included method for capitalizing a string, but you can make a function to do this instead. Several string methods used here are explained further on.

```javascript
let lowercaseString = "was that breathing?!";
function toCapitalizeString(string) {
  let firstCharacter = string.charAt(0),
      stringWithoutFirst = string.slice(1, -1);
  return firstCharacter.toUpperCase() + stringWithoutFirst;
}

const capitalizedSentence = toCapitalizeString(lowercaseString);
console.log(capitalizedSentence); // Was that breathing?!
```

## .replace()

This one is self-explanatory too: it replaces the first instance of a substring with another one. If you want to replace all instances, the string will need to be put within the global regex like this: `/<substring>/b`.

```javascript
let string = "Was that Nightmare Bonnie? It must have been Nightmare Bonnie!";

console.log(string.replace('Bonnie', 'Chica'));
// Was that Nightmare Chica? It must have been Nightmare Bonnie!
console.log(string.replace('/Bonnie/g', 'Chica'));
// Was that Nightmare Chica? It must have been Nightmare Chica!
```

## .slice()

`slice` takes a substring out of a string, cutting it out by specifying the starting and ending indexes.

- If you only specify the starting index, the substring will start from there and end at the end of the string
- If you include the start and end index, the substring will be contained within those two
- You can use a negative number to count the index, starting from *the end of the string*
- Just using -1 gives the last character in the string

```javascript
let str = 'Nightmare Bonnie';

console.log(str.slice(10)); // Bonnie
console.log(str.slice(10, 13)); // Bon
console.log(str.slice(10, -1)); // Bonnie
console.log(str.slice(10, -3)); // Bon
console.log(str.slice(-1)); // e
```

## .split()

`split` turns a string into an array by breaking it apart by the specificied substring. Using an empty string, or `''`, breaks the string apart by each character (including spaces).

```javascript
let str = "Freddy Bonnie Chica Foxy";

console.log(str.split(' '));
// [ 'Freddy', 'Bonnie', 'Chica', 'Foxy' ]
console.log(str.split(''));
// [ 'F', 'r', 'e', 'd', 'd', 'y', ' ', 'B', 'o', 'n', 'n', 'i', 'e', ' ', 'C', 'h', 'i', 'c', 'a', ' ', 'F', 'o', 'x', 'y' ]
```

## .repeat()

`repeat` takes a string and copies it a set number of times into a new string. Best used with `.trim()` to remove leftover white space.

```javascript
let str = "What was that?! ";

console.log(str.repeat(3).trim());
// What was that?! What was that?! What was that?!
```

## .match()

`match` checks to see if a substring is matched in a string, and returns the matched string. The matches, one or more, are returned in an array that you can count.

Using a regex lets you look for multiple matches and see the specific ones in the array.

```javascript
let str = "Was that Bonnie or Chica?! I think it was Chica...",
    bonnieMatches = str.match(/Bonnie/g),
    chicaMatches = str.match(/Chica/g),
    capitalMatches = str.match(/[A-Z]/g);

console.log(bonnieMatches); // ["Bonnie"]
console.log(chicaMatches); // ["Chica", "Chica"]
console.log(capitalMatches); // ["W", "B", "C", "C"]
```

## .charAt()

`charAt` gets the string character at a specific index.

It will only accept positive numbers, so it can’t use negative ones to start from the end. But you can get around this by subtracting from the string's length.

```javascript
let str = "Freddy";
console.log(str.charAt(0)); // F
console.log(str.charAt(str.length - 1)); // y
```
