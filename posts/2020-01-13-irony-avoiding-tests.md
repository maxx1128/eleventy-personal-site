---
title: "The Ultimate Irony When I First Avoided Tests"
date: "2020-01-13"
excerpt: "In an early job I skipped writing tests, thinking it would make my code more flexible and maintainable. I slowly found it did the exact opposite."
image: 'irony-tests.png'
featured_image_link: 'https://safebooru.org/index.php?page=post&s=view&id=1377551'
tags: ['career']
---

One of my new year resolutions is finishing notes on two foundation programming books: Clean Code and The Pragmatic Programmer. Both are dense but worthwhile reads. They explain concepts you'll likely carry throughout your career. I recently finished Clean Code's informative yet painful chapter on Unit Testing. As in, I started having anxiety-inducing flashbacks to a previous job. As I write this, I'm running on three hours of sleep, have bags under my eyes, and have consumed nothing but ginger ale and bread scraps to keep the shadows at bay.

Why, you ask? That chapter laid out how tests keep a codebase maintainable and flexible. **I realized the horrors of my past had taught me the same lesson, and this chapter was confirming it all over again.** Had I read this book before, I could have spared myself much pain and carpal tunnel.

As part of both my recommended recovery, and to help you avoid a similar path, I'm sharing that story here. I don't expect most people to run out and read Clean Code (though I recommend it), but my story has the same message. At its heart is a great irony in why I decided not to write tests, and how it came back to bite me in the brain stem.

So relax, pray, and enjoy!

## At First, Saying No to Tests

A couple of years ago at one of my first jobs, my duties included building a new pattern library. It was for a third party to make small web pages for our main client. It would be a mix of old and new components, and my job was updating and managing the styles.

I was the only full-time programmer there most of the time I worked on it. I was balancing other responsibilities so my time was often limited. I needed the pattern library work to be fast, flexible, and maintainable. Adding an entire suite of tests seemed like a bad move. It'd be a new section of code to write, deal with, and worry about as I try to make changes. They seemed counter-intuitive and wasteful.

That was not the case at all, as I would soon learn.

## The Growing "No Test" Rot

The first sign of my mistake came in about a week. We'd made some changes and sent the pattern library over. The third party found a couple of unexpected bugs and sent a report over so we could fix them. We shrugged and did so, thinking that was that. The next day we got another email about a few more bugs we missed popping up. This cycle repeated one or two more times before it finally stopped.

Then it happened again for the next release, but worse. People started to get pissed off. I started getting anxious.

Turns out there were some style leaks in our components. These were due to poor style architecture and how we nested components. In our pattern library, this meant every release guaranteed a few unexpected bugs. Often in ways that we could never predict.

The solution was terrifying: **any kind of change meant we had to manually check each component.** We'd need to check them on different browsers and old devices too for our client. There was lots of internal feedback and iterations as the deadline approached. I'd often need to check several times in one day.

This added up to wasting literal hours every week or day going through dozens of component pages. It was mind-numbing and tedious to the point where I was prone to silly mistakes or skipping items. Someone would see this and make me repeat it all, wasting even more time. Even after I'd packed up and was about to go home, sometimes I'd get called back. I'd have to do several more quick checks before I could drive away.

The depth of my mistake hit me when I realized there were days when I did nothing but monotonous testing. I'd set up several computers to mirror the library across different systems. I would run through everything, make a small change or two, check it again, and repeat all day. **I was a programmer, yet was doing the repetitive, simple work I should be making a computer do.** Something had gone horribly, horribly wrong.

## The Ultimate Irony

After that, I saw the price I kept paying without tests.

I dreaded making any changes, no matter how small. But my job was changing the codebase by adding to it or fixing it, so my job itself filled me with dread. I associated all changes like this with tedious labor, not meaningful work. It was the same with bug fixes, so I had less incentive to fix them and more to let the code rot.

Having read Clean Code's testing chapter, the ultimate irony became clear to me. **I skipped testing thinking it'd make the code maintainable and flexible. But it had the opposite effect - tests are what make code maintainable and flexible in the first place.**

I could have made updates without fear it would break something else. The tests would catch it for me so I'd fix it, saving time and energy. They'd ensure everything operated at a foundational level. Even when things went wrong they would never threaten the app's core functionality. I could add new components safe in the knowledge everything else worked as expected.

These maintainability and functionality benefits outweigh the costs of writing and improving on the tests themselves.

## How I See Tests Today

It's not like I don't still struggle with tests today. I work with both Ruby on Rails and Ember, both with different test frameworks. I'm competent with Ember, but there's still many concepts and tricks with Rails testing I'm learning as I go.

But more importantly, **my challenges today are about the _how_ of tests, not the _why._** No one needs to argue with me about why I should write tests, or remind me to include some (most times, at least). I learned that lesson before, and it stuck pretty hard because it hurt so much.

If you haven't started learning how to test your programs yet, I encourage you to do so. You *will* accept how important they are one way or another. If you can choose between learning this via a blog post or a painful career lesson, I recommend the first one.

Unless you want to be like me, waking up in the middle of the night, in a cold sweat screaming about form integration tests. Then who am I to stop you?
