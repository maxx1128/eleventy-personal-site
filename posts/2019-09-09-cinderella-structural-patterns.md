---
title: "Cinderella and the Glass Structural Pattern - A Design Patterns Intro"
date: "2019-09-09"
excerpt: "A beginning coder's guide to structural design patterns with an alternate telling of Cinderella."
image: 'cinderella-structural.jpeg'
tags: ['javascript', 'Design Pattern Fairy Tales']
featured_image_link: 'https://safebooru.org/index.php?page=post&s=view&id=2510905'
---

Welcome to the fourth entry in my “Design Pattern Fairy Tales” series! It aims to explain design patterns in a more accessible way - that is, fairy tale metaphors.

The series so far has covered creational patterns (for making objects) and behavioral patterns (making objects work together), and in the final post here is ending with structural patterns. These define specific relationships between classes and objects, which can pull off tougher responsibilities in maintainable and efficient ways.

The fairy tale I went with for these patterns is another classic, Cinderella. This post is a retelling of the story, replacing several elements with design patterns while explaining how they work.

If you've followed the rising action so far, you already know how this goes. So let's cut to the chase so we can live happily ever after with our design pattern knowledge!

## Waving a Magic Wand with a Facade

We begin our retelling of Cinderella with the Fairy Godmother (FG) comforting a distraught Cinderella right before the ball. Her dress has been ruined and has no way to attend. So the FG uses her magic wand to fix it all and send her on her way.

However, she has a hard enough time finding her wand and remembering the magic words. The FG hardly ever remembers all the complex magical calculations and functions to simply levitating an item. She needed a quick way to make use of the different classes that make up even a simple spell. So to make this simplified version, she wrote a Facade.

```javascript
class wandWaveFacade {
  constructor(target) {
    this.target = target;
  }

  BibbidiBobbidiBoo() {
    const neededElement = new getMagicElement("levitate"),
          neededEnergy = new calculateMagicEnergy(
            neededElement,
            this.target.weight
          ).calc();

    return new levitateItem(this.target, neededEnergy).levitate();
  }
}
```

She named the first function in her facade after the easiest part to remember, the magic words themselves. The function calls up instances of all the following classes to do the magical work.

```javascript
class getMagicElement {
  // Super secret magical secrets here, not for you!
}

class calculateMagicEnergy {
  // You don't have a wand so you can't make use of magic
}

class levitateItem {
  // Content censored as per paragraph 3 of article 17 in the International Treaty of Magical Movement and Teleportation
}
```

Nope, you don't get to see any of the secret magical code. That's because I've been sworn to secrecy, not because I'm lazy. Thankfully, me not writing it fits with a Facade's role. **It takes complex magical laws and simplifies them into a simple wave of the wand with some funny words.** The FG did all the work once, all she has to do to access it use what's written below.

```javascript
const pumpkin = 'pumpkin',
      waveWand = new wandWaveFacade(pumpkin);

waveWand.BibbidiBobbidiBoo();
// The pumpkin is levitated!
```

Assuming she can find her wand and remember the words, the FG now has all she needs to keep doing all kinds of magic in a simple, straightforward way.

## Creating Magical Sparks with a Flyweight

_Note: I eternally struggle with the Flyweight pattern, so in the likely event I mess it up, [read this article](https://refactoring.guru/design-patterns/flyweight)._

Part of the wand-waving process the FG can't handle with a Facade is the wand's sparkles. She knows she won't be taken seriously as a magical overseer of people's fates through unexplainable phenomena without a wand that goes "sparkle sparkle" when it's magic time.

However, just one wave of the wand creates lots of sparkles. Almost tons of sparkles. Each only takes a small chunk of magic, but after making so many, it slows down her magic and makes her run out after just a few spells. So she needs the right number of sparkles without each one taking up the usual energy.

To solve this, she starts with a simple class for making a sparkle.

```javascript
class Sparkle {
  constructor(type) {
    this.type = type;
  }
}
```

The FG then makes a factory for making all the different sparkles. She realizes the best pattern to fit her needs is the Flyweight pattern.

```javascript
class SparkleFlyweightFactory {
  constructor() {
    this.sparkles = {};
  }

  create(name) {
    let sparkle = this.sparkles[name];
    if (sparkle) return sparkle;
    this.sparkles[name] = new Sparkle(name);
    return this.sparkles[name];
  }
}
```

Let's break down how this Flyweight factory works and how it fixes the issue.

1. When making an instance, the factory starts with an empty `sparkles` object to store all the sparkles.
2. The `create` method is used when wanting to make more sparkles. The first thing it does is see if we already made a sparkle under the same name. If so, it returns that without making a new one.
3. If it hasn't made this type of sparkle before, it makes a new one, adds it to the object, and returns it.

Now the FG can make all the sparkles she wants, and any duplicates will return what's already there. That on its own saves a lot of energy, but the Flyweight pattern does even more.

To see what else it does, let's look at the Wand class the FG uses to make the sparks themselves.

```javascript
class Wand {
  constructor(sparkleFactory) {
    this.sparkleFactory = sparkleFactory;
  }

  addSparkle(sparkle) {
    return this.sparkleFactory.create(sparkle);
  }

  getAllSparkles() {
    return this.sparkleFactory.sparkles;
  }

  bigSparkle(sparkleName) {
    const sparkle = this.sparkleFactory.create(sparkleName);
    return `This is a giant ${sparkle.type} sparkle!`;
  }
}
```

Most of these are easy to figure out, as the first two functions are about adding sparkles and getting the full list through the Flyweight factory. But why did the FG put the `bigSparkle` method in the wand? It would work just as well in the `Sparkle` or `SparkleFlyweightFactory` classes, right?

Turns out, making a bigger sparkle takes a respectively bigger amount of magic to hold in the function. Repeating that function across every sparkle object uses lots of magic in bulk, and she's back at the same problem! So to solve that, she moved the function to the wand instead. Now that function only needs to be created once and called on the wand with the needed sparkle. Lots of magic is saved and the same problem is avoided.

At its heart, this is the problem the Flyweight solves: **making and managing lots of objects with as little energy spent as possible.** The objects here (the sparkles) are only made up of properties unique to themselves like the type of spark. This is the flyweight object's _intrinsic state._ Anything the same for each spark, like the function to call a big one, is shared in a single object that's only called once to manage them. Everything outside of the intrinsic state (the wand) is the _extrinsic_ state.

We can see the benefits in action when the FG makes an instance of her wand and starts making sparks for her spell.

```javascript
const WandSparks     = new SparkleFlyweightFactory(),
      GodmothersWand = new Wand(WandSparks);

GodmothersWand.addSparkle("bright red");
GodmothersWand.addSparkle("silver");
GodmothersWand.addSparkle("dull blue");
GodmothersWand.addSparkle("diamond shine");

GodmothersWand.addSparkle("bright red");
GodmothersWand.addSparkle("silver");
GodmothersWand.addSparkle("dull blue");
GodmothersWand.addSparkle("diamond shine");
```

Normally you'd expect eight different spark objects in the wand, but the Flyweight only returns the four unique ones she made.

```javascript
GodmothersWand.getAllSparkles();

// { 'bright red'    : Sparkle { type: 'bright red' },
//   'silver'        : Sparkle { type: 'silver' },
//   'dull blue'     : Sparkle { type: 'dull blue' },
//   'diamond shine' : Sparkle { type: 'diamond shine' } }
```

Plus she can use a bigger function like making a big sparkle without it taking up too much energy either.

```javascript
GodmothersWand.bigSparkle("diamond shine")
// This is a giant diamond shine sparkle!
```

With the sparkles in action showing how serious her magic is, the FG is ready to turn a pumpkin into a carriage.

## Making a Pumpkin a Carriage with a Decorator

The FG sees a pumpkin over the hill and realizes it's perfect for a carriage. Normally she'd write a class to make a Pumpkin carriage from scratch, but in another effort to save magical energy, she wants to work from an existing pumpkin object.

```javascript
class Pumpkin {
  constructor() {
    this.size = 3;
    this.color = "#FFA500"; // Orange
    this.vines = 4;
  }
}

const pumpkin = new Pumpkin();
```

This means she must dynamically change the current pumpkin. Some properties she'll adjust, some she'll add, some she'll change completely. To do this, she writes a Decorator she'll pass the pumpkin into.

```javascript
class PumpkinCarriageDecorator extends Pumpkin {
  constructor(pumpkin) {
    super(pumpkin);
    this.size = this.size * 4;
    this.color = "#fffcf0"; // Marble white
    this.wheels = this.vines;
    this.vines = 0;
  }

  isRidable() {
    return this.size > 10;
  }
}
```

Decorators are perfect for his since they're built for **adding and changing an object's functions and capabilities by dynamically extending it, instead of making a new object from scratch.**

Now she creates a Decorator, passes in the pumpkin, and magically transforms it into a pumpkin carriage!

```javascript
const pumpkinCarriage = new PumpkinCarriageDecorator(pumpkin);

pumpkinCarriage;
// { size: 12, color: '#fffcf0', vines: 0, wheels: 4 }
pumpkinCarriage.isRidable();
// true
```

## Letting Guests into the Ball with a Proxy

Cinderella arrives at the ball in her new dress, shiny carriage, her entourage of animals turned into humans, and a magically conjured invitation. As she pulls up to the castle, she sees castle officials using a class to make instances of their new guests. This happens to her and two others arriving at the same time.

```javascript
class Guest {
  constructor(name, invitation, gender) {
    this.name = name;
    this.hasInvitation = invitation;
    this.gender = gender;
  }
}

const partyCrasher = new Guest("Rachel", false, "female"),
      maleGuest = new Guest("Jeff", true, "male"),
      cinderella = new Guest("Cinderella", true, "female");
```

So as Cinderella arrives, she sees this class take the info about her name, invitation, and gender. However, just past the castle entrance, she sees those who enter becoming instances of a party guest, not just a general castle guest. Cinderella knows she needs to be a party guest since they have access to lots of extra party methods.

```javascript
class PartyGuest {
  constructor(name) {
    this.name = name;
  }

  declare() {
    return `I, ${this.name}, am at the party!`;
  }

  meetRoyals() {}
  lookForPrince() {}
  eatHorsDoeuvres() {}
}
```

As she and the other two guests approach the entrance, she sees another royal make another class instance of them. Cinderella's heart jumps thinking she was made a guest, but is upset and confused to see it was another class called a Proxy.

```javascript
class PartyProxy {
  constructor(guest) {
    this.guest = guest;
  }

  canAttend() {
    const isFemale = this.guest.gender === "female";
    return isFemale && this.guest.hasInvitation
      ? new PartyGuest(this.guest.name)
      : "Sorry, you cannot attend";
  }
}

const partyCrasherGuest = new PartyProxy(partyCrasher),
      malePartyGuest = new PartyProxy(maleGuest),
      cinderellaGuest = new PartyProxy(cinderella);
```

Cinderella asks the royal what they're doing, going around and making class instances of someone all willy-nilly. The royal explains getting entrance to the party is quite exclusive, so they must make sure only guests that meet all the requirements are actual `PartyGuest` instances. That's why they're made into **a Proxy object, which acts as a placeholder and makes sure to limit the creation of certain objects based on their requirements. It basically acts as a gatekeeper to preserve resources.**

So when Cinderella and the other two guests approach as proxies, the guards call the `canAttend` method to check the guest's gender and invitation. If they fail the conditions, the royal at the door turns the guest away without wasting a `PartyGuest` instance.

```javascript
partyCrasherGuest.canAttend();
// Sorry, you cannot attend
malePartyGuest.canAttend();
// Sorry, you cannot attend
```

But if they do pass, it creates and returns a `PartyGuest` for them, so they can do all the things party guests do.

```javascript
cinderellaGuest.canAttend();
// PartyGuest { name: 'Cinderella' }
```

Cinderella has passed and enters the ball at last!

## Letting Cinderella Dance with a Bridge

As Cinderella enters the ball, the Prince is talking to the attendees and deciding who to dance with. He uses a class to make himself the lead dancer and find out which women want to dance.

However, there are so many women he wants to ask and he can't make a class for asking each one of them. The Prince wants to ask all the girls without writing a new class each time, so he makes use of a design pattern called the Bridge.

First, he writes a class for himself that takes a dance partner and sees if he can dance with them.

```javascript
class LeadDancerBridge {
  constructor(dancePartner) {
    this.dancePartner = dancePartner;
  }

  canYouDance() {
    return this.dancePartner.canDanceWithPrince()
      ? "Shall we dance?"
      : "Please enjoy the party!";
  }
}
```

**Each dance partner will vary in some way, so this class acts as a bridge since it lets any instance of a dance partner "cross the bridge" to this class to see if they're compatible.**

He then writes a class for the dance partners themselves, and its instances will be crossing the bridge. It takes some basic info about the woman and once they "cross the bridge" to the `LeadDancerBridge` class instance, the prince will know if he can dance with them or not.

```javascript
class DancePartner {
  constructor(name, likesPrince, wantsToDance) {
    this.name = name;
    this.likesPrince = likesPrince;
    this.wantsToDance = wantsToDance;
  }

  canDanceWithPrince() {
    return this.likesPrince && this.wantsToDance;
  }
}
```

After a few failed attempts to dance and some half-hearted dances, the Prince finally sees Cinderella. He creates an instance of her as a dance partner and it attempts to "cross the Bridge" to the `LeadDancerBridge` class instance.

```javascript
const Cinderella = new DancePartner("Cinderella", true, true),
      PrinceAskingCinderella = new LeadDancerBridge(Cinderella);

PrinceAskingCinderella.canYouDance();
// "Shall we dance?"
```

Cinderella has managed to "cross the bridge" which shows she wants to dance. He's relieved to finally have a dance partner, so he asks and they have a magical evening together!

## Escaping the Ball with a Composite

Sadly, we know how the story goes. Just as Cinderella and the Prince are about to kiss, the clock strikes midnight. Cinderella flees, leaves her glass slipper behind, and jumps in her carriage.

The horses pull the carriages as fast as they can to get away. But the guards give chase on their own, with the same number pulling a carriage with guards. As they're chased, Cinderella is worried the guard horses will chase them. So she reads over the code making up the horses to check if they're going fast enough.

First, she notices that each horse is a basic class which includes their speed.

```javascript
class Horse {
  constructor(speed) {
    this.speed = speed;
  }
}
```

Below that she sees something called a Composite class, which she doesn't understand at first. It seems to take an array of horse objects and treats the group of Horse instances as a single, giant object.

```javascript
class HorseComposite {
  constructor() {
    this.horses = [];
  }

  add(horse) {
    this.horses.push(horse);
  }

  averageSpeed() {
    const speeds = this.horses.map(horse => horse.speed),
      total = speeds.reduce((previous, current) => (current += previous)),
      average = total / this.horses.length;

    return average;
  }
}
```

The coachman sees her reading this code and realizes what she's trying to do since there's no better time to pair program than a big horse chase. He says **a Composite class is a pattern for objects arranged in a tree-like pattern, where any object could have any number of other child objects and so on.** This is a relatively simple tree, where each `HorseComposite` could have any number of horse child objects and that's it, but it's a Composite pattern nonetheless.

Cinderella realizes these classes can be used to make sure her horses are faster than the guards. She quickly makes several instances for her own horses, adds them as "branches" to the Composite "tree," and finds their average speed.

```javascript
const Bert = new Horse(24),
      Luke = new Horse(25),
      Jaq = new Horse(20),
      Gus = new Horse(29);

const goodHorses = new HorseComposite();

goodHorses.add(Bert);
goodHorses.add(Luke);
goodHorses.add(Jaq);
goodHorses.add(Gus);

goodHorses.averageSpeed();
// 25.5
```

She punches in the same info for the guard's horses, sees their average speed, and does a comparison to make sure they're faster.

```javascript
const Blaze = new Horse(20),
      Lazer = new Horse(26),
      Blazer = new Horse(21),
      Joe = new Horse(30);

const guardHorses = new HorseComposite();

guardHorses.add(Blaze);
guardHorses.add(Lazer);
guardHorses.add(Blazer);
guardHorses.add(David);

guardHorses.averageSpeed();
// 25.25

goodHorses.averageSpeed() > guardHorses.averageSpeed();
// true
// Cinderella escapes!
```

It's close, but Cinderella's horses are just fast enough. They outrun the guards and hide in the woods right before the spell breaks.

## Wearing the Glass Slipper with an Adaptor

Cinderella is back at her home and hears the Prince is traveling the kingdom, looking for the glass slipper's owner. However, her stepmother locked her in the attic so the Prince won't meet her. In the process Cinderella falls and sprains her foot, making it swell. She's horrified, knowing her foot's increased size will stop the glass slipper from fitting.

Knowing she doesn't have much time until the Prince arrives, she inspects her foot and finds the class causing the swelling.

```javascript
class sprainedFoot {
  constructor(size) {
    this.size = size * 1.25;
  }
}

const sprainedFoot = new sprainedFoot(8);
```

Seeing the amount of swelling, she realizes she can reverse the effect with an Adaptor. **Her sprained foot can't fit the "interface" of the glass slipper, so wrapping it in an Adaptor will adjust her foot until they can fit together.** So she writes her adaptor so it will decrease her foot size. She then creates an instance of it that will bring her shoe size back down.

```javascript
class sprainedFootAdapter {
  constructor(foot) {
    this.foot = foot;
    this.size = this.foot.size * 0.8;
  }
}

const wrappedFoot = new sprainedFootAdapter(sprainedFoot);
```

With this adapted version of her sprained foot (let's call it a bandage), Cinderella is freed from the attic by her rodent friends and rushes downstairs. She sees the `GlassSlipper` class that can't fit on her stepsisters' feet.

```javascript
class GlassSlipper {
  constructor(foot) {
    this.foot = foot;
  }

  fitsOnFoot() {
    return this.foot.size === 8;
  }
}
```

Cinderella then uses the "adapted" foot with the glass slipper. The adapter has brought them to the same size, so her foot fits perfectly.

```javascript
const glassSlipper = new GlassSlipper(wrappedFoot);
glassSlipper.fitsOnFoot();
// true! true! Happily ever after!
```

The Prince knows he's found his true love after a single meeting and dance, and they run off to prepare a not-at-all-too-soon wedding!

## The Design Pattern Dragon has been Slain

With that, these Design Pattern Fairy Tales have reached their end. Writing them all has been a challenge, but an enjoyable one, and I'm glad I managed to stick through it the whole way. I especially hope people found them useful in understanding design patterns and how they help solve common programming problems.

The final lesson I'll share here is one I shared at the very start. I had an incredibly tough time learning design patterns. Part of writing this series was to force myself to understand them enough to work them into stories I already knew well. **It's the tried-and-true mental trick of learning something tough by pairing it with something unexpected you already know.** The new perspective encourages learning, and the strange association makes the knowledge harder to forget.

So if this series worked well for you, use the trick for learning more in the future! Learn Ember by comparing it to a chocolate factory or giant fighting robot. Understand React hooks with evil AIs or some kids in a magical wardrobe. Use whatever works best, and maybe even write about it afterward :)

With that, I close the book on this story. _And they all coded happily ever after._
