---
title: How to copy commits to other branches
category: Git
date: 2021-07-02
---

Commitment mistakes are frequent and painful, as I'm sure many divorcees will tell you. It's debatable if Git commitment mistakes are worse, but that's a topic for another time. This post is about what to do if someone makes a Git commit on the wrong branch. It's a mistake I've made many times and had to fix with long, painful workarounds.

But there is an easier way, according to this [Smashing Magazine article on fixing Git mistakes.](https://www.smashingmagazine.com/2021/05/undoing-mistakes-git-part2/)

The key is the Git `cherry-pick` command, one I'll admit I never used much. But the name says it best: **you copy a specific commit from anywhere else in the repo and add it to the current branch.**

Let's say I had a commit with the SHA value of `1234FG` on the `develop` branch. But I'd meant to commit it to the `laser-eyes-demo` branch. Cherry-pick lets me copy it to where it's needed.

```
git co laser-eyes-demo
git cherry-pick 1234FG
```

I should note this command only _copies_ the commit without deleting it from `develop`. That will take either a `git reset @{u} --hard` or an interactive rebase to remove.

Another fun fact: if there are changes I want to make, I can pass the `--no-commit` flag. It'll copy the changes without making a commit, so it's easier to make more changes.
