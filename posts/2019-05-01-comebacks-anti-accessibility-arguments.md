---
title: "Comebacks for Five (Wrong) Arguments Against Accessibility "
date: "2019-05-01"
excerpt: "There's plenty of common arguments against web accessibility that are dead wrong. Here are five of them with some ready-to-go counterarguments."
image: 'a11y-comebacks.png'
tags: ['web accessibility']
---
As I and several other a11y advocates know, getting others to care about accessibility isn't easy. It should be, considering the many moral and business arguments for it, but it isn't. I've repeated these arguments many times online. Sometimes as direct responses, other times as painful screams into the void. There's still much work to do.

To make this easier, I decided to write some answers in advance. Below are five common arguments against accessibility I've heard, and my counterarguments. I write them so I and others can link to them next time someone online pesters us for answers to save us time and energy.

Let's get to it!

## 1) Most of Our Users Don't Need Accessibility

This is the most common response I've seen online, almost always from white guys. Why is that? My guess is it seems logical on the surface - if most people don't use it, why include it? Accessibility is like secret alligator pits. Few people use them in their apartments, so no apartments offer them. This makes sense and made it that much harder to find a place to live.

But that's based on the false idea that accessibility only helps people with constant or visible disabilities. **Some people do benefit more from an accessible site, but everyone benefits to some extent.**

<blockquote class="twitter-tweet" data-conversation="none"><p lang="en" dir="ltr">I was also tipped off this person is an asshole when they wrote a &quot;majority of websites don&#39;t have a large enough accessible user-base to make accessibility worth the development time.&quot;<br><br>That&#39;s a huge lack of empathy and good business-sense since it helps EVERYONE.</p>&mdash; Max Antonucci (@Maxwell_Dev) <a href="https://twitter.com/Maxwell_Dev/status/1072898353015517184?ref_src=twsrc%5Etfw">December 12, 2018</a></blockquote> <script async

A big point in [one accessibility post I wrote](https://dev.to/maxwell_dev/the-web-accessibility-introduction-i-wish-i-had-4ope) is remembering stress cases. Stress cases aren't only about what we see as disabilities, like blindness. They include temporary or environmental conditions that affect everyone. Even the privileged, able-bodied app's audience will deal with stress cases like:

* Breaking an arm
* Damaged or degrading eyesight
* Using the app on unexpected screen sizes
* Being in poor, or harsh, lighting
* Be on medication that hampers their cognitive functions
* Using bad wifi since they're on the run from bandits who didn't fall for the alligator pit traps

When someone points to their audience as a reason to ignore accessibility, they're wrong. **That group doesn't need an accessible site now, but they will. At some point everyone does. **Not building an accessible site means you risk alienating everyone (and losing their business).

## 2) We'll Add it Once We Need It

To be blunt, I see this as only an excuse to avoid accessibility altogether. I've been telling myself I'll replace the alligator pits' false carpeting, but I never did and look where I am now! (Please don't actually look since I need to lay low).

Back to the point, **putting off accessibility doesn't work since it needs to be a priority early on.** Many parts of every site will need to be redone if accessible markup and styling get added late. At that point, someone will then say "we can't change these components now, so we'll have to skip this." If someone complains about accessibility when the site's live, it's the same response. "It would change too much of the design, so we can't do anything."

This is like someone painting a room the color of blood and they'll change the color later if it creeps people out. When people get crept out the same person says repainting the room is too big a change to manage. It's a cop-out that lets someone blame a (usually) fake lack of bandwidth instead of it being a choice they made.

This is why it's important to get accessibility buy-in early on. The later it gets made a priority, the harder it is to work it on without disrupting what you built.

## 3) They Can Contact Customer Service With Issues

I heard this in a chat before and recently saw it play out on Twitter.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Sarah, I&#39;m very sorry to hear about your poor experience with us. If you would like to discuss this or if you are still having issues accessing our website please DM us with your contact number and a time that would be good for you to further discuss.</p>&mdash; People&#39;s United Bank (@PeoplesUnited) <a href="https://twitter.com/PeoplesUnited/status/1121597826058924032?ref_src=twsrc%5Etfw">April 26, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

This falls apart since **it violates a core tenet of programming: automating boring, repetitive tasks.** Compare the two below options and tell me which sounds more efficient.

1. Take an hour or two to build an accessible interface
2. Make your customer service staff waste hours each month handling complaints. They repeat the same interactions, making otherwise basic processes drawn-out and frustrating. Customers who don't call will give up and go to a competitor.

Yeah, the second one isn't ideal. Time and energy are down the drain when accessible interfaces could have saved them. This is cruel to customers, your coworkers, and your bottom line.

## 4) It's Too Difficult

Many developers have told me semantic HTML and testing stress cases are "too tough to bother with."

This is easy to knock down since **accessibility can be tough, but being a web developer is also tough. Get used to it.**

Good CSS is tough. Designing a database is tough. Taming alligators without alerting your landlord is tough. But doing tough things is what we're paid for.

JavaScript is tough, but developers know it's worth learning its rules and trade-offs. Accessibility is the same, only with different rules and trade-offs.

In a recent work project, it was tough to make an accessible dropdown menu since it needed:

* To expand and collapse with the mouse and keyboard
* Menu items that only have keyboard navigation when expanded
* Display right on mobile
* Not clash with other elements in the semantic markup, including a logo link and title
* Not break due to dynamic menu items

It was tough to handle this and other accessibility needs. But our job was to make it accessible. We did the research, wrote the code, put in the time, and made it work. _Because it was our damn job._

## 5) It Doesn't Matter

This is one of the harshest if honest responses: they don't give a crap about accessibility. I'll skip over the moral issues I find with this response, such as:

* Writing off huge numbers of people as "not worthy" of their site or project
* How the premise of the Internet is greater access to information and communication. Inaccessible sites ruin what makes it great.

I don't use these arguments against people who don't care about accessibility though. They're like people who somehow survive death via alligator traps. Their minds are angry, set in stone, and changing it is pointless without a tranquilizer. So until I perfect my tool to launch them at people through Twitter, I'll save my energy.

A better response is how **accessible websites help a lot from a business sense too.** Inaccessible websites hit these people in they definitely care about: their wallet.

I covered these in my past accessibility article too, but the three business benefits are:

1. A bigger audience, which means more customers and data. Inaccessible sites force users to the competition.
2. Fewer resources to customer service. You can reinvest these into expanding the company and the site's features.
3. Protection from getting sued over inaccessible websites. [Lawsuits against websites violating the Americans with Disabilities Act are only increasing](https://www.latimes.com/business/la-fi-hotels-ada-compliance-20181111-story.html).

No matter their feelings on accessibility, no one can ignore how it affects profits.

I'd prefer to persuade people with the "don't be a dick to others" argument. But I long learned some people don't care about morals or treating other groups well. The money argument is an unfortunate but effective way around that.

## Wrapping Up

Please remember this post next time someone pushes back against accessibility, online or in person. I encourage you to use it as a reference (or send them a link to save more time).

Our time is better spent on productive tasks like improving our accessibility knowledge, building better interfaces, and losing the trail of people who need to get over their alligator bites. Seriously, they'll heal in a few months. Move on!

_Have any other anti-accessibility arguments you've heard and the counter-arguments you gave? Please comment with them below!_
