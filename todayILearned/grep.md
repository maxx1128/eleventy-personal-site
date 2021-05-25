---
title: grep lets you search through data
category: Bash
date: 2021-01-19
---

`grep` is a built-in way to search for specific strings in text files or other output. It goes line-by-line through a file or output, and returns each line with a match.

By default, it looks for a substring in an entire file. So if you ran `grep "foo" file.txt`, with `file.text` being a file in the current directory, it'd return each line with "foo" in it with that word highlighted.

I mentioned outputs too, which I would argue is more useful. You can `grep` through whatever text is output by something on the commany line. If I wanted to find each of my blog post's referencing "anime," I could enter `grep -r "anime" posts/`. It'd look through each file there, and each match would give me that line along with the file it found it in.

You can also combine a `grep` command with a pipe to better organize the results.

* `grep -r "anime" posts/ | uniq` will remove any duplicate results.
* `grep -r "anime" posts/ | sort` changes the result's order, by default showing them alphabetically.
* `grep -r "anime" posts/ | more/less` shows all results one one page at a time (press `q` to exit).
