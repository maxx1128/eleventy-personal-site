---
title: You can use custom Rails patterns
category: Ruby
date: 2021-01-19
---

Rails has lots of built in folders and functionality magic built in, but it’s not limited to that. Like any framework, you can build on it and add extra code to meet your needs. A common way to do this with Rails is adding extra classes to better break specific functionality into different modules.

These need to be grouped into different folders in the `app/` folder, and the naming structure is important. **The class name and the file name must be the same, only with the class name in camel case and the file name in snake case.** For example, the **FakeModelQuery** class must be in the `fake_model_query.rb` file. They can then be used by any other class in the `app/` folder.

There’s a [few common examples](https://codeclimate.com/blog/7-ways-to-decompose-fat-activerecord-models) of this:

- **Collections** are for extra business logic, such as any math or operations to created needed info for a view.
- **Services/Service Objects** are for complex write operations, such as updating database, mailers, jobs, or others that need to be coordinated together.
- **Queries/Query Objects** are for different database requests that are either more complex or are called multiple times.
- **Policy Objects** are similar to Service Objects, but instead of writing they focus on reading. This includes needing to read and validate several objects at once, such as a user’s active email or last login time.
- **Presenters/Decorators/View Objects** are to get information prepared for the view, such as converting integers into currency.
- **Value Objects** are for returning values based around inputs from others. These are simpler than Collections, with much less logic, such as strings dependent on here a value falls into several ranges.
- **Form Objects** are for when a form updates several ActiveRecord models, and all these updates can be encapsulated into one class.

You can also use the classes from different patterns inside each other. You may have a Service that pulls data from a Query. This Service may also be used in a Presenter. A Controller could then just create a new instance of the Presenter, and everything else would be called as needed.
