---
title: How to view Git logs
category: Git
date: 2021-01-19
---

Git lets you track lots of data. But all that data isn't useful if I don't know how to read it. I've found two Git commands helpful for doing this.

## git log

`git log` shows a record of all the commits in a repo. Each entry includes the name, date, commit hash, and other basic meta data. It also shows what branches these commits are on, which is helpful to see where one branch is related to another.

If you want to see a log of commits that only touched a specific file, try `git log -- <path/to/file>`.

## git reflog

I've only seen `git reflog` brought out when something has gone wrong. So know it well and use it with care.

The `reflog` is a list of all past git commands you've run. This includes commits, rebases, resets, checkouts, pulls, and whatever else affected the code. Each `reflog` item has a unique ID that you can use with `git checkout` to pull the version of that code after that command was run. This lets you undo virtually any Git action you may take, whether it was on purpose or not.

A common situation for me has been accidentally resetting the code and losing a lot of unsaved, local changes. I can open the `reflog`, copy the ID of the action right before that reset, and check it out to bring my changes back!

However, careless use of the `reflog` can do just as much damage to your work, so don't use it carelessly.
