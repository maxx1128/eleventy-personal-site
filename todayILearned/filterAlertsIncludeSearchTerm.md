---
title: Filter alert text should include the search term
category: Accessibility
date: 2021-09-30
---

Let's say you have a list of items users can filter down. Then you should have an `aria-live` element that updates with the number of results. That way after each search, screen-reader users will know how many are there.

```handlebars
{% raw %}<div aria-live="polite">
  Your search returned {{numberOfResults}} results.
</div>{% endraw %}
```

But what if a user does two different searches that return the same number of results? The text in the `aria-live` region won't change, and screen-reader users won't get an update! They may think something broke or their search returned nothing.

The trick to avoiding this is **use the search term in the `aria-live` region.**

```handlebars
{% raw %}<div aria-live="polite">
  Your search for "{{searchTerm}}" returned {{numberOfResults}} results.
</div>{% endraw %}
```

Now screen-reader users will hear the number of results for new searches!

But there's still common mistakes you'll need to avoid.

* Don't update the `aria-live` text to something like "Now searching..." after each change. That'll start to piss off the user.
* Wait after each keystroke to make sure the user finished typing before updating the text. Otherwise, they'll hear a bunch of short, irrelevant messages as they type and get even more pissed.
* Don't replace the `aria-live` messages with random passages from classic novels. It may seem enlightening but will piss them off the most. Especially if it's a book they've been telling themselves to get around to reading. This will only remind them of their procrastinating, illiterate nature. They'll get furious, break the computer, blame you, and demand money to replace it.

But if you avoid all that, you're in the clear.
