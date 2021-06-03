---
title: How to make a Git commit
category: Git
date: 2021-01-19
---

The core of Git is to organize changes into logical chunks. So knowing how to make an actual commit matters, and there are many tricks around it.

First, know the difference between untracked and unstaged.

- *Untracked* is new files that haven’t been added in the repo.
- *Unstaged* is for specific changes made to tracked files. Once a file is tracked, changes made them then are unstaged and won’t be included for commits.
## git add

`git add` is the base command to choose what files to include in a commit. But it's not enough on its own.

Use `git add .` to include all untracked and unstaged changes in the next commit.

If you need to be more precise use `git add --patch` or `git add -p` to go through each "hunk" of changes. You'll decide what to do with each hunk using these commands:

- `y` to add this hunk and go to the next
- `n` to skip this hunk and go to the next
- `d` to skip this hunk and all remaining hunks
- `s` to split this hunk into smaller ones and continue from there
- `e` to manually edit this hunk (VIM ALERT! Use `:quit` to escape from this if needed)

## git commit

Once you've decided what files to include a commit, you still need to make the commit itself. The basic form for this command is `git commit`.

However, **you should always include a message with your commit.** This is just good practice, as messages help you recognize a commit and its changes. You can do this with `git commit -m`, followed by a message string in quotes.

```
git commit -m  "Update the color scheme to something with more pop"
```

Some other useful options for this command are:

- `git commit --amend` will add any tracked changes as part of the last included commit. If the last commit was already pushed, the amend will need a force push to take on the remote repo.
- `git commit -a` commits all changes currently made in existing files.
- `git commit -am` commits all changes currently made in existing files and takes the argument for adding a message. It's a time-saver for doing both at once.

There's other ways to add and work with one's Git commits, but those are for another post.
