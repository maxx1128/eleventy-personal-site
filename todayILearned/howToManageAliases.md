---
title: Some shortcuts to view and edit aliases
category: Bash
date: 2021-01-23
---

An **alias** is a bash command shortcut. You run the shortcut name, and it executes the longer function you store. It’s great to save and quickly use common commands.

Assuming you’re using ZSH like me, here’s two useful commands to add to your aliases file right now:

```
alias viewali="cat ~/.oh-my-zsh/custom/aliases.zsh"
alias editali="cd ~/.oh-my-zsh/custom && vim aliases.zsh"
```

- Run `viewali` to see your alias list.
- Run `editali` to edit your alias list with VIM.

Aliases can run singular commands, but also combine them. A useful alias trick is to open a repo while also running locally. Here's one that would open up a website with Visual Studio Code while running the command to view it locally.

```
alias mysite="cd ~/Documents/my-site && code . && yarn develop"
```

- First it navigates to the folder with my site’s code
- Then it uses a VSC code shortcut to open up the repo
- Runs `yarn develop`, which is the repo’s script to spin up the site

Viola! One command to get you into working mode.
