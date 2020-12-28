var interval = null;

function fontLoadListener() {
  var hasLoaded = false;

  try {
    hasLoaded = document.fonts.check('12px "WorkSans"')
  } catch(error) {
    console.info("CSS font loading API error", error);
    fontLoadedSuccess();
    return;
  }

  if (hasLoaded) {
    fontLoadedSuccess();
  }
}

function fontLoadedSuccess() {
  if (interval) {
    clearInterval(interval);
  }

  document.getElementsByTagName("html")[0].classList.add("webfonts-loaded");
}

interval = setInterval(fontLoadListener, 500);
