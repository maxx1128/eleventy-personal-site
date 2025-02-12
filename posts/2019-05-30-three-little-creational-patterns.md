---
title: "The Three Little Creational Patterns - A Design Patterns Intro"
date: "2019-05-30"
excerpt: "A beginning coder's guide to understanding creational design patterns with an alternate telling of The Three Little Pigs."
image: 'three-little-creational-patterns.jpg'
---
Design patterns are essential for programmers to keep in mind, at least to me. These are established solutions to common problems which help keep code maintainable and loosely coupled. The more one knows them, the easier it gets to solve all the problems we face.

Once you learn them you see them everywhere. I use adapters for connecting APIs, singletons for Ember services, state and observers for managing UIs, and facades for both managing objects and fooling my relatives on holidays.

Yet as someone without a computer science background, learning them was a struggle. Every explanation or book was riddled with jargon to sift through. Some of them I _still_ don't quite understand. I barely know how the Flyweight pattern works and anyone who says they do is a liar.

So my idea was explaining design patterns with stories. Stories that are also well-established and solve common problems, but are easier to understand. That is, **fairy tales!**

## Introducing Design Patterns as Fairy Tales

This series is to help people learn the basic functions and uses for design patterns. The examples are bare-bones and a jumping-off point for learning more. They're also in JavaScript, but the ideas apply to any object-oriented language.

Here I'm going to look at **the five creational design patterns. These are patterns to create and manage objects that are more maintainable and with fewer side-effects.**

And when it comes to creating things, I think of the Three Little Pigs! Let's begin.

## Building a Straw House with a Factory

In this version of the fairy tale, let's say each little pig is breaking into the real estate market. The first pig, naturally, does this by making straw houses. He decides to make them with JavaScript classes.

The pig writes this base class for making a straw house. The only argument it needs is the number of needed straw bales.

```javascript
class StrawHouse {
  constructor(straw) {
    this.straw = straw;
  }
}
```

As the orders come in, the pig realizes this class isn't efficient for making lots of houses. Customers give him the height of the house they want and if they want the house reinforced with more straw. The pig has to do the math each time, sometimes the same operations more than once.

Creating so many house instances this way is exhausting, so the pig uses the Factory Pattern to manage the work behind making each one.

```javascript
class StrawHouseFactory {
  static create(height, specs) {
    const strawBase = (specs === 'reinforced') ? 350 : 150,
          amountOfStraw = height * strawBase;

    return new StrawHouse(amountOfStraw);
  }
}
```

**This straw house factory lets him quickly create a different straw house from the info clients give him, doing the math and returns the desired `StrawHouse` class instance.** This is a simple yet powerful benefit, which makes sense since the factory is arguably the simplest creational pattern.

```javascript
const smallStrawHouse = StrawHouseFactory.create(10),
      strongStrawHouse = StrawHouseFactory.create(25, 'reinforced');
```

As a bonus, the house class and the factory class aren't coupled together too closely. He could change either class fairly easily without breaking the other. That's a common benefit you'll see in other creational patterns, and indeed all design patterns.

## Building a Stick House with a Prototype

The second pig is making stick houses but is facing a different problem. All his clients want to create neighborhoods with similar-looking stick houses. He could try the factory method his brother used for straw houses, but he'd be making the same type of stick house over and over. Writing code to produce the same instances is repetitive and he wants something more efficient.

The second pig uses the Prototype pattern instead. Let's say a group of clients all want a small stick house. **Instead of making multiple instances of the stick house for them, he'll make only one (a prototype) and include a method to copy it as needed.**

```javascript
class StickHouse {
  constructor(height, sticks) {
    this.height = height;
    this.sticks = sticks;
  }
}

class StickHousePrototype {
  constructor(height) {
    this.height = height;
    this.sticks = height * 100;
  }

  copy() {
    return new StickHouse(this.sticks, this.height);
  }
}
```

This is less repetitive and ensures each one is exactly the same. He could even make changes to each copy for extra flexibility.

```javascript
const smallStickHouse = new StickHousePrototype(15),
      largeStickHouse = new StickHousePrototype(50);

const housesForFriends = {
  'Amy': smallStickHouse.copy(),
  'Bob': smallStickHouse.copy(),
  'Cole': smallStickHouse.copy(),

  'Dingus': largeStickHouse.copy(),
  'Eragon': largeStickHouse.copy()
}
```

Overall this pattern works best if you need lots of instances that are entirely or mostly the same.

## Building a Brick House with a Builder

The third pig is selling brick houses, a more ambitious goal. Brick houses are trickier and take several steps. Plus due to their newness in the forest, clients often put off deciding on how big it should be until partway through. The third pig realizes he needs a pattern that can handle all this extra complexity without getting overwhelmed.

He stumbles upon the Builder pattern and his piggie prayers are answered!

This is the third pig's base class for making a brick house. It needs the three size dimensions and the amount of cement to stick the bricks together.

```javascript
class BrickHouse {
  constructor(width, length, height, cement) {
    this.width = width;
    this.length = length;
    this.height = height;
    this.cement = cement;
  }
}
```

The pig then writes his Builder class. The main things he wants from it are:

* Individual methods for setting each size dimension. The builder should be able to take a few, pause to run other code, then resume where it left off.
* Methods to calculate how much cement is needed once the full size is known.
* A final method to take all this info and return the finished brick house.

```javascript
class BrickHouseBuilder {
  setWidth(width) {
    this.width = width;
    return this;
  }

  setLength(length) {
    this.length = length;
    return this;
  }

  setHeight(height) {
    this.height = height;
    return this;
  }

  addCement() {
    this.cement = this.getCementBase() + this.getCementForBetweenBricks();
    return this;
  }

  getFloorSize() {
    return this.width * this.length;
  }

  getCementForBetweenBricks() {
    return this.getFloorSize() * 0.25;
  }

  getCementBase() {
    return this.getFloorSize() * (this.height / 5);
  }

  build() {
    return new BrickHouse(this.width, this.height, this.length, this.cement);
  }
}
```

It's a lot to take in, I know. But know the pig can call each method, with whatever data it needs, to carefully build each house.


```javascript
const newBrickHouse = new BrickHouseBuilder(),
      smallBrickHouse = newBrickHouse.setWidth(5).setLength(5).setHeight(5).addCement().build();
```

It also works when he has to pause construction in the code.

```javascript
const largeBrickHouse = newBrickHouse.setWidth(20).setLength(25);

// Extra calculations here as the client decides what to do

largeBrickHouse.setHeight(20).addCement().build();
```

**As you can see, Builders are great for abstracting away more complex steps and calculations needed for making larger objects, and over multiple statements.**

## Building a Business with a Singleton

Let's fast forward this fairy tale into the future. The three little pigs meet the big bad wolf, and they all form a real estate company called the Pigs and Wolf Partners Real Estate LLC. It's a great new company, and they want to manage their company info with JavaScript.

The three pigs realize they can't use any of patterns from before since they're made for multiple instances of a class. There's only one instance of their company, therefore only one instance of that class. Otherwise, wannabe real-estate animals may try to copy and take over their life's work!

That's where singletons shine. **Singletons are set up so only one instance can be made. Any attempts to create a new one refer back to the original.**

```javascript
class RealEstateCompany {
  constructor(employees) {
    if (typeof RealEstateCompany.instance === 'object') {
      return RealEstateCompany.instance;
    }
    RealEstateCompany.instance = this;

    this.employees = employees;

    return this;
  }
}
```

Below you'll see someone trying to make two instances of the company, the second one being fake with different other wildlife.

```javascript
const company = new RealEstateCompany(['Pig 1', 'Pig 2', 'Pig 3', 'Wolf']),
      fakeCompany = new RealEstateCompany(['Zebra', 'Aardvark', 'Chris Pratt'])
```

Since it's a singleton, `fakeCompany` will return the same as `company`. The pigs can then reference their real company anywhere in their program and get the original instance, including any changes done to it elsewhere. A proper singleton is a reliable "single source of truth."

## Taking over the Housing Market with an Abstract Factory

The pigs have it all going for them. They've got three types of houses in the market, they've got a company, they've each got personal pools and steady girlfriends they hope to one day marry. One thing they also have is large-scale disorganization.

For making all their houses, the pigs need to manage a lot of creational patterns:

* A factory for straw houses
* A prototype maker for stick houses
* A builder for brick houses.

Thankfully there's one last creational pattern to manage them all: the Abstract Factory!

**While the regular factory creates instances of a single class, abstract factories juggle making instances of multiple classes.** The pigs need to manage not one, but three. An abstract factory can call any classes they need, and even add some extra logic to cover common use cases.

```javascript
class PigHouseAbstractFactory {
  static strawHouse(size) {
    if (size === 'large') {
      StrawHouseFactory.create(25, true);
    } else {
      StrawHouseFactory.create(10)
    }
  }

  static stickHouse(size) {
    if (size === 'large') {
      return new newStickHousePrototype(50).copy();
    } else {
      return new newStickHousePrototype(15).copy();
    }
  }

  static brickHouse(size) {
    if (size === 'large') {
      return new BrickHouseBuilder.width(20).length(25).height(20).height(20).getCement().build();
    } else {
      return new BrickHouseBuilder.width(5).length(5).height(5).getCement().build();
    }
  }
}
```

This pattern lets them fill any order starting with a single class, and without coupling any dependent classes too tightly.

```javascript
const smallStrawHouse = PigHouseAbstractFactory.strawHouse(),
      largeStrawHouse = PigHouseAbstractFactory.strawHouse('large'),
      smallStickHouse = PigHouseAbstractFactory.stickHouse(),
      largeStickHouse = PigHouseAbstractFactory.stickHouse('large'),
      smallBrickHouse = PigHouseAbstractFactory.brickHouse(),
      largeBrickHouse = PigHouseAbstractFactory.brickHouse('large');
```

Looks like the pigs have a happy ending in this fairy tale and a bright future in real estate.

## The Design Pattern Quest Has Only Begun

I hope to cover all 23 of the classic Gang of Four design patterns throughout this series. These posts are by no means all you need to know about them, but I hope they serve as simple foundations for learning each one's complexities. I struggled to find beginner-friendly intros when learning them, and hope these help others avoid the same fate.

_To Be Continued..._
