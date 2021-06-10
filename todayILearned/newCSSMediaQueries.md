---
title: There are even more CSS media queries than I thought
category: CSS and Design
date: 2021-01-17
---

I'm used to only using media queries for minimum and maximum viewport sizes. It turns out, you can set styles for a lot more than that! This is an overview of each one and how to use it.

## By Viewport Size

Let's start with the one most front-end developers already know about: viewport size media queries. These kick in when the screen width is above or below a certain size.

These are best written with `em` values, since they accommodate browser zooming and scale accordingly.

Minimum sizes are for viewports **larger** than the set size. They can be used for width or height. But width is generally preferred since it encourages mobile-first design.

```css
@media (min-width: 30em) { ... }
@media (min-height: 30em) { ... }
```

Maximum sizes are for any viewports **smaller** than the set size, and can also be used for width or height.

```css
@media (max-width: 30em) { ... }
@media (max-height: 30em) { ... }
```

But wait, there are more queries based on screen size! You can set queries based on how the height and width are relative to each other. You can use `aspect-ratio` for **when the screen width and height meet a specific ratio.**

```css
@media (aspect-ratio: 11/5) { ... }
  /* Height of 10rem and width of 22rem
     Also height of 22rem and width of 10rem */
```

If you don't need a detailed ratio, you can use orientations instead. **These work if the width or height is just larger than the other.**

* Landscape: th  e width is greater than or equal to the height
* Portrait: the height is greater than or equal to the width

```css
@media screen and (orientation: landscape) {
  .layout { flex-direction: row; }
  /* Horizontal layout for more horizontal screens */
}

@media screen and (orientation: portrait) {
  .layout { flex-direction: column; }
  /* Vertical layout for more vertical screens */
}
```

## By Viewport Type

All of the above media queries, by default, are based on screen size. You could be more explicit and specify that some styles only appear for pages on screens. It can also be combined with any of the previous size queries.

```css
@media screen { ... }
@media screen and (max-width: 30em) { ... }
```

This may seem unneeded. What other mediums than screens could a website be viewed on? You could also see it on a piece of paper if you tried to print a webpage. But there's a media query for that too.

```css
@media print { ... }
```

I've found it useful to hide unneeded navigation or images for print views, or pages saved as a PDF through this. Or replacing long URLs with print-friendly alternatives, like pseudo-elements to shorten them or QR codes.

There are also some more niche media queries. **You can query for different display densities (DPI, DPCM, etc) that lets you show content better for high or low resolutions.** This way, any high-resolution images can be hidden by users with older devices.

```css
@media (resolution: 50dpi) { ... }
/* Only for devices with 50dpi */

@media (min-resolution: 300dpi) {
  .hide-on-high-dpi { display: none }
  /* Hides elements on high DPI devices */
}

@media (max-resolution: 300dpi) {
  .hide-on-low-dpi { display: none }
  /* Hides elements on low DPI devices */
}
```

You can even **target devices that are using screen readers.** But this isn't always reliably supported by browsers. Plus, proper use of semantic HTML should avoid the need for this in most situations. But it's good to know, just in case browsers need extra help reading content.

```css
@media speech { ... }
```

## By Features

This is probably my favorite type of media query: you can adjust styles based on device capabilities and preferences, which is great for progressive enhancement.

You can use `@supports` to **check if browsers support certain features.** So if you want to use Grid but also support older browsers, you can include these Grid styles for only capable browsers. Older browsers that don't support Grid (or don't support `@supports` itself with such irony) will skip it over.


```css
.layout {
  display: block;
}

/* Include the property and value to check for support */
@supports (display: grid) {
  .layout {
    display: grid;
  }
}
```

### Color Schemes

You can also check if **a user has their browser preferences set for a light or dark mode.** Light is usually considered the default, so the dark mode query may be the only one you use.

This is good for devices that automatically change it at certain times, and sites that let uses toggle it on and off. I use these queries for the light and dark modes on this very site!

```css
@media (prefers-color-scheme: dark) {
  /* Dark mode */
}

@media (prefers-color-scheme: light) {
  /* Light mode */
}
```

Users can also set their preferences for **reducing motion due to accessibility stress cases or just personal preference.** Similar to the color scheme feature query, the `no-preference` version is usually seen as the default so it won’t be needed.

```css
@media (prefers-reduced-motion: reduce) {
  /* Reduced motion */
}

@media (prefers-reduced-motion: no-preference) {
  /* No reduced motion */
}
```

## By Multiple Queries

I'll end this with one extra-fun fact: You can combine all the above queries in different ways with a few logical operators.

The `and` operator takes effect if two different queries both evaluate to `true`. Just put the word `and` between the two queries.

```css
@media screen and (min-width: 30rem) { ... }
@media (min-height: 40rem) and (min-width: 30rem) { ... }
@media (prefers-color-scheme: dark) and (min-width: 30rem) { ... }
```

The `or` operator is more flexible than `and`, and takes effect if only one of two queries is `true`. It's used by instead placing a comma between the two queries.

- Used with two different queries
- Tells the CSS that either one of the queries before or after must evaluate to **true.** If one is false, the browser gets the CSS.
- Done by using a comma between queries.

```css
@media screen, (min-width: 30rem) { ... }
@media (min-height: 40rem), (min-width: 30rem) { ... }
@media (prefers-color-scheme: dark), (min-width: 30rem) { ... }
```

On the flip side of all this, the `not` operator lets a query take effect if it evaluates to `false`. It can be used on its own, or paired with another query. But know the `not` operator isn't applied to both queries in a pair, only the one it is placed before.

```css
@media not screen { ... }
@media not screen and (min-width: 30rem) { ... }
/* Works if it's NOT a screen, AND the width is larger than 30rem */

@media not screen and not (min-width: 30rem) { ... }
/* Works if it's NOT a screen, AND the width is NOT larger than 30rem */

@media not screen, (min-width: 30rem) { ... }
/* Works if it's NOT a screen, OR the width is larger than 30rem */
```
