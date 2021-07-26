---
title: The difference between escaping and sanitizing HTML
category: HTML
date: 2021-07-26
---

There are lots of times when I need to show web content that I, as a developer, have no control over, like user input. It often gets submitted via plain text input or a more robust text and markup editor.

But these necessary features have risks. **Letting users slip in whatever HTML code they want risks them screwing with the website.** It can be as small as putting in lots of heading tags that blow up the page layout. Or, worst-case scenario, script tags that could block functionality or steal from databases.

HTML escaping and sanitization are two ways to handle these problems. They're also terms that, like many others, I have almost understood but never clarified until I wrote it all down.

## Escaping HTML

HTML escaping is when you need a browser to show the content without any of the render powers behind it. It's like wearing a dragon mask of being an actual dragon. It looks similar enough, but you're not breathing fire and destroying any buildings. This "mask" version of the HTML is their "HTML entity." Even if it's not as fancy as a dragon mask.

Coders can escape lots of characters this way, and you can see [the full list of HTML escape codes](http://www.htmlandcssbook.com/extras/html-escape-codes/) here. But only escaping key markup characters like brackets, quotes, and ampersands should be enough.

Here's some basic HTML markup that I may want to escape.

```html
<main>
  <h1>
    I am a page
  </h1>

  <p>
    Please escape me like one of your French rooms.
  </p>
</main>
```

After running it through a basic HTML escaper online, I get this.

```html
&lt;main&gt;
 &lt;h1&gt;
    I am a page
 &lt;/h1&gt;

 &lt;p&gt;
    Please escape me like one of your French rooms.
 &lt;/p&gt;
&lt;/main&gt;
```

## Sanitizing HTML

Sanitizing HTML is much simpler: it removes all the tags around text content. Or, more often, it only removes the tags known to carry malicious code, like `script` tags.

Let's say a user gave a program this content through a website with a more robust text editor.

```html
<h1>
  I am a page
</h1>

<p>
  Please escape me like one of your French rooms.
</p>

<script>alert("I am malicious so I will pop up and annoy you!")</script>
```

After running this through a sanitizer, the program would only save this.

```html
<p>
  Please escape me like one of your French rooms.
</p>
```

## When to Use Each One?

My rule of thumb is to choose based on the user input.

**Escape content if a user is using an input that only allows plain text.** These would be the web's native `input` or `textarea` inputs, for example. The user wasn't set up to include their own markup, so any they try to sneak in should get escaped.

**Sanitize content if a user should be able to include their own markup.** This lets them use normal tags, like `h1`, without sneaking in damaging ones, like `script`.
