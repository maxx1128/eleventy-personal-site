---
title: Disabilities and Impairments
category: Accessibility for Everyone
date: 2020-06-09
---

## Defining Disability

In the US, roughly 12% of the population has a disability. This covers a wide spectrum - physical, neurological, visual, etc. It could be as simple as below-average eyesight. Also just be an older person with failing eyesight and arthritis tremors.

Can be helpful to think of it as "X _has a disability_" instead of "X _is disabled._" The person comes first, and they're not defined by their disability. They're part of the whole audience, not just the "disability audience."

## 5 Types of Disability

1. **Visual:**
    * Wide spectrum, include near- and far-sightedness, and astigmatism. Some vary from day to day.
    * _Color blindness_ includes not seeing particular colors or distinguishing certain ones. Several different versions causes certain colors to look lighter, makes colors looks similar, or not seeing some colors at all.
        - Designing for these can include ensuring strong color contrast, and not using color to signify meaning.
    * _Eyesight loss_ can also make people not see everything in their field of vision. Beaten with readable text sizes, clear labels, text alternative to images and video, and high text/background contrast. They may use screen readers.
2. **Auditory:**
    * _Hearing Loss,_ which could be partial or complete. Due to inner-ear blockage, nerve damage, aging.
    * Affects video and audio content. Add subtitles or written transcripts!
        - I personally prefer transcripts due to preference, and not wanting to disturb others without pulling out headphones. Another example of how accessibility is good for business.
3. **Motor:**
    * Lots of possible causes to motor impairments: cerebral palsy, neural defects, muscular dystrophy, arthritis, traumatic injuries, or strain from physically demanding jobs (like repetitive strain injury).
    * Affects how people use keyboards, touchpads, mice, and mobile devices. Harder to do precise actions like clicking small areas, selecting text, doing right clicks. Can slow down reactions, bad for interfaces with timed cues or animations.
4. **Cognitive:**
    * _Memory,_ for finding tasks or seeing where you are in a site
    * _Attention,_ for processing lots of info, or info over long time periods
    * _Problem-solving,_ for processing info or unexpected content
    * _Text Processing,_ for understanding text, speech, and language
    * _Math Processing,_ for understanding math concepts (time, money, pricing)
    * _Visual Processing,_ for interpreting visual info/representations (icons)
    * People with learning disabilities can have a hard time processing info. Helpful to give extra context and info, and avoid unneeded info in whatever medium they use.
    * People may be illiterate due to limited education, learning difficulties, or living in an area with a different primary language. Helpful to give simple copy, headings in content, and multiple-choice answers over open-ended ones.
    * This could also affect anyone in certain places or circumstances - lack of sleep, medication, acute injuries, etc.
5. **Vestibular Disorders and Seizures:**
    * Caused by damage to the parts of the inner ear and brain controlling balance and spatial orientation. Can cause dizziness, vertigo, confusion, hearing/visual issues. On the web, often is motion sensitivity.
    * Affects 35% of adults aged 40+.
    * Try offering option to tune down/off motions and animations. Show the option before any animation happens. Otherwise it can cause headaches, nausea, even seizures (specific guidelines to avoid that last one).

## Environmental Factors

Accessibility affects everyone, not just those with impairments, since environmental factors can affect us all, now and in the future.

### Legacy Browsers

Many organizations (public or non-profit ones) are stuck with older browsers. Simply checking for basic performance on other browsers is a form of accessibility checking. This can apply to anyone in a job stuck with older browsers, or temporarily working in a place with them too.

### Devices

Devices can vary widely in size, touch gestures, browser availability, how the content is presented, or how many people view them at once. Phones, game consoles, web-enabled TVs, smart-watches, VR headsets, etc.

People don't just use mobile "on the go," people access the web at their homes all the time. Don't focus only on what info people may need when traveling for mobile devices, focus on everything.

There's no reliable metrics to measure these kinds of things are device width, everything else is either not widely tracked or could be misled by browsers. The only real option is building for as many sizes and devices as possible, building for the unknown. Tough, but it gives our sites a much longer lifespan.

### Connectivity

Bad connectivity commonly stems from:

* Lots of people accessing public Internet
* Lack of access to fast broadband in rural and remote areas

These can affect anyone traveling, and consistently affect the many people with worse Internet than developers. Assuming fast connectivity is dangerous.

### Languages

The world-wide-web is (obviously) worldwide, so support for multiple languages is important to consider. Professional or automatic translations are potential solutions, but they're respectfully expensive and unreliable.

**Good starting point: Simplify your language!** Content is naturally easier to understand, and makes translations easier too.
* Double-check character sets for letters, make sure they have characters to use for different languages. Languages can vary greatly in needed characters, not having them can render text unreadable. Do this for webfonts too.
* Remember that different languages may read the text from either the left or right side. You can change this via CSS or HTML (the `dir` attribute on the body). More specifics on this later.
* Don't forget that your environment and context greatly affects how you view a site.
    - High or low light conditions can lower readability. High contrast between text and background helps a lot.
    - Being in a public space, or any space where loud noises are discouraged, can affect audio. Captions, subtitles, and transcriptions get around this.
    - Some sites may have specific privacy or stress cases to design for. An example is a domestic abuse site, which always has a button available to hide it in case victims need to hide it from abusive partners.

There are so many factors affecting accessibility that, realistically, it's impossible to plan for them all. That's why the best option is to plan for as many as possible.
