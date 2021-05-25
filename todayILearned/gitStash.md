---
title: How to save code changes for later
category: Git
date: 2021-01-19
---

`git stash` is great for when you want to save changes for later, but aren't ready to commit them yet. It's the "unmarried move-in boyfriend" of Git commands. If you're in the middle of one task, but are interrupted and need to check out another branch, you can `git stash` those changes away and bring them back later.

Where do they go? Git lets you have a big list of "stashes" separate from all branches and commits. There's no limit to the number of stashes that I know of.

Here are the most useful versions of this command that I've found:

1. `git stash` will automatically stash all untracked changes. You may need to stage any untracked files, as I've found they're not always included in the stash automatically.
2. `git stash list` shows a lit of all stashed changes. They're labelled by the branch they’re on, and that branch’s most recent commit.
  * Each one has a name in this format: `stash@{#}`, with `#` being a basic reference number.
3. `git stash apply <name>` applies the stashed changes to the current files. If it’s the most recent stashed changes under `stash@{0}`, the `<name>` argument isn’t needed. You’ll need to resolve any merge conflicts that may pop up.
4. `git stash pop <name>` does the same as the above, but removes the stash from the list afterward.
5. `git stash drop <name>` just removes a stash from the list.
