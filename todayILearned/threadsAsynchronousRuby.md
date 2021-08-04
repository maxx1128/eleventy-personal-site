---
title: Threads let you write asynchronous Ruby
category: Ruby
date: 2021-08-04
---

I'm familiar enough with (asynchronous JavaScript with async and await.)[https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await] But some Ruby Active Job documentation mentioned threads, and after a quick Google, I found they're used for asynchronous Ruby. I'd been so lost in the usual Ruby on Rails world, I'd never seen how this works before.

[A Tutorials Point article I found on threading](https://www.tutorialspoint.com/ruby/ruby_multithreading.htm) gives a good demonstration of the basics of how they works. Let's say we have two functions that each output a little text after different times.

```ruby
def func1
   i = 0
   while i <= 2
      puts "func1 at: #{Time.now}"
      sleep(2)
      i = i + 1
   end
end

def func2
   j = 0
   while j <= 2
      puts "func2 at: #{Time.now}"
      sleep(1)
      j = j + 1
   end
end
```

If we ran these normally, one would run and finish before the other started, like so.

```ruby
puts "Started At #{Time.now}"
func1()
func2()
puts "End at #{Time.now}"

# Started At 2021-08-04 11:00:44 -0400
# func1 at: 2021-08-04 11:00:44 -0400
# func1 at: 2021-08-04 11:00:46 -0400
# func1 at: 2021-08-04 11:00:48 -0400
# func2 at: 2021-08-04 11:00:50 -0400
# func2 at: 2021-08-04 11:00:51 -0400
# func2 at: 2021-08-04 11:00:52 -0400
# End at 2021-08-04 11:00:53 -0400
```

This changes when I save a new `Thread` instance for each and call them with `join`. Their outputs get mixed together since they run at the same time! That's the perk of asynchronous code.

```ruby
puts "Started At #{Time.now}"
t1 = Thread.new{ func1() }
t2 = Thread.new{ func2() }
t1.join
t2.join
puts "End at #{Time.now}"

# Output
# Started At 2021-08-04 11:00:20 -0400
# func1 at: 2021-08-04 11:00:20 -0400
# func2 at: 2021-08-04 11:00:20 -0400
# func2 at: 2021-08-04 11:00:21 -0400
# func1 at: 2021-08-04 11:00:22 -0400
# func2 at: 2021-08-04 11:00:22 -0400
# func1 at: 2021-08-04 11:00:24 -0400
# End at 2021-08-04 11:00:26 -0400
```

[Ruby threads, and asynchronous tools in general, are best used for I/O (input/output) bound applications.](https://www.rubyguides.com/2015/07/ruby-threads/) This means the programs relies on an external resource, like an API or other web request. One or more threads can handle these requests so they don't hold up the entire application.

There's a lot more nuance and details when it comes to how threads get used and what else they're capable of. But those are posts for another day.
