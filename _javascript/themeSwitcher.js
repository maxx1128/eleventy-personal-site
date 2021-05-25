(function() {
  const themeRadios = document.getElementsByClassName('theme-switcher__input'),
        allThemes = ['light', 'dark'];

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
    replaceHtmlClasses(theme);
  }

  function replaceHtmlClasses(theme) {
    const HtmlEl = document.getElementsByTagName("html")[0],
          themeClassPrefix = "theme-";

    allThemes.forEach(themeItem => HtmlEl.classList.remove(`${themeClassPrefix}${themeItem}`));

    HtmlEl.classList.add(`${themeClassPrefix}${theme}`);
  }

  function init() {
    const pastTheme = localStorage.getItem('theme');
    setTheme((pastTheme ? pastTheme : 'light'));
  }

  init();
  addEventListeners();
})();
