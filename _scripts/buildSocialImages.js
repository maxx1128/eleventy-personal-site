#!/usr/bin/env node

const argv = require("yargs-parser")(process.argv.slice(2));
const chromium = require("chrome-aws-lambda");
const fs = require("fs");
const { readFileSync } = require('fs');
const path = require("path");
const isWsl = require('is-wsl');

const defaults = {
  outputDir: "assets",
  imageDir: "images/social",
  dataFile: "pages.json",
  templatePath: "_social/template.html", // ex. social/template.html
  stylesPath: "_social/styles.css", // ex. social/style.css,
  width: 600,
  height: 315,
  deviceScaleFactor: 2
};

const {
  outputDir,
  imageDir,
  dataFile,
  templatePath,
  stylesPath,
  width,
  height,
  deviceScaleFactor
} = {
  ...defaults,
  ...argv,
};

const getPostImage = (path) => `data:image/jpeg;base64,${readFileSync(path).toString('base64')}`;

const buildRoot = fs.realpathSync(outputDir);

const templateSrc = templatePath.length
  ? fs.realpathSync(templatePath)
  : "_social/template.html";

const styleSrc = stylesPath.length
  ? fs.realpathSync(stylesPath)
  : "_social/styles.css";

const previewPath = `${buildRoot}/${imageDir}`;

const dataPath = fs.realpathSync(dataFile);

(async () => {
  console.log("Starting social images...");

  const browserArgs = {
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    }

  // WSL requires a different config
  if(isWsl){
    browserArgs.executablePath = "google-chrome"
    browserArgs.headless = true
  }

  const browser = await chromium.puppeteer.launch(browserArgs);

  const page = await browser.newPage();

  // Load html from template
  let html = path.resolve(__dirname, templateSrc);
  if (!fs.existsSync(html)) {
    console.log("Invalid templatePath provided");
    process.exit(1);
  }
  html = fs.readFileSync(html).toString();

  // Load CSS styles if no custom template provided
  let css = path.resolve(__dirname, styleSrc);
  if (!fs.existsSync(css)) {
    console.log("Invalid stylesPath provided");
    process.exit(1);
  }
  css = fs.readFileSync(css).toString();

  html = html
    .replace("{{ style }}", css);

  // Get generated data json
  let data = path.resolve(__dirname, dataPath);
  if (!fs.existsSync(data)) {
    console.log("Invalid dataFile location or file name provided");
    process.exit(1);
  }
  const pages = require(data).reverse();

  // Render html, wait for 0 network connections to ensure webfonts downloaded
  await page.setContent(html, {
    waitUntil: ["networkidle0"],
  });

  // Wait until the document is fully rendered
  await page.evaluateHandle("document");

  // Set the viewport to your preferred image size
  await page.setViewport({
    width,
    height,
    deviceScaleFactor,
  });

  // Create a `previews` directory in the public folder
  const dir = path.resolve(__dirname, previewPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  const staticPageTitles = ["Homepage", "Notes", "Now", "Writing", "Today I&nbsp;Learned", "Max Antonucci", "About&nbsp;Me"];

  // Go over all the posts
  for (const post of pages) {

    let forPage = {
      post: post
    };

    if (post.image) {
      forPage.postImage = getPostImage(post.image);
    } else if (post.title.includes('Note on')) {
      forPage.postImage = getPostImage('assets/images/global/social-note.png');
    } else if (post.title.includes('Today I Learned')) {
      forPage.postImage = getPostImage('assets/images/global/social-til.jpg');
    } else if (staticPageTitles.includes(post.title)) {
      forPage.isStatic = true;
      forPage.postImage = getPostImage('assets/images/global/profile.png');
    } else {
      forPage.postImage = false;
    }

    forPage.bgSize = post.image ? 'cover' : 'inherit';

    // Update the H1 element with the post title
    await page.evaluate((forPage) => {
      const title = document.querySelector("h1");
      title.innerHTML = forPage.post.title;

      const contentImage = document.getElementsByClassName('content-image')[0],
            profileImage = document.getElementsByClassName('profile-img')[0];
      contentImage.classList.remove('content-image--default', 'content-image--page');
      profileImage.classList.remove('profile-img--hidden');

      if (forPage.postImage) {
        if (forPage.isStatic) {
          contentImage.classList.add('content-image--page');
          profileImage.classList.add('profile-img--hidden');
        }

        contentImage.style.backgroundImage = `url("${forPage.postImage}")`;
      } else {
        contentImage.classList.add('content-image--default');
        contentImage.style.removeProperty('background-image');
      }

      contentImage.style.backgroundSize = forPage.bgSize;
    }, forPage);

    await page.evaluateHandle("document");

    const imagePath = `${dir}/${post.imgName}.png`;
    // Remove this if I want to bring back Note and TIL custom social images
    const skipImage = post.title.includes('Note on') || post.title.includes('Today I Learned');

    if (!fs.existsSync(imagePath) && !skipImage) {
      // Save a screenshot to [outputDir]/[previewDir]/[imgName].png
      await page.screenshot({
        path: imagePath,
        type: "png",
        clip: { x: 0, y: 0, width, height },
      });
    }
  }

  // close all pages, fix perm issues on windows 10 (https://github.com/puppeteer/puppeteer/issues/298)
  let browserPages = await browser.pages();
  await Promise.all(browserPages.map(page =>page.close()));

  await browser.close();
  console.log("Social images complete!");
})();
