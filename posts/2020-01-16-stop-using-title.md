---
title: "Stop Using the Terrible Title"
date: "2020-01-16"
excerpt: "Title is an HTML attribute you can technically use but never should. For the sake of your website, health, and future children. Escape it while you can."
image: 'stop-title.jpg'
tags: ['web accessibility']
---

I'd like to talk about `title`. Hopefully for the last time.

`title` is an HTML property you can use for a small tooltip effect on the text. Give an anchor tag a `title="I'm a link!"` attribute, and you'll see "I'm a link" when you hover over it.

<span title="I'm some title text!">You can see the same effect by hovering over this sentence.</span>

**I said you "can" use it, but you shouldn't. Ever. Just don't. Forget this attribute exists and move on with your life.**

There are two reasons I usually hear for why someone used `title`: for the tooltip, or a more readable version text alternative. Both are bad reasons.

## It's a Terrible Tooltip

Text in `title` is invisible to those with touch/mobile devices, keyboard users, people using assistive tech, or people who can't position the mouse over the element just right for long enough. **In other words, [more than a majority of users can't see tooltip text](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title#Accessibility_concerns).** Even people who fall in the smaller "can use tooltips" group just not notice them. So it's unreliable for informing users about, well, anything.

You're better off making the text more explicit or detailed so a tooltip isn't needed. If that's not an option for some reason, [try a custom tooltip solution instead](https://inclusive-components.design/tooltips-toggletips/). It'll be more work, but it'll also actually work.

## It's Terrible Alternative Text

If there's an acronym and you think `title` can best explain what it stands for, there's a simpler option: write out an acronym the first time you use it. **You can avoid "more readable alternatives" by making the text itself more readable.**

If you can't make the text readable for some (bizarre) reason, `aria-label` is a better option, but it shouldn't be your first.

## Title is Simply Terrible

All this adds up to `title` being of so little use with so little reach, there's little point using it at all. Unless it's inside the `<head>` tag or about headings, I don't want to hear about titles anymore.

Clear it from your memory. Move on with your life. You'll find it's more beautiful without it. You'll notice colors more and get more joy from hobbies. Bills will get easier to pay. You will have more energy and be able to fly.

You are now free. The lambs have been silenced. Live your life as you've always wanted.
