---
title: "Restyling my Site's Code Snippets in Quarantine"
date: "2020-05-11"
excerpt: "Working on my personal site has helped keep me sane in quarantine. This includes a long-overdue style update for my site's code snippets to make them sleeker and clearer."
image: "restyled-code-blocks.png"
featured_image_link: "https://safebooru.org/index.php?page=post&s=view&id=2706841"
tags: ["css", "design"]
---

To stay sane in quarantine, I've been busying myself with updates to my site. So far I've done the following:

- Added a celebrations page
- Made links to random posts and notes
- Expanded the colors for different notes and shuffle them around
- Expanded the Bitcoin mining operations fueled by my botnet army

But one of my favorite updates has been long overdue: restyling the code block snippets. Before they were formatted right but were bulky and awkward. I wanted them to be slimmer and better styled but still readable.

My first thought was making them look like little browser or application windows, like glancing at source code on your computer. But I later took it even further with individual styling for each coding language.

Below is how I did this on my site. The code samples show exactly how while showing off the new styling, so two birds with one stone!

## How the Code Blocks are Rendered

My site is built on Jekyll, using Kramdown to convert to HTML, and Rouge to highlight the code syntax. So for an old post of mine, the markdown I used to include a JavaScript snippet starts like this.

```markdown
```javascript
let today = new Date(),
    yesterday = new Date();
```

Once Jekyll and Kramdown convert this, here's the rendered HTML.

```html
<div class="language-javascript highlighter-rouge">
  <div class="highlight">
    <pre class="highlight language-javascript">
      <code class=" language-javascript">
        <!-- Formatted Code Renders Here -->
      </code>
    </pre>
  </div>
</div>
```

The space for the formatted code is the same as the JavaScript but with lots extra `span` tags, so I skipped over that here. But this markup is enough for basic styling.

## Basic Code Block Styling

This post only looks at the code blocks, but my site also has inline code snippets `like this one`. Both inline and block code will have light text on a dark background to contrast with regular text, so those styles can be used on their shared selector.

```scss
// All code
.highlighter-rouge {
  color: color(mono, white);

  background-color: color(mono, black);
}
```

The `color` functions are some extra Sass I set up to quickly pull my style variables. You'll see many similar functions in the below snippets, but they're pretty self-explanatory in what styles they return.

A big change not visible here is `font-family`, which before was "Bitstream Vera Sans Mono." This is a monospace font good for code, but I wanted something less blocky and awkward, so I switched to "Courier New."

Now for code blocks stylings. The below CSS cleans them up with good spacing and smaller font sizes. It also sets a max-width and horizontal overflow, so long code snippets can be scrolled without breaking the page's flow.

```scss
// block code
.highlight pre {
  margin: 0;
  padding: spacing(4);
  max-width: 100%;

  font-size: type(font-size, small);

  border-top: spacing(4) solid #c5c5d0;

  overflow-x: scroll;
}
```

You may wonder why the `border-top` styling is adding a thick, gray border on the top. Good catch! I'll return to that later.

Next is the wrapper class around the code block. It's the same `highlighter-rouge` class that block and inline code snippets share, but with an element selector to only style code blocks. These wrapper styles create a basic "window" effect by curving the corners and adding a shadow behind it.

```scss
// block code wrapper
div.highlighter-rouge {
  position: relative;
  margin-bottom: spacing();

  border-radius: spacing(2);
  box-shadow: container(box-shadow, 1);

  overflow: hidden;
}
```

Another odd bit of styling here is the relative position. If you noticed it, good catch again! Both this and the top border come into adding the code bar, which is just an extra label identifying the block as a code snippet.

This code bar should look generic since it's the default for each code block. It should be a simple gray color with the text "CODE." This is just an enhancement for sighted users, so I felt okay adding it with CSS pseudo-elements.

So a `::before` pseudo with absolute positioning is an easy way to add the "CODE" text. It also shrinks the label text to a better fit and uses the code's same font family.

```scss
// Text
div.highlighter-rouge {
  &::before {
    content: 'Code';
    position: absolute;
    top: 3px;
    left: spacing(4);

    text-transform: uppercase;
    color: color(mono, black);
    font-family: type(font-family, mono);
    font-size: type(font-size, xtiny);
  }
}
```

This is good, but I want one more touch to make it look like I window. So I used the `::after` pseudo-element to create a small button in the top right like a MacBook browser window. It can't be clicked but adds some nice visual texture.

```scss
// Button
div.highlighter-rouge {
  &::after {
    content: '';
    position: absolute;
    top: spacing(1);
    right: spacing(2);
    width: 8px;
    height: 8px;

    border-radius: 100%;
    background-color: color(primary, dark);
  }
}
```

That's all the foundational stylings taken care of for a nice code block. Here's an example of this very code in action!

```

This is some code! It looks nice and fancy and impressive, right?

```

## Adding Language Labels

I noticed code snippets has classes for specific languages. For example, a JavaScript snippet has `language-javascript` on several elements. That gave me an idea to layer on new colors and labels for code blocks using specific languages.

First, each language snippet needs a label and color. A Sass map meets that need perfectly. I did a quick regex search of the different languages I used, and either found or made up related colors for them.

```scss
$highlight-languages: (
  'html': #ff977d,
  'hbs': #fda,
  'markdown': #332d31,
  'css': #053bb9,
  'scss': #bf4080,
  'javascript': #f7df1e,
  'json': #fcf4a3,
  'yaml': #be93d4,
  'ruby': #a91401,
  'bash': #aaa
);
```

Now I need to loop through them and make classes that match what Kramdown renders. The styles need to go on the wrapper, so the JavaScript example would need to target `div.language-javascript`. So I looped through the Sass map and interpolated the language name into a selector.

```scss
// Block code for specific languages
@each $language, $color in $highlight-languages {

  div.language-#{$language} {
    // Styling here
  }
}
```

But I realized a problem: the language colors are a mix of light and dark. Some will need to use lighter colors for the text and button for proper contrast. How could I tell them apart in this loop?

I've hit a similar issue before, so I know Sass has a built-in function for measuring color lightness. I set the text and button colors to two variables and added a conditional for lightness. Now the text and buttons will use darker colors if the language color is light, and vice versa.

```scss
// Block code for specific languages
@each $language, $color in $highlight-languages {
  $text-color: '';
  $button-bg: '';

  @if (lightness($color) > 50) {
    $text-color: color(mono, black);
    $button-bg: color(primary, dark);
  } @else {
    $text-color: color(mono, white);
    $button-bg: color(primary, light);
  }

  div.language-#{$language} {
    // Styling here
  }
}
```

All that's left is the relatively simple task of overriding some CSS properties. Namely a few colors and the code bar's text.

```scss
// Block code for specific languages
@each $language, $color in $highlight-languages {
  $text-color: '';
  $button-bg: '';

  @if (lightness($color) > 50) {
    $text-color: color(mono, black);
    $button-bg: color(primary, dark);
  } @else {
    $text-color: color(mono, white);
    $button-bg: color(primary, light);
  }

  div.language-#{$language} {
    .highlight pre {
      border-color: $color;
    }

    &::after {
      background-color: $button-bg;
    }

    &::before {
      content: $language;
      color: $text-color;
    }
  }
}
```

This `@each` loop generator creates lots of extra classes, which risks bloating the CSS file. That's why these classes only override as few styles as they need to. Everything else is already taken care of.

There is some bloat by the styles changing the text and button colors for contrast. Some language colors use the dark colors already set by default. So overriding dark colors with the same dark colors isn't needed. This is just a little code bloat, but I may still refactor it away later.

## Wrapping Up

With that, this is all how you'll see the fancier code snippets throughout my site! You've seen examples of it throughout this post, but here's one with another language to drive it home.

```ruby
def links
  manga = @page.css(TITLE_SELECTOR).map { |header| header.content }.first

  @page.css(CHAPTER_URL_SELECTOR).map { |link| {
    manga: manga,
    title: link.content.gsub('/', '-'),
    href: link['href']
  } }
end
```

[Here's the full Sass partial with all these styles, including the code syntax styling I skipped over](https://github.com/maxx1128/snappy-personal-site/blob/master/_sass/_generic/_highlight.scss). It's a bit long for me to copy in a snippet here, even with the new look. Although later if I want to support long snippets better, I may add a max height with a vertical scroll. There are almost always more ways to improve one's code.

I encourage coders reading this to play around with how they style their code snippets. Or take this styling as a starting point and then restyle it for their site. Like all good redesigns, it makes me more eager to write posts and share code here.
