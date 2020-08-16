var toggleButtonMenu = function(button, willClose) {
  willClose = typeof willClose !== 'undefined' ? willClose : false;

  var expandedState = button.getAttribute('aria-expanded'),
        parentElement = button.parentElement;

  if (expandedState === "true" || willClose) {
    button.setAttribute("aria-expanded", "false");
    parentElement.classList.remove("exocortex-menu__list-item--active");
  } else {
    button.setAttribute("aria-expanded", "true");
    parentElement.classList.add("exocortex-menu__list-item--active");
  }
};

var fullButtonToggle = function(button) {
  closeAll = typeof closeAll !== 'undefined' ? closeAll : false;

  var isButtonLevel1 = button.classList.contains('exocortex-menu__button--level-1'),
        buttonLevel = isButtonLevel1 ? '1' : '2',
        buttonClass = 'exocortex-menu__button--level-' + buttonLevel,
        allButtons = document.getElementsByClassName(buttonClass);

  for (var i = 0, max = allButtons.length; i < max; i++) {
    var isClickedButton = allButtons[i] === button;

    toggleButtonMenu(allButtons[i], !isClickedButton);
  };
};

var focusOutClose = function(event, targetClass, unfocusClass) {
  var unfocusEl = event["srcElement"],
        targetEl  = event["relatedTarget"];

  if (targetEl) {
    var targetAnchor = targetClass === 'A',
          plainAnchor = (targetEl.tagName === 'A')
                          && (!targetEl.className.includes('exocortex-menu__button'))
                          && (!targetEl.className.includes('exocortex-menu__link')),
          isTargetElement = targetAnchor ? plainAnchor : (targetEl.className.includes(targetClass)),
          wasUnfocusedElement = unfocusEl.classList.contains(unfocusClass);

    if (isTargetElement && wasUnfocusedElement) {
      var targetClasses = targetClass;

      if (plainAnchor) {
        if (unfocusClass === 'exocortex-menu__link') {
          targetClasses = 'exocortex-menu__button--level-2';
        } else {
          targetClasses = 'exocortex-menu__button--level-1';
        }
      }

      var targetElements = document.getElementsByClassName(targetClasses);
      for (var i = 0, max = targetElements.length; i < max; i++) {
        toggleButtonMenu(targetElements[i], true);

        if ((targetClasses === 'exocortex-menu__button--level-2') && plainAnchor) {
          var topButtons = document.getElementsByClassName('exocortex-menu__button--level-1')
          toggleButtonMenu(topButtons[topButtons.length - 1]);
        }
      }
    }
  }
};

(function() {
  var exoLayoutWrapper = document.getElementsByClassName('exocortex-layout__wrapper')[0];

  if (exoLayoutWrapper) {
    exoLayoutWrapper.classList.add('exocortex-layout__wrapper--js');

    var exocortexMenuButtons = document.getElementsByClassName('exocortex-menu__button'),
          exocortexMenuLinks   = document.getElementsByClassName('exocortex-menu__link');

    document.addEventListener('click', function(event) {
      var isClickInside = document.getElementById('exocortex-menu').contains(event.target);

      if (!isClickInside) {
        for (var i = 0, max = exocortexMenuButtons.length; i < max; i++) {
          toggleButtonMenu(exocortexMenuButtons[i], true);
        }
      }
    });

    for (var i = 0, max = exocortexMenuButtons.length; i < max; i++) {
      exocortexMenuButtons[i].onclick = function(el) { fullButtonToggle(el["srcElement"]); }

      exocortexMenuButtons[i].addEventListener("blur", function(e) {
        focusOutClose(e, 'exocortex-menu__button--level-1', 'exocortex-menu__button--level-2');
      });

      if (i === (max - 1)) {
        exocortexMenuButtons[i].addEventListener("blur", function(e) {
          focusOutClose(e, 'A', 'exocortex-menu__button--level-2');
        });
      }
    }

    for (var i = 0, max = exocortexMenuLinks.length; i < max; i++) {
      exocortexMenuLinks[i].addEventListener("blur", function(e) {
        focusOutClose(e, 'exocortex-menu__button--level-2', 'exocortex-menu__link');
        focusOutClose(e, 'exocortex-menu__button--level-1', 'exocortex-menu__link');
      });

      if (i === (max - 1)) {
        exocortexMenuLinks[i].addEventListener("blur", function(e) {
          focusOutClose(e, 'A', 'exocortex-menu__link');
        });
      }
    }
  }
})();
(function() {
  const posts = window.ContentData.posts,
        randomPost = posts[Math.floor(Math.random() * posts.length)],
        postLinkElement = document.getElementById('random-post-link');

  if (postLinkElement) {
    postLinkElement.classList.remove('hidden');
    postLinkElement.setAttribute('href', randomPost.url);
  }
})();

(function() {
  const notes = window.ContentData.notes,
        randomNote = notes[Math.floor(Math.random() * notes.length)],
        noteLinkElement = document.getElementById('random-note-link');

  if (noteLinkElement) {
    noteLinkElement.classList.remove('hidden');
    noteLinkElement.setAttribute('href', randomNote.url);
  }
})();

(function() {
  const documents = window.ContentData.documents,
        randomDocument = documents[Math.floor(Math.random() * documents.length)],
        documentLinkElement = document.getElementById('random-exocortex-link');

  if (documentLinkElement) {
    documentLinkElement.classList.remove('hidden');
    documentLinkElement.setAttribute('href', randomDocument.url);
  }
})();
(function() {
  const getContentData = () => {
    if (linkWrapper.classList.contains('random-navigator-wrapper--note')) {
      return window.ContentData.notes;
    }

    if (linkWrapper.classList.contains('random-navigator-wrapper--document')) {
      return window.ContentData.documents;
    }

    return window.ContentData.posts;
  }

  const filterContent = (data) => {
    const nextLink     = document.getElementsByClassName('random-navigator__next-link')[0],
          previousLink = document.getElementsByClassName('random-navigator__previous-link')[0];

    let blockedURLs    = [window.location.pathname];
    if (nextLink)     { blockedURLs.push(nextLink.getAttribute('href')); }
    if (previousLink) { blockedURLs.push(previousLink.getAttribute('href')); }

    return data.filter(content => !blockedURLs.some(blockedURL => content.url.includes(blockedURL)));
  }

  const linkWrapper = document.getElementById('random-navigator-wrapper');

  if (linkWrapper) {
    const contentData = getContentData(),
          possibleContent = filterContent(contentData),
          randomContent = possibleContent[Math.floor(Math.random() * possibleContent.length)];

    const link = document.querySelectorAll('#random-navigator-wrapper a')[0];
    linkWrapper.classList.remove('hidden');
    link.setAttribute('href', randomContent.url);
    link.innerHTML = randomContent.title;
  }
})();
(function() {
  const noteElements = document.getElementsByClassName('note-styler');

  function removeNoteStyleClass(el) {
    var regx = new RegExp('\\b' + 'note-coloring--' + '.?\\b', 'g');
    el.className = el.className.replace(regx, '');
  }

  if (noteElements) {
    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }

      return array;
    }

    const numberOfPalettes = 15,
          classIndexes     = shuffle([...Array(numberOfPalettes).keys()]);

    for (let note of noteElements) {
      removeNoteStyleClass(note);
      note.classList.add(`note-coloring--${classIndexes[0]}`);
      classIndexes.shift();
    }
  }
})();
(function() {
  const tables = document.getElementsByTagName('table');

  if (tables) {
    for (var i = 0, max = tables.length; i < max; i++) {
      const table = tables[i],
            parent = table.parentNode,
            wrapper = document.createElement('div');

      table.classList.add('table--with-js');
      wrapper.classList.add('table-wrapper');

      parent.insertBefore( wrapper, table);
      wrapper.appendChild(table);
    }
  }
})();
(function() {
  const themeRadios = document.getElementsByClassName('theme-switcher__input');

  function addEventListeners() {
    for (var i = 0, max = themeRadios.length; i < max; i++) {
      themeRadios[i].onclick = function(el) {
        const selectedTheme = el['srcElement']['defaultValue'];
        setTheme(selectedTheme);
      }
    }
  }

  function setTheme(theme) {
    const themeRadio = document.getElementById(`theme-${theme}`);
    themeRadio.checked = true;
    localStorage.setItem('theme', theme);
    replaceBodyClasses(theme);
  }

  function replaceBodyClasses(theme) {
    const bodyEl = document.getElementsByTagName("body")[0],
          themeClassPrefix = "theme-";

    let newClasses = bodyEl.className.split(" ").filter(bodyClass => (
          bodyClass.lastIndexOf(themeClassPrefix, 0) !== 0
        ));

    newClasses += `${themeClassPrefix}${theme}`
    bodyEl.classList = newClasses;
  }

  function init() {
    const pastTheme = localStorage.getItem('theme');
    setTheme((pastTheme ? pastTheme : 'light'));
  }

  init();
  addEventListeners();
})();
