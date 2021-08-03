---
title: You can filter and map at the same time
category: Ruby
date: 2021-08-03
---

If you've coded enough Ruby, **you'll hit a point where you want to both filter and change items in an array.** It's happened to me about four times so far, five if I include the incident in the Czech Republic. But my shadow counsel has told me to never include that, so...forget I said anything.

Anyway, for a while, the best way to do this was to call two methods like `select` and `map`. The first filters and the second modifies. In this example, they filter out an array's odd numbers and double the remaining even numbers.

```ruby
numbers = [1, 2, 3, 4, 5, 6]
coolNumbers = numbers.
                select { |n| n.even? }.
                map { |n| n*2 }

# [4, 8, 12]
```

This works but seems needlessly complex. The cleanest you could get it in two methods could be with `map` and `compact`. Map modifies the numbers I want and makes the others `nil`, and `compact` removes all the `nil` values.

```ruby
numbers = [1, 2, 3, 4, 5, 6]
coolNumbers = numbers.map { |n| n*2 if n.even? }.compact

# [4, 8, 12]
```

Then Ruby 2.7 came along with `filter_map` that does this in one method. **It acts like the `map` method, but it removes falsey values from the resulting array altogether.** This is simpler, more explicit, easier to read, and leaves less room for errors to slip in.

```ruby
numbers = [1, 2, 3, 4, 5, 6]
coolNumbers = numbers.filter_map { |n| n*2 if n.even? }

# [4, 8, 12], but cleaner
```

If you are already using Ruby 2.7, or have a chance to, please give this method a go when you can!

Also, when JavaScript takes this proactive approach to adding useful and overdue features, please let me know.
