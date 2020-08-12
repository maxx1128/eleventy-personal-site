---
title: "My Week in Lessons for 3/1"
date: "2019-03-01"
excerpt: "My first (of hopefully many) weekly lessons learned covers brittle tests, complex components, stupid questions, and existential emotions."
tags: ['career']
---

My biggest lessons in testing, writing, humanity, and [anime-inspired woodblocks](https://www.maxwellantonucci.com/notes/2019-02-22.html) eventually become posts on my site. But each week, I learn and relearn lots of little things that never make the cut. They can be through work at my job, books I read, random thoughts implanted by the lizard people, or Twitter, but they rarely go on to become full-on posts and fall by the mental wayside.

This gave me an idea: why not gradually gather these lessons from each week and smash them into a single post? It basically writes itself one piece at a time and doesn't let the little lessons go to waste.

So I'm going to try this out for a few weeks and see if it sticks. With that, here's the first entry of potentially many more of the "My Week In Lessons!"

## Avoid Brittle Tests

In a [testing post I wrote](https://dev.to/maxwell_dev/the-testing-introduction-i-wish-i-had-2dn), one point was "the test shouldn't repeat the code's logic," causing code duplication and missed errors. This is still true, but I learned to balance it with avoiding brittle testing.

A "brittle test" breaks due to unrelated changes elsewhere, such as:

* Timezone changes breaking tests for date formatting. My test assertions were strings rooted to a single timezone, but our online test runner used a different timezone.
* Fixture data improperly worked into the test expactations. One test made sure an element created the right number of items from an array. But I tested for was a hardcoded number instead of the array length. This would break the test if more array items were added.
* Mind-control signals worked into copy that break tests looking for specific test. These should be integrated into background images so they're separate from the copy and fix the frequent problem of brainwashing redheads.

Fixing these tests meant making them just flexible enough. We included the translation module for the first tests, and used the fixture's array length in the second. Now they passed and would keep passing even if the timezone or fixture data was updated. They're entirely separate from those component tests, so they have no business making them fail like that.

## Break Complexity into Pieces and Test each Piece

I've been in a hell for a few weeks, and I call that hell an "Activity Stream component." It's a simple on the surface, complicated under the hood kind of component - a complex jumble of changeable properties and comments organized into a clean, filterable list. My first version stuffed everything into one component, a mistake which was slowly fixed over two weeks with lots of PR comments and minimal broken fingers.

Now the component is nearly complete, and it's now been broken apart into smaller pieces:

* A different component for each of the two different activities: a comment or a change in the data.
* Each type of change also has its own small component, which handle a wide range of data types, translations, and rendering logic.
* Two decorator patterns to ensure activities and comments have compatible data structures,
* Each new piece has its own integration or unit test.

This seems more complicated, but in practice has made things simpler. Updates can be narrowed down to specific pieces instead of sifting through one large file. It's easier to test the details in each component instead of poking around a big one. Most importantly, modular code is just easier to maintain and understand by the entire team and any spying lizard people.

**My lesson just drives home [the "single responsibility principle" of programming](https://en.wikipedia.org/wiki/Single_responsibility_principle). Each function or component should focus on doing one thing well.** With one large component doing so many things, it's hard to see if it does it right. It's easier with lots of smaller pieces working together to make something bigger.

That's not to say my approach was all wrong. Getting a huge component working at the start showed me it was possible. But the next step should've been: "can I break this down into smaller, more efficient and bite-size pieces?"

## Ask Stupid Questions Since They're Not Stupid

One reason the above lesson took so long is something I'm embarrassed to admit as a journalism major - I didn't ask enough questions since they felt too "basic." I felt like asking them was admitting an unacceptable lack of knowledge. But looking back, a few things became clear to me:

* Not asking something that seems too "basic" is a textbook mistake. Programming is about always learning. Sometimes that covers things people already know, and that won't change. No matter how much experience I get.
* Even if I feel silly for asking, the answers will save me lots of time and aggravation down the road.
* There shouldn't be much shame in being basic anyway. Basic people can still eat chocolate and pet dogs so is there really much to complain about?

So in the second half of the Great Activity Stream Refactoring of 2019, I made myself ask more questions. Even around basic feedback, I asked for clarification if I didn't get it. **Asking basic questions is tough, but the more I ask now, the less need I'll need to ask later.**

## Take Gradual Notes

This weekend I looked at my backlog of articles and projects to take notes on. But I realized with everything I wanted to read, I wouldn't have enough time. This has happened many times and it ends the same: I wipe my backlog clean, think I won't make the same mistake, and the cycle continues.

I tried a more gradual note-taking approach this week, sprinkling a few minutes of it whenever I could: during lulls at work, at lunch, or lounging time after dinner. I still wouldn't learn as much as I wanted, but it was a step in the right direction.

The result? This week I finally added notes on [ARIA attributes](/exocortex/accessibility/AriaAttributes.html) and [mobile accessibility tips](/exocortex/accessibility/MobileDeviceAccessibility.html).

The lesson? **Savor the small note-taking victories, since they add a lot to one's knowledge and stock market value over time.**

### Your Tweet of Zen

If this is going to be recurring thing for me, I want to end on a playful note. I landed on sharing a thought-provoking tweet from the week, give or take a few days. So here it is, your Tweet of Zen.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">&quot;You are being too emotional, just look at things rationally.&quot;<br> – someone who thinks their emotional desires are more important than yours.</p>&mdash; Existential Comics (@existentialcoms) <a href="https://twitter.com/existentialcoms/status/1097951639728574466?ref_src=twsrc%5Etfw">February 19, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
