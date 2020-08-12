---
title: "Snow White and the Seven Behavioral Patterns - A Design Patterns Intro"
date: "2019-07-24"
excerpt: "A beginning coder's guide to the other half of behavioral design patterns with an alternate telling of Snow White and the Seven Dwarves."
image: 'snow-white-behavioral.jpeg'
tags: ['javascript', 'Design Pattern Fairy Tales']
featured_image_link: 'https://safebooru.org/index.php?page=post&s=view&id=745684'
---

Welcome to the third entry in my “Design Pattern Fairy Tales” series! It aims to explain design patterns in a more accessible way - that is, fairy tale metaphors.

The last post covered the first half of the behavioral patterns, which let multiple objects work together for complex tasks. This post covers the second half of this group, using simple examples explained in the context of another classic tale, **Snow White and the Seven Dwarves.**

I've introduced this series twice already, so there's not much to say here. Let's get right to it.

## Alerting the Dwarves with an Observer

Let's focus this telling of Snow White on the dwarves and their work mining. So let's start it the same way the seven dwarves start their workday: with one yelling "Heigh-Ho" to the others so they know it's time to start. In the film, Doc is the first one to yell it so we'll do the same here.

Doc needs a way to yell and be confident the other dwarves will hear and yell back, so he decides to use an Observer pattern. First, he writes a class for himself as the one calling out. He starts with a basic way to make a list of dwarves to call out to.

```javascript
class Caller {
  constructor() {
    this.dwarves = [];
    this.yell = null;
  }

  register(dwarf) {
    this.dwarves.push(dwarf);
  }
}
```

The most important property is `this.dwarves`, which is a list of the actual dwarves he's yelling out to. It starts empty, so he includes the `register` method to quickly add extra dwarves. Each dwarf on that list is now basically "listening" to what the caller does.

Once he has a method to add dwarves to yell at, he needs a way to update all of them. So when he calls out, he needs to take each dwarf and give them any info they need.

```javascript
class Caller {
  constructor() {
    this.dwarves = [];
    this.yell = null;
  }

  register(dwarf) {
    this.dwarves.push(dwarf);
  }

  updateAll() {
    return this.dwarves.forEach(el => el.update(this));
  }

  callOut(yell) {
    this.yell = yell;
    this.updateAll();
  }
}
```

The `updateAll` function is what takes every dwarf that's listening and says "The caller is yelling so you need to yell too!" Each swarf is passed the `Caller`, which will tell them what they need to yell.

We can see how the dwarves would respond in the `DwarfObserver` class.

```javascript
class DwarfObserver {
  constructor() {
    this.yell = null;
  }

  update(caller) {
    this.yell = caller.yell;
  }
}
```

Whenever a dwarf is "updated", we're telling them to yell what Doc is yelling. In other words, when they hear Doc yell they should yell the same thing. This is the core of the Observer pattern, where **one object watches for changes in another, and takes a specific action right when the change happens.**

Let's get this specific example set up by defining Doc as the Caller, and defining four other dwarves listening to him.

```javascript
const Doc = new Caller();

const Happy = new DwarfObserver(),
      Bashful = new DwarfObserver(),
      Sneezy = new DwarfObserver(),
      Grumpy = new DwarfObserver();
```

We'll register each dwarf with Doc so they starting listening for him to yell.

```javascript
const dwarves = [Happy, Bashful, Sneezy, Grumpy]
dwarves.forEach(dwarf => Doc.register(dwarf));
```

Now when we tell Doc to call out, he'll automatically update the other dwarves so they yell too!

```javascript
Doc.callOut('Heigh Ho!');

Doc.yell;
// 'Heigh Ho!'

Happy.yell;
// 'Heigh Ho!'
Bashful.yell;
// 'Heigh Ho!'
Sneezy.yell;
// 'Heigh-Ho!'
Grumpy.yell;
// 'Heigh Ho!'
```

## Crossing the Bridge with an Iterator

Now the dwarves are off to work, but they're not at the mines yet. Let's say it's early in the morning and they need to cross a narrow bridge to reach the mines. But it's so dark out they can barely see the other dwarves, and they can't risk multiple dwarves crossing at the same time.

Doc sees they need a careful way to let each dwarf cross that'll keep track of how many need to cross. So he writes up an Iterator class to do just that.

```javascript
class DwarfIterator {
  constructor(dwarves) {
    this.index = 0;
    this.dwarves = dwarves; // is an array
  }

  hasNext() {
    return this.index < this.dwarves.length;
  }
}
```

Right now the class doesn't do much. It has a list of dwarves, an index of zero so it's at the start of the list, and a function to tell if they're at the end of the list. That's helpful but not enough to get them across the bridge. Doc needs it to track who's going to cross the bridge next and yell out to them.

So he adds two more methods. `nextDwarf` will tell the current Dwarf to cross and increase the index further along with the list. He adds `callNextDwarf` that will check if there are any dwarves next before calling for another.

```javascript
class DwarfIterator {
  constructor(dwarves) {
    this.index = 0;
    this.dwarves = dwarves;
  }

  hasNext() {
    return this.index < this.dwarves.length;
  }

  nextDwarf() {
    return `${this.dwarves[this.index++]}, you may cross!`;
  }

  callNextDwarf() {
    return this.hasNext() ? this.nextDwarf() : "Everyone is here!";
  }
}
```

With this setup, Doc can simply pass in the list of dwarves and keep using `callNextDwarf` over and over. **The Iterator lets them easily navigate the list of dwarves, abstracting away the work of keeping track tracking where they are and what actions to take.**

Let's set up the list of dwarves (we can use an array of strings instead of objects to save time), and pass those into the Iterator.

```javascript
const crossingDwarfs = [
  "Sneezy",
  "Sleepy",
  "Happy",
  "Doc",
  "Grumpy",
  "Dopey",
  "Bashful"
];

const dwarfCounter = new DwarfIterator(crossingDwarfs);
```

Now Doc can use the iterator to track who should be called next and when they're all across. He just keeps yelling what it tells him to until they're done.

```javascript
dwarfCounter.callNextDwarf();
// Sneezy, you may cross!
dwarfCounter.callNextDwarf();
// Sleepy, you may cross!
dwarfCounter.callNextDwarf();
// Happy, you may cross!
dwarfCounter.callNextDwarf();
// Doc, you may cross!
dwarfCounter.callNextDwarf();
// Grumpy, you may cross!
dwarfCounter.callNextDwarf();
// Dopey, you may cross!
dwarfCounter.callNextDwarf();
// Bashful, you may cross!
dwarfCounter.callNextDwarf();
// Everyone is here!
```

## Managing Everyone's Work with a Mediator

The dwarves are in the mines and ready to work. There's a lot of sections to mine, and each dwarf moves to a different one. It takes a lot of time to move between sections, and they don't want more than one dwarf in a section at one time since they want a variety of stones.

This is tough to manage since if a dwarf wants to move to another section they don't know if someone's already there. Doc sees this issue and, being the problem-solving dwarf he is, writes up a class to make himself a Mediator.

The Mediator class is similar to the `Caller` class from the Observer. **It has a list of dwarves, but instead of alerting all those dwarves of changes, it uses info about these dwarves to better coordinate and guide their actions.**

```javascript
class DwarfMediator {
  constructor() {
    this.dwarves = [];
  }

  checkSection(section) {
    return this.dwarves.every(dwarf => dwarf.section !== section);
  }
}
```

Here, coordinating the different dwarfs takes the form of `checkSection`. It checks to see if any other dwarf is already in that section, and returns `true` or `false` respectively. This prevents section overlap among all the dwarves he's coordinating.

Doc also writes a class for the dwarfs he mediates. Each one needs a Mediator, so he makes sure that whenever a worker is made, it adds itself to a Mediator's list of workers.

```javascript
class DwarfWorker {
  constructor(section, mediator) {
    this.section = section;
    this.mediator = mediator;
    this.mediator.dwarves.push(this);
  }
}
```

Now the worker can refer back to the Mediator and its knowledge about the other dwarves. It can ask the Mediator to check if a specific section is available with `askToMove`, and if it is, they'll move there.

```javascript
class DwarfWorker {
  constructor(section, mediator) {
    this.section = section;
    this.mediator = mediator;
    this.mediator.dwarves.push(this);
  }

  askToMove(section) {
    const available = this.mediator.checkSection(section);
    if (available) {
      this.section = section;
    }
  }
}
```

This is good since the class isn't coupled tightly to the Mediator. The Mediator focuses on organizing info provided by each worker (their sections) and leaving as much action to the workers as possible (moving to the new section).

We can see how helpful this is in action. Doc creates an instance of himself as a Mediator and the other dwarves as a worker.

```javascript
const MediatorDoc = new DwarfMediator();

const Sneezy = new DwarfWorker("Diamonds", MediatorDoc),
  Sleepy = new DwarfWorker("Rubies", MediatorDoc),
  Happy = new DwarfWorker("Sapphires", MediatorDoc),
  Grumpy = new DwarfWorker("Emeralds", MediatorDoc),
  Dopey = new DwarfWorker("Gems", MediatorDoc),
  Bashful = new DwarfWorker("Crystals", MediatorDoc);
```

Let's say Sneezy wants to move to the "Rubies" section. Doc will see that Sleepy is already there and stop him.

```javascript
Sneezy.askToMove("Rubies");
// Sneezy.position is still "Rubies!"
```

Sneezy gets the message, stays where he is, and asks about the "Pearls" section instead. Doc sees that's open and allows him to move.

```javascript
Sneezy.askToMove("Pearls");
// Sneezy.position has changed to "Pearls!"
```

With this, we have several objects working together in an organized way that avoids tight coupling.

## Tracking Mining Progress with a Memento

As the dwarves keep working, they realize that since jewels and diamonds have gone missing lately, they need to keep better track of how many they've found. Sneezy wants to track how many they dig up each hour, so if they realize some have vanished, they can check how many they had each hour to see when they vanished.

Sneezy decides to set up a Memento pattern for this. **It'll let him keep track of the changes, and check back on earlier state counts.**

There are three parts to the Memento pattern Sneezy writes. First is the Memento itself, which are the "snapshots" of the rocks gathered. He'll be making another one every hour.

```javascript
class Memento {
  constructor(jewels, diamonds) {
    this.jewels = jewels;
    this.diamonds = diamonds;
  }
}
```

He also needs an `originator`, which is an extra layer of abstraction that directly handles Mementos. In this case, Sleepy only needs the originator to create new Mementos and pull data from old ones.

```javascript
const originator = {
  store: function(jewels, diamonds) {
    return new Memento(jewels, diamonds);
  },
  restore: function(memento) {
    return {
      jewels: memento.jewels,
      diamonds: memento.diamonds,
    };
  }
};
```

The last part of this pattern is the `caretaker`, which keeps track of mementos in a large group. It has ways to add and retrieve Mementos, but it has no direct contact with the Memento class itself - that's left to the originator. The caretaker stores and manages them with some basic functions.

```javascript
class CaretakerDwarf {
  constructor() {
    this.mementos = [];
  }

  addMemento(memento) {
    this.mementos.push(memento);
  }

  getMemento(index) {
    return this.mementos[index];
  }

  getMementoFromHour(hour) {
    const hourIndex = hour - 1;
    return this.getMemento(hourIndex)
  }
}
```

Now Sneezy has all he needs to start tracking Mementos. First, he assigns himself as the caretaker.

```javascript
const Sneezy = new CaretakerDwarf();
```

Now he can use the originator to add new Mementos to track the jewels and diamonds each hour.

```javascript
Sneezy.addMemento(originator.store(2, 4));
Sneezy.addMemento(originator.store(3, 6));
Sneezy.addMemento(originator.store(0, 2));
```

If Sneezy needs to check how much was collected in the second hour, he can quickly restore the "state" of that hour's state. It's stored in a variable and he can compare it to others or do whatever else.

```javascript
const secondHourResults = originator.restore(Sneezy.getMementoFromHour(2));
secondHourResults.jewels;   // 3
secondHourResults.diamonds; // 6
```

## Loading Up Jewels through the Chain of Responsibility

It's the end of the working day and the dwarves need to start loading up their rocks into carts. Happy is glad to manage this but realizes there's a lot of things to consider.

* Each cart can only hold a limited number of rocks. No dwarf can have any leftover and no cart can overflow.
* Depending on where each dwarf is, there are many different possible paths for the cart to follow.
* Some dwarves may still be mining and need to keep passing the cart around.

The only constant Happy sees is the cart is moving from dwarf to dwarf, but the specific actions each dwarf takes could be different. The core of this puzzle is passing a cart object along a chain of dwarves, and he realizes the Chain of Responsibility pattern will solve it.

First, he creates a class for the mining cart. Each cart must be assigned a jewel limit and a simple list of assigned dwarves.

```javascript
class MiningCart {
  constructor(limit) {
    this.limit = limit;
    this.jewels = 0;
    this.dwarves = [];
  }

  setNextDwarf(dwarf) {
    this.dwarves.push(dwarf);
  }

  addJewels(jewels) {
    this.jewels += jewels;
  }
}
```

Happy also adds a few extra methods so it's easier to figure out of a cart has enough room to add more jewels.

```javascript
class MiningCart {
  constructor(limit) {
    this.limit = limit;
    this.jewels = 0;
    this.dwarves = [];
  }

  setNextDwarf(dwarf) {
    this.dwarves.push(dwarf);
  }

  addJewels(jewels) {
    this.jewels += jewels;
  }

  getAvailableSpace() {
    return this.limit - this.jewels;
  }

  hasEnoughSpace(jewels) {
    return this.getAvailableSpace() - jewels >= 0;
  }
}
```

Happy also needs a class for each Dwarf getting the cart, which tracks if they're mining and the jewels they have.

```javascript
class Dwarf {
  constructor(jewels, isMining) {
    this.jewels = jewels;
    this.isMining = isMining;
  }
}
```

Lastly and most importantly, Happy writes the class that will send the cart down the Chain of Responsibility. It takes the cart and passes it to each dwarf on the list, checking their mining status before trying to add their jewels to the cart. This updated cart is passed to the next dwarf, and so on until it's finished the chain. **This lets the cart and dwarves work together to gather jewels and do other operations in the correct order without coupling them too close together.** The finished cart, loaded with as many jewels as it can carry, is returned to Happy at the end.

```javascript
class CartChainOfResp {
  calc(cart) {
    cart.dwarves.forEach(dwarf => {
      const cartHasSpace = cart.hasEnoughSpace(dwarf.jewels),
            dwarfHasFinishedMining = !dwarf.isMining;

      if (dwarfHasFinishedMining && cartHasSpace) {
        cart.addJewels(dwarf.jewels);
      }
    });

    return cart;
  }
}
```

Let's look at this pattern in action. Happy sees three dwarves in the mine he can pass the cart too. The cart has a limit of 100 jewels, so Happy notes down the needed info about the other dwarves and assigns them to the cart.

```javascript
const miningCart = new MiningCart(100),
      Sneezy = new Dwarf(50, false),
      Doc = new Dwarf(25, true),
      Dopey = new Dwarf(50, false);

miningCart.setNextDwarf(Sneezy);
miningCart.setNextDwarf(Happy);
miningCart.setNextDwarf(Dopey);
```

With the cart and its path set, it's ready to go up the chain. He creates an instance of his Chain of Responsibility and passes it the mining cart to go up the chain.

```javascript
const cartChainOfResp = new CartChainOfResp();
let finishedCart = cartChainOfResp.calc(miningCart);

finishedCart.jewels;
// 100
```

The cart gathers 50 jewels from Sneezy, skips Doc since he's still mining, gathers 50 more from Dopey, and returns with a full load of 100 jewels.

Let's adjust the scenario a bit, increasing the cart's limit and the number of dwarves.

```javascript
const miningCart = new MiningCart(150),
      Sneezy = new Dwarf(50, false),
      Doc = new Dwarf(25, false),
      Dopey = new Dwarf(50, false),
      Sleepy = new Dwarf(30, false);

// Same code still here //

finishedCart.jewels;
// 125
```

The cart will gather jewels from all the dwarves, skips over Sleepy since he would put the cart over the limit, and returns with 125 jewels.

Now let's adjust this scenario so Dopey is still mining. This makes room for Sleepy's gems but lowers the cart's overall total.

```javascript
const miningCart = new MiningCart(150),
      Sneezy = new Dwarf(50, false),
      Doc = new Dwarf(25, false),
      Dopey = new Dwarf(50, true),
      Sleepy = new Dwarf(30, false);

// Same code still here //

finishedCart.jewels;
// 105
```

In all these scenarios, we see the Chain of Responsibility carry out its logic no matter what dwarves make up the chain.

## The Design Pattern Castle Approaches

There's only one post left in this explanatory fairy tale that looks at structural patterns. As fun as this series has been to write, I'm also looking forward to saving the programming princess and close the book on the repo of this tale. So stick around for the last entry!

_To Be Continued..._
