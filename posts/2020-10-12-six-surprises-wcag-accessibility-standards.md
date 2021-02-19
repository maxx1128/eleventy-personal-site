---
title: "Six Surprises I Found in the WCAG 2.1 Accessibility Rules"
date: "2020-10-12"
excerpt: "I'm broadly familiar with the current accessibility standards. But when I took some time to read them in detail, I learned some unexpected lessons."
tags: ["web accessibility"]
image: wcag-surprises.jpg
featured_image_link: https://safebooru.org/index.php?page=post&s=view&id=966024
---

I've been settling into my accessibility specialty for a while. But I'm ashamed to say I haven't spent much time looking over the Web Content Accessibility Guidelines (WCAG) in detail. I've read through the larger goals, like being Perceivable and Operable, and the most common criteria websites struggle with, like color contrast. But I haven't poured over the specifics of each rule as much as a specialist should. Looking closer at even the simplest rules reveals nuances, gotchas, and alien messages most people would overlook.

So I used a recent accessibility audit as a chance to look more closely at the WCAG 2.1 requirements. Even with everything I've already read, I found unexpected bits on the rules I knew, and even some rules I'd overlooked altogether. These are six of the bigger overall surprises I found and how they changed my understanding of the standard.

## Skip Links Aren't Always Needed

I've read so many articles saying users need "skip links" to jump over repetitive content like the menu. It saves time and aggravation for keyboard and screen-reader users. [The 2.4.1 success criterion refers to these mechanisms as a "bypass block."](https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html) It mentions skip links as an example of a bypass block, but there's another way!

This other way is with landmarks, which are how assistive tech finds elements with specific roles. Proper landmarks make it easier to know where the navigation, main content, sidebar, and whatever else are. Users can then jump between them and read their content much easier.

For example, say you're using the screen-reader tool VoiceOver on a Mac. You go to a web page and [you can open up VoiceOver's "rotor" menu](https://bbc.github.io/accessibility-news-and-you/accessibility-and-testing-with-voiceover-os.html). This breaks down the page's content in many useful ways. You can see elements like:

* All the site landmarks
* A list of all the links or headings
* Any form inputs with their current info or state

From any of these, you can jump to their place on the page. This is the screen-reader user's version of skimming over a webpage and jumping to what they need.

I've used VoiceOver to test out webpages before, but this was the first time I'd tried the Rotor menu. **It showed me the direct benefits of "good semantic markup" and "readable link text."** Before this, I'd pushed for them while only having a more abstract idea of how they helped.

Perhaps most important, I found new ways to improve my site's accessibility. With other content and styled stripped away, I more easily saw repetitive or vaguely-named links, too many article tags, and weirdly named heading text. This was a reminder that you can get the technical markup right but still give a muddled experience that damages accessibility. It drives home more how important manual testing and direct experience are. [The infamous article where Manuel Matuzovic builds an inaccessible webpage with a perfect Lighthouse score drives this point home even better](https://www.matuzo.at/blog/building-the-most-inaccessible-site-possible-with-a-perfect-lighthouse-score/).

In the end, the biggest surprise wasn't that I may not need a skip link. It was seeing the reason why I didn't need one, and the new things to learn it exposed me to. **I made a note for the future: I have a lot more to learn about using a screen reader.**

## Some Common Tips Aren't Commonly Needed

I've read so many articles recommending some accessibility fixes, I assumed they were required for the AA standard most businesses need to meet. Some of those tips include:

- Make sure any interactive elements on the phone are at least 44 pixels wide and tall. There are a few exceptions, like for inline links in the text.
- Get rid of long words and unneeded jargon to lower your content's reading level. This makes it easier for users with cognitive stress cases or who have a lower level of education. [Tools like the Hemingway app can break down the reading level in real time](http://www.hemingwayapp.com/).

Turns out they're not the main requirements! The actual success criterion, 2.5.5 for touch target size and 3.1.5 for reading level, are both at the AAA level. **This is the highest level due to these requirements taking a higher level of time and resources to meet. They also may not be possible for many types of content.**

I can understand why a low reading level isn't always possible. Some content, by its very nature, will be full of unavoidable jargon. A website for Neurology case studies can't be simplified or explained easily to people who don't know the subject.

But I don't understand why touch target size isn't at the AA or even A level. It doesn't make sense for businesses needing to make websites responsive for mobile devices, but not make those mobile interactions easier with larger touch elements. Even if it's not a legal requirement for most companies, I would still treat it as such considering how much it helps users.

## Consistency Really Matters

Consistent content is understandable content. Changing the explicit or implicit rules of your site without warning will upset anyone. But there were some consistency rules I still didn't expect.

Criterion 3.2.2 for inputs says that entering data should be predictable and not cause unexpected context changes. The explanation makes a distinction between context and content changes. A user on a restaurant website selecting an "order online" checkbox and seeing a list of menu items appear below it passes — the meaning or purpose of the page doesn't change.

But selecting an "order online" checkbox fails if checking it does things like:

* Opening a new tab
* Focusing on a new element or input
* Changing the inputs to a dog adoption form

These changes disorient users that are dealing with cognitive stress cases, using assistive tech, or just in a terrible mood and don't want to be jerked around. **You can be the most able-bodied person in the world, and a site that drags you all over the place would make you want to break things.**

A bit further down the list, criterion 3.2.4 says components with consistent functionality need consistent identification. A search component needs a "search" label on every page, not a "search" on the menu and a "find" somewhere else.

But that got me thinking, how consistently does this mean? Am I allowed to use "search authors" in one place and "search posts" in another? The content is different, but the functionality is the same, so they should both use "search." But should the input label only have "search" and some helper text above it says "find your favorite author?" Or is what we have now consistent enough?

I'm leaning towards the former as a safer option, but my mind is still spinning like a hamster wheel. These are the thoughts that keep me up at night. That and why that moving spill-detector robot at Stop and Shop is out to get me.

## You Can Give Too Much Clarification

I've read many tips that boil down to "don't assume your user has the knowledge they may not have." For example, don't assume users will understand the meaning of an icon. The page should tell their meaning explicitly with icon text, like adding "About Us" to an icon of a group of people. So whenever I was in doubt, I wrote more to make things clearer.

But a quote from [the documentation's explanation of the 3.3.2 criteria on labels or instructions](https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html) showed me that's not always good.

> Too much information or instruction can be just as harmful as too little. The goal is to make certain that enough information is provided for the user to accomplish the task without undue confusion or navigation.

Simply put, too much text crammed together is just as unhelpful as too little. This seems obvious now, but seeing it in the official rules drove home how I'd forgotten it. Even as I got indirectly reminded of it again while reading some manga.

![A sports commentator in a football comic recapping the game in so much detail, no one is going to read it.](/assets/images/posts/wcag-surprises/eyeshield-too-much-clarification.png)

All this made me wonder why this paragraph was added at all. My guess is this rule takes into account the cognitive bias that if we understand something, we assume others will too. But a lot fewer people than we'd think, if any at all, have the same foreknowledge or intuition with our website that we do.

It's another reason why meeting the WCAG guidelines matter. **They help us avoid having our cognitive biases make things tougher for the user without us even realizing it.**

## You Need to Identify Language Changes Within the Page

For accessible HTML, one of the first tips I always see is including `lang="<en/es/it/whatever>"` on the `html` tag. This tells the browser what language the page is in. I'm guessing it's often the first tip since it's important yet easy to do, which eases people to the tougher tasks.

What I didn't know from criterion 3.1.2 is this applies to passages or even phrases of a specific text. If you're using a blockquote to share an Italian proverb like this:

> Far d’una mosca un elefante.

You'll need the `lang` attribute in the blockquote too.

```html
<blockquote lang="it">
  Far d’una mosca un elefante.
</blockquote>
```

If you don't do this, the assistive tech could real Italian language as if it was English. Here I thought the `lang` attribute only when on the `html` element — turns out it's got a day job too.

## Sensitive Content has Extra Rules

Any website where you submit info on legal or financial transactions has an extra responsibility to their users I hope they know about it. Criterion 3.3.4 says these submissions have to be either reversible, checkable, or confirmable. All these help avoid mistakes in decisions that could have wide-ranging effects if done carelessly.

This has obvious benefits for users dealing with cognitive or memory stress cases. But it's also useful to *anyone* on these sites. **Any person would want to an "undo" button for financial or legal decisions.** You have to be able to double-check the amount of money you're wiring to a deposed Nigerian prince. It's another clear example of how the WCAG standards help all users, not just "disabled" users.

Having this kind of "undo" button in real life would be even better. But that's a ways away, so we'll have to settle for it in web forms for now.

## In Conclusion

I feel a bit more educated on the WCAG standards after learning all these details, but I still have a ways to go. There are so many criteria I haven't read through all the details of. There are even a few surprises I couldn't work into this post, like how some websites make us see shadows in the corners of our eyes at night. It's all great info, but it's a lot and can get pretty dense.

None of this learning will happen overnight. But I still look forward to it all.
