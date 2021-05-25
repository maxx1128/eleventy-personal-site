---
title: How to kill a terminal process
category: Bash
date: 2021-01-19
---

There have been many times where I forget to end a command line process before closing the window. It keeps running in the background, and blocks any attempt to start a new process up. This is especially bad when I close a terminal window running several processes, don't know which one is still going, it causes everything to crash next time, and I need to parse which one is going. Folks who have run a custom Ruby on Rails setup likely know what I'm talking about.

That's why knowing how to kill a process is important. You don't kill it with fire, poison, or strategically placed boxes of snakes. No, kill it with the `ps aux` command.

## What is "ps aux?"

The first part, `ps`, is short for Process Status. It shows info about all the current processes running on a Linux or Linux-esque system. I use a Mac and the command works, so I don't question it.

The second part, `aux`, is a parameter to select what information you want about each process. Each letter is a different bit of info from each process.

* `a` shows processes for all users on the system in question. The related username will appear in the results, if there is one.
* `u` display the process's user or owner. Every process has one, and it will usually be the account you're on at that moment.
* `x` also show processes not attached to a terminal. So any applications, browsers, or other background jobs will show up. Not including this parameter will likely shorten your list a lot.

You can run `ps` with one or more of these parameters, or none at all. But I use all by default to get as much information as possible.

## Narrow Down the Processes

Let's say I want to kill the a background Redis progress I forgot to close. Running `ps aux` gives a big list of processes, and I don't want to read through each line.

I can pipe these results through `grep` to narrow them down. Running `ps aux | grep Redis` returns only two processes.

```bash
USER               PID  %CPU %MEM      VSZ    RSS   TT  STAT STARTED      TIME COMMAND

maxantonucci      7384   0.0  0.0  4267948    684 s001  R+    5:15PM   0:00.00 grep --color=auto (unneeded info here)
maxantonucci      7230   0.0  0.0  4349728   8076 s003  S+    5:15PM   0:00.04 redis-server 127.0.0.1:6379
```

I only have one Redis app, so why two results? If you check the last column of the first result, "command," you'll see it inludes `grep`. This is the process I ran to find all the Redis processes! It's meta, but not what I want. So the second one must be the still-active process.

### Killing a Process

Now that I have the process, how do I stop it?

The results' second column is "PID," which stands for "process identifier." Use this unique identifier with the beautifully named `kill <PID>` command to end it. Painfully. Suddenly. And with no evidence to link it back to you.

So I run `kill 7230`, and check for any current Redis processes again. I only see the process-checking process, so the other is gone for good!

If that doesn't work, running `kill -9 <PID>` should end it if it's extra stubborn. So far, I haven't needed to do anything beyond that.

Happy (process) killing!
