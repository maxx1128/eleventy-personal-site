---
title: What causes Rails deserialization errors
category: Ruby
date: 2021-06-23
---

This was a tough lesson, as distributed, asynchronous architecture is not my strength. I know how hard that is to believe since every millennial jumped on that bandwagon last year. So, to break down this problem, I'm going to tell a story about a caterpillar.

## How Background Jobs Work

In a forest somewhere, there's a caterpillar named Katie. Katie knows she'll be a butterfly soon but isn't ready. She needs to find a tree to become a cocoon on, but can't sort through the many choices. So, like any person overwhelmed with choice, she turns to the Internet.

Yes, caterpillars have the Internet. This is how I see the world now.

So Katie signs up for an app that watches the state of all the trees in her forest. If there's a change in a nearby tree's health, leaves, predators, or air conditioning, she gets an email. These matter since many trees are dying or getting cut down at unexpected times.

The caterpillars running the app need to manage a lot of emails. Lots of trees change every day, and lots of caterpillars watch them for changes. That's a _lot_ of emails to process at any time. The forest tech scene has strong servers, but not _that_ strong.

To keep their emails under control, they send them out as **background jobs.** Each time tree updates go out, a single job sends all the related emails. That job waits in line with all the other jobs, like other email alerts, and waits its turn. This line is the **job queue.** Once all the jobs ahead in the queue finish, the emails in our job get sent. Katie gets an email about a tree to the North having a free spot on a branch and heads over. This way, all the emails get sent, and the program doesn't overwhelm itself.

## What about Deserialization Errors?

That's the basics taken care of. But the title of this post is about an error. Where do things go wrong?

**Things go wrong in the gap of time between when a job enters the queue, and when it actually gets run.** In that gap, stuff about that tree may change again. If so, the email could send out outdated data and misinform users.

That's why [background job tools like ActiveJob](https://edgeguides.rubyonrails.org/active_job_basics.html) use something called "Global ID." It does a few things, but the important thing here is it refreshes any data given to a job when it runs. When Katie's tree update email is about to send, the job gets the most recent info from the database.

This is helpful, but what if after entering the queue, the tree is, _gasp,_ deleted? It could have gotten cut down, ravaged by woodpeckers, or moved to Silicon Valley for more money. **A job record getting deleted between getting queued and running causes the deserialization error.** That error could make the job fail and stop that job's other emails from going out!

ActiveJob throws a specific error for this, so it's easy to `rescue` things and add a fallback.

```ruby
def tree_update_email(tree)
 # All the code that prepares and send emails
 # about the trees to the caterpillar subscribers
rescue ActiveJob::DeserializationError # Tree deleted after the job was queued
 # You can log a specific error here,
 # Send an email telling caterpillars the tree is gone,
 # Or leave it blank so the job can finish in peace
end
```

Some caterpillars may think the better solution is to avoid deleting records in this time gap. But that all depends on the program's complexity and structure, so it's always a realistic option.

Rescuing the error is a simpler, more flexible solution to remember. It'll ensure Katie gets all her email updates, can find a good tree and become a beautiful butterfly. Properly handled the deserialization errors lead to a happy ending for everyone!
