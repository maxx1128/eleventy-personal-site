---
title: "How to Make an Anime Newsletter"
date: "2017-07-30"
excerpt: "For my first web project that wasn't a website, I broke down a goal that involved Node, scheduled functions, the Twitter API, and a feed of anime wallpapers."
tags: ['anime', 'javascript']
image: make-anime-newsletter.jpeg
featured_image_link: 'https://safebooru.org/index.php?page=post&s=view&id=2994659'
---
Like most of my Node projects, my most recent one began with a bizarre thought: *Can I email myself cool anime wallpapers each morning?*

Short version: Thanks to Node, absolutely.

Long Version: Keep reading.

### The Dilemma

A favorite twitter bot of mine regularly tweets high-quality anime wallpapers. They're fun to scroll through (though some can lean towards NSFW), but there's often too many to choose from. So I wondered, could I pick out a few and see those each day? Specifically in a morning email?

Turns out, yes! Node makes it possible, and I've been eager to try and use Node for something other than an Express site. This would be directly solving a specific problem, and not using CSS - this was a first for me!

So on a whim, I visited the public library, got my music going, and gave it a shot.

### Breaking Down the Problem

My first step in any ambitious coding task is breaking things down to their smallest parts. After researching what I could use for making my "Wallpaper Newsletter," I wound up with these tasks:

1. Get the date ranges for today and yesterday.
2. Get Twitter data from the needed account using the Twitter API.
3. Get the top five tweets from the returned data.
4. Format the data for an email and send it.
5. Automatically send the email each morning.

The NPM modules I used were:

1. **[twit](https://www.npmjs.com/package/twit)** for accessing the Twitter API
2. **[nodemailer](https://www.npmjs.com/package/nodemailer)** for creating and sending emails with SMTP.
3. **[node-schedule](https://www.npmjs.com/package/node-schedule)** for running functions at specific intervals.

I'll start with the simplest task.

### 1) Getting the Date Ranges

**Problem:** I needed to get dates for my Twitter API request, specifically for the current day and yesterday.

For advanced searches, Twitter uses a date range for tweets at certain times. I needed a range from yesterday to today. This technically does what I want and returns tweets from yesterday. This was like a CodeWars challenge, and was easy - use some JavaScript date objects!

```javascript
let today = new Date(),
    yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
```

One catch was Twitter searches with dates use the `yyyy-mm-dd` format. By adding the right method to the `Date` object, formatting it was easy.

```javascript
Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1;
  var dd = this.getDate();

  return [this.getFullYear(),
    (mm>9 ? '' : '0') + mm,
    (dd>9 ? '' : '0') + dd
  ].join('-');
};
```

Then I just exported the formatted values like so.

```javascript
module.exports = {
  'today': today.yyyymmdd(),
  'yesterday': yesterday.yyyymmdd()
};
```

I now had the needed dates for searching through tweets! Then came a harder part, making the API request.

### 2) Make a Twitter API Request

**Problem:** I had my date range, now I needed to get the actual tweets! This meant accessing the Twitter API and sending a query.

Let's get the boring stuff out of the way. First I `require`d the needed modules and plugged in the needed keys, secrets, and tokens for the API.

```javascript
const Twit = require('twit'),
      date = require('./get-dates'),
      images = [];

let T = new Twit({
  consumer_key:         '**********',
  consumer_secret:      '**********',
  access_token:         '**********',
  access_token_secret:  '**********',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});
```

`Twit` is the module that helps with the actual API queries. `date` pulls the function from before for the needed date ranges. `images` is the array for storing the final result.

Now to the fun part: using the API! Twit gives several options for return data, but a search did what I need. It runs a basic or advanced search, similar to one of the site itself.

Here I needed to set up an advanced search that would:

* Only get tweets from the `@AceWallpaperBot` account.
* Get tweets from my created date ranges.
* Limit it to 100 tweets (just to be safe)

An example search of mine looked like this:

```javascript
`from:AceWallpaperBot since:2017-07-20 until:2017-07-21, count: 100`
```

Plugging in the dates I made in the first step, it became this:

```javascript
'from:AceWallpaperBot since:' + date.yesterday + ' until:' + date.today, count: 100
```

Now to use the query! Since this is an API request, I used a JavaScript promise that could play with the data once it was returned.

```javascript
module.exports = T.get('search/tweets', { q: 'from:AceWallpaperBot since:' + date.yesterday + ' until:' + date.today, count: 100 })
  .catch(function (err) {
    console.log('caught error', err.stack);
  })
  .then(function (result){
    // Do stuff with the returned data here!
  });
```

With that completed request, this step was done but the function wasn't. I had more data than I needed - I only want images from the five tweets with the most likes! This brings me to step three.

### 3) Get the Five Most-liked Tweets

**Problem:** I've got the Twitter data I wanted, but there's too much! I want to go through the results, pick the five people liked the most, and save what I need from them.

Sorting all this data wasn't that tough, but it was time-consuming. I ultimately wanted two pieces of info:

1. The file path to the wallpaper
2. The number of likes the tweet got

Picking up where I left off in step two's promise, these are the paths through the resulting JSON I saved.

```javascript
let results = result.data.statuses;

results.forEach(function(entry, i) {

  let newEntry = {
    path: results[i].entities.media[0].media_url_https,
    likes: results[i].favorite_count,
  };

  images.push(newEntry);
});
```

`Images` still has all of yesterday's tweets, but only the info I care about.

Next is sorting the data from most-liked to least-liked.

```javascript
images.sort(function(a, b) { return b.likes - a.likes; });
```

Finally, returning the first five items in this sorted array - AKA the top five liked tweets!

```javascript
return images.slice(1, 6);
```

Combining steps two and three, here's the final module I exported:

```javascript
module.exports = T.get('search/tweets', { q: 'from:AceWallpaperBot since:' + date.yesterday + ' until:' + date.today, count: 100 })
  .catch(function (err) {
    console.log('caught error', err.stack);
  })
  .then(function (result){
    let results = result.data.statuses;

    results.forEach(function(entry, i) {

      let newEntry = {
        path: results[i].entities.media[0].media_url_https,
        likes: results[i].favorite_count,
      };

      images.push(newEntry);
    });

    images.sort(function(a, b) { return b.likes - a.likes; });

    return images.slice(1, 6);
  });
```
At long last! This module lets me get the Twitter data this newsletter needs, organized and ready to go.

### 4) Send an Email with the Wallpapers

**Problem:** I have the top five wallpapers! Now how do I send them in an email?

This was the hardest step for me due to experience. I've worked with APIs with JavaScript before, but not to send emails. Thanksfully, NPM has a module for that (of course).

Here's the starting structure of this file:

```javascript
const api_request = require('./get-twitter-data'),
      nodemailer = require('nodemailer');

module.exports = function sendEmail() {
  api_request.then(function(data){

  });
}
```

This file uses the Twitter API request from the last step for returning the needed data. The `nodemailer` module will make and send the final email. This file exports the function that will do this through Gmail.

Note the `api_request` function has `.then` right after it. That function uses a promise, so this tells it to wait until that promise is filled before the next steps. When I first wrote this, the email kept sending before it had the Twitter data. That's because it ran everything before the Twitter API responded. This makes sure it does it in the right order.

Back to the email! Once I set up a private access point with Gmail, I could let apps email my account. `nodemailer` lets you create a "transporter" with this info to send emails.

```javascript
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: '**********', // my email address
    pass: '**********' // the password for my private access point
  }
});
```

Next step was to make an object with all the data the email needed.

```javascript
let mailOptions = {
  from: 'Ace Wallpaper Summary Bot', // sender address
  to: '**********', // my email again
  subject: 'Yesterday\'s Popular Wallpapers', // Subject line
  html: email_body // html body
};
```
But wait! What's that variable being used in the `html` field?!

That's where the full email body goes. I'm going to backtrack in the code to show how it's made. Remember all the Twitter data is in this function's `data` variable. I can use that to access the five photos. It also brings me back to my comfort zone: writing HTML and CSS! Sadly this is front-end for emails, which is like loving fast cars in the 1920s, but still.

Here's how I constructed the email body:

```javascript
let photos = data,
    email_body = '<p>Here are yesterday\'s most popular Ace Wallpapers!</p>';

photos.forEach(function(photo, index){
  email_body += '<h1>Wallpaper #' + (parseInt(index) + 1) + ' at ' + photo.likes + ' likes</h1><img style="max-width: 100%; height: auto;" src="' + photo.path + '" >';
});
```

Simple yet effective - loop through each photo to create a header for their rank and number of likes, show the wallpaper itself, and add that to the email body.

Here's a sneak peek of what this looked like in an actual email:

![An example of getting a wallpaper sent to my email through Node.](/assets/images/posts/make-anime-newsletter/wallpaper.png)

So it indeed works!

Only one step left here: sending the email. `nodemailer` again has me covered, using the object with all the info.

```javascript
transporter.sendMail(mailOptions, (error, info) => {
  if (error) { return console.log(error); }

  console.log('Message %s sent: %s', info.messageId, info.response);
});
```

With that, I seem to be done. Running this file through Node sends me a neat-looking email with the top five wallpapers from yesterday. They're easy to view (and download, if I want to). The final exported module looks like this:

```javascript
const api_request = require('./get-twitter-data'),
      nodemailer = require('nodemailer');

module.exports = function sendEmail() {
  api_request.then(function(data){

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: '**********', // my email address
        pass: '**********' // the password for my private access point
      }
    });

    let photos = data,
        email_body = '<p>Here are yesterday\'s most popular Ace Wallpapers!</p>';

    photos.forEach(function(photo, index){
      email_body += '<h1>Wallpaper #' + (parseInt(index) + 1) + ' at ' + photo.likes + ' likes</h1><img style="max-width: 100%; height: auto;" src="' + photo.path + '" >';
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: 'Ace Wallpaper Summary Bot', // sender address
      to: '**********', // my email again
      subject: 'Yesterday\'s Popular Wallpapers', // Subject line
      html: email_body // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) { return console.log(error); }

      console.log('Message %s sent: %s', info.messageId, info.response);
    });
  });
}
```

There's only one step left...

### Send the Email Each Morning

**Problem:** My newsletter is complete! But how can I make it mail itself each morning?

This was easy with `node-schedule`, which does exactly what one would think: running code at set intervals. It's simple so I'll jump to the final result:

```javascript
const schedule = require('node-schedule'),
      sendEmail = require('./send-email');

schedule.scheduleJob('0 7 * * *', function(){
  sendEmail();
});
```

`sendEmail` is the function from the last step - it makes and sends the newsletter. I only needed to run it inside `node-schedule`, and it does the rest. The `'0 7 * * *'` string is how the module reads "every day at 7am."

All this is on `index.js`, so now all I need to do is run `node index.js` (or any shortcut command) and the scheduler is up and running! It will wait until 7am every morning, get the most popular wallpapers, and email me them. **Goal accomplished!**

> *Side note:* I used Heroku for this, and `node-schedule` wound up not working with it properly. Heroku thankfully has a scheduler add-on I used instead. If you don't deal with similar Heroku complications, `node-schedule` should still work.

## Newsletter Complete!

I've been letting this app run for about a week, and it's worked perfectly. Every morning I get five different wallpapers from the account, ranked based on how many people liked them.

This was my first web project that was entirely back-end focused, so it felt extremely satisfying. Virtually everything else I've made has been front-end focused, using mostly CodePen or Jekyll. So having a back-end project that pushed me outside my comfort zone while giving a fun end result was a bigger risk for me.

Hopefully this is a good sign for my future Node-focused projects!
