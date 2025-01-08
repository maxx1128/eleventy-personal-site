---
title: 'The Cache Introduction I Wish I Had'
date: '2025-01-08'
excerpt: "Caching is often a blessing and a curse, but is always essential for better web performance."
---

Caching. It’s one of those words that you hear thrown around in tech conversations, like ["currying,"](https://www.maxwellantonucci.com/posts/2021/02/16/currying-introduction/) [“programmatic determinability,”](https://www.maxwellantonucci.com/posts/2021/01/15/programmatic-determinability/)  or [“structural design patterns”](https://www.maxwellantonucci.com/posts/2019/09/09/cinderella-structural-patterns/) - everyone nods as if they totally get it. But for a long time, caching felt like magical fairy dust for performance on projects and my personal site...until it breaks, and suddenly it’s a giant headache. So, let’s dive into what caching actually is, why it’s essential, and how you can wield its power without breaking your keyboard.

## What is Cache?

Think of cache as your app’s short-term memory. It’s a temporary storage layer that keeps frequently accessed data so your app doesn’t have to go fetch it every single time someone asks for it. {% footnoteref "boiling-water" "To be clear, this isn't me. Not since we got a Keurig." %}Imagine if you had to Google “how to boil water” every time you wanted tea. Annoying, right?{% endfootnoteref %} That’s what cache prevents.

In practical terms, caching can happen at various levels:

- **Browser cache**: Stores assets like images, JavaScript, and CSS files locally to speed up page loads.
- **Application cache**: Saves data like API responses to avoid repeatedly querying your server.
- **Database cache**: Uses tools like Redis or Memcached to store query results for faster retrieval.

The point is: cache saves time and resources. But, as you’ll see, it’s not all sunshine and rainbows.

## Why Cache Matters

Caching is like the secret seasoning of performance optimization. Whether you’re building a web app, pumping up your blog, or making sure your users can browse while sipping lattes at a Wi-Fi dead zone, caching is your best friend. Here are some reasons why:

- **Speed is king**: Cached data loads faster because it avoids unnecessary trips across the network or to the database. This improves user experience and reduces server load. For example, a Progressive Web App (PWA) can cache assets locally, letting users continue to access content even when offline.

```jsx
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-cache-v1').then((cache) => {
      return cache.add('/styles.css'); // Cache your CSS file
    })
  );
});

```

- **Offline functionality**: PWAs use service workers to cache key resources, enabling offline access. Think of it like saving a backup of your Netflix show for when you’re on a plane. You can even cache commonly-visited URLs, like the homepage.
- **Efficiency for the win**: Instead of hitting your server 1,000 times per second, caching can handle repetitive requests locally. For instance, if your app uses Redis to cache Rails queries, you can turn expensive database lookups into lightning-fast cache hits. 

### Caching and Cookies

Cookies are a sometimes-overlooked form of caching, particularly for small bits of user data. A favorite use case of mine is to save and/or check for any theme the user set on a website. This remembers your user’s preferences between visits and sessions.

```jsx
// Function to get or set theme cookie
function getOrSetTheme(defaultTheme = 'dark') {
  // Try to find existing theme cookie
  const existingTheme = document.cookie
    .split('; ')
    .find(row => row.startsWith('theme='))
    ?.split('=')[1];

  if (existingTheme) {
    return existingTheme;
  }

  // If no theme cookie exists, set it
  document.cookie = `theme=${defaultTheme}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
  return defaultTheme;
}

const theme = getOrSetTheme();
console.log(theme); // Outputs: 'dark' (or existing theme if set)
// From here, you can add a class or custom property to your site
```

**Good use cases for cookies**:

- Storing small preferences (like themes or language settings).
- Session management.

**Bad use cases for cookies**:

- Storing large datasets (you’ll hit major performance issues).
- Sensitive data (use proper session storage or tokens instead).

## Common Difficulties in Managing the Cache

Caching is powerful, but it’s also like {% footnoteref "friend" "To my friends reading this, you know who you are." %}that one friend who’s amazing 90% of the time and a total disaster the other 10%.{% endfootnoteref %} Here are some common issues ahead of time so you can better avoid them.

### The Dreaded Cache Invalidation

Ah, cache invalidation. Phil Karlton famously said, *“There are only two hard things in Computer Science: cache invalidation and naming things.”* It’s the most-used quote at every office I’ve been at for good reason. **Cache invalidation is the process of ensuring outdated or “stale” data gets removed or updated correctly.** Mess it up, and users might see old data or broken interfaces. Even worse, you may spend hours {% footnoteref "debug" "Your coworkers will at least let it go after a few days." %}trying to debug a webpage only to see all your updates are correct, only to see they kept getting overrode by a stale cache.{% endfootnoteref %}

Here’s an example of checking for a stale CSS file and updating the cache in a PWA:

```jsx
self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['my-cache-v2']; // The new cache version
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // Delete old caches
          }
        })
      );
    })
  );
});

```

### Cache Size: Bigger Isn’t Always Better

Caches can grow like that junk drawer in your kitchen—until they’re a bloated mess and your family yells at you. Overloaded caches can slow down your app or even crash it. To prevent this:

- **Set size limits**: For example, limit your Redis cache to a certain number of megabytes and evict the least recently used (LRU) items when full (removing the least recently used file is a good rule of thumb to follow overall).
- **Use cache expiration policies**: Automatically clear cached items after a certain time period. Bonus points if you set the expiration date based on how often the data actually changes.

```ruby
# Set up Redis connection
redis = Redis.new(host: "localhost", port: 6379)

# Cache data with a 1-hour expiration
redis.setex("user_preferences", 3600, { theme: "dark" }.to_json)

# Later, retrieve the data (returns nil if expired)
cached_data = redis.get("user_preferences")

if cached_data
  preferences = JSON.parse(cached_data)
else
  # Handle cache miss - fetch from database, etc.
end
```

## Practical Tips for Managing Cache in PWAs

Here are some rules of thumb for how you can keep your cache (and your sanity) in check whether it's for PWAs, browsers, or database requests.

- **Version your caches**: Always include a version number in your cache name (e.g., `my-cache-v1`). This makes it easier to update or replace outdated caches. This has personally saved me hours of debugging time.
- **Use service workers wisely**: Service workers are the backbone of PWA caching, but they can be tricky to debug. Test thoroughly in staging environments before deploying to production, and remember to update their versions when the assets change.
- **Fail gracefully**: If a resource isn’t cached and the user is offline, display a friendly fallback page or message. Nobody wants to stare at a blank screen, and a fallback screen is almost always just fine.

## Wrapping Up

Caching is one of the most powerful tools in a developer’s arsenal for improving performance and user experience. But like any tool, it comes with its own set of challenges. By understanding the basics, leveraging best practices, and tackling common pitfalls head-on, you can make caching work for you—not against you.

So go ahead, version your caches, embrace service workers, and never forget to clear out the stale stuff. Happy caching!