---
title: "When Refactoring your Responsive CSS Backfires "
date: "2019-05-20"
excerpt: "Refactoring code is a tricky business. This is a small example  of how fixing old CSS code creates even more problems to solve."
image: 'css-refactor-backfires.png'
tags: ['design', 'css']
---

A few weeks ago, [Dev.to's Jaqcue Schrag posted about refactoring the worst code she'd ever written](https://dev.to/jnschrag/refactoring-the-worst-code-i-ve-ever-written-42c7). I saw it as both an insight into solving old problems with new thinking, and a push to refactor old code of my own.

I dug up the repo with my Sass template for building an Atomic stylesheet, which was long overdue for updates anyway. This post focuses on refactoring one of the most important, and arguably worst-written, parts of the codebase. To my surprise, I actually wound up refactoring the code _too_ well and created an even worse problem I had to solve afterwards.

Such is refactoring, the plot to most romantic comedies, and life itself.

## The WET Responsive Class Setup

Several styles in my Atomic CSS setup are built as responsive classes, whose styles can kick in or override others are different breakpoints. For instance, take a `div` like this.

```html
<div class="atomic-p-base atomic-p-double-md">
  I'm a div!
</div>
```

In a nutshell, the `atomic-p-base` class gives some padding, and the `atomic-p-double-md` class overrides that at on larger screens.

This works, but there's two things I wanted to change in my refactor.

First, I wanted `md` added to the class name differently. Atomic classes should clearly communicate their function at a glance, and writing both the name and breakpoint label with dashes blurs them together too much. [Tailwind CSS](https://tailwindcss.com/) uses a colon syntax, such as `md:px-4`. I wanted to imitate this and change my class name to `atomic-p-double:md` for the same effect.

Second, the Sass generating this is too WET. The code for the breakpoints and media queries are DRY enough, as you can see here.

```scss
// Map for the breakpoints and max width
$breakpoint-map: (
  xs: 0px,
  sm: rem(480px),
  md: rem(800px),
  max: rem(1200px)
);

// Mixin for fast media queries based on the breakpoint map
@mixin larger-than($point-name) {
  @if ($point-name != 'xs') {
    $width: map-get($breakpoint-map, $point-name);

    @media (min-width: $width) { @content; }
  } @else {
    @content;
  }
}
```

However, if I want to make a new group of classes responsive, I need to rewrite the below logic for making and adding the class name labels each time.

```scss
@each $bp-label, $bp in $breakpoint-map {

  $bp-label-final: '';

  @if ($bp-label != 'xs') { $bp-label-final: '-' + $bp-label; }

  @include larger-than($bp-label) {
    @each $label, $length in $spacing-map {
      // Margin
      #{$g-nmsp}m-#{$label}#{$bp-label-final} { margin: $length; }
      #{$g-nmsp}mt-#{$label}#{$bp-label-final} { margin-top: $length; }
      #{$g-nmsp}mr-#{$label}#{$bp-label-final} { margin-right: $length; }
      #{$g-nmsp}mb-#{$label}#{$bp-label-final} { margin-bottom: $length; }
      #{$g-nmsp}ml-#{$label}#{$bp-label-final} { margin-left: $length; }
  }
}
```

Having to write out the logic for `$bp-label-final` repeatedly isn't ideal. Especially since, if I want to change the naming, I'd need to make that change in several places. So both refactors come down to moving this logic into a Sass mixin.

_Little did I know the Sass code didn't agree with my plans..._

## The First Refactor

Setting aside the CSS plot twist for now, this was my first attempt at the "responsive class name" mixin.

```scss
@mixin rsp-class($class-name) {
  @each $bp-label, $bp in $breakpoint-map {

    $bp-label-final: '';
    @if ($bp-label != 'xs') { $bp-label-final: \: + $bp-label; }

    @include larger-than($bp-label) {
      #{$g-nmsp}#{$class-name}#{$bp-label-final} {
        @content;
      }
    }
  }
}
```

It's a pretty straightforward move of pulling that logic into a reusable mixin, right? All I need to do is pass in the class name, and several responsive classes will be created.

You'll also see the other refactor goal reached in this line.

```scss
@if ($bp-label != 'xs') { $bp-label-final: \: + $bp-label; }
```

The breakpoint label is being added with a namespaced colon, making it end with `:md` and not `-md`. Just like Tailwind!

All that's left is replacing the repeated logic in the codebase, like with the responsive classes that add margins.

```scss
@each $label, $length in $spacing-map {
  @include rsp-class('m-#{$label}') { margin: $length; }
  @include rsp-class('mt-#{$label}') { margin-top: $length; }
  @include rsp-class('mr-#{$label}') { margin-right: $length; }
  @include rsp-class('mb-#{$label}') { margin-bottom: $length; }
  @include rsp-class('ml-#{$label}') { margin-left: $length; }
}
```

This reads even better with simpler responsive classes, like those for text alignment.

```scss
@include rsp-class('text-center') { text-align: center; }
@include rsp-class('text-right') { text-align: right; }
@include rsp-class('text-left') { text-align: left; }
```

## The Cascade Ruins My Fun

I later found a subtle difference with how the CSS is generated that renders much of this work useless. Stop and look if you didn't figure it out yet!

Done? Let's continue.

The difference is the order these responsive classes are made in. The first version took a group of classes, made the base versions of each, then made the responsive versions based on the breakpoints in ascending order. The result was something like this:

```css
.atomic-text-center {
    text-align: center
}

.atomic-text-right {
    text-align: right
}

@media (min-width: 30rem) {
    .atomic-text-center\:sm {
        text-align: center
    }
}

@media (min-width: 30rem) {
    .atomic-text-right\:sm {
        text-align: right
    }
}

@media (min-width: 50rem) {
    .atomic-text-center\:md {
        text-align: center
    }
}

@media (min-width: 50rem) {
    .atomic-text-right\:md {
        text-align: right
    }
}
```

The new one does this differently. The mixin only takes one class at a time. It loops through all the breakpoints for that class, then starts over at the next one.

```css
.atomic-text-center {
    text-align: center
}


@media (min-width: 30rem) {
    .atomic-text-center\:sm {
        text-align: center
    }
}

@media (min-width: 50rem) {
    .atomic-text-center\:md {
        text-align: center
    }
}

.atomic-text-right {
    text-align: right
}

@media (min-width: 30rem) {
    .atomic-text-right\:sm {
        text-align: right
    }
}

@media (min-width: 50rem) {
    .atomic-text-right\:md {
        text-align: right
    }
}
```

This seems like nothing, but this is CSS. Seemingly inconsequential changes can destroy the whole thing.

The key is **CSS media queries don't increase a class's specificity.** Each class in these compiled sheets have the same specificity, so they override each other based on the order. Styles lower on the sheet override ones before it.

In this context, I want classes for larger screens to _always_ override those on smaller screens. This only works when all the larger breakpoint classes are placed further down. That's how it worked before, but my changes undid that.

Look back to updated example of compiled CSS from the refactor. Let's say I had an element like this.

```html
<div class="atomic-text-right atomic-text-center:md">
</div>
```

In the refactored CSS, `atomic-text-right` is lower in the cascade than `atomic-text-center:md`. **Even though the responsive class should kick in, the base class overrides it when it shouldn't.** This makes the responsive styling classes have become so inconsistent they border on useless. It's a case of over-fitting, or making the code too focused on solving on one problem that it creates others.

Whenever someone says CSS is easy or "not a real programming language," remember cases like this!

### The Second Refactor

As with most cases of over-fitting I've encountered, I needed to take some steps backward. Moving both the naming logic and breakpoints loop into the mixin was too much. So I had the mixin only deal with naming.

```scss
@mixin rsp-class($bp-label, $class-name) {
  $bp-label-final: '';
  @if ($bp-label != 'xs') { $bp-label-final: \: + $bp-label; }

  @include larger-than($bp-label) {
    #{$g-nmsp}#{$class-name}#{$bp-label-final} {
      @content;
    }
  }
}
```

This change means when I want responsive classes, I need to loop through my breakpoint map again. I also need to pass in the breakpoint label to make the right class name.

```scss
// For Margin classes
@each $bp-label, $bp in $breakpoint-map {
  @each $label, $length in $spacing-map {
    @include rsp-class($bp-label, 'm-#{$label}') { margin: $length; }
    @include rsp-class($bp-label, 'mt-#{$label}') { margin-top: $length; }
    @include rsp-class($bp-label, 'mr-#{$label}') { margin-right: $length; }
    @include rsp-class($bp-label, 'mb-#{$label}') { margin-bottom: $length; }
    @include rsp-class($bp-label, 'ml-#{$label}') { margin-left: $length; }
  }
}

// Also for text alignment classes
@each $bp-label, $bp in $breakpoint-map {
  @include rsp-class($bp-label, 'text-center') { text-align: center; }
  @include rsp-class($bp-label, 'text-right') { text-align: right; }
  @include rsp-class($bp-label, 'text-left') { text-align: left; }
}
```

It's less DRY than the first refactor, but still much DRYer from where I started. The naming logic was the most burdensome and likely to change, so getting that into a single mixin is still a victory.

## An Ultimately Successful Refactor

There's still many refactors in store for my Atomic CSS template, but this was the biggest. It was also the most insightful, since it's a reminder of how tough refactoring code is. What seems right can actually make the code worse if you're not careful. Finding the best solutions with minimal side-effects is the truly tough part, and takes compromise (like accepting my new code can't be 100% dry).

Still, problem-solving like this is what makes programming so enjoyable to me. Even though refactoring is a never-ending battle, each one makes us a little stronger. As Jacque wrote in the post that inspired this one, that growth should be celebrated. So I look forward to the next refactor puzzles like this one!
