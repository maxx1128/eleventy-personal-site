---
title: Rails lets you pluck attributes without loading models
category: Ruby
date: 2021-09-13
---

I haven't used Ruby on Rails as much as HTML or CSS. But even I've asked myself this question plenty of times.

_"Descartes relies on God being an all-good being to believe it would not deceive him. So doesn't the existing problem of evil mean any God could still be deceiving our senses?"_

There's another question more relevant to Rails I've also asked myself.

_"How can I load one attribute from a record, but not all of them?"_

Let's say I had a giant list of philosophy quotes. I want to get five random names from the quotes' authors. So I have a `Quote` model that has, among other things, an `author` column with their name. How do I get these names?

There have been many times I got that data this way.

```ruby
Quote.order('RANDOM()').limit(5).map(&:name)
```

**This works, but I have to load each attribute of each record. This isn't a lot for small records like philosophy quotes. But larger records means larger queries that burden the servers.**

That's where the `pluck` comes in! It doesn't load the whole record, only the given attribute. It's a smaller query and the syntax is more explicit.

```ruby
Quote.order('RANDOM()').limit(5).pluck(:name)
```

Now I have an easier way to get the names of old dead white men who can tell me why evil exists in the world. Presumably the answer isn't a lot of the old white men that haven't died yet.
