---
title: Evaluation and Testing
category: Accessibility for Everyone
date: 2020-06-08
---

Without tests to confirm your accessibility efforts, the effort is pointless.

## Making a Plan

A test plan makes sure you get what you need to out of your tests. Can be a set of criteria or a task list to run through. As long as it ensures your accessibility efforts align with your product plan. Should include:

* Testing methods
* How the methods support reaching accessibility targets
* Documenting the results
* Feeding the results back into product improvement

## Heuristics and Analysis

**Heuristic testing** is testing against existing goals and guidelines, usually by people on the project.

### Prototype Evaluation

**Heuristic Evaluations** test an interface against guidelines, like the WCAG, and any additional issues. The WCAG 2.0 covers many use cases and is a solid starting point.

**Cognitive Walkthroughs** test the interface against specific tasks. They can emulate specific tools or setups, like using assisstive tech or in different environments (harsh light, loud rooms, etc).

### Code Reviews

Code reviews are helpful early on. Check for code quality and consistency, as issues with this can leak over to the user experience.

### Automated Tests

Automated tests aren't enough, but can still ensure certain criteria are met. Criteria focused on user experience can't be programmatically verified.

Best done near the end of production, but with time to make changes if needed. Recommended tool is the Tenon API in the build process. It can also be an education opportunity - not understanding why an accessibility test failed means learning how it did and why it matters.

## Device and Browser Testing

Accessibility is greatly affected by the wide range of devices and browsers a user may be using. Testing over a wide spectrum, not just your own browser, is crucial.

Due to resource limits, we need to prioritize browsers and devices. Make sure you have good reason for your choices, such as knowing they're very popular with your audience. Should ideally aim to test for:

* Desktop computers on all major OS's
* Mobile devices on all major OS's
* Latest versions of all major browsers, for desktop and mobile
* Assisstive tech such as screen readers
* Keyboard navigation
* Popular accessibility settings, such as zoom and screen magnification

Virtual machines (VirtualBox, VMWare) are great for simulating older OS's. But remember that the hardware and keyboard setup will likely be different, and can change the user experience. Make sure all testers know the differences.

[Consider a testing matrix, described in this List Apart article.](https://alistapart.com/article/reframing-accessibility-for-the-web).

## Validators and Checkers

Validators check your code quality in a straightforward, if limited, way. They're better for quick checks to obvious problems in the front-end. Failing is okay as long as it's for a good reason that doesn't affect things for the user (like missing css prefixes before they're added on automatically).

Well-known validator is the W3C markup validator, or HTML validator. Errors can be tough to understand at first. Also the WemAIM's WAVE accessibility evaluator. Better draws focus to accessibility errors in the context of the page, and has good info. Pages are tested against the WCAG guidelines. You get errors as well as recognitions for what you did right. Local sites can use this with the WAVE toolbar add-on for Chrome and Firefox.

You can use a color contrast checked to make sure your foreground and background colors are legible enough. Some, like Color Oracle, show the colors with different color blindness filters.

Readability Checkers look for ease of reading and reading level, like Hemingway App. Not the same as a person reading it, but give a good, rough overview.

Connection Emulation tools can simulate lowered or throttled internet access.

## Testing Keyboard Navigation

Keyboard testing is easy, just navigate through your site with your keyboard! Usually uses:

* `tab` to navigate
* A modifier key like `alt` or `ctrl`
* Left and right arrow keys

You may need to enable full keyboard access on your browser. Also make sure to test screen readers with and without keyboard usage.

## Usability Testing

Best to test with actual people who will use your site. You may not be able to test early, since people with some disabilities, or by using some assisstive tech or methods, may not work well enough before working versions are done. Avoid testing too much with your team - they already have knowledge and assumptions about the product that will bias the results.

When finding testers, **aim for people more familiar with needed assisstive tech, not just people who know how to use it.** Cuts through false assumptions you may have about assisstive tech. Just don't categorize users based on those with disabilities. The variety of accessibility needs is so varied that generalization is impossible. We can only test with as many different people as possible each time.

Don't get people with disabilities just for that reason - make sure they're still in your target audience!

When running tests, aim to get a good facilitator. Someone who can get along well with participants without leading them on. People who made the product are unwise here, since they may want their product to succeed and give leading clues that bias the results. Be sure to record it in some way, audio or video, and take notes!

Make test scenarios based on real use cases and essential product tasks. Prepare in advance with questions, and pay attention during the tests!

* What's the user's expectations and prior knowledge?
* What are their initial reactions, thoughts, and feelings?
* What's their event flow, or the actions they take, and why?
* What are they saying and doing? What can we learn from it?
* What obstacles do they encounter?

Remember that testing is an ongoing process. It stops accessibility from being lost over time, and to find better solutions later on. Consider adding a quick feedback form on your site for continuous user feedback, and making your accessibility policy public. Just don't derail or create entirely new plans due to a few isolated cases of feedback.

Testing is research that happens over time, not evidence of your skill. It can be frustrating to see attempts at change fail, but the serve the goal of getting better.
