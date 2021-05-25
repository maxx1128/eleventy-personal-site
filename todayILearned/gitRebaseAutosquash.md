---
title: How to squash commits into a single one
category: Git
date: 2021-01-19
---

Some Git commits may be made [solely to be squashed into other ones later on](https://robots.thoughtbot.com/autosquashing-git-commits). For example, you may add a commit meant to adjust or repair one further up the commit tree. **This can be simplified by making them `fixup` commits. These are commits marked specifically to be "squashed", or combined, into others.** They will automatically do so during a certain type of rebase.

This has been extremely useful throughout my career, but it has a few steps. They are well worth learning.

1. Track all wanted changes.
2. Run `git commit --fixup <commitID>` for the commit, with `commitID` being the ID of the commit you want it to be squashed into. You can see your commit ID's by running `git log`, with their IDs shown as long, random character strings.
3. The changes will then be committed with the same message as the commit you chose, but with the word `fixup!` prepended to it.
4. Run a git rebase with `git rebase -i -autosquash [branch]`. When the commits get listed, you'll fixup commits will be moved right next to the commits they're repairing. When you run the rebase with `:wq` they'll be merged, and the `fixup!` commits will canish.

You can set rebases to autosquash by default by running `git config --global rebase.autosquash true`. That way, you never need to pass the `autosquash` option again.

Lastly, here's a useful trick: to quickly find a recent commit when running the `--fixup` option, you can tell Git to get to find the most recent commit with a certain string. This command would be `git commit --fixup :/<string>`. So if you know the commit you want to fixup includes the word "chocolate", you'd run `git commit --fixup :/chocolate`. Put the string in quotes if there's any spaces in it.

Only use this trick when you know that git will find the commit you’re thinking of in descending order. The more unique a string you use, the less risk it'll grab the wrong one.
