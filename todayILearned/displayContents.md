---
title: "display: contents gives you reordering powers"
category: CSS and Design
date: 2021-10-02
---

It was the long-ago of "most of my web development career." When dragons roamed o'er the land, ordering elements was pretty simple. Grid and Flexbox let you change the visual order of elements, but only for element siblings.

So I could reorder the elements inside `.article__text-content` here.

```html
<div class="article__text-content">
  <h2 class="article__title mt-0 mb-2">
    <a href="javascript:void(0);">
      Article Title
    </a>
  </h2>
  <p class="article__author font-weight-bold">
    By Random McLorem
  </p>
  <p>
    I suppose this article should be about something. Let's say it's about pancakes and Pokemon. Would pancakes shaped as Pokemon count?
  </p>
</div>
```

But I couldn't include an image tag outside this grouping in the reordering.

```html
<div class="article__text-content">
  <h2 class="article__title mt-0 mb-2">
    <a href="javascript:void(0);">
      Article Title
    </a>
  </h2>
  <p class="article__author font-weight-bold">
    By Random McLorem
  </p>
  <p>
    I suppose this article should be about something. Let's say it's about pancakes and Pokemon. Would pancakes shaped as Pokemon count?
  </p>
</div>

<img class="article__image" src="image.jpg" alt="An image of a Pokemon trainer smiling, winking, and giving a peace sign.">
```

'Twas a simpler time. I could reorder the image and `.article__text-content` as a whole. But not the image and any individual element within that container. That's logical, but it limits how I may want to reorder things for different layouts.

But times have changed, and a new era has dawned! Now `display: contents` changes that! **It makes wrappers like `.article__text-content` stylistically non-existent. Now I'm free to treat its children and any adjacent elements like they're on the same level.**

Let's say on mobile, I want to move the image between the article author and excerpt. Here's the core of what I'd need.

```scss
@include smaller-than(md) {
  .article__text-content {
    display: contents;
  }

  .article__title,
  .article__author,
  .article__image {
    order: -1;
  }
}
```

Hark, it indeed works! You can see it in action here. Toggling the `HTML` tab or choosing a smaller magnification lets you see how the layout changes.

<p class="codepen" data-height="600" data-default-tab="html,result" data-slug-hash="JjJzOze" data-preview="true" data-user="max1128" style="height: 600px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/max1128/pen/JjJzOze">
  Testing out Display: Contents</a> by Maxwell Antonucci (<a href="https://codepen.io/max1128">@max1128</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

It's only a matter of time until CSS lets me change markup into other elements. I'll also be able to change their content and make them ride dragons into the sunset. Dragons that get built on linear gradients, pseudo-elements, and complex box shadows.

The future looks bright!
