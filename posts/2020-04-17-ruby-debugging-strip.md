---
title: "How I Debugged a Ruby Program by Stripping"
date: "2020-04-17"
excerpt: "A Ruby program I wrote hit a tough snag when trying to download info online. But thanks to the program's dubious nature, I can't reveal the full context so easily."
image: "ruby-debug.png"
featured_image_link: "https://safebooru.org/index.php?page=post&s=view&id=2856814"
tags: ["ruby", "anime"]
---

After banging my head against the computer screen for hours, I finally solved a persistent bug by stripping.

I admit this sounds odd without context. However, I'm reluctant to share the context since it is, to some people, ethically or legally dubious. But I still want to share this small code story. So for everyone's safety, I've redacted info from my original blog post to protect affected identities. Namely, my own identity, which I normally protect with sleeping gas and copper wiring. This time I'll be using self-censorship. Even if it leads to titles or sentences that may sound bad without the context.

With that in mind, [let's begin the story of how I wound up stripping](https://tvtropes.org/pmwiki/pmwiki.php/Main/LessDisturbingInContext).

## The Problem

A few weeks ago I wrote a ruby program to scrape and download ~~manga chapters~~ important academic information. It worked great, but only for one ~~manga website~~ international knowledge database. It got me 95% of what I wanted, but I was stuck on downloading ~~a final chapter from another manga website~~ how to solve world hunger.

One specific method downloads all the images for a ~~single manga chapter~~ series of life-saving charts and graphs. It takes a separate array, loops each one through a method that does the downloading, and then another class saves them to a PDF.

```ruby
def download_all_images
    image_urls.each_with_index { |url, index|
      download_image(url, "downloads/#{@document}/#{@section}", index) if is_usable_file(url)
    }

    PdfDownloader.new(@document, @section).download
end
```

The `download_image` method itself uses `fileutils` to make the needed folder and write the image inside.

```ruby
def download_image(image_url, path, file_name)
  FileUtils.mkdir_p("./#{path}/") unless File.exist?("./#{path}/")
  File.open("./#{path}/#{file_name}.png", 'wb') do |fo|
    fo.write open(image_url).read
  end
end
```

You may have also noticed the `is_usable_file` method. Sometimes broken images would slip through and crash the whole process. So this checks for broken images and skips over them.

```ruby
def is_usable_file(url)
  image_file = open(url)
  image_file.class.name == 'Tempfile'
end
```

Notice both these methods use `open` from `open-uri` for the image files. That method threw the error for this new site.

```
/Users/maxwellantonucci/.rvm/rubies/ruby-2.4.3/lib/ruby/2.4.0/open-uri.rb:37:in `initialize': No such file or directory @ rb_sysopen
```

The method couldn't find the image at the URL. Without that, I couldn't download anything. So the arduous debugging process began for finding out why and fixing it.

## The Debugging Approaches

The first check was easy: **was the URL I got even valid?** I copied the image URL and posted it in a web browser, and it worked. My program was scraping the right URLs.

**Was the open method somehow broken?** I found another good gem for file downloading and swapped it in. It hit the same error, so it wasn't the tool's fault.

**Was I using open wrong in just one place?** I used this method to check and download files. One of those could be throwing it off somehow. I ran the program twice more with one of the other uses commented out. I still got the same errors, so it wasn't specific to one place I used it.

**Was something in my larger program to blame?** Another dev recommended I run `open` with this URL in a Ruby console, totally isolated from my program. I did and it returned a Tempfile as it should. This was evidence that this should be working, but something somewhere else in my code was throwing it off.

But that led to a tougher question: where exactly is the issue? Sifting through each line in the whole program would take more time than I wanted.

So I fell back to my winning approach of staring at the console error until I had a breakthrough. Before you laugh, it worked after only 15 minutes of blank staring.

## The Answer

As I stared, I noted the image URL being shared as "not working" was aligned weird. It was on another line but pushed a quarter of the way across. But every time I outputted the URL in the console to check it after, it was on the left.

```
/Users/maxwellantonucci/.rvm/rubies/ruby-2.4.3/lib/ruby/2.4.0/open-uri.rb:37:in `initialize': No such file or directory @ rb_sysopen -                   (Errno::ENOENT)
                        SECRET_IMAGE_URL_WAS_ALL_THE_WAY_OVER_HERE
        from /Users/maxwellantonucci/.rvm/rubies/ruby-2.4.3/lib/ruby/2.4.0/open-uri.rb:37:in `open'
        from /Users/maxwellantonucci/.rvm/rubies/ruby-2.4.3/lib/ruby/2.4.0/open-uri.rb:37:in `open'
```

It was a small contradiction. But if I've learned anything from House M.D., the Ace Attorney Series, or those nights running through locked file cabinets in New Jersey basements, the smallest details and contradictions lead to the truth.

So I thought, what could push the string like that? There was nothing but blank space there. Then I remembere strings can have whitespace which looks empty. So I updated my first method to use `strip`, which would remove any white space.

```ruby
def download_all_images
  image_urls.each_with_index { |url, index|
    proper_url = url.strip
    download_image(proper_url, "downloads/#{@document}/#{@section}", index) if is_usable_file(proper_url)
  }

  PdfDownloader.new(@document, @section).download
end
```

I ran it and the program worked flawlessly. Before I knew it, I was downloading the ~~manga chapter~~ knowledge to save mankind that had evaded me for days.

## A Bittersweet Ending

I was happy I finally figured it out. Then I was furious I'd wasted so much time and energy just because my program scraped up some whitespace. After that, I was still furious. Then slightly less so but still pretty pissed off.

The silver lining is the [NewHaven.IO](http://newhaven.IO) developers I got advice from all identified with whitespace slipping into strings. It's almost a rite of passage for the Ruby language. One dev drove this home like so:

> Hahaha welcome to the backend! Where you have to know everything and it still probably won't work!

But that also marked the end of my story of how I became a stripper. **To be more exact, a stripper stripping away the whitespace from my image URLs.**

What else could you have thought I meant?
