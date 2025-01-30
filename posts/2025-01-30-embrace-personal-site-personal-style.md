---
title: "Embrace Your Personal Site's Personal Style"
date: "2025-01-30"
link:
  title: How I Built My Blog - 2024 “App Router” Edition
  url: "https://www.joshwcomeau.com/blog/how-i-built-my-blog-v2/"
  author: Josh W Comeau
---

**One of my favorite parts of being a web developer is the personal website.** They're creative canvases, work portfolios, and blogs for self-expression all in one. There's a near-infinite number of remarkable examples to get inspired.

The most recent one I found was Josh W Comeau's site, whose blog gets referenced a lot in front-end development newsletters. After reading [a recent post about container queries](https://www.joshwcomeau.com/css/container-queries-unleashed/), I found another post about his site's tech stack. I won't repeat everything here (I recommend reading it yourself), but some of my favorite parts were:

1. Blog posts are written in MDX or a combination of Markdown and JSX. This allows for a concise writing experience in Markdown and the easy addition of custom widgets or elements written in React and JSX.
2. MongoDB for simple database enhancements, such as like buttons that track the number of likes.
3. React Spring and Framer Motion for simple, intuitive animations.
4. Sandpack for embedded code playgrounds similar to CodePen. The big difference is they're hosted on his site directly, not CodePen.

This post was enough for me to start mentally planning to upgrade my site to the same tech stack to get all those same benefits. But I remembered an important quote from [a favorite book of mine](https://www.notion.so/maxantonucci/Essentialism-5d9b55b19e294eb1b564fb3a35812606?pvs=4).

> There are no solutions, only trade-offs

My site stack is 11ty, Sass, and virtually nothing else. The build is nothing but NPM scripts and a static site output. Any JavaScript is plain and sprinkled on the final working product. **I didn't consider it better or worse, but only with different trade-offs.**

1. I have minimal dependencies, making my site easy to run, mount, and launch. There are fewer chances of unexpected or breaking updates damaging the site.
2. The CSS and JavaScript files are easy to maintain since they're simple and custom. I can do what I want without being limited by a specific front-end framework.
3. Markdown files and fast build and rebuild times help me focus on my writing.
4. 11ty gives me just enough features, like footnotes and custom data collections, while being easy to set up.

I like my personal website, which is simple and easy to maintain while still letting me play around with different front-end tricks. I had a React-focused setup a while back with Gatsby, and while I had many more tools available, I got tired of what I saw as needlessly complicated templates and build processes. **I love running a single command and seeing my site pop up less than a second later. That's what makes my personal site, well, so personal.** Every developer should do the same with their sites!

That's not to say I'm not still looking for ways to improve it. I noticed that [a recent 11ty release has support for MDX.](https://www.11ty.dev/docs/languages/mdx/) Maybe I'll upgrade and start doing my version of embedded code demos.