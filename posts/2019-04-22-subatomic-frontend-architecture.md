---
title: "How to Build a SubAtomic Frontend Architecture"
date: "2019-04-22"
excerpt: "A SubAtomic Frontend Architecture balances Atomic CSS and BEM class naming to build a fast, flexible framework."
image: 'subatomic.png'
tags: ['css', 'design']
---
My current job has me handling a few things:

* Improve our site's accessibility standards
* Help people debug CSS issues, mostly Flexbox ones
* During a full moon, watch for movement from the headless mannequins our CEO bought

These all matter, but the most important one isn't here: making and managing a system for our front-end assets. When I arrived our current one was a scattered collection of assets mixed with Bootstrap. We wanted one with better style documentation, component organization, and less dependence on frameworks.

It took a few tries, but ultimately I landed on a system that meets most of our needs. It relies on what I call a **SubAtomic Frontend Architecture or SAFA** for managing styling. We've been slowly integrating it into old projects, and a new one uses it for the entire frontend.

I'm happy/relieved/tempting fate to say it's been mostly well-received and helped us avoid common front-end troubles like:

* Accidental overrides
* Style at scale
* Back-end focused engineers not knowing what the hell to do
* Quinoa

That's why I wrote this post to describe this SubAtomic approach. My hopes are you take inspiration, try it yourself, give me credit, and I can ultimately have a small web development book deal as I ride into the sunset.

So join me in my quest and read onward!

## What is a SubAtomic Frontend Architecture?

**What I call a SAFA is basically writing CSS with 80% Atomic CSS, and 20% BEM** (mostly Atomic, so it's SubAtomic, get it?). Writing the front-end this way has a few key steps:

### 1. Get, or Build, an Atomic CSS Framework

For those who don't know, Atomic CSS is building styles entirely (or mostly so) with helper classes. I won't go into the details (or controversy) here, but I refer you to [this presentation making the case for Atomic CSS](http://johnpolacek.com/rethinking/). I will say I was skeptical at first, but I and everyone I recommended it to have come around to it.

Our system uses a custom collection of helper classes since we wanted to avoid past dependency issues. If you're not restricted by that, [TailwindCSS](https://tailwindcss.com/docs/what-is-tailwind/) and [Tachyons](http://tachyons.io/) are popular options. At least see how these frameworks handle variables, responsive classes, and what styles to cover. There are a few parts of our current one I'd change based on how I saw Tailwind handling them now.

### 2. Build Your Site Using Atomic CSS Whenever Possible

Once the atomic classes are in place, get started and use them wherever possible! I've found **the markup for many components can be written entirely with Atomic CSS, and can partially style the rest.** So proper atomic styling saves a lot of time in the long run.

Let's look at my personal site as an example, which uses Tailwind. Here's the old `footer` markup styled only with helper classes.


```html
<footer class="w-full py-2 text-white bg-teal-darker shadow-lg">
  <div class="flex flex-wrap max-w-md px-4 md:px-6 my-4 mx-auto">
    <div class="w-full md:w-3/4 md:pr-8 lg:pr-12">
      <p class="text-sm">
        I’m Max Antonucci, a front-end developer in New Haven, CT...
      </p>

      <p class="text-sm">
        See all my (hopefully) useful notes on blah, blah, blah...
      </p>
    </div>
  </div>
</footer>

```

It's a lot of classes to look through, but it works. I can get a picture of the footer's appearance from the markup alone, adjusting styles is as easy as changing classes around, and I made it without writing any new CSS.

### 3. Use BEM Wherever Atomic CSS Doesn't Cut It

As wonderful as Atomic CSS is, helper classes can't cover everything. There are too many potential CSS properties and values, and covering them all with helpers asks too much of them.

Common exceptions to what Atomic CSS covers I've found are:

* _Layouts_, which have many potential widths or grid setups. There are tools like the Bootstrap Grid, but I prefer writing my own layout CSS to avoid unneeded dependencies.
* _Frequently used components_, like buttons or input fields. The more an element is used, the harder it is to keep all possible helper classes in sync. Creating reusable components solves this, but unless I'm 100% sure that markup is only in one place, Atomic CSS brings too much risk for me here.
* _Obscure styles or positioning_, since there can't be a helper for every percentage value in absolute positioning. Please, no.

For these cases and more, I fall back to adding extra styling with BEM. Check out [this article to fully understand BEM if you don't already](https://seesparkbox.com/foundry/bem_by_example). In short, it's a methodology for writing specific component class names, basically the opposite of Atomic CSS.

Your first thought may be _"So if my atomic classes aren't enough, I should replace them all with one BEM class?"_ To this, I reveal my mind-reading and say that's not the case at all! **The SubAtomic Approach uses BEM as a supplement to Atomic CSS, not a replacement.** Any extra classes I write are used alongside the helpers.

This is best shown with an example. Here's the simplified HTML from my personal site's navigation. If you check out the class names, you'll see both a set of subliminal instructions and some items different from my last example.

```html
<div class="bg-teal-darker text-white shadow-lg z-10">
  <nav class="flex flex-col max-w-md mx-auto">
    <div class="hidden md:flex items-center py-2 px-2 md:px-4">
      <img class="nav__logo mr-4 rounded-full" src="/assets/images/global/profile.jpg" alt="Maxwell's profile picture" />

      <p class="my-0 text-sm italic">
        {{site.description}}
      </p>
    </div>

    <ul class="nav__main-menu list-reset flex flex-wrap md:flex-col mb-0 md:my-4 text-xs">
      {% for menu_item in site.data.menu %}
        <li class="inline-block mb-0 text-center">
          <a class="block p-2 text-white" href="{{menu_item.link}}">
            {{ menu_item.name }}
          </a>
        </li>
      {% endfor %}
    </ul>

    <ul class="list-reset flex flex-wrap md:flex-col mt-auto mb-0 text-xs">
      {% for social in site.data.social %}
        <li class="inline-block mb-0 p-2 text-center">
          <a class="text-white" href="{{ social.url }}" target="_blank" rel="noopener">
            {{ social.name }}
          </a>
        </li>
      {% endfor %}
    </ul>
  </nav>
</div>

```

There are different classes are on the `img` and `ul` tags! The Tailwind classes covered about 95% of the styles I needed, but there was still styling they couldn't give me. So I used BEM to sprinkle on the last bits of CSS: a specific max-width and a translucent background cover.

```css
.nav__logo {
  max-width: 100px;
}

.nav__main-menu {
  background-color: rgba(#005661, 0.75);
}
```

That's all the CSS I wrote for this navigation! As of now, my entire site's custom CSS only needs 10 Sass partials, most only 10-20 lines long.

With that, you have the basics of the SubAtomic approach!

## SubAtomic Trade-offs

I won't claim this approach is best for all projects, although it's at least worth considering. But to help others make this decision, I will list the major trade-offs I've found in my experience with SAFA. Just know these are subjective opinions, and may vary with other coders using it.

### Faster, but Riskier

Atomic CSS benefits from speedy development with fewer decisions. It's easy to build and restyle components by just adding and removing classes. It's faster than the alternative I've dealt with:

* Deciding on a class name for a new element or pattern
* Deciding whether to place this class in a new or existing partial (and naming it if it's new)
* Writing out common styles, like padding and margin, which were repeated dozens of times already
* Make sure the values use style variables whenever needed, not hardcoded  or magic numbers
* Scream

This perk is better when front-end code is also being worked on by back-end developers, which is the case for me. The CSS is written ahead of time, and they just need to pick the write pieces instead of writing their own.

But with greater choice comes a greater risk of making the wrong one. It's easy to screw up a few classes anywhere in the markup. This can cause inconsistencies across common components, which are hard to root out amid a crowd of component classes (alliteration!)

You can lower this risk by documenting common helper class component combinations. Our style guide documents small things, like badges and styled links, with the right collection of helpers to recreate them. It isn't foolproof, but reliable references also make them easier to spot the mistakes that slide through. Limited documentation is a red flag when considering SAFA.

### More Flexibility, but More Project-Specific Code

Structuring CSS around helpers means it can be used for lots of sites and interfaces. We don't need to build out UI elements specific to a project's needs, like a shopping cart or preview card. We only build the ones needed in virtually any project ahead of time, like buttons and inputs. The rest is either pure or mostly helper classes.

This saves more time for minimally styled elements. We don't need new classes for components that only need padding and a border. Slap two or three helpers on it and you're done without any unneeded CSS inflation.

But this also means any BEM code must be managed on a project-by-project basis. Between only three projects using a SAFA, there could be dozens of CSS files specific to each. They could also be written by different developers. This flies in the face of one main reason to use a framework, which is enforcing consistency and style guidelines.

One way to manage this is, of course, good documentation. That, and enforcing consistent code standards early on. But I've found this is tough, even with good code linters, and depends a lot on your team's willingness to learn. So if you're making a framework used over a large number of projects and developers, consider other options.

## Wrapping Up

SAFA has been my CSS architecture of choice since it has everything I love about Atomic CSS and works to improve some of its drawbacks. Where I work it's much improved how we organize, document, and scale our frontend code in new and existing projects.

I hope other developers find it worth trying, although I think a few may realize they've already been writing something similar. But since I wrote a blog post first and gave it a name, I'll get the credit since that's how the world works in my mind.

Regardless, next time you need to choose a frontend architecture, please give the SubAtomic approach a try!
