---
title: "Checking Sudoku with Functional JavaScript"
date: "2019-10-07"
excerpt: "A CodeWars challenge had me checking if Sudoku puzzles were solved correctly or not. I break down my solution using functional JavaScript"
image: 'sudoku-javascript.png'
tags: ['javascript']
featured_image_link: 'https://safebooru.org/index.php?page=post&s=view&id=1355200'
---

A favorite CodeWars challenge of mine is the ever-wonderful "check my sudoku" puzzle. It starts with a large array of arrays representing a completed Sudoku puzzle. You need to function that checks if it's correct or not. It's complex yet understandable and requires a good amount of creativity.

The CodeWars puzzle itself gives two sets of data to test against. The final function should tell the difference between the passing and failing data.

```javascript
const pass = checkSudoku([
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
]);
// 'Finished!'

const fail = checkSudoku([
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 0, 3, 4, 9],
  [1, 0, 0, 3, 4, 2, 5, 6, 0],
  [8, 5, 9, 7, 6, 1, 0, 2, 0],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 0, 1, 5, 3, 7, 2, 1, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 0, 0, 4, 8, 1, 1, 7, 9]
]);
// 'Try again!'
```

For a while, I had no idea how to approach it. There were so many problems and so many ways to tackle them. So I finally settled on something I'd learned more recently - **functional JavaScript!**

A while back [I explained functional programming with angels, mutants, and farmhands](https://www.maxwellantonucci.com/2019/06/25/metaphorical-intro-functional-js.html). I recommend reading that first, but the short version defines functional programming as:

1. Doesn't change the external state
2. Always gives the same output for the same input
3. Is declarative (the _what_) and not imperative (the _how_)

I followed these rules as much as possible for my solution. **My final answer was longer and more robust, but easier to read and manage.** That's a worthy trade-off since it most benefits fellow humans reading the code.

This puzzle was enjoyable and challenging, so I wanted to break down how I did it in this post. People reading this can learn about:

* Practical examples of functional programming
* Breaking down a large, complex problem into smaller pieces
* A secret, embedded message that will make you go insane over several years

You can also skip ahead and [see the final solution here](https://gist.github.com/maxx1128/c5c62dd09291f10bc7e8c0b77df80dbb). If not, let's start from the beginning.

## Define the Core Problem

The first step is defining my goal into some actionable steps. The goal of "checking this Sudoku" is a starting point, but also too broad. It tells me nothing about how to approach the code.

1. Check that the sudoku is valid

First, how does one see that Sudoku is valid? The core of any Sudoku problem is having the numbers 1-9 in all the right places - rows, columns, and the 3x3 squares. This puzzle gives a massive array of number arrays, and we need to navigate them and check their numbers.

So going off how Sudoku works, I can break down the goal into three smaller steps.

1. Check that each **row** only uses the numbers 1-9 once.
2. Check that each **column** only uses the numbers 1-9 once.
3. Check that each **square** only uses the numbers 1-9 once.

This is clear but repetitive. Each step looks at a different area, but the final step is the same: check the numbers. Having one function to check the numbers each time is more efficient.

1. Write function X that checks if a Sudoku array is valid.
2. Check each row's numbers against function X
3. Check each column's numbers against function X
4. Check each squares' numbers against function X

Now I'm making progress! Writing a function to check numbers isn't too tough. But the data I get may not be easy to check as a row, column, or square. At the start, it's a big array of arrays. I'll likely need to rearrange the data a bit before doing a check. So the three steps to check data each need an extra one.

1. Write function X that checks if a Sudoku array is valid.
2. Organize the data into arrays of row numbers
3. Check each row array against function X
4. Organize the data into arrays of column numbers
5. Check each column array against function X
6. Organize the data into arrays of square numbers
7. Check each square array against function X

These steps are clear, concise, and easy to tackle as actionable code tasks. So let's solve them down one at a time.

## 1. Write the Function to Check Arrays

**The function should take an array and ask "does this array use the numbers 1-9 once?"** A quick way to compare simple arrays is to sort them, convert them to a string, and compare with `===`. One array is an argument passed to the function. I hardcoded the other with the numbers one through nine. The result is simple and sticks to functional programming rules - pure, declarative, and gluten-free.

```javascript
const isSudokuArrayValid = (array) => {
  const row = array.slice(0).sort().join(''),
        passingRow = [1,2,3,4,5,6,7,8,9].join('');

  return (row === passingRow);
};
```

The remaining checks for rows, columns, and squares will make use of this one. Each will be a function that:

1. Takes the board array as its only argument
2. Reorganizes the data to get arrays that represent the rows, columns or squares
3. I run each array through the `isSudokuArrayValid` function
4. If each array passes, the function returns `true`, or else it returns `false`

In the end, I'll have three functions like this, rows, columns, and squares. The end of this entire function is making sure all three pass. If so, the Sudoku is valid!

So let's get started with the Sudoku rows.

## 2. Organize Data into Sudoku Rows

This is an easy first step since it's already done for me. The passed `board` value in is already an array of arrays, with each being a row of numbers from left to right.

```javascript
[
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
]
```

This is already perfect for validating row data, so I can jump right to the test.

## 3. Check The Sudoku Rows

I need to pass each array into my `isSudokuArrayValid` function. Each row has to pass this check or they all fail.

Functional JavaScript led me to a helpful array method called `every()`. **It lets you run through each item in an array, and returns `true` only if each item returns `true`.** This one method does exactly what I need. That means this function only needs to do one thing and can fit in one line.

```javascript
const testRows = (board) => board.every(row => isSudokuArrayValid(row));
```

Here we take each row, run it through our function, and if all the rows check out, `testRows()` returns true! I'm already 33% of the way to validating the Sudoku.

## 4. Organize Data into Sudoku Columns

Getting all the numbers in a column isn't done for me, but isn't too tricky either. In array terms, numbers from the same index of each row make up each column. Column one is the first number from each row, column two is the second from each, and so on. I need to gather these numbers for columns one through nine.

Let's think about this in JavaScript terms. If we define each array as `row` in a loop, column one would be `row[0][0]`, `row[1][0]`, `row[2][0]`, and so on until `row[8][0]`. So the function first needs to loop through and gather data from each row.

When it comes to gathering data while looping, functional JavaScript has `reduce`! [`reduce` is too vast to cover here](/exocortex/javascript/ReduceFunction.html), but what matters here is it gives you a variable that carries over in the loop. So you could make this variable an array, and add a value to it over each row number. Which I do in the below `gatherColumn` function.

```javascript
const gatherColumn = (board, columnNum) => board.reduce((total, row) => [...total, row[columnNum]], []);
```

In a nutshell `reduce` is saying it will start with an empty array (the `[]` at the end). **It updates that array with whatever we want after each loop.** I pick out the needed row number with `row[columnNum]` for each round. Then I use the `...total` spread operator to add the current array. The result is it adds the new number to the list each time. The final result is all the numbers from a column.

## 5. Check the Sudoku Columns

With the column numbers gathered, I only need to run it for each row. That means getting the column numbers from indexes `0` to `8`. Then I check them all against `isSudokuArrayValid`, which I can do in one line!

```javascript
const testColumns = (board) => {
  const gatherColumn = (board, columnNum) => board.reduce((total, row) => [...total, row[columnNum]], []);
  return [0,1,2,3,4,5,6,7,8].every(i => isSudokuArrayValid(gatherColumn(board, i)));
}
```

I wrote out the array of indexes, which is not too elegant but it works. Then I check the result of `gatherColumn` against `isSudokuArrayValid`. The resulting function does what I want, validating each Sudoku column.

## 6. Organize Data into Sudoku Squares

This is the hardest check of all. Gathering numbers from grouped squares isn't a straightforward trick. Each square has a different collection of index values for rows and columns. Looping through them right takes some extra logic.

My approach here was, again, to tackle the smallest problem first and use it to handle larger ones. I didn't have a clear idea of how the final function would work at the start, but I figured it out as I went.

### 6a. Get the Square Indexes

I started simple: get the indexes for each "square" on the board. **Each number in a square has two indexes: the row index and the column index.** So getting all the indexes for a square means getting nine pairs of indexes, one for each number.

Let's say the top-right square is "square one." The next one in the row is "square two," and it goes on until "square nine" on the bottom right. If I wanted all the indexes for square one, I'd need a function that returns the following array of arrays:

```javascript
[
  [0, 0],
  [0, 1],
  [0, 2],
  [1, 0],
  [1, 1],
  [1, 2],
  [2, 0],
  [2, 1],
  [2, 2]
]
```

Looking at the `board` array I'm working with, these indexes would get us the square one. These values are the first three numbers in the first three arrays below.

```javascript
[
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
]
```

So how do we get a function to return the needed row and column index values?

After thinking it over for a while, I realized one function can do this for both rows and columns. I can distill the logic down to these steps:

1. For a square in the first row or column, give the indexes `[0, 1, 2]`
2. For a square in the second row or column, give the indexes `[3, 4, 5]`
1. For a square in the third row or column, give the indexes `[6, 7, 8]`

This logic screams "conditional statement." So for once I listened to the screams echoing from the dark recesses of my mind and wrote this function.

```javascript
const getSquareIndexes = (num) => {
  if (num === 1) {
    return [0,1,2];
  } else if (num === 2) {
    return [3,4,5];
  } else {
    return [6,7,8];
  }
}
```

Now whether it's for rows or columns, I can use this to get the needed indexes for that group. That's nice and all, but useless without the related values. I wasn't even sure how I'd make use of this function. So I kept going by intuition for the next step.

### 6b. Get the Square Values

So I have the indexes, now I need to use them. I need a function to pull the values from the `board` variable.

Like with the row and column checks, I need to do some looping. **But I've got two numbers to loop through, the row indexes and the column indexes, so it'll take two loops.** For finding the values in square one, the two loops would go like this.

1. Loop through all the rows that make up the square.
2. In each row, loop through each of its columns that make up that square.

So it's two loops with one loop working inside the other. It took some brooding, trial and error, and prayer sessions at the Altar of JavaScript. But I got a working function for this, and I'll break it down step by step.

First, the function will need three values: the row group, the column group, and the board itself. The row and column groups correspond to the square setup. There are numbers between zero and two: square one is the first three rows and columns, so they'd be `0, 0`. Square two is the first three rows and the second group of three columns, so they'd be `0, 1`.

```javascript
const getSquareValues = (x, y, board) => {
  // Magic to go here
};
```

You may have read "numbers between zero and two" and recalled that `getSquareIndexes` function. Good catch, since that's what the numbers are for! This function uses each to get the needed indexes for the rows and columns.

```javascript
const getSquareValues = (x, y, board) => {
  const row = getSquareIndexes(x),
        columns = getSquareIndexes(y);
};
```

With the needed indexes, I can now do my two loops: **loop through the rows, and then loop through the columns in that row.** I also need to declare an empty array I can push the values to as I find them.

```javascript
const getSquareValues = (x, y, board) => {
  let values = [],
      rows = getSquareIndexes(x),
      columns = getSquareIndexes(y);

  rows.forEach(row => {
    columns.forEach(column => {
      values.push(board[row][column]);
    });
  });

  return values;
};
```

The code can now gather the square values! Calling `getSquareValues(1, 1, board)` gets me an array of numbers for square one. `getSquareValues(1, 2, board)` for square two, all the way to `getSquareValues(3, 3, board)` for square nine.

## 7. Check the Sudoku Squares

All that's left is running all these values through `isSudokuArrayValid`. I need to cover every combination of `[1, 2, 3]` when gathering square values. I can do this with another nested loop. `every()` also comes in to make sure each square passes.

```javascript
const testSquares = (board) => {
  const squareSections = [1,2,3];
  return squareSections.every(squareX => {
    return squareSections.every(squareY => isSudokuArrayValid(getSquareValues(squareX, squareY, board)));
  });
}
```

With that, I now have the third and final function to check each part of a Sudoku. All that's left is throwing them together.

## 8. Putting it All Together

The final step is the last line in this function. With everything done in my other functions, I only need to confirm they all pass. That determines if they return the `"Finished!"` or `"Try again!"` strings. A few comparatives and a ternary operator are all it takes.

```javascript
return (testRows(board) && testColumns(board) && testSquares(board)) ? 'Finished!' : 'Try again!';
```

Boom! You can [see my completed `checkSudoku` function in all its glory in this gist](https://gist.github.com/maxx1128/c5c62dd09291f10bc7e8c0b77df80dbb). It includes the tests at the start so you can confirm it works.

## Conclusion

Not much more to write here other than I hope you enjoyed reading this breakdown. Writing it was tough but fun. There's always a big gap between "understanding" and "explaining" solution." **But crossing that gap helps improve understanding and memory for future code challenges.** Writing this even helped me further improve the function (like naming variables better). Here's hoping I can write more breakdowns like this later.
