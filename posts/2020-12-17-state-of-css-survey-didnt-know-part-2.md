---
title: "What I Didn't Know in the 2020 State of CSS Survey, Part 2"
date: "2020-12-17"
excerpt: "Everything else I didn't know from the 2020 State of CSS Survey I couldn't fit in the first post."
image: "css-survey-2.jpg"
featured_image_link: https://safebooru.org/index.php?page=post&s=view&id=247170
---

Last month I wrote about the first batch of CSS goodness I discovered by taking the State of CSS Survey this year. Then I got delayed from writing this second part thanks to the continued pandemic, changing apartments, and reading [the results of the State of CSS survey](https://stateofcss.com/) itself. I also think [I had a birthday of some kind](https://www.maxwellantonucci.com/posts/2020/11/28/birthday-resolution-fail-more/), I'm not sure.

Valid excuses aside, I have finally finished part two of this CSS min series. So I'll get back to it without further delay!

## CSS Exclusions

The journey begins.

Most people who've worked on the front-end will recognize this kind of layout:

![A layout where the image is pushed all the way to the left, with text flowing around it to the right.](/assets/images/posts/css-survey-2/exclusion-1.jpeg)

It's pretty simple. A designer wants to include a small image alongside the text. Having it wrap around the image lets it be included without wasting too much space.

The main way to do this is with `float`. It pushes an element to one side of the container, and any surrounding elements wrap around it. I do the same thing on my own "About" page. It's an established solution to this problem.

Not so fast.

Say one day your designer comes to you with this layout.

![Another layout with two columns of text and an image in the space between them. The text in both columns wrap around the image as needed.](/assets/images/posts/css-survey-2/exclusion-2.jpeg)

Now, `float` isn't going to help you at all. Floats being you to one side or the other, it can't put you between two elements. There's no real way to get this effect with Grid or Flexbox that's responsive and not excessively convoluted either.

Or so I thought.

This is where [CSS Exclusions](https://webdesign.tutsplus.com/tutorials/css-exclusions--cms-28087) enters the scene. If you apply a CSS Exclusion to an element, you're telling the browser it's an "exclusion element" and it gets its very own "exclusion box." **An exclusion box is that element telling the others around it they can't overlap or touch it. They're excluding it from its space!**

That's certainly rude, but the other elements have to put up with it. The good news is they won't go out of their way to appease the exclusion element. They'll avoid it but they'll keep following their own formatting rules. If they let one element like that destroy the whole layout, it would be anarchy!

So in the above example, where the exclusion element is between two columns of text? That text will wrap around the exclusion element without leaving their defined column areas. Same thing if it was in a Flexbox or Grid layout.

Yes, you could have float-style wrap effects in Flexbox or Grid layouts! This opens up so many new layout opportunities with much simpler styling.

That, my dear friends/readers/informants, is what makes CSS Exclusions awesome.

According to current specs, you create the actual effect with the `wrap-flow` property. It has seven potential values that let you decide how content flows around an element. You have the basic wrapping like above, or you could clear content on the entire sides of the element. [This Beyonce-inspired article has more specific details on CSS Exclusion options if you want them](https://chenhuijing.com/blog/css-exclusions-with-queen-bey/#%F0%9F%92%BB).

One final note, which is a disappointing one: Only one browser supports CSS Exclusions, and it's Edge, the one browser you likely never use unless you're doing cross-browser testing. So you'll need to be patient before using this in production. Or anywhere, really.

So the adventure continues.

## Pointer Events

The term "pointer event" may make you think only of mouse pointers. But [pointer address a wide variety of events around interacting with something online](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) - using a stylus, touch screens, or other kinds of assistive tech. As long as the trigger can be focused around coordinates on a device (the point on the screen), pointer events shall handle them.

**The `pointer-events` CSS property lets you set the circumstances that the selected element can become targeted by pointer events.** You could use CSS to give a link no pointer events so you could only interact with it like normal text.

There's a lot of possible values for the `pointer-events` property, but most relate to SVG that I won't go into here. The main ones for HTML elements are keeping the default, removing them all, or basing it on what the parent element's pointer events are.

<p class="codepen" data-height="300" data-theme-id="light" data-default-tab="result" data-user="zakkain" data-slug-hash="dseHt" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="CSS-Tricks: pointer-events">
  <span>See the Pen <a href="https://codepen.io/zakkain/pen/dseHt">
  CSS-Tricks: pointer-events</a> by Zachary Kain (<a href="https://codepen.io/zakkain">@zakkain</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

[The CSS Tricks Almanac (a great resource overall) gives the above example of where you may want to use the pointer-events property](https://css-tricks.com/almanac/properties/p/pointer-events/): letting users click through overlays or other elements that may block other elements you want to let users keep access to.

## Color Gamut

[A sad truth is we are not like the mantis shrimp](https://www.livescience.com/42797-mantis-shrimp-sees-color.html). We only have three color receptors in our eyes, and the mantis shrimp has twelve. They can see color in a way far beyond our puny human brains.

We also can't attack people with lightning-fast strikes carrying over 200 pounds of force, but one depressing fact at a time.

But at least our computers are getting better at seeing new colors. Some desktops can display colors at a level we don't know about when we're picking our website's colors, also called a "wide-gamut display." That's a quick way to a lackluster-looking site, picking colors that don't make use of all these possible color options.

We have an advantage over the mantis shrimp here. We have CSS! It brings us three new color modes to make use of this wider gamut of color options: `lab`, `lch`, and `display-p3`. I won't get into their syntaxes here, but those who want to know more now can read [this CSS Tricks articles on using these new color modes](https://css-tricks.com/the-expanding-gamut-of-color-on-the-web/). But to understand `color-gamut`, you only need to know they exist.

**Why? Because it's the media query that lets you use the colors when available!**

Say you have a basic red color as a hex value. But you also have a nice `display-p3` color you want to use for desktops that can. You can include both by using the media query like so:

```css
:root {
    --red: #FF0000;
}

@media (color-gamut: p3) {
    --red: color(display-p3 1 0 0.331);
    /* Let us presume this is a nicer red color */
}
```

There are other ways to handle like, like a `@supports` query or passing a fallback to the `color()` function. But the media query gives you more control and lets you add additional styles behind the query if needed.

## Line-clamp

This property was easier to learn since you can guess it from the name. [Line-clamp lets you set a maximum number of lines for an element to show](https://css-tricks.com/almanac/properties/l/line-clamp/). If there are any more lines than that, the CSS *clamps* down on them and treat them as overflow.

You can see some basic examples of how this works below.

You can also handle the overflow in different ways that CSS already allows. **You can hide the extra text altogether or let users scroll to see more.** The latter could be useful with modals that could have an unpredictable number of lines.

<p class="codepen" data-height="575" data-theme-id="light" data-default-tab="result" data-user="max1128" data-slug-hash="abmWEza" style="height: 575px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Line Clamp Overflow Examples">
  <span>See the Pen <a href="https://codepen.io/max1128/pen/abmWEza">
  Line Clamp Overflow Examples</a> by Maxwell Antonucci (<a href="https://codepen.io/max1128">@max1128</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

I welcome this property and am glad it already has surprisingly good browser support. The past tricks I've used to limit text to one line took modifying white space and manually adding ellipses, which worked but was a lot of hassle to get right. This is simpler and even adds ellipses for me. All it needs now is to put the extra mint on my pillow.

## New Units of Size

I only use rem and pixel units in my styling these days, but there are some other CSS units worth remembering in the future.

First are three that don't need much explanation to most people - mm, cm, and in. **They refer to their real-life measurement units of millimeters, centimeters, and inches.** They're absolute values like pixels, which means they won't change if users adjust their browser for bigger font sizes. But they can be useful if you're styling a print-specific version of a webpage since you're working within more static sizes for your content anyway. That and they're the units many people are already used to when designing for print.

The fourth unit I found, ex, is a little trickier. ["Ex" is a relative size unit equal to one unit of the current font's x-height](https://webdesign.tutsplus.com/articles/7-css-units-you-might-not-know-about--cms-22573). **A simple way to find the x-height value is to measure how high the letter "x" is in that font.** It's easy once you see it.

![A visual example of what determines the x-height. It's the height of the letter 'x.'](/assets/images/posts/css-survey-2/x-height.jpeg)

This is how much `1ex` unit will be. It'll be equal to most other lowercase letters too. So it's useful for lots of typographic spacing, on a large or small scale.

## New Pseudo-Elements

The only pseudo-elements I knew before were `::before` and `::after`, and I thought they were mainly for adding extra elements for more advanced styling. **These new pseudo-elements have similar functionality but with more precise purposes.**

First is `::marker`, which can only be used on list items. [`::marker` lets you adjust a few styles for the item's "marker box," or element that identifies them as a list item](https://developer.mozilla.org/en-US/docs/Web/CSS/::marker). For example, an unordered list's marker boxes are bullets, while ordered lists have numbers.

[`::backdrop`, meanwhile, can only be used to style the backdrop behind the `dialog` element](https://developer.mozilla.org/en-US/docs/Web/CSS/::backdrop). So adding a full-screen, transparent backdrop would be as easy as one more line of CSS. It even makes use of [the Fullscreen browser API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API) to create the effect for us. Which I didn't even know was a thing until now.

Seeing that dialog backdrops are already included in `dialog` elements makes me even more eager for this HTML5 element to get stronger support. Dialogs are nightmares, but this element could make it easier to handle. Both these pseudo-classes (as well as dialog) only have mixed to decent browser support, so don't go crazy with them yet.

## The :is() Selector

The `:is()` selector is the next in the "Let CSS do naturally what Sass can do" series, following custom properties replacing Sass variables.

Say you want to select all paragraphs in an `article` or `section` tag. Using Sass, you'd write it like this.

```scss
article,
section {
    p {
        // Styles goes here!
    }
}
```

This would get compiled into the following CSS.

```css
article p,
section p {
    /* Styles go here! */
}
```

This does what you need, but the compiled styles can grow surprisingly fast. Especially if you needed to style other elements in those two, like ordered and unordered lists.

```css
article p,
article ol,
article ul,
section p,
section ol,
section ul {
    /* Styles go here! */
}
```

It's compiled into six separate rules just from that! On a larger scale, you could even get dozens to try for this "matches any of the above" selector effects.

The `:is()` selector gives you that same effect without the preprocessing. You could theoretically get the same effect as above with this.

```css
:is(article, section) :is(p, ol, ul) {
    /* Styles go here! */
}
```

**One selector rule that targets all the same styles, no Sass needed.** In some ways, it's even better since it's more readable than nested rules that grow out of hand.

The most interesting thing about this selector is it's the third attempt to get CSS a selector like this, the first two being `:any()` and `:matches()`. As [this other CSS Almanac on the ":is" selector](https://css-tricks.com/almanac/selectors/i/is/) points out, these first two put together have decent browser support. Presuming `:is()` gets finalized into CSS later on, it would likely replace those two. But until then, there's a somewhat convoluted but workable way to use this today if you want.

## Link Selectors

Turns out you can target link elements with more than a mere anchor tag selector.

[First off is `:any-link`, which looks for any possible element that has an `href` attribute](https://css-tricks.com/almanac/selectors/a/any-link/) (including the lesser-known `link` and `area`). This includes any link elements that have been visited and you'd need to use `:visited` to target otherwise. It's got pretty good browser support, so you can use it today!

[Next up is `:local-link`, that only targets links in the current domain](https://developer.mozilla.org/en-US/docs/Web/CSS/:local-link). **So you can easily change styles between links to other sites and links staying on your own.** An example I can think of is distinguishing external links in any site navigations, since otherwise, users may assume all those links stay in your website. One website I saw said you could even target it based on sub-domains, like links only in your local `/blog/` pages, but couldn't confirm this anywhere else. But unlike `:any-link`, this is still a working draft and has zero support as of this writing.

Third up is...nothing. There were only two link selectors I wanted to cover here.

I *could* have organized this section up better.

## Form Controls

These pseudo-classes are all about form inputs and their states. There's a bunch to cover, so I'll tackle them all lightning round style.

- [`valid` and `invalid` only work for required fields with at least one rule](https://www.digitalocean.com/community/tutorials/css-styling-form-input-validity), like being a number or falling in a certain range. You can also pair them with the `:focus` selector to only show the styles on user focus.
- [`user-invalid` is the same as `invalid`, but only kicks in after the user has interacted with the field once](https://css-tricks.com/almanac/selectors/u/user-invalid/). So if a form loads with a pre-filled, invalid value, these styles won't kick in until the first interaction.
- `indeterminate` is a tricky "maybe" state in some inputs, most commonly seen in checkboxes. The browser sees [`indeterminate` inputs as "unchecked," but are styled differently to look like a kind of half-yes, half-no](https://css-tricks.com/almanac/selectors/i/indeterminate/). You can also only get this state by using JavaScript. So I'd avoid relying on this state without a good reason, even with good support for it.
- [`:in-range` and `:out-of-range` speak for themselves: they style if an input value falls inside or outside the input's set range](https://css-tricks.com/almanac/selectors/i/in-range/). The most obvious example is a number being too high or too low from what's allowed.
- `Prosciutto` is an Italian dry-cured ham that is usually thinly sliced and served uncooked, and is known as `prosciutto cotto` in Italy. It's notably high in fat and sodium, so for a daily diet, you may want to...oh, sorry, need to save this for the next [Trivia Murder Party](https://www.jackboxgames.com/trivia-murder-party/).

Phew, that's a lot to cover in an already long blog post. I'm off to the bonus round before I wrap this up.

## In Conclusion

Even after two whole posts, there's still content from the CSS Survey I haven't covered! They're mostly methodologies, podcasts, newsletters, and more. But I barely had time to write this amid moving and a pandemic, so I'm going to pass on those for now.

So I'm closing the books on this little mini-series. Some people may understandably think I only scratched the surface of what these tools can do and how to demonstrate them. I would agree with them, and encourage them to look into them more! **There are way too many nuances of functionality, overlap with past CSS properties, and browser support to cover in one post. Any one of these sections could have been a separate blog post.** I encourage anyone up for it to try writing one of them!

I also encourage them to get six to eight hours of sleep and floss regularly. But once you have those covered, the blog writing awaits.
