---
title: "The Shell Introduction I Wish I Had"
date: "2018-07-16"
excerpt: "I write a letter to my past self about the Shell's importance I wish I'd focused on earlier in my career."
image: 'shellintro.png'
tags: ['Intros I Wish I Had']
---
Hey there past me. Hope you're doing well and keeping the horrible regrets to a minimum. I'm here to help in that regard. At least with career-related regrets. Nothing I can do about that OkCupid date where the bulldozer hit the...actually, that's for another time.

So I'm writing to you, my past coding self, to get you up to speed on something important: The Shell. The future me is (moderately) wiser and wants to help. I wrote a similar guide for Git Rebasing that you (and others) found helpful. My post this time is broader, lays the groundwork for learning and understanding more about the Shell and why it matters.

1. [What is the Shell?](#what-is-the-shell)
2. [Shell Actions](#shell-actions)
3. [Package Managers](#package-managers)
4. [Dot Files](#dot-files)
5. [VIM](#vim)
6. [Aliases](#aliases)
7. [Scripts](#scripts)

<h2>
  <a id="what-is-the-shell">What is the Shell?</a>
</h2>

To really understand the Shell and why it's useful, you'll need some computer science backstory. Don't worry, it's not much.

You use a Mac, since you have a soul and all. Your mac's operating system (OS) is built on something called Unix, a popular open-source operating system. The Unix philosophy is modular - programs should be simple and do limited, well-defined functions.

A computer's **Shell** is basically a direct way to access an OS's functions through a text-interface, often called the "command line." Think of it this way: you often navigate folders by double-clicking on icons. This is using a graphical user interface, or GUI, since you've got visuals to guide you.

A Shell lets you do all the normal things, but only with text commands - no icons to view, click through, or drag around.

### Why is the Shell Useful?

I can guess what you're thinking, since I'm you and all. You're asking "why would it be better to use my computer through a text-only interface? Sounds hard and not too useful!" But for coders they have two key benefits.

1. **Shells can do many things GUI's can't.** Want to run a site locally and see live-updates based on changes? Install needed packages for a repo? Run a Gulp or NPM workflow? Develop a prototype app on your computer? All these things require the Shell. Some functions do have GUI counterparts - for example, you can use Git source control via the Shell or apps like SourceTree. But those GUI's never give you the full range of functions you'll need. Remember git rebasing? It's a lot harder, even impossible, to do on any GUI.
2. **Shells let you automate otherwise time-consuming tasks.** As a coder, you'll have lots of repetitive computer tasks that take away your time and productivity. Shells let you condense complex tasks into simple commands that do all the work.

You can see how learning the Shell matters for your future. There's a learning curve, I won't lie. But if you don't overcome it, your career won't go very far.

### Different Types of Shells

Virtually all computers have a Shell, and there's different kinds. You should get familiar with Bash, since it's likely your default shell. Later a coworker will set you up with ZSH, but that's for another day. In the start just focus on Bash, which I'll refer to for the rest of this article.

<h2>
  <a id="shell-actions">Shell Actions</a>
</h2>

This is the part that needs patience. Too often you'll check out the Shell, see how mundane all the basic commands where, and stop learning. We'll get to the great stuff later. Right now we're "eating the Shell vegetables," so to speak.

There's a lot of Shell actions. Way too many in an already long post. But I'll break down the most-important basics. Enough to show you the scope of the Shell's power and let you learn the finer points yourself.

### Your First Commands

You should have an app on your Mac called the Terminal, which runs the Shell. Open it up and you'll see the Shell as a simple text prompt. This is where you'll put your Shell commands.

A good starting command is `ls`. It shows all the files in your current directory, or the computer folder you're in. If you're in a folder full of text files, you'll see each file's name.

Most commands also accept flags, which modify their functionality slightly. They're used by adding a `-` paired with a character to the command. For example, using `ls` with a flag could look like `ls -1`. This command also shows all items in your directory, but on separate lines.

Want to see all the flags? Use the `man` command for the `ls` command by running `man ls`. You'll see everything you need to know about `ls`, what it does, and all its flags! **This is perhaps the most important command, since it gives you useful info about all commands. Use it often!**

### Some Basic Commands

`ls` is just one of many useful, basic commands. Here's some more I'll only give a basic overview of. Check them with `man`, run them a few times, see what happens! Experimentation is the best way to learn here.

* `pwd` - see your current directory
* `cd` - navigate to different directories
* `cd ~` - go to your root directory
* `mkdir` - make a new directory
* `touch` - make a new file
* `cat` - show a file's contents
* `cp` - copy a file
* `rm` - delete files or directories
* `wc` - get the number of words, characters, or lines
* `echo` - show text, or the compiled text of other commands. Great for testing commands out.

There's also some slightly more advanced ones you should take the time to learn.

* Curl - download or transfer data from a server. You'll see it a lot when installing new things!
* Grep - filter results line-by-line based on different patterns, or regular expressions (aka a regex)
* Pipe (|) - take one command's output and use it as the input for another
* Awk - lets you process text files different ways
* Sed - manipulates texts in files using a regex

[If you want a more specific guide for these, check out "Learn Enough Command Line to be Dangerous."](https://www.learnenough.com/command-line-tutorial)

There's also different inclusion patterns, regular expressions, outputting number patterns with braces, and more. You don't need to know it all right now. Note the new things and learn them later.

However there's one last thing I _should_ mention here...

### Know variables

Shell variables are similar to other coding languages: they're stored values to reference elsewhere.

Declaring one uses the `[VAR]=[value]` syntax, with the name usually in all capitals. A basic example is CUPCAKES=5.

Checking a variable's value is also easy. Here you'd just run `echo $CUPCAKES`, and you'd get `5`. Remember the dollar sign on the variable name!

Another important note: when you close the terminal, all variables you wrote in the session vanish. To make full use of variables, you need to save them. For that, we need dot files, which I'll explain later.

Before that, with these essentials done, let's cover maybe the most important use for the Shell - package managers

<h2>
  <a id="package-managers">Package Managers</a>
</h2>

The first point I gave about Shell's usefulness was it can do things most GUI's can't. Most of that happens thanks to **package managers.**

### Okay, so what's a Package Manager?

Here's an example: Early in your career, you played with Gulp.js for things like converting Sass to CSS. You'd use the Shell to navigate to that directory and run a command like `gulp` or `gulp styles` to get it going. You didn't really know what you were doing or how it worked, but you made it happen. This was the same for other commands, like `npm start`, `yarn develop`, `ember server`, and `rails server`.

At their core, these are installed Shell commands with an argument passed in. The Shell is the entire reason you can use them.

But if you can use commands like `yarn` and `npm`, where's the code creating them being stored? It's not already installed in your computer, so it has to come from somewhere, right?

You could figure out how to download, store, and properly access all the code from these repositories to get them working in the command line. This includes updating and navigating them all, setting up the instructions, and checking its all over. As you'd expect, this is utterly wasteful and inefficient.

Package managers help avoid all that. They're convenient ways to download, organize, and update all the code needed to run these important commands.

### Installing the First Package Manager

A coworker will introduce you to [Brew](https://brew.sh/), which you should absolutely install. It'll make creating and running different types of code a breeze.

For example, say you want to install Node.js to run JavaScript on the server, and use tools like Express to build sites. When you first looked into Node, you saw a confusing download page and didn't know where to go. You'd get all the files but not know where to put them, how to run them, or where they fit in the context of your computer. You wound up dismissing it and not trying again for weeks, remember? Using Brew, this could've been a snap!

To install Brew, simply run this command in your Shell:

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

This Shell command looks complicated, but at its core is simple. It uses `curl` to download a ruby script, and runs it on your computer to install Brew.

The install takes a while, but now you can use Brew to install things like Node in a flash. It's as simple as this:

```
brew install node
```

Brew downloads Node, sets it up, lets you update it, and links it all to the `node` command.

A quick test of this is making a JavaScript file with the following code:

```
// test.js

var number = 1 + 4;
console.log(number);
```

Then navigate to the directory it's in and run this:

```
node test.js

5 // Output
```

You'll use Brew to add other important things like nvm, Ruby, rvm, npm, and more. With a basic understanding of Shell, you'll know the basic context of how this works and how to use it to your advantage. Because in the end, much of the complicated programmer stuff is just Shell commands.

Bottom line, a package manager is your best way to handle the most important things you'll be using with the Shell. You should learn the Shell for at least that much, since it CANNOT be put off if you want to be a professional.

<h2>
  <a id="dot-files">Dot Files</a>
</h2>

Let's get back to some Shell essentials. Dot files are stored by the Shell, and usually have persistent variables used to configure the shell. You can also save commands in them.

Dot file names usually have a `.` in the start (hence the name). If you've only used a GUI before, you've likely never seen one. That's because you can only see them via the Shell! Run `ls -a`, and you'll get both regular and dot files listed.

With Bash, you can run `cd ~` to get to your root directory, then `ls -a` to see some important shell files. These should include:

* `.bash_profile` - the base configuration file
* `.bashrc` - the "startup" file. Commands here run automatically for each new terminal session.

You can view these files, and other dot files, with the `cat` command. But how do you edit them? That's with the ever-wonderful VIM!

<h2>
  <a id="vim">VIM</a>
</h2>

Vim is, at its core, a text-editor. It's built into the Shell, and you'll often use  itto edit Shell-specific things like dot files. However Vim is quite different from your first text editor, Sublime Text.

The big hook is, due to being on the Shell, **VIM is a text editor that only uses the keyboard.** Bash has no GUI to click around, remember? This makes VIM very productive for coders, but has a steep learning curve.

You don't need to use VIM right away, and can open dot files in other editors if you want. But if you ever run something like `vim .bashrc` and want to exit VIM safely, do this:

* Hit `esc`
* Type `:q`
* Hit `enter`

Until then, avoid VIM by running `open <name>`. It'll open the file with your default text editor instead. But VIM will keep popping up, so at least stay aware of it.

<h2>
  <a id="aliases">Aliases</a>
</h2>

Now we get into the "time-saving automation" part of Shell!

Aliases are basically command shortcuts. You can save long, or chained, commands into shorter ones easier to remember. If there's a long command you run often, save it to an alias!

In bash, you can add aliases to the `bash.rc` file. Each one goes on a separate line, and looks like this:

`alias <name>="<put shell commands here>"`

Here's two useful alias examples to add first for Bash:

```
alias viewali="cat ~/.bashrc"
alias editali="open ~/.bashrc"
```

Here, `viewali` runs the commands to navigate to the alias file itself and show its contents. `editali` opens it in a text editor so you can add to or change them (later on you'll use `vim` instead). You can now easily view and update your aliases through the Shell!

Want an even more useful example? Fast forward to my time, when you build your personal website with Gatsby.js, and you'll add this one:

```
alias mysite="cd ~/Documents/gatsby-blog && code . && yarn develop"
```

Specifics aside, this alias opens up my site repo in Visual Studio Code and gets it running locally. This just scratches the surface of Bash's potential.

### Functions

Say you want to automate something more complicated that'll take some arguments. That's possible by saving a function in your alias file. Here's an incredibly simple example:

```
testfunction(){
  echo $1
  echo $2
}
```

Each variable with a `$` in the start is a parameter. They're numbered by the order they're passed in. So `$1` is the first argument, `$2` is the second, and so on.

```
// Running the function...
testfunction hello world

// Returns this!
hello
world
```

> Note: you'll need to restart your terminal for new aliases and functions to take effect.

<h2>
  <a id="scripts">Scripts</a>
</h2>

Script files are similar to aliases in that they save Bash functionality for later use, with several differences:

* They end in an .sh extension
* The file operates as essentially one giant function that takes several arguments
* For Bash, they're normally saved in the `usr/bin` directory. From there they can be run at any time
* Script files can't be run from the Shell right away. You'll need to run `chmod +x <filename>` to make it executable

Script files are useful for more complex, specific actions you want to run that would crowd your alias file. Once you get more fluent in Shell, expect to see (and write) more of these.

For example, when you're collaborating with other coders, the file that runs all their continuous integration tests will be a script file. So understanding Shell will help you improve on how that file creates and runs those tests.

## Conclusion

In many ways, Shell is a programmers bread and butter. It's a key ingredient in how coders can break away from the limits placed around people who just _use_ programs, and play in the area of people who _make_ them. The Pragmatic Programmer, once of the best coding books out there, calls Shell the coder's "workbench" and how your productivity will soar.

You don't need to know all of the Shell right away (this post is an _extremely_ high level overview). For now, know enough to see what it's capable of. How it can help you be more efficient. The critical role it plays in running code locally, managing your tools, setting up tests, and more.

Coders need the Shell to do their job best. It's not going anywhere. No matter how uncomfortable you are in the start, take a deep breath and start using it. Take it from your future self. From overcoming Imposter Syndrome to working well with colleagues, knowing the Shell always helps.
