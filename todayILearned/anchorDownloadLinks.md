---
title: It's easy to turn anchor tags into download links
category: HTML
date: 2021-06-10
---

Most of us that have downloaded images or videos online (for legitimate and not illegal or shameful reasons) have had this experience:

1. The download site asks for the media URL you want to download.
2. It takes what seems like too long to download, and coincidentally, several ads appear as you wait.
3. A few download links or buttons then appear. But clicking on them opens the media you wanted in a new browser tab.
4. You go back to the download page. It tells you to right-click on the link and click "save target as" in the popup menu. Then you can finally download the content.

But on a recent trip to Hell (kind of not a joke), I learned [anchor tags can do the downloading for you](https://www.htmhell.dev/tips/download-links/) and remove those last two steps. All it takes is adding the `download` attribute!

```html
<a href="photo-or-video-being-legally-downloaded-I-swear.xyz" download>
  Download Content
</a>
```

A good way to test this is to go to any webpage with an anchor tag (in other words, go to any webpage). Inspect the HTML, add this attribute to the tag, then click the link. Instead of going to that page, it'll download its HTML.

The browser always surprises me with what work it can do. **We don't need to do this work onto server-side scripts or annoying user interfaces.** Tell the anchor tag it's meant to download, and the browser does the rest.

After all, even if a website is illegal (or "ill-advised"), that doesn't mean it should be inconvenient.
