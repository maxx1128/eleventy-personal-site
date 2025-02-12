---
title: "What is Programmatic Determinability?"
date: "2021-01-15"
excerpt: "Programmatic Determinability is a big part of accessible websites. It's about clarifying what seems obvious, then getting cheesecake."
image: "programmatic-determinability.jpg"
featured_image_link: https://safebooru.org/index.php?page=post&s=view&id=3225522
---

The phrase "programmatic determinability" appears a lot in the Web Content and Accessibility Guidelines (WCAG). It's also the kind of phrase that could make you sound smart or conceited, depending on how you use it. For these two *very important* reasons, I wanted to figure it out.

[The official definition of "programmatically determined"](https://www.w3.org/TR/WCAG21/#dfn-programmatically-determinable) kind of helped, but only kind of.

> Determined by software from author-supplied data provided in a way that different user agents, including assistive technologies, can extract and present this information to users in different modalities

This is a bit...dense. So I want to unpack it a bit.

## A Conversation Between Users and websites

The most succinct definition I can think of **programmatic determinability stops misunderstandings between users and websites.**

Sometimes you get into arguments with people who refuse to say why they're upset. No matter how many questions you ask, they only give variations of "I'm upset and you should already know why." It's impossible to reach any kind of agreement or resolution, and most likely you storm off on them with less-than-pleasant thoughts.

A better scenario is you meet someone upset, and when you ask why, they say they're upset a store no longer sells their favorite cheesecake. You probably can't fix the underlying issue, but now you can do more helpful things like:

* Share a similar experience to show them they're not alone
* Offer to get some cheesecake from a new place so they see there are still options out there
* Join them in their rage so they blow off steam by smashing cheesecake cardboard cutouts you coincidentally have lying around
* Offer use of a time machine to go back to when it was still sold so they can have it one last time and bid their cheesecake a fond farewell. Then the clouds part, the light shines through, and they can take another step forward in life as the credits roll.

The first fruitless, frustrating argument version is a website without programmatic determinability.

Your website (the angry friend) isn't giving enough information to users using assistive technology (the frustrated friend). The user asks but gets nothing, doesn't know what to do next, and leaves in a huff.

Want to avoid that scenario? **That website needs that info in a coded format the browser can understand. Then the browser can share it and the two friends, user and website, can finally reconcile. This is programmatic determinability.**

## Share "Obvious" Info with Users

Here's a specific example: say an English-speaking user visits a website written in a foreign language. They know it has information they need to read but can't understand it. If the computer could talk, their interaction could go like this:

* **User:** I can't understand what you're saying, webpage. What language are you in?
* **Webpage:** How are you not able to understand me? Everyone else can.
* **User:** Well, I can't. Do you know English?
* **Webpage:** What's English?
* **User:** How do you not know that?!
* **Webpage:** I don't know, you should just speak my language.

It goes back and forth like this for a while until the user quits from frustration. They tell all their friends how uncooperative the site was and its reputation suffers and dies on a neglected 404 page.

The site in question forgot the `lang` attribute on its `html` tag. Without that, the website couldn't tell the user it was written in Italian. It can't share the info that would end this fight between user and website since it isn't programmatically determinable.

The `lang` attribute is the coded way the browser can understand what the language is. When it's included, the exchange may go like this.

* **User:** I can't understand what you're saying, webpage. What language are you in?
* **Webpage:** I'm written in Italian. Most of my users read that.
* **User:** I get why you'd think that, but I can only read English. Do you have any translation options?
* **Webpage:** I don't think so, but something like Google Translate can help. When I tell it my language, it'll do a rough translation to English.
* **User:** That'll work for now. Thanks!

Now the relationship is saved, the user isn't lost, and they can go out for cheesecake together later!

Many accessibility issues can be boiled down to this kind of argument between users and inaccessible webpages that don't communicate well.

* It seems obvious where the navigation, sidebars, and main content are located in your layout. But some people won't see the layout. So you should share those relationships with roles or semantic markup.
* It seems obvious what's being shown on an image. But some people won't see the images. So you should share descriptions with `alt` tags.
* It seems obvious what you're alerting users to with brightly-colored banners. But some people won't see those bright colors, or see the page at all. So you should share how important they are through explicit text, and ARIA live regions or alert roles.

These take even more forms - knowing how to solve them for as many users and websites as possible is part of the never-ending accessibility journey. Programmatic determinability is only one part of it, albeit one of the most important ones.

Keep it in mind, and your users will never miss out on cheesecake with your website again.
