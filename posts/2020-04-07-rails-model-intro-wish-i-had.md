---
title: "The Rails Model Introduction I Wish I Had"
date: "2020-04-07"
excerpt: "Ruby on Rails is a great web app framework, but it's tough to learn for a front-end developer. These are the foundations to one part of rails I wish I learned more about sooner: the Models."
image: 'rails-model-intro.jpg'
featured_image_link: 'https://safebooru.org/index.php?page=post&s=view&id=2904099'
tags: ['ruby', 'Intros I Wish I Had']
---

As the pandemic rages on, I need to distract myself. What better way than by diving into some Ruby on Rails? I focused entirely on front-end early in my career, but have come to enjoy Ruby and Ruby on Rails for the back-end. Ruby's clear syntax coupled with Rails' convention over configuration makes it a joy to code with. I still have much to learn, but all this makes the learning fun!

Imagine, fun learning and I don't even need a magic school bus.

Rails itself has many parts to understand, so I wanted to focus on one piece at a time. So this is about the part of a Rails app that's been the toughest for me to understand, but also one of the most important - **the Rails model**!

This is a high-level overview of what models Models are, how they work, and their basic functions. I couldn't cover everything, so I chose the most important details based on my own experiences using Rails for the last three years. I hope it helps others build a solid foundation of understanding that lets them more easily learn the nitty-gritty details of more complex models.

With that, let's begin!

## What is a Rails Model?

A Model is part of the classic Model-View-Controller design pattern and represents the data being stored on the database. Databases will hold all kinds of different records with their own info and rules to follow. In Rails, each record type has a model to keep all that info and logic tidy and organized.

Let's say you were making a library app that lets people check out books. One record type you'd want to keep track of is, obviously, the books. So your book model would help you manage important things like:

- **What info are we storing in the database about each book?** It'd likely be the title, author, publication date, ISBN, page length, and others. Some of this data may need to be validated, like making sure it's present or is a certain type of data.
- **What other record types are connected to the book?** We may have separate database records (and therefore models) to tracking different book genres or authors. Or we'll have different sections of the library that contain many books. The model will tell us one book record will contain one or more genres and belongs to one or more sections.
- **Does this model have any special methods?** Maybe there's a method that calculates if the book is checked out of not. Or if its genres are appropriate for younger readers. Info like this relies on database info, but can't be stored in one since they some extra business logic.
- **Are there any extra tasks linked to this model?** When a book is available, the model may want to send a notification to whoever wants to read it next. The model won't have the notification code itself but will say when it's triggered and how.

This post will go into more specific ways models do all these things, but not too much detail. I hope to build a basic understanding of models for readers so further research goes smoother.

## ActiveRecord, Models, and Migrations

Before I go on, there are a few terms I should clarify.

**Models** are more of an abstract term. In a general context, models refer to the parts of a program that structure and store data in a database. Models outline the design and functionality of the data but aren't data themselves. Each bit of data is a **record,** and each record follows the rules set up by the model.

Imagine a model as the blueprint for making a basic building. Each actual building you build based on that blueprint is a record. Each building you make will be different in some way, like the people and businesses inside of it. But each one follows the same rules from the blueprint, such as how the foundation is set up and the approaches for adding and removing floors.

Ruby on Rails is an application framework with setup for everything already in mind, including their models. So the specific rules around Rails models won't always apply to models you see in other frameworks or software. Most of the content in this article is specific to Rails models, although the principles behind them may carry over to other model setups.

[The main way Rails carries out models is using **a gem called ActiveRecord**](https://guides.rubyonrails.org/active_record_basics.html). All model files build off the code already built into this gem. It has many built-in rules based on Rails conventions that developers must follow, for things like names and database fields. But following these conventions makes it easier to do what's often needed, like associations and validations. So it's important to know Rails' emphasis on convention over configuration.

Lastly, models need help from another part of the program to add data to databases. **Migrations** are what set up the database to properly store the expected data. Whenever you add or change a model, you need migrations to prepare the database for that new or changed data. It's like carving a circle-shaped hole in a plank before you can start putting a circle-shaped block inside it. [Explaining migrations is a whole other blog post, but the Rails guides explain them well](https://guides.rubyonrails.org/active_record_migrations.html). But know migrations and models go hand-in-hand when you start writing them yourself.

It's also important to know what exactly goes into a well-written model.

### The Logic a Model Holds

If you search for articles on good Rails application architecture, you'll likely find the "fat model, skinny controller" rule. It argues virtually all logic not related to network or router responses, but still related to that model's data, should be in the model.

Let's say our library app had a page to show a single book. Part of that page could show other books by the same author. To make this section, we need to query the database for books by the same author. This logic could technically go in either the controller or the model.

When I first started with Rails, I put lots of logic like this in the controller. But this isn't what a controller is supposed to do. Controllers find and update data based on user inputs. Finding books with the same author has nothing to do with user input, since it's based on data records. So it should be moved to the model instead. Later in this article, I'll give an example of a model method like this.

Just remember that any model logic should directly relate to the data. Some functionality is only indirectly related to it, like sending notifications when a book is ready. Models will call functions like this when the data requires it, but the code for the notification itself is elsewhere.

That's all the context taken care of. Let's start writing an actual model!

### Let's Start a Simple Model

If we were writing a model for books in our supposed library app, it'd start like this.

```ruby
# app/models/book.rb

class Book < ApplicationRecord
end
```

This is the simplest possible starting point. We can see some of the terms from before already at work.

- The file is in the `models` directory. Knowing what models are based on the Model-View-Controller pattern, we know right away these files are about managing data records.
- The file is named `book.rb`, but the class name is `Book` which is capitalized. This follows a basic Ruby and Ruby on Rails naming convention - the class name is the file name but capitalized and camel case.
- The `Book` class inherits from `ApplicationRecord` subclass, which is from the `ActiveRecord` gem. So we know all the rules and functionality being pulled in to define our models.

## The Model's Database Schema

For me, one of the most important yet easy to overlook parts of a model is the database schema. These are the actual values being stored in the database, making them vital to using your model correctly.

However, as of this writing, creating a model in rails doesn't automatically document the database schema. Our `Book` model so far works and can use its database values, but they're not documented anywhere. That means anyone else reading our code, or ourselves when we inevitably forget, will have a real hard time figuring it out.

So before adding anything else to our model, I recommend adding some comments at the top with the database schema. Or even better, use a gem like [annotate_models](https://github.com/ctran/annotate_models) to generate one automatically from your database migration. The result would give you something like this.

```ruby
# app/models/book.rb

# == Schema Info
#
# Table name: books
#
#  id                  :integer        not null, primary key
#  created_at          :datetime       not null
#  updated_at          :datetime       not null
#  title               :string         not null
#  isbn                :integer        not null
#  available           :boolean        default(TRUE), not null
#  print_version       :boolean        default(TRUE), not null
#  ebook_version       :boolean        default(FALSE), not null
#  shelf_position      :string
#

class Book < ApplicationRecord
end
```

Now we can see the data given to each model by the database, as well as any validations or defaults built into the schema. For example, we could call something like `book.ebook_version` and know it will have a value that defaults to `false` for new entries.

Having these values is great, but the data being stored is on the simpler side since it's limited to strings and booleans and the like. Now we can start defining the more complex logic.

## Associations

Associations are a big part of what lets all the different models work together. In this library app, they're how users can check out different books and have late fees. Or how different libraries can have different books. Associations are how we can make data easy to navigate for ourselves and users.

Let's look at an example association in our Book model. Let's say we wanted to add a model for authors, and we needed to create a relationship between authors and their books. We know each book only has one author, but each author has potentially many books. So each model needs to define their relationship to the other.

Rails make this easy to do on both sides, and in one line each.

```ruby
class Book < ApplicationRecord
  belongs_to :author
end

class Author < ApplicationRecord
  has_many :books
end
```

It's that easy. Now for each record, we can run `book.author` to see the book's author, and `author.books` for an array of all their books. The records are connected but updated separately. So if you change an author, you'll still see that change in the data when viewing it through its book record.

Let's look at another relationship. Our library could have different custom library categories for books such as "featured," "archived," "mature," and others. Each book could potentially have many custom categories at once, and each custom category will have many books. So we'd have `has_many` being used on both sides. Calling each association on either type of record would give us an array of the other records.

```ruby
class Book < ApplicationRecord
  belongs_to :author
  has_many   :custom_categories
end

class CustomCategory < ApplicationRecord
  has_many :books
end
```

Associations can get more complex along with the data. You can define associations through other models. Some may need more database schemas to link them together. There are also polymorphic associations, which I still don't quite understand myself. [But the Rails guides explain the details of associations better too](https://guides.rubyonrails.org/association_basics.html).

## Model Methods

If you have a basic understanding of Ruby, you'll have noticed each model is still a class. Classes are built on their methods, yet so far our book model has none. So let's add some!

Model methods work off data in the database. If there's any common logic that only need to pull and organize some related data, it should go in the model. Most models will have plenty of these, especially if it's being moved to the model from controllers or views.

### Methods to Get More Data

We may need to know if each book is classified as "new" if it was bought in the last month. This can be added as a method called `is_new?` with some built-in Rails magic.

```ruby
def is_new?
  created_by > Date.now - 1.month
end
```

Now any book record can call `book.is_new?`. It will check if that book record's `created_by` date falls within the last month. I ended the method name with a question mark to show it returns a simple boolean without changing anything.

The example of finding books with the same author is perfect for another method. We can query all the books in the database that have the same author while excluding our own.

```ruby
def by_same_author
  Books
    .where(author: author)
    .where.not(id: id)
end
```

### Methods to Trigger Other Services

Suppose we had an entirely separate service that alerts users when their book is available. The notification code should be somewhere else, but we can reference it in a method here.

```ruby
def tell_user_is_available(user)
  UserNotification(user, "#{book.title} is available to check out!")
end
```

This method references code in another folder, like `app/notifications/user_notification.rb`. I don't know or care how it would alert the user, and neither does the model. It simple passes in the needed info and that class does the work. But our book records can now alert users on their own without coupling the code too tightly.

### Methods not linked to Specific Records

You may have seen all these examples are for specific book records. You need to know exactly what book you're talking about before seeing what else the author has written. But what if we wanted info related to all the books, not just specific ones? That's where class methods come in handy.

Say we wanted a method to give us all the available books. The query itself is pretty simple, but we'd need to write it slightly differently.

```ruby
def self.available
  Book.where(available: true)
end
```

Adding `self` identifies this as a **class method,** meaning it can be called on the `Book` class and not just specific book records. So we can call `Book.available` without needing to get a specific record first.

## Scopes

That last method for finding available books works, but can be fine-tuned. Rails already has a tool for limiting queries in a cleaner way less prone to bugs. That tool is, fittingly enough, `scope`. Any time you run a `where` query in a class method, it's a good idea to use `scope` instead.

Adding this scope to our `Book` class is as simple as this:

```ruby
scope :available -> { where(available: true) }
```

The result is the same and lets us call `Book.available` to find available books. But we can get fancier with it too. What if each book had an array of related genres, and we wanted available books with at least one genre in common?

```ruby
has_many :genres

scope :available_related_books -> (genres) {
  where(available: true)
    .select { |book|
      common_genres = book.genres & genres
      common_genres.length > 0
    }
}
```

After taking a group of genre objects as an argument, it only picks available books that have at least one genre in common. We'd pass the needed argument when calling it, like with `Book.available_related_books([array, of, genres])`.

But you'll notice we're duplicating code from the `available` scope. They both even have the word "available" in their names, which is a red flag. A rule of thumb with any code is each method or function doing one thing and doing it well. So let's split these scopes apart.

```ruby
scope :available -> { where(available: true) }
scope :same_genre -> (genres) {
  joins(:genres).where(genres: {id: genres.ids})
}
```

Now we can use these separately or together if we want to. To get all available books of the same genre, we would use `Book.same_genre([array, of, genres]).available`.

For some extra fun, let's get fancier. Say each book's web page has an "also consider checking out" section. It has a list of five random, available books similar to the featured one. We can use these scopes in a method to give us exactly what we need.

```ruby
scope :related_items -> (id, num) {
  where.not(id)
    .available
    .order("random()")
    .limit(num)
}
end
```

This method makes use of our custom methods, our scopes, and some basic Ruby to keep all this logic readable, separated, and in a convenient place. Now we can call `Book.related_items(id, 5)` for a random list of five related books.

## Validations

A final but no less important part of models are validations. They came up when defining database schemas, such as making sure important fields aren't empty. But this only works for simpler validations and often won't be enough. If our library app allowed books with duplicated ISBNs or no genres, things would fall apart fast. That's why good validation keeping out bad data is essential anywhere.

So ActiveRecord makes it easy to add simple or complex validations. Validations can get quite complex depending on the data, and you could use a method like `validates_with` to separate your validations logic into another class. I'm going to stick with simpler ones here.

Let's go back to our two examples, as ActiveRecord has some built-in validation helpers for these cases. For our ISBNs, we can use the `uniqueness` helper.

```ruby
validates :isbn, uniqueness: true
```

For ensuring our books have good genres, we can check that each one has `genres` passed in when they're created. We can also run an extra validation check on each associated `genre` object to be safe.

```ruby
has_many :genres, presence: true
validates_associated :genres
```

Let's say we try to make a book record that uses a duplicated ISBN. If we use `book = Book.create` with that invalid data, three things will happen:

1. The data won't be persisted into the database, sparing our app future headaches.
2. We could call `book.valid?` and it would return false, letting us confirm it's not a valid book.
3. We could see the specific error messages with `book.errors.messages`. In this case, we'd get something like `{isbn:["must be unique"]}`. These objects can tell us, and the user, what went wrong so we can fix it. You'll often see messages from this method appear over a form in red after it fails to submit.

There are many more helpers and nuances with validations, but that's too much for this post. And to be honest, I still don't know all the details myself. Again, [the Ruby on Rails guides are best for taking a deeper validations dive](https://guides.rubyonrails.org/active_record_validations.html).

## Wrapping Up

Experienced developers will likely see other parts of models I excluded and maybe shouldn't have, like [callbacks](https://guides.rubyonrails.org/active_record_callbacks.html) or accessors. Those are fair points, but I chose these topics based on my own experiences of what's more essential to understanding models That and this article was already long enough.

[I highly recommend the Rails guides for even more details on what models can do in each of these areas](https://guides.rubyonrails.org/). Because believe me, my examples only scratched the surface. If this article helped you understand the essence of a model's role and functionality, then I encourage you to go forth and multiply your knowledge of them!

Go forth and write Rails for the world, my subjects!
