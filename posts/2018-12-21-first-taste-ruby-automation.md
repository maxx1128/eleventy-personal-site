---
title: "My First Taste of Ruby Task Automation in 22 Lines"
date: "2018-12-21"
excerpt: "Automation has always been a sensitive spot in my coding career, but I finally took a solid first step."
image: 'rubyautomation.png'
tags: ['ruby']
---
The few people who know my code know I'm focused mainly on the front-end: HTML, CSS, JavaScript (sadly), accessibility, and whatever else that bothers my coworkers. Virtually every time I went to a back-end language like Ruby, it was directly or indirectly due to my job and not by choice.

All that made [one hour yesterday stand out the way it did](https://twitter.com/Maxwell_Dev/status/1075936262253670400). It was my first moment of genuine, impulsive inspiration to solve a problem with Ruby. It was even an automation problem, something I've never done outside more limited tools like Gulp.

It was a relatively small win, but it helped soothe common career anxiety of mine. So I figure it's worth sharing how I solved it and why it mattered so much.

## The Problem

I won't go into too much background, but the basic issue was:

* I had several markdown files with front matter, and a long YAML file with similar data.
* I wanted to convert each YAML item into a Markdown file with the right name and data. That way they could be looped through together, in chronological order, for [a certain site generator](https://jekyllrb.com/).

My first thought was doing this by hand - making all the markdown files renaming them, copying all the data, repeating common code, tweaking data as needed, etc. My second thought was "Isn't this exactly what programming is supposed to avoid?"

I remembered someone at work saying Ruby can handle basic file manipulation and creation. I realized this was the perfect chance to test this out, and more importantly, see if I could understand it.

## What The Automation Had To Do

For context, the YAML file looked like this:

```yaml
- articles:
  - name: You Can Be a Casual Blogger
    date: "2018-11-05"
    link: https://dev.to/maxwell_dev/you-can-be-a-casual-blogger-ff0
    description: Seeing so many professional writers emerge on Dev.To has helped me see, and  accept, my casual blogger habits.
  ...etc
```

The Ruby script had to do several things:

1) Import the YAML data
2) Loop through the YAML data
3) Create a file name based on the data
4) Create a multi-line string for the file's front matter
5) Save this into a new file

The end result would be markdown files like this:


```markdown
---
title: "You Can Be a Casual Blogger"
date: "2018-11-05"
external: true

excerpt: "Seeing so many professional writers emerge on Dev.To has helped me see, and  accept, my casual blogger habits."
---

```

They'd also have names with their date and title like this:

```
2018-11-05-you-can-be-a-casual-blogger.md
```

I expected to hit some roadblocks and give up. Turns out, it only took 35 minutes and 22 lines to write!

## Reaching the Solution

### 1) Import the YAML Data

Turns out Ruby has a YAML module in it, no gems to install. A little searching told me how to use it pretty fast.

```ruby
require 'yaml'
data = YAML.load_file('articles.yml');
```

### 2) Loop Through the YAML Data

Looping through said data was tricky due to the format, which may have been my fault for writing the YAML a certain way. The imported data was basically an array, inside an object, inside another array. This bordered on YAML-ception and needing a Leonardo DiCaprio cameo.

Solving this didn't require dropping into Limbo, it just took some trial and error.

```ruby
data.each do |articles|
  articles['articles'].each do |article|

    # Code goes here!

  end
end
```

### 3) Create a file name based on the data

Each YAML entry needed a specific file name based on the date and title. Doing this took two steps:

* Convert each string to the needed format.
    * The title needed to be lowercase with dashes instead of spaces.
    * The date needed no changes.
* Each string had to be interpolated into the file name, extension, and while I'm at it, the file path.

Two variables later, everything I need was in the variable `file_name`.

```ruby
titlized_name = article['name'].downcase.gsub!(/\s+/, '-')
file_name = "./../_posts/#{article['date']}-#{titlized_name}.md"
```

### 4) Create a Multi-line String for the File's Front Matter

This one took some extra searching but I found `%Q`, a shorthand for creating multi-line strings with interpolation (or exactly what I needed).

The downside is it threw off the code alignment and readability, which you'll see in the final result. But I still found it simple and readable enough to be worth it.

```ruby
front_matter = %Q(---
title: "#{article['name']}"
date: "#{article['date']}"
external: true
link: "#{article['link']}"
excerpt: "#{article['description']}"
---
)
```

### 5) Save This into a New File

I actually found this out before anything else when I started ~~Googling~~ exhaustively investigating my options. Ruby has something for creating, writing to, and saving files that's pretty simple. All I had to do was take everything I'd compiled, plug it in to the `File` object, and it worked its magic.

```ruby
out_file = File.new(file_name, "w")
out_file.puts(front_matter)
out_file.close
```

## Solution found!

Below is the final 22-line script!


```ruby
# convert_data.rb

require 'yaml'
data = YAML.load_file('articles.yml');

data.each do |articles|
  articles['articles'].each do |article|
    titlized_name = article['name'].downcase.gsub!(/\s+/, '-')
    file_name = "./../_posts/#{article['date']}-#{titlized_name}.md"

    front_matter = %Q(---
title: "#{article['name']}"
date: "#{article['date']}"
external: true
link: "#{article['link']}"
excerpt: "#{article['description']}"
---
)

    out_file = File.new(file_name, "w")
    out_file.puts(front_matter)
    out_file.close
  end
end
```

I saved it, held my breath, and ran `ruby convert_data.rb`. A second later, my `_posts` directory had all the needed files, properly named and everything.

Considering how long this took (and how improved it could be), I didn't save much time overall. But writing this was more fun and less mind-numbing, so productivity-wise it balances out to a win!

## Feeling Hopeful

Some people may wonder why I'm so happy over a relatively easy Ruby script. It's partly my rule to celebrate small wins. It's also related to an insecurity I've had for a while as a developer.

This insecurity was symbolized well at a career day event I co-hosted with another developer. We had much different specialties - I worked on user interfaces and accessibility, he worked on task automation and data-crunching.

While we both were received very well by the students, his type of programming seemed to resonate much more. Automation is often highlighted the most among programming skills (and as he told kids, pays a lot more). That higher importance on virtually all automation always made me insecure about my own front-end focus. I love the front-end and all, but days like that career day still made me anxious about my career's future.

This Ruby script was my first real taste, however small, with serious task automation. It wasn't copied from somewhere else, or a limited front-end asset automation. **I had to write it myself, and saved time and energy where many other people would've wasted it otherwise. Seeing myself do all that ease that career insecurity just a little bit.**

Most of all, it shows I can keep learning on my skills here. I can work the front-end while automating the boring stuff as needed. Task automation helps me feel more like a real programmer - efficient, lazy, pragmatic, and incredibly smug.

It can help me squash that career insecurity, one small script at a time.
