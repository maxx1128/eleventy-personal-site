---
title: "What I Didn't Know in the 2020 State of CSS Survey, Part 1"
date: "2020-11-06"
excerpt: "The State of CSS Survey recommends those who take it learn more about what they aren't familiar with. Challenge accepted."
image: "css-survey-1.jpg"
featured_image_link: https://safebooru.org/index.php?page=post&s=view&id=2298263
---

<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Like all humans, I like answering questions since it makes me feel smart and powerful on an unconscious level. My most recent indulgence of this was the 2020 State of CSS Survey, which has the added benefit of helping my industry. But it was mostly for that first reason.

That got thrown off when I saw how many CSS topics I knew little or no details about. I took note of them all as I filled out the survey. When I'd finished, I saw the survey was thinking the same thing as me.

![A recommendation from the State of CSS survey to learn more about the topics I was not familiar with.](/assets/images/posts/css-survey-1/css-survey-recommendations.png)

The catch is there were so many things I wanted to check, I couldn't fit them into one post. So here's the first part with what they recommended I check first, and with the rest coming later.

## Logical Properties

If you're like me, you read web content in English, which is read from left to right. Let's say I was coding a blog post layout and needed some extra margin where the text started. I'd add some CSS like this, right?

```css
.blog-content {
  margin-left: 2rem;
}
```

However, plot twist! Not everyone on the Internet reads in the same language. Some people, shock of shocks, read it in languages that don't go from left to right. For example, Arabic and Hebrew alphabets are read from right to left. Chinese and Japanese can be written vertically from right to left. So that `margin-left` for "the starting side of the content" won't work if the user switches to one of these languages.

I admit these are unlikely to virtually impossible scenarios for many sites. For some, like personal developer blogs run by twenty-somethings who finally gave up on Internet fame, these are extreme edge cases. But it still happens, and front-end developers are all about building in solutions for a cohesive, inclusive experience.

That's where logical properties come in. We could rewrite the above CSS to something like this.

```css
.blog-content {
  margin-block-start: 2rem;
}
```

Now the margin's position is set relative to the start of the writing mode. **If the user is using a left to right writing mode like English, it's put on the left side. Right to left writing modes go on the right side automatically.** Used right (pun intended), logical properties keep layouts accessible in the face of different languages and reading styles. The current spec lets you use them for margin, padding, border styling, and absolute positioning.

[You can read a much better, more detailed explanation of logical properties from Rachel Andrew here](https://www.smashingmagazine.com/2018/03/understanding-logical-properties-values/). Or you can see a quick demo of hers below.

<p class="codepen" data-height="450" data-theme-id="light" data-default-tab="result" data-user="rachelandrew" data-slug-hash="yvGEbZ" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Grid and writing-mode">
  <span>See the Pen <a href="https://codepen.io/rachelandrew/pen/yvGEbZ">
  Grid and writing-mode</a> by rachelandrew (<a href="https://codepen.io/rachelandrew">@rachelandrew</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

I should note at the time I'm writing this, there's little browser support for this feature. But it's good to get a basic understanding early on so you're ready to use it when you can.

## Contain

Some parts of a webpage may change even after it's loaded up. A list of recent tweets on a personal site may show new tweets as they're posted. A browser will see this happen and need to figure out exactly what's changing and optimize for it. But sometimes a browser may try to optimize the entire webpage around the change, not just the Twitter widget showing the new tweet. That's quite bad for performance.

`Contain` tells the browser it'll only need to optimize things for that area. So I could add this to my Twitter widget:

```css
.twitter-widger {
  contain: layout;
}
```

**This tells the browser "if you see a change in this element, only optimize things for it and not the entire page."** How the browser actually handles this depends on the browser itself. This property only lets developers pass that info along.

I used `contain: layout` in this example, but there's actually other values you can use with different effects. Once again, [Rachel Andrew already explains the specifics of CSS Contain better in this (better) article](https://www.smashingmagazine.com/2019/12/browsers-containment-css-contain-property/).

## backdrop-filter

I've seen lots of blog post designs built around text placed over a big banner image. My own blog used a design like this until recently. The problem is text right on the image is hard or impossible to read. A common solution is giving it a solid color background, which isn't too pretty but makes it readable.

There's another, more stylish way with `backdrop-filter`!

For any design with a visual right behind an element, like a banner image behind a blog title, this property can be helpful. **Instead of blocking it out from the blog title entirely, it can add filters between the title and the image acting as the backdrop. The filters only affect the overlapping area, not the entire backdrop.**

With this, we can add a few filters to make a "frosted glass" effect. I can blur the image, lower the contrast, and brighten it up.

<p class="codepen" data-height="453" data-theme-id="light" data-default-tab="result" data-user="max1128" data-slug-hash="VwjdZMY" style="height: 453px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="CSS Survey Backdrop Filter example">
  <span>See the Pen <a href="https://codepen.io/max1128/pen/VwjdZMY">
  CSS Survey Backdrop Filter example</a> by Maxwell Antonucci (<a href="https://codepen.io/max1128">@max1128</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

Now the text is easier to read while letting the original image shine through for a sleeker, more polished effect. Most browsers supported this except for IE and Firefox. I happen to use Firefox a lot, so I hid `backdrop-filter` behind a `@supports` query with basic light blue background color as a fallback. Progressive enhancement always wins!

## touch-action

[This touch-events article from CSS Tricks](https://css-tricks.com/almanac/properties/t/touch-action/) has a good example of where to use these. Say a user on a mobile touch device is trying to zoom in and out with pinch gestures. But instead of interacting with the map, they're just zooming in and out of the page itself. The browser event listeners are set up to see "pinch gesture" as "zoom in and out." So the developer needs to override and remove those for this map!

**Before, coders would need to handle this with JavaScript by hooking into the page or component and overriding the needed gestures. But `touch-action` lets them specify any touch events to keep from the CSS.**

```css
.map {
  touch-action: none;
}
```

This turns off all browser touch events for the map, and any others need to be added through the JavaScript. But it also lets developers specify which events to keep.

```css
.map {
  touch-action: pan-x pan-y;
}
```

This tells the browser to only handle touch events for panning around the map, while turning off the rest (like zooming). The end result is developers have more control over their user's touch experiences before they get messy and out of hand.

...I'm going to ignore how dirty that sounded and move on.

## overscroll-behavior

There have been times I used websites with modals.

They were dark times I don't like to discuss, but I need to for this example. So bear with me if I stare off and scream for a moment.

Let's say a site has a particularly evil modal with so much content, a user needs to scroll through it. They scroll through it real fast, abruptly hit the end without noting fast enough, and keep on scrolling. The user will be scrolling within the modal but wind up scrolling down the whole page by accident. It's not fun and makes it easy to lose one's place.

This unwanted event is called "[scroll chaining](https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior)," and it's something `overscroll-behavior` aims to stop like so:

```css
.modal-content {
  overscroll-behavior: contain;
}
```

**If you're scrolling in that area, even when you reach the end, it won't ever scroll you past that area.** You can check this out in action below if you're using a supportive browser (which is now most of them aside from IE and Safari).

<p class="codepen" data-height="525" data-theme-id="light" data-default-tab="result" data-user="max1128" data-slug-hash="XWKBQJb" style="height: 517px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="overscroll-behavior example">
  <span>See the Pen <a href="https://codepen.io/max1128/pen/XWKBQJb">
  overscroll-behavior example</a> by Maxwell Antonucci (<a href="https://codepen.io/max1128">@max1128</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

Now the user will reach the end of the modal content and go no further, as God intended.

## overflow-anchor

Let's say a user is scrolling down a long webpage and stop at an interesting paragraph. Unknown to them, an unloaded large image is lurking in the areas they just scrolled by. When the user least suspects it, the webpage attacks by finishing the delayed image load! It's a sneak attack that pushes the webpage down, changing the visible viewport, and making users lose their place. Evil triumphs again and the credits roll.

Actually, this probably hasn't happened to users as much lately in most browsers. That's because [browsers have something called scroll anchoring](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-anchor/Guide_to_scroll_anchoring). When the large image tries to mess with what a user is reading, the browser adjusts their scroll position to match the change. While the scroll position changes, what the user sees doesn't change, and good wins the eternal battle against the vile.

This is possible due to the `overflow-anchor` property, which defaults to `auto` to enable this behavior. For the first time, evil is defeated while good men do nothing.

But there may be rare cases where you don't want good to win. A webpage may have custom scroll behaviors, difficultly loading images, or the developer wants to watch the world burn. **Support for the `overflow-anchor` property lets them disable scroll anchoring.**

For these edge cases or debugging. You monster.

## font-variant-numeric

I won't lie, despite this property seeming so simple, it took me the longest to wrap my head around.

**The simplest explanation I have is it changes the default way certain numbers are shown.** These are mainly style changes, like showing a slash through a zero, or if fractions should have a slash in the middle. This can make things easier to read or understand for users, depending on what they're used to.

Let's say I want to change how numeral expressions like "1st" and "3rd" appear on my website. `font-variant-numeric` can change that in ways that are both correct and incorrect.

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="html,result" data-user="max1128" data-slug-hash="rNLrLjb" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="font-variant-numeric Example">
  <span>See the Pen <a href="https://codepen.io/max1128/pen/rNLrLjb">
  font-variant-numeric Example</a> by Maxwell Antonucci (<a href="https://codepen.io/max1128">@max1128</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

I personally see limited use cases for a feature like this. But that could be because it's outside my range of experiences or needs, so I'll limit my judgment for now.

## font-display

You remember the "flash of invisible text (FOIT)," one of those problems that haunts designers and developers in the dead of night? When coders set a custom font, but until the font loads, it's invisible to the user and flashes onto the page after most or all of the page is already there. It doesn't break anything, but it's jarring and the stuff of nerd nightmares.

**`font-display` brings us one step closer to fully solving this issue. It tells the browser to use a fallback font while waiting for the other font to load.** There are a few different options for how to approach this:

1. Use the fallback font right away. This can create a "flash of unstyled text."
2. Wait a little, and if the custom font isn't ready, use the fallback font until it is.
3. Same as the second option, but it sticks with the fallback font if the browser figures the custom one won't be used at all.

The problems around trying to load different fonts and how they affect what users see likely aren't going anywhere. But developers at least have more choice and control over which problems they'll get. This makes it easier to work around them or design better solutions.

## In Conclusion

I learned a lot from the 2020 State of CSS Survey and writing this post, but I haven't even gotten through half the items on my list. So stay tuned for future posts with even more new CSS knowledge goodness!
