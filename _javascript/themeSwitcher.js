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
