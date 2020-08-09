---
title: Content and Design
category: Accessibility for Everyone
date: 2020-06-09
---

Accessibility decisions help everyone, since all tech is assistive.

* Keyboards and mice assist us in talking with a computer
* Headphones help us hear audio without bothering others
* Phones help us in near-infinite ways today
* At all points in our lives, we vary between levels of independence and dependence

Four broad usability parameters to remember, since _good accessibility is good usability._

* **Visual** - Easy to see
* **Auditory** - Easy to hear
* **Motor** - Easy to interact with
* **Cognitive** - Easy to understand

## Affordances and Conventions

_Affordances:_ How objects suggest what interactions can be performed with them, hopefully in ways users can recognize. For example, looking for a computer's familiar power icon, as it's reliable users understand it already. Most often, designers are better relying on conventions, as deviating from them just makes for confusing experiences. Using them well lowers the learning curve for all.

Popular convention: design using visual metaphors so it's similar to real-world items, such as button elements. Again, it usually can't deviate too far from what's already expected.

These ideas should be kept in mind when creating all of your site's elements and content.

## Navigation and Wayfinding

Navigation is vital for users to know where they are and how to get where they need to.

**Navigation bars:** One of the most common, reliable navigation conventions. Can both help visitors get around the site but also give them an overview of your site's content. Best if they give a concise snapshot of your site's content, not showing too much info or links. Use terminology that'll be easy for new users to understand.

> Rule of thumb: If you think of a new navigation convention and it needs an explanation for new users, rethink it and consider using a well-established convention.

### Navigation also tells users where they are

Users usually first check the page title to determine where they are. Also checking for an "active" state in the navigation for their current page.

Larger sites may use breadcrumbs to show the relationship between the current page and others they visited. Especially helpful for users with memory issues or other cognitive disorders, as well as helping everyone to some degree.

Clear and good navigation also helps everyone if navigating a site when highly stressed, since they'd be more likely to lose track of their place in the site and leave otherwise.

### Links

Links started as blue text with an underline, and turned purple when clicked. Their long time in the web has solidified this convention for them. Designers can usually get away with changing the colors, and maybe removing the underline, but **the main convention is that links contrast clearly with normal text.**

Don't just make hyperlink text "Click here," as screen readers will only see that and not know any context around it when searching through links. Hyperlinks should clearly describe the actual link. It also simplifies your language.

"To get in contact with our team, *click here*" -> *Get in contact with our team*

Readers and listeners both benefit from this descriptive linking. Write links knowing they could be read without the context of regular text around them.

## Writing

Accessible writing is:

* understandable
* useful
* appropriate for the audience

### Hierarchy and Structure

* Clear and concise headings make it easy to skim content and know what you'll find.
* Separate lists from paragraph text, to better break up the page
* Clear hierarchy and shorter sentence structure make content more approachable. Especially for users who struggle to read.
* Consistent structure between similar pages also help users know where to find certain content on similar layouts, making navigation easier.

### Use Plain Language

Simple and concise text is accessible text. Practice trimming unneeded words from text. Avoid technical jargon and obscure acronyms whenever possible. For acronyms, spell out their entire meaning the first time. Avoid vague, stock-photo esque language.

Use the [Hemingway App](http://www.hemingwayapp.com/) to help edit down text!

## Typography

**Keep text as legible as possible.**

* **Font size:** Avoid text too small or too large. Around 16 pixels or larger is generally good, but your font family will affect this.
* **Font weight:** Thin type has gotten more popular, but its lower contrast can make it harder to read. Be cautious of fonts with lower weights.
* **Line length:** Too-short lines can get cramped, but too-long lines (generally longer than 66 characters) can lead to sore eyes or moving one's neck too much.

**Specialist typefaces** can be used for young readers/readers with difficulties. Example, Heinemann uses similar shapes and letterforms as to what people learn in school.

**Icon fonts** can have accessibility issues, since screenreaders may skip the code implementing them. Make sure an icon font you choose is accessible, and fall back on readable text if needed. If possible, pair icons with visible text so their meaning is more clear.

Also, don't disable zooming for your sites. This makes it tougher for users to see larger text if needed.

## Interaction Design

Users with learning difficulties or cognitive impairments may struggle with:

* Sudden content changes
* Following instructions
* Entering expected inputs
* Not having time to digest a page
* Not undoing or fixing an incorrect input/interaction
* Unclear changes that happen without user input

Simple tips to avoid these situations:

* **Avoid auto-advancing content** for items like carousels. Give users control on when to advance, since you don't know how long it takes them to read it.
* Avoid animations too fast or slow that they affect reading the content. If possible, let users toggle them on or off.
* **Don't time people out of forms without warning.** Try to give an option to change the time-out limit.
* Let people review inputs again before submitting them

### Forms

Make forms as stress-free as possible!

* If possible, get inputs to auto-correct or auto-format inputs. **Input formatting should be the developer's job, not the user's.** Whether it's done during the form input or after it's submitted.
    - If not this, at least make the formatting requirements clear from the start.
* Predictive text helps with people who can't spell terms correctly

### Alerts and Error Messages

* Alerts should tell people new content that will change the state is available, but not make the change automatically.
    - For those with screen readers, giving an action to review the changes is great. Afterwards, they can return to their last position.
* Error messages should be clear, friendly, and useful. Otherwise mistakes that drove us to them will just get more frustrating.
    - Don't just pass on text from the server!
* Clearly explain how they can fix the situation, in a "human" way.
* For input fields, don't just show there's an incorrect input. Give an explanation as to why, and how the user can fix it.

## Color

Color has lots of uses aside from decoration - they set the tone, draw attention to specific areas or situations, and they can have hugely different meanings for different cultures. Never discount color as a small thing.

### Color Contrast

High text/background contrast affects everyone - low-sighted users, colorblind users, people using old devices, people with high/low surrounding light, etc. Also an issue with backgrounds that have images or other designs on them. Always check this contrast wherever there's text. However high contrast can look too jarring too.

Increasing size and font-weight gives you _some flexibility_ with how much contrast you need in the colors.

Test out your contrast by viewing designs in grayscale, or using contrast-checking tools discussed later.

### Color as Information

**Never present information with only visual colors.** Use a color and a text description. This applies to everything, including the colors for errors on inputs. Visual styling is good for direction user attention and experience, but on its own it's not accessible.

## Rich Media

The most popular rich media are images, which helps those with learning disabilities and low literacy - they give more visual info and context. As long as the photos aim to increase understanding, especially if they're simple.

**Give images/graphs/infographics `alt` text!** If users can't see the image, either due to it not loading, images are disabled, or they use screen readers. No `alt` text means they'll use the file name instead, which is often a useless jumble. Make sure it's clear and understandable, not drowning in detail. If an image is unimportant or decorative, leave the `alt` attribute blank and it'll be skipped.
    * Making graphs/infographics more accessible can be either some `alt` text summary/overviews, or placing a longer overview in regular text alongside it. The latter is more accessible since it makes things clearer for everyone (such as those with cognitive disorders) and gives screen readers materials.

> Alt text is good for SEO, but stuffing alt text with key words hurts the user experience and isn't worth it.

**Don't put text in images! EVER!** Only excuse for this is for logos. Text with SVGs is the closest thing to this that'd work.

**Don't use PDFs either.** They're inconsistently accessed, not accessible, and often need extra software. Convert this content to HTML whenever possible. Use print stylesheets if you need content to be print-ready. You can also use PDF-to-HTML converters for sites with lots of existing PDF content.

### Transcripts

One of the best ways to make audio/video content accessible is to show transcripts. Captions are good too, but transcripts are cheaper, faster, and more accessible. Transcripts are easier to skim and find good info from, and are helpful for:

* Hearing impairments
* Difficult cognitive processing
* Non-native speaker of language in the video
* Overly noisy or quiet environments
* Low bandwidth for watching videos

Transcribing videos yourself can be time-consuming, so consider getting professional transcribers if needed. Don't forget notations about action in the video, and ignoring irrelevant info. Speech-to-text software can work, but often only with one speaker.

Format should usually just be HTML. Consider adding headings for different scenes and other notably different parts of a video.

### Subtitles and Captions

* _Subtitles_ are lines of text appearing on a video transcribing the spoken words. They appear at the same time the words do.
* _Closed captions_ are the same as subtitles, but also include other info such as music and audio clues.

Some services can do this automatically, but accuracy isn't guaranteed for audio more complex than a single, clear speaker. Making them yourself can be a chore, so again consider hiring a service to make them. They're best written in short bursts of text.

If you're writing your closed captions for a custom video player, you can use a Web video Text Track (WebVTT, `.vtt`) file. The markup for it is simple and clear, but requires writing up all the timestamps can take time.

### Generous User Experience

Providing alternatives for user experiences can go a long way to being more inclusive. They can chose what works best for them. People with impairments aren't always just using an assistive technology, or it could just be someone with different preferences. We don't need to try to accommodate everyone, but they're easy ways to reach a much wider audience. This makes experiences great, not just good.
