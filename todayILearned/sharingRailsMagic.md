---
title: How to share Rails magic with plain classes
category: Ruby
date: 2021-01-19
---

Extra Rails patterns, like services and decorators, are great for bringing in class functionality not included in the framework. But important caveat for these patterns is they, by default, have none of the included Rails magic (all those helpful functions and gems loaded up into Rails). So you’ll likely need to take a few extra steps to get them working.

First, it’s smart to make a base class for each Rails Pattern category. If you have lots of Services, it’s good to have a base Service for any common methods used by them all. A common example is including all the application helpers, like so.

```ruby
class BaseService

  private

  def h
    ApplicationController.helpers
  end
end
```

You can then have those methods inherited like so:

```ruby
class SpecificService < BaseService
end
```

You can then call an instance of the class like this.

```ruby
let variable = SpecificService.new

let variable = SpecificService.new(parameter_1, parameter_2) ## In case it takes parameters
```

Another limitation is if you pass in another object with other methods already defined, like a model pulled from a database, you’ll need to delegate those methods to use them again.

For example, if you pass in a model and want to use any values or methods without redefining them again, you’ll need to delegate them like so:

```ruby
delegate :id,
         :property,
         :another_thing,
         :third_thing to: :@model

  def initialize(model = nil)
    @model = model
  end
```
