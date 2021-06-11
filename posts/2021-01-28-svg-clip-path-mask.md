---
title: "Hiding and Showing in SVG with Clip-path and Mask"
date: "2021-01-28"
excerpt: "SVG opens up a lot of visual possibilities. A big part of that is using clip-path and mask to hide and show images."
tags: ["front-end"]
image: "svg-clip-path-mask.jpg"
featured_image_link: https://safebooru.org/index.php?page=post&s=view&id=3336908
---

[Scalable Vector Graphics](https://developer.mozilla.org/en-US/docs/Web/SVG), or SVG, are one of those front-end tools that can open up a world of creative ideas. I've been playing around with it more, for work and to distract myself from my hollow, quarantined soul. I did both and made my first component with some cutesy SVG animation.

<p class="codepen" data-height="297" data-theme-id="light" data-default-tab="result" data-user="max1128" data-slug-hash="YzGbWqO" style="height: 297px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Light and Dark Theme Switcher">
  <span>See the Pen <a href="https://codepen.io/max1128/pen/YzGbWqO">
  Light and Dark Theme Switcher</a> by Maxwell Antonucci (<a href="https://codepen.io/max1128">@max1128</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

But near the end, I hit a snag with how SVG can hide parts of the image. Sometimes I wanted to *show* specific parts of an image. Other times I wanted to *hide* them. I couldn't get this effect for the sun and moon animations, so I got it with border and fill colors. That's not ideal, but I can always fix it up later.

But while I wanted to figure this out, I had a hard time finding a clear explanation of showing and hiding SVG. So I wrote one myself! **The two parts of SVG one needs for these effects are `clip-path` and `mask`.** Here I'll break down the basics of how to use them with SVG to hide shapes, images, and if you're lucky, painful tangles of repressed emotion.

## Clip-path Controls What You See

Let's say I have a red rectangle, but I only want to show a small circle *within* it. That's when I need `clip-path.` **A `clip-path` is an SVG shape you pair with a second. Anything in the second shape that doesn't overlap with the `clip-path` shape gets cropped out, lost, and never seen again.** You destroyed it and I hope you're happy.

*Ahem*...anyways, here's an example. Let's start with this red rectangle.

```html
<svg width="400" height="200" viewbox="-200 -100 400 200">
  <rect x="-200" y="-100" width="400" height="200" fill="red" />
</svg>
```

Let's add a `clip-path` to this thing. First, I need to define the circle it'll be using. It's positioned to be in the rectangle's center. But I need to define it within a `clip-path`. **This has to go within a `defs` element, which is SVG's way of storing variables.** Anything in `defs` won't directly render but can then affect other elements, like repressed memories of staring wistfully at an empty street after the third hard cider.

So within the `defs` element, the `circle` must go in a `clipPath` element. It also needs a unique ID for reference.

```html
<defs>
  <clipPath id="clip-path">
    <circle cx="0" cy="0" r="50" />
  </clipPath>
</defs>
```

Now, this `clip-path` circle can be used with the red rectangle. It needs the `clip-path` attribute with the unique ID, which looks like `clip-path="url(#clip-path)"`, and it's good to go.

```html
<svg width="400" height="200" viewbox="-200 -100 400 200">
  <defs>
    <clipPath id="clip-path">
      <circle cx="0" cy="0" r="50" />
    </clipPath>
  </defs>

  <rect clip-path="url(#clip-path)" x="-200" y="-100" width="400" height="200" fill="red" />
</svg>
```

You can see the final result below. The light yellow area is where the rest of the rectangle is being hidden below the clip-path.

<p class="codepen" data-height="361" data-theme-id="light" data-default-tab="html,result" data-user="max1128" data-slug-hash="jOMjXvL" style="height: 361px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="SVG Clip-path Example">
  <span>See the Pen <a href="https://codepen.io/max1128/pen/jOMjXvL">
  SVG Clip-path Example</a> by Maxwell Antonucci (<a href="https://codepen.io/max1128">@max1128</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

## Mask Controls What You Hide

Once I finally peeled myself off the couch and found the will to keep working despite the terror of it all, I asked, "What if I want the reverse result? If I want to hide everything *except* that red dot?" To do that, we need a `mask`. But this approach is a little more complex.

With `clip-path`, I only had to define a visible area. With `mask`, there are two steps:

1. **Define a visible area. Anything outside it gets cropped out.**
2. **Define what areas *within* the visible area are also cropped out.**

This is like a `clip-path` but with a lot more potential for what to show and hide, but will only realize once it can experience regular human interaction again. But I only needed these lonely basics to the desired result. If you want to see what it can do, including using shades of gray for translucent effects, check out [this blog post of mask examples](https://vanseodesign.com/web-design/svg-masking-examples-1/).

First, defining a visible area here is easy: I want the rectangle to be visible! I'm hiding space within the rectangle, so the entire rectangle itself should be my visible area. I define this within a `mask` element, which can also go in the `defs` element.

```html
<defs>
  <mask id="mask">
    <rect x="-200" y="-100" width="400" height="200" fill="white" />
  </mask>
</defs>
```

Notice the `fill="white"` I added to the shape. That's important because, **in a mask, the visible area must have a white fill color.** Don't you dare deprive it of what it needs. You monster.

Now I need to decide what area to hide within the visible area. This is the circle in the middle of the rectangle. This time it needs `fill="black"` to hide it.

```html
<defs>
  <mask id="mask">
    <rect x="-200" y="-100" width="400" height="200" fill="white" />
    <circle cx="0" cy="0" r="50" fill="black" />
  </mask>
</defs>
```

With this basic mask complete, we can connect it to the red rectangle. It's done the same way as `clip-path` but with the `mask` attribute.

```html

<svg width="400" height="200" viewbox="-200 -100 400 200">
  <defs>
    <mask id="mask">
      <rect x="-200" y="-100" width="400" height="200" fill="white" />
        <circle cx="0" cy="0" r="50" fill="black" />
      </mask>
  </defs>

  <rect mask="url(#mask)" fill="red" x="-200" y="-100" width="400" height="200" />
</svg>
```

This gives me what I want: a full rectangle missing the center circle. The result is below with the light yellow again showing what's hidden behind the mask. The SVG mask anyway, not the mask of positivity hiding the sense that nothing will truly be okay again.

Not that mask. The SVG mask.

<p class="codepen" data-height="486" data-theme-id="light" data-default-tab="html,result" data-user="max1128" data-slug-hash="vYXqPqv" style="height: 486px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="SVG Mask Example">
  <span>See the Pen <a href="https://codepen.io/max1128/pen/vYXqPqv">
  SVG Mask Example</a> by Maxwell Antonucci (<a href="https://codepen.io/max1128">@max1128</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

### Bonus Challenge

My written example is redundant. It defines the same rectangle shape twice, but with different fills and masks. SVG lets you define a shape once and use it elsewhere, like a variable reference. I did that in my CodePen example - check the code and see how that works!

## Wrapping Up

I've still got plenty to learn with SVG, but `clip-path` and `mask` are two foundations I'm sure will help me make cooler stuff. If you're like me and feel jealous of the cool, graphic stuff you see developers making on CodePen, SVG is one of the first steps to making similar work and assuaging the deep desolation fermenting within one's soul.

Rereading this post, I think the second part may just be me using learning to handle the mental stress of extended quarantine. But the point about writing better code still stands.

So focus on that. I need to take a long walk. To the wine shop.

*If you're not sure where to start, [this Pen that doubles as a basic SVG tutorial](https://codepen.io/HunorMarton/pen/PoGbgqj) helped me immensely. You can also grab a copy of ["Practical SVG" from the "A Book Apart" series](https://abookapart.com/products/practical-svg).*
