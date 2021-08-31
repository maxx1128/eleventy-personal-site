---
title: Zero is a present value
category: Ruby
date: 2021-08-31
---

Ruby on Rails has a `present?` method with a simple purpose. It returns `true` if a value is not false, empty, or a whitespace string. So if you need to make sure something has any kind of value beforehand, `present?` is useful.

Now for a tricky question: **what would `0.present?` return?**

My first answer is `false`, since in my mind, `0` is an empty number. Also because `0` is a mean number that gives nothing to those around it. `0` will even destroy everything you love if you dare to multiply it. Yet all attempts to remove `0` have failed since it then threatens to divide anything by itself and destroy the universe. So we're stuck with this monster.

But it turns out I'm wrong! `0.present?` returns `true`. Here's what Rails itself tells us, along with some other values for context.

```ruby
0.present?   # true
1.present?   # true
-1.present?  # true

"".present?  # false
[].present?  # false
nil.present? # false
```

I refused to believe this for a while. `0` seemed beyond redemption for me.

But think of it this way. Say someone filled out a form asking "how many cups of ice cream did you eat today?" Would `0` be the default value? No, the input would be empty so it'd likely be `nil`. **Someone entering `0` because they sadly ate no ice cream that day is a valid answer. So, `0` being `present?` makes sense.**

That doesn't mean I'm ever going to like `0`. It knows what it did.
