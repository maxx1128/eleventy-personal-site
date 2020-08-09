---
title: "How to Refactor an Anime Newsletter"
date: "2018-01-28"
excerpt: "I revisit my first real Node program to refactor it with more ES6 syntax, asynchronous functions, and anime wallpaper feeds."
tags: ['javascript', 'anime']
image: refactor-anime-newsletter.jpg
featured_image_link: https://safebooru.org/index.php?page=post&s=view&id=1255005
---
As a junior dev, I've embraced the bizarre feeling of reading old code. It's a mix of disgust over how _bad_ I used to be, and joy over how bad I _used_ to be. This happens most with JavaScript, due to all the time I've spent writing and improving with it.

As I've refocused on learning JavaScript, I revisited one of my favorite Node programs. It took one afternoon to write but has cheered me up each day for months: [my Anime Wallpaper Newsletter.](https://dev.to/maxwell_dev/how-to-make-an-anime-newsletter). Six months ago I wrote here about how it grabs the most-liked wallpapers shared from a Twitter account and emails me them each morning.

Half a year later, I'm writing about how I recently refactored it.

### The Big Change: Adding More Twitter Accounts

A major part of my program using Twitter's API to access one Twitter account's tweets. It would export a Promise object that another JavaScript file would resolve - this worked but wasn't very modular. Ideally I'd want to export a JSON object that's already been trimmed and sorted.

Even more ambitiously, I'd want to get data from even more Twitter accounts!

#### Making all the Twitter Requests

I wasn't sure where to start, so I went simple: list all the Twitter accounts in one array.

```javascript
const TWITTER_ACCOUNTS = ['AceWallpaperBot', 'AceYuriBot', 'anipictures'];
```

Now I had to turn this into several Twitter API requests. I tweaked the old code to make a simple function that could make the request for any account, while using ES6 string interpolation too.

```javascript
function twitter_request(username) {
  return T.get('search/tweets', { q: `from:${username} since:` + date.yesterday + ' until:' + date.today, count: 100 });
}
```

Now I have an array of account names, and a function that can take those and return Promise objects with the results. Six months ago I would have done a for loop that pushed each Promise to another array. Today I knew a more efficient option: using a map and arrow function! This passes each account into the function as part of a new array in one line.

```javascript
const twitter_api_requests = TWITTER_ACCOUNTS.map((account) => twitter_request(account));
```

I've got all my Promises waiting to be resolved!

#### Resolving Three Promises in Parallel

This was great but left one issue: I have three promises, what's the best way to resolve them?

My first thought was "one at a time," but that's wasteful. Promises should operate asynchronously - I should try to resolve them all at once.

That's possible with `Promise.all`. It accepts an array of promises, and it resolves when each Promise I pass resolves. I conveniently have an array of promise objects, so it's perfect!

Six months ago I would've put this in a regular function. But the me of today (that google searches "asynchronous JavaScript") had a better idea: **asynchronous functions.** They're like regular functions but return other promise objects, and use `await` expressions that pause the function until other promises resolve.

Why would I use this, you hypothetically ask yourself? It's part of me thinking more asynchronously. Twitter API requests need time to return data, so functions relying on it have to wait. If not, a function could run before the data's there. Asynchronous functions know to wait and are perfect here. This may sound basic, but I've been so used to JavaScript going in a straight line, it's a big shift for me.

```javascript
async function get_twitter_api_results() {
  try {
    let twitter_api_results = await Promise.all(twitter_api_requests);

    return twitter_api_requests;
  }

  catch(error) { console.log(error); }
}
```
This function will pause on line three until it has all the Twitter data. Once it does, the function resumes and returns the data - it won't finish too fast and returning `undefined`. I also used a `try...catch` block so it's easier to manage errors if a promise fails.

The function returns my Twitter data once each request resolves. Now's the fun part of organizing it all!

#### Grabbing the Top Five Wallpapers

This part's similar to my old post where I created the newsletter. I organized the tweet data by number of likes, took the top five, and grabbed their data.

The only difference here is I need to put everything in an asynchronous function and run it for each promise. The function then returns an array of arrays.

```javascript
async function organize_twitter_data() {
  try {
    let twitter_api_promises = await get_twitter_api_results(),
        tweet_data = [];

    twitter_api_promises.forEach(function(promise, i) {
      promise.then(function(value) {
        let images = [];
        const results = value.data.statuses;
        results.forEach(function(entry, i) {

          if (entry.entities.media !== undefined) {
            const newEntry = {
              filename: 'Wallpaper #' + i,
              path: entry.entities.media[0].media_url_https,
              likes: entry.favorite_count,
              cid: 'https://pbs.twimg.com/',
              img_tag: '<img src='+ entry.entities.media[0].media_url_https +' />'
            };

            images.push(newEntry);
          }
        });

        images.sort(function(a, b) { return b.likes - a.likes; });
        tweet_data.push(images.slice(1, 6));
      });
    });

    let all_promises = await Promise.all(twitter_api_promises);

    return tweet_data;
  }

  catch(error) { console.log(error); }
}
```

The result is an array with three items. Each contains another array of the five top tweets from an account. This was the simplest form of the data I needed.

This was a good stopping point for this file, since I want each to have a single, specific purpose - this one is finding all the Twitter data. All that's left was exporting it with `module.exports`.

```javascript
module.exports = {
  accounts: TWITTER_ACCOUNTS,
  data: () => organize_twitter_data()
}
```

You may wonder why I also exported the twitter accounts array. I'll need that info for the email body, and exporting it avoids updating it in many places. That's all explained in the next section.

### Constructing the Email

My code to send the email through GMail hasn't changed, so instead I'll focus on the new way the email's made. This is done in a separate file, where the first step is importing what's needed.

```javascript
const twitter = require('./get_twitter_data'),
      send_email = require('./mailer');
```

I was in a "function" mindset, so I thought about what tasks could be broken into their own functions. This file had two main tasks:

1. Create the email body from the Twitter data
2. Send the email with the mailer

My first version had these in one function, but I realized they could be separate. Sending the email would be asynchronous, since it relied on waiting for the data. But making the email body was much simpler - loop over the data to make an HTML object. At it's core it wasn't asynchronous.

So the first task could be a normal pointer function, creating a three-column email layout from the array of arrays.

```javascript
const create_email_body = (email_body_data) => {
  let email_body = '';

  email_body_data.forEach(function(account, i){
    email_body += `<div style="width: 33%; float: left; padding: 8px; box-sizing: border-box;"><h2>${twitter.accounts[i]}</h2>`;

    account.forEach(function(photo, index){
      email_body += '<h3>Wallpaper #' + (parseInt(index) + 1) + ' at ' + photo.likes + ' likes</h3><img style="max-width: 100%; height: auto;" src="' + photo.path + '" >';
    });

    email_body += '</div>';
  });

  return email_body;
}
```

Here the `twitter.accounts[i]` is in the first `forEach` loop, so the account name is matched to their wallpapers.

With this function separate, the asynchronous one to send the email becomes much simpler.

```javascript
async function send_newsletter() {
  try {
    const email_body_data = await twitter.data(),
          email_body = create_email_body(email_body_data);

    send_email(email_body);
  }

  catch(error) { console.log(error); }
}
```

It waits for the Twitter data, creates the email body with it, and sends that body using the mailer. This is much easier to maintain, and this function is exported so any file can use it to send the newsletter.

```javascript
module.exports = () => send_newsletter();
```

### Newsletter Complete! Again!

Once again I've covered a lot, and this isn't even the whole refactor. I also used Node environmental variables to protect my API keys, and used an Express server instead of Heroku's scheduled tasks. As a whole the refactor let me dirty my hands with many areas I'd mostly just read about - more ES6 syntax, async/await, and Heroku app configuration.

But like when I first wrote this program, the biggest step is getting further away from pure front-end and pushing into more advanced JavaScript. I've refocused away from full-stack, which means digging deeper into the wonders/horrors of JavaScript, such as Node and frameworks like React. More projects like these will help me muddle through all the new info and crystallize it into something real.

If those projects are all focused around anime and other nerd topics? That's just a bonus.
