---
title: "The Testing Introduction I Wish I Had"
date: "2019-02-12"
excerpt: "Testing is a topic I overlooked too much early in my career, which may have hurt my progress the most. This is everything I'd have told my past self about testing."
image: 'testing.png'
tags: ['Intros I Wish I Had']
---
Seeing as there's no shortage of topics I should've learned about earlier, I'm surprised it took so long to write another "Introduction I Wish I Had." This time I'm covering a topic that's important, oft-overlooked, and realistically speaking, has come back to bite me more than anything other than that dark NYC night where I entered a dark alley without my slingshot or leather sandals.

Of course, I'm referring to **Testing.**

As any experienced programmer or guest on the Maury show will tell you, well-run tests will help you avoid serious grief in the long run. Yet they're easy to overlook - in my first years of programming, it was (understandably) easy to assume my program would always work fine once I finished. But as I learned afterward, that's rarely the case in a professional programming position.

That's where tests come in. This post is a high-level overview of testing essentials, which cover:

* The Different Types of Tests
* Why Testing Matters
* Testing Rules of Thumb

This post is for the kind of coder I was a few years ago (and in some ways still am today) - someone who knows of code testing but doesn't know the details or why it's essential. Here's hoping you think differently after reading it, or at least know enough to convince those nearby you've changed.

While I'd prefer the first option, writers can't be choosers. So let's begin!

## The Different Types of Tests

Let's start with a broad overview of the different types of tests, with specific examples sprinkled in where possible.

### Unit Tests

Unit tests are the simplest test for the smallest possible pieces of your program. They're usually for functions or objects, making sure they return expected values with certain inputs.

Say you have a function that adds two numbers. The test would make sure if you give it two and two, the function spits back four. It doesn't test it in different contexts, like as part of a calculator component. Unit tests isolate functionality on their own and make sure they work for any context.

**Unit tests can ensure your app's fundamentals remain strong.** It's helped me avoid many wild-goose-debugging-chases since I know the app's core is fine, so it's likely how I was using these core functions.

Here's a unit test example I've written for a personality quiz in Ember. It tests a service that manages quiz-specific functions like answering questions and tracking answers.


```javascript
test('it knows when you\'re finished', function(assert) {
  let quiz = this.owner.lookup('service:quiz'),
      quiz_length = quiz.get('length');

  assert.equal(quiz.get('completed'), false, 'the completed property starts as false');
  assert.equal(quiz.get('winner'), '', 'it starts with no winning result');

  for (let i = 1; i < quiz_length; i++) {
    quiz.selectAnswer(i, 'espeon');
  }

  assert.equal(quiz.get('completed'), true, 'the completed property becomes true');
  assert.equal(quiz.get('winner'), 'espeon', 'it learns the winning result');
  clearAllCookies();
});
```

I'm doing nothing more than making sure that _X property returns Y value as it should._  In this case, it's for the service's `completed` and `winner` properties.

Another example is a simple Ruby program I wrote to email myself anime wallpapers. This unit test takes the object that finds the image URLs and checks the result.


```ruby
describe WallpaperUrlQuery do
  let(:query) { WallpaperUrlQuery.new() }

  it 'should return an image url' do
    image = query.random_image

    expect(image).to be_a(String)
    expect(image).to include(WallpaperUrlQuery::BASE_URL)
    expect(image).to include('.jpg').or include('.png')
  end

  # ...
end
```

I don't care what specific image it finds or where it goes, I just make sure the result is a string, is from the right website, and has an image extension. Now I can trust my query to give me images for any context I'd like.

### Integration Tests

Things get more complex with Integration Tests, which check how well separate units integrate (get it?) together.

This doesn't always mean integration tests are _only_ for components that combine simpler functions together. In my experience, most integration testing user interfaces as well as functions and properties. I think these still count as "integrations" since it's making sure the functionality and the UI integrate as expected.

A simple example is testing a dropdown menu made in Ember, where I'm testing that:

* The active class and `aria-hidden` attributes are in sync with each other
* Clicking the menu's button triggers these two properties

```javascript
test('the menu appears when clicked', async function(assert) {
  await render(hbs`{{dropdown-container}}`);
  const menu = assert.dom('.dropdown-menu__menu');

  menu.doesNotHaveClass('dropdown-menu__menu--active');
  menu.hasAttribute('aria-hidden', 'true');

  await click('.dropdown-menu__button');

  menu.hasClass('dropdown-menu__menu--active');
  menu.hasAttribute('aria-hidden', 'false');
});
```

Other integration tests here could be making sure the menu closes when clicking outside the menu, or rendering additional links passed in. These all fall under the "keep the parts integrated together" umbrella.

### Acceptance Tests

Acceptance tests shift away from what pieces of code should do to **what users should do.** These tests are based around common user tasks like logging in, submitting a form, navigating content, and having their privacy invaded by tracking scripts. This usually makes acceptance tests the highest-level tests for any application, and often the most important. If users can't use the app as intended, the rest doesn't matter.

Take this acceptance test from my Ember quiz. There's several parts of the user flow connected to answering one question:

* Can they click on an answer?
* Are the right number of questions available?
* Can you go back to previous questions?
* If you leave the quiz page, do you pick up where you left off?
* Do questions adjust their meaning and value based on the user's astrological sign?
* Can someone explain the injustice behind the Saints not being in the Super Bowl?

I try to answer (most of) these things below. Nothing is specific to any function or component. It's all about the high-level user flow.

```javascript
test('answering a quiz question', async function(assert) {
  await visit('/quiz/1');

  await click('[data-test=AnswerItem]:first-of-type')
  assert.equal(currentURL(), '/quiz/2', 'You go to the next question');
  assert.dom('[data-test=QuestionItem-Active]').exists({ count: 2 }, 'Two questions are available');

  await click('[data-test=QuestionList] [data-test=QuestionItem-Active]:first-of-type a');

  assert.equal(currentURL(), '/quiz/1', 'You go back to the previous question');
  assert.dom('[data-test=QuestionItem-Active]').exists({ count: 2 }, 'The quiz remembers you answered two');

  await click('[data-test=QuestionList] [data-test=QuestionItem-Active]:nth-of-type(2) a');

  assert.equal(currentURL(), '/quiz/2', 'You can go back to your current question');
  assert.dom('[data-test=QuestionItem-Active]').exists({ count: 2 }, 'The quiz still remembers you answered two');

  await visit('/quiz');
  assert.dom('[data-test=GoToQuiz]').hasText('Resume Quiz', 'The starting prompt asks you to resume the quiz');
  clearAllCookies();
});
```

As for those last two points, I don't need an acceptance test to know the answers are:

* No, horoscopes are as valuable to humans as palm-readings are to horses
* God is angry, the End Times are approaching, and the Rapture shall take us once Tom Brady earns his seventh Super Bowl ring. Hail Cthulu!

Back to the point, acceptance tests require fully rendering a page and interacting with it, which is tougher to set up than simply importing a component and making some assertions. It's often done with a Headless web browser, basically browsers without user interfaces that allow for automation. It also takes a library to simulate user interaction and API requests, which can get complex for many apps.

But this extra work is usually worth it, considering their role in making sure users can always do vital tasks as expected. A missing acceptance test could lead to disasters like a Twitter update that accidentally stops users from posting tweets, rendering the service useless.

Fun fact: [Ember has all this set up out of the box!](https://guides.emberjs.com/v2.17.0/testing/acceptance/) In case that influences your decision to try it sometime.

### Visual Regression Testing

Visual Regression (VR) Testing is for unexpected (or expected) visual changes in the app. The basic process goes like this:

* Before you run the VR tests, the tests already have a screenshot of most or all parts of the app, such as login pages.
* As the VR tests run, they grab new screenshots of how all the pages look with the changes you made.
* The tests then compare all the "before and after" screenshots for each page and note each change. If some input fields shifted a couple pixels, or an entire page went missing, the tests will make a side-by-side comparison with the differences highlighted.

You may be wondering: some changes may have been on purpose. If I was trying to remove that page or add the extra field, then of course the VR tests will highlight them. So what good do they do?

Do not doubt the tests, nonbeliever! The final stage is having a human look through all the changes and marking the accidental ones. If your VR tests only flag changes you wanted, then you approve them! If it finds ones you weren't expecting, you flag them, try to fix them, run the tests again, and repeat.

In my experience, VR tests have been the hardest to set up. I and my now-manager have done searches of reliable open-source VR testing tools and come up empty-handed. Most either didn't do enough or weren't properly maintained. The closest I've come to reliable VR testing is a tool called [Percy](https://percy.io/), which recently added a free option, so I'd recommend starting there.

### Accessibility Testing

I'd be remiss to not mention accessibility testing. Yes, accessibility testing is possible! It can't test everything, but it can help you avoid common mistakes like improper markup or low color contrast.

There's a few tools I know of to try: [Pa11y](http://pa11y.org/) for static sites, and [aXe](https://www.deque.com/axe/) or [Lighthouse](https://developers.google.com/web/tools/lighthouse/) for web apps. Our company found an accessibility testing helper built off of aXe, [ember-a11y-testing](https://github.com/trentmwillis/ember-a11y-testing), that adds basic accessibility testing to all pages and has caught many errors.

What specific accessibility tester you'll need will vary by project. Finding one is like finding an assassination mark: tough but ultimately worth it, and hopefully afterwards there's not much blood spatter.

### Code Quality Tests

Code Quality tests stand out because they don't require you to write any actual tests. They instead read through a code base and flag errors such as:

* Code duplication
* Overly complex code
* Code that deviates from style conventions
* Security risks

Code Quality tests can also give a high-level analysis of how the code has changed over time. If a specific folder of files has varied wildly in quality over time, it points this out so you can do a larger refactor. Or if a developer has gradually added secret lines of malware throughout the code that'll inject itself into users' computers, the tests can flag the local police and SWAT team (often a premium feature).

These tests, like VR tests, may throw flags on intended changes. So like VR tests, once the flags are approved the tests will pass.

## Why Testing Matters

Having covered the different types of tests, I'll admit my first reaction to seeing them was, "Is all this really so important?"

If I could meet my past self as they thought this, I'd smack them, whisper a few winning lottery ticket numbers in their ear, then smack them again since it's not like they'd report themselves to the police.

Also, I'd probably tell them the following reasons to care about tests if I had the time.

### Ensure Basic Functionality

The obvious perk is if your tests cover all essential functions well, you can always launch your app knowing it still works. Users seeing something they relied on suddenly breaking is the second-most infuriating thing to discover (the first is finding all images replaced with Nicholas Cage).

It's also good for business. Broken functionality related to payments or uploading new content could render your app unusable or unprofitable until the mistakes are found. Who knows how many users (or dollars) you'll have lost until then. This gets even worse if you write software for things that actually matter, like hospitals managing patient records. People could die, and unlike horses from Breath of the Wild on Nintendo Switch, you can't summon them back by appealing to a plant-trapped goddess in a crazy mask.

**So don't be the developer giving rupees before the Horse Goddess. Write tests to make sure what needs to work still does.**

### Prevent Mistakes from Coming Back

Letting a mistake slip through is one thing. Letting the same one slip through again is even worse, since users assume a competent app wouldn't repeat their mistakes.

Testing can help avoid this with a simple rule of thumb: **for every bug you find, try to write a test that'll catch it.**

This came into play for me recently, when a translation bug in a loading bar component made users unable to upload files. This was huge and we were lucky to catch it in time, but I saw there were no tests to make sure these loading statuses worked right. So once the bug was fixed, I wrote a unit test to make sure the output for the loading bar text and progress returned what was expected. I tested it at three levels to be safe: empty, halfway, and full.

Now it's a lot less likely this will slip through again, and there's one less blind spot to subconsciously haunt our dreams. Victory!

### Save Time

My first development job had high standards for cross-browser testing. It was to the point where (I swear this is true) I would set up four laptops running on the same local server. The laptops covered Chrome, Firefox, Safari, and an old laptop running Internet Explorer that clients often ran.

Whenever we made one change anywhere, I had to click through each page of the pattern library and through each component's functionality. Going as fast as I could, this still took at least 30 exhausting minutes each time to do it right. I'd have to repeat this every time I got feedback that day (or if I missed something), pushing the "testing and feedback" session over the span of at least two days.

I don't think I need to expand on why you wouldn't want to do this. Testing turns this ordeal into "just press a button and wait, and don't fuel the desire to jump off a cliff." That's self-explanatory.

## Testing Rules of Thumb

With the "what" and "why" of tests covered, let's end with the "how." I won't go into what specific test frameworks to use, since there's too many to cover and you'll learn this better if you keep them in mind while searching yourself.

But as you're writing tests, there's several rules to go by.

### Test Early and Often

Avoid the "I have a finished app with no tests" scenario. It makes the idea of adding tests an intimidating monolith that you give up on and then hate yourself for giving up on after since it tarnishes your legacy (like online dating).

**Try to add tests anytime you add or update a new piece of functionality.** When you add a component, include a new test for it. Expanding a function means expanding the ways you test it. This makes it easier to keep track of what needs testing and keeps it approachable.

### Make Sure Tests Pass (and Fail) as Expected

Writing a test that passes isn't always good. There's been cases where I get a test passing, but when I deliberately change it to fail, it still passed and I realized it was busted. Tests are only good if they fail to alert you to problems. Unfailing tests make it much easier for flaws to slip into production.

Preventing this can be as easy as, once you write the test, making a small change so it fails as expected. If you're testing to see if a function outputs `6`, see if it fails when you test for a different number.

A more thorough way is turning these little "failure tests" into additional tests. Most testing libraries let you test for what results _shouldn't_ be, as what they _should_ be. While I tend to write more _should be_ tests, there's usually a good amount of _shouldn't be_ ones mixed in.

One example is from my newsletter app. A query object should return random images with each query to ensure I get different images each time (excluding coincidental matches or the hand of God reaching down to screw with me). So I test that two different queries aren't equal.

```ruby
it 'should give different images from the same object' do
  image1 = query.random_image
  image2 = query.random_image

  expect(image1).not_to eq(image2)
end
```

While most of my tests here look for matching file types and strings, this one passes by making sure two things don't match. In other words, I'm testing for a type of failure.

### Don't Rewrite the Program's Logic

A few weeks back, I was writing a regex for some basic string substitutions in a URL. Afterwards I added an extra test to make sure this didn't happen again (callback to preventing old mistakes!) Among the many mistakes I made in that PR which my therapist has advised I don't write here, one was that I copied the same regex into the test while making sure the result matched.

This was wrong for two reasons you likely already know, being the smart developer you now are after reading my post:

* Any errors in the regex wouldn't be caught, since the error would simply carry into the test and think it's correct.
* Duplicated code! Changing it in the app means I risk forgetting to change the test.

The right path was removing the regex and testing for just the end result. If I have one URL, the app should return this version of the URL. Only the app controls how it makes that result, not the test. The test just makes sure it does the job right, and how it does it doesn't matter.

### Know about Data Stubbing

Lastly, one tip that's more of a footnote: most applications connect to an API in some way, and some components rely specifically on API data. They may pull data through API requests, or send POST requests to update info.

My first dealings with these was to write them like normal tests. But it only worked when:

* Any custom APIs wers running locally, which failed during a Continuous Integration test in Github pull requests
* The API data is harder to predict and may change, which can easily cause test failures
* Testing components interacting with the API can change the actual data, which is bad for many reasons I don't have the tax incentives to list right now

The solution: data stubbing! This means creating a fake API endpoint, which returns static data in the test which can be predictably matched and tested. API post requests can also return test assertions instead, so instead of changing data they'll simply confirm the requests can be made.

So when looking for test frameworks, seeing if they include or are compatible with a good data stubbing methods. Thankfully, most do.

## Get Tests Working, No Matter How Tough it Is

I'm going to round out this post with the last, and perhaps the most important, tip of all. It's simply this: **no matter how frustrating and maddening it is to get your tests running, do whatever work is needed.** Tests are always worth the trouble. As the [Pragmatic Programmer](https://www.amazon.com/Pragmatic-Programmer-Journeyman-Master/dp/020161622X) states, it ain't code until the tests are run.

Recently I started building a Pokedex using React and the Pokemon API, and wanted to get basic tests working. I wound up choosing Jest and Enzyme, but getting them working was horrible. It took over an hour, I had Babel compatibility issues, and they failed for seemingly random reasons I had to down the error messages for.

By the end I was on the verge of flipping a table from pure rage, instead of the usual feelings of manic glee and/or primal desire for anarchy. But I finally got them running, failing only as expected, and ready to set up unit, integration and acceptance tests.

Totally worth it.

I overlooked tests far too often early in my career. More experienced colleagues have told me it's a common fault among other new coders. So I plead to my younger self, and other beginner programmers who took pity on my author handle to read this: **don't overlook adding tests until later. They're as much a priority as any language fundamental or popular framework.** Your colleagues, users, shareholders, stalkers, and past selves will be that much more thankful for it.
