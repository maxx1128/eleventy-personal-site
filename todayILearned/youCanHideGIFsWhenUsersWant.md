---
title: You can hide GIFs when users want to
category: Git
date: 2021-07-01
---

One of my favorite parts of CSS is it can change styling based on specific user preferences. For example, you can use `prefers-color-scheme` if a user tells its browser it wants to use dark mode. It's an easy way to make things easier for users on a case-by-case basis.

But one article I found shows I still don't understand the full extent of CSS's powers here. The [`prefers-reduced-motion` lets coders hide animations from users](https://www.htmhell.dev/tips/gifs-and-reduced-motion/) with sensitive eyes, vestibular disorders, or just find them irritating. As it turns out, [the responsive images `picture` tag](https://www.w3schools.com/html/html_images_picture.asp) can use it too!

```html
<picture>
  <source media="(min-width: 800px)" srcset="espeon-herd.jpg">
  <source media="(min-width: 500px)" srcset="espeon-large.jpg">
  <img src="espeon.jpg">
</picture>
```

You can also use `media` to show users an animated GIF if they haven't specified they want reduced motion. It also falls back to the static image for browsers that don't support the media query.

```html
<picture>
  <source media="(prefers-reduced-motion: no-preference)" srcset="espeon-glowing.gif">
  <img src="espeon-smile.jpg">
</picture>
```

You can see a quick example of this below. You'll see a different image depending on your device's accessibility settings. But each one sends the same basic message while matching what the user wants.

<picture>
  <source media="(prefers-reduced-motion: no-preference)" srcset="/assets/images/todayILearned/espeonMotion.gif">
  <img src="/assets/images/todayILearned/espeonMotion.jpg">
</picture>

This is another example of how progressive enhancement isn't all that hard. All it takes is a little extra planning and consideration. The payoff is that many more people can stay on your site longer. Everyone wins!
