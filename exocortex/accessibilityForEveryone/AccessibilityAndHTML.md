---
title: Accessibility and HTML
category: Accessibility for Everyone
date: 2020-06-09
---

Well-structured HTML is immediately accessible, and is the key to better web accessibility. Quickly check a page's HTML structure by stripping away all external CSS, showing how the content appears to a screen reader. This is why **HTML elements' order is important for accessibility.** It's also why screen readers benefit from headers and other structure elements (like a table of contents). It also helps SEO, since they crawl page text like screen readers do.

## Headings

Aim for just one `h1` element per page, and allow for multiples of others. It breaks down content so it's more approachable and skim-able, as well as helping SEO.

Lists using the `ol` and `ul` elements can help break down content further.

## Forms

Buttons and inputs allow for good interactions on their own - there's no real need to use JavaScript on `span` or `div` tabs to make this ourselves. This misses the default accessibility from buttons and inputs, and also wastes time.

Input fields have default accessibility features to tell users their content and state. Labels are needed so users know their expected content, and:

* Should clearly and concisely say what's expected
* Come before inputs in the HTML, semantically and visually

For required inputs, don't rely on just the `*` to show this, as it requires familiarity. Clearly write out `required` in the label, next to the name, to avoid confusion.

Labels and inputs should be semantically connected. An input's `id` attribute value needs to match a label's `for` attribute value. This also focuses on the correct input when clicking on the label, increasing the interactive area and making it easier to access.

### Buttons

Buttons have default actions, like submit or reset. They can also have several states:

    * Active
    * Inactive
    * Hover
    * Focus
    * Disabled

When overriding a button's core styles, follow the set style conventions for each one (such as the disabled button being grayed out and dulled). Make sure each state is clearly identifiable from each other.

## Keyboard Navigation

This can get tough for features not built for keyboard access. Complex inputs, dropdown elements, and rich media with interactivity are especially tough.

### Keyboard shortcuts

These are custom keyboard actions, which can really help for users who have a tough time using preset keyboard actions. It can also take common actions and make them a simple shortcut, like pressing `.` to see new tweets on Twitter's homepage.

However, they currently don't work on Windows screen readers, so don't get too excited about them.

**Don't use access keys** for keyboard shortcuts. They varied greatly among OSs and browsers, and aren't reliable.

### Skip Links

_Skip Links_ let users jump right to specific content, usually the main content, to avoid going through complex navigation. One options is to make them one of, if not the, first focus elements on a page, and only show them when focused on. This makes them useful for anyone using keyboard navigation, and hides them from others. If a higher priority, just make them visible on the page.

_Keyboard focus_ is where on the page the keyboard's actions are interpreted by the browser. Make sure it's the same as the _visual focus_, or what you can see on the viewport. Not all browsers support changing the keyboard focus to where the visual focus is when following things like skip links, so you may think you're at the content but still focused on the nav. Be sure to test this, or else your skip links could be useless for keyboard navigators.

_Focus styles_ are styles we see when an element has keyboard focus on it, making them vital for keyboard users. Even if you change them, make sure they're there! _Hover styles_ are the same for hovering, and usually show you can interact with elements.

Don't rely only on hover styles to show interactivity, as visually-impaired or touchscreen users won't see them. Don't rely on noninteractive elements like `div` and `span` for interactions!

### tabindex

_tabindex_ is a property that controls the order of elements when navigated by keyboard. Standard way to do this is using the same order form the source code, but `tabindex` lets you change this if you want - but due to visual inconsistencies, this isn't a good idea. It's no substitute for semantic HTML.

    * `tabindex="0"` adds elements into the flow of interactive elements. Again, not a good idea.
    * `tabindex="-1"` removes elements from the tab index. They can still be focused on though. Adding this to a skip link target will let users jump to it without disrupting the usual tab flow.

## Separating Structure and Style

Two main culprits in non-accessible HTML:

### 1) WYSIWYG (What You See Is What You Get) Editors

WYSIWYG's output content made in a visual editing interface. The root of their issue lies in how they manipulate content's appearance, but rarely structure - for example, making larger fonts without using a semantic heading tag. They also often make unneeded elements and inline styling to clutter HTML.

### 2) HTML elements used for CSS Styling

CSS can create a massive disconnect between the markup and visual product. Headers with less emphasis on screenreaders can look larger and more important that ones with higher priority.

__Both issues above are caused by not separating structure from style.__ This keeps HTML accessible and also HTML and CSS easier to maintain. Major style changes only need CSS changes, HTML changes aren't required. This all shows how group knowledge of accessibility is also important for maintaining it. It also ensures sites can be accessed by readers enforcing alternate styles, since semantic HTML helps them translate better.

## Progressive Enhancement, Graceful Degradation

__Progressive Enhancement__ is giving a base experience for most/all browsers, and layering on top of that baseline for supporting systems. This ensures everyone at least gets a basic, functioning experience. This can be adding CSS that, if not supported, just makes the element look less fancy. Or using native elements for things like video, and layering custom players on them with JS if it's enabled.

Related is __Graceful Degradation__, which instead builds for the most capable browsers and has fallbacks set for less-capable ones. It's often preferred for sites built on complex interactions, and couldn't work without them. A specific list of supported browsers may be used for deciding what to fall back on. Simply blocking older browsers or users with JS disabled is bad practice.

As the range of devices and browsers has grown and become harder to manage, Progressive Enhancement has become more popular in recent years.

## WAI-ARIA

> Stands for "Web Accessibility Initiative - Accessible Rich Internet Applications." Introduced in 2014.

For complex widgets being used in browser environments intended to read simpler code, WAI-ARIA makes it easier to describe the markup's roles, states, and other properties for assistive tech and semantic HTML.

### Roles

Adding `role` attributes with values lets you override the implied roles given with semantic HMTL elements. A good use for this is when no semantic HTML element captures its meaning right - for example, using `<div role="alert"></div>` for alerts. There's many other similar roles, such as `dialog`, `status`, and `timer`. Check the W3C site for them all.

Adding some `role` values, like `navigation` or `article`, is redundant with HTML5 semantic elements. But older IE browsers that don't support these elements can make use of them.

States and properties can help give more info to assistive tech, which may or may not be dynamic.

  * `aria-expanded` can tell whether something like a menu is expanded or not, with JS changing the value
  * `aria-describedby` creates connections between elements so you know where to find more info on it.

_Live regions_ can tell users when something on a page changed without disrupting where they are. Using the `aria-live` attribute determines when and how users should be alerted.

  * `aria-live="off"` means an area isn't live at the moment and shouldn't give updates
  * `aria-live="polite"`means an area will give an update during the next available time, like when a user is done typing
  * `aria-live="assertive"` announces updates immediately. Only use it for real important things, like errors.

ARIA doesn't help browser experience the same way semantic HTML does, so it should never be a replacement for it. **Using ARIA on an inaccessible site will not help.**
