---
title: Firefox lets you take screenshots from nodes
category: Other Stuff
date: 2021-07-27
---

I found a random, helpful tool in [an illuminating article on accessibility testing.](https://www.tpgi.com/accessibility-testing-as-a-screen-reader-user/) The author talked about how they take screenshots without seeing the page. Firefox helps by letting you track down an element in the DOM and screenshot only that element. **So if they know some HTML uses the wrong semantics, they can screenshot the element in question on their own.** Neat!

This is another classic example of accessibility helping everyone. I, a sighted user, saw how helpful this is for one of my pet projects: [my Anime Quote Image maker.](https://www.quotemaker.maxwellantonucci.com/)

Before, I was awkwardly taking a manual screenshot of my quote images with the `Command + Shift + 4` shortcut. It worked but was imprecise and annoying. Clicking "screenshot node" from the image in the inspector is much easier.

![""](/assets/images/todayILearned/firefoxNode1.png)

Then I found an even more convenient way! I could just right-click the image, click "take screenshot," and select the node on the page. No inspector needed!

<ul class="post-content--image-list">
  <li>
    <img src="/assets/images/todayILearned/firefoxNode2.png" alt="">
  </li>
  <li>
    <img src="/assets/images/todayILearned/firefoxNode3.png" alt="">
  </li>
</ul>

I know I should set up a "click and download" function one day, so non-Firefox users also have an easier time. But I'm going to keep procrastinating on that for now.
