---
title: aria-current tells users where they are in a list
category: Accessibility
date: 2021-08-11
---

For quite a while, my website's nav menu changed two things when a link matched the current page:

1. I added a class to make the text bold. (I'm overdue to add a class to add a larger font size and increase the visual contrast.)
2. I changed the link to jump to the page's main content.

```html
<ul id="navigation-menu" class="flex flex-wrap flex-gap-6 mb-0 py-0 flex-justify-between list-reset">
 <!-- Current page -->
  <li class="inline-block text-center mb-0">
    <a class="block my-px text-small font-weight-bold" href="#content">
      About
    </a>
  </li>

 <!-- Another page -->
  <li class="inline-block text-center mb-0">
    <a class="block my-px text-small " href="/now/">
      Now
    </a>
  </li>

 <!-- Other page links here... -->
</ul>
```

This improves the experience for most users, especially keyboard users. But I'd been missing something: **how do screen reader users know which page they're on?** Even if I make the current page stand out more, they may not be able to see that.

Turns out, there's [an ARIA attribute for that: `aria-current`.](https://www.aditus.io/aria/aria-current/) It tells screen readers what the current item is from a list. It can be from a list of:

* Pages in navigation or another list of links.
* Workflow steps a user is going through.
* The user's location in a hierarchy of links, like breadcrumbs.
* The current date in a list of dates you may find in a calendar.

For my site, I only need the first use case. So the new markup for my About page link will now look like this when you visit that page.

```html
<li class="inline-block text-center mb-0">
  <a aria-current="page" class="block my-px font-weight-bold" href="#content">
    About
  </a>
</li>
```

Did you notice I also dropped the `text-small` class to make the text larger? I'm killing two accessibility issues with one post!
