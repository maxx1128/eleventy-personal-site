---
title: What Git resets can do for us
category: Git
date: 2021-01-19
---

Resetting is how Git lets coders remove or undo certain changes. While Git is meant to keep track of all changes, that makes correcting it even more important. Otherwise, incorrect code can be carried past the point anyone wants.

The base Git command for this is `git reset`. So far in my career, I've only used it in three ways:

1. `git reset HEAD --` removes all staged file changes to unstaged. This is helpful if you want to start over when staging files for a commit.
2. `git reset --soft <commitID>` will take all the commits after the selected one's ID and undo them. None of the changes from those commits will be lost. Instead, you'll still them all locally, grouped together as staged changes. **This is great for when you accidentally make commits to the wrong branch.** You can undo the commits without losing your work, then stash them so you can re-commit them to the right branch.
3. `git reset @{u} --hard` will reset your local branch to match the remote one exactly. I use this when someone else has made changes to a branch and want to get the exact version of the branch on the server. This removes **all** changes and commits on your local branch, so only use it when any work you've done is safe in a stash or commit.
