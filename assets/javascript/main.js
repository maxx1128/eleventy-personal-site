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
