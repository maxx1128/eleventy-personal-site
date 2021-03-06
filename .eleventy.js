const { DateTime } = require("luxon");
const fs = require("fs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const moment = require("moment");

const hideFutureItems = (item) => {
  const now = new Date(),
        postDate = item.date,
        wasPublishedLater = postDate < now;

  return wasPublishedLater;
}

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addFilter("addNbsp", (str) => {
    if (!str) {
      return;
    }
    let title = str.replace(/((.*)\s(.*))$/g, "$2&nbsp;$3");
    title = title.replace(/"(.*)"/g, '\\"$1\\"');
    return title;
  });

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
  });

  eleventyConfig.addFilter("noteDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('LLLL d, yyyy');
  });

  eleventyConfig.addFilter("postReadTime", content => {
    const isRejectedCharacter = (str) => str.length === 1 && !str.toLowerCase().match(/[a-z]/i);

    const acceptedContent = content
                              .split(" ")
                              .filter(content => content !== "" && !isRejectedCharacter(content)),
          readTime = Math.round(acceptedContent.length / 180);

    if (readTime < 2) { return 2; }
    return readTime;
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  eleventyConfig.addLiquidFilter("toUTCString", (date) => {
    const utc = new Date(date).toUTCString();
    return moment.utc(utc).format("MMMM D, YYYY");
  });

  eleventyConfig.addLiquidFilter("toUTCDatePath", (date) => {
    const utc = new Date(date).toUTCString();
    return moment.utc(utc).format("YYYY/MM/DD/");
  });

  eleventyConfig.addLiquidFilter("onlyPublished", (posts) => {
    return posts.filter(hideFutureItems);
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if( n < 0 ) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addCollection("tagList", function(collection) {
    let tagSet = new Set();
    collection.getAll().forEach(function(item) {
      if( "tags" in item.data ) {
        let tags = item.data.tags;

        tags = tags.filter(function(item) {
          switch(item) {
            // this list should match the `filter` list in tags.njk
            case "all":
            case "nav":
            case "post":
            case "posts":
              return false;
          }

          return true;
        });

        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });

    // returning an array in addCollection works in Eleventy 0.5.3
    return [...tagSet];
  });

  eleventyConfig.addCollection("TILCategories", function(collection) {
    let categorySet = new Set();
    collection.getAll().forEach(function(item) {
      if( "contentType" in item.data && item.data.contentType === "Today I Learned" ) {
        let category = item.data.category;
        categorySet.add(category);
      }
    });

    // returning an array in addCollection works in Eleventy 0.5.3
    return [...categorySet].sort();
  });

  eleventyConfig.addCollection("posts", function (collection) {
    return collection.getFilteredByGlob("./posts/*.md")
      .filter(hideFutureItems)
      .reverse();
  });

  eleventyConfig.addCollection("notes", function (collection) {
    return collection.getFilteredByGlob("./notes/*.md")
      .filter(hideFutureItems)
      .reverse();
  });

  eleventyConfig.addCollection("todayILearned", function (collection) {
    return collection.getFilteredByGlob("./todayILearned/*.md")
      .sort((a, b) => {
        if (a.date < b.date) { return -1; }
        if (a.date > b.date) { return 1; }
        return 0;
      });
  });

  eleventyConfig.addCollection("reversedTIL", function (collection) {
    return collection.getFilteredByGlob("./todayILearned/*.md")
      .sort((a, b) => {
        if (a.date < b.date) { return -1; }
        if (a.date > b.date) { return 1; }
        return 0;
      }).reverse();
  })

  eleventyConfig.addCollection("feed", function (collection) {
    const allContent = [
      ...collection.getFilteredByGlob("./notes/*.md"),
      ...collection.getFilteredByGlob("./posts/*.md"),
      ...collection.getFilteredByGlob("./todayILearned/*.md")
    ].sort((a, b) => {
      if (a.date < b.date) { return -1; }
      if (a.date > b.date) { return 1; }
      return 0;
    })

    return allContent
      .filter(hideFutureItems)
      .slice(Math.max(allContent.length - 50, 1))
      .reverse();
  });

  eleventyConfig.addCollection("recent_notes", function (collection) {
    return collection.getFilteredByGlob("./notes/*.md")
      .filter(hideFutureItems)
      .reverse()
      .slice(0, 2);
  });

  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("assets/**/*");
  eleventyConfig.addPassthroughCopy("serviceworker.js");
  eleventyConfig.addPassthroughCopy("manifest.webmanifest");

  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAnchor, {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#"
  });
  eleventyConfig.setLibrary("md", markdownLibrary);

  // Browsersync Overrides
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = fs.readFileSync('_site/404.html');

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false
  });

  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about those.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`
    // pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",

    // These are all optional, defaults are shown:
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
