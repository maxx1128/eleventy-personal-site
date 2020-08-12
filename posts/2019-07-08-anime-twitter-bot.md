---
title: "Explaining (and Celebrating) my First Twitter Bot"
date: "2019-07-08"
excerpt: "After weeks of looking for a workable approach, I finally build a Node Twitter bot to automatically share anime quote artwork."
image: 'twitter-bot.jpg'
tags: ['javascript', 'anime']
featured_image_link: 'https://safebooru.org/index.php?page=post&s=view&id=947559'
---

A few months ago I tweeted this absolutely true statement.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Confession time: my secret subversive goal is drowning the internet in as much anime artwork as possible. Programming and blogging are just fronts for this.</p>&mdash; Max Antonucci (@Maxwell_Dev) <a href="https://twitter.com/Maxwell_Dev/status/1120283792785256449?ref_src=twsrc%5Etfw">April 22, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Over the last year my anime-related side projects fueling this plot have grown in scope:

1. Scraping an anime image database to email me several each morning.
2. Linking this scraped data to a custom API endpoint to show random images.
3. Using this API endpoint to make [an anime quote image maker](http://www.quotemaker.maxwellantonucci.com/).

The next roll I've taken down this slippery slope now includes:

4. Create a bot that shares random anime quote images on Twitter all day long.

Last week this vision finally moved from delusion to reality, and [the @AnimeQuoteImage bot was born](https://twitter.com/AnimeQuoteImage)! Yes, I'm now using robots to fuel my anime addiction.

To celebrate this latest step on my path to the nerd asylum, I wanted to share the basics of how it works and my favorites of its work so far.

## How the Bot Works

If you want to look over the actual code, you can check out [the open-source repo with the bot's code](https://github.com/maxx1128/anime-twitter-bot).

For a high-level understanding of the bot, it runs on Node and uses a few third-party JavaScript modules to get going. I've included crude cartoon visuals for both necessity and boredom.

The bot uses Puppeteer to open [my Anime Quote Maker](http://www.quotemaker.maxwellantonucci.com/) in a headless Chrome browser. It's programmed to start with a random image, a random quote, and randomly style the quote from what's available (color schemes, filters, alignment, etc).

![A robot pulling up a webpage.](/assets/images/posts/twitter-bot/bot1.png)

Puppeteer sizes the browser in a 700 by 700 pixel window, which makes the random quote fill it just right, and takes a screenshot. It also grabs the quote's text and author from the DOM.

![A robot taking a screenshot of the webpage.](/assets/images/posts/twitter-bot/bot2.png)

Node passes this info to Twit, a popular Node add-on for using the Twitter API. It composes a tweet with the image, quote, and author, and sends it off.

![A robot sending the screenshot out on Twitter.](/assets/images/posts/twitter-bot/bot3.png)

This all goes to Heroku, which uses the Heroku Scheduler add-on to rerun all these steps every 30 minutes.

![A robot being reminded to repeat all the past steps by Heroku.](/assets/images/posts/twitter-bot/bot4.png)

I hit turbulence getting all the Puppeteer dependencies uploaded, but after that there were few issues and the Twitter bot was born!

## My Bot's Favorite Work So Far

I'll start with some positive examples of quotes, images, and styling that somehow came together almost perfectly.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">&quot;There is an interest in that which is hidden and which the visible does not show us.&quot;<br><br>~ Rene Magritte <a href="https://t.co/xX8U0hSMCn">pic.twitter.com/xX8U0hSMCn</a></p>&mdash; Anime Quote Image Bot (@AnimeQuoteImage) <a href="https://twitter.com/AnimeQuoteImage/status/1146246183741997056?ref_src=twsrc%5Etfw">July 3, 2019</a></blockquote>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">&quot;Only those who dare to fail greatly can ever achieve greatly.&quot;<br><br>~ Robert Kennedy <a href="https://t.co/BiKV7K3Ls2">pic.twitter.com/BiKV7K3Ls2</a></p>&mdash; Anime Quote Image Bot (@AnimeQuoteImage) <a href="https://twitter.com/AnimeQuoteImage/status/1146818818913816581?ref_src=twsrc%5Etfw">July 4, 2019</a></blockquote>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">&quot;Heaven has no rage like love to hatred turned, nor hell a fury like a woman scorned.&quot;<br><br>~ William Congreve <a href="https://t.co/0PKZUlsMaH">pic.twitter.com/0PKZUlsMaH</a></p>&mdash; Anime Quote Image Bot (@AnimeQuoteImage) <a href="https://twitter.com/AnimeQuoteImage/status/1147068225538207745?ref_src=twsrc%5Etfw">July 5, 2019</a></blockquote>

One in particular looked like a bizarre, if late, tribute to pride month.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">&quot;There is only one kind of love, but there are a thousand imitations.&quot;<br><br>~ Francois de La Rochefoucauld <a href="https://t.co/Z76LMv41ao">pic.twitter.com/Z76LMv41ao</a></p>&mdash; Anime Quote Image Bot (@AnimeQuoteImage) <a href="https://twitter.com/AnimeQuoteImage/status/1146365839672827904?ref_src=twsrc%5Etfw">July 3, 2019</a></blockquote>

Some thought-provoking quotes actually seemed enhanced by their images.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">&quot;The psychical, whatever its nature may be, is itself unconscious.&quot;<br><br>~ Sigmund Freud <a href="https://t.co/cpHLdHIwQd">pic.twitter.com/cpHLdHIwQd</a></p>&mdash; Anime Quote Image Bot (@AnimeQuoteImage) <a href="https://twitter.com/AnimeQuoteImage/status/1147188616336203777?ref_src=twsrc%5Etfw">July 5, 2019</a></blockquote>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">&quot;I am sorry to think that you do not get a man&#39;s most effective criticism until you provoke him. Severe truth is expressed with some bitterness.&quot;<br><br>~ Henry David Thoreau <a href="https://t.co/XKgYr1YXpv">pic.twitter.com/XKgYr1YXpv</a></p>&mdash; Anime Quote Image Bot (@AnimeQuoteImage) <a href="https://twitter.com/AnimeQuoteImage/status/1147113586252292096?ref_src=twsrc%5Etfw">July 5, 2019</a></blockquote>

Others didn't make me think as much as send a chill down my spine.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">&quot;There is nothing which at once affects a man so much and so little as his own death.&quot;<br><br>~ Samuel Butler <a href="https://t.co/Iv68wFqGXz">pic.twitter.com/Iv68wFqGXz</a></p>&mdash; Anime Quote Image Bot (@AnimeQuoteImage) <a href="https://twitter.com/AnimeQuoteImage/status/1146215890339475456?ref_src=twsrc%5Etfw">July 3, 2019</a></blockquote>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">&quot;What we have to do, what at any rate it is our duty to do, is to revive the old art of Lying.&quot;<br><br>~ Oscar Wilde <a href="https://t.co/yko10ZnwvG">pic.twitter.com/yko10ZnwvG</a></p>&mdash; Anime Quote Image Bot (@AnimeQuoteImage) <a href="https://twitter.com/AnimeQuoteImage/status/1147037674248790018?ref_src=twsrc%5Etfw">July 5, 2019</a></blockquote>

This one in particular still freaks me out. A quote about "positive vision" paired with an inverted image of someone with blood on their shirt and a hidden face. I really hope this was random and not a secret prophecy for the coming End of Days.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">&quot;In order to carry a positive action we must develop here a positive vision.&quot;<br><br>~ Dalai Lama <a href="https://t.co/iLm7Ws60Ci">pic.twitter.com/iLm7Ws60Ci</a></p>&mdash; Anime Quote Image Bot (@AnimeQuoteImage) <a href="https://twitter.com/AnimeQuoteImage/status/1146728015675691009?ref_src=twsrc%5Etfw">July 4, 2019</a></blockquote>

There's also many political quotes that get mixed in. Pairing real-world politics with anime is frequently...awkward.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">&quot;In this world of sin and sorrow there is always something to be thankful for as for me, I rejoice that I am not a Republican.&quot;<br><br>~ H. L. Mencken <a href="https://t.co/H4NF6iCGww">pic.twitter.com/H4NF6iCGww</a></p>&mdash; Anime Quote Image Bot (@AnimeQuoteImage) <a href="https://twitter.com/AnimeQuoteImage/status/1146395880330866693?ref_src=twsrc%5Etfw">July 3, 2019</a></blockquote>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">&quot;Richard Nixon is a no good, lying b-----d. He can lie out of both sides of his mouth at the same time, and if he ever caught himself telling the truth, he&#39;d lie just to keep his hand in.&quot;<br><br>~ Harry S. Truman <a href="https://t.co/gcWNotlccj">pic.twitter.com/gcWNotlccj</a></p>&mdash; Anime Quote Image Bot (@AnimeQuoteImage) <a href="https://twitter.com/AnimeQuoteImage/status/1147098336639561729?ref_src=twsrc%5Etfw">July 5, 2019</a></blockquote>

There of course will be some creations I simply don't know how to respond to.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">&quot;Nature hates calculators.&quot;<br><br>~ Ralph Waldo Emerson <a href="https://t.co/X23BkHHyjX">pic.twitter.com/X23BkHHyjX</a></p>&mdash; Anime Quote Image Bot (@AnimeQuoteImage) <a href="https://twitter.com/AnimeQuoteImage/status/1146713067969007617?ref_src=twsrc%5Etfw">July 4, 2019</a></blockquote>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">&quot;The simple truth is that balding African-American men look cool when they shave their heads, whereas balding white men look like giant thumbs.&quot;<br><br>~ Dave Barry <a href="https://t.co/sTg5MdZMqn">pic.twitter.com/sTg5MdZMqn</a></p>&mdash; Anime Quote Image Bot (@AnimeQuoteImage) <a href="https://twitter.com/AnimeQuoteImage/status/1146992558683435008?ref_src=twsrc%5Etfw">July 5, 2019</a></blockquote>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">&quot;True friends stab you in the front.&quot;<br><br>~ Oscar Wilde <a href="https://t.co/XXaQEzSsxC">pic.twitter.com/XXaQEzSsxC</a></p>&mdash; Anime Quote Image Bot (@AnimeQuoteImage) <a href="https://twitter.com/AnimeQuoteImage/status/1146886948948271109?ref_src=twsrc%5Etfw">July 4, 2019</a></blockquote>

Lastly, here's my all-time favorite that's truly one of a kind, and other programmers who have handled APIs will likely appreciate it.

<blockquote class="twitter-tweet" data-lang="en"><p lang="und" dir="ltr">&quot;&quot;<br><br>~ <a href="https://t.co/8dQoklPSNa">pic.twitter.com/8dQoklPSNa</a></p>&mdash; Anime Quote Image Bot (@AnimeQuoteImage) <a href="https://twitter.com/AnimeQuoteImage/status/1146788667970719745?ref_src=twsrc%5Etfw">July 4, 2019</a></blockquote>

Either the API crapped out on me, or this is one of those "imagine your own quote" scenarios. If so, I'd go with a computer science quote about unit testing.

## Wrapping Up

Making a bot like this has been a far-off goal of mine for a long time, and making it real has reminded me of why I enjoy programming so much. **Many things that seem impossible to make usually aren't if you keep at it and try enough different approaches.** I looked at several Ruby setups for this before finally settling on Node, and after a few days of struggling to get things working on Heroku, it all finally came together.

Now I can kick back and enjoy it doing this work for me. At least until the cycle repeats and I get another idea that both improves my programming skills, indulges my love of anime, and costs me some sleep in the process.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">&quot;The privilege of a lifetime is being who you are.&quot;<br><br>~ Joseph Campbell <a href="https://t.co/O1TtaPc82M">pic.twitter.com/O1TtaPc82M</a></p>&mdash; Anime Quote Image Bot (@AnimeQuoteImage) <a href="https://twitter.com/AnimeQuoteImage/status/1147810469291483136?ref_src=twsrc%5Etfw">July 7, 2019</a></blockquote>
