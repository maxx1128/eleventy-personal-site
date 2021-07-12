---
title: Some Introductory VoiceOver Shortcuts
category: Accessibility
date: 2021-07-11
---

If I can be blunt, using a screen reader is scary at first. I've had a reasonable amount of experience with it and still get anxious at times. I'm used to reading web content at my own pace and in my own voice. A screen reader takes both things away, reading at its own speed and voice. That's not a bad thing, but it is jarring and makes it harder to get comfortable with it.

I've looked through the many commands for the MacBook's built-in screen reader, VoiceOver. But there's a lot, and it's hard to parse and focus on so many. But [a screencast transcript looking at Accessibility and CSS](https://www.learnwithjason.dev/better-screenreader-experiences-with-css) pointed out some of the most important tricks to learn first.

This definitely isn't an exhaustive list, but I need to start somewhere.

`Command + Function (fn) + F5`: This is a shortcut for opening up VoiceOver. Before this, I would crack open the settings app or menu each time.

`Control`: This pauses whatever VoiceOver is announcing at that moment. Press it again to resume the words.

`Control + Option + Left/Right Arrows`: This lets you navigate static content with a virtual cursor. Using `tab` to jump around only interactive elements is simpler, but limited and not used as often. This includes the up and down arrows for elements with two dimensions of content, like tables.

`Control + Option + A`: This turns on the continuous reading mode and reads off each element one by one. It's great for listening to articles and other long passages. It also removes a lot of the more technical details to focus more on the content.

`Control + Option + U`: This opens the "rotor," a collection of different elements on a page. You can see lists of a page's headers, links, forms, landmarks, and others. This lets screen reader users skim pages in different ways as sighted users would. For example, it lets you jump to the page heading you're most interested in. Rotors are a big part of why semantic content is so important. Bad HTML leads to rots with info that's wrong, sparse, or missing.
