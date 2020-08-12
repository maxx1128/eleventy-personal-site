---
title: "Goldilocks and the Three Behavioral Patterns - A Design Patterns Intro"
date: "2019-06-12"
excerpt: "A beginning coder's guide to half of the behavioral design patterns with an alternate telling of Goldilocks and the Three Bears."
image: 'goldilocks-three-behavioral-patterns.jpg'
tags: ['javascript', 'Design Pattern Fairy Tales']
featured_image_link: 'https://safebooru.org/index.php?page=post&s=view&id=2692747'
---

Welcome to the second entry in my "Design Pattern Fairy Tales" series!

This series aims to give new coders, or those without a computer science background, a basic intro to design patterns. These are established solutions to common programming problems and are quite useful to know. However, I had a hard time finding explanations for them not drowning in jargon. This series aims to fix this by explaining them in a context we all know - fairy tales!

This post moves our fantastical adventure from creational to behavioral patterns. While creational patterns were ways to make new objects, behavioral patterns are ways to make multiple objects actively work together for complex tasks. There's actually more behavioral patterns than any of the three groups, so I'm devoting two posts to covering them all.

Here I'm going to cover the first batch of behavioral patterns using a fairy tale focused on the bad behavior of its protagonist: _Goldilocks and the Three Bears!_

## Getting the Bikes Ready with a Strategy

Our version of Goldilocks starts similar to the original. The three bears (Papa Bear, Mama Bear, and Baby Bear) have cooked some porridge and set it out to cool. But here let's say they take their bikes for a ride while they wait. More fun, right?

The bears find their bikes and realize their new models let them change the bikes' resistance. This lets them make their trips harder or easier on themselves. The bears examine the class that makes up their bikes.

```javascript
class BearBike {
  constructor(weight, strategy) {
    this.weight = weight;
    this.strategy = strategy;
  }

  setWeight(weight) { this.weight = weight; }

  getResistance() {
    return this.strategy(this.weight);
  }
}
```

The `BearBike` class accepts the bear's algorithms for deciding the resistance. The actual algorithm, however, isn't there. It's passed to the bike in order to get the resistance as a `strategy`.

They realize this is the Strategy design pattern, where **the needed algorithm(s) are kept separate from the object and passed in.** This gives the bears greater control over calculating the bike's resistance, letting them write and manage the algorithms separately. They can be used here, and in any other classes they want!

The bears write a few functions to get the resistances they want. Papa Bear wants extra resistance for his new diet plan. Mama Bear wants less since she's sore from a big run. Baby Bear wants less since he's still growing, and an extra chunk of it removed since he's carrying extra trip gear.

```javascript
const PapaBearStrategy = (weight) => {
  return weight * 1.25;
}

const MamaBearStrategy = (weight) => {
  return weight * 0.8;
}

const BabyBearStrategy = (weight) => {
  return (weight * 0.6) - 20;
}
```

All the bears need to do now is to create class instances with their respective weights and strategies. The bikes will use each strategy to give each bear the desired resistance.

```javascript
const PapaBike = new BearBike(150, PapaBearStrategy);
PapaBike.getResistance();
// 187.5

const MamaBike = new BearBike(120, MamaBearStrategy);
MamaBike.getResistance();
// 96

const BabyBike = new BearBike(75, BabyBearStrategy);
BabyBike.getResistance();
// 45
```

The bears could use even more complicated algorithms if they wanted, bringing in other classes to calculate resistance based on what they ate, their weight loss goals, or even heat and humidity. All this logic could be brought into their strategies, but since it's only being passed to the bike, nothing risks overlapping too much so they break each other. As usual, loose coupling and maintainability are design patterns perks.

## Communicating The Trip with an Interpreter

With their new bikes ready, the bears are biking along a route. Papa Bear is at the front, letting his GPS guide them through the woods to the beach. The bears have never biked to the beach before, so they're relying a lot on the GPS to get there.

The problem is the GPS doesn't have an option to announce directions to a group. Papa could keep checking it and calling out where to go, but last time he did that he got distracted and crashed. So he wrote a program that would make the GPS announce new directions for them.

But the GPS has lots of data floating around, and it's hard to figure it all out. Papa Bear managed this by breaking down his program into small parts based on the language of what he wanted. He used the Interpreter design pattern, since **it lets him design objects and makes them work together based on language elements of what the code does.**

This is a bit tough to understand (I'm still trying to myself), so it's best to see it in practice.

Papa Bear wants the GPS to call out sentences set up as "Turn X in around Y yards!" The first part is "turn," so he writes a class for defining a turn. The GPS sees turns only in degrees, but Papa Bear wants it as a basic left, right, or straight. So he sets up his `Turn` class with an `interpret` function that does this work for him.

```javascript
class Turn {
  constructor(degrees) {
    this.degrees = degrees;
  }

  interpret() {
    if (0 < this.degrees && this.degrees < 135) { return 'right'; }
    if (225 < this.degrees && this.degrees < 360) { return 'left'; }

    return 'straight';
  }
}
```

He moves on to distance. This one is tricky since there are two quirks with how the GPS gets the distance:

1. The GPS measures distance in meters while the Bears are used to yards. To be fair, the GPS was made in Canada.
2. The GPS can't find the exact distance to the next turn. It gets a minimum and maximum distance, and the bears need to find the distance between them.

Papa Bear addresses each problem one at a time. First, he writes a class defining a basic unit of `Distance`, which converts meters to yards.

```javascript
class Distance {
  constructor(meters) {
    this.meters = meters;
  }

  interpret() {
    return this.meters * 1.09361;
  }
}
```

He then writes an `AverageDistance` class that takes two `Distance` instances and gets the average distance between them.

```javascript
class AverageDistance {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  interpret() {
    const difference = (this.end.interpret() - this.start.interpret()) / 2;
    return Math.round(this.start.interpret() + difference);
  }
}
```

All Papa Bear needs now is a class that takes a distance and a turn, and creates a sentence the GPS can call out to his family.

```javascript
class CallOut {
  constructor(distance, direction) {
    this.distance = distance;
    this.direction = direction;
  }

  interpret() {
    return `Go ${this.direction.interpret()} in around ${this.distance.interpret()} yards!`;
  }
}
```

All this can be put together like below. The syntax is expressive and easy to understand since we've defined the grammar of `distance` and `turn` that interprets the more abstract data. It reads less like a program and more like a sentence, where each object is one of the words.

```javascript
new CallOut(new AverageDistance(new Distance(minDistance), new Distance(maxDistance)), new Turn(turn))
```

You can see these Interpreter objects in action below.

```javascript
const turn1 = new CallOut(new AverageDistance(new Distance(100), new Distance(140)), new Turn(38));
turn1.interpret();
// Go right in around 131 yards!

const turn2 = new CallOut(new AverageDistance(new Distance(20), new Distance(50)), new Turn(340));
turn2.interpret();
// Go left in around 38 yards!

const turn3 = new CallOut(new AverageDistance(new Distance(85), new Distance(107)), new Turn(170));
turn3.interpret();
// Go straight in around 105 yards!
```

It also makes Papa Bear easier to follow, since now the bears can make their way along the route safely and accurately!

## Letting the Porridge Cool with a Visitor

Let's get to the other character in our fairy tale, Goldilocks! She's been wandering through the woods and, seeing a stranger's home with the door unlocked, she does what any normal person would and waltzes in to eat their food.

Goldilocks sees three bowls of porridge, but each is too hot to eat. She was in such a hurry to invade their home, none had enough time to cool! She wants to wait until each is just right, but doesn't know how long to wait. She looks at the code for each bowl of porridge but is surprised by what she sees.

```javascript
class Porridge {
  constructor(weight) {
    this.weight = weight;
    this.coolingTime = 0;
  }

  getCoolingTime() {
    return this.coolingTime;
  }

  accept(visitor) {
    visitor(this);
  }
}
```

The cooling time is 0, so according to the `Porridge` class, it's already ready to eat. That doesn't make sense! She also sees the class allows a `visitor`. She's not sure what that means so she looks around the kitchen for clues.

Eventually, she sees a function tucked away in a pantry with "visitor" in the name. It includes logic for setting a cooling time on food.

```javascript
const cooldownVisitor = (food) => {
  if (food.weight > 15) {
    food.coolingTime = 20;
  } else if (food.weight < 6) {
    food.coolingTime = 5;
  } else {
    food.coolingTime = 10;
  }
}
```

Goldilocks sees when `Porridge` accepts this Visitor, it changes the cooling time based on the food's weight to what's needed. This works, but she's still confused. Why not write this logic directly into the class instead of in this function? She eventually sees another class like the `Porridge` one. It has similar properties and methods to make use of `cooldownVisitor`.

```javascript
class Coffee {
  constructor(weight) {
    this.weight = weight;
    this.coolingTime = 0;
  }

  restOnCounter() {
    return this.coolingTime;
  }

  addSuger(cubes) {
    console.log(`Let us add ${cubes} cubes of sugar!`);
  }

  accept(visitor) {
    visitor(this);
  }
}
```

This helps Goldilocks see the benefit of this Visitor pattern. The cooldown logic needs to be used in multiple places, but it's impractical to have two very different classes extend off a class with this logic. **Visitors give a more manageable option of separating this logic into other objects and passing them in. Now they can be used in different areas without compromising the simplicity or maintainability of other classes.**

Using this visitor, Goldilocks can create `Porridge` instances based on their weight, add the Visitor, and get the cooling times.

```javascript
const PapasPorridge = new Porridge(16),
      MamasPorridge = new Porridge(12),
      BabysPorridge = new Porridge(5);

PapasPorridge.accept(cooldownVisitor);
MamasPorridge.accept(cooldownVisitor);
BabysPorridge.accept(cooldownVisitor);

PapasPorridge.getCoolingTime();
// 20
MamasPorridge.getCoolingTime();
// 10
BabysPorridge.getCoolingTime();
// 5
```

While there's no coffee out, she can imagine looking up a coffee's cooldown time looks like.

```javascript
const PapasCoffee = new Coffee(14);
PapasCoffee.accept(cooldownVisitor);
PapasCoffee.restOnCounter();
```

With the cooldown logic added, she's ready to eat food in a stranger's house regardless of what may be in it!

## Tasting the Porridge with State

With the porridge cooled, Goldilocks is ready to eat. But hungry as she is, she also wants to take a nap in the strangers' home because why not?

Goldilocks wants to understand when her body will be ready to sleep as she's eating the porridge. She knows the actions she's going to take - get porridge ready, eat the porridge, and finish eating it. But after the loop the visitor pattern just threw at her, she wants to clearly understand when she'll be ready. She consults some code managing her own State.

**An object's State controls what actions it is or isn't capable of, and adjusts these when the state changes.** Goldilocks could be in a `hungry` state that doesn't allow her to sleep, and need to reach a `full` State first. Her State determines whether or not she can perform important things, so knowing what it is matters.

Goldilocks starts with the base class that her other States are built off. It makes sure all States have access to the current State, the next State, and can move to the next one.

```javascript
class PersonState {
  constructor(state, nextState) {
    this.state = state;
    this.nextState = nextState;
  }

  next() {
    return new this.nextState();
  }
}
```

She checks her three different States too. Reading them over, she sees her State will affect what she's thinking, if she can run and if she can sleep. She also sees from the `super()` argument what the next State for each is. For example, moving on from `HungryState` changes it to `EatingState`.

```javascript
class HungryState extends PersonState {
  constructor() {
    super('Hungry', EatingState);
    this.thoughts = "I'm hungry!";
    this.canRun = true;
    this.canSleep = false;
  }
}

class EatingState extends PersonState {
  constructor() {
    super('Eating', FullState);
    this.thoughts = "This is tasty!";
    this.canRun = false;
    this.canSleep = false;
  }
}

class FullState extends PersonState {
  constructor() {
    super('Full', HungryState);
    this.thoughts = "So full! I want to take a nap.";
    this.canRun = false;
    this.canSleep = true;
  }
}
```

Finally, and most importantly, Goldilocks checks the `Person` class that makes up herself.

```javascript
class Person {
  constructor() {
    this.state = new HungryState();
  }

  sleep() {
    if (this.state.canSleep) {
      return 'Time to find a bed! Zzzzz...';
    } else {
      return 'I can\'t sleep until I\'ve eaten!'
    }
  }

  nextState() {
    this.state = this.state.next();
  };
}
```

The `sleep` function depends on if the current State allows the person to sleep. Goldilocks needs to change the State to one that lets her sleep. She'll do this with the `nextState` function, which moves to the next State in line.

With that in mind, Goldilocks sits down to eat some of the porridge and checks her actions based on her State.

```javascript
const Goldilocks = new Person();

Goldilocks.state.thoughts;
// I'm hungry!
Goldilocks.sleep();
// I can't sleep until I've eaten!
```

She's in the `HungryState`, so she starts to eat. This triggers `nextState()` and moves her to `EatingState`. Her thoughts change with the State, but her ability to sleep doesn't.

```javascript
Goldilocks.nextState();
Goldilocks.state.thoughts;
// This is tasty!
Goldilocks.sleep();
// I can't sleep until I've eaten!
```

Once Goldilocks finishes eating, she finally reaches the `FullState`, which changes her thoughts and sleep action.

```javascript
Goldilocks.nextState();
Goldilocks.state.thoughts;
// So full! I want to take a nap.
Goldilocks.sleep();
// Time to find a bed! Zzzzz...
```

Managing these State changes are difficult, but they ensure Goldilocks doesn't take actions when she's not supposed to. This is why State is often crucial for programs to only take actions when they can (or should).

Also note that State doesn't always change in such a predictable, orderly way. It often depends on data being received or user input, which can be much more volatile. These often make keeping the State in sync with accurate data and the view layer a tough but vital task.

But Goldilocks has that under control here. After eating her fill, she moves on to take a nap.

## Measuring the Return Path with a Template

Back in the woods, the bears are at the end of their trail and want to head back. Papa Bear checks his map and sees there are three routes they can take to get home.

1. The Valley path is the simplest way back but has a steep incline.
2. The Riverside path has an easier incline, but crossing the bridge adds more distance.
3. The Street path is the most level, but moving around cars adds increasing amounts of distance.

Plus no matter what route they take, they need to take a detour around an accident that will add 10 yards.

There's a lot of calculations, and while some are the same for each trip, the rest is different for each route. It's a tough mix to properly manage.

Papa Bear realizes a Template pattern is perfect to handle this. **Templates define the skeleton of an algorithm, so subclasses can change steps as needed.** This is different than the strategy pattern, which swaps set algorithms around as needed. This pattern lets you change parts of the algorithm itself.

To start, Papa Bear creates the starting Template. It builds in the extra 10 yards each route needs.

```javascript
class DistanceTemplate {
  getDistanceHome = (distance) => this.routeDistance(distance) + 10;
}
```

He includes a `routeDistance` function but doesn't define it here. That's because each subclass will define it themselves to make needed changes to the algorithm.

First, we have the Valley route. It needs to multiply the biking distance by its steep incline, so it's fairly simple. This part of the algorithm must be in the `routeDistance` function.

```javascript
class ValleyDistance extends DistanceTemplate {
  constructor() {
    super();
    this.incline = 1.7;
  }

  routeDistance = (distance) => distance * 1.7;
}
```

Next is the Riverside route. It calculates for an incline and adds the extra 20 yards for crossing the bridge.

```javascript
class RiversideDistance extends DistanceTemplate {
  constructor() {
    super();
    this.incline = 1.4;
    this.bridge = 20;
  }

  routeDistance = (distance) => (distance * 1.4) + this.bridge;
}
```

Last is the Street route. It's the most complicated, taking into account its slight incline and driving around cars. The Template pattern lets it add extra class methods to use in `routeDistance`.

```javascript
class StreetDistance extends DistanceTemplate {
  constructor() { super(); }

  carsDistance = (distance) => Math.round(distance / 5);

  inclineDistance = (distance) => distance * 1.05;

  routeDistance = (distance) => this.inclineDistance(distance) + this.carsDistance(distance);
}
```

With all the routes written, all Papa Bear needs to do is create class instances and calculate the best route home. Each one returns the full algorithm built off the starting Template.

```javascript
const fromValley = new ValleyDistance();
fromValley.getDistanceHome(100);
// 180

const fromRiverside = new RiversideDistance();
fromRiverside.getDistanceHome(100);
// 170

const fromStreet = new StreetDistance();
fromStreet.getDistanceHome(100);
// 135
```

Looks like the street is the best way! The Template pattern let Papa Bear manage each route's complexity while not repeating code and keeping each object loosely coupled.

## Waking Goldilocks with a Command

As the bears head home, Goldilocks is getting ready to sleep. But she's understandably worried about the home's owners arriving and being upset a stranger ate their food and slept in their beds. What if they scare her away? She needs to leave behind a better way they can wake her up.

Goldilocks has an alarm with her but is worried the home's owners won't know how to use it, or even what it is. She decides to write how to use her alarm into a Command. **The Command pattern saves everything about an action into a separate object, so anything using it doesn't need to understand the action itself.** They only need to get the object, run the `execute` function, and the set action does the rest.

Before going to sleep, Goldilocks checks over the class for her alarm.

```javascript
class Alarm {
  constructor() {
    this.ringing = false;
    this.volume = 0;
  }

  quietAlarm() {
    this.volume = 30;
    this.ringing = true;
  }

  loudAlarm() {
    this.volume = 100;
    this.ringing = true;
  }
}
```

If someone arrives, she'd want them to activate the `quietAlarm` function. So she writes up a Command class that takes in an alarm instance and will execute `quietAlarm` when prompted.

```javascript
class WakeCommand {
  constructor(alarm) {
    this.alarm = alarm;
  }

  execute() {
    this.alarm.quietAlarm();
  }
}
```

All Goldilocks needs to do now is create the alarm clock instance and attach it to an instance of her Command.

```javascript
const alarmClock = new Alarm(),
      wakeGoldilocksCommand = new WakeCommand(alarmClock);
```

Goldilocks leaves this `wakeGoldilocksCommand` object next to her and goes to sleep.

A short while later, the three bears arrive home. They're angry their porridge was eaten, and even madder someone's sleeping in one of their beds! Papa Bear is getting ready to roar but notices the `wakeGoldilocksCommand` next to the girl. Papa Bear doesn't know what it does, but since it's a Command pattern, he doesn't need to. The object with the needed action is already stored inside it and will do the work for him!

He quickly writes up a class that lets him use this Command.

```javascript
class Bear {
  constructor(wakeCommand) {
    this.wakeCommand = wakeCommand;
  }

  wakeUpStranger() {
    this.wakeCommand.execute()
  }
}
```

He then makes an instance of this class as himself, passes in the `wakeUpGoldilocks` Command he found, and runs the `wakeUpStranger` function to use the Command.

```javascript
const PapaBear = new Bear(wakeUpGoldilocks);
PapaBear.wakeUpStranger();
```

Papa Bear finds himself reaching for an unfamiliar clock and putting on a quiet alarm. Goldilocks is gently awakened from her nap, sees the bears, and runs from the house screaming. The bears shrug and they live happily ever after.

## The Design Pattern Quest Continues

This post marks the halfway point of this design patterns and fairy tales series. There's still the remaining behavioral and structural patterns along the way. But soon we shall slay the design pattern dragons and save the programming princess in the coding company castle!

_To Be Continued..._
