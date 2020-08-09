---
title: "The Web Accessibility Introduction I Wish I Had"
date: "2018-10-23"
excerpt: "Another message to my past self, this time on the importance of accessibility, how to achieve it, and how to test it."
image: 'accessibility.jpg'
tags: ['web accessibility', 'Intros I Wish I Had']
---
Hello again, past self. I'm sending you another message from a future where it's finally getting colder, you got the guts to go to therapy, and that thing under the floorboards somehow escaped.

Most importantly, your future job responsibilities focus much more focus on web accessibility. This is great, since for front-end work it should be a top priority. If users can't use a site properly, nothing else matters. The downside is accessibility should have been more important to you earlier on.

This post aims to tell you, past self, a few key things about accessibility. I can't cover everything, but I can cover:

1. Why accessibility matters
2. Making a website accessible
3. Testing accessibility

Let's begin!

## A Wrong Idea About Accessibility

Before the rest, I must correct one major thing my past self got wrong about accessibility for too long: **accessibility affects _all_ users, not just those with stereotypical disabilities.** Accepting this means realizing accessibility is about building for stress cases.

Stress cases refer to any medical or situational conditions affecting anyone, all the time or at different points in their lives. Some common stress case causes are:

* Old age
* Chronic medical conditions like arthritis
* Being outside with a heavy sun glare
* Cognitive impairment from medication or lack of sleep
* Needing to use a site with different devices
* Shaky WiFi that affects asset loading
* Running from the thing that escaped your floorboards

These, and many others, are examples of stress cases, only some of which apply only to those with specific disabilities. Others apply to medical conditions that affect everyone eventually. Some are situational but still affect everyone.

This matters since it shifts your idea of accessibility from "it's not important since only some people have X disability" to "we need to cover all users in this stress case." This helps others better see why accessibility matters so much. It's also why, when talking about it with others, it's better call them "stress cases."

### More Arguments for Accessibility

If the above doesn't work for you, or coworkers from design or management, there's more arguments from a business perspective:

* Accessibility expands your app's potential audience, increasing profit and appeal.
* Accessibility decreases resources put towards customer assistance who need help, which can be reinvested elsewhere.
* Accessibility protects you from potential legal liability (at least in America, as part of the Americans With Disabilities Act). Just look at [the court case of the National Federation of the Blind v. Target Corp](https://en.wikipedia.org/wiki/National_Federation_of_the_Blind_v._Target_Corp.), which helped set the precedent of widely-used sites needing accessibility by law.

These arguments are good for persuading people you need buy-in from, but aren't programmers. They send a clear message of accessibility being good for the company, either to earn or save money.

## The Four Keys to Web Accessibility

Now that you know _why_ accessibility matters, lets get to the _how._ The most widely-accepted accessibility rules are the Web Content And Accessibility Guides 2.0, or WCAG 2.0 for short. They're universal rules for any technical interface, which is part of why they're so popular. They're also thorough in defining accessibility.

**The four main tenets of the WCAG 2.0 are in the acronym POUR - Perceivable, Operable, Understandable, and Robust.** There's specific sub-points for each, but I'll stick with a broad overview for now. I recommend reading through [the WCAG 2.0 checklist](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.0) for the details!

### 1. Perceivable

Simply put, being perceivable means **different stress cases don't stop users from reading, watching, or listening to your content.**

#### Typography

Perceivable content must be readable! Easy ways to make type more readable is giving text and background colors enough contrast so people with bad eyesight, or in bad lighting, can still read it. Typography should also lean towards larger sizes, and be easy to adjust the size, for the same reasons. It could even be because multiple people try to read one screen at once, can't get too close, and need larger type so they all can read at once.

#### Images

The most important thing with perceivable images is alt text. People who are blind, or can't load images due to shaky wifi, will still get a basic idea of what the image is. You should also never put important text as part of an image. Ever.

#### Audio and Video

Both audio and video content carry more stress cases around them. People with hearing difficulties, are in places that are very loud or quiet, or just prefer reading, can't or won't listen. Video transcripts are the easiest solution, but captions also work for visual-heavy videos.

### 2. Operable

Next is operable, which means **different stress cases don't keep users from getting to all the pages and filling out the forms.**

#### Interfaces and Navigation

This point is obvious - users should be able to interact with what they need to, like:

* Links to other pages
* Forms to fill out
* Buttons to click
* Traps to set up around doorways
* Anything else for moving around the site or sending/receiving info.

It seems obvious, past self, but it's also the most important part of the web, so it's worth double-checking. You'd be amazed how often these can slip through.

#### Keyboard Navigation

Take the last point and add a twist: only do it with a keyboard. Keyboard navigation covers many stress cases - screen readers, shaky motion control, medical issues related to dizziness and muscle control, an unreliable mouse-pad, or just personal preference. On your text editor you'll rely on keyboard shortcuts to work fast, which carries over to web browsing.

#### Progressive Enhancement

Progressive enhancement helps with stress cases where, even if some or all styling fails, things should still be operable. Forms shouldn't be unusable on older browsers that don't support newer CSS features - they can look simpler or cruder, but should still work. Progressive Enhancements helps by starting with a rock-solid, operable foundation and adding available features when possible. You can't control a user's browser, you can only prepare for their choices.

### 3. Understandable

Understandable is more, well, understandable than the other points: **Stress cases don't prevent users from understanding the sites' intended meaning.** This helps cover cognitive stress cases related to how users interpret your site's message.

#### Be Simple and Explicit

As George Carlin often argued, the best language is simple, honest, and direct. Writing inflated with corporate jargon looks impressive to designers and disgusts users. Straightforward writing is understandable and helps users develop trust your site. Otherwise they're less likely to pay attention or buy what you're selling.

#### Avoid Assumptions

You'll have lots of pushback from future designers on this. Many site elements work on the assumption users already understand their meaning. For example, assuming a "star" icon will favorite an item. That's obvious to you, but you'll never know how obvious it is to users. It may not be due to due to cognitive stress cases, cultural stress cases, or just people new to the web. Never rely on implied symbolism. It's quick, easy, and infinitely more accessible to add a caption or subtitle to ensure they're understood. If the designer cringes, don't be afraid to stand your ground.

### 4. Robust

Robust basically means **stress cases don't prevent users from accessing the content from a wide variety of devices.**

#### Semantic Markup

Semantic markup is the best way to make robust content that's accessible as a whole. For the web, this means:

* Semantic HTML tags
* Proper use of `aria` tags
* Logically ordering DOM elements
* Server-side rendering to ensure it's delivered properly

This makes content friendly to keyboard navigation, screen readers, and even a usable interface if CSS fails to load, plus more! Semantic, accessible markup gets you a long way to an accessible website.

#### Responsive Design

The more obvious example of device variety is screen size, such as:

* Smart watches (maybe)
* Mobile phones
* Tablets
* Large external monitors
* Projector Screens
* Movie screens when you become famous

Screen size arguably affects web apps more than other types, especially with the rise of progressive web apps. While no site can have the same experience across so many sizes or be the same pixel-by-pixel, they should still be usable and functional.

## Testing Accessibility

By now, past self, your head may be spinning with all these requirements. First off, remember the work is worth the reward. Second, you'll be glad to know you can automatically test many of them!

### Automated Accessibility Testing

Some things to automatically test with one or more tools are:

* Color contrast
* Semantic HTML
* Unneeded div elements
* Translated text
* ARIA and other accessibility attributes, like titles

All in all, I've found automatic testing covers at least 75% of my accessibility issues. But only on one condition: **accessibility testing must be added as early as possible in a project.** The later this happens, the more it's seen as "something to just tack on later." That's bad, since some fancy designs cannot be saved in terms of accessibility, and must be changed earlier on. Otherwise accessibility tests are doomed to forever fail when set up.

Your specific tools change will change for each project, so I won't go list examples here. You'll learn more by researching your own and seeing how thoroughly they cover the WCAG 2.0 guidelines.

### What You Can't Automate

Accessibility tests help measure factors related to stress cases, but not the actual stress cases. Some can simulate basic actions, like clicking elements, but that's not enough. As of this writing, the best way to do this is recreating the stress cases yourself. Some starting suggestions are:

* Navigate with a keyboard
* Navigate with a keyboard and screen reader
* Use a mobile phone
* Use a mobile phone in harsh sunlight
* Slow down your internet connection
* Break some, or all, of the CSS
* Get people less familiar with the site to browse around and do basic tasks
* Use a gray-scale color filter (for colorblindness)
* Use only one hand
* Use while shaking your hands to simulate arthritis or muscle pain
* Use while tired (or drunk) or simulate cognitive impairment
* Use while running for your life down the street, being chased by a freed monster seeking revenge

My recommendation is making a checklist of different stress cases, and cover as many as possible from most important to least. This way if you can't recreate them all, you at least get the ones affecting the most users.

## Never Forget Accessibility

If there's anything you should remember, it's what I wrote at the start: accessibility is about stress cases that affect everyone. That's why it's more than a "nice to have." **Accessibility is as fundamental as database management, app architecture, data security, or long-range tranquilizer guns - without them things quickly fall apart and may go up in flames.**

Sadly, none of your early education and scarce college courses put enough focus on it. So you need to keep researching accessibility methods yourself, making the case for it, bringing it to apps early, testing it, and sharing that info with others. It's tough for sure, but always worth the investment for both your company and the good of the open web.
