---
title: "My 3/8 Week in Lessons: Please Mansplain that to Me"
date: "2019-03-08"
excerpt: "This weeks lessons cover how men can avoid mansplaining, avoiding JavaScript Data Mutation, making smaller PRs, and not being a jerk on International Womens Day."
tags: ['career']
---

Happy International Women's Day, everyone!

Today also marks another miracle, where I follow through on a recurring post type. Granted it's only week two, but for me that's miracle enough.

In honor of today's holiday, my first big lesson this week goes to something we should do as little of as possible, on today and any other day: mainsplaining.

## Mansplaining Is Real, Make it Stop

There's no shortage of men condescendingly and unnecessarily explaining things to women online, but it seemed especially bad this week. Below is just a sample of times I saw it happen this week.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">This is a whole other level of Twitter. I am literally speechless. <a href="https://t.co/UN7ufZQlTo">pic.twitter.com/UN7ufZQlTo</a></p>&mdash; Sara Soueidan (@SaraSoueidan) <a href="https://twitter.com/SaraSoueidan/status/1102151342963990528?ref_src=twsrc%5Etfw">March 3, 2019</a></blockquote>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">I’ve already been mansplained about what mansplaining is by a lazy dude who doesn’t like to read.<br><br>It’s going to be a week of kickin’ ass, y’all</p>&mdash; Lindsey Kopacz (@littlekope0903) <a href="https://twitter.com/littlekope0903/status/1102546223809073153?ref_src=twsrc%5Etfw">March 4, 2019</a></blockquote>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Make a LinkedIn post about an incident of mansplaining.<br><br>Get a comment mansplaining the issue to you.<br><br>Ah, to be a woman alive today.</p>&mdash; April Wensel (@aprilwensel) <a href="https://twitter.com/aprilwensel/status/1103740309458964480">March 7, 2019</a></blockquote>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">This is a really funny sequence. <a href="https://t.co/hSmC7wmYyN">pic.twitter.com/hSmC7wmYyN</a></p>&mdash; Steph&#39;s Awakening IX™ (@PangolinFeets) <a href="https://twitter.com/PangolinFeets/status/1103102556375523328?ref_src=twsrc%5Etfw">March 6, 2019</a></blockquote>

I can imagine men who, even if they accept what mansplaining is, dismiss it as something trivial. But it happening so often is worth caring about. It's the everday things that create and reinforce the culture, and the culture helps create society's power dynamics and structure. Mansplaining is one of many occurences that reinforce gender inequality dynamics, and default assumptions that women know less then men.

If a man doesn't want to believe even that, they can at least avoid it on the rule of "not being a dick." If that doesn't work for them, how many female friends do you think they'll have?

This lesson is more about responding to men doing this, specifically ones acting confused about what mansplaining is or why it matters. A good response is pointing out that they should be able to google simple questions like this and educate themselves. Pushing the burden of making them better people on the woman isn't a kind gesture, it's trying to make the woman waste their time and energy on explanations the man usually won't accept.

**It's not every woman's job to make men better, it's the man's own damn job.**

Also, keep this handy chart in mind!

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">So, any time an aspect of male behavior is criticized you just answer “misandry”? “Mansplaining” is a long-recognized phenomenon with a relatively new name. Not all men mansplain, but here’s a chart to help us recognize and acknowledge what it is. <a href="https://t.co/0NE7kWEYCs">pic.twitter.com/0NE7kWEYCs</a></p>&mdash; CJ Marjoribanks (@kittyspellman) <a href="https://twitter.com/kittyspellman/status/1100731135678660608?ref_src=twsrc%5Etfw">February 27, 2019</a></blockquote>

It may seem like I've already long learned these lessons about mansplaining, and there's no reason to write it now. But I still need to restrain myself from making these mistakes too, which means I need to keep relearning them. International Women's Day is an especially good time to do so.

## Be Mindful of JavaScript Data Mutation

Once upon a few days ago, I was writing a test with some tricky requirements. I had to take a data stub, add some extra data to it, pass it to a component, and make sure the component filtered out the extra data.

Sounds simple, right? Make an adjusted copy of some data, save the original, and make sure the component's output matches the original. These were the data variables I worked with:

```javascript
const DATA_STUB = {
  changes: {
    user: 'maxwell',
    date: '03/08/2019',
    images: [
      {
        'id':1,
        'image':'beach.jpg'
      }, {
        'id':2,
        'image':'twitter.jpg'
      }
    ]
  }
};

const fakeImages = [
  {
    'id':998,
    'image':'basket.jpg'
  }, {
    'id':999,
    'image':'flowers.jpg'
  }
];
```

As with all otherwise simple things, JavaScript screws things up.

My first attempt went something like this:

```javascript
const DATA_STUB_WITH_EXTRAS = DATA_STUB;
DATA_STUB_WITH_EXTRAS.changes.images = DATA_STUB_WITH_EXTRAS.changes.images.concat(fakeImages);
```

Think this works? Turns out it doesn't! JavaScript variables store a reference to the passed in value, not a separate copy. So making changes to that variable changed the original. Then it can't be tested right and the test fails! A better solution that avoids this uses spread operators!

```javascript
const DATA_STUB_WITH_EXTRAS = {
  'changes': {
    'images': [ ...DATA_STUB.changes.images, ...fakeImages]
  }
};
```

The spread operator essentially takes an array and outputs each value as if listing them as individual values. This lets you do many things, including cleanly combining two arrays like so. [I recommend this article for learning more about what spread operators can do](https://zendev.com/2018/05/09/understanding-spread-operator-in-javascript.html).

**But the larger lesson here is me being more conscious of managing data with my JavaScript.** Data mutation can sneak up and do plenty of damage, especially with data going to and from a database. A good default approach is building up new JavaScript data structure with existing data to avoid the risk of data mutation. Extra testing to make sure data doesn't make possible mutations can also help one's peace of mind.

## Making Smaller PRs

Last week one of my lessons was breaking up big changes into lots of smaller pieces and components, and now this includes smaller pull requests.

As a direct comparison to my giant pull request in the last weeks, I started this week with many smaller ones. I started a larger redesign with five small PRs, some of which only changed a few lines in one file. **Overall mistakes were found faster, there were fewer rounds of feedback, each had great focus, and some got merged right away.**

Of course there's a trade-off with this approach. Tracking multiple PRs can get overwhelming, no matter how small each one is. The need to rebase each branch can also be lots of work, along with keeping track of which changes are in which PR. But unless I create a truly staggering amount of small PRs, this approach is virtually always worth the trade-offs.

## Equality isn't Oppression

One more note for the men out there:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Reminder to men being even more dickish to women on <a href="https://twitter.com/hashtag/InternationalWomensDay?src=hash&amp;ref_src=twsrc%5Etfw">#InternationalWomensDay</a>: the more you rely on your privilege, the more you&#39;re going to mistake equality for oppression.<br><br>So please, get a hobby. Preferably one that&#39;s not on Twitter.</p>&mdash; Max Antonucci (@Maxwell_Dev) <a href="https://twitter.com/Maxwell_Dev/status/1104084980609761281?ref_src=twsrc%5Etfw">March 8, 2019</a></blockquote>

### Your Tweet of Zen

One last tweet in the spirit of #InternationalWomensDay:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Does it offend anyone else that we have to push hiring for diversity by breaking it down into numbers and how those numbers increase productivity and company revenue? To me, that’s like saying, “hire these people, not b/c they’re also humans, but b/c we’ll make more money off em”</p>&mdash; 🃏Pariss Athena⚔️ (@ParissAthena) <a href="https://twitter.com/ParissAthena/status/1103270656580440064?ref_src=twsrc%5Etfw">March 6, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

See y'all next week.
