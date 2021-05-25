---
title: How to change your last command
category: Bash
date: 2021-01-19
---

The command line is great, but it can be inconvenient. I can't count the number of times I put in a command wrong, and either had to type it out again or use my mouse to clumsily highlight it so I could copy, paste, and fix it. Neither is convenient.

But there is a way to quickly change your last command! Using the `^` character, you can substitute one group of characters for another.

Let's say I accidently looked at the files of the `foo` folder when I wanted to look at `bar`.

```
ls foo
```

In the below command, **I write the string to target after the first `^` characters, and what to replace it with after the second `^` character.**

```
^foo^bar
```

This will make the following command appear in my command line, waiting to be run again. I could manually change it if I wanted before running it again.

```
ls bar
```

Just remember only the first instance of the string is replaced, not each one.
