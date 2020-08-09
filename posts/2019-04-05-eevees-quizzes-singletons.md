---
title: "Eevees, Quizzes, and Singletons, Oh My!"
date: "2019-04-05"
excerpt: "I celebrate a long-overdue side project by examining its most important pieces - services, singletons, and which Eeveelution matches my personality."
image: 'eevees.jpg'
tags: ['anime', 'javascript']
---
After over a year in purgatory, one of my side projects is finally finished. It's a small piece of Pokemon fandom I'd wanted to make for a while now: a Pokemon personality quiz! To be more specific, a "What Eevee Evolution Are You" quiz. [You can view (and take) the quiz at this site.](https://eeveequiz.com/)

![The homepage of the "What Eeveelution Are You" quiz site.](/assets/images/posts/eevee-quizzes-singletons/eeveelution_home.png)

_(For the record, I'm an Espeon and overjoyed about it.)_

This was an important side-project to me since it was my first real solo project using Ember.js. It's a JavaScript framework used at my current job and one I've grown fond of. This project makes use of Ember's conventions, has a full suite of tests, and lets me nerd out all at once.

I'm going to spare you from a deep dive into the entire app since I know Ember pales next to React and Vue these days. But I will look at the most important part of Ember for making a functioning quiz like this: **Services, or as they're more generically known as Singletons.** They played a huge role in managing the app's state, and are useful to know for anyone writing JavaScript apps.

## What is an Ember Service?

According to [Ember's documentation on Services](https://guides.emberjs.com/release/applications/services/):

> A Service is an Ember object that lives for the duration of the application and can be made available in every part.

Services are Ember's version of the Singleton design pattern (I'm just going to refer to them as services here). There's only one instance in the app that persists across every page. Any changes made to it carry across all pages and components. I used a service to control and organize all data related to quiz questions and progress.

![A drawing of all the Eevee evolutions sitting together](/assets/images/posts/eevee-quizzes-singletons/eevee_art.jpeg)

For example, one property in this service is the current question. If this changes anywhere in my app, every page gets that change since they all use the same instance. It's how, when you go to another page during the quiz, you can still pick up where you left off.

As you can guess, this makes services and singletons great for managing state. A recent app at my work used a service entirely to manage the loading state when making API calls. All API calls can set the loading state to true when they start, and back to false when they're done.

Components can watch this instance anywhere for toggling their loading views. A loading bar knows when to hide or show itself, and always syncs the most recent changes.

Speaking of APIs, services are great for managing API calls themselves. They can remember certain calls once they're made and save the results for later. Services can do needed filtering or sorting of returned data too, saving lots of time and energy.

## Services Throughout the Quiz

That's services in the abstract, so let us show some brief examples of how they helped make this quiz.

### The Running Eevee Progress Bar

Let's start with my favorite part of the quiz, the running Eevees on the screen that move as the user answers!

The quiz service already calculates the user's progress as a decimal value. The controller used for each question pulls in that value and converts it to a percentage. Any updates to it in the service immediately update it here, where `quiz.progress` is the service's value.

```javascript
progress: computed('quiz.progress', function() {
  return Math.ceil(this.get('quiz.progress') * 100);
})
```

This `progress` value is then passed into the `progress-bar` component. It uses it as the "width" of how far the Eevee has gone across the screen.

```html
{% raw %}<div style="width: {{progress}}%" class="eq-progress-bar__fill">
  <img class="eq-progress-bar__image" src={{runningGIFPath}} alt="" />
</div>{% endraw %}
```

The service makes it easy to get the following (adorable) effect.

![A GIF showing different Eevees running across the screen as a user completes the quiz.](/assets/images/posts/eevee-quizzes-singletons/quiz_flow.gif)

### Changing the Menu when you Finish the Quiz

A simple trick of quiz apps is remembering when a user already finished. If so, it directs them from the quiz towards their results. This is easy to pull off with the service. First, the application controller gets the needed data by injecting the quiz service.

```javascript
export default Controller.extend({
  quiz: service(),
  completed: reads('quiz.completed'),
  winner: reads('quiz.winner')
});
```

The service knows if it's finished and who the winner is, so it passes those to the application controller. The application template uses this to change the navigation. Here, `completed` and `winner` are the values pulled from the service.

```html
{% raw %}<li class="eq-nav__list-item" data-test="Nav-QuizLink">
  <strong>
    {{#if completed}}
      {{link-to 'See Your Results' 'results.pokemon' winner class="eq-nav__link"}}
    {{else}}
      {{link-to 'Take the Quiz!' 'quiz' class="eq-nav__link"}}
    {{/if}}
  </strong>
</li>{% endraw %}
```

Linking services to templates like this are part of why they're great for managing state. I do the same for telling users when they're resuming the quiz, or marking their result in the results page. Ember lets you connect them together in a quick and seamless way.

### Using Cookies to Remember Finished Quizzes

The above code works fine in one browser session, but what about if a user closes the window and comes back later? Ember has an addon, `ember-cookies`, that lets you save and read cookies in a user's browser. It works as a service itself, and is used in the quiz service!

Yes, services can be used in other services. I'll wait for a moment while you pull your mind back together.

When starting the app, the service's `init` hook runs. It checks if any cookies exist that signal the user already finished the quiz, and what their result was. If there is, it assigns the needed values in the service properties.

```javascript
init(){
  this._super(...arguments);

  let cookies = this.get('cookies');
  // This saves the cookies service to a variable for convenience

  if (cookies.exists('winner')) { this.set('winner', cookies.read('winner')); }
  if (cookies.exists('completed')) { this.set('completed', cookies.read('completed')); }
  // These update service properties based on the user's cookies
}
```

## Take the Quiz!

I hope you enjoyed this mini crash-course on Ember services, and by extension the singleton pattern. Services are one of my favorite parts of Ember yet are often overlooked by tutorials. So I'm glad to help spread the word of them to those unfamiliar with it. Managing state is what JavaScript frameworks are all about, after all!

With all that said, please try out the quiz if you're interested! Comment below with your results, and also any potential changes for future versions.

Mostly the results though, so as not to dampen my feeling of accomplishment. Or my sense of joy from being an Espeon.
