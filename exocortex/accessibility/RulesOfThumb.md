---
title: Rules of Thumb
category: Accessibility
resources:
    - name: What a Year of Learning and Teaching Accessibility Taught Me
      url: https://www.24a11y.com/2019/what-a-year-of-learning-and-teaching-accessibility-taught-me/
    - name: The intersection of markup, content and context in accessibility
      url: https://www.24a11y.com/2019/the-intersection-of-markup-content-and-context-in-accessibility/
date: 2020-06-08
---

Some principles should always be kept in one when developing accessible interfaces.

## Use Semantic HTML Whenever Possible

Semantic HTML gives pages structure and meaning that can be conveyed across the widest number of devices and mediums possible. It is the true foundation of accessible web interfaces, so never overlook it. It's the basis for internet device content in the present and future, so it helps interfaces adapt to new technology too.

ARIA attributes are great to add extra semantics when needed, but don't change behavior or functionality. That's why they're not a substitute for semantic HTML on their own. So while some specific patterns need ARIA, all patterns always need semantic HTML too.

## Keep JavaScript Small and Optional (when possible)

JavaScript isn't always available, so when you can, **make it a progressive enhancement instead of a requirement.** Some components _need_ JavaScript though, as long as you're 100% sure that's the case. When progressively enhancing, the non-JavaScript version can be a simplified, or altogether different, UI presented to the user. As long as the same users and actions are still available to them, that's okay. Triggering different style and functionality hooks when JS is detected smoothly adds onto it when it can.

When it is used, keep it small and light. Avoid jQuery and other third-party scripts if you can and code it out yourself. Most times what you need is simpler than you'd think, and it's not too tough to write it yourself. Third-party JavaScript also takes control and privacy away from your users, which goes against the principles of accessibility.

## Rely on Browser Features Whenever Possible

Browsers already have built-in functionality for things like assistive tech and progressive enhancement. It's often more reliable (and easier) than trying to subvert it with custom functionality, so know when to go with that instead of overthinking it.

## Don't Let Design Block Accessibility

Some designs you'll see or receive don't have accessibility in mind. If you can, push to change designs when needed when accessibility needs aren't being met. Don't let design block or dictate what accessibility needs are included.

## Look Beyond Technical Needs

Checking the boxes of contrast, navigation, and screen readers isn't always enough. User experiences can still hit blocks with options presented to them, such as not having some video functionalities to more easily watch something.

## Remember Context

Link and button text may make sense to sighted users, but not to others using a medium with less context. If you can see the input elements closely above an "Edit" button, you can tell that's what it changes. But screen reader users will get to the button and only hear "Edit," and need to skip around it to find the input elements as context if they didn't get there exactly as expected. Labelling it "Exit X Inputs" or something similar fixes it, and even helps sighted users with the extra clarity.

Examples like this are why including extra context in interactive elements matters. You can't always predict user flow depending on how they navigate the page, so don't make assumptions and include extra context in advance.

This context also includes extra information and instructions in general. What seems obvious to you and one group may not be obvious to others.

## Simpler is Often Better

When choosing between making something work and making it perfect, make it work first. A simpler, working accessible solution is better than a perfect one that's more complex than needed.

People may argue they need it to be perfect for reasons like consistent branding or having a neat feature. My response to that is most users care about it working more. If it's imperfect but works, users can do what they need and are happy. If it's perfect but more fragile, it'll break for users and they'll be furious regardless of what else was added. Durable solutions make for happier users, even if you have to sacrifice some fanciness.

If you're unsure if users can understand something, remember this mantra: **when in doubt, spell it out.** Adding some explanatory text is the simplest, and one of the most accessible, ways to provide extra context and info.

## Colors

Colors are a major part of an accessible website, since it's a core way of conveying meaning and information. There many disabilities and conditions that affect how users perceive color, partially or completely. Accessible color schemes and color design convey the needed meaning despite common disabilities affecting color perception.

* **Don't convey meaning with only color,** since not all users may be able to see it. Using icons, text, or other visual notifiers focused on the same content help get the message across consistently.
* **Give text colors enough contrast.** Low-contrast colors are hard to read in many scenarions, including regular users who don't have their glasses or are outside with a glare on their phones. Aim for a contrast ratio between the text and background of:
  * 4.5 to 1 if smaller than 18 pixels
  * 3 to 1 if equal to or larger than 18 pixels
* **Test all used color combinations.** A color palette won't use all possible combinations in a site, but each one that is used should be checked for proper contrast. This mostly applies to text, but make sure any meaning conveyed by other contrasts is still noticeable (although this is discouraged).
* **Avoid too much color crammed together.** It can quickly get overwhelming and nonsensical, especially for those with cognitive impairments.

## Mobile Devices

###  Accessing Interactive Elements

Touch elements shouldn't be right or left hand dependent. You can get around this with full-width interaction elements or containers, so someone reaching for them from either side can get to them.

Also make it clear you can interact with them. Use color schemes that communicate interactivity with distinct "action" colors that stand apart from others. Also place interactive elements in well-established locations you'd expect them to be in like the bottom navigation.

###  Touch Gestures

Aim for the recommended 44x44 pixel dimensions for touch elements. Properly space them away from other touch elements to decrease accidental clicks.

Add instructions or good visual cues for custom gestures. These can be as simple as icons with short explainer texts explaining the action and its effect.

Group elements that perform the same action into a singular, larger actionable item. For example, group the name and logo into the same anchor tag to the homepage. Don't put each in a separate anchor tag.

###  Inputs

Specify input types in the markup so mobile keyboards can choose the best layout, such as `type="number"` so keyboards only show numbers.

Use simpler inputs like checkboxes or radio when possible, since they're easier for small screens.
