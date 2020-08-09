---
title: Managing Dependencies
category: Practical Object Oriented Programming in Ruby
date: 2020-07-16
---

Ruby objects will not only need access to their behavior, they'll need access to behavior in other objects. This requires objects to know something about another, and this act of knowing creates a dependency between them that must be carefully managed. **When the object it knows about changes, it might force a change in all objects depending on it too.**

Some common dependencies between objects include:

* A class's name
* A message of method's name
* Any required arguments
* The order of multiple arguments

A certain amount of dependency is unavoidable for objects to work together. The trick is finding unneeded dependencies that make the code less reasonable and maintainable. A developer's goal is to minimize dependencies as much as possible, so it knows enough to do its job and nothing else. Objects with minimal dependencies are called "loosely coupled," and lots of dependencies make them "tightly coupled." Tightly coupled objects must be changed, reused, and tested together, which is not good.

Some less common but still bad dependencies include:

* Message chaining, or when an object relies on a long chain of objects and methods outside of itself. It's more likely that a change to _any_ of these objects or methods will force a change in the objects using them.
* Tests coupled too tightly to the code, forcing tests to be rewritten for any change. Tests should need little to no change if the code's fundamental purpose stays the same.

Dependency between objects is needed but should be minimal. There are tried and true methods to do this.

## Inject Dependencies

Avoid referring to class names directly inside other classes, as it chains it to that class without letting it work with others it may need to. **Code dependencies should look for the method name, not the class name.**

Instead of referencing a specific class inside an object, an instance of any class should be injected into the class instead via the `initialize` method. This is **dependency injection.** The class won't care what specific object is passed in, as long as it knows the expected method, and shifts the dependency to the method. This lets objects work with a far greater number of other objects, as long as they have the expected methods.

## Isolate Dependencies

If unneeded dependencies can't be removed due to reasons outside your control, they should at least be isolated within a class. This makes it easy to find, change, and reduce when possible.

One way to do this is to put them in a "code quarantine." Don't hide the dependency amid other lines of code where it could unexpectedly break things. The code referring to it should be put in a method all on its own, separate from all the others. It could still know too much, but explicitly reveals the dependency for easier management and more loosely couples them. Try to isolate any time you use a dependency's methods to its method too. These extra abstractions make it easy to change objects, and their messages, that are likely to change.

### Remove Argument-Order Dependencies

If a dependency takes arguments, knowing about those arguments is unavoidable. But you may overlook how some arguments need to be in a specific order, which makes the code far more brittle and likely to be misunderstood later on.

A simple way around this is if you can control it, make the dependency take a hash of options instead of a fixed list. For example, the `initialize` method may only take one argument called `args`, which is a hash. So when a hash is passed a new instance of that class, `initialize` simply extracts the needed values from it. This removes all dependency on argument order, adds verbosity, is more stable since it's less likely to change, and explicitly documents its arguments. But classes with fewer, simpler arguments may benefit more by keeping the initial fixed list followed by an options hash.

With the above approach, you can add explicit defaults to these hash parameters too. Defaults can be used as a fallback if you use `args.fetch` to get the values from the hash. Or you can isolate a hash with the defaults in a `defaults` method, and they merge the defaults into the arguments hash with `args = defaults.merge(args)` (great for more complex default setups).

Sometimes you can't control a class and have to deal with a fixed-order array of parameters. It's an external interface since you have no control over it. You can isolate this external interface by wrapping it in something else. For example, the external class can be wrapped in a small module that takes a hash of parameters and translates that hash to an array for you. The below example is from the book.

```ruby
module GearWrapper
  def self.gear(args)
    SomeFramework::Gear.new(args[:chainring],
                            args[:cog],
                            args[:wheel])
  end
end

GearWrapper.gear(
  chainring: 52,
  cog:       11,
  wheel:     wheel_here
)
```

Using a module instead of a class lets you make more gears while showing you're not making objects with `GearWrapper`, but instead instances of other classes. Just remember to include the module in other classes where it's needed.

`GearWrapper` is an example of a "factory," since it's designed solely to make instances of other objects. Wrapping the external gear class in a wrapper lets you isolate changes to it in one place while letting you use arguments hashes.

## Managing Dependency Direction

Dependency direction refers to what code relies on what other code. Code direction will change in a dynamic application, which is why choosing a manageable direction is so important.

### Rules for Dependency Directions

One simple rule to abide by is **to depend on things that change less often than they do.**

Classes that are less likely to change are Ruby base classes and mature framework classes. Otherwise, you'll need to use your judgment seeing how likely a class changing is, especially relative to other classes. Classes that don't change often obviously make for better dependencies.

Abstractions that refer to other code are less likely to change than the concrete classes likely at their base, especially in a dynamically-typed language like Ruby. Abstractions represent more stable code elements since their interfaces change much less than the code those interfaces refer too.

Classes also should avoid relying on classes already full of dependencies. If the class full of dependency changes (which it's now more likely to), it creates a ripple effect that makes any changes tougher and the code far more brittle. It's easier for abstract classes to gather too many dependencies due to their more stable, abstract nature, so one should pay extra attention to them here. But concrete classes are the most likely to change, so giving them too many dependencies is a huge red flag.

Follow the first rule of depending on classes that change less often the class in question. It's a powerful principle that gives your application healthy dependency directions everywhere.
