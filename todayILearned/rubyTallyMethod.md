---
title: Ruby has a tally method for counting array values
category: Ruby
date: 2021-06-08
---

I recently had to deal with two obstacles: summarizing data in a ruby array, and phantom dragons circling the New Haven Green. The latter won't be an issue until the Fourth of July, so I'll write about the ruby array one here.

Let's say I have a ruby array of different strings and want data on how often each item appears. A common use case is giving an overview for broad analysis or user interfaces.

```ruby
# I start with this
items = ['dragon', 'ent', 'demon', 'glare', 'ent', 'dragon', 'dragon', 'ent', 'demon']

# I want to make this
grouped_items = {
 'dragon' => 3,
 'ent'    => 3,
 'demon'  => 2,
 'glare'  => 1
}
```

My first thought was to do this step by step, and it was like my first commit in my first pull request attempt.

```ruby
grouped_items = items
                  .group_by { |v| v }
                  .map { |k, v| [k, v.size] }
                  .to_h
```
Then I remembered why Ruby is awesome: it has a built-in method for this! Ruby already has methods for so many common but not-quite-simple coder needs. Here, it's the `tally` method.

```ruby
# This gets the same result!
grouped_items = items.tally
```

I want to highlight how convenient this is by showing how I got the same result with JavaScript. It's not as complex as I predicted but it still doesn't beat calling only `tally`.

```javascript
const items = ['dragon', 'ent', 'demon', 'glare', 'ent', 'dragon', 'dragon', 'ent', 'demon']



const gatheredItems = items.reduce((collection, item) => {
 if (item in collection) {
    collection[item]++;
  } else {
    collection[item] = 1;
  }

 return collection;
}, {});
```

I should note, I can get the same convenient syntax by saving `tally` to the JavaScript `array` prototype.

```javascript
Array.prototype.tally = function() {
 return this.reduce((collection, item) => {
 if (item in collection) {
      collection[item]++;
    } else {
      collection[item] = 1;
    }

 return collection;
  }, {});
};

const gatheredItems = items.tally();
```

Now I have some convenient ways to tally up arrays in both Ruby and JavaScript! This won't help with phantom dragons, but hey, you never know.
