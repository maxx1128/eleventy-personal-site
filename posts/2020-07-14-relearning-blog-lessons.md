---
title: "Relearning my Blog's Old Lessons"
date: "2020-07-14"
excerpt: "Sometimes the only way to remember lessons in blog posts is to email them to myself."
image: "relearning-blog-lessons.jpg"
featured_image_link: "https://safebooru.org/index.php?page=post&s=view&id=2075257"
tags: ["mental health", "writing"]
---

The main reason I blog is to remember and share my life lessons (and get my thoughts out so my head doesn't explode). It's not always easy, between finding time to do it, not tearing apart my laptop after the first draft, and cringing over grammar mistakes notice months after posting.

But the toughest part is when I learn a lesson or overcome a struggle, only to realize I wrote about the same lesson months ago. Probably like most writers/bloggers/international spies, I have a hard time remembering my notes and how I've grown over time.

**So last week, I made it a lot easier and wrote a script to email myself random bits of my writing each day.**

Exposing all my site's writing for this was as simple as making a couple of giant XML files. There's one for blog posts, one for the Exocortex, and one for my notes. You can see the blog post example below, and [you can see the output at this XML file](/rss.xml).

```html
{% raw %}{% assign posts = site.posts %}

{% for post in posts %}
  {% assign url = post.url | prepend: site.url %}

  <entry>
    <title type="html">{{ post.title }}</title>
    <link href="{{ url }}" rel="alternate" type="text/html" title="{{ post.title }}"/>

    <content type="html" xml:base="{{ url }}">
      {{ post.content | xml_escape }}
    </content>
  </entry>
{% endfor %}{% endraw %}
```

Next up is a Ruby class that can visit any of these URLs, parse the content, and grab a random item.

```ruby
require 'net/http'
require 'json'
require "base64"
require 'nokogiri'
require 'redcarpet'
require 'redcarpet/render_strip'

class WebsiteContent
  def initialize(content_type)
    @url = "https://www.maxwellantonucci.com/api/#{content_type}.xml"
  end

  def get_page
    response = api_response(@url)
    parse_xml(response)
  end

  private

  def parse_xml(body)
    xml_doc = Nokogiri::XML.parse(body)
    all_items = xml_doc.css("entry").map do |entry|
      {
        title: entry.css("title").text,
        content: render_markdown(entry.css("content").text)
      }
    end

    all_items.sample
  end

  def api_response(url)
    uri = URI(url)
    Net::HTTP.get(uri)
  end

  def render_markdown(content)
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, disable_indented_code_blocks: true, fenced_code_blocks: true)
    markdown.render(content)
  end
end
```

`Nokogiri` is great for doing the parsing the XML document, and `sample` is one of those lovely Ruby methods for common tasks I wish JavaScript had.

All my site content is written in markdown, so that needs to be rendered into HTML. `Redcarpet` is good for this since it can handle the code blocks and snippets on some pages.

One last class is needed to email this content to me. It calls up the last class to grab something from my site and uses the `mail` gem to send it over. Any email server info I want to keep private is saved in environmental variables and pulled out with `dotenv/load`.

```ruby
require 'mail'
require 'dotenv/load'
require_relative 'website_content.rb'

class EmailSender
  def initialize(type)
    @type = type
    options = email_options
    Mail.defaults do
      delivery_method :smtp, options
    end
  end

  def send_email
    page = WebsiteContent.new(@type).get_page
    sender = email_sender
    recipient = email_recipient

    Mail.deliver do
      from    sender
      to      recipient
      subject page[:title]

      html_part do
        content_type 'text/html; charset=UTF-8'
        body page[:content]
      end
    end
  end

  private

  def email_sender
    ENV['GMAIL_USERNAME']
  end

  def email_password
    ENV['GMAIL_PASSWORD']
  end

  def email_recipient
    ENV['RECIPIENT_EMAIL']
  end

  def email_options
    { address: "smtp.gmail.com",
      port: 587,
      user_name: email_sender,
      password: email_password,
      authentication: 'plain',
      enable_starttls_auto: true  }
  end
end
```

Now I just need a task to run all this, which I have in `bin/send` that runs the `EmailSender` class.

```ruby
#!/usr/bin/env ruby

category = ARGV[0] || "blog" ;

require_relative '../lib/email_sender.rb'
EmailSender.new(category).send_email
```

From this project directory, I can call `bin/send blog`, `bin/send notes`, or `bin/send exocortex` and get an email with a random piece from said category. The joys of coding in Ruby! So simple and so enjoyable to write.

I admit all this is a little self-indulgent. But [I'm an admitted selfish and casual blogger](URLHERE), so I feel no shame. If this little script helps remind myself to build good habits, write good Ruby, and embrace the horrors of life with humor and curiosity, then I'll take it.
