---
title: How to properly wrap definition lists
category: HTML
date: 2021-08-17
---
Definition lists are an oft-misunderstood element. They're also one we front-end developers have missed many chances to use right.

**In simplest terms, [definition lists are used for list of name-value pairs.](https://benmyers.dev/blog/on-the-dl/)** You'd want to use a regular unordered list for a list of menu items.

```html
<ul>
	<li>Bagel with Cream Cheese</li>
	<li>Pasta Primavera</li>
	<li>Strawberry Cheese Cake</li>
</ul>
```

But if you want to list menu items with their prices? That's when a definition list would help.

```html
<dl>
	<dt>Bagel with Cream Cheese</dt>
	<dd>$3.95</dd>

	<dt>Pasta Primavera</dt>
	<dd>$16.95</dd>

	<dt>Strawberry Cheese Cake</dt>
	<dd>$8.95</dd>
</dl>
```

But there's one question I've never answered all the way: **can I wrap the pairs in a definition list with a tag to style them?** For a long time, I assumed the answer was yes and used `span` tags. So for a long time, I was making an ass of you and myself.

Let the ass-making now end! As I've read [in the MDN Web docs, definition list pairs can be wrapped but only with `div` tags.](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl#wrapping_name-value_groups_in_htmlelementdiv_elements) I was so close and yet so far all this time.

```html
<dl>
	<div>
		<dt>Bagel with Cream Cheese</dt>
		<dd>$3.95</dd>
	</div>

	<div>
		<dt>Pasta Primavera</dt>
		<dd>$16.95</dd>
	</div>

	<div>
		<dt>Strawberry Cheese Cake</dt>
		<dd>$8.95</dd>
	</div>
</dl>
```

The docs don't mention anything about how many times we can wrap them. Or if we can wrap many pairs together. So I'll avoid doing that until I see some authoritative documentation for it. I'm going to assume no and avoid any potential ass-making for a while.
