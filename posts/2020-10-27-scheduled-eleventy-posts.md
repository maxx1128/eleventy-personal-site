---
title: "Scheduling Blog Posts with Eleventy, Netlify, and IFTTT"
date: "2020-10-27"
excerpt: "Eleventy makes it easy to automatically publish future blog posts with a little JavaScript and some outside app help."
tags: ["javascript"]
---

There have been many benefits to moving my personal site from Jekyll to Eleventy: better build speed, not mixing Ruby and JavaScript in the pipeline, and getting a big tax writeoff. I still love Jekyll since it's what got me into static site generators, but Eleventy may have become my new default.

One of my favorite benefits is how I can schedule future posts. Any Jekyll solution I tried was inconsistent and had overly-complicated template logic at best. At worst, I tried sending new blog posts back in time and [nearly got my loved ones killed and/or caught in an authoritarian hellscape ruled by French scientists](https://tvtropes.org/pmwiki/pmwiki.php/VisualNovel/SteinsGate).

But Eleventy, with a little help from [Netlify](https://www.netlify.com/) and [IFTTT (If This Than That)](https://ifttt.com/home), helped me avoid those unmaintainable or dystopian workarounds. I'm sure this interests other casual bloggers and freedom fighters, so I wrote this blog post!

## Filter out Future Posts

The first step is straightforward: how do I keep Eleventy from showing future posts?

One Eleventy feature I love that Jekyll lacks is to hook into the build process. It lets you add custom collections, tags, filters, and other functionality. So I tried making a custom "hide future blog posts" collection.

This was my default JavaScript setup to gather and organize my blog posts.

```javascript
eleventyConfig.addCollection("posts", function (collection) {
  return collection.getFilteredByGlob("./posts/*.md")
    .reverse();
});
```

This returns a simple array of blog post objects. And in JavaScript, arrays have a built-in way to take out items you don't want: the `filter` method! All I need is to write and pass in a filter function that removes future posts.

Here's what I started with, with `post` being any potential blog post the filter had to check.

```javascript
const hideFutureItems = (post) => {
  let postDate = post.date;
  // ...what else?
}
```

`postDate` here is a timestamp in Coordinated Universal Time, or UTC, format. Something scheduled for October 23rd would have `2020-10-23T00:00:00.000Z` as that value. I played around with this value and found it was being made with [JavaScript's Date Reference](https://www.w3schools.com/jsref/jsref_obj_date.asp). It's one of the language's built-in ways to manage units of time.

I checked the documentation, and found a method called `getTime()`. It returns the number of milliseconds between January 1st, 1970 ([the standard beginning Unix timestamp for reasons not important for this post](https://stackoverflow.com/questions/1090869/why-is-1-1-1970-the-epoch-time#1090945)) and the specific date. For example, October 23rd, 2020 returns `1603411200000` milliseconds.

This seemed silly and obscure, but it gave me an idea.

1. Get the number of milliseconds based on the present day.
2. Do the same thing for the post's date.
3. If the post's milliseconds are **higher** than today's milliseconds, it means the post's date is **after** today. That means it's a future post and will return `false` to exclude it.
4. All other posts should be included by returning `true`.

The result is a smug, satisfactory feeling of smartness...and this function I added to the collection function.

```javascript
const hideFutureItems = (post) => {
  let now = new Date().getTime();
  if (now < post.date.getTime()) return false;
  return true;
}

```

```javascript
eleventyConfig.addCollection("posts", function (collection) {
 return collection.getFilteredByGlob("./posts/*.md")
   .filter(hideFutureItems)
   .reverse();
});
```

With that, I exiled all future posts from my website!

## 2) Set Up Daily Deploys

Everything so far is good but has a major blind spot. **The date the site sees as "today" is only set when I generate the site pages.**

Let's say I relaunch my site on Tuesday that included a scheduled post for the next day. The site's going to think it's still that exact Tuesday for days and even weeks afterward. I could only "schedule" posts if it checks the date and rebuilds itself each day. But relaunching my site each day is the kind of monotonous chore I want to avoid!

That's where Netlify and IFTTT come in.

First, [Netlify lets you add build hooks](https://docs.netlify.com/configure-builds/build-hooks/). These are URLs you can send a POST request to that trigger new builds. I set one up for daily builds and copied the given URL.

<img class="block mx-auto mb-4 sm--width-75" src="/assets/images/posts/scheduled-eleventy-netlify-posts/netlify-build-hook.png" alt="">

Now I had to hit this URL each day. I remembered IFTTT as a tool for making simple, conditional web actions. So I can link their "time" and "webhook" services together into "send a POST request to this webhook every day at 7 am."

<img class="block mx-auto mb-4 sm--width-75" src="/assets/images/posts/scheduled-eleventy-netlify-posts/ifttt-redeploy-applet.png" alt="">

There are some costs to this. I saw Netlify has set up built-in bandwidth and build time limits for starter accounts like mine. But considering how light and speedy Eleventy builds are, and I don't have any heavy apps hosted on Netlify, these shouldn't be an issue for casual bloggers like myself.

## In Conclusion

Moving from Jekyll to Eleventy wasn't easy, but on the whole, I've found it worth it. If you're a programmer looking for a personal website side-project, I recommend this. If not for all these perks, at least do it to distract your mind from the field of damnation that is the world.

So happy scheduling!
