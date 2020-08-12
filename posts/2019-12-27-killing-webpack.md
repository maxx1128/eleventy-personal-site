---
title: "How I Killed My Site's Webpack Processes"
date: "2019-12-27"
excerpt: "Webpack is great, but too big a tool for my personal site. This is how I viciously murdered my Webpack processes for NPM scripts."
image: 'killing-webpack.jpg'
featured_image_link: 'https://safebooru.org/index.php?page=post&s=view&id=2676624'
tags: ['javascript']
---

For quite some time, my site ran on Webpack. It handled the styling with TailwindCSS, PostCSS, PurgeCSS, and Turbolinks. It was tricky to set up but got the job done.

Now my site's Webpack process is dead. I killed it. I have blood on my hands and it feels oh so good. My site builds are quieter, smaller, and faster. Plus, thanks to the life insurance payments, they more than paid for themselves.

So for the true crime fans out there, here's the breakdown of my personal site's Webpack murder. NPM scripts met all my essential and nice-to-have needs. The result is a site with fewer dependencies, config files, and even a faster build time!

## Reasons for Killing Webpack

The first part of any murder mystery is the motive. For my motive, I'm not arguing Webpack is bad. It does have a steep learning curve and a confusing setup. But Webpack is great for larger, more complex JavaScript and CSS bundling. When I remade my site with some optimized TailwindCSS, they recommended Webpack.

But over time I realized that my personal Jekyll site wasn't large nor complex enough to justify this. I needed Sass compilation and JavaScript minification, but nothing with modules or bundles. I wanted my site's build process to reflect its relative simplicity.

As fancy as Webpack is, it's not good for my site's long-term maintainability. I wanted it gone before it got so ingrained in how it works I'd be stuck with it even further down the line. It had to be...taken care of.

## What Replaced Webpack

Next is identifying the murder weapon. There were a few criteria the weapon had to meet.

1. Compile Sass to CSS
2. Autoprefix compiled CSS for different browsers
3. Replace TailwindCSS with my own Sass setup

TailwindCSS is great, but I prefer avoiding CSS frameworks if possible. I already had a custom Atomic CSS setup I could plug into the site. I needed to change the classes and markup to match. This would be a nightmare, but an understandable nightmare that'd only take time.

There were also a few nice to haves I aimed for.

1. Have separate commands for development and production CSS
2. Purge unused helper classes from production CSS

I'm happy to say I found a weapon, er, solution for all these: NPM scripts!

Task runners like Gulp are great for managing tasks to prepare assets. But NPM scripts can handle the same work when done right with fewer dependencies and less code. Case in point: my final NPM script tasks topped out at twelve lines and seven dependencies.

I had my motivation and my weapon set. All that's left is carrying out the crime itself.

## The Seven Dependencies

As mentioned, my new build tasks only took seven dependencies. That's about half of what it needed before.

* `chokidar-cli` to watch groups of files
* `npm-run-all` and `concurrently` to run scripts in parallel
* `node-sass` to compile Sass to CSS
* `postcss-cli` and `autoprefixer` to add CSS cross-browser prefixes
* `purgecss` to remove unused CSS classes

Now I could cut out dependencies specific to Webpack, which would extract text or uglify code. With NPM scripts I only need the dependencies themselves without wrappers or middlemen. This lightens the load and helps keeps things up-to-date. If `node-sass` updates, I don't need to wait for `gulp-node-sass` to update its own `node-sass` version.

## Compiling Two Types of Sass

With the dependencies here, I was ready to put them to work. First up was compiling the Sass into CSS.

The big obstacle was I wanted to compile Sass for both development and production. Both do a basic compilation with specific needs on top of that. Development Sass needed to recompile when I saved changes to a file. Production Sass needed to add browser prefixes and remove unused classes. Thankfully, there's a trick to grouping scripts this way.

First, let's get the basic compilation task done for a quick win. This script gathers all the Sass files from the `_sass/` directory and puts the result in my `assets/css` folder.

```json
{
 "sass": "node-sass --output-style compressed _sass/ -o assets/css"
}
```

The development Sass only has one script to add to that, so I tackled that next. I used a `sass-` namespace to categorize (and recognize) it as another Sass task. It looks at all the files in my `_sass` folder and, if one changes, runs the basic Sass script again.

```json
{
 "sass-dev:watch": "chokidar '_sass/**/**/**/*.scss' -c 'npm run sass'"
}
```

You may wonder why I appended `:watch` there with a colon, instead of a dash for something like `sass-dev-watch`. That's because the colon lets me better group tasks together, and thus run them as a group. That's not put to use here, but it is for the production Sass tasks.

Both production tasks are then run on the compiled CSS in `assets/css`.

1. `sass-prod:autoprefixer` is for production, and uses `postcss` to add needed browser prefixes.
2. `sass-prod:purgecss` is also for production. It checks my CSS against the compiled Jekyll site in `_site` and removes unused classes.

```json
{
 "sass-prod:autoprefixer": "postcss assets/css/*.css --use autoprefixer --no-map -d assets/css",
 "sass-prod:purgecss": "purgecss --css assets/css/*.css --content _site/**/**/*.html --out assets/css"
}
```
Next is running the right scripts together. This is where the colons in the names come into play. The below scripts both run the basic Sass compilation, then either the development or production tasks.

* `sass:dev` compiles it and watches for changes
* `sass:prod` tidies it up for the server.

```json
{
 "sass:dev": "yarn sass && npm-run-all -p sass-dev:*",
 "sass:prod": "yarn sass && npm-run-all -p sass-prod:*"
}
```

`npm-run-all` runs these tasks within their namespaces, so it's easy to break the tasks apart. Adding more development or production tasks is also easy if I use the same naming setup.

## Compiling the Jekyll Site

I also need scripts to handle turning my Jekyll setup into a batch of static HTML files. I already had those scripts ready to go from the Jekyll documentation.

`write` is like `sass:dev`, watching for site changes and recompiling when needed. `build` only makes it once to place it on the server.

```json
{
 "write": "jekyll serve --incremental --watch",
 "build": "jekyll build"
}
```
## The Final Scripts

The last step is grouping these scripts in some basic `dev` and `prod` tasks.

```json
{
 "dev": "concurrently -n jekyll, \"yarn write\" \"yarn sass:dev\"",
 "prod": "yarn build && yarn sass:prod"
}
```

You may notice I used `concurrently` here instead of `npm-run-all`. The former is better for parallel scripts you'd expect to see in two different terminals. It fits here since both tasks watch for changes and will output code as they update. `prod` only runs compilations without watching. I need to build the site before the CSS, so running them in basic sequence works best there.

## Wrapping Up

With all that, I have finished the perfect crime. Webpack is gone, NPM scripts are running in their place, and my clothes have minimal bloodstains. The trail has gone cold (aside from this blog where I confess it all). You can see the final crime scene with the finished scripts below.

```json
"scripts": {
 "dev": "concurrently -n jekyll, \"yarn write\" \"yarn sass:dev\"",
 "prod": "yarn build && yarn sass:prod",

 "write": "jekyll serve --incremental --watch",
 "build": "jekyll build",

 "sass:dev": "yarn sass && npm-run-all -p sass-dev:*",
 "sass:prod": "yarn sass && npm-run-all -p sass-prod:*",
 "sass": "node-sass --output-style compressed _sass/ -o assets/css",
 "sass-dev:watch": "chokidar '_sass/**/**/**/*.scss' -c 'npm run sass'",
 "sass-prod:autoprefixer": "postcss assets/css/*.css --use autoprefixer --no-map -d assets/css",
 "sass-prod:purgecss": "purgecss --css assets/css/*.css --content _site/**/**/*.html --out assets/css"
}
```

This works for me now, but there are two loose ends I'll need to cut later on.

1. `sass:prod` creates the CSS file on the server, not as one of the files included in the repo. Netlify has had a weird time recognizing the file this way, and for a while, my live site couldn't find the files. For now, I've had to commit the compiled CSS to the repo. I want to find a solution soon since I want to move past committing compiled files to my site.
2. I'll likely need to add tasks for basic JavaScript compilation and minifying as I add more to my site. Otherwise too many separate files and script tags will affect its performance. Right now I'm keeping the compiled Turbolinks code in my repo. This works but is bad practice, so I'll replace it with a custom service worker later.

This also leaves out the massive overhaul of my Sass and HTML to move away from TailwindCSS. But that's another blog post on its own, and something I'm choosing to repress until further notice. I've already forgotten what it was like or what I'm even writing anymore. Something about laser cutting?

But these are battles for another day. For now, I need to escape the country for a while. Just in case some of the config files send any relatives after me to make things even.
