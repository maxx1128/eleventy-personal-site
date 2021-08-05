---
title: Flexbox gap lets you set sizes for columns and rows
category: CSS and Design
date: 2021-08-05
---

I love Flexbox, but early on, getting consistent spacing between flex items was a massive pain. You could add padding to each item. But then the container would get out of alignment and need to reverse it with negative margins. This hack usually worked, but like all hacks, it risked breaking in all but the simplest setups. As we know, the setups are almost never simple.

```css
.flexbox-wrapper {
 display: flex;
 flex-wrap: wrap;
 margin: -1rem;
}

.flexbox-item {
 padding: 1rem;
}
```

That's why the `gap` property is a Godsend. It gives Flexbox one of Grid's greatest powers: adding gaps that don't touch the surrounding spacing. It took a while to get full browser support, but I'm glad it's here to stay.

```css
.flexbox-wrapper {
 display: flex;
 flex-wrap: wrap;
 gap: 1rem;
}
```

To top it off, I learned that you can set different gap spacings for the horizontal and vertical gaps! This helps for visual spacing with items that have a more vertical or horizontal shape.

All it takes is to give the property two values. The first is for the vertical gap and the second for the horizontal gap.

<p class="codepen" data-height="700" data-default-tab="css,result" data-slug-hash="poPxbyR" data-user="max1128" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/max1128/pen/poPxbyR">
  TIL Grid Gap examples</a> by Maxwell Antonucci (<a href="https://codepen.io/max1128">@max1128</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

If you want to only declare one at a time, vertical gaps are with `row-gap`, and horizontal gaps are `column-gap`.

This came in handy sooner than I expected. While spacing a series of flex-wrapped "icon and number" pairs on a work project. Each one is a landscape-oriented rectangle, so it needed more of a column gap than a row gap to not look awkward. Knowing Flexbox, I'll find many more uses before I know it.
