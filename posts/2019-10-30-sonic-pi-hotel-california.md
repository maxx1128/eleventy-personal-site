---
title: "Remixing Hotel California with Sonic Pi"
date: "2019-10-30"
excerpt: "Sonic Pi is an amazing music synth tool for turning code into melodies. I break it back in by breaking down a remix of Hotel California's chords."
image: 'sonic-pi-hotel-california.jpg'
tags: ['ruby']
featured_image_link: 'https://safebooru.org/index.php?page=post&s=view&id=1904822'
---

I love writing all kinds of code - CSS, JavaScript, Ember, hacks to domestic and foreign restaurant databases, and Ruby. But one type of code I love and too often overlook is for [Sonic Pi](https://sonic-pi.net/). It's the open-source tool that turns Ruby-esque code into music. Yes, actual music, as you can see below.

<div class="iframe-container">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/G1m0aX9Lpts" title="Embedded YoutTube video" frameborder="0" allowfullscreen></iframe>
</div>

Lately, I've gotten back to writing Sonic Pi music and thought I'd infect others with its joy and magic. So I dug up a song I wrote with it, an atmospheric remix of Hotel California by The Eagles. This is a tutorial walking through how, in 55 lines of code, Sonic Pi helped me make this:

<div class="mb-4 overflow-hidden">
  <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/704959672&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>
</div>

Along the way, I'll cover some Sonic Pi basics to show what it's capable of. But there's a built-in tutorial if you download the program I highly recommend. [Mehackit also has notes on a great Sonic Pi workshop](https://sonic-pi.mehackit.org/) that's worth reading.

_Quick note: Writing musical code both highly technical and subjective. You may not agree with the code I wrote has the effect I aimed for, and that's fine. There are lots of ways to get there, more ways to disagree, and even more to learn from each other._

So let's begin! Sadly I can't embed Sonic Pi snippets with their sound outputs, so feel free to download the app and play the snippets as I go!

## Gather The Chords

I decided on Hotel California as my inspiration for two reasons:

1. It's awesome
2. It can be played with two basic chord progressions

There's plenty of music sites that break down the chords behind the song, but [I went with Ultimate Guitar for its readability](https://tabs.ultimate-guitar.com/tab/eagles/hotel_california_chords_46190). First, there are the chords used for verses.

![A verse of Hotel California with different chords above the words.](/assets/images/posts/sonic-pi-hotel-california/california_opening_tabs.png)

Then the chords for the chorus.

![A chorus of Hotel California with different chords above the words.](/assets/images/posts/sonic-pi-hotel-california/california_chorus_tabs.png)

It's easy to translate these into something Sonic Pi can understand. It has built-in functions for both arrays and chords: `ring` and `chord`. You can see them in action below.

```ruby
opening_ring = (ring chord(:a, :minor),
                chord(:e, :major7),
                chord(:g, :major),
                chord(:d, :major),
                chord(:f, :major),
                chord(:c, :major),
                chord(:d, :minor),
                chord(:e, :minor))

chorus_ring = (ring chord(:f, :major),
               chord(:c, :major),
               chord(:e, :major7),
               chord(:a, :minor),
               chord(:f, :major),
               chord(:c, :major),
               chord(:d, :minor),
               chord(:e, :major))
```

`ring` is Sonic Pi's version of an array with added functions for playing sounds. `chord` takes the chord's name and gives you a ring of the notes that make it up. Once you have these rings, you can play those notes any way you want - all at once, one at a time, or at random. You can also grab notes by scales or octaves for even more sounds. But notes gathered based on any of these groups will almost always sound good together.

## Use the Opening for the Main Melody

After some internal debate, I settled on the opening chords for the song's main melody. I planned to start simple and code things by ear (get it?) until I got a creepy, atmospheric feel.

So to start, I played each chord in a loop. Sonic Pi has two tools to make that easy:

1. `live_loop`, which runs all code, sounds, and logic in it infinitely. It runs in tandem with other `live_loop`s, making it great for layering melodies.
2. `tick`, which is a `ring` function that plays each note in the sequence. Each time `tick` is called, it plays the next note in a repeated loop.

```ruby
live_loop :opening do
  play opening_ring.tick
  sleep 1
end
```

This tells Sonic Pi to play each chord, wait for a second, then play the next. It's a start, but something atmospheric should be slower. So first I increased the rest between each chord.

```ruby
live_loop :opening do
  play opening_ring.tick
  sleep 3
end
```

This helps, but now there's too much silence. Stretching each chord over those three seconds would add some more tension and creepiness. Which is possible!

```ruby
live_loop :opening do
  play opening_ring.tick, attack: 1, sustain: 1, release: 1.50
  sleep 3
end
```

These properties likely seem weird but are pretty straightforward:

1. `attack` is the time from silence to full volume.
2. `sustain` is the time at full volume.
3. `release` is the time from full volume to silence.

The respective default values for these are `0, 0, 1`, so my changes stretch the chord quite a bit. It sounds more like a gentle howling in the wind then someone banging keyboard notes. This is good, but still sounds too plain. I want to layer on something else for extra texture.

I'll spare you the experimenting and cut to the end. Before I explain, try to guess what this code does.

```ruby
live_loop :opening_deep do
  play opening_ring.tick.tick, attack: 0.5, release: 1
  sleep 1
end
```

You may remember that `opening_ring` is a ring of chords, and each `chord` returns a ring of notes. So `opening_ring.tick.tick` is ticking through each note of each chord, one at a time and not all at once. In music theory, this is a "broken chord." So the result of these two loops is the full and broken chords playing at once.

```ruby
live_loop :opening do
  play opening_ring.tick, attack: 1, sustain: 1, release: 1.50
  sleep 3
end

live_loop :opening_deep do
  play opening_ring.tick.tick, attack: 0.5, release: 1
  sleep 1
end
```

The result is a simple yet haunting melody, with the notes grouped in a way that still work.

## Use the Chorus for the Atmosphere

I have the opening chords for the melody, but I still want to make use the chorus chords. The melody is already the music's main focus, so I used these chords for some ambiance. To get this effect, I used two other Sonic Pi tools - synths and sound effects.

**Synths are the sounds Sonic Pi uses to executed sounds composed from notes and chords.** So far I've been using the default `beep` synth since it fit with what I wanted. But there are dozens to choose from, from pianos to chip noises to pulses to whatever. In this case, the `hollow` synth fits perfectly. It's described as "a hollow breathy sound constructed from random noise." That's great for a fog-like effect, and can be set within specific loops.

```ruby
live_loop :ambience do
  use_synth :hollow
  play chorus_ring.tick, amp: 0.15, attack: 1, sustain: 3, release: 0
  sleep 3
  end
end
```

**Sound effects are filters you can run anything through.** This includes changing echoes, pitches, frequencies, sample rates, and more. I don't understand them all but understand a good amount of them. I went with two for the ambiance loop: `gverb` for a spacious and outdoorsy feel, and `flanger` for a whooshing wind effect.

```ruby
live_loop :ambience do
  use_synth :hollow
  with_fx :gverb do
    with_fx :flanger do
      play chorus_ring.tick, amp: 0.15, attack: 1, sustain: 3, release: 0
      sleep 3
    end
  end
end
```

The result is a distant, echoing effect that feels vaguely disturbing but keeps the song's spirit.

## Add Samples for Variety

These three loops do a lot, but they're relatively short and can get stale. So adding a few samples keeps things interesting.

**Samples are pre-recorded sound bites that you can't control with notes and chords, but can still be modified with code.** Sonic Pi has many included, and you can easily add more! So I took some pre-existing ones and mixed in some needed effects.

The first sample is `glitch_bass_g`. As the name implies, it's a glitchy base sound suited for background beats. Not built for creepy songs, but a few tweaks can fix that. The first is adjusting its `rate` property.

`rate` is the speed a sample plays at, letting you slow it down or speed it up. You can set it to a negative value to play clips backward, which is what I did. I used another tool, `rrand`, for generating random numbers between two values. Now I can slow the sample down, play it backward, and add variety to each play. I can also adjust the `amp` property to make it louder.

```ruby
live_loop :disturbance do
  sample :glitch_bass_g, amp: 2.25, rate: rrand(-0.1, -0.4), release: 6
  sleep 6
end
```

This all creates a disquieting rumble, but I wanted it to sound stranger. Thankfully you can also apply effects to samples. So I ran it through the `octaver` filter. This changes the sound to a mix of different pitches, which adds a distorted and disquieting effect.

```ruby
live_loop :disturbance do
  with_fx :octaver do
    sample :glitch_bass_g, amp: 2.25, rate: rrand(-0.1, -0.4), release: 6
  end
  sleep 6
end
```

Lastly, I don't want this effect playing constantly or it'd overshadow everything else. So I used the `one_in` function to randomly limit how much it plays. For example, `one_in(3)` only returns `true` 33% of the time. Use this with a conditional and the sample will randomly play that amount less.

```ruby
live_loop :disturbance do
  if one_in(3)
    with_fx :octaver do
      sample :glitch_bass_g, amp: 2.25, rate: rrand(-0.1, -0.4), release: 6
    end
  end
  sleep 6
end
```

The final sound effect I wanted was something like people howling. Sonic Pi actually (and kind of creepily) has a sample called `ambi_choir`, one of some people yelling. It's so close I didn't even need a filter, just some property tweaks and another conditional to quiet it down.

``` ruby
live_loop :shout do
  if one_in(5)
    sample :ambi_choir, amp: 1.25, rate: 0.5, decay: 2
  end
  sleep 3
end
```

These two samples add small surprises throughout that are still consistent with the tone.

With that, my Sonic Pi composition is complete! [You can read all the song's code here](https://github.com/maxx1128/Sonic-Pi-Songs/blob/master/hotel_california.rb).

## Wrapping Up

I like how this song came out, but this is a relatively simple Sonic Pi project. It's some fancy sound loops timed around each other with some chords and randomness mixed in. Sonic Pi has a tutorial section of increasingly complex examples, with more loop logic and even song phases. Others have composed entire song albums with it. This example is only scratching the surface.

All this shows how Sonic Pi offers both ease of use and lots of depth to explore, so it's fun for new and veteran coders. I plan to make more compositions in the future, and hope you all will too!

**[If you want to support the next version of Sonic Pi and keep the app free, consider donating to its Patreon page!](https://www.patreon.com/samaaron)**
