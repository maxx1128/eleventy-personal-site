---
title: You can destructure arrays with spread operators
category: JavaScript
date: 2021-09-27
---

I was reading an [article to refresh my memory on JavaScript concepts for React](https://blog.logrocket.com/javascript-concepts-before-learning-react/), and found a section on destructuring. I thought there was only object destructuring since I see it at the top of so many React and Ember files.

```javascript
import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
```

But it turns out coders can destructure arrays in the same way!

```javascript
const [first, second, ...theRest] = [1, 2, 3, 4, 5, 6, 7];

console.log(first);   // 1
console.log(second);  // 2
console.log(theRest); // [ 3, 4, 5, 6, 7 ]
```

My guess is I'd overlooked this concept since I never got to truly dig into using React hooks. Array destructuring is [how the official React documents tells coders to use Hooks.](https://reactjs.org/docs/hooks-overview.html#state-hook)

```javascript
import React, { useState } from 'react';

function Example() {
 // Array destructuring in action!
 const [count, setCount] = useState(0);

 // Rest of the component here
}
```

After reading this, I wondered why not use object destructuring. Didn't it do this exact thing already? **But the first article I read anticipated my question and mentioned the main perk: conciseness.**

First, this is more evidence that data analytics online will soon be at the full mind-reading stage. Second, I agree the object approach looks too...verbose when each variable needs to be renamed.

```javascript
import React, { useState } from 'react';
function Example() {
 // Object destructuring in action!
 const { initialState: count, updateState: setCount } = useState(0);

 // Rest of the component here
}
```

I'm often in favor of the trade-off of longer but more verbose and explicit code. But I could see this getting too long-winded even for me on a project with dozens of React components.

One more point to you, Internet mind-readers. But I'll win in the end.
