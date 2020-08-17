---
title: Fundamentals
category: Ruby
resources:
  - name: Eloquent Ruby
    url: https://www.amazon.com/Eloquent-Ruby-Addison-Wesley-Professional/dp/0321584104
date: 2020-06-08
---

## Style

Writing code that looks like Ruby

* Ruby code is clear and self-explanatory. Aim for concise, obvious code that doesn't need lots of comments to understand.
    * For included comments, try for only ones explaining especially complex code or broad explanations of how to use the code.
* Only spaces, no tabs. Indents are two spaces.
* Use **CamelCase** for class names, and **snake_case** for everything else.
* For methods without any arguments or simple conditionals, don't use parenthesis.
* Unless something is simple enough to be just one line, don't cram multiple lines of code into a single one.
    - Only make block statements one line if it contains one line.
* The only exception to any of these rules would be to make Ruby code more **readable.**

* Methods that answer a yes/no or true/false question often end with a `?`, such as `valid?` to ask if a method or value is valid.

## Symbols

Symbols are similar to strings, but are different since instead of containing text data, they simply stand in for another value. They're a fast way to tell is one value is different from another, and make Ruby programs much faster overall.

Remembering this difference is essential for symbols, since getting them mixed up with strings is a very common mistake.

* There can only be one instance of a given symbol
* Symbols are immutable
* Great for hash keys
* You can convert a string to a symbol with the `to_sym` method

```ruby
variable = {
  :name => 'Max'
}

variable[:name]
# 'Max'
```

## Variable Scope

The different Ruby scopes and how to access them, mostly to control what's in the global scope.

### Global

Global variables, available everywhere. Can be defined in classes and still be global, but must have `$` prepended. Best avoided.

```ruby
puts global

class NewClass
  $global = "global"
end

puts $global
```

### Instance

Instance variables (`@`), only available to instances of specific classes

```ruby
class NewClass
  initialize(string) do
    @string = string
  end
end

NewClassInstance = NewClass.new('I is a string')   ## would be initialized as "@string" in the class
puts NewClassInstance.string
## I is a string
```

Another way to do this is by assigning the same value to `self`, although it will need `attr_accessor` too.

```ruby
class NewClass

  attr_accessor :comment

  initialize(string) do
    self.string = string
  end
end

NewClassInstance = NewClass.new('I is a string')   ## would be initialized as "@string" in the class
puts NewClassInstance.string
## I is a string
```

### Class

Class variables (`@@`), can be called from the class (not instances of it). These can be changed or incremented between any instance of a class, such as through the `initialize` method.

```ruby
class NewClass
  @@class_var = "hello!"

  def self.show_class_var
    @@class_var
  end
end

puts NewClass.show_class_var
## hello!
```

## Accessors

Accessors are ways to quickly make a class's instance variables readable or writable. Instead of having to define specific methods for seeing or editing instance variables, these make the code simpler and more readable.

For instance, this method...

```ruby
def variable
  @variable
end
```

...can be replaced with what's below. The effect is the same.

```ruby
attr_reader :variable
```

Here's a quick reference to the different accessors and what they do.

| Shortcut             | Effect                             |
|----------------------|------------------------------------|
| attr_reader :v       | def v; @v; end                     |
| attr_writer :v       | def v=(value); @v=value; end       |
| attr_accessor :v     | attr_reader :v; attr_writer :v     |
| attr_accessor :v, :w | attr_accessor :v; attr_accessor :w |

<br />

Small note: I get the context of using `write` here wrong quite often. Here it is for clarity:

```ruby
class ExampleClass
  attr_writer :name

  def initializer
    @name = 'Jeff'
  end
end

person = ExampleClass.new()

person.name('Carl')    # Wrong!
person.name 'Carl'     # Wrong!
person.name = 'Carl'   # Correct!
```
