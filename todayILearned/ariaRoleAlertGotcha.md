---
title: Aria-live doesn't get read on page load
category: Accessibility
date: 2021-06-15
---

When something urgent on a webpage needs our attention, most of us expect to see a red bar of some kind on top of the screen. It tells us we filled out a form wrong, lost some unsaved changes, or someone stole our passwords. So, standard Internet things.

Screen reader users may not always see those alerts, or not see them at all. But using the `aria-live` will read out that element's content for the user, no matter where they are on the page. Developers can use `aria-live="assertive"` to interrupt whatever they're hearing for urgent info. Or the (often better) choice is to use `aria-live="polite"` to wait until the user finishes listening.

```html
<div class="alert alert-error" aria-live="assertive">
  You entered the form info wrong, your password is lame, and you overcooked dinner last night. I hope you're happy.
</div>
```

All this isn't new to me. What _is_ new to me is I assumed if you loaded up a webpage with an alert like above, a screen reader would read it out. But when I booted up VoiceOver and reloaded the page, it didn't read it! The screen reader wasn't telling me what a failure the website thought I was.

This is also true for `role="alert"`, which is functionally the same thing as `aria-live="assertive"`.

**It turns out `aria-live` only applies when the page is actually live. That doesn't include the page load, only afterward.** So how does one get screen readers to read certain content on page load?

From what I've read, there are two reliable methods, both requiring JavaScript in some form:

1. Move the page's focus to the alert element after it's loaded.
2. Add or alter the `aria-live` container's text after page load. Any detectable change in its content will trigger it.

My own preference is the second option. It doesn't risk jarring or confusing users with a sudden focus change. But, as with all things, I'm hoping for a well-supported, non-JavaScript solution later on.
