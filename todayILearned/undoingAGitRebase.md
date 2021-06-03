---
title: Extra rebase powers of undoing rebases and splitting commits apart
category: Git
date: 2021-01-19
---

Rebasing is one of Git's most powerful and useful features. There are two specific things I learned git rebasing lets you do with the right approach: undoing a rebase, and splitting apart commits.

## Undoing a rebase

A few times, I've done a rebase for the wrong branch or created too many merge conflicts, and it was easier to just undo it with these steps.

1. Run `git reflog` to find the commit right before the rebase was run, and copy its ID.
2. Run `git reset --hard <commitID>` using that commit’s ID bring the repo back to before the rebase.
3. Run `git push --force-with-lease` to push that version of the repo to the remote, removing all the rebase changes that had been added after.

## Using a rebase to split commits

You may have bulky commits you want to split into several smaller ones, without having to rewrite the code. Rebasing lets you do this.

1. Set up an interactive rebase with `git rebase -i <master_branch>`.
2. On the interactive rebase list, change `pick` to `edit` for the commit you want to split.
3. When editing this commit, run `git reset HEAD~`. This unstages all the changes from the commit, but still tracks them.
4. Add the select code you want, commit it, and repeat until all the code has been recommitted in new commits.
5. Run `git rebase --continue`.
6. Repeat steps 2-5 for any other commits you want to split.
7. All set! Happy dance.
