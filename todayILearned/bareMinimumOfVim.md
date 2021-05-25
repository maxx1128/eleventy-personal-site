---
title: The bare minumum of VIM for my job
category: Bash
date: 2021-01-19
---

VIM is a common and popular text editor program built for touch typists. It lets programmers do just about anything from the keyboard using a large amount of simple shortcuts. This is ideal for programmers that want to be more productive - all our work is typing code, so the fewer times we need to take our hands off the keyboard, the better. Being built on shortcuts like this also makes it flexible and customizable, so coders can fit it to many programming needs.

The downside, as you may have guessed, is the big learning curve. There are a _lot_ of shortcuts to learn. The keycodes aim to be semantic but are extremely short, so the end result isn't that intuitive.

If you use a good text editor like Visual Studio Code (that's mine) or Sublime Text (that used to be mine), you can get away with almost never touching VIM. But if you use Git on the command line, many commands will bring you to a VIM interface. Want to rearrange the order of some Git commits? You'll be managing that text with VIM.

If you're not ready to learn all of VIM yet, but need to learn enough for working with Git, here's everything I've learned to get by.

- `d` means “delete” for **cutting** text.
- `y` means “yank” for **copying** text
- Press `P` to paste before the cursor, or `p` to paste after.
    - Do these refer to before the current line, and then after the current line?
- Press `v` to select characters, or uppercase V to select whole lines, or `Ctrl-v` to select rectangular blocks.
- If you only want to select a word, add `aw` to a command. For example, `daw` will delete a word, since spelling it out means "delete a word."
- `:wq` for closing and saving, `:q` to close without saving

If these don't cover your needs, hit `i` to enter "insert mode." This lets you type and edit text like a typical text editor. This is less convenient, but you have more control and won't accidentally turn your text into a puff of white smoke. Hit `ESC` to return to VIM.

Once you're done making changes in VIM, hit `:wq` to save and close out. If you want to close out without saving, just use `:q`.
